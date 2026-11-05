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

### SPF, DKIM, DMARC : comment la messagerie prouve d'où vient un courriel

Dans le protocole SMTP, **rien n'empêche** d'écrire n'importe quelle adresse dans le champ « De ». C'est ce qui rend l'usurpation d'expéditeur facile. Trois enregistrements publiés dans le **DNS** du domaine permettent au serveur qui **reçoit** un courriel de vérifier s'il vient bien de l'organisation. Ce sont trois **enregistrements TXT** : du texte que n'importe qui peut lire en interrogeant le DNS.

| | **SPF** | **DKIM** | **DMARC** |
|---|---|---|---|
| **Question posée** | « Ce serveur a-t-il le droit d'envoyer pour ce domaine ? » | « Le message est-il bien signé par le domaine, et n'a-t-il pas été modifié ? » | « Que faire si SPF ou DKIM échouent, et qui prévenir ? » |
| **Analogie** | La **liste des facteurs autorisés** affichée à la mairie | Le **cachet de cire** sur la lettre | La **consigne** donnée au guichet : « sans cachet ni facteur connu, refusez la lettre et prévenez-nous » |
| **Où c'est publié** | `jackcelair.example` | `selecteur1._domainkey.jackcelair.example` | `_dmarc.jackcelair.example` |
| **Qui agit** | Le serveur destinataire compare l'adresse IP de l'expéditeur à la liste | Le serveur expéditeur **signe** avec une clé privée ; le destinataire vérifie avec la **clé publique** du DNS | Le destinataire applique la consigne et envoie des **rapports** |

**Exemple d'enregistrements (domaine fictif).**

```text
jackcelair.example.                 TXT  "v=spf1 ip4:203.0.113.10 include:_spf.messagerie.example -all"
selecteur1._domainkey.jackcelair.example.  TXT  "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A..."
_dmarc.jackcelair.example.          TXT  "v=DMARC1; p=quarantine; rua=mailto:dmarc@jackcelair.example"
```

**Comment les lire.**

- **SPF** : `v=spf1` annonce la version. `ip4:203.0.113.10` autorise cette adresse (le serveur de messagerie de l'entreprise). `include:_spf.messagerie.example` autorise aussi les serveurs listés par le fournisseur de messagerie. La fin dit quoi faire des autres : `-all` = **refuser**, `~all` = **suspect, à traiter avec méfiance** (cas fréquent au début d'un déploiement).
- **DKIM** : `p=` contient la **clé publique** (longue chaîne de caractères). Le **sélecteur** (`selecteur1`) permet de publier plusieurs clés et d'en changer. La clé privée, elle, reste sur le serveur d'envoi et n'est jamais publiée.
- **DMARC** : `p=` est la **politique** : `none` (on observe, on ne bloque rien), `quarantine` (messages en échec placés en spam), `reject` (messages en échec refusés). `rua=` est l'adresse qui reçoit les **rapports** quotidiens (fichiers XML) listant qui a envoyé du courrier au nom du domaine.

