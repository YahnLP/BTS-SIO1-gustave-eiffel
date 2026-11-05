# Cours – Hardware et software : vocabulaire et composants

*BTS SIO SISR 1re année – S01 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** aucun : tout est expliqué ici, même ce qui te paraît évident.
> - **Mots déjà vus :** aucun.
> - **Expliqués dans ce cours :** hardware, software, pilote, carte mère, processeur, mémoire vive, cache, stockage (HDD, SSD), BIOS/UEFI, bus. Les sigles sont dans le [glossaire](../../ressources/glossaire.md).

## À la fin de ce cours, tu sauras

- [ ] distinguer **hardware** et **software** et donner un exemple de chacun ;
- [ ] nommer les **composants internes** d'une unité centrale et dire à quoi ils servent ;
- [ ] reconnaître les **connecteurs externes** courants ;
- [ ] décrire l'**architecture de Von Neumann** et son cycle ;
- [ ] distinguer **RAM**, **ROM** et **cache**, **HDD** et **SSD** ;
- [ ] expliquer pourquoi le processeur ne comprend pas Python.

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **Plus de RAM rend l'ordinateur plus rapide**, dans tous les cas. » Faux : la RAM évite de ralentir quand elle manque, elle n'accélère pas un processeur qui travaille déjà à fond (§ 5).
> - « **Le disque dur, c'est la mémoire de l'ordinateur.** » Confusion fréquente : la mémoire de travail est la **RAM** ; le disque est le **stockage** (§ 2 et 5).
> - « **Un logiciel et un programme, c'est pareil.** » Presque : un logiciel regroupe des programmes, des bibliothèques et des données (§ 1).

---

## 1. Hardware et software

| | Hardware (matériel) | Software (logiciel) |
|---|---|---|
| **Nature** | Éléments physiques, qu'on peut toucher | Programmes et données, immatériels |
| **Exemples** | Processeur, barrette de mémoire, disque, écran | Système d'exploitation, navigateur, traitement de texte |
| **Rôle** | Exécute les opérations, stocke, transmet | Dit au matériel **quoi faire** |

Un ordinateur n'est utile que si les deux sont réunis : un disque dur sans système ne démarre rien ; un système sans machine n'est qu'un fichier.

> [!TIP]
> **Le firmware** est à la frontière : c'est un logiciel (le BIOS ou l'UEFI, vu en S04) stocké dans une puce de la carte mère. On le range côté logiciel, mais on ne peut pas l'installer comme une application.

**Le pilote** (*driver*) est le petit logiciel qui explique au système d'exploitation **comment parler à un composant précis**. Exemple : sans le pilote de ta carte réseau, Windows voit bien qu'une carte est présente, mais ne sait pas s'en servir : pas de connexion. C'est pourquoi on réinstalle les pilotes après avoir changé de matériel.

**Programme ou logiciel ?** Un **programme** est une suite d'instructions (un fichier exécutable). Un **logiciel** est un ensemble structuré de programmes, de bibliothèques et de données, avec souvent une interface (par exemple LibreOffice).

## 2. Les composants d'une unité centrale

| Composant | Rôle | À retenir |
|---|---|---|
| **Carte mère** | Relie tous les composants entre eux | Elle impose le type de processeur (socket) et de mémoire acceptés |
| **Processeur (CPU)** | Exécute les instructions des programmes | Posé sur un support (socket), refroidi par un ventirad |
| **Mémoire vive (RAM)** | Contient ce qui sert **maintenant** | Rapide, **vidée à l'arrêt** |
| **Stockage (HDD, SSD)** | Conserve les données **durablement** | Garde son contenu sans courant |
| **Carte graphique (GPU)** | Calcule l'image affichée | Peut être intégrée au processeur ou dédiée |
| **Alimentation** | Transforme le courant secteur en tensions continues | Dimensionnée en watts |
| **Carte réseau (NIC)** | Relie la machine au réseau | Souvent intégrée à la carte mère |
| **Ventilation / refroidissement** | Évacue la chaleur | Une machine qui chauffe réduit sa vitesse |

