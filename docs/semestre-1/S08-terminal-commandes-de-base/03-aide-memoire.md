# Aide-mémoire – Terminal Linux : commandes de base

*BTS SIO SISR 1re année – S08*

## Se repérer et naviguer

| Commande | Rôle |
|---|---|
| `pwd` | afficher le dossier courant (chemin complet) |
| `ls` · `ls -l` · `ls -a` · `ls -R` | lister · liste détaillée · avec les fichiers cachés · récursif |
| `cd dossier` | entrer dans un dossier |
| `cd ..` · `cd -` · `cd` | remonter d'un niveau · revenir au dossier précédent · aller au dossier personnel |
| `clear` (ou `Ctrl + L`) | effacer l'écran |
| `exit` | fermer la session |

## Chemins

| Notation | Sens |
|---|---|
| `/dossier/fichier` | chemin **absolu** (part de la racine) |
| `dossier/fichier` | chemin **relatif** (part du dossier courant) |
| `.` · `..` · `~` | dossier courant · dossier parent · dossier personnel |

## Fichiers et dossiers

| Je veux… | Commande |
|---|---|
| créer un dossier (et ses parents) | `mkdir dossier` · `mkdir -p a/b/c` |
| créer un fichier vide | `touch fichier` |
| afficher un fichier | `cat fichier` |
| copier · copier un dossier | `cp src dest` · `cp -r src dest` |
| déplacer ou renommer | `mv src dest` |
| supprimer un fichier · un dossier vide · un dossier et son contenu | `rm fichier` · `rmdir dossier` · `rm -r dossier` |
| connaître le type d'un fichier | `file fichier` |
| chercher par nom | `find dossier -name "motif"` |
| archiver et compresser | `tar -czf archive.tar.gz dossier` |
| copier vers une autre machine (SSH) | `scp fichier utilisateur@machine:/chemin` |

## Observer la machine

| Commande | Rôle |
|---|---|
| `df -h` | espace disque par système de fichiers |
| `du -sh dossier` | taille totale d'un dossier |
| `free -m` | mémoire, en Mo |
| `date` | date et heure |
| `history` | commandes déjà tapées |

## Clavier et aide

| Geste | Effet |
|---|---|
| `Tab` | compléter |
| Flèches haut et bas | commandes précédentes |
| `Ctrl + R` | rechercher dans l'historique |
| `Ctrl + C` | interrompre la commande |
| `commande --help` · `man commande` · `help` | résumé · manuel (quitter avec `q`) · aide des commandes internes de bash |

## Droits d'administrateur

| Commande | Rôle |
|---|---|
| `sudo commande` | exécuter **une** commande en administrateur (avec son propre mot de passe) |
| `su -` · `sudo -i` | ouvrir une **session** root (quitter avec `exit`) |

## Noms avec espace ou accent

| Méthode | Exemple |
|---|---|
| guillemets | `mkdir "relation client"` |
| antislash | `mkdir relation\ client` |

> [!WARNING]
> **Pas de corbeille** : `rm` supprime définitivement. Vérifie `pwd` et `ls` avant `rm -r`.

## Ma démarche en cas de blocage

1. Je **relis** le message d'erreur en entier.
2. Je regarde **où je suis** (`pwd`) et **ce qu'il y a** (`ls`).
3. Je cherche dans `--help` ou `man`.
4. J'en parle à mon binôme, puis à l'enseignant.
