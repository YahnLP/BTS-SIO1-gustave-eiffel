# Cours – La virtualisation : machine virtuelle et hyperviseur

*BTS SIO SISR 1re année – S06 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** composants, système d'exploitation, stockage (S01 à S05).
> - **Mots déjà vus :** processeur, mémoire vive, noyau, système d'exploitation, ISO.
> - **Expliqués dans ce cours :** machine virtuelle, hôte et invité, hyperviseur, émulation, conteneur (idée seulement : détaillé en S11), création d'une VM.

## À la fin de ce cours, tu sauras

- [ ] définir **machine virtuelle**, **hyperviseur** et **virtualisation** ;
- [ ] dire **d'où viennent les ressources** d'une VM ;
- [ ] distinguer **virtualisation**, **émulation** et **conteneurisation** ;
- [ ] distinguer un hyperviseur de **type 1** et de **type 2**, et justifier le choix selon le contexte ;
- [ ] citer les **deux façons** de créer une VM et les formats de fichiers associés.

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **Une VM, c'est un simple dossier.** » Au repos, ce sont des fichiers ; **allumée**, elle consomme de la RAM et du processeur de l'hôte (§ 1).
> - « **Une VM utilise en permanence toute la puissance qu'on lui a donnée.** » La RAM est réservée tant qu'elle tourne ; le processeur n'est utilisé que selon le travail réellement demandé (§ 1).
> - « **Émulation et virtualisation, c'est pareil.** » Non : l'émulation traduit chaque instruction d'une autre architecture, donc elle est plus lente (§ 3).

---

## 1. La machine virtuelle

Une **machine virtuelle** (VM) est un **ordinateur simulé à l'intérieur d'un autre ordinateur**. Elle n'existe pas matériellement : c'est un environnement logiciel qui imite le fonctionnement d'un vrai ordinateur.

Toute machine, physique ou virtuelle, a besoin de quatre ressources :

| Ressource | Rôle |
|---|---|
| Processeur (CPU) | exécute les instructions |
| Mémoire vive (RAM) | stocke ce qui est en cours d'utilisation |
| Stockage (disque ou SSD) | conserve les données |
| Réseau | permet de communiquer (souvent nécessaire) |

**D'où viennent ces ressources ?** Une VM n'a aucun composant à elle : elle utilise les ressources de la **machine hôte**, l'ordinateur sur lequel elle est installée. Les systèmes qui tournent dans les VM sont appelés **systèmes invités**.

> [!NOTE]
> Une machine hôte n'utilise pas 100 % de sa puissance en permanence : elle peut en « prêter » une partie à une ou plusieurs VM.

**Exemple de répartition.** Un poste hôte dispose de **16 Go de RAM** et **8 cœurs**. On lance trois VM :

| VM | RAM | Cœurs |
|---|---|---|
| Windows | 4 Go | 2 |
| Ubuntu | 2 Go | 1 |
| Debian (serveur) | 2 Go | 1 |
| **Total donné aux VM** | **8 Go** | **4** |
| **Reste pour l'hôte** | 16 − 8 = **8 Go** | 8 − 4 = 4 |

La RAM donnée est **réservée** tant que les VM tournent : l'hôte, lui, doit continuer à faire fonctionner son système et ses applications avec les 8 Go restants. Règle de prudence en TP : ne **jamais donner plus de la moitié** de la RAM de l'hôte aux VM. Les cœurs fonctionnent différemment : ils sont **partagés dans le temps** entre l'hôte et les VM selon la charge.

**Je vérifie.** Si ton poste a 16 Go de mémoire et que tu lances une VM avec 4 Go, combien reste-t-il à l'hôte pour lui-même et ses applications ?

<details markdown="1">
<summary>Voir la réponse</summary>

Il reste au plus 12 Go à l'hôte : la mémoire donnée à la VM est prélevée sur celle de l'hôte tant que la VM est allumée. Il faut aussi laisser de quoi faire tourner l'hôte lui-même.

</details>


**Je vérifie.** Sur le même hôte de 16 Go, peut-on lancer quatre VM de 6 Go chacune ? Pourquoi ?

<details markdown="1">
<summary>Voir la réponse</summary>

Non : 4 × 6 = 24 Go, plus que les 16 Go de l'hôte. La RAM donnée aux VM est prélevée sur celle de l'hôte tant qu'elles tournent.

</details>

## 2. L'hyperviseur

Un système d'exploitation (Windows, Linux, macOS) ne sait pas, à lui seul, partager les ressources physiques avec d'autres systèmes. C'est le rôle de l'**hyperviseur**, un logiciel spécialisé qui **gère, répartit et isole** les ressources entre plusieurs machines virtuelles.

Il a deux rôles :

