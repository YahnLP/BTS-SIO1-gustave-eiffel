# Cours – ITIL, incidents, demandes et tickets

*BTS SIO SISR 1re année – S15 – à lire avant le [TP](02-tp.md)*

## À la fin de ce cours, tu sauras

- [ ] expliquer ce qu'est **ITIL** et ce qu'est un **service** ;
- [ ] **classer** une sollicitation : incident, problème, demande, changement ;
- [ ] **fixer la priorité** avec une matrice impact × urgence ;
- [ ] expliquer le rôle du **centre de services** et des **niveaux** N1, N2, N3 ;
- [ ] **rédiger** un ticket complet ;
- [ ] situer les **indicateurs** (MTTR, SLA…).

## 1. ITIL en deux phrases

**ITIL** (*Information Technology Infrastructure Library*) est un **référentiel de bonnes pratiques** pour gérer les services informatiques. Ce n'est ni une norme à respecter, ni un logiciel : c'est un vocabulaire et des méthodes issus de l'expérience de nombreuses organisations. La version actuelle est **ITIL 4**, qui décrit **34 pratiques** de gestion.

> [!NOTE]
> Le support d'origine date la création d'ITIL des années 1980 par une administration britannique. Les dates et l'éditeur actuel sont à **vérifier** sur le site officiel avant d'être cités.

## 2. Un service, c'est un résultat, pas une machine

Un **service informatique** est un moyen de **créer de la valeur** pour l'utilisateur en prenant en charge la complexité technique à sa place.

| Ce que l'utilisateur voit | Ce que la DSI gère |
|---|---|
| « Je peux envoyer des mails » | Serveur de messagerie, réseau, pare-feu, licences, sauvegardes, mises à jour, supervision |

L'utilisateur ne veut pas un serveur : il veut **travailler**. Un incident, c'est du travail empêché.

**Les quatre dimensions** à examiner pour tout service (ITIL 4) : **les personnes** (qui, quelles compétences), **l'information et la technologie** (quels outils), **les partenaires et fournisseurs** (qui d'autre intervient), **les processus** (quelle procédure). Oublier une dimension fragilise le service.

## 3. Les quatre types de sollicitations

| Type | Définition | Exemple |
|---|---|---|
| **Incident** | Interruption **non planifiée** ou dégradation d'un service | « Excel plante » |
| **Problème** | **Cause** inconnue à rechercher, souvent derrière plusieurs incidents | « Pourquoi Excel plante-t-il sur tous les postes d'un même réseau ? » |
| **Demande de service** | Demande **standard** prévue, sans panne | Créer un compte, installer un logiciel autorisé |
| **Changement** | **Modification** de l'infrastructure, à planifier et contrôler | Migrer la messagerie |

