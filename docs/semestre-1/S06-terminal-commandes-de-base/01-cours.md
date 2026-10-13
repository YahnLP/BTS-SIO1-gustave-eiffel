# Cours – Le terminal Linux : les commandes de base

*BTS SIO SISR 1re année – S06 – à lire avant le [TP](02-tp.md)*

## À la fin de ce cours, tu sauras

- [ ] lire un **prompt** et dire qui tu es, sur quelle machine, dans quel dossier ;
- [ ] décrire l'**arborescence** de Linux et distinguer un chemin **absolu** d'un chemin **relatif** ;
- [ ] utiliser les commandes de **navigation**, d'**observation** et de **gestion de fichiers** ;
- [ ] expliquer ce que fait **`sudo`** et ce qui le distingue d'une session **root** ;
- [ ] écrire un nom de dossier contenant **un espace ou un accent** sans casser la commande.

---

## 1. Le terminal, le shell et le prompt

Sur un serveur, on travaille le plus souvent **sans interface graphique** : on tape des commandes dans un **terminal**. Le programme qui lit ces commandes s'appelle le **shell** ; sous Debian, c'est **bash**.

Le **prompt** est le texte qui précède ta saisie :

```text
tech@serveur:~$
```

| Partie | Signification |
|---|---|
| `tech` | l'utilisateur connecté |
| `serveur` | le nom de la machine |
| `~` | le dossier courant (`~` désigne le dossier personnel) |
| `$` | utilisateur ordinaire (un `#` indique l'utilisateur **root**) |

> [!TIP]
> **Lis toujours le prompt avant de taper.** Il t'indique qui tu es et où tu es : une commande de suppression n'a pas les mêmes conséquences dans `~` que dans `/`.

Une commande s'écrit : `commande -options arguments`. Exemple : `ls -l /etc` (la commande `ls`, l'option `-l`, l'argument `/etc`).

## 2. L'arborescence de Linux

Sous Linux, tout est rangé dans **un seul arbre** qui part de la **racine**, notée `/`. Il n'y a pas de lettres de lecteur comme `C:` ou `E:`.

| Dossier | Contenu habituel |
|---|---|
| `/` | la racine : le point de départ de tout |
| `/home` | les dossiers personnels des utilisateurs |
| `/etc` | les fichiers de configuration du système et des services |
| `/var` | les données qui changent : journaux, fichiers de services, etc. |
| `/tmp` | les fichiers temporaires |
| `/usr` | les programmes et leurs fichiers |

Dans cette séance, les dossiers partagés de l'entreprise seront créés dans **`/var/partage`**. Ce dossier n'existe pas d'origine : c'est l'administrateur qui le crée.

### Chemin absolu et chemin relatif

- Un chemin **absolu** commence par `/` : il part de la racine et fonctionne **depuis n'importe où**. Exemple : `/etc/hostname`.
- Un chemin **relatif** ne commence **pas** par `/` : il part du **dossier courant**. Exemple : depuis `/etc`, le fichier s'appelle simplement `hostname`.

Trois raccourcis à connaître :

| Symbole | Signification |
|---|---|
| `.` | le dossier courant |
| `..` | le dossier **parent** (celui du dessus) |
| `~` | ton dossier personnel |

**Je vérifie.** Depuis `/var/log`, que désigne `../..` ? Et que donne `cd` tout seul, sans argument ?

<details markdown="1">
<summary>Voir la réponse</summary>

`../..` remonte de deux niveaux : de `/var/log` vers `/var`, puis vers `/` (la racine). `cd` sans argument ramène au **dossier personnel**.

</details>

## 3. Naviguer et observer

| Commande | Rôle |
|---|---|
| `pwd` | affiche le **chemin complet** du dossier courant |
| `ls` | liste le contenu du dossier |
| `ls -l` | liste **détaillée** : type, droits, propriétaire, taille, date |
| `ls -a` | affiche aussi les fichiers **cachés** (ceux dont le nom commence par un point) |
| `cd dossier` | change de dossier |
| `cd ..` | remonte d'un niveau |
| `cd -` | retourne au **dossier précédent** |
| `clear` | efface l'écran (le raccourci `Ctrl + L` fait de même) |
| `exit` | ferme la session du terminal |

> [!IMPORTANT]
> **`cd /home` et `cd home` ne sont pas la même commande.** Le premier est un chemin **absolu** (il fonctionne partout) ; le second est **relatif** (il cherche un dossier `home` dans le dossier courant, et échoue s'il n'existe pas).

### Gagner du temps : le clavier

| Geste | Effet |
|---|---|
| Touche **Tab** | complète un nom de fichier ou de commande |
| Flèches **haut / bas** | parcourent les commandes déjà tapées |
| **Ctrl + R** puis quelques lettres | **recherche** dans l'historique |
| **Ctrl + C** | **interrompt** la commande en cours |
| `history` | affiche la liste des commandes tapées |

### Chercher de l'aide

Avant de demander, on cherche : `commande --help` donne un résumé ; `man commande` ouvre le manuel complet (on le quitte avec la touche `q`). Dans bash, `help` décrit les commandes internes au shell.

## 4. Observer la machine

| Commande | Ce qu'elle affiche |
|---|---|
| `df -h` | l'**espace disque** de chaque système de fichiers monté (`-h` : tailles lisibles) |
| `du -sh dossier` | la **taille totale** d'un dossier (`-s` : un seul total ; `-h` : lisible) |
| `free -m` | la **mémoire** utilisée et libre, en mégaoctets |
| `date` | la date et l'heure du système |

**Je vérifie.** Quelle différence y a-t-il entre `df` et `du` ?

<details markdown="1">
<summary>Voir la réponse</summary>

`df` répond à « combien reste-t-il de place sur chaque disque ou partition ? » ; `du` répond à « combien de place **ce dossier** occupe-t-il ? ». L'un regarde le **contenant**, l'autre le **contenu**.

</details>

## 5. Créer, copier, déplacer, supprimer

| Je veux… | Commande |
|---|---|
| créer un dossier | `mkdir dossier` |
| créer un dossier **et ses parents** | `mkdir -p a/b/c` |
| créer un fichier vide | `touch fichier` |
| afficher le contenu d'un fichier | `cat fichier` |
| copier un fichier | `cp source destination` |
| copier un dossier avec son contenu | `cp -r source destination` |
| déplacer **ou renommer** | `mv source destination` |
| supprimer un fichier | `rm fichier` |
| supprimer un dossier **vide** | `rmdir dossier` |
| supprimer un dossier **et son contenu** | `rm -r dossier` |
| connaître le type d'un fichier | `file fichier` |
| chercher un fichier | `find dossier -name "motif"` |
| créer une archive compressée | `tar -czf archive.tar.gz dossier` |
| copier un fichier vers une autre machine, de façon chiffrée | `scp fichier utilisateur@machine:/chemin` |

> [!WARNING]
> **Il n'y a pas de corbeille dans le terminal.** `rm` supprime **définitivement**. Avant `rm -r`, vérifie avec `pwd` et `ls` que tu es au bon endroit.

> [!NOTE]
> `scp` s'appuie sur SSH, qui sera vu plus tard : il est cité ici pour connaître son existence, pas pour être manipulé en S06.

**Je vérifie.** Comment renommer un fichier avec les commandes ci-dessus ?

<details markdown="1">
<summary>Voir la réponse</summary>

Avec `mv` : renommer, c'est « déplacer » le fichier vers un nouveau nom dans le même dossier. Exemple : `mv ancien.txt nouveau.txt`.

</details>

## 6. `sudo` et `root`

Sous Linux, l'utilisateur **`root`** est l'administrateur : il peut tout lire, tout modifier, tout supprimer. Créer un dossier dans `/var` demande ces droits.

- **`sudo commande`** exécute **une seule commande** avec les droits de l'administrateur. On saisit **son propre mot de passe**, et l'utilisateur doit y être autorisé (sous Debian, en général par l'appartenance au groupe `sudo`).
- Une session **root** (par exemple avec `su -` ou `sudo -i`) donne les droits d'administrateur pour **toutes** les commandes suivantes, jusqu'à `exit`.

| | `sudo commande` | Session root |
|---|---|---|
| Droits | le temps d'**une** commande | pour **toute** la session |
| Risque d'erreur | limité | élevé : plus aucune barrière |
| Mot de passe saisi | **le sien** | celui de root (`su -`) ou le sien (`sudo -i`) |

> [!IMPORTANT]
> **Bonne pratique :** travailler avec un utilisateur ordinaire et ne prendre les droits d'administrateur que **commande par commande**, avec `sudo`. On limite ainsi les dégâts d'une faute de frappe, et l'usage de `sudo` laisse une trace dans les journaux du système.

**Je vérifie.** Pourquoi `mkdir /var/partage` échoue-t-il pour un utilisateur ordinaire, alors que `sudo mkdir /var/partage` réussit ?

<details markdown="1">
<summary>Voir la réponse</summary>

Le dossier `/var` appartient à `root` : un utilisateur ordinaire n'a pas le droit d'y créer quoi que ce soit. `sudo` exécute la commande avec les droits de `root`, qui, eux, l'autorisent.

</details>

## 7. Espaces et accents dans les noms

Le shell sépare les mots **avec les espaces**. Pour créer un dossier `relation client` (deux mots), il faut dire au shell que c'est **un seul nom** :

| Méthode | Exemple |
|---|---|
| Guillemets | `mkdir "relation client"` |
| Antislash devant l'espace | `mkdir relation\ client` |

Sans cela, `mkdir relation client` crée **deux** dossiers : `relation` et `client`.

Les accents (é, è…) fonctionnent si le système est configuré en UTF-8, mais ils compliquent la saisie sur un clavier étranger. En pratique, dans les noms de dossiers partagés, on évite souvent les espaces et les accents ; ici, on **respecte les noms demandés** par l'entreprise.

**Je vérifie.** Que se passe-t-il avec `mkdir direction générale` ?

<details markdown="1">
<summary>Voir la réponse</summary>

Deux dossiers sont créés : `direction` et `générale`, au lieu d'un seul `direction générale`. Il fallait écrire `mkdir "direction générale"`.

</details>
