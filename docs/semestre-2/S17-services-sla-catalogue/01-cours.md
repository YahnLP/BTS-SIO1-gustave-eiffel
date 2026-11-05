# Cours – Services, SLA et catalogue

*BTS SIO SISR 1re année – S17 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

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
- [ ] relier un service aux **éléments de configuration** dont il dépend ;
- [ ] repérer une **usurpation d'identité numérique** et en limiter le risque (domaine, messagerie, comptes officiels, gouvernance).

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **99,9 %, c'est presque 100 %.** » Sur 30 jours, c'est tout de même **43,2 minutes** d'arrêt toléré ; chaque chiffre de plus coûte cher (§ 4).
> - « **Un SLA ne concerne que les pannes.** » Il couvre aussi les **demandes** (délai de traitement) et la **plage de service** (§ 3).
> - « **On peut promettre 24 h / 24 sans solution de secours.** » Une promesse se **soutient** : équipe, astreinte, fournisseur, redondance (§ 2 et 3).

---

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

**Je vérifie.** Le niveau 2 système s'engage à répondre au niveau 1 sous 1 heure. De quel type d'accord s'agit-il, et pourquoi est-il lié au SLA ?

<details markdown="1">
<summary>Voir la réponse</summary>

C'est une **OLA** (accord entre deux équipes internes). Si le N2 met 3 heures à répondre, le N1 ne peut pas tenir un SLA de résolution de 4 heures vis-à-vis du client : l'OLA **soutient** le SLA.

</details>


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


**Je vérifie.** Calcule l'indisponibilité tolérée d'un SLA à 99,95 % sur un mois de 30 jours.

<details markdown="1">
<summary>Voir la réponse</summary>

(1 − 0,9995) × 43 200 = 0,0005 × 43 200 = **21,6 minutes**, soit environ 21 min 36 s.

</details>

Un chiffre de plus après la virgule coûte souvent très cher : redondance, supervision, astreinte. C'est un choix économique autant que technique.

**Échéance en heures ouvrées.** On ne compte que les heures de la plage de service. Exemple : plage lundi–vendredi, 8 h–18 h (10 h par jour). Un incident P3 (24 h de résolution) ouvert vendredi à 17 h consomme 1 h le vendredi, 10 h le lundi, 10 h le mardi, puis 3 h le mercredi : échéance **mercredi 11 h**. Avec un calendrier **continu** (24 h / 24), l'échéance serait **samedi 17 h**.

**Je vérifie.** Même plage (lundi au vendredi, 8 h à 18 h). Un ticket P3 (24 h de résolution) est ouvert le jeudi à 16 h. Quelle est l'échéance en heures ouvrées ?

<details markdown="1">
<summary>Voir la réponse</summary>

Jeudi : 2 h (16 h à 18 h). Vendredi : 10 h (total 12 h). Lundi : 10 h (total 22 h). Mardi : il reste 2 h, donc de 8 h à 10 h. Échéance : **mardi 10 h**. Le week-end ne compte pas.

</details>


## 5. Piloter un SLA

- Le SLA **court depuis la création** du ticket, pas depuis que tu le lis. Tant que le ticket n'est pas **qualifié**, la cible n'est pas connue : qualifier vite protège le délai.
- La **prise en charge** arrête l'horloge de réactivité ; la **résolution** arrête celle de résolution.
- Un ticket **en attente** d'une réponse de l'utilisateur **suspend** l'horloge : l'équipe n'est pas pénalisée pour un délai dont elle n'est pas responsable. Il ne faut pas en abuser.
- Un ticket peut être « en cours », « **à risque** » puis « **dépassé** » : un SLA se **pilote**, il ne se constate pas à la fin.
- Le **calendrier** change le verdict : le même ticket peut être « dépassé » en continu et « dans les temps » en heures ouvrées. Le calendrier doit correspondre à ce qui est **promis** : un service annoncé 24 h / 24 se mesure en continu.


**Je vérifie.** Pourquoi suspend-on l'horloge quand le ticket attend une réponse de l'utilisateur ? Quel risque y a-t-il à en abuser ?

<details markdown="1">
<summary>Voir la réponse</summary>

