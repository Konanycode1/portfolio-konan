# Déploiement — CI/CD GitHub Actions → VPS (Docker)

Le portfolio est construit en image Docker, publié sur **Docker Hub** puis déployé sur un VPS avec Docker Compose, derrière Nginx (ou Traefik) en HTTPS. Le conteneur écoute sur le port **3898** du VPS (`127.0.0.1:3898` → `3000` dans le conteneur).

## Vue d'ensemble

```
git push main
     │
     ▼
┌────────────────────┐   ┌──────────────────────────┐   ┌───────────────────────────┐
│ 1. ci              │──▶│ 2. image                 │──▶│ 3. deploy                 │
│ npm ci             │   │ docker build (standalone)│   │ scp docker-compose.yml    │
│ lint + tsc + build │   │ push Docker Hub :<sha>   │   │ ssh: compose pull + up -d │
│ (aussi sur les PR) │   │            et :latest    │   │ healthcheck 127.0.0.1:3898│
└────────────────────┘   └──────────────────────────┘   └───────────────────────────┘
                                                                     │
                                         Internet ─▶ Nginx (conteneur, HTTPS) ─▶ portfolio-konan:3000
```


| Événement                            | Jobs exécutés             |
| -------------------------------------- | --------------------------- |
| Pull request vers`main`                | `ci`                        |
| Push sur`main`                         | `ci` → `image` → `deploy` |
| Lancement manuel (`workflow_dispatch`) | `ci` → `image` → `deploy` |

Un nouveau push annule le pipeline en cours sur la même branche. Le job `deploy` n'est jamais annulé en plein déploiement.

## Fichiers


| Fichier                        | Rôle                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| `.github/workflows/deploy.yml` | Le pipeline                                                                                       |
| `Dockerfile`                   | Build en 3 étapes (deps → builder → runner), Node 24 alpine, utilisateur non-root, healthcheck |
| `docker-compose.yml`           | Service lancé sur le VPS, exposé seulement sur`127.0.0.1:3898`                                  |
| `.dockerignore`                | Exclut`node_modules`, `.next`, `.git`, `.env*` du contexte de build                               |
| `next.config.ts`               | `output: "standalone"` pour une image légère sans `node_modules` complet                        |

## Mise en place (une seule fois)

### 1. VPS

```bash
# Docker + plugin compose installés, puis :
sudo usermod -aG docker $USER      # l'utilisateur SSH doit pouvoir lancer docker
mkdir -p ~/apps/portfolio
```

Clé SSH dédiée au déploiement :

```bash
ssh-keygen -t ed25519 -C "github-actions-portfolio" -f ~/.ssh/portfolio_deploy
# contenu de portfolio_deploy.pub → ~/.ssh/authorized_keys sur le VPS
# contenu de portfolio_deploy (clé privée) → secret VPS_SSH_KEY
```

### 2. Docker Hub

1. Créer le dépôt `portfolio-konan` sur https://hub.docker.com (public ou privé).
2. *Account settings → Personal access tokens* : créer un token **Read & Write**.

### 3. Secrets et variables GitHub

*Settings → Secrets and variables → Actions*

