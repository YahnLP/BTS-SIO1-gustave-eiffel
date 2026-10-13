# Corrigé (enseignant) – S03 Processeurs, serveurs et choix d'un matériel

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les réponses des parties A à E sont repliées dans le TP. Ce document ajoute les valeurs de référence et les points d'attention.

## Partie A – valeurs attendues (à vérifier sur la fiche constructeur avant la séance)

| Critère | i3-12100 | i5-12400 | i7-12700 | i9-12900 |
|---|---|---|---|---|
| Cœurs / threads | 4 / 8 | 6 / 12 | 12 (8 P + 4 E) / 20 | 16 (8 P + 8 E) / 24 |
| Turbo maximal | ≈ 4,3 GHz | ≈ 4,4 GHz | ≈ 4,9 GHz | ≈ 5,1 GHz |
| Cache L3 | ≈ 12 Mo | ≈ 18 Mo | ≈ 25 Mo | ≈ 30 Mo |
| TDP de base | ≈ 60 W | ≈ 65 W | ≈ 65 W | ≈ 65 W |
| Graphique intégré | oui (modèle UHD de milieu de gamme) | oui | oui | oui |

> **Ces valeurs sont données de mémoire** : elles ont servi à écrire le catalogue mais n'ont pas été relues sur la fiche officielle. À vérifier avant de les utiliser pour noter.

## Partie B

- **Total de la proposition :** 23 990 € (15 × 980 + 5 × 1 650 + 2 × 520).
- **Variante économique :** 15 × 690 + 5 × 1 650 + 2 × 520 = 19 640 €.
- **Mauvaise réponse typique :** tout le monde en C4 (22 × 1 650 = 36 300 €, hors budget) ou tout le monde en C1 (profils créatifs sous-équipés). Exiger toujours le calcul du total.
- **Critères de notation (indicatif, sur 10) :** besoins explicités (2) ; benchmarks croisés et sourcés (3) ; budget respecté et calculé (2) ; justification cohérente (3).
- **Windows 11 :** les exigences exactes (TPM 2.0, UEFI avec démarrage sécurisé, RAM et stockage minimums, processeur compatible) sont à relire sur le site Microsoft au moment de la séance.

## Partie C

- Tout Xeon accepté si la fiche est sourcée. Attention aux **références de plusieurs générations** : ne pas laisser comparer deux fiches de nature différente (poste de travail contre serveur) sans le dire.
- Vigilance sur « mémoire ECC prise en charge » : elle dépend aussi de la carte mère et de la barrette, pas seulement du processeur.

## Partie D

Voir les calculs du TP (12 vCPU, 28 Go, 880 Go ; 40 Go ; 6 cœurs ; RAID 5 = 3 To utiles, RAID 10 = 2 To utiles). Ratios et marges **proposés par l'auteur, non issus d'un support** : les discuter avec les étudiants plutôt que les imposer.

## Écarts avec le support d'origine

- Le support d'origine demandait de « choisir la meilleure configuration pour chaque employé » sans budget : un **budget** a été ajouté pour imposer un arbitrage.
- Les questions Xeon, bi-processeur et NUMA du support « processeurs et serveurs » sont réparties entre le cours (§3 et §5), la partie C et la partie E facultative.
