# Cours – Utilisateurs, groupes, droits et liens sous Linux

*BTS SIO SISR 1re année – S09 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

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
- [ ] expliquer ce qui rend un **mot de passe** solide, ce qu'apporte la **double authentification** et reconnaître un **hameçonnage**.

> [!NOTE] Socle et pour aller plus loin
> Le **socle** : utilisateurs et groupes (§ 1), lecture des droits (§ 2), `chmod`, `chown`, setgid (§ 3) et affichage d'un fichier (§ 5). Le `umask` et les **liens** (§ 4) sont des **compléments** : ils ne sont pas exigés. L'**hygiène numérique** (§ 6) se lit pour la partie F du TP.

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **Avoir `w` sur un dossier me permet de modifier un fichier qui n'est pas à moi.** » Non : `w` sur un **dossier** permet de créer, renommer et supprimer ce qu'il contient ; modifier le contenu d'un fichier demande `w` **sur le fichier** (§ 2).
> - « **`chmod 777` règle tout.** » Cela règle le message d'erreur en ouvrant l'accès à **tout le monde** : c'est presque toujours une mauvaise réponse (§ 3).
> - « **Un lien dur est une copie.** » Non : c'est un **second nom** pour les mêmes données (§ 4).

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

<figure class="raid-fig">
<svg viewBox="0 0 720 266" role="img" aria-labelledby="dr-t" xmlns="http://www.w3.org/2000/svg"><title id="dr-t">Décomposition de drwxr-x--- en type, propriétaire, groupe et autres, puis calcul de l'octal 750</title>
<text x="55" y="38" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:700">Type</text><rect x="20" y="48" width="70" height="48" rx="8" class="rd-blk rd-k-d" /><text x="55" y="79" text-anchor="middle" class="rd-t" style="font-size:20px;font-weight:700">d</text><text x="55" y="114" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:500">dossier</text><text x="200" y="38" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:700">Propriétaire (u)</text><rect x="110" y="48" width="54" height="48" rx="8" class="rd-blk rd-k-a" /><text x="137" y="79" text-anchor="middle" class="rd-t" style="font-size:20px;font-weight:700">r</text><text x="137" y="114" text-anchor="middle" class="rd-note" style="font-size:13px;font-weight:500">4</text><rect x="170" y="48" width="54" height="48" rx="8" class="rd-blk rd-k-b" /><text x="197" y="79" text-anchor="middle" class="rd-t" style="font-size:20px;font-weight:700">w</text><text x="197" y="114" text-anchor="middle" class="rd-note" style="font-size:13px;font-weight:500">2</text><rect x="230" y="48" width="54" height="48" rx="8" class="rd-blk rd-k-c" /><text x="257" y="79" text-anchor="middle" class="rd-t" style="font-size:20px;font-weight:700">x</text><text x="257" y="114" text-anchor="middle" class="rd-note" style="font-size:13px;font-weight:500">1</text><text x="200" y="152" text-anchor="middle" class="rd-t" style="font-size:15px;font-weight:700">4 + 2 + 1 = 7</text><text x="410" y="38" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:700">Groupe (g)</text><rect x="320" y="48" width="54" height="48" rx="8" class="rd-blk rd-k-a" /><text x="347" y="79" text-anchor="middle" class="rd-t" style="font-size:20px;font-weight:700">r</text><text x="347" y="114" text-anchor="middle" class="rd-note" style="font-size:13px;font-weight:500">4</text><rect x="380" y="48" width="54" height="48" rx="8" class="rd-blk rd-disk" /><text x="407" y="79" text-anchor="middle" class="rd-t" style="font-size:20px;font-weight:700">-</text><text x="407" y="114" text-anchor="middle" class="rd-note" style="font-size:13px;font-weight:500">0</text><rect x="440" y="48" width="54" height="48" rx="8" class="rd-blk rd-k-c" /><text x="467" y="79" text-anchor="middle" class="rd-t" style="font-size:20px;font-weight:700">x</text><text x="467" y="114" text-anchor="middle" class="rd-note" style="font-size:13px;font-weight:500">1</text><text x="410" y="152" text-anchor="middle" class="rd-t" style="font-size:15px;font-weight:700">4 + 0 + 1 = 5</text><text x="620" y="38" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:700">Autres (o)</text><rect x="530" y="48" width="54" height="48" rx="8" class="rd-blk rd-disk" /><text x="557" y="79" text-anchor="middle" class="rd-t" style="font-size:20px;font-weight:700">-</text><text x="557" y="114" text-anchor="middle" class="rd-note" style="font-size:13px;font-weight:500">0</text><rect x="590" y="48" width="54" height="48" rx="8" class="rd-blk rd-disk" /><text x="617" y="79" text-anchor="middle" class="rd-t" style="font-size:20px;font-weight:700">-</text><text x="617" y="114" text-anchor="middle" class="rd-note" style="font-size:13px;font-weight:500">0</text><rect x="650" y="48" width="54" height="48" rx="8" class="rd-blk rd-disk" /><text x="677" y="79" text-anchor="middle" class="rd-t" style="font-size:20px;font-weight:700">-</text><text x="677" y="114" text-anchor="middle" class="rd-note" style="font-size:13px;font-weight:500">0</text><text x="620" y="152" text-anchor="middle" class="rd-t" style="font-size:15px;font-weight:700">0 + 0 + 0 = 0</text><line x1="20" y1="132" x2="700" y2="132" class="rd-arrow" style="stroke-dasharray:4 4;stroke-width:1"/><text x="20" y="118" text-anchor="middle" class="rd-t" style="font-size:1px;font-weight:700"></text><text x="110" y="190" text-anchor="start" class="rd-note" style="font-size:13px;font-weight:600">r = 4</text><text x="190" y="190" text-anchor="start" class="rd-note" style="font-size:13px;font-weight:600">w = 2</text><text x="270" y="190" text-anchor="start" class="rd-note" style="font-size:13px;font-weight:600">x = 1</text><text x="350" y="190" text-anchor="start" class="rd-note" style="font-size:13px;font-weight:600">- = 0</text><rect x="250" y="206" width="220" height="44" rx="8" class="rd-blk rd-k-d" /><text x="360" y="234" text-anchor="middle" class="rd-t" style="font-size:18px;font-weight:700">chmod 750</text><text x="484" y="234" text-anchor="start" class="rd-note" style="font-size:13px;font-weight:500">= 7 · 5 · 0 dans l'ordre u · g · o</text>
</svg>
<figcaption>Lecture de <code>drwxr-x---</code> : un type, puis trois groupes de trois droits. Chaque groupe s'additionne en un chiffre.</figcaption>
</figure>


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