> [!WARNING]
> **Confusion fréquente : incident et problème.** Un incident se **résout** (retour au service, même par un contournement). Un problème se **traite** (on supprime la cause pour qu'il ne revienne pas). Un incident peut être clos sans que le problème le soit.

## 4. La priorité : impact et urgence

La **priorité** décide de l'ordre de traitement. Elle combine :

- l'**impact** : effet sur l'activité (combien de personnes, quel processus, quelle conséquence financière) ;
- l'**urgence** : rapidité avec laquelle une solution est nécessaire (échéance, criticité, mode dégradé possible).

| Niveau | Impact | Urgence |
|---|---|---|
| **Haut** | Beaucoup d'utilisateurs, application majeure, ou personne **VIP/VOP** | Équipement ou application **critique** |
| **Moyen** | Nombre limité d'utilisateurs, application standard | Non critique |
| **Bas** | Un utilisateur ou très peu, application bureautique | Mode dégradé acceptable |

**VIP** : membres de la direction (liste fixée par la direction). **VOP** (*very operational person*) : personnes dont le rôle est clé **à un moment donné** (par exemple le responsable de la paie en fin de mois).

> [!NOTE]
> **Ne te fie pas à l'utilisateur pour la priorité.** Il est presque toujours persuadé que son incident est le plus urgent. Tu évalues avec la matrice, ton jugement et ceux de tes collègues.

**Matrice de priorité.** C'est celle du laboratoire **[InfraLab](https://yahnlp.github.io/InfraLab/)**, reprise ici pour que tu n'en rencontres qu'une. La priorité est **calculée** à partir de l'impact et de l'urgence.

| Urgence ↓ / Impact → | Haut | Moyen | Bas |
|---|---|---|---|
| **Haute** | **P1** | **P2** | **P3** |
| **Moyenne** | **P2** | **P3** | **P4** |
| **Basse** | **P3** | **P4** | **P4** |

Chaque organisation fixe sa propre matrice et ses délais ; celle-ci est un exemple d'enseignement.

### Construire et adapter une matrice à une organisation

Une matrice n'est pas une table à recopier : c'est une **décision** de l'organisation, prise avec ses métiers. Pour en construire une (ou adapter celle-ci) :

1. **Définir les niveaux d'impact avec des critères de l'organisation.** « Beaucoup d'utilisateurs » ne veut rien dire en général : pour JackCelair (22 postes), haut peut vouloir dire « plus de cinq personnes ou la facturation », alors que pour une entreprise de 2 000 postes le seuil est tout autre. On cite des **chiffres** (nombre de personnes), des **services critiques** (ceux de la CMDB, S12 à S14) et les **conséquences** (financières, légales, d'image).
2. **Définir les niveaux d'urgence** : échéances métier (clôture mensuelle, paie), existence d'un **contournement**, criticité de l'équipement. Fixer qui a le droit de la **modifier** (ex. la direction pour les VIP).
3. **Choisir le nombre de priorités** : quatre (P1 à P4) est courant ; moins de niveaux simplifie, plus de niveaux complique sans bénéfice. Les cases se remplissent en **combinant** impact et urgence ; certaines cases voisines peuvent donner la même priorité (ici, P4 en trois cases).
4. **Associer à chaque priorité des délais** de prise en charge et de résolution : ils viennent du **besoin métier**, de la **capacité de l'équipe** et des **engagements des fournisseurs** (S17). Une priorité sans délai ne sert à rien.
5. **Tester la matrice** sur des tickets passés : donne-t-elle le résultat que les métiers attendaient ? Sinon, on ajuste les critères, pas seulement les cases.
6. **Valider, publier, réviser.** Les métiers valident ; la matrice est **expliquée** aux utilisateurs et aux techniciens, puis **révisée** régulièrement (trop de P1 : la matrice est trop généreuse).

Les outils de gestion de tickets (dont GLPI) calculent la priorité à partir de l'impact et de l'urgence selon une correspondance **paramétrable** : à repérer dans la configuration de ta version, ce n'est pas une règle universelle.

> [!TIP]
> **Dans InfraLab** (TP, partie C) : le TP 14 te fait qualifier deux tickets d'apparence semblable ; le TP 21 distingue incident et demande ; le TP 47 te fait escalader au bon moment.

| Priorité | Exemple | Prise en charge (exemple) | Résolution (exemple) |
|---|---|---|---|
| **P1** critique | Serveur d'authentification en panne, tout le monde bloqué | < 15 min | < 4 h |
| **P2** haute | Imprimante partagée d'un service en panne | < 1 h | < 8 h |
| **P3** moyenne | Un utilisateur, contournement disponible | < 4 h | < 24 h |
| **P4** basse | Demande mineure | < 1 jour ouvré | < 5 jours |

À priorité égale, on traite dans l'ordre d'arrivée (**FIFO**, premier entré, premier sorti). Au-dessus de P1, un **incident majeur** (impact extrême sur tous) déclenche une procédure spéciale : cellule de crise, information de la direction, communication régulière.

> [!NOTE]
> Les délais ci-dessus sont des **exemples** du support d'origine. Dans GLPI, l'échelle est différente (voir §7) : le TP demande de faire la correspondance.

## 5. Le SLA et les indicateurs

Un **SLA** (*service level agreement*) est un **accord formel** entre le fournisseur du service (la DSI) et son client : disponibilité attendue, délais de prise en charge et de résolution, plages horaires, exclusions, pénalités éventuelles. Approfondi en S17.

| Indicateur | Sens | Mesure |
|---|---|---|
| **MTTR** | Temps moyen de résolution (le « R » varie : *repair*, *resolve*, *recovery*) | Efficacité de la résolution |
| **MTTA** | Temps moyen avant la première prise en charge | Réactivité |
| **MTBF** | Temps moyen entre deux pannes | Fiabilité |
| **FCR** | Résolu dès le premier contact | Efficacité du N1 |
| **Backlog** | Tickets ouverts non résolus | Charge en attente |
| **% SLA** | Part des tickets traités dans les délais | Respect des engagements |

**MTTR = somme des temps de résolution ÷ nombre d'incidents.** Exemple : 30, 45 et 15 minutes donnent 90 ÷ 3 = 30 minutes.

