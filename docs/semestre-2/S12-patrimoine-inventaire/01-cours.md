# Cours – Patrimoine informatique et inventaire

*BTS SIO SISR 1re année – S12 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** fiche d'identité d'un poste (S02) ; terminal Linux (S08 à S10).
> - **Mots déjà vus :** inventaire d'un poste, composants.
> - **Expliqués dans ce cours :** patrimoine, inventaire, fiche d'inventaire, agent, méthodes manuelle et automatisée, qualité des données, données personnelles et RGPD.

## À la fin de ce cours, tu sauras

- [ ] définir le **patrimoine informatique** et un **élément de configuration** (CI) ;
- [ ] dire **pourquoi** on inventorie et **quoi** inventorier ;
- [ ] décrire le **cycle de vie** d'un équipement ;
- [ ] comparer inventaire **manuel** et **automatisé** (avec un calcul) ;
- [ ] repérer les **défauts de qualité** d'un inventaire ;
- [ ] expliquer les **enjeux de données personnelles** d'un inventaire ;
- [ ] citer des **outils** d'inventaire et leurs principes (agent, sans agent).

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **Le nom de la machine peut servir d'identifiant.** » Non : il peut changer ; seul l'**identifiant d'inventaire** est stable (§ 3).
> - « **Un inventaire, c'est un tableur.** » Un tableur en est un **support** ; l'inventaire est un ensemble de **données fiables et suivies** (§ 5).
> - « **Un inventaire automatique est toujours exact.** » Il ne voit que ce qui a un **agent** ou répond sur le réseau (§ 4).

---

## 1. Le patrimoine informatique

Le **patrimoine informatique** (ou **parc**) est l'ensemble des **ressources numériques** que possède, loue ou utilise une organisation :

| Catégorie | Exemples |
|---|---|
| **Matériels** | Postes, portables, serveurs, écrans, imprimantes, switchs, routeurs, téléphones |
| **Logiciels** | Systèmes d'exploitation, applications, services hébergés |
| **Licences et contrats** | Licences logicielles, garanties, maintenance, abonnements |
| **Services** | Messagerie, partage de fichiers, accès à distance |
| **Personnes et lieux** | Utilisateurs, services, bureaux, sites |

Un **élément de configuration** (*Configuration Item*, **CI**) est tout élément qu'on **gère** individuellement et dont on veut connaître la description et les liens. Une base qui rassemble les CI et leurs relations s'appelle une **CMDB** (*Configuration Management Database*, base de données de gestion des configurations). Les outils comme GLPI (S14) jouent ce rôle.

<figure class="raid-fig">
<svg viewBox="0 0 720 176" role="img" aria-labelledby="cmt" xmlns="http://www.w3.org/2000/svg"><title id="cmt">Mini-schéma de CMDB : des éléments reliés entre eux</title>
<defs><marker id="cmm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="8" y="50" width="110" height="56" rx="8" class="rd-blk rd-k-c" /><text x="63.0" y="74.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Utilisateur</text><text x="63.0" y="90.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">Léa, service RH</text><path d="M119,78 H207" class="rd-arrow" marker-end="url(#cmm)"/><text x="163" y="68" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">utilise</text><rect x="208" y="50" width="110" height="56" rx="8" class="rd-blk rd-k-b" /><text x="263.0" y="74.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Poste</text><text x="263.0" y="90.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">PC-RH-01</text><path d="M319,78 H407" class="rd-arrow" marker-end="url(#cmm)"/><text x="363" y="68" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">se connecte à</text><rect x="408" y="50" width="110" height="56" rx="8" class="rd-blk rd-k-d" /><text x="463.0" y="74.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Service</text><text x="463.0" y="90.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">Messagerie</text><path d="M519,78 H607" class="rd-arrow" marker-end="url(#cmm)"/><text x="563" y="68" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">hébergé sur</text><rect x="608" y="50" width="110" height="56" rx="8" class="rd-blk rd-k-a" /><text x="663.0" y="74.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Serveur</text><text x="663.0" y="90.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">SRV-01</text><text x="360" y="150" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:600">Question à laquelle la CMDB répond : « si SRV-01 tombe, qui est touché ? »</text>
</svg>
<figcaption>Une CMDB conserve les éléments de configuration et leurs relations, pas seulement une liste.</figcaption>
</figure>


## 2. Pourquoi inventorier ?

