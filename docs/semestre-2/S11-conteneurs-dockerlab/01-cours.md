# Cours – Les conteneurs

*BTS SIO SISR 1re année – S11 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** terminal Linux (S08 à S10) ; ce qu'est une VM (S06) ; port et adresse IP : voir la fiche [minimum réseau](../../ressources/minimum-reseau.md).
> - **Mots déjà vus :** machine virtuelle, noyau, conteneur (cité en S06), `sudo`, paquet.
> - **Expliqués dans ce cours :** image, conteneur, registre, cycle de vie, port publié, variable d'environnement, volume, réseau Docker. **Session chargée, soyez concentrés** : prends le temps de remplir ta fiche de commandes.

## À la fin de ce cours, tu sauras

- [ ] expliquer ce qui distingue un **conteneur** d'une **machine virtuelle** ;
- [ ] distinguer **image**, **conteneur**, **registre** et **tag** ;
- [ ] utiliser les commandes du **cycle de vie** d'un conteneur ;
- [ ] **publier un port** et **configurer** un conteneur avec `-e` ;
- [ ] **conserver des données** avec un **volume** ;
- [ ] **relier** des conteneurs par un **réseau** et les joindre par leur **nom** ;
- [ ] **diagnostiquer** un conteneur qui s'arrête.

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **Un conteneur, c'est une petite VM.** » Non : il n'a pas son propre noyau ; c'est un **processus isolé** qui partage celui de l'hôte (§ 2).
> - « **`docker stop` supprime le conteneur.** » Non : il passe à l'état *Exited* ; il faut `docker rm` pour le supprimer (§ 4).
> - « **`latest` est la dernière version stable.** » Non : c'est un tag comme un autre ; en production on fixe la version (§ 3).

---

## 1. Pourquoi des conteneurs ?

Installer une application (serveur Web, base de données…) sur un serveur demande de régler des **dépendances** : versions de bibliothèques, fichiers de configuration, ports. « Ça marche sur ma machine » ne garantit pas que ça marche sur la machine voisine. Un **conteneur** emballe l'application **avec ce dont elle a besoin** et la fait tourner **isolée** du reste du système, de façon **reproductible**.

## 2. Machine virtuelle ou conteneur ?

| | Machine virtuelle (S06, S07) | Conteneur |
|---|---|---|
| **Ce qui est isolé** | Une machine complète, avec son **propre noyau** | Un ou plusieurs **processus**, avec leur système de fichiers, leur réseau |
| **Noyau** | Un noyau par VM | **Le noyau de l'hôte, partagé** |
| **Poids** | De l'ordre de plusieurs Gio | Souvent quelques dizaines à quelques centaines de Mio |
| **Démarrage** | Dizaines de secondes à minutes (démarrage d'un système) | Environ une seconde (démarrage d'un processus) |
| **Isolation** | Forte (matériel virtualisé) | Plus faible (noyau commun) |
| **Usage typique** | Un système d'exploitation complet, un autre OS | Une application et ses dépendances |

> [!NOTE]
> **Un conteneur « Linux » nécessite un noyau Linux.** Sous Windows ou macOS, les outils comme Docker Desktop font tourner une **petite machine virtuelle Linux** qui héberge les conteneurs. Dans DockerLab, tu peux le constater : le noyau affiché par `uname -r` dans un conteneur est celui de l'hôte.

**Ce ne sont pas des concurrents.** On fait souvent tourner des conteneurs **dans** des machines virtuelles : la VM isole et se gère comme un serveur, les conteneurs découpent l'application.

## 3. Image, conteneur, registre

| Notion | Définition | Analogie |
|---|---|---|
| **Image** | Modèle **en lecture seule**, empilement de **couches** (système de base, bibliothèques, application) | La recette ou la classe |
| **Conteneur** | **Instance** d'une image en cours d'exécution (ou arrêtée), avec une fine couche d'écriture | Le gâteau ou l'objet |
| **Registre** | Serveur qui héberge des images (par exemple Docker Hub) | La bibliothèque |
| **Tag** | Étiquette de version d'une image : `nginx:1.27` ; sans tag : `latest` | Le numéro de version |

Avec une même image, on crée autant de conteneurs qu'on veut.