Onglet **Secrets** (*Repository secrets*, pas dans l'environnement `production`) :

| Secret            | Exemple                                   | Requis               |
| ----------------- | ----------------------------------------- | -------------------- |
| `DOCKERHUB_USERNAME` | identifiant Docker Hub                 | oui                  |
| `DOCKERHUB_TOKEN` | token Docker Hub Read & Write             | oui                  |
| `VPS_HOST`        | `203.0.113.10` ou `vps.abrahamkonany.dev` | oui                  |
| `VPS_USER`        | `konan`                                   | oui                  |
| `VPS_SSH_KEY`     | clé privée ed25519                      | oui                  |
| `DEPLOY_PATH`     | `/home/konan/apps/portfolio`              | oui                  |
| `VPS_PORT`        | `22`                                      | non (22 par défaut) |

Le token Docker Hub sert à pousser l'image depuis GitHub Actions et à la tirer depuis le VPS (indispensable si le dépôt Docker Hub est privé).

### 4. Reverse proxy + HTTPS (Nginx en conteneur)

Nginx tourne dans un conteneur Docker (comme pour `stock.vitrinedeco.com`). Il joint le portfolio **par son nom de conteneur** sur un réseau Docker partagé : `http://portfolio-konan:3000`. `127.0.0.1:3898` ne fonctionne pas depuis le conteneur Nginx (c'est son propre localhost).

**a. Trouver le réseau Docker de Nginx**

```bash
docker ps --format '{{.Names}}' | grep -i nginx
docker inspect <conteneur-nginx> -f '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}'
```

Si ce n'est pas `proxy`, créer dans GitHub une variable (ou un secret) **`PROXY_NETWORK`** avec ce nom. Le workflow l'écrit dans `.env` et `docker-compose.yml` branche le portfolio dessus.

**b. Config Nginx** (dans le dossier de conf de ton conteneur Nginx)

```nginx
server {
    listen 80;
    server_name abrahamkonany.com www.abrahamkonany.com;

    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://abrahamkonany.com$request_uri; }
}

server {
    listen 443 ssl;
    server_name abrahamkonany.com www.abrahamkonany.com;

    ssl_certificate /etc/letsencrypt/live/abrahamkonany.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/abrahamkonany.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://portfolio-konan:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**c. Ordre de mise en route**

1. DNS : enregistrements `A` de `abrahamkonany.com` et `www` vers l'IP du VPS.
2. Premier déploiement (push sur `main`) pour que le conteneur `portfolio-konan` existe : sinon Nginx refuse de démarrer (`host not found in upstream`).
3. Ne mettre d'abord **que le bloc `listen 80`**, recharger Nginx, puis générer le certificat en webroot avec ton conteneur certbot :
   ```bash
   docker compose run --rm certbot certonly --webroot -w /var/www/certbot \
     -d abrahamkonany.com -d www.abrahamkonany.com
   ```
4. Ajouter le bloc `listen 443`, puis tester et recharger :
   ```bash
   docker exec <conteneur-nginx> nginx -t && docker exec <conteneur-nginx> nginx -s reload
   ```

### 5. Premier push

```bash
git add -A && git commit -m "Portfolio + CI/CD"
git branch -M main
git remote add origin https://github.com/Konanycode1/portfolio-konan.git
git push -u origin main
```

Suivre l'exécution dans l'onglet **Actions** du dépôt.

## Ce que fait le job `deploy` sur le VPS

```bash
cd $DEPLOY_PATH
docker login -u $DOCKERHUB_USERNAME      # avec DOCKERHUB_TOKEN
printf 'IMAGE=docker.io/<user>/portfolio-konan:<sha>\nAPP_PORT=3898\n' > .env
docker compose pull
docker compose up -d --remove-orphans
docker logout
docker image prune -f
# puis curl http://127.0.0.1:3898/ jusqu'à 60 s ; sinon logs + échec du job
```

## Opérations courantes

**Rollback** vers une version précédente :

```bash
cd /home/konan/apps/portfolio
printf 'IMAGE=docker.io/<user>/portfolio-konan:<ancien-sha>\nAPP_PORT=3898\n' > .env
docker compose up -d
```

Les tags `<sha>` disponibles sont listés dans l'onglet *Tags* du dépôt Docker Hub. Le prochain push sur `main` redéploie la dernière version.

**Redéployer sans changement de code** : *Actions → CI/CD → Run workflow*.

**Logs** :

```bash
docker compose -f /home/konan/apps/portfolio/docker-compose.yml logs -f
```

**Tester l'image en local** :

```bash
docker build -t portfolio-konan .
docker run --rm -p 3898:3000 portfolio-konan   # http://localhost:3898
```

## Dépannage


| Symptôme                                      | Cause probable                                          | Solution                                                                |
| ---------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------- |
| `npm ci` échoue (« lock file not in sync ») | `package-lock.json` désynchronisé                     | `rm -rf node_modules package-lock.json && npm install`, commit du lock  |
| `denied` / `unauthorized` au push ou au pull   | token Docker Hub invalide ou en lecture seule           | régénérer un token**Read & Write**, mettre à jour `DOCKERHUB_TOKEN` |
| `DOCKERHUB_USERNAME manquant`                  | secret absent ou créé dans l'environnement `production` | le créer dans *Repository secrets* (une variable de dépôt marche aussi) |
| `address already in use`                       | le port 3898 est déjà pris sur le VPS                 | `sudo ss -ltnp | grep 3898`, ou changer `APP_PORT` dans le workflow     |
| `permission denied ... docker.sock`            | l'utilisateur SSH n'est pas dans le groupe`docker`      | `sudo usermod -aG docker <user>` puis se reconnecter                    |
| Healthcheck en échec                          | le conteneur crashe au démarrage                       | `docker compose logs --tail=100` sur le VPS                             |
| 502 Bad Gateway                                | proxy OK mais conteneur arrêté                        | `docker compose ps`, puis `up -d`                                       |
| `network proxy declared as external, but could not be found` | `PROXY_NETWORK` ne correspond pas au réseau de Nginx | voir § 4.a, créer/corriger `PROXY_NETWORK` dans GitHub |
| `host not found in upstream "portfolio-konan"` | Nginx démarré avant le conteneur, ou pas sur le même réseau | déployer d'abord, vérifier `docker network inspect <réseau>` |
