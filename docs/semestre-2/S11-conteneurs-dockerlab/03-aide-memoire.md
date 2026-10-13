# Aide-mémoire – Docker (séance S11)

*BTS SIO SISR 1re année – S11*

> Un mot ou un sigle inconnu ? Passe la souris dessus, ou ouvre le [glossaire](../../ressources/glossaire.md). Repère <span class="technique">notion technique</span> : à lire sans l'apprendre par cœur.

## Images et conteneurs

| Besoin | Commande |
|---|---|
| Télécharger une image | `docker pull alpine` |
| Lister les images | `docker images` |
| Lancer (au premier plan) | `docker run alpine echo bonjour` |
| Lancer en arrière-plan, avec un nom | `docker run -d --name web nginx` |
| Lancer puis supprimer à la fin | `docker run --rm alpine echo x` |
| Conteneurs en cours · tous | `docker ps` · `docker ps -a` |
| Journaux | `docker logs web` |
| Arrêter · démarrer · supprimer | `docker stop web` · `docker start web` · `docker rm web` |
| Supprimer même en cours | `docker rm -f web` |
| Commande dans un conteneur en cours | `docker exec web ls /` |
| Shell interactif | `docker exec -it web sh` |

## Ports et variables

| Besoin | Commande |
|---|---|
| Publier un port | `docker run -d --name web -p 8080:80 nginx` |
| Voir les ports publiés | `docker port web` |
| Passer une variable | `docker run -d --name db -e POSTGRES_PASSWORD=exemple postgres` |
| Tester un site | `curl http://localhost:8080` |

## Volumes

| Besoin | Commande |
|---|---|
| Créer · lister | `docker volume create site` · `docker volume ls` |
| Monter un volume | `docker run -d --name web -v site:/usr/share/nginx/html nginx` |
| Supprimer les volumes inutilisés | `docker volume prune` (nommés : `-a`) |

## Réseaux

| Besoin | Commande |
|---|---|
| Créer · lister | `docker network create app-net` · `docker network ls` |
| Lancer sur un réseau | `docker run -d --name db --network app-net …` |
| Brancher un conteneur existant | `docker network connect app-net web` |
| Voir un réseau | `docker network inspect app-net` |

## Diagnostic

| Étape | Commande |
|---|---|
| 1. État | `docker ps -a` |
| 2. Journaux | `docker logs NOM` |
| 3. Configuration | `docker inspect NOM` |
| Un champ précis | `docker inspect -f "{{.State.ExitCode}}" NOM` |
| Ressources | `docker stats --no-stream` · `docker system df` |
| Nettoyer | `docker container prune` · `docker volume prune -a` · `docker image prune -a` |

## Codes de sortie

0 normal · 1 erreur application · 125 à 127 Docker ou commande · 137 SIGKILL · 143 SIGTERM