## 6. Le centre de services et les niveaux

Le **centre de services** (*service desk*) est le **point de contact unique** entre les utilisateurs et la DSI. Il : **reçoit** les sollicitations (téléphone, mail, portail), les **qualifie** (catégorie, priorité), **résout** ce qui est simple, **escalade** le reste, **suit** jusqu'à la clôture, et produit des **rapports**.

| | **N1** | **N2** | **N3** |
|---|---|---|---|
| Profil | Technicien polyvalent débutant | Technicien spécialisé | Expert, éditeur, constructeur |
| Traite | Incidents simples, avec procédure | Incidents complexes, sans procédure | Incidents inconnus, non reproductibles |
| Accès | Restreint (comptes, postes) | Étendu (serveurs, infrastructure) | Total |
| Délai | Immédiat | Quelques heures | Plusieurs jours possibles |

**Escalader du N1 vers le N2 quand :** hors compétence ou hors accès ; délai cible menacé ; incident **récurrent** (3e fois) ; impact **élargi** (plusieurs utilisateurs) ; **aucune procédure** connue ; système de production menacé.

> [!NOTE]
> **Escalader n'est pas un échec.** Un N1 qui escalade au bon moment protège le délai cible et l'utilisateur. Celui qui s'acharne fait perdre du temps à tous.

## 7. Le ticket

Un ticket est le **dossier** d'une sollicitation : il garde la trace de tout, pour que n'importe quel technicien puisse reprendre.

| Champ | Attendu | Mauvais | Bon |
|---|---|---|---|
| **Titre** | Résumé, 10 mots maximum | « Problème ordi » | « Excel 365 ne s'ouvre plus – PC-RH-042 – A. Martin » |
| **Utilisateur** | Nom, service, contact | – | « A. Martin – RH – poste 214 » |
| **Description** | Quoi, quand, reproduction, **message d'erreur exact** | « Ça marche pas » | « Depuis 8 h, Excel affiche “Application non disponible” à chaque ouverture ; les autres applications Office fonctionnent » |
| **Impact** | Qui est bloqué, quel processus | – | « Bloquée pour le bilan mensuel à remettre à 10 h » |
| **Actions tentées** | Ce qui a déjà été fait | – | « Redémarrage : problème persistant » |
| **Priorité** | Selon la matrice | – | P2, avec justification |
| **Pièces jointes** | Capture du message d'erreur | – | `capture_erreur_09h15.png` |

**Tickets dans GLPI.** Les noms ci-dessous sont ceux de versions courantes (à **confirmer** sur la tienne).

| Champ GLPI | Rôle |
|---|---|
| Type | Incident ou demande |
| Catégorie | Classement et routage (matériel, logiciel, réseau, accès et comptes…) |
| Demandeur · Technicien · Groupe | Qui demande ; qui traite ; quelle équipe |
| Urgence · Impact · Priorité | La priorité est **calculée** à partir des deux premiers |
| Statut | Nouveau → En cours (attribué) → En cours (planifié) → En attente → Résolu → Clos |
| Suivi | Message ajouté au ticket, **public** (visible de l'utilisateur) ou **privé** (équipe seulement) |
| Solution | Texte final qui fait passer le ticket en « Résolu » |
| Élément associé | L'équipement de la CMDB concerné (lien avec S12 à S14) |
| Délai cible (SLA) | Calcule l'échéance et alerte en cas de dépassement |

**Résolu ou Clos ?** *Résolu* : le technicien a appliqué une solution. *Clos* : la solution est confirmée par l'utilisateur, ou la clôture est **automatique** après un nombre de jours configurable.

**Un suivi privé** sert aux notes techniques et au motif d'escalade ; **un suivi public** informe l'utilisateur. Ne mets jamais dans un suivi public ce qui ne regarde pas l'utilisateur.

## Je retiens

- ITIL = vocabulaire et bonnes pratiques ; un service = un **résultat** pour l'utilisateur.
- **Incident** (rétablir), **problème** (supprimer la cause), **demande** (standard), **changement** (planifié).
- **Priorité = impact + urgence**, par une matrice, pas selon l'humeur de l'utilisateur.
- Un ticket se remplit **en temps réel**, avec titre court, description précise, impact, actions tentées.
- On escalade selon des **critères**, et on le **justifie**.
- **MTTR** = somme des temps de résolution ÷ nombre d'incidents.