<figure class="raid-fig">
<svg viewBox="0 0 720 268" role="img" aria-labelledby="cot" xmlns="http://www.w3.org/2000/svg"><title id="cot">Couches d'une image et couche d'écriture de chaque conteneur</title>
<defs><marker id="com" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><text x="20" y="100" text-anchor="start" class="rd-note" style="font-size:13px;font-weight:700">Image : couches en lecture seule, partagées</text><rect x="20" y="112" width="300" height="44" rx="8" class="rd-blk rd-k-c" /><text x="170.0" y="130.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Application</text><text x="170.0" y="146.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">(ex. nginx)</text><rect x="20" y="160" width="300" height="44" rx="8" class="rd-blk rd-k-b" /><text x="170.0" y="186.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Bibliothèques</text><rect x="20" y="208" width="300" height="44" rx="8" class="rd-blk rd-k-a" /><text x="170.0" y="234.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Système de base</text><rect x="350" y="28" width="170" height="46" rx="8" class="rd-blk rd-k-p" /><text x="435.0" y="47.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Conteneur A</text><text x="435.0" y="63.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">couche d'écriture</text><rect x="540" y="28" width="170" height="46" rx="8" class="rd-blk rd-k-p" /><text x="625.0" y="47.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Conteneur B</text><text x="625.0" y="63.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">couche d'écriture</text><path d="M435,74 L300,110" class="rd-arrow" marker-end="url(#com)"/><path d="M625,74 L320,112" class="rd-arrow" marker-end="url(#com)"/><text x="530" y="140" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:500">Chaque conteneur ajoute sa propre fine</text><text x="530" y="158" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:500">couche d'écriture au-dessus de l'image.</text><text x="530" y="190" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:500">Supprimer le conteneur détruit sa couche :</text><text x="530" y="208" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:500">les données écrites disparaissent.</text>
</svg>
<figcaption>Une image est un empilement de couches en lecture seule ; chaque conteneur y ajoute une fine couche d'écriture.</figcaption>
</figure>


> [!WARNING]
> **`latest` n'est pas « la dernière version stable ».** C'est un tag comme un autre, qui change dans le temps. En production, on **fixe la version** (`nginx:1.27`) pour obtenir le même résultat à chaque déploiement.

## 4. Le cycle de vie d'un conteneur

