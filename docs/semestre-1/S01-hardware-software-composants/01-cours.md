# Cours – Hardware et software : vocabulaire et composants

*BTS SIO SISR 1re année – S01 – à lire avant le [TP](02-tp.md)*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** aucun : tout est expliqué ici, même ce qui te paraît évident.
> - **Mots déjà vus :** aucun.
> - **Expliqués dans ce cours :** hardware, software, carte mère, processeur, mémoire vive, stockage (HDD, SSD), BIOS/UEFI, bus, pilote. Les sigles sont dans le [glossaire](../../ressources/glossaire.md).

## À la fin de ce cours, tu sauras

- [ ] distinguer **hardware** et **software** et donner un exemple de chacun ;
- [ ] nommer les **composants internes** d'une unité centrale et dire à quoi ils servent ;
- [ ] reconnaître les **connecteurs externes** courants ;
- [ ] décrire l'**architecture de Von Neumann** et son cycle ;
- [ ] distinguer **RAM**, **ROM** et **cache**, **HDD** et **SSD** ;
- [ ] expliquer pourquoi le processeur ne comprend pas Python.

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

```mermaid
flowchart LR
    ES["Entrées / sorties<br/>clavier, écran, disque, réseau"] <--> CPU
    subgraph CPU["Processeur"]
        UC["Unité de contrôle"]
        UAL["Unité arithmétique<br/>et logique (UAL)"]
        REG["Registres"]
    end
    CPU <--> MEM["Mémoire unique<br/>instructions + données"]
```

| Élément | Rôle |
|---|---|
| **Unité de contrôle** | Lit l'instruction suivante, la décode, donne les ordres |
| **UAL** (ALU) | Fait les calculs et les comparaisons |
| **Registres** | Toutes petites mémoires dans le processeur (dont le **compteur ordinal**, qui contient l'adresse de la prochaine instruction) |
| **Mémoire unique** | Contient à la fois les instructions et les données |
| **Entrées / sorties** | Relient la machine au monde extérieur |

**Le cycle** se répète des milliards de fois par seconde :

1. **Chercher** (*fetch*) : lire en mémoire l'instruction à l'adresse indiquée par le compteur ordinal ;
2. **Décoder** (*decode*) : comprendre ce qu'elle demande ;
3. **Exécuter** (*execute*) : faire l'opération, puis avancer le compteur ordinal.

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

---

## À retenir

- Le **hardware** exécute et stocke ; le **software** lui dit quoi faire.
- Dans l'architecture de **Von Neumann**, instructions et données sont dans la **même mémoire** ; le processeur répète **chercher – décoder – exécuter**.
- Plus une mémoire est proche du processeur, plus elle est rapide, petite et chère.
- **RAM** : vive, vidée à l'arrêt ; **ROM** : garde son contenu ; **cache** : dans le processeur.
- Le processeur ne comprend que le **langage machine** ; tout le reste est traduit.
