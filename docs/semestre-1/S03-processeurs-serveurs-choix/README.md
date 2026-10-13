# S03 – Processeurs, serveurs et choix d'un matériel

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S03 – semaine 03 (semestre 1) |
| **Durée** | 4 heures |
| **Prérequis** | [S01](../S01-hardware-software-composants/README.md) (composants) et [S02](../S02-unites-debits-poste/README.md) (unités, lecture d'un poste) |
| **Matériel** | Poste avec accès Internet (recherche de fiches techniques et de benchmarks) |
| **Compétences travaillées** | B2.1 · B1.1 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Une société de 22 salariés renouvelle son parc : un développeur, une graphiste et une secrétaire ont-ils besoin du même ordinateur ? Et pourquoi un serveur coûte-t-il dix fois plus cher qu'un poste qui semble aussi puissant ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Lire** les caractéristiques d'un processeur (famille, génération, cœurs, threads, fréquence, cache, consommation) ;
2. **Comparer** deux processeurs avec des **sources** (fiches constructeur, benchmarks) et expliquer pourquoi les GHz seuls ne suffisent pas ;
3. **Proposer** une configuration par profil d'utilisateur, **dans un budget**, et la justifier ;
4. **Distinguer** un poste de travail et un serveur (processeur, mémoire ECC, RAID, alimentation redondante, formats) ;
5. **Expliquer** ce qu'est un serveur à deux processeurs et pourquoi la mémoire y est répartie (NUMA) — niveau découverte ;
6. **Dimensionner** un serveur qui héberge plusieurs machines virtuelles (préparation de la virtualisation en S06).

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Processeurs, benchmarks, serveurs, RAID, bi-processeur, dimensionnement |
| [TP : choisir un matériel](02-tp.md) | Appel d'offres, Xeon contre Core, dimensionnement, bilan de compétences |
| [Aide-mémoire](03-aide-memoire.md) | Lire un processeur, RAID, dimensionner |
| [Catalogue fictif de la société Ochan-Elizé](tp/catalogue-ochan-elize.txt) | Les quatre configurations à comparer |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 10 | **Accroche** : même prix, deux processeurs, deux performances | Oral |
| 0 h 10 – 0 h 45 | **Mini-cours** : processeurs et benchmarks (cours §1 et §2) | Cours et questions |
| 0 h 45 – 1 h 05 | **TP partie A** : lire un processeur | Binôme |
| 1 h 05 – 2 h 05 | **TP partie B** : appel d'offres | Binôme |
| 2 h 05 – 2 h 20 | Pause | |
| 2 h 20 – 2 h 40 | **Mini-cours** : serveurs, RAID, bi-processeur (cours §3 à §5) | Cours et questions |
| 2 h 40 – 3 h 10 | **TP partie C** : Xeon contre Core | Binôme |
| 3 h 10 – 3 h 40 | **TP partie D** : dimensionner un serveur de virtualisation | Binôme |
| 3 h 40 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

La partie E (bi-processeur et NUMA) est facultative.

## Évaluation

- Compte rendu PDF nommé `RENDU-CS1-TP1.3-NOM.pdf`, avec la démarche d'appel d'offres, les tableaux de comparaison **sourcés** et le dimensionnement.
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Catalogue :** `tp/catalogue-ochan-elize.txt` est un catalogue **fictif** : prix inventés, modèles de processeurs réels (générations 12) mais **caractéristiques à vérifier sur les fiches constructeur** avant la séance. Remplace-le par ton propre catalogue si tu en as un.
- **Dimensionnement (partie D) :** cas, chiffres et règles empiriques (ratio de vCPU par cœur, marge de 25 %) sont des **propositions** ; ils préparent la virtualisation et les sauvegardes.
- **Sujet du semestre 2 :** le RAID n'est présenté ici que pour la tolérance de panne ; l'étude des sauvegardes (S20) montrera qu'un RAID n'est pas une sauvegarde.
- **Corrigé :** dans `corriges/` à la racine du dépôt.
- **Compétences :** codes et intitulés relus sur l'arrêté du 8 juillet 2024 ; le choix des compétences pour cette séance est une proposition de l'enseignant.

</details>