| Besoin | Ce que l'inventaire permet |
|---|---|
| **Support** | Savoir quelle machine, quelle version, quel utilisateur, avant d'intervenir |
| **Sécurité** | Retrouver les machines à mettre à jour ou à isoler (par exemple une version de système qui n'est plus supportée) |
| **Coûts** | Planifier les renouvellements, éviter les achats inutiles |
| **Conformité** | Prouver qu'on a les **licences** des logiciels utilisés |
| **Pilotage** | Disposer de chiffres : nombre de postes par service, âge moyen du parc |

Sans inventaire fiable, une panne, une faille ou un contrôle de licences oblige à **chercher** avant d'agir.

## 3. Que décrit une fiche d'inventaire ?

| Famille d'attributs | Exemples |
|---|---|
| **Identification** | **Identifiant d'inventaire unique** (étiquette collée sur le matériel), numéro de série, nom de la machine |
| **Description** | Type, marque, modèle, système, caractéristiques techniques |
| **Affectation** | Utilisateur, service, **localisation** |
| **Achat et contrat** | Date d'achat, fournisseur, durée de garantie |
| **État** | En stock, en service, en panne, retiré |

**Exemple de fiche remplie** (cas fictif) :

| Famille | Attribut | Valeur |
|---|---|---|
| Identification | Identifiant d'inventaire | `INV-0101` |
| | Numéro de série | `SN48213` |
| | Nom de la machine | `PC-COMPTA-01` |
| Description | Type, marque, modèle | Poste fixe, Dell, OptiPlex 3000 |
| Affectation | Utilisateur · service · lieu | Inès Martin · Comptabilité · Bureau 12 |
| Achat et contrat | Achat · fournisseur · garantie | 2024-03-12 · Fournisseur Alpha · 3 ans |
| État | État | En service |

**Identifiant unique.** Chaque équipement reçoit **un** identifiant qui ne change jamais (par exemple `INV-0042`). Le **numéro de série** est donné par le constructeur ; le **nom** d'une machine peut changer ; l'**adresse IP** aussi : seul l'identifiant d'inventaire est stable.

**Cycle de vie d'un équipement :**

<figure class="raid-fig">
<svg viewBox="0 0 720 236" role="img" aria-labelledby="cvt" xmlns="http://www.w3.org/2000/svg"><title id="cvt">Cycle de vie d'un équipement et états successifs</title>
<defs><marker id="cvm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="24" y="14" width="180" height="66" rx="8" class="rd-blk rd-k-d" /><text x="114.0" y="43.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">1. Commande</text><text x="114.0" y="59.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">et achat</text><path d="M205,47 H253" class="rd-arrow" marker-end="url(#cvm)"/><rect x="254" y="14" width="180" height="66" rx="8" class="rd-blk rd-k-a" /><text x="344.0" y="43.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">2. Réception</text><text x="344.0" y="59.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">état : en stock</text><path d="M435,47 H483" class="rd-arrow" marker-end="url(#cvm)"/><rect x="484" y="14" width="180" height="66" rx="8" class="rd-blk rd-k-b" /><text x="574.0" y="43.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">3. Déploiement</text><text x="574.0" y="59.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">état : en service</text><rect x="24" y="126" width="180" height="66" rx="8" class="rd-blk rd-k-b" /><text x="114.0" y="147.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">4. Exploitation</text><text x="114.0" y="163.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">et maintenance</text><text x="114.0" y="179.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">état : en service (ou en panne)</text><path d="M205,159 H253" class="rd-arrow" marker-end="url(#cvm)"/><rect x="254" y="126" width="180" height="66" rx="8" class="rd-blk rd-k-p" /><text x="344.0" y="155.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">5. Retrait</text><text x="344.0" y="171.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">état : retiré</text><path d="M435,159 H483" class="rd-arrow" marker-end="url(#cvm)"/><rect x="484" y="126" width="180" height="66" rx="8" class="rd-blk rd-k-c" /><text x="574.0" y="155.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">6. Recyclage</text><text x="574.0" y="171.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">ou destruction</text><path d="M574,80 V98 H114 V126" class="rd-arrow" marker-end="url(#cvm)"/>
</svg>
<figcaption>Cycle de vie : à chaque étape, l'inventaire doit mettre à jour l'état de l'équipement.</figcaption>
</figure>


Un équipement change d'**état** au fil de ce cycle : l'inventaire doit le **suivre**, sinon il vieillit.

**Je vérifie.** Pourquoi l'identifiant d'inventaire est-il préférable au nom de la machine pour retrouver un équipement ?

<details markdown="1">
<summary>Voir la réponse</summary>

Parce qu'il **ne change jamais**, alors que le nom (et l'adresse IP) peuvent être modifiés : l'identifiant garde le lien entre la fiche et l'équipement physique.

</details>


## 4. Inventaire manuel ou automatisé

**Manuel :** une personne relève chaque équipement et remplit une fiche (tableur, formulaire). Pour **un** poste, c'est instructif ; pour 200, c'est un mois de travail.

**Automatisé :** un programme (un **agent**) installé sur chaque machine collecte les informations et les envoie à un serveur à intervalles réguliers.

| Critère | Manuel | Automatisé |
|---|---|---|
| **Coût de départ** | Faible | Installation du serveur et des agents |
| **Coût par poste** | Élevé (temps humain) | Très faible |
| **Fraîcheur** | Périme dès l'écriture | Mise à jour régulière |
| **Exhaustivité** | Dépend du soin, oublis fréquents | Voit ce qui a un agent ; détecte des équipements inconnus avec un scan réseau |
| **Traçabilité** | Faible | Historique des changements |
| **Erreurs** | Fautes de frappe, formats variables | Données homogènes |

**Ordre de grandeur.** Temps manuel : 45 minutes par poste.

| Parc | Temps manuel (45 min par poste) |
|---|---|
| 1 poste | 45 min |
| 50 postes | 50 × 45 min = 2 250 min = **37 h 30** |
| 200 postes | 200 × 45 min = 9 000 min = **150 h** |

Le temps d'un déploiement automatisé dépend de l'organisation (déploiement par script, par stratégie de groupe, par un outil de déploiement) : les chiffres couramment cités sont des **estimations**, à discuter et à remplacer par des mesures sur son propre parc.

**Quatre façons d'alimenter un parc.** Un outil de gestion de parc est **vide** tant qu'on ne l'a pas rempli. Il peut l'être par : la **saisie manuelle** (précise mais lente et périssable) ; l'**import** d'un fichier (rapide, mais reprend les défauts du fichier) ; la **découverte réseau** (détecte ce qui répond sur le réseau, sans le détail) ; l'**agent** (détail matériel et logiciels, mais seulement là où il est installé). Ces modes se **complètent**.

> [!TIP]
> **Dans InfraLab** (TP, partie D) : le TP 1 te fait constater un Parc vide puis le remplir par découverte, le TP 4 complète une fiche (numéro d'inventaire, numéro de série, garantie) et le TP 9 traite une imprimante sans agent. Tu vois **ce que chaque mode sait et ne sait pas**.

**Agent ou sans agent ?** Un **agent** est un petit programme sur chaque poste. Une méthode **sans agent** (*agentless*) interroge à distance par des protocoles réseau comme **SNMP** (équipements réseau, imprimantes) ou **WMI** (Windows) <span class="technique">notion technique</span>. Les deux se combinent : agent pour les postes, SNMP pour les imprimantes et les switchs.

## 5. La qualité des données

Un inventaire faux est **pire** qu'un inventaire absent : on s'y fie à tort. Les défauts classiques :

| Défaut | Exemple | Conséquence |
|---|---|---|
| **Doublon** | Même numéro de série sur deux lignes | Comptage faux, litige de garantie |
| **Champ vide** | Pas de numéro de série | Équipement non identifiable |
| **Formats différents** | `2024-02-13` et `13/02/2024` | Tri et calculs de dates faux |
| **Valeurs non normalisées** | « En service », « en service », « Actif » | Statistiques fausses |
| **Valeur incohérente** | Date d'achat dans le futur | Donnée suspecte |
| **Fiche périmée** | Poste retiré encore affecté à un utilisateur | Mauvaises décisions |

**Exemple : repérer les défauts.** Voici un extrait de quatre lignes (cas fictif). Cherche les défauts **avant** de lire la correction.

| Identifiant | Nom | N° de série | Service | État | Date d'achat |
|---|---|---|---|---|---|
| INV-0101 | PC-COMPTA-01 | SN48213 | Comptabilité | En service | 2024-03-12 |
| INV-0102 | PC-COMPTA-02 | SN48214 | Comptabilité | en service | 2024-03-12 |
| INV-0103 | PC-RH-01 | SN48214 | RH | Actif | 15/04/2024 |
| INV-0104 | PC-RH-02 | | RH | En service | 2027-01-10 |

<details markdown="1">
<summary>Voir les défauts</summary>

1. **Doublon** : `SN48214` est sur les lignes INV-0102 et INV-0103 (deux équipements ne peuvent pas avoir le même numéro de série).
2. **Valeurs non normalisées** : « En service », « en service » et « Actif » désignent le même état.
3. **Formats différents** : `2024-04-15` attendu, mais `15/04/2024` en INV-0103.
4. **Champ vide** : pas de numéro de série en INV-0104.
5. **Valeur incohérente** : une date d'achat en 2027, dans le futur.

</details>

**Je vérifie.** Dans un parc de 120 postes, combien de temps faut-il pour un inventaire manuel à 45 minutes par poste ?

<details markdown="1">
<summary>Voir la réponse</summary>

120 × 45 min = 5 400 min = **90 h**.

</details>

**Règles utiles** : un **dictionnaire de données** (liste des champs, format, valeurs permises), des **listes de choix** plutôt que du texte libre, un **contrôle** régulier (doublons, vides, incohérences), un **responsable** de l'inventaire.

## 6. Inventaire et données personnelles

Un inventaire relie des **machines** à des **personnes** (utilisateur, service). C'est donc, en partie, un **traitement de données à caractère personnel**, soumis au **RGPD** (règlement européen) et à la loi française. Principes à connaître :

| Principe | Application à l'inventaire |
|---|---|
| **Finalité** | On inventorie pour des raisons précises : support, sécurité, licences. Pas pour surveiller l'activité des personnes |
| **Minimisation** | On ne collecte que ce qui sert : pas de contenu de fichiers, pas d'historique de navigation |
| **Information** | Les utilisateurs sont **informés** (par exemple dans la **charte informatique** qu'ils signent) |
| **Sécurité** | Le serveur d'inventaire est protégé : authentification, accès restreint, chiffrement des échanges |
| **Durée** | On ne garde pas les données au-delà du nécessaire |

> [!WARNING]
> Ceci est un **rappel de principes**, pas un avis juridique. Pour un cas réel, on consulte le **délégué à la protection des données** (DPO) ou le référent de l'organisation.


**Je vérifie.** L'adresse e-mail et le nom de l'utilisateur sont-ils des données personnelles dans un inventaire ? Et le numéro de série d'un poste ?

<details markdown="1">
<summary>Voir la réponse</summary>

Oui pour le **nom** et l'**e-mail** : ils identifient une personne. Le numéro de série d'un poste, seul, décrit un objet ; mais s'il est **relié** à une personne (affectation), il permet de l'identifier : la fiche entière relève alors du RGPD.

</details>

## 7. Quelques outils d'inventaire

| Outil | Nature | Inventaire automatique | Tickets | Remarque |
|---|---|---|---|---|
| **GLPI** | Logiciel libre de gestion de parc et d'assistance | Oui, avec l'**agent GLPI** (inventaire natif) | Oui | Très répandu dans les organisations françaises ; vu en S13 et S14 |
| **OCS Inventory NG** | Logiciel libre d'inventaire | Oui (agent) | Non | Souvent associé à GLPI ; voir S13 (variante) |
| **Outils Microsoft** (Intune, Configuration Manager) | Gestion de parc Windows | Oui | Non (selon la solution) | Coût lié aux licences Microsoft |
| **Solutions commerciales d'inventaire** | Produits payants ou à version limitée | Oui, souvent sans agent | Variable | À étudier au cas par cas |
| **Plateformes de gestion de services en ligne** | Services hébergés | Oui | Oui | Coût élevé, hors périmètre |

> [!NOTE]
> Les **licences** et les **tarifs** évoluent : on les **vérifie** sur les sites des éditeurs avant de comparer (voir la page [Licences et crédits](../../ressources/licences.md)).

---

## À retenir

- Le **patrimoine** = matériels, logiciels, licences, services, personnes, lieux ; un **CI** est un élément géré individuellement ; la **CMDB** les rassemble.
- On inventorie pour le **support**, la **sécurité**, les **coûts**, la **conformité**, le **pilotage**.
- Une fiche a un **identifiant unique stable** ; l'équipement a un **cycle de vie** (achat → retrait) et un **état**.
- Manuel : 45 min × nombre de postes ; automatisé : **agent** (postes) + **SNMP / WMI** (réseau).
- Un inventaire faux est pire qu'aucun : **doublons**, **vides**, **formats**, **états** non normalisés, **fiches périmées**.
- Un inventaire touche aux **données personnelles** : **finalité, minimisation, information (charte), sécurité**.
