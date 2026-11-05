# Cours – Processeurs, serveurs et choix d'un matériel

*BTS SIO SISR 1re année – S03 – à lire avant le [TP](02-tp.md)*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** lire les caractéristiques d'un poste et convertir les unités (S01, S02).
> - **Mots déjà vus :** processeur, mémoire vive, SSD, fréquence, octet.
> - **Expliqués dans ce cours :** cœur, fréquence, benchmark, RAID, serveur et poste, dimensionnement. Le RAID 0, 1 et 5 sont à connaître ; les autres niveaux sont signalés <span class="technique">notion technique</span>.

## À la fin de ce cours, tu sauras

- [ ] lire les caractéristiques d'un **processeur** et en tirer un usage ;
- [ ] expliquer pourquoi les **GHz seuls** ne suffisent pas à comparer deux processeurs ;
- [ ] choisir une configuration **selon un profil d'utilisateur** et un budget ;
- [ ] distinguer un **poste de travail** d'un **serveur** ;
- [ ] expliquer le **RAID** (niveaux 0, 1 et 5 ; les niveaux 6 et 10 sont facultatifs) et sa limite ;
- [ ] décrire un serveur à **deux processeurs** et la notion de **NUMA** ;
- [ ] **dimensionner** un serveur pour héberger des machines virtuelles.

---

## 1. Lire un processeur

Un **processeur** (CPU) se décrit par plusieurs caractéristiques. Aucune ne suffit seule.

| Caractéristique | Ce que c'est | Ce qu'il faut en retenir |
|---|---|---|
| **Famille** | Gamme commerciale : Intel Core i3, i5, i7, i9 ; AMD Ryzen 3, 5, 7, 9 | Plus le chiffre est haut, plus la gamme est puissante **à génération égale** |
| **Génération** | Date et architecture du processeur | Un i5 récent peut battre un i7 ancien |
| **Cœurs physiques** | Unités de calcul réelles | Plus de cœurs = plus de tâches en parallèle |
| **Threads (cœurs logiques)** | Fils d'exécution traités ; Hyper-Threading (Intel) ou SMT (AMD) permet 2 threads par cœur | 4 cœurs avec Hyper-Threading apparaissent comme 8 cœurs logiques |
| **Fréquence** | Cycles par seconde (GHz) ; on distingue la fréquence **de base** et la fréquence **turbo** | Utile **à architecture égale** seulement |
| **Cache** | Mémoire ultra-rapide intégrée : L1 (par cœur, très petit), L2, L3 (partagé, plusieurs Mo) | Plus le cache est grand, moins le processeur attend la RAM |
| **TDP** | Puissance thermique de référence, en watts | Plus il est élevé, plus il faut refroidir et alimenter |
| **Graphique intégré** | Circuit graphique dans le processeur (ou non) | Peut éviter l'achat d'une carte graphique pour la bureautique |

> [!NOTE]
> **Cœurs « performants » et « efficaces ».** Certains processeurs Intel récents mélangent des cœurs conçus pour la **performance** (P) et des cœurs conçus pour l'**efficacité énergétique** (E). Leur nombre total n'est donc pas comparable cœur à cœur avec un processeur plus ancien : il faut lire la fiche constructeur.

**Usages repères** (indicatifs) :

| Famille | Usages typiques |
|---|---|
| Entrée de gamme (i3, Ryzen 3) | Bureautique, navigation |
| Milieu de gamme (i5, Ryzen 5) | Bureautique avancée, multitâche |
| Haut de gamme (i7, Ryzen 7) | Développement, virtualisation légère, graphisme |
| Très haut de gamme (i9, Ryzen 9) | Calculs lourds, rendu 3D, montage vidéo |

## 2. Comparer avec des benchmarks

Un **benchmark** est un test standardisé qui produit un **score** : on peut ainsi comparer des processeurs de générations et de marques différentes. Exemples de sources : les sites de résultats de PassMark (« CPU Mark ») ou le Geekbench Browser.

Bonnes pratiques :

- **Croiser** au moins deux sources : un score isolé peut être biaisé.
- Comparer les scores **monocœur** (logiciels peu parallèles) et **multicœur** (compilation, montage, virtualisation).
- Lire la **date** et la méthode du test.
- Mettre le score en regard du **prix** et de la **consommation**.

> [!TIP]
> **Démarche de choix d'un matériel.** (1) Décrire les **besoins** de chaque profil (logiciels, volumes, usages). (2) Traduire en **critères** mesurables (RAM, cœurs, stockage, écran, graphique). (3) **Comparer** les candidats avec des sources. (4) **Vérifier** les contraintes (budget, compatibilité Windows 11). (5) **Justifier** par écrit.

## 3. Poste de travail et serveur

