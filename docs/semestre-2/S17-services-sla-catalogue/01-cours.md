# Cours – Services, SLA et catalogue

*BTS SIO SISR 1re année – S17 – à lire avant le [TP](02-tp.md)*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** tickets, priorités et SLA (S15) ; diagnostic (S16) ; CMDB (S12).
> - **Mots déjà vus :** service, SLA, ticket, priorité, supervision, MTTR.
> - **Expliqués dans ce cours :** catalogue de services, SLA, OLA, disponibilité, incident majeur, du service aux éléments de configuration, présence en ligne. **Session chargée, soyez concentrés.**

## À la fin de ce cours, tu sauras

- [ ] définir un **service** et un **catalogue de services** ;
- [ ] distinguer **SLA**, **OLA** et **contrat de sous-traitance** ;
- [ ] **calculer** une indisponibilité tolérée et une échéance ;
- [ ] expliquer le rôle du **calendrier** et de la **suspension** de l'horloge ;
- [ ] décrire la conduite d'un **incident majeur** ;
- [ ] relier un service aux **éléments de configuration** dont il dépend.

## 1. Un service, un catalogue

Un **service** est ce que l'utilisateur obtient sans avoir à gérer la complexité derrière (S15). Le **catalogue de services** est la liste, **lisible par l'utilisateur**, de ce que la DSI propose : à quoi ça sert, comment le demander, en combien de temps, avec quel engagement.

On y trouve deux sortes d'entrées :

| Entrée | Exemple | Ce que l'utilisateur fait |
|---|---|---|
| **Service rendu en continu** | Messagerie, impression, accès à distance | L'utilise ; ouvre un **incident** s'il ne marche plus |
| **Demande standard** | Création d'un compte, installation d'un logiciel autorisé | Fait une **demande** par un formulaire, avec un circuit de validation |

Une **fiche de service** contient au minimum : nom, description simple, bénéficiaires, mode de demande, prérequis et validation, engagements (plage, délais), éléments dont dépend le service, équipe responsable. Un modèle est fourni pour le TP.

> [!NOTE]
> Le catalogue a deux visages : un visage **pour l'utilisateur** (ce qu'il peut demander) et un visage **pour la DSI** (quels éléments, quelles équipes, quels fournisseurs). Les deux doivent rester cohérents.

## 2. Les accords : SLA, OLA, contrat de sous-traitance

| Accord | Entre qui ? | Exemple |
|---|---|---|
| **SLA** (*service level agreement*) | La DSI et ses **clients** (services, entreprise) | « Incident P1 : prise en charge en 15 minutes, résolution en 4 heures » |
| **OLA** (*operational level agreement*) | Deux équipes **internes** de la DSI | « Le niveau 2 système répond au niveau 1 sous 1 heure » |
| **Contrat de sous-traitance** | La DSI et un **fournisseur externe** | « Le fournisseur intervient sur le matériel sous 4 heures ouvrées » |

Le SLA ne tient que si les accords qui le soutiennent tiennent : une promesse de 4 heures au client est impossible si le fournisseur du matériel ne promet que 2 jours.

## 3. Ce que contient un SLA

| Élément | Exemple |
|---|---|
| Plage de service | Lundi au vendredi, 8 h à 18 h |
| Disponibilité visée | 99,5 % par mois, hors maintenance planifiée |
| Délai de prise en charge | P1 : 15 minutes |
| Délai de résolution | P1 : 4 heures |
| Exclusions | Erreur de l'utilisateur, panne hors périmètre |
| Pénalités éventuelles | Selon le contrat |

**Valeurs d'exemple (cours S15, InfraLab).** P1 : 15 min / 4 h ; P2 : 1 h / 8 h ; P3 : 4 h / 24 h ; P4 : 1 jour ouvré / 5 jours. Chaque organisation fixe les siennes.

**Comment fixer les délais d'une organisation.** On ne les copie pas : on les **déduit**. (1) **Le besoin métier** : combien de temps l'activité supporte-t-elle l'arrêt ? (C'est ce que mesurent le **RTO**, durée maximale d'interruption admise, et le **RPO**, quantité de données qu'on accepte de perdre : ils sont détaillés en [S20](../S20-sauvegardes/README.md).) (2) **La capacité de l'équipe** : un délai de 15 minutes suppose quelqu'un disponible et formé ; une équipe de deux personnes ne peut pas promettre une astreinte permanente. (3) **Les engagements des fournisseurs** : on ne promet pas plus que ce qui soutient le service (contrat de sous-traitance, OLA). (4) **Le coût** : un délai plus court demande plus de ressources. (5) **La mesure** : on publie des délais **tenables**, on les mesure (S16, supervision) et on les révise. Un SLA que l'équipe ne peut pas tenir est pire qu'un SLA modeste.

## 4. Calculer avec un engagement

**Disponibilité.** Indisponibilité tolérée = (1 − disponibilité) × durée de la période.

Exemple, mois de 30 jours : 30 × 24 × 60 = 43 200 minutes.

