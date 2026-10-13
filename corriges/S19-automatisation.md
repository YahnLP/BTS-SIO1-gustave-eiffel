# Corrigé (enseignant) – S19 Automatiser les tâches d'administration

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les réponses aux questions sont repliées dans le TP. **Aucune commande n'a été exécutée** dans l'environnement de rédaction : le script de référence ci-dessous est une proposition à **tester** sur la VM de la salle avant diffusion.

## Script de référence (proposition, non testé)

```bash
#!/bin/bash
# creer_comptes.sh : crée les comptes listés dans un fichier CSV (login;prenom;nom;service).
# Usage : creer_comptes.sh [--test] fichier.csv     (à lancer avec sudo)

TEST=0
if [ "$1" = "--test" ]; then TEST=1; shift; fi
FICHIER="$1"
JOURNAL="/var/log/creer_comptes-$(date +%F).log"

if [ -z "$FICHIER" ] || [ ! -f "$FICHIER" ]; then
    echo "Usage : $0 [--test] fichier.csv" >&2
    exit 2
fi

crees=0; existants=0; refus=0
journal() { echo "$(date '+%F %T') $1" | tee -a "$JOURNAL"; }

while IFS=';' read -r login prenom nom service reste; do
    [ "$login" = "login" ] && continue                 # en-tête
    [ -z "$login$prenom$nom$service$reste" ] && continue   # ligne vide
    if [[ ! "$login" =~ ^[a-z][a-z0-9._-]{1,31}$ ]] || [ -z "$prenom" ] || [ -z "$nom" ] \
       || [ -z "$service" ] || [ -n "$reste" ]; then
        journal "REFUS    $login (ligne invalide)"; refus=$((refus+1)); continue
    fi
    if getent passwd "$login" > /dev/null; then
        journal "EXISTANT $login"; existants=$((existants+1)); continue
    fi
    if [ "$TEST" -eq 1 ]; then
        journal "ESSAI    créerait $login (groupe $service)"; continue
    fi
    getent group "$service" > /dev/null || groupadd "$service"
    if useradd -m -s /bin/bash -c "$prenom $nom" -g "$service" "$login"; then
        journal "CRÉÉ     $login"; crees=$((crees+1))
    else
        journal "ERREUR   $login"; refus=$((refus+1))
    fi
done < "$FICHIER"

echo "Créés : $crees ; déjà existants : $existants ; refusés : $refus"
[ "$refus" -eq 0 ]
```

Points à vérifier : le nom de groupe `service` doit être un nom valide (minuscules, sans accent : c'est le cas dans le fichier) ; la ligne `hmorel` (colonne manquante) donne un `service` vide, donc refusée ; la ligne `jroux` donne `reste` non vide, donc refusée ; `FDURAND` et `i petit` sont refusés par l'expression régulière ; le doublon `amartin` est « existant » à la deuxième lecture (et en mode essai, il est simplement affiché deux fois comme « créerait » : comportement à noter et à discuter, car le mode essai ne crée rien).

## Fichier Compose de référence (partie D, proposition, non testée)

```yaml
services:
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: exemple-fictif
      POSTGRES_DB: jackcelair
    volumes:
      - jc-db:/var/lib/postgresql/data
  web:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
volumes:
  jc-db:
```

La page d'accueil se crée dans `./html/index.html`. **À jouer dans DockerLab avant la séance** : vérifier que ces champs sont pris en charge par la simulation de Compose et ajuster la consigne (par exemple, un volume nommé pour les pages si le montage d'un dossier de l'hôte n'est pas pris en charge).

## À tester avant la séance

| Point | Pourquoi |
|---|---|
| Script de référence sur la VM de la salle (droits, journal dans `/var/log`) | Non exécuté |
| Service `cron` présent sur la VM | Les VM minimales peuvent ne pas l'avoir |
| Compose simulé : champs pris en charge | Partie D hors catalogue |
| TP de DockerLab « Docker Compose : lancer une application en une commande » | Durée annoncée par l'application : 40 min |

## Pièges probables

- Script qui **crée** des comptes en mode essai (test mal placé).
- Journal écrit **seulement à l'écran** (oubli de la redirection).
- `%` dans la crontab (partie B) : fichiers `disque-` sans date, ou jobs qui échouent en silence.
- Mot de passe écrit « pour tester » dans le script ou le fichier Compose : à relever dans le rendu.
- Partie D recopiée de S11 sans comprendre que les commandes ne servent plus : exiger la comparaison.

## Barème indicatif (20 points)

| Critère | Points |
|---|---|
| Script : contrôle des entrées, idempotence démontrée, `--test`, journal, résumé | 7 |
| Planification : ligne `cron`, chemins absolus, redirection, gestion du `%` | 4 |
| DockerLab partie C : réponses | 2 |
| Compose partie D : fichier valide, preuves, comparaison avec S11 | 5 |
| Partie E et réponses sur les risques | 2 |

## Compétences

B2.2 et B1.5 sont une proposition à valider (voir le référentiel du dépôt).
