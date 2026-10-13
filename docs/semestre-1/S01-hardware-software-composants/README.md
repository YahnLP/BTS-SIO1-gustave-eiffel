# S01 – Hardware et software : vocabulaire et composants

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S01 – semaine 01 (semestre 1) |
| **Durée** | 4 heures |
| **Prérequis** | Aucun |
| **Matériel** | Un ou deux ordinateurs de bureau **ouverts ou démontés** par groupe (à défaut : photos), un disque dur mécanique et un SSD à montrer, accès Internet |
| **Compétences travaillées** | B1.1 amorcée (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Quand on ouvre un ordinateur, que voit-on, à quoi sert chaque pièce, et comment un programme écrit par un humain finit-il par être exécuté par ces pièces ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Définir** et distinguer le **hardware** et le **software**, et donner un exemple de chacun ;
2. **Identifier** les composants internes d'une unité centrale et les connecteurs externes, et dire à quoi ils servent ;
3. **Décrire l'architecture de Von Neumann** et le cycle *chercher – décoder – exécuter* ;
4. **Distinguer** RAM, ROM et mémoire cache ;
5. **Comparer** un disque dur mécanique (HDD) et un SSD ;
6. **Relier** un programme écrit par un humain (pseudo-code, Python) à ce que le processeur exécute (langage machine).

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Hardware et software, composants, Von Neumann, mémoires, stockage |
| [TP : ouvrir un ordinateur](02-tp.md) | Identifier, comparer, exécuter un programme « à la main », bilan de compétences |
| [Aide-mémoire](03-aide-memoire.md) | Vocabulaire et composants à garder sous la main |
| [Questionnaire de positionnement](tp/questionnaire-positionnement.txt) | À remplir au début, sans note, pour situer le groupe |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 25 | **Accueil** : présentation de la formation, du site, du mode de travail (J'anticipe / Je comprends / bilan). **Questionnaire de positionnement** (non noté) | Collectif puis individuel |
| 0 h 25 – 1 h 00 | **Mini-cours** : hardware, software, composants (cours §1 à §3) | Cours et questions |
| 1 h 00 – 1 h 45 | **TP partie A** : identifier les composants sur une machine ouverte | Binôme |
| 1 h 45 – 2 h 00 | Pause | |
| 2 h 00 – 2 h 20 | **Mini-cours** : Von Neumann, mémoires, stockage (cours §4 à §6) | Cours et questions |
| 2 h 20 – 2 h 50 | **TP partie B** : mémoires et stockage (HDD / SSD) | Binôme |
| 2 h 50 – 3 h 30 | **TP partie C** : exécuter un programme à la main (la « machine papier ») | Binôme |
| 3 h 30 – 3 h 40 | **TP partie D** : du pseudo-code au langage machine | Binôme |
| 3 h 40 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

## Évaluation

- Compte rendu PDF nommé `RENDU-CS1-TP1.1-NOM.pdf`, avec les réponses et les photos ou captures demandées.
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Observation d'une machine réelle :** la séance repose sur l'observation d'un poste de récupération ouvert. À défaut de machine ouverte, utiliser des photos annotées.
- **Découpage :** les conversions d'unités et les débits passent en S02 ; les processeurs, les serveurs et l'appel d'offres en S03 ; BIOS, système d'exploitation et licences en S04 ; l'histoire d'Internet, le quantique et l'énergie en S05.
- **Sécurité en salle :** débrancher les machines avant ouverture, ne pas toucher le bloc d'alimentation, se décharger de l'électricité statique (toucher le châssis métallique) avant de manipuler une carte.
- **Corrigé :** dans `corriges/` à la racine du dépôt.
- **Compétences :** codes et intitulés relus sur l'arrêté du 8 juillet 2024 ; le choix des compétences pour cette séance est une proposition de l'enseignant.

</details>
