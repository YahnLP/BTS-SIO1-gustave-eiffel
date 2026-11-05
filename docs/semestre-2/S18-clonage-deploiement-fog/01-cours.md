# Cours – Cloner et déployer des postes

*BTS SIO SISR 1re année – S18 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** VM et réseaux de VirtualBox (S06, S07) ; terminal (S08 à S10) ; cycle de vie des équipements (S12) ; la fiche [minimum réseau](../../ressources/minimum-reseau.md).
> - **Mots déjà vus :** DHCP, adresse IP, instantané, VM.
> - **Expliqués dans ce cours :** clonage, démarrage par le réseau (PXE), image maîtresse, identité d'une machine après clonage.

## À la fin de ce cours, tu sauras

- [ ] expliquer le **clonage** et l'intérêt d'une **image maîtresse** ;
- [ ] décrire le **démarrage réseau (PXE)** ;
- [ ] décrire l'architecture et le fonctionnement de **FOG** ;
- [ ] énumérer ce qui doit être **personnalisé** après un clone ;
- [ ] citer les **risques** (sécurité, licences, données personnelles).

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **Un clone est un poste prêt à l'emploi.** » Il est **identique** au modèle, y compris pour ce qui devrait être unique : nom, identifiants, clés (§ 4).
> - « **Un second serveur DHCP ne gêne personne.** » Deux DHCP sur un même réseau distribuent des adresses contradictoires (§ 2).
> - « **Cloner dispense de licences.** » Chaque poste a besoin de sa licence (§ 5).

---

## 1. Pourquoi cloner

Installer un poste à la main (système, pilotes, logiciels, réglages) prend du temps, et deux postes « installés pareil » ne le sont jamais tout à fait. Le **clonage** consiste à **préparer un poste modèle une seule fois**, à en **capturer une image**, puis à la **déployer** sur autant de postes que nécessaire.

**Deux mots à connaître.** Le **clonage** consiste à copier à l'identique le disque d'un poste sur d'autres postes. Le poste de départ, installé et réglé avec soin, s'appelle le **poste modèle** ; sa copie enregistrée s'appelle l'**image maîtresse**. Attention : un clone n'est ni un instantané de VM (S07) ni une sauvegarde (S20).

| | Installation à la main | Clonage |
|---|---|---|
| Temps par poste | Long, répété | Court après la préparation du modèle |
| Homogénéité | Variable | Identique par construction |
| Risque d'oubli | Élevé | Faible : tout est dans l'image |
| Point fragile | Chaque poste | **L'image** : une erreur est copiée partout |

