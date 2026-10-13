# Aide-mémoire – Automatisation

*BTS SIO SISR 1re année – S19*

> Un mot ou un sigle inconnu ? Passe la souris dessus, ou ouvre le [glossaire](../../ressources/glossaire.md). Repère <span class="technique">notion technique</span> : à lire sans l'apprendre par cœur.

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

## Docker Compose <span class="technique">notion technique</span>

| Besoin | Commande |
|---|---|
| Valider le fichier | `docker compose config` |
| Démarrer | `docker compose up -d` |
| État | `docker compose ps` |
| Journaux | `docker compose logs SERVICE` |
| Arrêter et supprimer conteneurs et réseau | `docker compose down` |

`up -d` est **idempotent**. Les **volumes nommés** survivent à `down`.

## SSH : administrer à distance

| Besoin | Commande |
|---|---|
| Se connecter | `ssh utilisateur@adresse` |
| Fabriquer une paire de clés | `ssh-keygen -t ed25519` |
| Déposer la clé publique sur le serveur | `ssh-copy-id utilisateur@adresse` |
| Lancer une commande à distance | `ssh utilisateur@adresse 'df -h'` |

La clé **privée** ne se partage **jamais** ; la clé **publique** se dépose sur le serveur. Garde une session ouverte quand tu modifies la configuration de SSH.

## Impératif ou déclaratif <span class="technique">notion technique</span>

Impératif : les **étapes**. Déclaratif : l'**état voulu**.
