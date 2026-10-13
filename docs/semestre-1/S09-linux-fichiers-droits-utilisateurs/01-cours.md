# Cours – Utilisateurs, groupes, droits et liens sous Linux

*BTS SIO SISR 1re année – S09 – à lire avec le [TP](02-tp.md)*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** naviguer et gérer des fichiers dans le terminal (S08), utiliser `sudo`.
> - **Mots déjà vus :** chemin absolu, chemin relatif, `sudo`, `root`, redirection.
> - **Expliqués dans ce cours :** utilisateur, groupe, propriétaire, droits `rwx` et leur notation en chiffres, `chmod`, `chown`, lien symbolique.

## À la fin de ce cours, tu sauras

- [ ] expliquer ce qu'est un **utilisateur**, un **groupe**, et où le système les enregistre ;
- [ ] **lire** les droits affichés par `ls -l` ;
- [ ] **modifier** les droits (`chmod`) et le propriétaire (`chown`, `chgrp`) ;
- [ ] expliquer l'effet des droits **sur un dossier** ;
- [ ] distinguer un **lien dur** d'un **lien symbolique**.

---

## 1. Utilisateurs et groupes

Sous Linux, chaque action est faite **par un utilisateur**, qui appartient à un ou plusieurs **groupes**. Les droits sur les fichiers dépendent de ces deux notions : on donne un accès à un utilisateur, ou à **tout un groupe** à la fois.

| Notion | Rôle |
|---|---|
| **Utilisateur** | une personne ou un service ; identifié par un nom et un numéro (**UID**) |
| **Groupe** | un ensemble d'utilisateurs ; identifié par un nom et un numéro (**GID**) |
| **Groupe principal** | le groupe attribué par défaut aux fichiers que l'utilisateur crée |
| **Groupes secondaires** | les autres groupes auxquels l'utilisateur appartient |

Le système enregistre ces informations dans des fichiers texte :

| Fichier | Contenu |
|---|---|
| `/etc/passwd` | un utilisateur par ligne : `nom:x:UID:GID:commentaire:dossier personnel:interpréteur` |
| `/etc/group` | un groupe par ligne : `nom:x:GID:membres` |
| `/etc/shadow` | les mots de passe **chiffrés** ; lisible uniquement par `root` |

### Les commandes

| Je veux… | Commande |
|---|---|
| créer un utilisateur (avec son dossier personnel) | `sudo adduser nom` |
| créer un groupe | `sudo addgroup nom` |
| ajouter un utilisateur à un groupe | `sudo usermod -aG groupe utilisateur` |
| voir les groupes d'un utilisateur | `id utilisateur` ou `groups utilisateur` |
| ouvrir une session comme un autre utilisateur | `su - utilisateur` (puis `exit` pour revenir) |

> [!WARNING]
> **N'oublie jamais le `-a` dans `usermod -aG`.** Sans `-a` (*append*, ajouter), `-G` **remplace** la liste des groupes secondaires : l'utilisateur perd tous les autres groupes, y compris `sudo`.

> [!NOTE]
> Une appartenance à un groupe n'est prise en compte qu'à **l'ouverture d'une nouvelle session**. Après `usermod`, l'utilisateur doit se reconnecter (ou utiliser `su - utilisateur`) pour que le changement s'applique.

**Je vérifie.** Que se passe-t-il si tu tapes `sudo usermod -G sudo tech2025` (sans `-a`) pour un utilisateur qui était dans le groupe `grp-commerce` ?

<details markdown="1">
<summary>Voir la réponse</summary>

La liste des groupes secondaires est **remplacée** par `sudo` seul : `tech2025` quitte `grp-commerce`. Avec `-aG`, `sudo` est **ajouté** aux groupes existants.

</details>

## 2. Lire les droits avec `ls -l`

```text
drwxrwx--- 2 root grp-commerce 4096 oct. 14 09:12 commerce
-rw-r--r-- 1 tech tech          12 oct. 14 09:15 note.txt
```