1. **créer des ressources virtuelles** propres à chaque VM : chaque VM croit disposer de son propre processeur, disque, carte réseau ;
2. **répartir les ressources physiques** entre les VM, dans les limites définies pour chacune.

La **virtualisation** est la technique qui permet de faire fonctionner plusieurs systèmes isolés sur une même machine physique.

## 3. Virtualisation, émulation, conteneurisation

### Émulation ou virtualisation ?

| | Principe | Exemple | Performance |
|---|---|---|---|
| **Émulation** | imite le comportement d'un système **différent** ; chaque instruction est traduite | jouer à un jeu de console ancienne sur un PC | plus lente |
| **Virtualisation** | fait fonctionner un système sur la **même architecture** matérielle (x86 sur x86) | installer Debian sur un PC Windows | plus rapide |

La virtualisation est plus rapide car aucune instruction n'est traduite : l'hôte et l'invité « parlent la même langue ».

### Machine virtuelle ou conteneur ?

Un **conteneur** (Docker, LXC) est un environnement logiciel isolé qui **partage le noyau** de la machine hôte : il n'a pas son propre système d'exploitation. Pour l'instant, retiens seulement l'idée : on le manipule vraiment en [S11](../../semestre-2/S11-conteneurs-dockerlab/README.md).

| Machine virtuelle | Conteneur |
|---|---|
| Chaque VM a **son propre système** | Les conteneurs **partagent le même noyau** |
| Isolation forte (matérielle) | Isolation logicielle |
| Plus lourde | Très légère |
| VirtualBox, VMware | Docker, LXC |

Conséquence : un hôte Linux peut exécuter des conteneurs de différentes distributions Linux (même noyau), mais pas des conteneurs Windows. Les conteneurs seront abordés en S11.

**Je vérifie.** Pourquoi ne peut-on pas faire tourner un conteneur Windows sur un hôte Debian ?

<details markdown="1">
<summary>Voir la réponse</summary>

Un conteneur partage le noyau de l'hôte. Le noyau Linux de l'hôte ne peut pas faire fonctionner un programme conçu pour le noyau Windows.

</details>

## 4. Les deux types d'hyperviseurs

| | Type 2 (hébergé) | Type 1 (natif, « bare metal ») |
|---|---|---|
| **Installation** | sur un système d'exploitation existant, comme une application | directement sur le matériel, sans système intermédiaire |
| **Usage typique** | tests, formation, développement, quelques machines | production, serveurs, centres de données |
| **Exemples** | Oracle VirtualBox, VMware Workstation, VMware Fusion, Parallels Desktop, UTM | VMware ESXi, Microsoft Hyper-V, KVM, Xen |

<figure class="raid-fig">
<svg viewBox="0 0 720 270" role="img" aria-labelledby="hy-t" xmlns="http://www.w3.org/2000/svg"><title id="hy-t">Hyperviseur de type 2 posé sur un système hôte, et de type 1 posé directement sur le matériel</title>
<text x="170" y="22" text-anchor="middle" class="rd-name" style="font-size:14px">Type 2 (hébergé)</text><rect x="20.0" y="34" width="146.0" height="52" rx="8" class="rd-blk rd-k-c"/><text x="93.0" y="58" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 1</text><text x="93.0" y="72" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">système invité</text><rect x="174.0" y="34" width="146.0" height="52" rx="8" class="rd-blk rd-k-c"/><text x="247.0" y="58" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 2</text><text x="247.0" y="72" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">système invité</text><rect x="20" y="94" width="300" height="46" rx="8" class="rd-blk rd-k-d"/><text x="170.0" y="114" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Hyperviseur</text><text x="170.0" y="130" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">une application de l'hôte</text><rect x="20" y="148" width="300" height="46" rx="8" class="rd-blk rd-k-b"/><text x="170.0" y="168" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Système d'exploitation hôte</text><text x="170.0" y="184" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">Windows, Linux, macOS</text><rect x="20" y="202" width="300" height="46" rx="8" class="rd-blk rd-k-a"/><text x="170.0" y="230" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Matériel</text>
<text x="550" y="22" text-anchor="middle" class="rd-name" style="font-size:14px">Type 1 (natif)</text><rect x="400.0" y="34" width="94.66666666666667" height="52" rx="8" class="rd-blk rd-k-c"/><text x="447.3333333333333" y="58" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 1</text><text x="447.3333333333333" y="72" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">système invité</text><rect x="502.6666666666667" y="34" width="94.66666666666667" height="52" rx="8" class="rd-blk rd-k-c"/><text x="550.0" y="58" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 2</text><text x="550.0" y="72" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">système invité</text><rect x="605.3333333333334" y="34" width="94.66666666666667" height="52" rx="8" class="rd-blk rd-k-c"/><text x="652.6666666666667" y="58" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 3</text><text x="652.6666666666667" y="72" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">système invité</text><rect x="400" y="94" width="300" height="46" rx="8" class="rd-blk rd-k-d"/><text x="550.0" y="114" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Hyperviseur</text><text x="550.0" y="130" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">directement sur le matériel</text><rect x="400" y="148" width="300" height="46" rx="8" class="rd-blk rd-k-a"/><text x="550.0" y="176" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Matériel</text>
</svg>
<figcaption>Type 2 : un étage de plus entre le matériel et les VM. Type 1 : l'hyperviseur parle directement au matériel.</figcaption>
</figure>