### Droits par défaut : le `umask` <span class="technique">complément</span>

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

### Exemple résolu : un dossier partagé par un groupe

**Situation (fictive).** Inès et Karim, du groupe `grp-logistique`, doivent travailler dans `/var/partage/logistique`. Sam, du groupe `grp-direction`, ne doit **rien voir** de ce dossier.

| Étape | Commande | Effet |
|---|---|---|
| 1 | `sudo mkdir /var/partage/logistique` | crée le dossier |
| 2 | `sudo chown root:grp-logistique /var/partage/logistique` | propriétaire `root`, groupe `grp-logistique` |
| 3 | `sudo chmod 2770 /var/partage/logistique` | `rwx` pour `root`, `rwx` pour le groupe, `---` pour les autres, plus **setgid** |

Résultat attendu avec `ls -ld` : `drwxrws--- 2 root grp-logistique … logistique`.

| Qui ? | Ce qu'il peut faire | Pourquoi |
|---|---|---|
| **Inès** (membre) | entrer, lister, créer des fichiers ; ses fichiers appartiennent à `grp-logistique` | droits `rwx` du groupe ; le **setgid** transmet le groupe du dossier |
| **Sam** (autre) | rien : `Permission denied` dès le `cd` | les « autres » ont `---` |

Pour qu'Inès arrive jusqu'au dossier, il faut aussi le droit `x` sur **chaque dossier du chemin** (`/var`, `/var/partage`).

**Je vérifie.** Karim vient d'être ajouté à `grp-logistique` avec `sudo usermod -aG grp-logistique karim`. Il est déjà connecté : peut-il entrer dans le dossier ?

<details markdown="1">
<summary>Voir la réponse</summary>