**Comment DMARC décide.** DMARC ne regarde pas seulement si SPF ou DKIM réussissent : il vérifie que le domaine ainsi authentifié **correspond** au domaine affiché dans le champ « De » (on parle d'**alignement**). Un message est accepté si **au moins un** des deux (SPF ou DKIM) réussit **et** est aligné. Un escroc qui signe avec son propre domaine réussit son DKIM, mais pas l'alignement avec `jackcelair.example`.

**Mise en place, dans l'ordre** (démarche progressive, couramment recommandée pour ne pas bloquer du courrier légitime) :

1. **Faire l'inventaire** de tout ce qui envoie du courrier au nom du domaine : messagerie, outil de facturation, lettre d'information, logiciel de tickets, imprimantes ou applications qui envoient des alertes.
2. **Publier SPF** en listant ces expéditeurs (chaque fournisseur indique sa valeur `include:` dans sa documentation).
3. **Activer DKIM** chez le fournisseur de messagerie, qui génère la paire de clés ; on publie la clé **publique** dans le DNS.
4. **Publier DMARC en `p=none`** avec `rua=`, et **lire les rapports** pendant quelques semaines pour repérer les expéditeurs oubliés.
5. **Passer à `quarantine`**, puis à `reject`, quand les rapports ne montrent plus que du courrier légitime.

Chaque fournisseur de messagerie documente ses propres valeurs (`include:`, sélecteur DKIM) ; la **logique** ci-dessus est la même partout.

**Vérifier un domaine.** On interroge le DNS :

```text
nslookup -type=TXT jackcelair.example
nslookup -type=TXT _dmarc.jackcelair.example
dig TXT _dmarc.jackcelair.example
```

La réponse contient le texte entre guillemets, à lire comme ci-dessus. Pas de réponse sur `_dmarc.` : **aucune consigne** n'est donnée aux destinataires.

> [!NOTE]
> Ces protections concernent **ton** domaine. Elles n'arrêtent pas un **domaine ressemblant** (`jackcelair-facturation.example`), pour lequel l'escroc peut publier ses propres SPF, DKIM et DMARC en règle. Un destinataire doit donc aussi **lire l'adresse complète**.

### Réagir à une usurpation : qui fait quoi

Tout le monde ne fait pas la même chose. Voici une répartition **de principe**.

| Qui | Rôle |
|---|---|
| **Le technicien (toi)** | **Ne répond pas** à l'expéditeur, ne clique pas. **Conserve les preuves** : le message d'origine avec ses **en-têtes**, des captures d'écran **datées** du faux site ou du faux profil, l'adresse (URL) exacte. **Prévient** la direction et le référent sécurité. Prend les **mesures techniques** : bloquer le faux domaine sur la passerelle de messagerie, changer les mots de passe si quelqu'un a saisi ses identifiants. |
| **La direction** | **Décide** des suites : dépôt de plainte (c'est l'organisation victime qui porte plainte, au nom de son représentant), communication aux clients. |
| **Le DPO** (si des données personnelles sont touchées) | Évalue s'il y a **violation de données** et ce qu'il faut notifier. |

**Où signaler** (dispositifs publics français ; pour chacun, on ne répond pas et on n'ouvre pas les liens) :

| Ce qu'on a reçu ou constaté | Où signaler |
|---|---|
| Courriel de spam ou d'hameçonnage | **Signal Spam** (signal-spam.fr) : inscription gratuite, extension pour la messagerie, signalement en un clic |
| SMS ou MMS frauduleux | Transférer le message au **33700** |
| Site frauduleux ou contenu illicite | **Pharos** (internet-signalement.gouv.fr), plateforme de signalement du ministère de l'Intérieur |
| Victime d'une cyberattaque (organisation ou particulier) | **17Cyber** (site du ministère de l'Intérieur) : diagnostic en quelques questions, puis, si l'atteinte est grave, **tchat avec un policier ou un gendarme** ; assistance technique possible via un prestataire référencé par **Cybermalveillance.gouv.fr** |
| Faux domaine en `.fr` utilisant l'identité de l'organisation | **Afnic** (registre du `.fr`) : l'organisation peut demander la liste des noms enregistrés avec ses données, puis, **accompagnée d'une plainte pour usurpation d'identité**, la suppression de ses informations usurpées dans la base Whois |
| Faux profil ou compte piraté | Le **formulaire de signalement de la plateforme** (réseau social) |

> [!WARNING]
> Ce tableau t'indique **où** l'information va ; la **décision** de déposer plainte revient à la direction, jamais au technicien seul. Pour une violation de données personnelles, c'est le **DPO** qui conduit l'analyse. Les dispositifs et les délais évoluent : on vérifie sur les sites officiels au moment des faits.

### Gouvernance : tenir un registre des identifiants

La meilleure mesure technique échoue si **personne n'en est responsable**. On tient donc un **registre des identifiants de l'organisation** : les noms de domaine et leurs échéances, les certificats, les comptes officiels et l'administrateur de chacun. On y applique une règle simple : peu de personnes **nommées**, des **comptes individuels**, une authentification forte et une validation avant toute publication.

**Je vérifie.** Un client reçoit une « facture » de `compta@jackcelair-facturation.example` alors que le domaine de l'entreprise est `jackcelair.example`. Quelle est la nature du problème, et quelle est la première action du technicien ?

<details markdown="1">
<summary>Voir la réponse</summary>

C'est une **usurpation d'identité** par un **domaine ressemblant**, pas une panne. Le technicien **ne répond pas**, **conserve les preuves** (message d'origine avec en-têtes, captures datées), **prévient** la direction, puis signale le courriel (Signal Spam) et le faux domaine ; la direction décide de la plainte et du message aux clients, envoyé par un canal officiel.

</details>

**Je vérifie.** Voici un enregistrement : `_dmarc.jackcelair.example TXT "v=DMARC1; p=none; rua=mailto:dmarc@jackcelair.example"`. Que fait-il, et que faut-il faire ensuite ?

<details markdown="1">
<summary>Voir la réponse</summary>

Il **n'impose rien** (`p=none`) : les courriels en échec sont acceptés, mais l'adresse du `rua` **reçoit des rapports**. C'est l'étape d'observation. Ensuite on lit les rapports, on corrige SPF et DKIM pour les expéditeurs légitimes oubliés, puis on passe à `quarantine`, puis à `reject`.

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
- **Identité numérique** : domaine, messagerie (SPF = qui peut envoyer, DKIM = signature, DMARC = consigne et rapports), comptes officiels, certificats et échéances ; on **conserve les preuves**, on **prévient** la direction, on **signale** (Signal Spam, Pharos, 17Cyber, Afnic) ; la direction décide de la plainte.
- **Présence en ligne** : domaine et DNS, hébergement, HTTPS, mentions légales, cookies et RGPD, référencement, gouvernance de la publication.