| Disponibilité | Indisponibilité tolérée par mois |
|---|---|
| 99 % | 432 min, soit 7 h 12 |
| 99,5 % | 216 min, soit 3 h 36 |
| 99,9 % | 43,2 min |

Un chiffre de plus après la virgule coûte souvent très cher : redondance, supervision, astreinte. C'est un choix économique autant que technique.

**Échéance en heures ouvrées.** On ne compte que les heures de la plage de service. Exemple : plage lundi–vendredi, 8 h–18 h (10 h par jour). Un incident P3 (24 h de résolution) ouvert vendredi à 17 h consomme 1 h le vendredi, 10 h le lundi, 10 h le mardi, puis 3 h le mercredi : échéance **mercredi 11 h**. Avec un calendrier **continu** (24 h / 24), l'échéance serait **samedi 17 h**.

## 5. Piloter un SLA

- Le SLA **court depuis la création** du ticket, pas depuis que tu le lis. Tant que le ticket n'est pas **qualifié**, la cible n'est pas connue : qualifier vite protège le délai.
- La **prise en charge** arrête l'horloge de réactivité ; la **résolution** arrête celle de résolution.
- Un ticket **en attente** d'une réponse de l'utilisateur **suspend** l'horloge : l'équipe n'est pas pénalisée pour un délai dont elle n'est pas responsable. Il ne faut pas en abuser.
- Un ticket peut être « en cours », « **à risque** » puis « **dépassé** » : un SLA se **pilote**, il ne se constate pas à la fin.
- Le **calendrier** change le verdict : le même ticket peut être « dépassé » en continu et « dans les temps » en heures ouvrées. Le calendrier doit correspondre à ce qui est **promis** : un service annoncé 24 h / 24 se mesure en continu.

> [!WARNING]
> Un SLA **mesuré avec un mauvais calendrier** donne de faux dépassements (ou de fausses réussites) : les rapports deviennent trompeurs.

## 6. L'incident majeur

Un **incident majeur** a un impact extrême sur l'ensemble des utilisateurs. Il appelle une procédure particulière :

1. **Prioriser** : traiter la **cause** qui bloque le plus de monde (et non le ticket le plus bruyant) ;
2. **Désigner un coordinateur** ;
3. **Rétablir** le service ;
4. **Communiquer** régulièrement, sur un **ticket principal** auquel les tickets liés se rattachent ;
5. **Revoir** après coup (revue post-incident) pour éviter la récidive.

Plusieurs tickets qui arrivent en même temps ont souvent **une seule cause** (S16) : un commutateur éteint, un serveur arrêté.

## 7. Du service aux éléments de configuration

Un service dépend d'éléments (serveurs, commutateurs, hôtes de virtualisation, fournisseurs). La **CMDB** garde ces **relations**. Quand un élément tombe, la CMDB permet de dire **quels services sont touchés** (analyse d'impact) ; l'inverse permet de savoir **quoi vérifier** quand un service ne répond plus.

## Présence en ligne

La **présence en ligne** d'une organisation, c'est tout ce qu'on trouve d'elle sur Internet : son **site**, ses **profils** sur les réseaux, ses fiches sur les cartes et annuaires, les **avis**. Elle fait partie de son **identité numérique** et de son image (**e-réputation**).

| Élément | Points d'attention |
|---|---|
| **Nom de domaine** | Réservé auprès d'un bureau d'enregistrement ; pointe vers le serveur par le **DNS** (enregistrements d'adresse, de messagerie) ; à renouveler |
| **Hébergement** | Disponibilité (S17), sauvegarde (S20), supervision (S16) |
| **HTTPS** | Un certificat chiffre les échanges et rassure ; il **expire** et doit être renouvelé |
| **Mentions légales** | Identité de l'éditeur, de l'hébergeur et du responsable de la publication (site professionnel) |
| **Données personnelles et cookies** | Informer, recueillir le consentement quand il est nécessaire (RGPD, S12) |
| **Accessibilité** | Un site utilisable par tous ; obligation pour certaines organisations publiques |
| **Référencement** | Titre et description clairs, plan du site, contenu utile : l'organisation se fait trouver |
| **Gouvernance** | Qui publie, qui valide, qui administre ; comptes individuels, double authentification |
| **Veille d'e-réputation** | Surveiller ce qu'on dit de l'organisation, répondre aux avis |

> [!WARNING]
> Ces points sont un **rappel de principes**, pas un avis juridique. Les obligations exactes dépendent de l'organisation et se vérifient auprès de son référent juridique ou du DPO.

## Je retiens

- Un catalogue décrit **ce qu'on propose**, avec ses engagements.
- **SLA** (client), **OLA** (équipes internes), **contrat de sous-traitance** (fournisseur).
- Indisponibilité tolérée = (1 − disponibilité) × période.
- Le calendrier du SLA doit correspondre à ce qui est promis.
- L'horloge court dès la création, se **suspend** à bon escient.
- Incident majeur : cause d'abord, coordinateur, communication, revue.
- **Présence en ligne** : domaine et DNS, hébergement, HTTPS, mentions légales, cookies et RGPD, référencement, gouvernance de la publication.