Pas encore : l'appartenance à un groupe n'est prise en compte qu'à l'**ouverture d'une nouvelle session**. Il doit se déconnecter et se reconnecter.

</details>

### Erreurs fréquentes

| Erreur | Ce qu'on observe | Correction |
|---|---|---|
| `x` oublié sur un dossier parent | `Permission denied` alors que le fichier est lisible | donner `x` à chaque dossier du chemin |
| `usermod -G` sans `-a` | l'utilisateur perd ses autres groupes | `usermod -aG` |
| Ne pas se reconnecter après `usermod` | l'accès est toujours refusé | ouvrir une nouvelle session |
| `chown` sans `sudo` | `Operation not permitted` | `sudo chown …` |
| `chmod 777` pour « que ça marche » | tout le monde peut lire, écrire, supprimer | choisir les droits utiles (ex. `770` + groupe) |

## 4. Les liens <span class="technique">complément</span>

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

## 6. Hygiène numérique : mots de passe, double authentification, hameçonnage

Les droits posés sur les fichiers ne protègent rien si un **compte** est volé : la sécurité des **usages** fait partie du métier.

**Le mot de passe.** Plus il y a de combinaisons possibles, plus il est long à deviner par essais successifs. Le nombre de combinaisons est (nombre de caractères possibles) **puissance** (longueur).

| Mot de passe | Calcul | Combinaisons |
|---|---|---|
| 8 lettres minuscules | 26⁸ | ≈ 2,1 × 10¹¹ |
| 8 caractères parmi 62 (lettres et chiffres) | 62⁸ | ≈ 2,2 × 10¹⁴ |
| 12 lettres minuscules | 26¹² | ≈ 9,5 × 10¹⁶ |

La **longueur** pèse plus que la variété : 12 minuscules dépassent largement 8 caractères variés. (Ces chiffres supposent un mot de passe **choisi au hasard** : un mot du dictionnaire ou une date se devine bien plus vite.)

**Comment le système le stocke.** Linux ne garde pas le mot de passe : il garde une **empreinte** (hachage), dans `/etc/shadow` (lisible seulement par `root`, voir § 1). À la connexion, il calcule l'empreinte de ce que tu tapes et la **compare**. Le début de la chaîne indique l'algorithme utilisé. La commande `chage` règle une **durée de validité** (`chage -M 90 compte`) et `chage -l compte` affiche la règle. Imposer des changements fréquents est une pratique **discutée** : à débattre en classe.

**La double authentification (MFA).** Un **facteur** est ce que tu **sais** (mot de passe), ce que tu **as** (téléphone, clé de sécurité) ou ce que tu **es** (empreinte digitale). La double authentification en combine **deux** : voler le mot de passe ne suffit plus. Elle ajoute une petite contrainte à l'utilisateur ; on la met **en premier** sur les comptes les plus puissants (administrateurs, messagerie, accès à distance).

**L'hameçonnage** (*phishing*) est un message qui se fait passer pour une personne ou un service de confiance pour obtenir un clic, un mot de passe ou un paiement. **Indices** : urgence ou menace, expéditeur ou domaine inhabituel, lien qui mène ailleurs que ce qu'il annonce, demande inhabituelle d'argent ou d'identifiants, message imprévu. **Bonne réaction** : ne pas cliquer, ne rien répondre, **signaler** au service informatique, supprimer.

**Je vérifie.** Pourquoi un mot de passe de 12 lettres minuscules est-il plus difficile à deviner qu'un mot de passe de 8 caractères mêlant lettres et chiffres ?

<details markdown="1">
<summary>Voir la réponse</summary>

Parce que la longueur augmente l'exposant : 26¹² ≈ 9,5 × 10¹⁶ contre 62⁸ ≈ 2,2 × 10¹⁴ combinaisons. Chaque caractère ajouté multiplie le nombre de combinaisons.

</details>

**Je vérifie.** Pourquoi `/etc/shadow` contient-il une empreinte et non le mot de passe ?

<details markdown="1">
<summary>Voir la réponse</summary>

Pour que quelqu'un qui lit le fichier ne puisse pas retrouver le mot de passe : le système compare l'empreinte de ce qui est tapé à l'empreinte enregistrée, sans jamais conserver le mot de passe lui-même.

</details>
