# Aide-mémoire – Utilisateurs, droits et liens

*BTS SIO SISR 1re année – S09*

## Utilisateurs et groupes

| Je veux… | Commande |
|---|---|
| créer un utilisateur | `sudo adduser nom` |
| créer un groupe | `sudo addgroup nom` |
| ajouter à un groupe (sans retirer les autres) | `sudo usermod -aG groupe utilisateur` |
| voir les groupes | `id utilisateur` · `groups utilisateur` |
| prendre la session d'un utilisateur | `su - utilisateur` (puis `exit`) |
| où c'est enregistré | `/etc/passwd` · `/etc/group` · `/etc/shadow` (mots de passe chiffrés, `root` seul) |

> [!WARNING]
> `usermod -G` **sans `-a`** remplace tous les groupes secondaires.

## Lire `ls -l`

```text
drwxrws--- 2 root grp-commerce 4096 oct. 14 09:12 commerce
```

| `d` | `rwx` | `rws` | `---` |
|---|---|---|---|
| type : `-` fichier, `d` dossier, `l` lien | propriétaire | groupe (`s` = setgid) | autres |

| Droit | Valeur | Fichier | Dossier |
|---|---|---|---|
| `r` | 4 | lire | lister les noms |
| `w` | 2 | modifier | créer, renommer, supprimer dedans |
| `x` | 1 | exécuter | traverser (entrer, accéder au contenu) |

## Modifier

| Commande | Exemple |
|---|---|
| `chmod` octal | `chmod 750 dossier` = `rwxr-x---` |
| `chmod` symbolique | `chmod g+w f` · `chmod o-rwx f` · `chmod u=rwx,g=rx,o= f` |
| setgid (groupe hérité) | `chmod 2770 dossier` ou `chmod g+s dossier` |
| tout le contenu | `chmod -R …` |
| propriétaire et groupe | `sudo chown utilisateur:groupe fichier` · `sudo chgrp groupe fichier` |
| voir les droits par défaut | `umask` |

## Liens

| | Lien dur | Lien symbolique |
|---|---|---|
| Commande | `ln cible lien` | `ln -s cible lien` |
| Principe | autre nom pour les mêmes données | contient un chemin |
| Cible supprimée | le lien fonctionne | lien cassé |
| Cible déplacée | le lien fonctionne | cassé (absolu) · fonctionne si relatif et déplacé avec la cible |
| Voir | `ls -li` : même inode | `ls -l` : `->` |

## Dossiers et fichiers (rappels)

| Commande | Rôle |
|---|---|
| `mkdir -p a/b/c` | créer une arborescence |
| `rmdir` · `rmdir -p a/b/c` | supprimer un dossier **vide** · une chaîne de dossiers vides |
| `rm -r` | supprimer un dossier **et son contenu** (sans corbeille) |
| `cp -r` | copier un dossier |
| `cat` · `less` · `head -n` · `tail -n` | afficher · page par page (`q` pour quitter) · début · fin |
