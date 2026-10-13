# Cours – Paquets Debian et premiers scripts Bash

*BTS SIO SISR 1re année – S10 – à lire avec le [TP](02-tp.md)*

## À la fin de ce cours, tu sauras

- [ ] expliquer ce qu'est un **paquet**, un **dépôt** et une **dépendance** ;
- [ ] **installer, mettre à jour, rechercher et supprimer** un logiciel avec `apt` ;
- [ ] écrire un **script Bash** : shebang, variables, arguments ;
- [ ] utiliser une **condition** (`if`) et une **boucle** (`for`) ;
- [ ] écrire un script **relançable** et gérer une **erreur**.

---

## 1. Les paquets sous Debian

### Pourquoi un gestionnaire de paquets ?

Sous Debian, on n'installe pas un logiciel en téléchargeant un programme sur un site quelconque. Les logiciels sont fournis sous forme de **paquets** (fichiers `.deb`) par des **dépôts** : des serveurs officiels qui les conservent. Le gestionnaire de paquets (`apt`) les installe **avec leurs dépendances**, vérifie leur **signature** et sait les **mettre à jour**.

| Notion | Définition |
|---|---|
| **Paquet** | le logiciel et ses fichiers, empaquetés pour être installés et supprimés proprement |
| **Dépôt** | un serveur qui publie des paquets ; ses adresses sont configurées dans `/etc/apt/` |
| **Dépendance** | un autre paquet dont le premier a besoin pour fonctionner ; `apt` l'installe automatiquement |
| **Index des paquets** | la liste locale de ce que les dépôts proposent, qu'on rafraîchit avec `apt update` |

### Les commandes

| Je veux… | Commande |
|---|---|
| rafraîchir la liste des paquets disponibles | `sudo apt update` |
| mettre à jour les paquets installés | `sudo apt upgrade` |
| chercher un paquet | `apt search mot` |
| lire la description d'un paquet | `apt show paquet` |
| installer | `sudo apt install paquet` |
| supprimer (en gardant la configuration) | `sudo apt remove paquet` |
| supprimer **avec** la configuration | `sudo apt purge paquet` |
| nettoyer les dépendances devenues inutiles | `sudo apt autoremove` |
| voir les mises à jour en attente | `apt list --upgradable` |
| lister les fichiers d'un paquet installé | `dpkg -L paquet` |

> [!IMPORTANT]
> **`apt update` ne met rien à jour sur la machine** : il rafraîchit seulement la **liste** de ce qui est disponible. La mise à jour proprement dite se fait avec `apt upgrade`. On lance `update` **avant** `install` ou `upgrade`, sinon `apt` raisonne sur une liste périmée.

> [!NOTE]
> Dans un **script**, on préfère `apt-get` (`sudo apt-get install -y paquet`) : `apt` affiche d'ailleurs un avertissement s'il est utilisé dans un script, car son affichage peut changer d'une version à l'autre.