L'équipe n'est pas responsable de ce délai : la pénaliser serait injuste. Mais si on suspend à tort pour « améliorer » les chiffres, le SLA devient **trompeur** et l'utilisateur attend sans suivi.

</details>

> [!WARNING]
> Un SLA **mesuré avec un mauvais calendrier** donne de faux dépassements (ou de fausses réussites) : les rapports deviennent trompeurs.

> **Dans InfraLab** (TP, parties A à C) : le TP 22 te fait piloter des délais, le TP 41 te montre l'effet du calendrier (le week-end compte-t-il ?), le TP 20 te fait conduire un incident majeur.

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

## Application : la présence en ligne d'un service

*Cette section applique la séance à un service rendu **vers l'extérieur** : le site d'une organisation est un service comme un autre, avec une disponibilité promise (§ 4), un certificat qui expire (un incident prévisible), des éléments dont il dépend (§ 7) et un responsable.*

La **présence en ligne** d'une organisation, c'est tout ce qu'on trouve d'elle sur Internet : son **site**, ses **profils** sur les réseaux, ses fiches sur les cartes et annuaires, les **avis**. Elle fait partie de son **identité numérique** et de son image (**e-réputation**).

| Élément | Points d'attention |
|---|---|
| **Nom de domaine** | Réservé auprès d'un bureau d'enregistrement ; pointe vers le serveur par le **DNS** (enregistrements d'adresse, de messagerie) ; à renouveler |
| **Nom de domaine (vérification)** | `nslookup` ou `dig` interrogent le DNS : adresse du serveur (enregistrement A ou AAAA), serveur de messagerie (enregistrement MX) |
| **Hébergement** | Disponibilité (S17), sauvegarde (S20), supervision (S16) |
| **HTTPS** | Un certificat chiffre les échanges et rassure ; il **expire** et doit être renouvelé |
| **Mentions légales** | Identité de l'éditeur, de l'hébergeur et du responsable de la publication (site professionnel) |
| **Données personnelles et cookies** | Informer, recueillir le consentement quand il est nécessaire (RGPD, S12) |
| **Accessibilité** | Un site utilisable par tous ; obligation pour certaines organisations publiques |
| **Référencement** | Titre et description clairs, plan du site, contenu utile : l'organisation se fait trouver |
| **Gouvernance** | Qui publie, qui valide, qui administre ; comptes individuels, double authentification |
| **Veille d'e-réputation** | Surveiller ce qu'on dit de l'organisation, répondre aux avis |

> **Dans [ProtoLab](https://yahnlp.github.io/ProtoLab/)** : les protocoles **DNS** (le nom de domaine pointe vers le serveur), **HTTPS** et **TLS/SSL** (certificat, négociation, échange chiffré) montrent ce que vérifie un navigateur avant d'afficher un site en toute confiance.

> [!WARNING]
> Ces points sont un **rappel de principes**, pas un avis juridique. Les obligations exactes dépendent de l'organisation et se vérifient auprès de son référent juridique ou du DPO.


## Identité numérique de l'organisation : la préserver <span class="technique">compétence B3.2</span>

L'**identité numérique** d'une organisation, c'est l'ensemble des **marques de reconnaissance** par lesquelles on la reconnaît et on lui fait confiance en ligne : son **nom de domaine**, ses **adresses de messagerie**, son **site** et son **certificat**, ses **comptes officiels** sur les réseaux, son logo et sa charte. Préserver cette identité, c'est empêcher qu'**un tiers parle ou agisse en son nom**, et savoir réagir s'il le fait.

**Pourquoi c'est un enjeu.** Un faux site ou un faux courriel qui reprend le nom et le logo d'une organisation sert à **tromper ses clients, ses salariés ou ses partenaires** (fausse facture, faux ordre de virement, vol d'identifiants). Les victimes ne s'en prennent pas à l'escroc, qu'elles ne connaissent pas, mais à **l'organisation dont le nom a été utilisé**.

| Menace | Exemple (cas fictif) | Mesure préventive | Réaction |
|---|---|---|---|
| **Domaine ressemblant** | `jackcelair-facturation.example` au lieu de `jackcelair.example` | Veille sur les noms proches ; réserver les variantes utiles | Signaler au bureau d'enregistrement et à l'hébergeur ; prévenir les clients |
| **Domaine ou certificat qui expire** | Le domaine n'est pas renouvelé ; un tiers le rachète | Renouvellement **automatique**, **échéances** consignées, responsable nommé | Renouveler ; si perdu, évaluer l'impact (courriels, site) |
| **Usurpation d'expéditeur** | Un courriel « de la direction » envoyé depuis un serveur étranger | Enregistrements **SPF**, **DKIM** et **DMARC** du domaine (voir ci-dessous) | Signaler, prévenir les destinataires |
| **Faux profil ou compte piraté** | Faux compte « JackCelair Recrutement » | Comptes officiels **recensés**, **double authentification**, comptes nominatifs | Signaler à la plateforme, communiquer sur le compte officiel |
| **Fuite de données** | Liste de clients publiée | Droits d'accès, chiffrement, journaux | Informer la direction et le DPO : une violation de données personnelles peut devoir être **notifiée** à l'autorité de contrôle |

**SPF, DKIM, DMARC (messagerie).** Ce sont trois enregistrements publiés dans le **DNS** du domaine pour limiter l'usurpation d'expéditeur : **SPF** liste les serveurs autorisés à envoyer du courrier pour ce domaine ; **DKIM** ajoute aux messages une **signature** vérifiable ; **DMARC** dit au destinataire **quoi faire** (accepter, mettre en quarantaine, rejeter) si ces vérifications échouent, et où envoyer des rapports. Leur mise en place exacte dépend du fournisseur de messagerie : elle se lit dans sa documentation.

**La gouvernance.** La meilleure mesure technique échoue si **personne n'est responsable**. On tient un **registre des identifiants de l'organisation** (domaines et échéances, certificats, comptes officiels, administrateurs de chaque compte) et une règle simple : peu de personnes **nommées**, **comptes individuels**, authentification forte, validation avant publication.

> [!WARNING]
> Ces points sont un **rappel de principes**. En cas d'incident réel (usurpation, fuite), c'est la **direction** et le **référent juridique ou DPO** qui décident des signalements et des plaintes ; le technicien **documente** et **conserve les preuves** (captures datées, en-têtes de messages).

**Je vérifie.** Un client reçoit une « facture » de `compta@jackcelair-facturation.example` alors que le domaine de l'entreprise est `jackcelair.example`. Quelle est la nature du problème, et quelle est la première action du technicien ?

<details markdown="1">
<summary>Voir la réponse</summary>

C'est une **usurpation d'identité** par un **domaine ressemblant**, pas une panne. Le technicien **documente** (capture et en-têtes du message), **prévient** la direction et le référent, **signale** au bureau d'enregistrement ou à l'hébergeur du faux domaine et prévient les clients par un canal officiel. Il ne répond pas à l'expéditeur.

</details>

**Je vérifie.** À quoi servent SPF et DMARC, et pourquoi ne suffisent-ils pas à eux seuls ?

<details markdown="1">
<summary>Voir la réponse</summary>

SPF dit quels serveurs peuvent envoyer pour le domaine, DMARC dit quoi faire si la vérification échoue. Ils protègent **ton** domaine contre l'usurpation, mais pas contre un **domaine ressemblant** (autre nom) ni contre un compte piraté : il faut aussi veille, gouvernance et double authentification.

</details>

## Je retiens

- Un catalogue décrit **ce qu'on propose**, avec ses engagements.
- **SLA** (client), **OLA** (équipes internes), **contrat de sous-traitance** (fournisseur).
- Indisponibilité tolérée = (1 − disponibilité) × période.
- Le calendrier du SLA doit correspondre à ce qui est promis.
- L'horloge court dès la création, se **suspend** à bon escient.
- Incident majeur : cause d'abord, coordinateur, communication, revue.
- **Identité numérique** : domaine, messagerie (SPF, DKIM, DMARC), comptes officiels, certificats et échéances ; on **prévient**, on **documente**, on **signale** par la bonne personne.
- **Présence en ligne** : domaine et DNS, hébergement, HTTPS, mentions légales, cookies et RGPD, référencement, gouvernance de la publication.