<figure class="raid-fig">
<svg viewBox="0 0 720 256" role="img" aria-labelledby="cyt" xmlns="http://www.w3.org/2000/svg"><title id="cyt">Cycle de vie d'un conteneur : Created, Up, Exited, supprimé</title>
<defs><marker id="cym" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><path d="M100,8 V50" class="rd-arrow" marker-end="url(#cym)"/><text x="110" y="34" text-anchor="start" class="rd-note" style="font-size:12px;font-weight:600">docker create</text><rect x="30" y="50" width="140" height="56" rx="8" class="rd-blk rd-k-d" /><text x="100.0" y="74.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Created</text><text x="100.0" y="90.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">créé, pas démarré</text><rect x="290" y="50" width="140" height="56" rx="8" class="rd-blk rd-k-b" /><text x="360.0" y="74.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Up</text><text x="360.0" y="90.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">en cours</text><rect x="550" y="50" width="140" height="56" rx="8" class="rd-blk rd-k-p" /><text x="620.0" y="74.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Exited</text><text x="620.0" y="90.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">arrêté</text><path d="M170,78 H290" class="rd-arrow" marker-end="url(#cym)"/><text x="230" y="70" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:600">docker start</text><path d="M430,70 H550" class="rd-arrow" marker-end="url(#cym)"/><text x="490" y="62" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:600">docker stop</text><text x="490" y="92" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:500">ou fin du processus</text><path d="M620,106 V140 H400 V106" class="rd-arrow" marker-end="url(#cym)"/><text x="510" y="132" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:600">docker start</text><rect x="290" y="200" width="140" height="40" rx="8" class="rd-blk rd-disk" style="stroke-dasharray:5 3"/><text x="360.0" y="224.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Supprimé</text><path d="M320,106 V200" class="rd-arrow" marker-end="url(#cym)"/><text x="312" y="160" text-anchor="end" class="rd-note" style="font-size:12px;font-weight:600">docker rm -f</text><path d="M690,106 V220 H430" class="rd-arrow" marker-end="url(#cym)"/><text x="560" y="212" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:600">docker rm</text>
</svg>
<figcaption>Cycle de vie : <code>docker run</code> enchaîne <code>create</code> et <code>start</code> (et télécharge l'image si besoin).</figcaption>
</figure>


| Commande | Effet |
|---|---|
| `docker run IMAGE` | **Télécharge** l'image si besoin, **crée** un conteneur et le **démarre** |
| `docker run -d --name NOM IMAGE` | Idem, **en arrière-plan** (`-d`), avec un **nom** choisi |
| `docker ps` · `docker ps -a` | Conteneurs en cours · **tous** les conteneurs (arrêtés compris) |
| `docker logs NOM` | Affiche ce que le conteneur a écrit sur sa sortie |
| `docker stop NOM` · `docker start NOM` | Arrêter · redémarrer |
| `docker rm NOM` · `docker rm -f NOM` | Supprimer · forcer (même en cours) |
| `docker exec NOM COMMANDE` | Lancer une commande dans un conteneur **déjà en cours** |

### Lire une commande `docker run`

Une commande complète se lit **morceau par morceau**. Voici deux exemples (cas fictifs) :

```text
docker run -d --name site -p 8080:80 nginx:1.27
docker run -d --name base -e POSTGRES_PASSWORD=exemple -v donnees:/var/lib/postgresql/data postgres:16
```

| Morceau | Rôle |
|---|---|
| `docker run` | crée **et** démarre un conteneur (télécharge l'image si besoin) |
| `-d` | en **arrière-plan** : le terminal reste libre |
| `--name site` | donne un **nom** (unique) au conteneur |
| `-p 8080:80` | **publie** : port 8080 de l'hôte vers port 80 du conteneur |
| `-e POSTGRES_PASSWORD=exemple` | **variable d'environnement** donnée au programme |
| `-v donnees:/var/lib/postgresql/data` | **volume nommé** `donnees`, monté à cet endroit du conteneur |
| `nginx:1.27` · `postgres:16` | l'**image** et son **tag** (version) : toujours **en dernier** |

> [!TIP] Dans DockerLab
> Retrouve ces morceaux dans le TP **Le cycle de vie d'un conteneur** : repère à chaque commande ce que fait chaque option. Exercice à ouvrir : [Retrouve la commande](tp/exercices-dockerlab.md#exercice-2-retrouve-la-commande).

**Je vérifie.** Pourquoi `docker run --name site nginx:1.27` échoue-t-il quand on le tape une seconde fois ?

<details markdown="1">
<summary>Voir la réponse</summary>

Parce qu'un **nom** de conteneur est **unique** : `site` existe déjà (même arrêté). Il faut supprimer l'ancien (`docker rm site`) ou choisir un autre nom.

</details>



Un conteneur vit **tant que son processus principal tourne**. S'il se termine, le conteneur passe à l'état *Exited* ; il n'est pas supprimé pour autant. Un **nom** de conteneur est **unique**.

Un **processus** est un programme en cours d'exécution ; un **signal** est un message que le système envoie à un processus. **SIGTERM** lui demande de s'arrêter **proprement** (finir ses écritures) ; **SIGKILL** le tue **immédiatement**, sans lui laisser le temps. `docker stop` envoie d'abord un signal d'arrêt propre (SIGTERM), puis un arrêt brutal (SIGKILL) au bout de **10 secondes** si le processus n'obéit pas.

## 5. Publier un port, configurer avec des variables

> [!NOTE]
> **Rappel : qu'est-ce qu'un port ?** Une machine peut offrir plusieurs services à la fois (un site web, une connexion SSH…). Le **port** est le numéro qui dit « à quel service je m'adresse » : `80` pour le web, `22` pour SSH. Voir la fiche [minimum réseau](../../ressources/minimum-reseau.md).

Un conteneur a **sa propre pile réseau**. Un serveur Web qui écoute sur le port 80 **dans** le conteneur n'est pas joignable depuis l'hôte tant qu'on n'a pas **publié** le port :

> `-p PORT_HÔTE:PORT_CONTENEUR` : `-p 8080:80` envoie ce qui arrive sur le port **8080 de l'hôte** vers le port **80 du conteneur**.

Un port d'hôte ne peut servir qu'**un seul** conteneur à la fois (sinon : « port is already allocated »). Deux conteneurs peuvent en revanche écouter tous les deux sur leur port 80 interne, publiés sur 8080 et 8081.

Une image est **générique** : on l'adapte au démarrage avec des **variables d'environnement** (`-e NOM=valeur`). Exemple : l'image `postgres` exige `POSTGRES_PASSWORD` ; sans elle, le conteneur refuse de démarrer. Une **variable d'environnement** est un réglage nommé que le programme lit au démarrage (ici, un mot de passe). On ne peut **pas** changer une variable sur un conteneur existant : on le **recrée**.

> [!WARNING]
> **Une variable d'environnement n'est pas un coffre-fort.** Elle est visible avec `docker inspect`. On évite de coller de vrais mots de passe dans des commandes partagées ; en production, on utilise des mécanismes dédiés aux secrets (hors programme de cette séance).

> [!TIP] Dans DockerLab
> TP **Publier des ports et configurer par variables**.

## 6. Les volumes : garder ses données

Tout ce qu'un conteneur écrit dans son système de fichiers va dans sa couche d'écriture, **détruite avec le conteneur**. C'est voulu : on peut jeter et recréer un conteneur à volonté. Pour une base de données ou un site modifiable, il faut des données qui **survivent**.

Un **volume** est un espace de stockage géré par Docker, **indépendant des conteneurs** :

> `-v NOM_DU_VOLUME:/chemin/dans/le/conteneur`

| Type | Exemple | Remarque |
|---|---|---|
| Volume **nommé** | `-v jc-db:/var/lib/postgresql/data` | Créé volontairement, nom lisible ; **à privilégier** |
| Volume **anonyme** | créé automatiquement quand l'image en déclare un | Nom aléatoire ; difficile à retrouver |
| **Bind mount** | `-v /dossier/hôte:/dossier/conteneur` | Monte un dossier de l'hôte (vu dans DockerLab) |

> [!NOTE]
> **Un volume n'est pas une sauvegarde.** Il survit à la suppression d'un conteneur, mais pas à la perte du serveur ni à une erreur de suppression du volume. La sauvegarde est vue en S20.


**Je vérifie.** Un conteneur écrit des fichiers sans volume. On le supprime puis on le recrée avec la même image. Que devient son travail ?

<details markdown="1">
<summary>Voir la réponse</summary>

Il est **perdu** : les données étaient dans la couche d'écriture du conteneur, détruite avec lui. Avec un **volume nommé**, elles auraient survécu.

</details>

> [!TIP] Dans DockerLab
> TP **Volumes : garder ses données quand le conteneur disparaît**.

## 7. Les réseaux

Docker crée un réseau virtuel par défaut, **bridge** : les conteneurs s'y voient par **adresse IP**, mais **pas par nom**. Un **réseau défini par l'utilisateur** ajoute un **DNS interne** : on joint un conteneur par son **nom**, quelle que soit son adresse. Des conteneurs sur des réseaux différents sont **isolés** les uns des autres.

| Commande | Effet |
|---|---|
| `docker network create NOM` | Crée un réseau |
| `docker run --network NOM …` | Lance un conteneur directement sur ce réseau |
| `docker network connect NOM CONTENEUR` | Branche un conteneur existant |
| `docker network inspect NOM` | Montre le sous-réseau et les conteneurs branchés |

<figure class="raid-fig">
<svg viewBox="0 0 720 214" role="img" aria-labelledby="art" xmlns="http://www.w3.org/2000/svg"><title id="art">Architecture site plus base : le site est publié, la base ne l'est pas</title>
<defs><marker id="arm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="10" y="90" width="140" height="60" rx="8" class="rd-blk rd-k-a" /><text x="80.0" y="116.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Navigateur</text><text x="80.0" y="132.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">(extérieur)</text><rect x="190" y="14" width="520" height="190" rx="12" class="rd-disk"/><text x="204" y="34" text-anchor="start" class="rd-note" style="font-size:13px;font-weight:700">Hôte</text><rect x="236" y="46" width="450" height="140" rx="10" class="rd-disk" style="stroke-dasharray:5 3"/><text x="250" y="66" text-anchor="start" class="rd-note" style="font-size:12px;font-weight:700">Réseau Docker « app »</text><rect x="256" y="84" width="150" height="62" rx="8" class="rd-blk rd-k-b" /><text x="331.0" y="111.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Conteneur site</text><text x="331.0" y="127.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">écoute sur 80</text><rect x="500" y="84" width="170" height="62" rx="8" class="rd-blk rd-k-c" /><text x="585.0" y="111.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Conteneur base</text><text x="585.0" y="127.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">écoute sur 5432</text><path d="M150,112 H256" class="rd-arrow" marker-end="url(#arm)"/><text x="202" y="100" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:600">8080 → 80</text><text x="202" y="132" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:500">port publié</text><path d="M406,115 H500" class="rd-arrow" marker-end="url(#arm)"/><text x="453" y="106" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">par son nom</text><text x="585" y="166" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:600">port non publié :</text><text x="585" y="180" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:500">injoignable de l'extérieur</text>
</svg>
<figcaption>Seul le site est publié ; la base n'est joignable que par le site, à travers le réseau Docker.</figcaption>
</figure>

**Architecture type : un site + une base.** Le site est **publié** (accessible à l'extérieur) ; la base n'est **pas publiée** : elle n'est joignable **que** par le site, à travers le réseau. C'est un principe de sécurité : on n'expose que ce qui doit l'être.


**Je vérifie.** Dans l'architecture site + base, pourquoi la base n'est-elle pas joignable depuis ton navigateur ?

<details markdown="1">
<summary>Voir la réponse</summary>

Parce que son port **n'est pas publié** : seul le site, sur le même réseau Docker, peut la joindre (par son nom). On n'expose que ce qui doit l'être.

</details>

> [!TIP] Dans DockerLab
> TP **Réseaux Docker**.

## 8. Diagnostiquer un conteneur

Devant un conteneur en panne, toujours le même fil :

1. **L'état** : `docker ps -a` ;
2. **Les journaux** : `docker logs NOM` (le message d'erreur y est presque toujours) ;
3. **La configuration** : `docker inspect NOM` (variables, ports, volumes, réseaux).

Le **code de sortie** aide : **0** = fin normale ; **1** = erreur de l'application ; **125 à 127** = Docker ou la commande n'a pas pu démarrer ; **137** = tué (SIGKILL) ; **143** = arrêté proprement (SIGTERM). Les codes 137 et 143 se retrouvent par le calcul : **128 + numéro du signal** (SIGKILL = 9, SIGTERM = 15).


**Je vérifie.** Un conteneur affiche le code de sortie 137. Que peux-tu en déduire ?

<details markdown="1">
<summary>Voir la réponse</summary>

Il a été **tué brutalement** : 137 = 128 + 9 (SIGKILL). Par exemple, `docker stop` quand le processus n'a pas obéi à SIGTERM dans les 10 secondes.

</details>

> [!TIP] Dans DockerLab
> TP **Dépannage**, puis **Faire le ménage sur un hôte encombré**. Exercice à ouvrir : [Que dit le code de sortie ?](tp/exercices-dockerlab.md#exercice-1-que-dit-le-code-de-sortie).

## 9. DockerLab : ce qu'il est, ce qu'il n'est pas

**DockerLab** est un **simulateur** qui tourne dans ton navigateur : un terminal, une vue graphique des conteneurs, des TP guidés avec vérification automatique. **Aucun vrai programme n'est exécuté** : les services sont simulés. Il sert à **apprendre sans rien installer et sans rien casser**. Quelques commandes ou messages rares peuvent différer d'un vrai Docker : en cas de doute, la référence est la documentation officielle de Docker.

---

## À retenir

- Un **conteneur** partage le **noyau** de l'hôte : plus léger et plus rapide qu'une VM, mais moins isolé.
- **Image** = modèle ; **conteneur** = instance ; un nom est unique ; on **fixe la version** de l'image.
- `run` = `pull` si besoin + `create` + `start` ; un conteneur vit tant que son processus tourne.
- `-p hôte:conteneur` publie un port ; `-e NOM=valeur` configure ; pour changer, on recrée.
- Les données d'un conteneur sont **éphémères** : **volume nommé** pour les garder ; un volume n'est **pas** une sauvegarde.
- Réseau utilisateur = **DNS interne** (joindre par le nom) ; on **n'expose** que ce qui doit l'être.
- Diagnostic : **ps -a → logs → inspect**.
