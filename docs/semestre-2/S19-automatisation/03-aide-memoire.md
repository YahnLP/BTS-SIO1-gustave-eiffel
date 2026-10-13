# Aide-mémoire – Automatisation

*BTS SIO SISR 1re année – S19*

## Script fiable

Paramètre · contrôle des entrées · idempotent · mode d'essai · journal · code de retour · pas de secret.

## Lecture d'un fichier ligne par ligne

```bash
while IFS=';' read -r login prenom nom service reste; do
    # traiter la ligne
done < fichier.csv
```

## Comptes

| Besoin | Commande |
|---|---|
| Le compte existe-t-il ? | `getent passwd NOM` (code de retour 0 si oui) |
| Le groupe existe-t-il ? | `getent group NOM` |
| Créer un groupe | `sudo groupadd NOM` |
| Créer un compte | `sudo useradd -m -s /bin/bash -c "Prénom Nom" -g GROUPE NOM` |
| Vérifier | `id NOM` |
| Supprimer (compte et dossier) | `sudo userdel -r NOM` |
| Date pour un journal | `date '+%F %T'` |

## `cron`

| Besoin | Commande |
|---|---|
| Éditer / lister la table | `crontab -e` / `crontab -l` |
| Service actif ? | `systemctl status cron` |

Ligne : `minute heure jour-du-mois mois jour-de-semaine commande`.
Exemples : `30 7 * * 1-5` · `*/5 * * * *`.

Pièges : chemins absolus · sortie redirigée (`>> fichier 2>&1`) · `%` protégé par une barre oblique inverse.

## Docker Compose

| Besoin | Commande |
|---|---|
| Valider le fichier | `docker compose config` |
| Démarrer | `docker compose up -d` |
| État | `docker compose ps` |
| Journaux | `docker compose logs SERVICE` |
| Arrêter et supprimer conteneurs et réseau | `docker compose down` |

`up -d` est **idempotent**. Les **volumes nommés** survivent à `down`.

## Impératif ou déclaratif

Impératif : les **étapes**. Déclaratif : l'**état voulu**.