> [!WARNING]
> N'installe pas un fichier `.deb` trouvé sur un site inconnu : un paquet exécute des commandes avec les droits d'administrateur à l'installation. On s'en tient aux **dépôts officiels** (ou à ceux que l'organisation a validés).

**Je vérifie.** Pourquoi lance-t-on `sudo apt update` avant `sudo apt install paquet` ? Et pourquoi faut-il `sudo` ?

<details markdown="1">
<summary>Voir la réponse</summary>

Pour que `apt` connaisse les versions les plus récentes proposées par les dépôts. Sans cela, il peut proposer une version périmée ou ne pas trouver le paquet. `sudo` est nécessaire car installer un logiciel modifie le système (dossiers réservés à `root`).

</details>

## 2. Un premier script Bash

Un **script** est un fichier texte qui contient des commandes, exécutées l'une après l'autre. Il évite de retaper les mêmes commandes et garantit un résultat **identique** à chaque fois.

### Anatomie

```bash
#!/bin/bash
# Ceci est un commentaire
echo "Bonjour"
```

| Élément | Rôle |
|---|---|
| `#!/bin/bash` | le **shebang** : en **première ligne**, il indique quel interpréteur exécute le fichier |
| `# …` | un commentaire : ignoré à l'exécution, utile au lecteur |
| `echo "texte"` | affiche du texte |

### Le rendre exécutable et le lancer

| Étape | Commande |
|---|---|
| donner le droit d'exécution | `chmod +x mon_script.sh` |
| le lancer | `./mon_script.sh` |
| le lancer sans le droit `x` | `bash mon_script.sh` |

On écrit `./` car le dossier courant n'est pas dans les dossiers où le shell cherche les programmes.

### Les variables et les arguments

```bash
NOM="Alice"
echo "Bonjour $NOM"
echo "Premier argument : $1"
```

| Syntaxe | Sens |
|---|---|
| `NOM="Alice"` | crée une variable ; **aucun espace** autour du `=` |
| `$NOM` | valeur de la variable |
| `$1`, `$2` | arguments donnés au script : `./script.sh a b` donne `$1` = `a`, `$2` = `b` |
| `$#` | nombre d'arguments |
| `${1:-defaut}` | `$1` s'il est donné, sinon la valeur `defaut` |

> [!IMPORTANT]
> **Entoure toujours tes variables de guillemets : `"$NOM"`.** Sans guillemets, si la valeur contient un espace (`relation client`), le shell la coupe en **deux** mots : exactement le piège de `mkdir relation client` en [S08](../S08-terminal-commandes-de-base/01-cours.md).

**Je vérifie.** Quel est le résultat de `DOSSIER="direction générale"` puis `mkdir $DOSSIER` ? Et avec `mkdir "$DOSSIER"` ?

<details markdown="1">
<summary>Voir la réponse</summary>

Sans guillemets, le shell cherche à créer **deux** dossiers : `direction` et `générale`. Avec `"$DOSSIER"`, il en crée **un seul** : `direction générale`.

</details>

## 3. Les conditions

Un script doit souvent **tester** avant d'agir : le dossier existe-t-il déjà ?

```bash
if [ -d "$DOSSIER" ]; then
    echo "Le dossier existe déjà"
else
    echo "Le dossier n'existe pas"
fi
```

| Test | Vrai si… |
|---|---|
| `[ -d "$x" ]` | `$x` est un **dossier** existant |
| `[ -f "$x" ]` | `$x` est un **fichier** ordinaire existant |
| `[ -e "$x" ]` | `$x` existe (quel qu'en soit le type) |
| `[ ! -d "$x" ]` | `$x` n'est **pas** un dossier existant |
| `[ "$a" = "$b" ]` | les deux textes sont identiques |
| `[ "$n" -eq 3 ]` | le nombre `$n` vaut 3 (`-ne` : différent, `-gt` : plus grand, `-lt` : plus petit) |

> [!WARNING]
> **Les espaces à l'intérieur des crochets sont obligatoires** : `[ -d "$x" ]`, pas `[-d "$x"]`.

### Le code de retour

Chaque commande termine avec un **code de retour** : `0` signifie **réussite**, toute autre valeur signale une **erreur**. On le lit avec `$?`, ou on teste directement la commande :

```bash
if mkdir -p "$DOSSIER"; then
    echo "Dossier prêt"
else
    echo "Échec de la création" >&2
    exit 1
fi
```

`>&2` envoie le message sur la sortie **d'erreur** ; `exit 1` arrête le script avec un code d'échec.

## 4. Les boucles

Pour répéter une action sur plusieurs éléments :

```bash
for service in "compta" "ressources humaines" "communication"; do
    echo "Service : $service"
done
```

Chaque élément qui contient un espace est **entre guillemets**, et la variable est elle aussi entre guillemets quand on s'en sert (`"$service"`).

## 5. Un script « relançable »

Un bon script d'administration doit pouvoir être **relancé** sans risque : on dit qu'il est **idempotent** (relancé, il donne le même résultat sans erreur).

| Technique | Exemple |
|---|---|
| tester avant d'agir | `if [ ! -d "$d" ]; then mkdir "$d"; fi` |
| utiliser une option prévue pour cela | `mkdir -p` ne produit **pas** d'erreur si le dossier existe, et crée les parents |
| dire ce qui a été fait ou non | « créé » / « déjà présent » |

## 6. Vérifier et déboguer un script

| Commande | Effet |
|---|---|
| `bash -n script.sh` | vérifie la **syntaxe** sans exécuter |
| `bash -x script.sh` | exécute en **affichant chaque commande** : on voit où ça casse |
| `echo "valeur = $x"` | affiche une variable pour comprendre |

**Je vérifie.** Un script marche quand tu le lances avec `bash script.sh` mais affiche « Permission denied » avec `./script.sh`. Quelle est la cause la plus probable ?

<details markdown="1">
<summary>Voir la réponse</summary>

Le fichier n'a pas le droit d'**exécution** (`x`). `bash script.sh` n'en a pas besoin ; `./script.sh` oui. Il faut `chmod +x script.sh`.

</details>