**Ordre de grandeur (exemple résolu, durées d'exemple).**

| Méthode | Calcul | Temps de travail ou d'attente |
|---|---|---|
| Installation à la main, 30 postes | 30 × 2 h | **60 h** |
| Clone poste par poste, 15 min chacun | 30 × 15 min = 450 min | **7 h 30** (attente, peu de travail) |
| Clone par multidiffusion, tous en même temps | une seule diffusion de l'image | de l'ordre d'**une durée de clone** (15 à 30 min) |

La **préparation du modèle** reste à compter (une demi-journée par exemple). Les durées réelles dépendent du réseau, des disques et de la taille de l'image : ce sont des **ordres de grandeur**, à mesurer dans le TP.

**Je vérifie.** Pourquoi le gain du clonage n'est-il pas « 60 h contre 0 h » ?

<details markdown="1">
<summary>Voir la réponse</summary>

Parce qu'il faut **préparer et tester le modèle**, installer le serveur et vérifier les postes après déploiement. Le gain est réel quand on déploie **beaucoup** de postes ou **plusieurs fois**.

</details>


## 2. Le démarrage réseau : PXE

Un poste neuf n'a pas de système : il doit **démarrer par le réseau**. Le **PXE** (*Preboot Execution Environment*) est ce mécanisme, intégré à la carte réseau.

<figure class="raid-fig">
<svg viewBox="0 0 720 334" role="img" aria-labelledby="pxt" xmlns="http://www.w3.org/2000/svg"><title id="pxt">Démarrage réseau PXE : échanges entre le poste, le DHCP, le TFTP et le serveur de déploiement</title>
<defs><marker id="pxm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="20" y="6" width="140" height="42" rx="8" class="rd-blk rd-k-c"/><text x="90.0" y="23.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Poste</text><text x="90.0" y="39.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">démarre en PXE</text><path d="M90,50 V314" stroke="var(--disk-s)" stroke-width="1.2" stroke-dasharray="5 4" fill="none"/><rect x="200" y="6" width="140" height="42" rx="8" class="rd-blk rd-k-b"/><text x="270.0" y="23.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Serveur DHCP</text><text x="270.0" y="39.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">adresse + démarrage</text><path d="M270,50 V314" stroke="var(--disk-s)" stroke-width="1.2" stroke-dasharray="5 4" fill="none"/><rect x="380" y="6" width="140" height="42" rx="8" class="rd-blk rd-k-d"/><text x="450.0" y="23.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Serveur TFTP</text><text x="450.0" y="39.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">chargeur</text><path d="M450,50 V314" stroke="var(--disk-s)" stroke-width="1.2" stroke-dasharray="5 4" fill="none"/><rect x="560" y="6" width="140" height="42" rx="8" class="rd-blk rd-k-a"/><text x="630.0" y="23.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Déploiement</text><text x="630.0" y="39.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">FOG</text><path d="M630,50 V314" stroke="var(--disk-s)" stroke-width="1.2" stroke-dasharray="5 4" fill="none"/><path d="M92,88 H268" class="rd-arrow" marker-end="url(#pxm)"/><text x="180.0" y="81" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">1. cherche une adresse (diffusion)</text><path d="M268,126 H92" class="rd-arrow" marker-end="url(#pxm)"/><text x="180.0" y="119" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">2. adresse IP + où trouver le chargeur</text><path d="M92,164 H448" class="rd-arrow" marker-end="url(#pxm)"/><text x="270.0" y="157" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">3. demande le chargeur</text><path d="M448,202 H92" class="rd-arrow" marker-end="url(#pxm)"/><text x="270.0" y="195" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">4. envoie le chargeur (menu)</text><path d="M92,240 H628" class="rd-arrow" marker-end="url(#pxm)"/><text x="360.0" y="233" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">5. demande le système de déploiement</text><path d="M628,278 H92" class="rd-arrow" marker-end="url(#pxm)"/><text x="360.0" y="271" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">6. envoie noyau + environnement minimal</text><text x="360" y="332" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:600">Le poste exécute ensuite la tâche prévue : capture ou déploiement.</text>
</svg>
<figcaption>Six échanges avant que le poste n'exécute la tâche : l'adresse vient du DHCP, le chargeur du TFTP, le système de déploiement du serveur FOG.</figcaption>
</figure>

<details markdown="1">
<summary>Comment lire ce schéma</summary>

Les quatre colonnes sont les quatre machines concernées ; les traits pointillés représentent le **temps qui passe vers le bas**. Chaque flèche est un message, dans l'ordre, de 1 à 6 : (1) le poste, qui n'a ni système ni adresse, **cherche** un serveur DHCP ; (2) le DHCP lui répond avec une **adresse IP** et lui dit **où trouver le chargeur** ; (3) et (4) le poste télécharge ce chargeur auprès du serveur **TFTP**, qui affiche le menu de démarrage ; (5) et (6) le poste télécharge le petit système de déploiement auprès du serveur FOG. À la fin, le poste est prêt à **capturer** ou **déployer** une image.

</details>




**Je vérifie.** Pourquoi un poste qui démarre en PXE commence-t-il par un échange avec le DHCP ?

<details markdown="1">
<summary>Voir la réponse</summary>

Il n'a ni système ni adresse : le DHCP lui donne une **adresse IP** et lui indique **où trouver le chargeur** de démarrage.

</details>

> **Dans [ProtoLab](https://yahnlp.github.io/ProtoLab/)** : le protocole **DHCP** montre les quatre messages (Discover, Offer, Request, ACK) par lesquels un poste reçoit son adresse. Le PXE ajoute à ce DHCP des informations de démarrage ; le TFTP, lui, n'est pas simulé dans ProtoLab.

- **DHCP** : donne l'adresse IP **et** indique le serveur et le fichier de démarrage (options de démarrage réseau, qu'on appelle souvent « next-server » et « nom du fichier de démarrage »).
- **TFTP** : protocole simple de transfert de fichiers, utilisé pour le chargeur.
- **Chargeur** : programme qui affiche le **menu de démarrage** (ici celui de FOG).

> [!WARNING]
> **Un serveur DHCP ne s'ajoute jamais sur un réseau en production sans coordination.** Deux serveurs DHCP sur le même réseau distribuent des adresses contradictoires et peuvent couper des dizaines de postes. En TP, on travaille sur un **réseau interne isolé**.

## 3. FOG, en pratique

**FOG** est une solution libre de **capture et de déploiement d'images**, fonctionnant sur un serveur Linux, avec une **interface web**. D'après sa documentation officielle, elle propose notamment :

- la **capture** et le **déploiement** d'images ;
- la **multidiffusion** : une même image envoyée à plusieurs postes en même temps ;
- des **tâches** applicables après déploiement (renommer l'hôte, joindre un domaine, installer des logiciels) via un **client** à installer sur le poste modèle ;
- un **inventaire** simple des postes enregistrés.

**Composants** : le **serveur** (interface web, base de données, services de démarrage réseau et de transfert) ; le **petit système** téléchargé par le poste pour réaliser l'opération ; le **client FOG** (facultatif) sur les postes.

> [!NOTE]
> **Licence.** La documentation indique que FOG est distribué sous licence GPL, sans préciser la version dans la page consultée : **vérifie** sur le projet avant de citer.

**Prérequis annoncés par la documentation** (à confirmer pour ta version) : un serveur Linux d'une distribution prise en charge, **2 cœurs et 2 Go de mémoire** comme base, une **carte réseau gigabit**, un disque dimensionné selon le nombre d'images conservées (la documentation recommande de placer le dossier des images sur une partition séparée) ; sur les postes, au moins **512 Mo** de mémoire.

**Le parcours (documentation officielle) :**

| Étape | Ce qu'on fait | Où |
|---|---|---|
| 1. Enregistrer le poste modèle | Démarrer en PXE, choisir l'enregistrement rapide | Menu de démarrage FOG |
| 2. Créer l'image | Donner un nom, valeurs par défaut | Interface web, gestion des images |
| 3. Associer l'image au poste | Dans la fiche du poste | Interface web, gestion des hôtes |
| 4. Créer la tâche de capture | Dans la fiche du poste, tâches de base | Interface web |
| 5. Démarrer le poste | Il capture directement, sans afficher le menu | Poste |
| 6. Déployer | Poste cible démarré en PXE, enregistré, tâche de déploiement | Menu puis poste |

Les noms exacts des menus changent selon la version : **note ceux que tu vois**.

## 4. Après le clone : l'identité

Un clone est **identique** au modèle, y compris pour des éléments qui doivent être **uniques** :

| Élément | Problème s'il reste identique | Réponse |
|---|---|---|
| **Nom d'hôte** | Deux machines du même nom sur le réseau | Renommer après déploiement (client FOG ou script) |
| **Adresse IP** | Conflit | Adresses par DHCP |
| **Identifiants du système** (identifiant de session Windows, identifiant de machine sous Linux) | Outils de gestion et de licences qui confondent les machines | Préparer le modèle (sur Windows, la documentation FOG indique `sysprep`) |
| **Clés SSH du serveur** (Linux) | Deux serveurs avec la même identité cryptographique | Les régénérer sur chaque clone |
| **Comptes et mots de passe** | Mot de passe du modèle connu partout | Les changer, ne pas laisser de données personnelles dans le modèle |


**Je vérifie.** Tu déploies la même image sur trois postes sans rien personnaliser. Cite deux problèmes concrets.

<details markdown="1">
<summary>Voir la réponse</summary>

Trois machines **du même nom** sur le réseau (conflit, inventaire confondu) ; **mêmes identifiants système ou clés SSH** (outils de gestion et de licences qui les confondent, identité cryptographique partagée) ; et le **mot de passe du modèle** connu sur les trois.

</details>

> [!NOTE]
> Ces points sont des principes généraux de l'administration système ; leur mise en œuvre dépend du système. **Teste** sur tes VM et note ce qui est identique d'un poste à l'autre.

## 5. Risques et bonnes pratiques

| Risque | Mesure |
|---|---|
| **Image obsolète** (correctifs manquants) | Mettre à jour le modèle et **recapturer** régulièrement ; versionner les images |
| **Image avec données personnelles ou secrets** | Modèle propre : aucun document, mot de passe ou clé d'un utilisateur |
| **Serveur de déploiement compromis** | Il modifie tous les futurs postes : accès réservé, mot de passe par défaut changé, sauvegarde (voir S20) |
| **Licences** | Cloner un système ne dispense pas de **licence** pour chaque poste ; suivre les licences dans l'outil de gestion (S14) |
| **Écrasement** | Le déploiement **remplace** le contenu du disque cible : vérifier la cible avant de lancer |
| **Chiffrement de disque** | Un disque chiffré (Windows : BitLocker) est refusé : le déchiffrer avant capture (documentation FOG) |

> **Dans InfraLab** (TP, partie D) : le TP 30 « Réaffectation d'un poste » suit un poste restitué, préparé puis confié à une nouvelle personne ; le TP 29 (cycle de vie, voir [S12](../S12-patrimoine-inventaire/02-tp.md), partie D5) montre un équipement de la commande au rebut.

**Et après ?** Un poste déployé est un **nouvel équipement** : il doit entrer dans l'**inventaire** (S12 à S14) et son **cycle de vie** doit commencer proprement (S18, partie D d'InfraLab).

## Je retiens

- Clonage = **un modèle soigné**, une **image**, un **serveur** qui la distribue.
- PXE : **DHCP** (adresse + où démarrer), **TFTP** (chargeur), puis le système de déploiement.
- **Pas de second serveur DHCP** sur un réseau de production.
- Un clone est identique : **nom, identifiants, clés** sont à personnaliser.
- Le déploiement **écrase** le disque cible.
- Le poste déployé **entre dans l'inventaire** et commence son cycle de vie.
