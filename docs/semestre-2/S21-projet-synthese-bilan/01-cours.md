# Cours – Réussir un projet de synthèse et faire son bilan

*BTS SIO SISR 1re année – S21 – à lire avant le [TP](02-tp.md)*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** les séances S11 à S20 et leurs comptes rendus.
> - **Mots déjà vus :** tout le vocabulaire du semestre : voir le [glossaire](../../ressources/glossaire.md).
> - **Expliqués dans ce cours :** fiche de réalisation, tableau de synthèse, portfolio, entretien d'explicitation, recette. **Session chargée, soyez concentrés** : la rédaction demande du temps, commence dès l'étape A.

## À la fin de ce cours, tu sauras

- [ ] **organiser** un travail complexe : urgent d'abord, propre ensuite, durable à la fin ;
- [ ] distinguer **incident**, **problème** et **changement** dans une même situation ;
- [ ] choisir et présenter une **preuve** de compétence ;
- [ ] **t'auto-évaluer** sans te surestimer ni te sous-estimer ;
- [ ] **présenter** une réalisation en cinq minutes.

## 1. Un projet de synthèse : par où commencer ?

Un lundi matin, tout arrive en même temps : des utilisateurs sans réseau, un inventaire incomplet, une licence non déclarée, un nouvel arrivant. Une règle simple de priorité :

| Ordre | Question | Exemple |
|---|---|---|
| 1. **Rétablir** le service | Qui est bloqué maintenant ? | Les postes sans réseau |
| 2. **Rendre l'outil fiable** | Qu'est-ce qui est faux ou incomplet ? | Inventaire, affectations, licences |
| 3. **Donner les droits justes** | Qui doit pouvoir faire quoi ? | Nouveau technicien : droits de technicien, pas d'administration |
| 4. **Comprendre et prévenir** | Pourquoi est-ce arrivé ? Comment éviter la récidive ? | Problème, cause racine, changement |

> [!NOTE]
> Cet ordre **n'est pas une règle universelle** : c'est une façon de ne pas se laisser dicter l'ordre par le plus bruyant. Il faut **justifier** ses arbitrages.

**Rappel des trois notions** (S15, S16) :

| Notion | Question | Dans le projet |
|---|---|---|
| **Incident** | Comment rétablir ? | Les trois tickets des postes sans réseau |
| **Problème** | Quelle est la cause ? | La cause commune qui regroupe les tickets |
| **Changement** | Comment l'éliminer sans casser autre chose ? | Remplacement de l'équipement, **approuvé** par la bonne personne |

La séparation des rôles (qui **demande**, qui **approuve**) est une **protection** : celui qui exécute ne s'approuve pas lui-même (S14 et InfraLab).

## 2. La trace : tout se prouve

Un travail sans trace n'existe pas pour quelqu'un d'autre : tickets documentés, solutions en **quatre éléments** (symptôme, cause, action, vérification), historique d'actifs, journal d'audit. La **trace** sert à **reprendre un dossier**, à **auditer**, et à **te défendre** si tu es mis en cause.

## 3. La preuve de compétence

Une **bonne preuve** est :

| Qualité | Test |
|---|---|
| **Datée** | On sait **quand** |
| **Contextualisée** | On sait **dans quelle situation** et **avec quel objectif** |
| **Personnelle** | On voit ce que **tu** as fait (pas le groupe, pas le formateur) |
| **Vérifiable** | Une autre personne peut **retrouver** la source (fichier, journal, compte rendu) |
| **Pertinente** | Elle illustre **la** compétence visée |

Exemples : le journal de commandes de S11, le journal d'installation de GLPI de S13, un compte rendu exporté d'InfraLab, le script et sa relance en S19, la restauration prouvée en S20.

> [!WARNING]
> **Un score n'est pas une preuve de compétence.** Un score d'application mesure la complétion et l'autonomie ; il ne dit pas ce que tu sais faire. Seul **le travail** (journal, explication, démonstration) le montre.

**Données sensibles.** Avant de verser une capture dans un dossier, vérifie qu'elle ne contient ni **mot de passe**, ni **adresse privée**, ni **donnée personnelle** réelle.

## 4. S'auto-évaluer

L'échelle des bilans reprend le vocabulaire des grilles nationales d'évaluation :

| Niveau | Sens |
|---|---|
| **Non maîtrisé** | Tu ne sais pas encore le faire, ou seulement avec une aide constante |
| **Maîtrise partielle** | Tu le fais avec une aide ponctuelle ou en te trompant parfois |
| **Bonne maîtrise** | Tu le fais **seul** et correctement |
| **Excellente maîtrise** | Tu le fais seul, correctement, tu peux l'**expliquer** et l'adapter à un autre contexte |
| **Non évalué** | Tu n'as pas travaillé cette compétence |

Deux pièges : **se surestimer** (« j'ai réussi le TP, donc je sais ») ; **se sous-estimer** (« ça ne m'a pas paru difficile »). Un bon critère : **sans l'aide-mémoire**, peux-tu refaire et expliquer ?

## 5. Présenter en cinq minutes

| Minutes | Contenu |
|---|---|
| 0 – 0,5 | **Contexte** : qui, quoi, pourquoi |
| 0,5 – 2,5 | **Réalisation** : ce que **tu** as fait, avec **une** preuve montrée |
| 2,5 – 3,5 | **Un choix** et ce que tu as **écarté** |
| 3,5 – 4,5 | **Une difficulté** et comment tu l'as surmontée |
| 4,5 – 5 | **Lien avec une compétence** et suite possible |

Parle de **ce que tu as fait**, pas de ce que « le groupe a fait ». Utilise le vocabulaire juste. Prépare une réponse à : « Qu'est-ce qui se passerait si… ? »

## 6. Le vocabulaire de l'examen

Ces mots reviendront en deuxième année ; mieux vaut les comprendre maintenant.

| Mot | Sens |
|---|---|
| **Réalisation professionnelle** | Un travail que **tu** as mené (en stage, en entreprise ou en formation), décrit et prouvé. |
| **Fiche de réalisation** | Le document qui décrit une réalisation : contexte, besoin, travail effectué, preuves. Un modèle est fourni dans les [ressources](../../ressources/fiche-realisation-professionnelle.md). |
| **Portfolio** | Ton dossier **numérique** qui rassemble les preuves de tes compétences ; il doit rester **accessible** au jury. |
| **Tableau de synthèse** | Le tableau qui relie chaque réalisation aux **compétences** du référentiel. Voir [le modèle](../../ressources/tableau-synthese.md). |
| **Entretien d'explicitation** | Échange où tu **expliques** ce que tu as fait, comment et pourquoi : le jury cherche à comprendre **ta** démarche. |
| **Recette** | Vérification devant le jury que la réalisation **fonctionne** comme prévu (on la montre ou on la teste). |

> [!NOTE]
> Les durées et les modalités exactes des épreuves sont fixées par le règlement d'examen : ton enseignant te les précisera. Les compétences évaluées sont dans [la page référentiel](../../ressources/referentiel.md).

## Je retiens

- Urgent d'abord (**rétablir**), propre ensuite (**inventaire, licences, droits**), durable à la fin (**problème, changement**).
- Qui demande n'est pas qui approuve.
- Une **preuve** est datée, contextualisée, personnelle, vérifiable, pertinente.
- Un **score** n'est pas une compétence.
- On s'auto-évalue **sans aide-mémoire** ; on explique ce qu'on **a fait**.