| Colonne | Signification |
|---|---|
| `drwxrwx---` | **type** et **droits** (voir ci-dessous) |
| `2` | nombre de liens |
| `root` | **propriétaire** |
| `grp-commerce` | **groupe** propriétaire |
| `4096` | taille en octets |
| `oct. 14 09:12` | date de dernière modification |
| `commerce` | nom |

### Le type (1er caractère)

| Caractère | Type |
|---|---|
| `-` | fichier ordinaire |
| `d` | dossier |
| `l` | lien symbolique |

### Les droits (9 caractères suivants)

Ils se lisent **par groupes de trois** : le **propriétaire** (`u`, *user*), le **groupe** (`g`), **les autres** (`o`, *others*).

| Lettre | Droit | Valeur |
|---|---|---|
| `r` | lecture (*read*) | 4 |
| `w` | écriture (*write*) | 2 |
| `x` | exécution (*execute*) | 1 |
| `-` | droit absent | 0 |

Exemple : `rwxr-x---` = propriétaire `rwx` (4+2+1 = **7**), groupe `r-x` (4+0+1 = **5**), autres `---` (**0**). En octal : **750**.

### Ce que les droits signifient sur un dossier

| Droit | Sur un fichier | Sur un dossier |
|---|---|---|
| `r` | lire le contenu | **lister** les noms qu'il contient |
| `w` | modifier le contenu | **créer, renommer et supprimer** des éléments dedans |
| `x` | exécuter le fichier (programme, script) | **traverser** le dossier : y entrer (`cd`) et accéder à ce qu'il contient |

> [!IMPORTANT]
> Pour atteindre un fichier, il faut le droit `x` sur **tous les dossiers du chemin**. Un dossier sans `x` pour toi est une porte fermée, même si le fichier à l'intérieur est lisible.

**Je vérifie.** Que peut faire un utilisateur « autre » sur un dossier en `rwxr-x---` ? Et sur un dossier en `rwxr-xr-x` ?

<details markdown="1">
<summary>Voir la réponse</summary>

En `rwxr-x---` : rien du tout (`---`), il ne peut même pas entrer. En `rwxr-xr-x` : il peut lister et traverser (`r-x`), mais pas créer ni supprimer.

</details>

## 3. Modifier les droits et le propriétaire

### `chmod` : changer les droits

| Notation | Exemple | Effet |
|---|---|---|
| **Octale** | `chmod 750 dossier` | propriétaire `rwx`, groupe `r-x`, autres `---` |
| **Symbolique** | `chmod g+w dossier` | **ajoute** l'écriture au groupe |
| | `chmod o-rwx dossier` | **retire** tous les droits aux autres |
| | `chmod u=rwx,g=rx,o= dossier` | **fixe** les droits de chaque catégorie |

`chmod -R` applique le changement à tout le contenu du dossier.

**Passer de la lettre au chiffre :** additionne `r`=4, `w`=2, `x`=1 pour **chaque** groupe de trois lettres.

| Lettres | Calcul | Octal |
|---|---|---|
| `rwx` | 4 + 2 + 1 | **7** |
| `rw-` | 4 + 2 + 0 | **6** |
| `r-x` | 4 + 0 + 1 | **5** |
| `r--` | 4 + 0 + 0 | **4** |

**Je vérifie.** Écris `rw-r-----` en octal, puis donne les lettres de `755`.

<details markdown="1">
<summary>Voir la réponse</summary>

`rw-` = 6, `r--` = 4, `---` = 0 : **640**. Et `755` = `rwx` (7), `r-x` (5), `r-x` (5) : **`rwxr-xr-x`**.

</details>

### `chown` et `chgrp` : changer le propriétaire et le groupe

| Commande | Effet |
|---|---|
| `sudo chown utilisateur fichier` | change le propriétaire |
| `sudo chown utilisateur:groupe fichier` | change le propriétaire et le groupe |
| `sudo chgrp groupe fichier` | change le groupe seulement |

Ces changements demandent en général les droits d'administrateur (`sudo`).