| Critère | Poste de travail | Serveur |
|---|---|---|
| **Processeur** | Grand public (Core, Ryzen) | Gamme serveur (Intel Xeon, AMD EPYC) : plus de cœurs, plus de canaux mémoire, prévu pour tourner en continu |
| **Mémoire** | 8 à 32 Go, sans correction | Beaucoup plus (jusqu'à plusieurs To), souvent **ECC** |
| **Stockage** | Un disque, peu ou pas de redondance | Plusieurs disques en **RAID**, souvent remplaçables **à chaud** |
| **Alimentation** | Une seule | Souvent **deux**, redondantes : si l'une tombe, l'autre prend le relais |
| **Refroidissement** | Standard | Renforcé, prévu pour le fonctionnement 24 h/24 |
| **Gestion à distance** | Rare | Contrôleur dédié (accès à l'écran et à l'alimentation même machine éteinte) |
| **Format** | Tour, mini-PC | Tour, **rack** (en « U »), **lame** |
| **Usage** | Un utilisateur | Des services pour plusieurs utilisateurs |

**ECC** (*Error-Correcting Code*) : mémoire capable de **détecter et corriger** certaines erreurs de bits, ce qui évite des plantages ou des corruptions de données silencieuses.

**Format rack.** Le serveur se range dans une baie ; sa hauteur se mesure en **U** (1 U = 44,45 mm, soit 1,75 pouce). Un serveur « 1U » est plat, un « 2U » est deux fois plus haut.

### Pourquoi les GHz seuls ne suffisent pas

Deux processeurs à 3,5 GHz ne se valent pas : l'architecture (quantité de travail par cycle), le nombre de cœurs, la taille du cache et la vitesse de la mémoire comptent autant. Un serveur « plus lent » en GHz peut traiter bien plus de requêtes simultanées grâce à ses nombreux cœurs.

## 4. Le RAID

**RAID** regroupe plusieurs disques pour obtenir plus de **vitesse**, plus de **sécurité**, ou les deux.

<div class="tableau-raid" markdown>

| Niveau | Principe | Disques minimum | Capacité utile | Pannes supportées | Avantages |
|---|---|---|---|---|---|
| **RAID 0** | Les données sont réparties (*striping*) | 2 | n × taille | **aucune** | Meilleures performances en lecture et en écriture ; 100 % de la capacité utilisable. Aucune protection : à réserver aux données non critiques. |
| **RAID 1** | Miroir : chaque donnée est écrite en double | 2 | 1 × taille | 1 disque | Simple et sûr ; reprise immédiate en cas de panne ; lecture rapide. Coût : la moitié de la capacité est « perdue ». |
| **RAID 5** | Répartition + une parité | 3 | (n − 1) × taille | 1 disque | Bon compromis entre capacité, sécurité et performances en lecture ; seul un disque sert à la redondance. |
| **RAID 6** <span class="technique">notion technique</span> | Répartition + deux parités | 4 | (n − 2) × taille | 2 disques | Tolère deux pannes simultanées : adapté aux gros volumes de disques ; plus sûr pendant une reconstruction. |
| **RAID 10** <span class="technique">notion technique</span> | Miroirs répartis | 4 | (n ÷ 2) × taille | 1 disque au minimum (jusqu'à un par miroir) | Très bonnes performances et reconstruction rapide, avec la sécurité du miroir. Coût : la moitié de la capacité. |

</div>

(n = nombre de disques de même taille.)

### Comment fonctionne chaque niveau

Dans les schémas, chaque colonne est un **disque** et chaque rectangle un **bloc** de données (une petite portion de fichier). Les blocs de même lettre (A, B, C, D) forment une **ligne** écrite en même temps. Les blocs marqués **P** (et **Q**) ne contiennent pas de données : ce sont des blocs de **parité**.

#### RAID 0 : répartir pour aller vite

<figure class="raid-fig">
<svg viewBox="0 0 640 248" role="img" aria-labelledby="t" xmlns="http://www.w3.org/2000/svg">
<title id="t">RAID 0 : répartition des blocs (striping)</title>
<desc>Six blocs A1 à A6 répartis en alternance sur deux disques.</desc>
<text class="rd-cap" x="40" y="26">Fichier A découpé en blocs (stripes)</text>
<rect class="rd-blk rd-k-a" x="40" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="72.0" y="56.0" text-anchor="middle">A1</text>
<rect class="rd-blk rd-k-a" x="110" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="142.0" y="56.0" text-anchor="middle">A2</text>
<rect class="rd-blk rd-k-a" x="180" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="212.0" y="56.0" text-anchor="middle">A3</text>
<rect class="rd-blk rd-k-a" x="250" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="282.0" y="56.0" text-anchor="middle">A4</text>
<rect class="rd-blk rd-k-a" x="320" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="352.0" y="56.0" text-anchor="middle">A5</text>
<rect class="rd-blk rd-k-a" x="390" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="422.0" y="56.0" text-anchor="middle">A6</text>
<g>
<rect class="rd-disk" x="40" y="70" width="88" height="162" rx="12"/>
<text class="rd-name" x="84.0" y="91" text-anchor="middle">Disque 1</text>
<rect class="rd-blk rd-k-a" x="52" y="104" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="126.0" text-anchor="middle">A1</text>
<rect class="rd-blk rd-k-a" x="52" y="144" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="166.0" text-anchor="middle">A3</text>
<rect class="rd-blk rd-k-a" x="52" y="184" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="206.0" text-anchor="middle">A5</text>
</g>
<g>
<rect class="rd-disk" x="150" y="70" width="88" height="162" rx="12"/>
<text class="rd-name" x="194.0" y="91" text-anchor="middle">Disque 2</text>
<rect class="rd-blk rd-k-a" x="162" y="104" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="126.0" text-anchor="middle">A2</text>
<rect class="rd-blk rd-k-a" x="162" y="144" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="166.0" text-anchor="middle">A4</text>
<rect class="rd-blk rd-k-a" x="162" y="184" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="206.0" text-anchor="middle">A6</text>
</g>
<text class="rd-note" x="330" y="110" text-anchor="start">Les blocs sont écrits en alternance :</text>
<text class="rd-note" x="330" y="130" text-anchor="start">A1 sur le disque 1, A2 sur le disque 2, etc.</text>
<text class="rd-note" x="330" y="150" text-anchor="start">Les deux disques travaillent en même temps.</text>
</svg>
<figcaption>RAID 0 avec 2 disques : les blocs sont répartis, rien n'est copié.</figcaption>
</figure>

- **Principe.** Les fichiers sont découpés en blocs, écrits à tour de rôle sur chaque disque (*striping*). Rien n'est copié ni protégé.
- **Vitesse.** Les disques lisent et écrivent **en parallèle** : le débit se rapproche de celui d'un disque multiplié par le nombre de disques.
- **Panne.** Si **un seul** disque tombe, **tout** est perdu : chaque fichier a des blocs sur tous les disques. Plus il y a de disques, plus le risque de panne augmente.
- **Capacité.** 2 disques de 1 To donnent **2 To** utiles.
- **Usage.** Données temporaires ou faciles à recréer (cache, montage vidéo en cours), jamais des données importantes.

#### RAID 1 : le miroir

<figure class="raid-fig">
<svg viewBox="0 0 640 248" role="img" aria-labelledby="t" xmlns="http://www.w3.org/2000/svg">
<title id="t">RAID 1 : miroir</title>
<desc>Trois blocs A1 à A3 écrits à l'identique sur deux disques.</desc>
<text class="rd-cap" x="40" y="26">Fichier A</text>
<rect class="rd-blk rd-k-a" x="40" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="72.0" y="56.0" text-anchor="middle">A1</text>
<rect class="rd-blk rd-k-a" x="110" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="142.0" y="56.0" text-anchor="middle">A2</text>
<rect class="rd-blk rd-k-a" x="180" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="212.0" y="56.0" text-anchor="middle">A3</text>
<g>
<rect class="rd-disk" x="40" y="70" width="88" height="162" rx="12"/>
<text class="rd-name" x="84.0" y="91" text-anchor="middle">Disque 1</text>
<rect class="rd-blk rd-k-a" x="52" y="104" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="126.0" text-anchor="middle">A1</text>
<rect class="rd-blk rd-k-a" x="52" y="144" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="166.0" text-anchor="middle">A2</text>
<rect class="rd-blk rd-k-a" x="52" y="184" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="206.0" text-anchor="middle">A3</text>
</g>
<g>
<rect class="rd-disk" x="150" y="70" width="88" height="162" rx="12"/>
<text class="rd-name" x="194.0" y="91" text-anchor="middle">Disque 2 (miroir)</text>
<rect class="rd-blk rd-k-a rd-copy" x="162" y="104" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="126.0" text-anchor="middle">A1</text>
<rect class="rd-blk rd-k-a rd-copy" x="162" y="144" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="166.0" text-anchor="middle">A2</text>
<rect class="rd-blk rd-k-a rd-copy" x="162" y="184" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="206.0" text-anchor="middle">A3</text>
</g>
<path class="rd-arrow" d="M130 140 H148"/>
<text class="rd-note" x="330" y="110" text-anchor="start">Chaque bloc est écrit sur les deux disques.</text>
<text class="rd-note" x="330" y="130" text-anchor="start">Les deux disques contiennent exactement</text>
<text class="rd-note" x="330" y="150" text-anchor="start">les mêmes données : l'un est le miroir de l'autre.</text>
</svg>
<figcaption>RAID 1 avec 2 disques : chaque disque est une copie complète de l'autre.</figcaption>
</figure>

- **Principe.** Chaque bloc est écrit **en double**, sur deux disques. Les deux disques sont identiques à tout instant.
- **Vitesse.** L'écriture se fait sur les deux disques à la fois : elle n'est pas plus rapide qu'avec un seul disque. La lecture peut être répartie entre les deux.
- **Panne.** Si un disque tombe, l'autre contient **toutes les données** : le service continue. On remplace le disque en panne, puis le nouveau est **reconstruit par simple copie** de l'autre.
- **Capacité.** 2 disques de 1 To donnent **1 To** utile : la moitié de la capacité sert à la copie.
- **Limite.** Une erreur (fichier supprimé, virus) est recopiée sur le miroir : ce n'est **pas** une sauvegarde.
- **Usage.** Disques système d'un serveur, petits volumes importants.

#### RAID 5 : la parité répartie

<figure class="raid-fig">
<svg viewBox="0 0 720 286" role="img" aria-labelledby="t" xmlns="http://www.w3.org/2000/svg">
<title id="t">RAID 5 : blocs de données et parité répartie</title>
<desc>Quatre disques ; chaque ligne contient trois blocs de données et un bloc de parité, qui change de disque à chaque ligne.</desc>
<g>
<rect class="rd-disk" x="40" y="40" width="88" height="202" rx="12"/>
<text class="rd-name" x="84.0" y="61" text-anchor="middle">Disque 1</text>
<rect class="rd-blk rd-k-a" x="52" y="74" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="96.0" text-anchor="middle">A1</text>
<rect class="rd-blk rd-k-b" x="52" y="114" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="136.0" text-anchor="middle">B1</text>
<rect class="rd-blk rd-k-c" x="52" y="154" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="176.0" text-anchor="middle">C1</text>
<rect class="rd-blk rd-k-p" x="52" y="194" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="216.0" text-anchor="middle">Pd</text>
</g>
<g>
<rect class="rd-disk" x="150" y="40" width="88" height="202" rx="12"/>
<text class="rd-name" x="194.0" y="61" text-anchor="middle">Disque 2</text>
<rect class="rd-blk rd-k-a" x="162" y="74" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="96.0" text-anchor="middle">A2</text>
<rect class="rd-blk rd-k-b" x="162" y="114" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="136.0" text-anchor="middle">B2</text>
<rect class="rd-blk rd-k-p" x="162" y="154" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="176.0" text-anchor="middle">Pc</text>
<rect class="rd-blk rd-k-d" x="162" y="194" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="216.0" text-anchor="middle">D1</text>
</g>
<g>
<rect class="rd-disk" x="260" y="40" width="88" height="202" rx="12"/>
<text class="rd-name" x="304.0" y="61" text-anchor="middle">Disque 3</text>
<rect class="rd-blk rd-k-a" x="272" y="74" width="64" height="34" rx="6"/>
<text class="rd-t" x="304.0" y="96.0" text-anchor="middle">A3</text>
<rect class="rd-blk rd-k-p" x="272" y="114" width="64" height="34" rx="6"/>
<text class="rd-t" x="304.0" y="136.0" text-anchor="middle">Pb</text>
<rect class="rd-blk rd-k-c" x="272" y="154" width="64" height="34" rx="6"/>
<text class="rd-t" x="304.0" y="176.0" text-anchor="middle">C2</text>
<rect class="rd-blk rd-k-d" x="272" y="194" width="64" height="34" rx="6"/>
<text class="rd-t" x="304.0" y="216.0" text-anchor="middle">D2</text>
</g>
<g>
<rect class="rd-disk" x="370" y="40" width="88" height="202" rx="12"/>
<text class="rd-name" x="414.0" y="61" text-anchor="middle">Disque 4</text>
<rect class="rd-blk rd-k-p" x="382" y="74" width="64" height="34" rx="6"/>
<text class="rd-t" x="414.0" y="96.0" text-anchor="middle">Pa</text>
<rect class="rd-blk rd-k-b" x="382" y="114" width="64" height="34" rx="6"/>
<text class="rd-t" x="414.0" y="136.0" text-anchor="middle">B3</text>
<rect class="rd-blk rd-k-c" x="382" y="154" width="64" height="34" rx="6"/>
<text class="rd-t" x="414.0" y="176.0" text-anchor="middle">C3</text>
<rect class="rd-blk rd-k-d" x="382" y="194" width="64" height="34" rx="6"/>
<text class="rd-t" x="414.0" y="216.0" text-anchor="middle">D3</text>
</g>
<text class="rd-note" x="494" y="80" text-anchor="start">Pa = A1 XOR A2 XOR A3</text>
<text class="rd-note" x="494" y="100" text-anchor="start">(XOR = « ou exclusif »)</text>
<text class="rd-note" x="494" y="120" text-anchor="start"></text>
<text class="rd-note" x="494" y="140" text-anchor="start">La parité tourne d'un</text>
<text class="rd-note" x="494" y="160" text-anchor="start">disque à l'autre, pour répartir</text>
<text class="rd-note" x="494" y="180" text-anchor="start">la charge entre les disques.</text>
<text class="rd-note" x="494" y="200" text-anchor="start"></text>
<text class="rd-note" x="494" y="220" text-anchor="start">Capacité utile :</text>
<text class="rd-note" x="494" y="240" text-anchor="start">(n − 1) disques</text>
</svg>
<figcaption>RAID 5 avec 4 disques : A, B, C et D sont quatre lignes ; Pa à Pd sont les blocs de parité.</figcaption>
</figure>

- **Principe.** Pour chaque ligne de blocs, un disque reçoit un bloc de **parité** calculé à partir des autres. La parité change de disque à chaque ligne, pour qu'aucun disque ne soit plus sollicité que les autres.
- **La parité.** Elle se calcule avec l'opération **« ou exclusif »** (XOR, notée ⊕) : le résultat vaut 1 si le nombre de 1 est impair, 0 sinon. Exemple sur des bits : A1 = 1, A2 = 0, A3 = 1, donc Pa = 1 ⊕ 0 ⊕ 1 = **0**.
- **Reconstruction.** Si le disque 3 tombe, le bloc A3 est perdu, mais on le retrouve : A3 = Pa ⊕ A1 ⊕ A2 = 0 ⊕ 1 ⊕ 0 = **1**. Le même calcul s'applique à chaque ligne.
- **Vitesse.** La lecture est rapide (plusieurs disques en parallèle). L'écriture est plus lente : pour modifier un bloc, il faut lire l'ancien bloc et l'ancienne parité, recalculer, puis écrire le bloc et la parité.
- **Panne.** **1 disque** peut tomber. Le RAID fonctionne alors en **mode dégradé** (plus lent) jusqu'au remplacement du disque et à la **reconstruction**. Si un second disque tombe pendant ce temps, tout est perdu.
- **Capacité.** 4 disques de 1 To donnent (4 − 1) × 1 To = **3 To** utiles.
- **Usage.** Serveurs de fichiers : bon compromis entre capacité, sécurité et coût.

#### RAID 6 : deux parités <span class="technique">notion technique</span>

<figure class="raid-fig">
<svg viewBox="0 0 720 286" role="img" aria-labelledby="t" xmlns="http://www.w3.org/2000/svg">
<title id="t">RAID 6 : deux parités réparties</title>
<desc>Quatre disques ; chaque ligne contient deux blocs de données et deux blocs de parité P et Q répartis.</desc>
<g>
<rect class="rd-disk" x="40" y="40" width="88" height="202" rx="12"/>
<text class="rd-name" x="84.0" y="61" text-anchor="middle">Disque 1</text>
<rect class="rd-blk rd-k-a" x="52" y="74" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="96.0" text-anchor="middle">A1</text>
<rect class="rd-blk rd-k-b" x="52" y="114" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="136.0" text-anchor="middle">B1</text>
<rect class="rd-blk rd-k-c" x="52" y="154" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="176.0" text-anchor="middle">C1</text>
<rect class="rd-blk rd-k-q" x="52" y="194" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="216.0" text-anchor="middle">Qd</text>
</g>
<g>
<rect class="rd-disk" x="150" y="40" width="88" height="202" rx="12"/>
<text class="rd-name" x="194.0" y="61" text-anchor="middle">Disque 2</text>
<rect class="rd-blk rd-k-a" x="162" y="74" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="96.0" text-anchor="middle">A2</text>
<rect class="rd-blk rd-k-p" x="162" y="114" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="136.0" text-anchor="middle">Pb</text>
<rect class="rd-blk rd-k-p" x="162" y="154" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="176.0" text-anchor="middle">Pc</text>
<rect class="rd-blk rd-k-d" x="162" y="194" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="216.0" text-anchor="middle">D1</text>
</g>
<g>
<rect class="rd-disk" x="260" y="40" width="88" height="202" rx="12"/>
<text class="rd-name" x="304.0" y="61" text-anchor="middle">Disque 3</text>
<rect class="rd-blk rd-k-p" x="272" y="74" width="64" height="34" rx="6"/>
<text class="rd-t" x="304.0" y="96.0" text-anchor="middle">Pa</text>
<rect class="rd-blk rd-k-q" x="272" y="114" width="64" height="34" rx="6"/>
<text class="rd-t" x="304.0" y="136.0" text-anchor="middle">Qb</text>
<rect class="rd-blk rd-k-c" x="272" y="154" width="64" height="34" rx="6"/>
<text class="rd-t" x="304.0" y="176.0" text-anchor="middle">C2</text>
<rect class="rd-blk rd-k-d" x="272" y="194" width="64" height="34" rx="6"/>
<text class="rd-t" x="304.0" y="216.0" text-anchor="middle">D2</text>
</g>
<g>
<rect class="rd-disk" x="370" y="40" width="88" height="202" rx="12"/>
<text class="rd-name" x="414.0" y="61" text-anchor="middle">Disque 4</text>
<rect class="rd-blk rd-k-q" x="382" y="74" width="64" height="34" rx="6"/>
<text class="rd-t" x="414.0" y="96.0" text-anchor="middle">Qa</text>
<rect class="rd-blk rd-k-b" x="382" y="114" width="64" height="34" rx="6"/>
<text class="rd-t" x="414.0" y="136.0" text-anchor="middle">B2</text>
<rect class="rd-blk rd-k-q" x="382" y="154" width="64" height="34" rx="6"/>
<text class="rd-t" x="414.0" y="176.0" text-anchor="middle">Qc</text>
<rect class="rd-blk rd-k-p" x="382" y="194" width="64" height="34" rx="6"/>
<text class="rd-t" x="414.0" y="216.0" text-anchor="middle">Pd</text>
</g>
<text class="rd-note" x="494" y="80" text-anchor="start">Chaque ligne : 2 blocs de</text>
<text class="rd-note" x="494" y="100" text-anchor="start">données + 2 blocs de parité</text>
<text class="rd-note" x="494" y="120" text-anchor="start">calculés différemment (P et Q).</text>
<text class="rd-note" x="494" y="140" text-anchor="start"></text>
<text class="rd-note" x="494" y="160" text-anchor="start">Avec P et Q, on peut</text>
<text class="rd-note" x="494" y="180" text-anchor="start">retrouver les données même</text>
<text class="rd-note" x="494" y="200" text-anchor="start">si 2 disques sont perdus.</text>
<text class="rd-note" x="494" y="220" text-anchor="start"></text>
<text class="rd-note" x="494" y="240" text-anchor="start">Capacité utile :</text>
<text class="rd-note" x="494" y="260" text-anchor="start">(n − 2) disques</text>
</svg>
<figcaption>RAID 6 avec 4 disques : chaque ligne (A, B, C, D) a deux blocs de données, une parité P et une parité Q.</figcaption>
</figure>

- **Principe.** Comme le RAID 5, mais chaque ligne contient **deux** blocs de parité, **P** et **Q**, calculés par des formules différentes. Deux équations permettent de retrouver **deux** blocs inconnus. (Le calcul de Q fait appel à des mathématiques plus avancées, qu'on ne détaille pas ici.)
- **Panne.** **2 disques** peuvent tomber en même temps sans perte de données.
- **Vitesse.** L'écriture est un peu plus lente qu'en RAID 5 : il y a deux parités à calculer et à écrire.
- **Capacité.** 4 disques de 1 To donnent (4 − 2) × 1 To = **2 To** utiles. Avec 8 disques, on aurait 6 To : le « coût » de la protection supplémentaire diminue quand le nombre de disques augmente.
- **Usage.** Grosses baies de disques volumineux : la reconstruction dure longtemps, et le risque d'une seconde panne pendant ce temps devient réel.

#### RAID 10 : des miroirs répartis <span class="technique">notion technique</span>

<figure class="raid-fig">
<svg viewBox="0 0 640 272" role="img" aria-labelledby="t" xmlns="http://www.w3.org/2000/svg">
<title id="t">RAID 10 : miroirs répartis (RAID 1 + 0)</title>
<desc>Quatre disques formant deux miroirs ; les blocs sont répartis en alternance entre les deux miroirs.</desc>
<text class="rd-cap" x="40" y="26">Fichier A découpé en blocs</text>
<rect class="rd-blk rd-k-a" x="40" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="72.0" y="56.0" text-anchor="middle">A1</text>
<rect class="rd-blk rd-k-a" x="110" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="142.0" y="56.0" text-anchor="middle">A2</text>
<rect class="rd-blk rd-k-a" x="180" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="212.0" y="56.0" text-anchor="middle">A3</text>
<rect class="rd-blk rd-k-a" x="250" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="282.0" y="56.0" text-anchor="middle">A4</text>
<rect class="rd-blk rd-k-a" x="320" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="352.0" y="56.0" text-anchor="middle">A5</text>
<rect class="rd-blk rd-k-a" x="390" y="34" width="64" height="34" rx="6"/>
<text class="rd-t" x="422.0" y="56.0" text-anchor="middle">A6</text>
<g>
<rect class="rd-disk" x="40" y="70" width="88" height="162" rx="12"/>
<text class="rd-name" x="84.0" y="91" text-anchor="middle">Disque 1</text>
<rect class="rd-blk rd-k-a" x="52" y="104" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="126.0" text-anchor="middle">A1</text>
<rect class="rd-blk rd-k-a" x="52" y="144" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="166.0" text-anchor="middle">A3</text>
<rect class="rd-blk rd-k-a" x="52" y="184" width="64" height="34" rx="6"/>
<text class="rd-t" x="84.0" y="206.0" text-anchor="middle">A5</text>
</g>
<g>
<rect class="rd-disk" x="150" y="70" width="88" height="162" rx="12"/>
<text class="rd-name" x="194.0" y="91" text-anchor="middle">Disque 2</text>
<rect class="rd-blk rd-k-a rd-copy" x="162" y="104" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="126.0" text-anchor="middle">A1</text>
<rect class="rd-blk rd-k-a rd-copy" x="162" y="144" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="166.0" text-anchor="middle">A3</text>
<rect class="rd-blk rd-k-a rd-copy" x="162" y="184" width="64" height="34" rx="6"/>
<text class="rd-t" x="194.0" y="206.0" text-anchor="middle">A5</text>
</g>
<g>
<rect class="rd-disk" x="290" y="70" width="88" height="162" rx="12"/>
<text class="rd-name" x="334.0" y="91" text-anchor="middle">Disque 3</text>
<rect class="rd-blk rd-k-a" x="302" y="104" width="64" height="34" rx="6"/>
<text class="rd-t" x="334.0" y="126.0" text-anchor="middle">A2</text>
<rect class="rd-blk rd-k-a" x="302" y="144" width="64" height="34" rx="6"/>
<text class="rd-t" x="334.0" y="166.0" text-anchor="middle">A4</text>
<rect class="rd-blk rd-k-a" x="302" y="184" width="64" height="34" rx="6"/>
<text class="rd-t" x="334.0" y="206.0" text-anchor="middle">A6</text>
</g>
<g>
<rect class="rd-disk" x="400" y="70" width="88" height="162" rx="12"/>
<text class="rd-name" x="444.0" y="91" text-anchor="middle">Disque 4</text>
<rect class="rd-blk rd-k-a rd-copy" x="412" y="104" width="64" height="34" rx="6"/>
<text class="rd-t" x="444.0" y="126.0" text-anchor="middle">A2</text>
<rect class="rd-blk rd-k-a rd-copy" x="412" y="144" width="64" height="34" rx="6"/>
<text class="rd-t" x="444.0" y="166.0" text-anchor="middle">A4</text>
<rect class="rd-blk rd-k-a rd-copy" x="412" y="184" width="64" height="34" rx="6"/>
<text class="rd-t" x="444.0" y="206.0" text-anchor="middle">A6</text>
</g>
<text class="rd-grp" x="139" y="254" text-anchor="middle">Miroir 1</text>
<text class="rd-grp" x="389" y="254" text-anchor="middle">Miroir 2</text>
<text class="rd-grp" x="264.0" y="62" text-anchor="middle" opacity="0">.</text>
</svg>
<figcaption>RAID 10 avec 4 disques : deux miroirs (1 et 2), et les blocs sont répartis entre eux comme en RAID 0.</figcaption>
</figure>

- **Principe.** On combine RAID 1 et RAID 0 : les disques sont d'abord regroupés en **paires miroirs**, puis les blocs sont **répartis** entre les paires.
- **Vitesse.** Les écritures se répartissent entre les miroirs et il n'y a **pas de parité à calculer** : c'est le niveau le plus performant parmi ceux qui protègent les données. En cas de panne, la reconstruction consiste à recopier le disque jumeau, donc elle est rapide.
- **Panne.** **1 disque** par miroir peut tomber. Avec 4 disques, la perte du disque 1 et du disque 3 est supportée (un par miroir). La perte des disques 1 **et** 2 (les deux d'un même miroir) détruit les données.
- **Capacité.** 4 disques de 1 To donnent (4 ÷ 2) × 1 To = **2 To** utiles.
- **Usage.** Bases de données et machines virtuelles, qui écrivent beaucoup.

> [!NOTE] Comment choisir ?
> **Vitesse seule** : RAID 0. **Simplicité et sécurité sur 2 disques** : RAID 1. **Capacité, sécurité et coût raisonnable** : RAID 5. **Très grosses capacités** : RAID 6. **Performances et sécurité** : RAID 10. Dans tous les cas, le RAID ne remplace jamais une sauvegarde.

**À retenir pour l'évaluation :** RAID 0, 1 et 5. Pour chacun, sache dire à quoi il sert, combien de disques il faut et combien de pannes il supporte. **Exemple pour 3 disques de 1 To en RAID 5 :** capacité utile = (3 − 1) × 1 To = 2 To ; un disque peut tomber sans perte de données.

**Vocabulaire :** la **parité** est une information de contrôle calculée à partir des données, qui permet de **reconstruire** les données d'un disque en panne. *Striping* = répartir les données sur plusieurs disques ; *miroir* = écrire la même donnée sur deux disques.

> [!WARNING]
> **Un RAID n'est pas une sauvegarde.** Il protège d'une **panne de disque**, pas d'une suppression par erreur, d'un virus, d'un incendie ou d'une corruption : l'erreur est recopiée sur tous les disques. La sauvegarde est traitée au semestre 2.

## 5. Serveur à deux processeurs et NUMA <span class="technique">notion technique</span>

> [!TIP] Pour aller plus loin
> Cette section dépasse le socle de première année : retiens seulement qu'un serveur peut avoir **deux processeurs** et que cela coûte plus cher. Le détail de NUMA est facultatif.

Un **processeur physique** est une puce qui se place dans un **socket** de la carte mère. Un serveur à **deux sockets** (« bi-processeur ») accueille deux puces, chacune avec ses propres cœurs.

**Pourquoi deux processeurs ?** Pour aller au-delà de ce qu'une seule puce offre : plus de cœurs, plus de barrettes mémoire, plus de lignes PCIe (cartes réseau, stockage). **Limites :** coût, consommation, licences logicielles parfois comptées par processeur ou par cœur, et le point suivant.

**Mémoire et NUMA.** Chaque processeur possède son **contrôleur mémoire** et ses barrettes. Un cœur accède **vite** à la mémoire de son propre processeur, **moins vite** à celle de l'autre, à travers le lien entre processeurs (Intel : QPI, remplacé par UPI sur les générations récentes ; AMD : Infinity Fabric). Cette organisation s'appelle **NUMA** (*Non-Uniform Memory Access*, accès mémoire non uniforme). D'où deux règles : répartir les barrettes **équitablement** entre les deux processeurs, et faire tourner un programme sur le processeur qui détient sa mémoire quand c'est possible.

## 6. Dimensionner un serveur de virtualisation

Un seul serveur physique peut héberger plusieurs machines virtuelles (S06). Pour savoir quoi acheter, on additionne les besoins des machines et on ajoute une marge :

| Ressource | Méthode |
|---|---|
| **Mémoire** | somme des RAM des VM + RAM réservée à l'hôte + marge (par exemple 25 %) |
| **Processeur** | somme des vCPU ÷ ratio de partage (règle empirique, par exemple 2 vCPU par cœur physique) |
| **Stockage** | somme des disques des VM + marge pour la croissance et les instantanés ; calculer la capacité **utile** selon le niveau de RAID |

> [!NOTE]
> Le ratio de vCPU par cœur et la marge dépendent de la charge réelle des VM : ce sont des **points de départ**, pas des lois.

### Exemple de dimensionnement

*Cas fictif : une PME veut héberger cinq services sur un seul serveur de virtualisation.*

| Machine virtuelle | vCPU | RAM | Disque |
|---|---:|---:|---:|
| Annuaire et DNS | 2 | 4 Go | 60 Go |
| Serveur de fichiers | 2 | 8 Go | 500 Go |
| Serveur Web | 4 | 8 Go | 100 Go |
| Base de données | 4 | 16 Go | 200 Go |
| Supervision | 2 | 4 Go | 80 Go |
| **Total** | **14** | **40 Go** | **940 Go** |

**Mémoire.** On ajoute 8 Go pour l'hôte : 40 + 8 = 48 Go. Marge de 25 % : 48 × 1,25 = **60 Go**. On arrondit à la configuration disponible : **64 Go** de RAM (ECC).

**Processeur.** Avec 2 vCPU par cœur physique : 14 ÷ 2 = **7 cœurs** minimum. On prend un processeur de **8 cœurs** (16 threads), ce qui laisse un peu de réserve.

**Stockage.** On prévoit 30 % pour la croissance et les instantanés : 940 × 1,3 = 1 222 Go, soit environ **1,25 To utiles**. En **RAID 5** avec 4 disques SSD de 500 Go : capacité utile = (4 − 1) × 500 Go = **1,5 To**. La contrainte est respectée, et un disque peut tomber sans perte de données.

| Ressource | Besoin calculé | Choix retenu |
|---|---|---|
| Mémoire | 60 Go | 64 Go ECC |
| Processeur | 7 cœurs | 8 cœurs (16 threads) |
| Stockage | 1,25 To utiles | 4 × SSD 500 Go en RAID 5 (1,5 To utiles) |

> [!TIP] Vérifier avant de valider
> Une sauvegarde est à prévoir en plus (le RAID n'en tient pas lieu), ainsi qu'une alimentation redondante si le service doit être continu.

**Et la consommation ?** Les centres de données consomment beaucoup d'électricité. On mesure leur efficacité par le **PUE** (*Power Usage Effectiveness*) : énergie totale du site ÷ énergie consommée par les équipements informatiques. Un PUE de 1 serait idéal ; plus il est élevé, plus le refroidissement et les autres équipements pèsent. La question sera reprise en S05 (veille).

**Exemple (valeurs fictives).** Le compteur électrique d'une salle serveur indique **15 kW** au total. Cette puissance se répartit ainsi :

| Poste de consommation | Puissance |
|---|---:|
| Équipements informatiques (serveurs, stockage, commutateurs) | 10 kW |
| Climatisation (refroidir la chaleur produite par les équipements) | 3,5 kW |
| Onduleurs (pertes de conversion électrique) | 1 kW |
| Éclairage et divers | 0,5 kW |
| **Total mesuré au compteur** | **15 kW** |

Les **5 kW d'écart** entre les 15 kW du site et les 10 kW de l'informatique sont donc la consommation de tout ce qui **n'est pas** informatique : surtout la climatisation, puis les pertes des onduleurs et l'éclairage.

**Pourquoi PUE = 15 ÷ 10 ?** Le PUE compare l'énergie **totale** du site (numérateur, ce qu'on paie : 15 kW) à celle qui sert **réellement** à l'informatique (dénominateur : 10 kW). PUE = 15 ÷ 10 = **1,5** : pour 1 kWh utile aux serveurs, on consomme 1,5 kWh au total, dont 0,5 kWh de « frais généraux ». Sans aucune consommation annexe, on aurait 10 ÷ 10 = 1, le PUE idéal.

**Qu'est-ce qu'« améliorer » le PUE ?** On réduit les consommations annexes, **pas** celles des serveurs. Par exemple :

- on sépare les **allées chaudes et froides** (confinement) pour ne pas refroidir de l'air déjà mélangé ;
- on relève la température de consigne de la salle (par exemple de 21 °C à 25 °C), que les équipements supportent ;
- on utilise l'**air extérieur** quand il est assez frais (*free cooling*) au lieu de faire tourner les groupes froids ;
- on remplace les onduleurs par des modèles à meilleur rendement et on passe l'éclairage en LED avec détection de présence.

Résultat (fictif) : climatisation 1 kW, onduleurs 0,8 kW, éclairage et divers 0,2 kW, soit 2 kW d'annexes. Total = 10 + 2 = **12 kW**, donc PUE = 12 ÷ 10 = **1,2**.

**Ce que cela change sur une année** (24 h/24, 365 jours = 8 760 h) :

| | Avant | Après amélioration |
|---|---:|---:|
| Puissance informatique | 10 kW | 10 kW |
| Puissance annexe | 5 kW | 2 kW |
| Puissance totale | 15 kW | 12 kW |
| PUE | 1,5 | 1,2 |
| Énergie annuelle totale | 131 400 kWh | 105 120 kWh |
| Coût annuel (0,20 €/kWh, prix fictif) | 26 280 € | 21 024 € |

Économie : 26 280 − 21 024 = **5 256 € par an**, alors que les serveurs consomment toujours 87 600 kWh par an (10 kW × 8 760 h).

Cela vaut aussi à petite échelle : le serveur dimensionné ci-dessus, s'il consomme en moyenne 400 W, utilise 0,4 × 8 760 = 3 504 kWh par an, soit **5 256 kWh** avec un PUE de 1,5.

---

## À retenir

- Un processeur se juge sur **plusieurs critères** : génération, cœurs, threads, cache, fréquence, consommation. Les GHz seuls trompent.
- On **compare avec des benchmarks croisés**, puis on **justifie** son choix par rapport aux **besoins** et au **budget**.
- Un serveur se distingue par : processeur de gamme serveur, **ECC**, **RAID**, alimentations **redondantes**, gestion à distance, fonctionnement continu.
- **RAID ≠ sauvegarde.**
- Deux processeurs : plus de capacité, mais **NUMA**, coût et licences.
- On dimensionne en **additionnant** les besoins et en ajoutant une **marge**.