### Type 2 : accessible, mais sans priorité

L'hyperviseur de type 2 s'installe comme n'importe quelle application. Il n'a **aucune priorité** sur les ressources : si une application de l'hôte consomme presque tout le processeur, l'hyperviseur doit se contenter du reste. Il convient pour **quelques machines**, en test ou en formation, pas pour héberger des serveurs en production.

Pour améliorer les performances : fermer les applications inutiles avant de lancer les VM, et surveiller la consommation dans le gestionnaire de tâches.

### Type 1 : la virtualisation professionnelle

L'hyperviseur de type 1 s'installe **directement sur le matériel** (l'installation d'ESXi, par exemple, efface le disque). Il accède directement aux ressources : meilleures performances et fiabilité accrue, donc davantage de VM hébergées. Il demande des serveurs robustes, et la licence est souvent coûteuse (selon le produit).

Les entreprises l'utilisent pour :

- réduire les coûts matériels (plusieurs serveurs sur une seule machine physique) ;
- améliorer la disponibilité des services ;
- ajuster la charge ;
- faciliter les sauvegardes et les migrations de VM ;
- créer des environnements de préproduction.

**Je vérifie.** Une PME veut héberger dix serveurs virtuels en production. Type 1 ou type 2 ? Pourquoi ?

<details markdown="1">
<summary>Voir la réponse</summary>

Type 1 : en production on veut des performances, de la fiabilité et la priorité sur les ressources. Un type 2 dépendrait d'un système hôte généraliste et partagerait ses ressources avec d'autres applications.

</details>


**Je vérifie.** Avec quel outil vérifier, sous Windows, que la virtualisation matérielle est activée ?

<details markdown="1">
<summary>Voir la réponse</summary>

Dans le **Gestionnaire des tâches**, onglet **Performances**, section **UC** : la ligne **Virtualisation** doit indiquer **Activé**.

</details>

## 5. Créer une machine virtuelle

Avant de créer une VM, il faut que le processeur prenne en charge la **virtualisation matérielle** : **VT-x** (Intel) ou **AMD-V** (AMD). Elle s'active, si besoin, dans le BIOS/UEFI. Sans elle, ou si elle est désactivée, les performances sont moindres.

**Comment vérifier ?** Sous Windows, ouvre le Gestionnaire des tâches (`Ctrl + Maj + Échap`), onglet **Performances**, puis **UC** : la ligne **Virtualisation** indique **Activé** ou **Désactivé**. Si elle est désactivée, on l'active dans le firmware (S04), sans rien modifier d'autre.

### Deux façons d'obtenir une VM

1. **Créer une VM « nue »** : on choisit les paramètres (mémoire, processeurs, disque), puis on installe un système depuis un fichier **ISO**.
2. **Importer une VM préconfigurée** : un fichier **OVA** ou **OVF** contient déjà un système installé.

> [!WARNING]
> Une VM téléchargée sur Internet peut contenir des virus ou des scripts cachés. On ne télécharge que depuis des **sites officiels**.

### Les fichiers à connaître

| Fichier | Contenu |
|---|---|
| **ISO** | image d'un disque optique : sert à **installer** un système |
| **OVF** | uniquement la **description** de la VM ; il faut lui associer un fichier disque |
| **OVA** | un **paquet** : description de la VM **et** son disque (OVA = OVF + disque) |
| **VDI** | disque virtuel de VirtualBox |
| **VMDK** | disque virtuel historique de VMware |
| **VHD / VHDX** | disque virtuel historique de Microsoft (Hyper-V) |
| **QCOW2, IMG** | disques utilisés avec QEMU et UTM (Linux, Mac) |

Un fichier de disque virtuel ne contient que les **données du disque** de la VM, pas sa configuration.

**Je vérifie.** Quelle différence y a-t-il entre un fichier OVF et un fichier OVA ?

<details markdown="1">
<summary>Voir la réponse</summary>

L'OVF ne décrit que la configuration de la VM et doit être accompagné d'un fichier disque. L'OVA regroupe en un seul fichier la description et le disque.

</details>
