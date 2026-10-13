# Cours – Processeurs, serveurs et choix d'un matériel

*BTS SIO SISR 1re année – S03 – à lire avant le [TP](02-tp.md)*

## À la fin de ce cours, tu sauras

- [ ] lire les caractéristiques d'un **processeur** et en tirer un usage ;
- [ ] expliquer pourquoi les **GHz seuls** ne suffisent pas à comparer deux processeurs ;
- [ ] choisir une configuration **selon un profil d'utilisateur** et un budget ;
- [ ] distinguer un **poste de travail** d'un **serveur** ;
- [ ] expliquer le **RAID** (niveaux 0, 1, 5, 6, 10) et sa limite ;
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

| Niveau | Principe | Disques minimum | Capacité utile | Pannes supportées |
|---|---|---|---|---|
| **RAID 0** | Les données sont réparties (*striping*) | 2 | n × taille | **aucune** |
| **RAID 1** | Miroir : chaque donnée est écrite en double | 2 | 1 × taille | 1 disque |
| **RAID 5** | Répartition + une parité | 3 | (n − 1) × taille | 1 disque |
| **RAID 6** | Répartition + deux parités | 4 | (n − 2) × taille | 2 disques |
| **RAID 10** | Miroirs répartis | 4 | (n ÷ 2) × taille | 1 disque au minimum (jusqu'à un par miroir) |

(n = nombre de disques de même taille.)

> [!WARNING]
> **Un RAID n'est pas une sauvegarde.** Il protège d'une **panne de disque**, pas d'une suppression par erreur, d'un virus, d'un incendie ou d'une corruption : l'erreur est recopiée sur tous les disques. La sauvegarde est traitée au semestre 2.

## 5. Serveur à deux processeurs et NUMA

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

**Et la consommation ?** Les centres de données consomment beaucoup d'électricité. On mesure leur efficacité par le **PUE** (*Power Usage Effectiveness*) : énergie totale du site ÷ énergie consommée par les équipements informatiques. Un PUE de 1 serait idéal ; plus il est élevé, plus le refroidissement et les autres équipements pèsent. La question sera reprise en S05 (veille).

---

## À retenir

- Un processeur se juge sur **plusieurs critères** : génération, cœurs, threads, cache, fréquence, consommation. Les GHz seuls trompent.
- On **compare avec des benchmarks croisés**, puis on **justifie** son choix par rapport aux **besoins** et au **budget**.
- Un serveur se distingue par : processeur de gamme serveur, **ECC**, **RAID**, alimentations **redondantes**, gestion à distance, fonctionnement continu.
- **RAID ≠ sauvegarde.**
- Deux processeurs : plus de capacité, mais **NUMA**, coût et licences.
- On dimensionne en **additionnant** les besoins et en ajoutant une **marge**.