### Droits par défaut : le `umask` <span class="technique">notion technique</span>

> [!TIP] Pour aller plus loin
> Le `umask` n'est pas exigé en première année : retiens seulement que **les nouveaux fichiers reçoivent des droits par défaut**, que l'on corrige ensuite avec `chmod`.

Les droits d'un **nouveau** fichier ou dossier dépendent d'un réglage de l'utilisateur appelé **`umask`**. Tape `umask` pour le voir et crée un fichier pour constater le résultat.

### Le bit « setgid » sur un dossier partagé

Quand un utilisateur crée un fichier, celui-ci appartient normalement à **son** groupe principal. Dans un dossier partagé, ce n'est pas ce qu'on veut. En posant le **bit setgid** sur le dossier (`chmod g+s`, ou le chiffre `2` devant l'octal : `2770`), les nouveaux éléments **héritent du groupe du dossier**. On le repère par un `s` à la place du `x` du groupe : `drwxrws---`.

**Je vérifie.** Que représente `chmod 2770 dossier` ?

<details markdown="1">
<summary>Voir la réponse</summary>

`rwx` pour le propriétaire, `rwx` pour le groupe, rien pour les autres (770), plus le bit **setgid** (le `2` devant) : les fichiers créés dans le dossier appartiennent au groupe du dossier.

</details>

## 4. Les liens <span class="technique">notion technique</span>

> [!TIP] Pour aller plus loin
> Les liens ne font pas partie du socle exigé : retiens qu'un **lien symbolique** est un raccourci, et que le **lien dur** (même `inode`, c'est-à-dire même numéro interne de fichier) est une notion technique facultative.

Un **lien** permet d'atteindre un même contenu sous un autre nom ou depuis un autre endroit.

| | **Lien dur** | **Lien symbolique** |
|---|---|---|
| Commande | `ln cible lien` | `ln -s cible lien` |
| Principe | un **second nom** pour les **mêmes données** | un **petit fichier** qui contient le **chemin** de la cible |
| Si on **supprime** la cible | le lien dur continue de fonctionner (les données existent tant qu'il reste un nom) | le lien est **cassé** (il pointe vers un chemin qui n'existe plus) |
| Si on **déplace ou renomme** la cible | le lien dur continue de fonctionner | le lien est **cassé**, sauf s'il est relatif et déplacé avec la cible |
| Sur un dossier | impossible | possible |
| Voir dans `ls -l` | même numéro d'`inode` (`ls -li`), compteur de liens augmenté | type `l`, avec `->` vers la cible |

Un lien symbolique peut contenir un chemin **absolu** (`/home/tech2025/CommandesLinux/couleur/chaude/rouge.txt`) ou **relatif** (`rouge.txt`, ou `../froide/bleu.txt`). Un chemin relatif est calculé à partir du **dossier où se trouve le lien**, pas du dossier où tu te trouves quand tu le tapes.

> [!NOTE]
> Un lien dur ne peut pas sortir du **système de fichiers** (partition) de sa cible.

**Je vérifie.** Tu renommes le dossier qui contient la cible. Un lien symbolique **absolu** vers cette cible fonctionne-t-il encore ? Et un lien **dur** ?

<details markdown="1">
<summary>Voir la réponse</summary>

Le lien symbolique absolu est **cassé** : le chemin qu'il contient n'existe plus. Le lien dur fonctionne toujours : il désigne directement les données, pas un chemin.

</details>

## 5. Afficher un fichier

| Commande | Effet |
|---|---|
| `cat fichier` | affiche tout le fichier d'un coup |
| `less fichier` | affiche **page par page** ; `Espace` page suivante, `b` page précédente, `/mot` pour chercher, `q` pour quitter |
| `head -n 5 fichier` · `tail -n 5 fichier` | les 5 premières · les 5 dernières lignes |

Pour un long fichier (comme `/etc/services`), `cat` fait défiler l'écran sans qu'on puisse lire : on utilise `less`.
