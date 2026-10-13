# S15 – ITIL : incidents, demandes et tickets

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S15 – semaine 15 (semestre 2) |
| **Durée** | 4 heures |
| **Prérequis** | GLPI installé et parc configuré ([S13](../S13-glpi-installation-agent/README.md), [S14](../S14-glpi-exploiter-le-parc/README.md), snapshot `GLPI parc configuré`) ; notion de CMDB ([S12](../S12-patrimoine-inventaire/README.md)) |
| **Matériel** | La VM serveur GLPI de S14 ; navigateur ; un second navigateur ou une fenêtre privée |
| **Compétences travaillées** | B1.2 · B1.1 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Quand un utilisateur appelle, comment décider quoi traiter en premier, qui s'en occupe, et comment garder la trace pour que personne n'ait à redemander ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Distinguer** incident, problème, demande de service et changement ;
2. **Fixer une priorité** à partir de l'impact et de l'urgence, avec une matrice ;
3. **Rédiger** un ticket complet, exploitable par un autre technicien sans rappeler l'utilisateur ;
4. **Décider** d'une escalade N1 vers N2 et la **justifier** ;
5. **Traiter** quatre tickets dans GLPI : création, lien à un équipement, affectation, suivis, escalade, résolution, clôture ;
6. **Mesurer** un temps de résolution et le comparer à un délai cible.

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | ITIL, service, vocabulaire, priorités, SLA, centre de services, niveaux, tickets dans GLPI |
| [TP : un centre de services](02-tp.md) | Classer, prioriser, rédiger, préparer GLPI, traiter quatre tickets, jouer le N1, bilan |
| [Aide-mémoire](03-aide-memoire.md) | Matrice, statuts, structure d'un ticket |
| [Fiche de ticket](tp/fiche-ticket-incident.txt) | Modèle papier pour la rédaction préalable |
| [Grille d'observation](tp/grille-observation-jeu-de-role.txt) | Pour le jeu de rôle |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 10 | **Accroche** : trois appels en même temps, un seul technicien : lequel d'abord ? | Oral |
| 0 h 10 – 0 h 40 | **Mini-cours** : types de sollicitations, priorité, niveaux, ticket (cours §1 à §6) | Cours et questions |
| 0 h 40 – 1 h 10 | **TP partie A** : classer douze sollicitations | Binôme |
| 1 h 10 – 1 h 35 | **TP partie B** : rédiger deux tickets | Binôme |
| 1 h 35 – 1 h 50 | Pause | |
| 1 h 50 – 2 h 15 | **TP partie C** : préparer GLPI (groupes, demandeurs, catégories, délai cible) | Binôme |
| 2 h 15 – 3 h 20 | **TP partie D** : quatre tickets dans GLPI | Individuel |
| 3 h 20 – 3 h 40 | **TP partie E** : jeu de rôle du technicien N1 | Binôme + observateur |
| 3 h 40 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

## Évaluation

- Compte rendu PDF nommé `RENDU-S15-NOM.pdf` : classement, tickets rédigés, captures des quatre tickets GLPI, tableau des temps, grille d'observation, réponses.
- **Snapshot** de la VM serveur nommé `GLPI tickets` (réutilisé en S16).
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Sources :** le cours d'origine « Introduction à ITIL » (service, types de sollicitations, priorité, SLA, centre de services, niveaux, ticket), ses exercices (classification, rédaction, jeu de rôle), le modèle de ticket d'incident, et la fiche TP GLPI « Gestion complète de tickets » (quatre scénarios). Le cours « ITIL – Suite » (cycle de vie en sept étapes, diagnostic, base de connaissances) et son TP de trois incidents sont **reportés en S16**.
- **Schémas perdus :** dans le PDF d'origine, plusieurs éléments (les quatre types de sollicitations, le cycle de vie du ticket, la matrice de priorité, le schéma N1/N2/N3) sont des **images** que je n'ai pas pu exploiter. **Décision :** j'ai reconstitué les quatre types d'après le texte, et proposé une **matrice impact × urgence** compatible avec les exemples P1 à P4 du cours (règle : haut = 3, moyen = 2, bas = 1 ; somme 6 ou 5 → P1, 4 → P2, 3 → P3, 2 → P4). C'est **ma proposition**, pas la matrice de l'auteur : à ajuster.
- **Priorités de GLPI :** le support d'origine écrit « 1-Très haute à 5-Très basse ». Je pense que GLPI classe de « Très basse » à « Très haute » plus une priorité « Majeure », sans certitude du sens des numéros. **À vérifier**. Le TP utilise P1 à P4 (échelle pédagogique) et demande de **faire correspondre** l'échelle de GLPI.
- **Statuts :** le support d'origine place « Planifié » entre « En cours » et « En attente » et le décrit comme « technicien qui travaille activement ». Je pense que « En cours (planifié) » désigne une intervention **prévue à une date** ; j'ai corrigé en ce sens. **À vérifier** sur la version.
- **Éléments non repris :** « 90 % des offres d'emploi citent ITIL » (non sourcé) ; les pourcentages de résolution par niveau et les certifications citées (non sourcés) ; la mention de l'épreuve E5 avec des codes de compétences qui ne correspondent pas au référentiel du dépôt.
- **Éditeur d'ITIL 4 :** le support d'origine cite Axelos ; à ma connaissance, la gestion d'ITIL est depuis passée à un autre éditeur. **À vérifier** avant de l'afficher ; le cours ne nomme pas d'éditeur.
- **Scénarios de la fiche GLPI :** ils supposent un annuaire (compte, groupe `GRP_MARKETING`) que nous n'avons pas : le ticket 3 reste **simulé** comme le prévoit l'original. Ils supposent aussi des groupes, des catégories et un délai cible **déjà créés** : la partie C les prépare.
- **Rien n'a été exécuté** dans GLPI : écrans et chemins à vérifier avant la séance (voir le [corrigé](https://github.com/YahnLP/BTS-SIO1-gustave-eiffel/blob/main/corriges/S15-itil-incidents-tickets.md)).
- **Compétences :** B1.2 et B1.1 sont une proposition à valider. Les supports d'origine citent B1.2 « Exploiter des référentiels… (ITIL) », B1.3 et B3.3 avec des intitulés différents du référentiel du dépôt.

</details>