**Je vérifie.** Tu ouvres un document, tu le modifies, puis la machine s'éteint avant que tu aies enregistré. Où était ton travail, et pourquoi est-il perdu ?

<details markdown="1">
<summary>Voir la réponse</summary>

Ton travail était dans la **RAM** (mémoire vive), qui se vide à l'arrêt. Seul l'enregistrement le copie dans le **stockage** (SSD ou HDD), qui garde son contenu sans courant.

</details>

## 3. Les connecteurs externes

| Connecteur | Usage habituel |
|---|---|
| **USB** (type A, type C) | Clavier, souris, clés, disques externes ; le type C est le connecteur réversible |
| **RJ45** (Ethernet) | Câble réseau |
| **HDMI**, **DisplayPort** | Écran (image et son) |
| **Jack audio** | Casque, haut-parleurs, micro |
| **Alimentation** | Cordon secteur |

> [!NOTE]
> Il existe d'autres connecteurs (VGA, DVI, Thunderbolt, eSATA) selon l'âge et la gamme du matériel. On apprend ici à **reconnaître** : en cas de doute, on lit le marquage sur le boîtier ou la documentation du constructeur.

## 4. L'architecture de Von Neumann

Avant 1945, un ordinateur était **câblé** pour un calcul précis : changer de calcul voulait dire changer les branchements. En 1945, John von Neumann décrit (rapport sur l'EDVAC) une machine où **le programme est rangé en mémoire comme les données**. Changer de programme ne demande plus de toucher à la machine.

<figure class="raid-fig">
<svg viewBox="0 0 720 270" role="img" aria-labelledby="vn-t vn-d" xmlns="http://www.w3.org/2000/svg">
<title id="vn-t">Architecture de Von Neumann</title>
<desc id="vn-d">Le processeur, qui contient l'unité de contrôle, l'UAL et les registres, est relié par un bus à une mémoire unique contenant instructions et données, et aux entrées et sorties.</desc>
<defs><marker id="vn-ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs>
<rect x="12" y="20" width="150" height="150" rx="12" class="rd-disk"/>
<text x="87" y="48" text-anchor="middle" class="rd-name">Entrées / sorties</text>
<text x="87" y="78" text-anchor="middle" class="rd-note">clavier, souris</text>
<text x="87" y="100" text-anchor="middle" class="rd-note">écran</text>
<text x="87" y="122" text-anchor="middle" class="rd-note">disque, réseau</text>
<rect x="212" y="20" width="290" height="150" rx="12" class="rd-disk"/>
<text x="357" y="42" text-anchor="middle" class="rd-name">Processeur (CPU)</text>
<rect x="228" y="56" width="258" height="30" rx="6" class="rd-blk rd-k-b"/><text x="357" y="76" text-anchor="middle" class="rd-t">Unité de contrôle</text>
<rect x="228" y="94" width="258" height="30" rx="6" class="rd-blk rd-k-a"/><text x="357" y="114" text-anchor="middle" class="rd-t">UAL (calculs, comparaisons)</text>
<rect x="228" y="132" width="258" height="30" rx="6" class="rd-blk rd-k-c"/><text x="357" y="152" text-anchor="middle" class="rd-t">Registres (dont compteur ordinal)</text>
<rect x="552" y="20" width="156" height="150" rx="12" class="rd-disk"/>
<text x="630" y="48" text-anchor="middle" class="rd-name">Mémoire unique</text>
<rect x="566" y="64" width="128" height="40" rx="6" class="rd-blk rd-k-d"/><text x="630" y="89" text-anchor="middle" class="rd-t">instructions</text>
<rect x="566" y="116" width="128" height="40" rx="6" class="rd-blk rd-k-p"/><text x="630" y="141" text-anchor="middle" class="rd-t">données</text>
<line x1="164" y1="95" x2="210" y2="95" class="rd-arrow" marker-start="url(#vn-ar)" marker-end="url(#vn-ar)"/>
<line x1="504" y1="95" x2="550" y2="95" class="rd-arrow" marker-start="url(#vn-ar)" marker-end="url(#vn-ar)"/>
<text x="527" y="86" text-anchor="middle" class="rd-cap">bus</text>
<text x="360" y="215" text-anchor="middle" class="rd-note">Le programme et ses données sont rangés dans la même mémoire.</text>
<text x="360" y="240" text-anchor="middle" class="rd-note">Le processeur les lit par le bus, une instruction après l'autre.</text>
</svg>
<figcaption>Architecture de Von Neumann : un processeur, une mémoire unique, des entrées / sorties, reliés par des bus.</figcaption>
</figure>

| Élément | Rôle |
|---|---|
| **Unité de contrôle** | Lit l'instruction suivante, la décode, donne les ordres |
| **UAL** (ALU) | Fait les calculs et les comparaisons |
| **Registres** | Toutes petites mémoires dans le processeur (dont le **compteur ordinal**, qui contient l'adresse de la prochaine instruction) |
| **Mémoire unique** | Contient à la fois les instructions et les données |
| **Entrées / sorties** | Relient la machine au monde extérieur |

**Le bus** est l'ensemble des fils qui relient le processeur à la mémoire et aux autres composants. On distingue ce qu'il transporte : des **adresses** (où lire ou écrire), des **données** (ce qu'on lit ou écrit), des **signaux de commande** (lire ? écrire ?). Comme la route entre deux villes : sa largeur et sa vitesse limitent ce qui peut passer.

**Le cycle** se répète des milliards de fois par seconde :

1. **Chercher** (*fetch*) : lire en mémoire l'instruction à l'adresse indiquée par le compteur ordinal ;
2. **Décoder** (*decode*) : comprendre ce qu'elle demande ;
3. **Exécuter** (*execute*) : faire l'opération, puis avancer le compteur ordinal.

**Un tour de cycle, pas à pas.** Le compteur ordinal contient 3. En mémoire, à l'adresse 3, on trouve l'instruction « additionner les registres A et B ». A contient 4 et B contient 2.

| Étape | Ce qui se passe | État ensuite |
|---|---|---|
| **Chercher** | L'unité de contrôle lit la case d'adresse 3 | Instruction reçue ; compteur ordinal = 4 |
| **Décoder** | Elle comprend : « addition de A et B » | L'UAL est mise en route |
| **Exécuter** | L'UAL calcule 4 + 2 | A = 6 ; le tour suivant ira lire l'adresse 4 |


**Je vérifie.** Pourquoi le compteur ordinal passe-t-il à 4 dès l'étape « chercher » ?

<details markdown="1">
<summary>Voir la réponse</summary>

Pour que, le tour terminé, le processeur sache déjà **où trouver l'instruction suivante**. Il avance d'une case à chaque tour, sauf quand une instruction lui ordonne de sauter ailleurs (test, boucle).

</details>

**Limite.** Le processeur et la mémoire communiquent par un même chemin : le processeur attend souvent la mémoire (on parle de *goulot d'étranglement de Von Neumann*). Les caches, les mémoires plus rapides et le calcul parallèle (plusieurs cœurs, GPU) existent pour atténuer ce problème.

## 5. Les mémoires

| Mémoire | Vitesse | Contenu à l'arrêt | Rôle |
|---|---|---|---|
| **Registres** | la plus rapide | perdu | Données en cours de calcul, dans le processeur |
| **Cache** (L1, L2, L3) | très rapide | perdu | Copie de ce que le processeur utilise souvent, **dans le processeur** |
| **RAM** | rapide | **perdu** | Programmes et données en cours d'usage |
| **ROM** | lente | **conservé** | Contenu fixe ou rarement modifié (par exemple le firmware) |
| **Stockage** (SSD, HDD) | plus lent | **conservé** | Fichiers, système, applications |

Règle simple : **plus c'est proche du processeur, plus c'est rapide, petit et cher**.

**Le cache en image.** Le stockage est l'armoire d'archives du bureau, la RAM est ta table de travail, le cache est la feuille posée sous tes yeux : tu y mets ce que tu relis sans arrêt. Le cache L1 est le plus petit et le plus rapide, L3 le plus grand et un peu plus lent ; les trois sont dans le processeur.

**Je vérifie.** Pourquoi ne met-on pas simplement beaucoup de cache à la place de la RAM ?

<details markdown="1">
<summary>Voir la réponse</summary>

Parce que la mémoire rapide **coûte très cher** et prend de la place dans la puce. Les niveaux successifs sont un compromis entre vitesse, taille et prix.

</details>


> [!NOTE]
> Une ROM « moderne » comme celle du firmware est en réalité une mémoire flash réinscriptible, ce qui permet les mises à jour du firmware. Le mot « ROM » reste employé pour dire « mémoire qui garde son contenu et que l'on modifie rarement ».

## 6. Le stockage : HDD et SSD

| Caractéristique | HDD (disque dur) | SSD |
|---|---|---|
| Technologie | Plateaux magnétiques qui tournent, têtes de lecture | Mémoire flash, sans pièce mobile |
| Vitesse | de l'ordre de 100 à 200 Mo/s | de l'ordre de 500 Mo/s (SATA) à plusieurs Go/s (NVMe) |
| Bruit | Oui (rotation, têtes) | Non |
| Résistance aux chocs | Fragile | Meilleure |
| Prix par Go | Plus bas | Plus élevé |
| Capacité | Très grande à bas prix | En hausse, mais plus chère |

Les ordres de grandeur sont indicatifs : ils varient selon le modèle et la génération. Un usage typique : **SSD pour le système et les applications**, **HDD pour de gros volumes peu consultés** (archives, sauvegardes).

**Je vérifie.** Un ordinateur sert surtout à de la bureautique et démarre en 2 minutes avec un disque dur. Quel changement de matériel l'accélérerait le plus, et pourquoi ?

<details markdown="1">
<summary>Voir la réponse</summary>

Remplacer le HDD par un **SSD** : le démarrage et l'ouverture des applications consistent surtout à **lire** des fichiers, et le SSD le fait beaucoup plus vite, sans pièce mobile. Ajouter de la RAM n'aiderait que si elle manquait vraiment.

</details>

## 7. Du programme humain au langage machine

Le processeur ne comprend qu'un langage : le **langage machine**, fait d'instructions codées en binaire. Chaque famille de processeurs (Intel et AMD, ARM…) a son propre **jeu d'instructions**.

Pour calculer `c = a + b` avec `a = 5` et `b = 3` :

| Niveau | Exemple | Qui le comprend ? |
|---|---|---|
| Pseudo-code | `c ← a + b` | L'humain seulement |
| Langage évolué (Python) | `c = a + b` | L'humain, puis un interpréteur le traduit |
| Assembleur | `ADD AL, BL` | Lisible par un spécialiste, traduit en binaire |
| Langage machine | `00000000 11011000` (notation illustrative) | Le processeur |

Entre le haut et le bas, des programmes **traduisent** : un **compilateur** (traduit tout avant l'exécution) ou un **interpréteur** (traduit au fur et à mesure).

> [!WARNING]
> Les octets montrés pour le langage machine sont **illustratifs** : l'encodage exact d'une instruction dépend du processeur. L'idée à retenir est qu'une ligne d'un langage évolué devient plusieurs instructions très simples.

**Je vérifie.** Pourquoi un programme écrit en Python ne s'exécute-t-il pas directement sur un processeur ?

<details markdown="1">
<summary>Voir la réponse</summary>

Le processeur ne comprend que son **langage machine**. Python est un langage évolué : un **interpréteur** (ou un compilateur) le traduit en instructions simples que le processeur sait exécuter.

</details>

---

## À retenir

- Le **hardware** exécute et stocke ; le **software** lui dit quoi faire.
- Dans l'architecture de **Von Neumann**, instructions et données sont dans la **même mémoire** ; le processeur répète **chercher – décoder – exécuter**.
- Plus une mémoire est proche du processeur, plus elle est rapide, petite et chère.
- **RAM** : vive, vidée à l'arrêt ; **ROM** : garde son contenu ; **cache** : dans le processeur.
- Le processeur ne comprend que le **langage machine** ; tout le reste est traduit.
