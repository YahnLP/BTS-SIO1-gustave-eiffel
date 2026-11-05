# Cours – GLPI et l'inventaire automatique

*BTS SIO SISR 1re année – S13 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** virtualisation (S06, S07), terminal et paquets (S08 à S10), inventaire (S12).
> - **Mots déjà vus :** agent, inventaire, CMDB, paquet, VM, instantané.
> - **Expliqués dans ce cours :** GLPI, base de données, serveur web, agent GLPI, diagnostic d'un poste qui ne remonte pas.

## À la fin de ce cours, tu sauras

- [ ] décrire l'**architecture** de GLPI et ce qu'il faut installer ;
- [ ] expliquer le principe de l'**inventaire natif** et de l'**agent GLPI** ;
- [ ] décrire la procédure d'**installation** et les points de **sécurité** ;
- [ ] situer la variante **OCS Inventory NG** ;
- [ ] **diagnostiquer** un poste qui ne remonte pas.

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **Installer GLPI, c'est installer une application.** » C'est installer une **pile** : serveur Web, PHP, base de données, puis l'application (§ 2).
> - « **Les mots de passe par défaut peuvent rester en laboratoire.** » Non : changer ou supprimer les comptes par défaut est un **réflexe** à prendre dès le laboratoire (§ 2).
> - « **L'agent inventorie tout le réseau.** » Non : il ne décrit que **le poste sur lequel il est installé** (§ 3).

---

## 1. GLPI : un outil de gestion de parc et d'assistance

**GLPI** (*Gestion libre de parc informatique*) est un logiciel libre qui rassemble, dans un seul outil :

- la **CMDB** : l'inventaire des équipements (ordinateurs, imprimantes, réseau, logiciels…) ;
- la **gestion des tickets** (incidents, demandes) : S15 ;
- la **base de connaissances**, les **licences**, les **contrats**.

Il est très répandu dans les organisations françaises. Son éditeur principal est la société Teclib' avec une communauté. **Vérifie la licence** et la version sur le site officiel du projet.

## 2. Architecture et installation

<figure class="raid-fig">
<svg viewBox="0 0 720 238" role="img" aria-labelledby="glt" xmlns="http://www.w3.org/2000/svg"><title id="glt">Architecture de GLPI : navigateur et agent vers le serveur Web, puis la base de données</title>
<defs><marker id="glm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="10" y="34" width="150" height="60" rx="8" class="rd-blk rd-k-c" /><text x="85.0" y="60.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Navigateur</text><text x="85.0" y="76.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">technicien, utilisateur</text><rect x="10" y="150" width="150" height="60" rx="8" class="rd-blk rd-k-c" /><text x="85.0" y="176.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Agent GLPI</text><text x="85.0" y="192.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">sur chaque poste</text><rect x="250" y="10" width="460" height="214" rx="12" class="rd-disk"/><text x="264" y="32" text-anchor="start" class="rd-note" style="font-size:13px;font-weight:700">Serveur GLPI (Debian, pile LAMP)</text><rect x="276" y="60" width="190" height="110" rx="8" class="rd-blk rd-k-b" /><text x="371.0" y="103.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Serveur Web</text><text x="371.0" y="119.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">Apache + PHP</text><text x="371.0" y="135.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">(application GLPI)</text><rect x="520" y="60" width="164" height="110" rx="8" class="rd-blk rd-k-a" /><text x="602.0" y="111.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Base de données</text><text x="602.0" y="127.0" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">MariaDB</text><path d="M160,64 L276,100" class="rd-arrow" marker-end="url(#glm)"/><text x="176" y="66" text-anchor="start" class="rd-note" style="font-size:11px;font-weight:600">pages web</text><path d="M160,180 L276,138" class="rd-arrow" marker-end="url(#glm)"/><text x="176" y="172" text-anchor="start" class="rd-note" style="font-size:11px;font-weight:600">inventaire</text><path d="M466,115 H520" class="rd-arrow" marker-end="url(#glm)"/><text x="493" y="106" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">SQL</text><text x="330" y="200" text-anchor="start" class="rd-note" style="font-size:12px;font-weight:500">échanges en HTTP ou HTTPS</text>
</svg>
<figcaption>Deux types de clients (navigateur, agent) parlent au serveur Web ; seul le serveur Web parle à la base.</figcaption>
</figure>


| Couche | Rôle | Paquets Debian (exemples) |
|---|---|---|
| **Serveur Web** | Reçoit les requêtes, exécute GLPI | `apache2` |
| **PHP** | Langage de GLPI, avec des **extensions** | `php`, `php-mysql`, `php-curl`, `php-gd`, `php-intl`, `php-xml`, `php-mbstring`, `php-zip`, `php-bz2`… |
| **Base de données** | Stocke tickets, actifs, utilisateurs | `mariadb-server` |
| **Application** | Fichiers de GLPI | archive téléchargée sur le site officiel du projet |

> [!NOTE]
> **Trois mots à connaître.** Un **serveur Web** est un programme qui envoie des pages aux navigateurs. Une **base de données** est un programme qui range et retrouve des informations organisées en tableaux (tickets, postes, utilisateurs). **PHP** est le langage dans lequel GLPI est écrit : le serveur Web l'exécute. Tu n'as pas à les programmer, seulement à les installer et à vérifier qu'ils fonctionnent.

Cet ensemble s'appelle une pile **LAMP** (Linux, Apache, MariaDB, PHP).

**Étapes générales** (la **documentation officielle** fait foi pour la version choisie) :

1. **Installer** Apache, PHP et ses extensions, MariaDB.
2. **Sécuriser MariaDB** (`mysql_secure_installation`), puis créer une **base** et un **utilisateur dédié** avec les droits sur cette seule base.
3. **Télécharger et extraire** GLPI, puis donner à Apache (utilisateur `www-data`) les droits sur les dossiers que GLPI modifie.
4. **Configurer Apache** : un hôte virtuel dont la racine est le dossier **public** de GLPI (versions récentes).
5. **Terminer par l'assistant web** : vérification des prérequis, connexion à la base, initialisation.
6. **Sécuriser** : changer les mots de passe des comptes créés par défaut ; suivre les avertissements affichés par GLPI.

> [!WARNING]
> **Les versions changent.** Les procédures trouvées sur Internet datent souvent d'une ancienne version de GLPI, de PHP ou de Debian. Avant d'exécuter une commande, **vérifie la date et la version** de la page et **compare avec la documentation officielle**.

### Sécurité de l'installation

| Risque | Mesure |
|---|---|
| Comptes d'exemple connus de tous (mot de passe identique au nom) | **Changer** ou **supprimer** les comptes créés par défaut dès la fin de l'installation |
| Base de données ouverte avec un mot de passe faible | `mysql_secure_installation`, mot de passe fort, utilisateur limité à **sa** base |
| Échanges en clair | **HTTPS** en production (certificat) ; HTTP toléré uniquement en **laboratoire isolé** |
| Serveur exposé | Pare-feu, mises à jour, accès restreint |

## 3. L'inventaire natif et l'agent GLPI

Depuis la **version 10**, GLPI sait **recevoir des inventaires directement** (inventaire natif), sans plugin pour l'inventaire de base. L'**agent GLPI** est le programme installé sur chaque poste qui :

1. **collecte** le matériel (processeur, mémoire, disques, cartes réseau, numéro de série…) et les **logiciels installés** ;
2. **envoie** le résultat au serveur GLPI sur le **réseau** ;
3. **recommence** à intervalles réguliers.

| Mode d'exécution | Principe |
|---|---|
| **Service** | Tourne en arrière-plan en permanence (le plus courant) |
| **Tâche planifiée** | Lancé toutes les X heures ou jours |
| **Manuel** | Lancé à la demande |

<figure class="raid-fig">
<svg viewBox="0 0 720 150" role="img" aria-labelledby="agt" xmlns="http://www.w3.org/2000/svg"><title id="agt">Trajet de l'agent GLPI : collecte, envoi, réception, fiche à jour</title>
<defs><marker id="agm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="4" y="16" width="148" height="70" rx="8" class="rd-blk rd-k-c" /><text x="78.0" y="39.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">1. Collecte</text><text x="78.0" y="55.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">matériel, logiciels</text><text x="78.0" y="71.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">(sur le poste)</text><path d="M153,51 H185" class="rd-arrow" marker-end="url(#agm)"/><rect x="186" y="16" width="148" height="70" rx="8" class="rd-blk rd-k-d" /><text x="260.0" y="39.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">2. Envoi</text><text x="260.0" y="55.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">par le réseau vers</text><text x="260.0" y="71.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">l'URL du serveur</text><path d="M335,51 H367" class="rd-arrow" marker-end="url(#agm)"/><rect x="368" y="16" width="148" height="70" rx="8" class="rd-blk rd-k-b" /><text x="442.0" y="39.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">3. Réception</text><text x="442.0" y="55.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">inventaire activé ?</text><text x="442.0" y="71.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">(côté serveur)</text><path d="M517,51 H549" class="rd-arrow" marker-end="url(#agm)"/><rect x="550" y="16" width="148" height="70" rx="8" class="rd-blk rd-k-a" /><text x="624.0" y="39.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">4. Fiche à jour</text><text x="624.0" y="55.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">dans la CMDB</text><text x="624.0" y="71.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">de GLPI</text><path d="M624,88 V116 H78 V90" class="rd-arrow" marker-end="url(#agm)"/><text x="360" y="136" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:600">5. recommence à intervalles réguliers</text>
</svg>
<figcaption>Si l'une des quatre étapes échoue, le poste n'apparaît pas ou n'est plus à jour dans GLPI.</figcaption>
</figure>


**Je vérifie.** Pourquoi l'agent ne fait-il pas apparaître un poste qui n'a pas d'agent ?

<details markdown="1">
<summary>Voir la réponse</summary>

Parce qu'il décrit **seulement** le poste où il est installé et envoie son résultat au serveur. Un poste sans agent n'est connu que par une autre méthode (import, découverte réseau).

</details>

**Paramètres de l'installeur Windows** (documentation officielle de l'agent) :

| Paramètre | Rôle |
|---|---|
| `SERVER=URL` | Adresse du serveur GLPI (on peut en indiquer **plusieurs**, séparées par des virgules) |
| `TAG=étiquette` | Étiquette attachée au poste (groupe, site, classe) |
| `RUNNOW=1` | Lance un inventaire **tout de suite** après l'installation |
| `EXECMODE=1/2/3` | Service (défaut), tâche planifiée, manuel |
| `ADD_FIREWALL_EXCEPTION=1` | Ajoute l'agent aux exceptions du pare-feu Windows |

> [!NOTE]
> **L'inventaire doit être activé dans GLPI** (menu Administration, rubrique Inventaire, case à cocher) : sans cela, le serveur refuse les inventaires. L'intitulé exact du menu dépend de la version et de la langue : **vérifie-le sur ton instance**.

**Ce que l'inventaire natif ne fait pas seul.** Les fonctions avancées (découverte réseau, inventaire SNMP des imprimantes et switchs, déploiement de logiciels…) demandent le **plugin GLPI Inventory** (hors programme de cette séance).

## 4. Un poste ne remonte pas : méthode

> **Dans InfraLab** (TP, partie A) : les TP 6 et 10 te font poser un agent et diagnostiquer trois agents en erreur ; le TP 49 (facultatif, fichier à télécharger) mesure la **couverture réelle** d'un parc de cinq postes.

> **Dans [ProtoLab](https://yahnlp.github.io/ProtoLab/)** : les protocoles **ICMP** (`ping`), **HTTP** et **HTTPS** montrent ce qui se passe quand le poste « joint » le serveur, puis quand l'agent envoie son inventaire par le Web. Le protocole **TCP** montre pourquoi un port fermé ou filtré se reconnaît (réponse RST, ou silence).

| Étape | Question | Vérification |
|---|---|---|
| 1 | Le poste **joint-il** le serveur ? | `ping IP_SERVEUR` ; navigateur sur `http://IP_SERVEUR/` |
| 2 | L'**URL** donnée à l'agent est-elle la bonne ? | Relire la configuration de l'agent |
| 3 | L'**inventaire** est-il activé dans GLPI ? | Menu Administration › Inventaire |
| 4 | Un **pare-feu** bloque-t-il ? | Pare-feu du serveur et du poste |
| 5 | L'agent a-t-il **tourné** et que dit son **journal** ? | Journal de l'agent (sous Windows, dans le dossier d'installation, sous-dossier `logs`) |
| 6 | Le serveur a-t-il enregistré une **erreur** ? | Journaux de GLPI et d'Apache (`/var/log/apache2/`) |

On remonte la **chaîne** : réseau → URL → activation → agent → serveur.

**Tableau symptôme, cause probable, test.**

| Symptôme | Cause probable | Test |
|---|---|---|
| Le poste n'apparaît **jamais** | URL fausse ou serveur injoignable | `ping`, navigateur vers le serveur, relire l'URL de l'agent |
| Serveur joignable, mais poste absent | inventaire **désactivé** dans GLPI | menu Administration, rubrique Inventaire |
| Poste connu, mais fiche **ancienne** | **service** de l'agent arrêté | état du service sur le poste, puis journal de l'agent |
| Erreur de connexion dans le journal | **pare-feu** (poste ou serveur) | tester l'accès depuis le poste, relire les règles |
| Poste connu, données incomplètes | agent trop **ancien** | version de l'agent ; mettre à jour ce poste |

> [!WARNING]
> Ne **réinstalle** pas l'agent partout « pour être tranquille » : cela masque la cause et peut faire perdre l'historique. On identifie la cause **d'abord**.

**Je vérifie.** Le serveur répond bien au `ping`, mais un nouveau poste n'apparaît pas dans GLPI. Quelles étapes de la méthode tester ensuite ?

<details markdown="1">
<summary>Voir la réponse</summary>

L'**URL** donnée à l'agent, puis l'**activation de l'inventaire** côté GLPI, puis le **pare-feu**, enfin le **journal** de l'agent. Le `ping` ne prouve que la liaison réseau.

</details>

**Je vérifie.** Pourquoi crée-t-on un utilisateur de base de données dédié, limité à la base de GLPI, plutôt que d'utiliser le compte administrateur de MariaDB ?

<details markdown="1">
<summary>Voir la réponse</summary>

Par **moindre privilège** : si GLPI est compromis, l'attaquant n'a accès qu'à **sa** base, pas à toutes les bases du serveur.

</details>


## 5. Variante : OCS Inventory NG

**OCS Inventory NG** est un autre outil libre d'inventaire. Il se compose de :

| Composant | Rôle |
|---|---|
| **Serveur OCS** (Apache, Perl, base dédiée) | Reçoit et stocke les inventaires |
| **Console `ocsreports`** | Interface web d'OCS |
| **Agent OCS** | Collecte sur chaque poste |
| **Plugin « OCS Inventory NG » de GLPI** | Importe les ordinateurs d'OCS dans la CMDB de GLPI |

Avec OCS, on installe **deux serveurs** (OCS puis GLPI) et un plugin de liaison ; avec l'agent GLPI, **un seul** (GLPI) suffit. OCS reste très présent dans des organisations existantes : on peut le rencontrer en entreprise.

> [!NOTE]
> **Ne pas confondre.** Le **plugin OCS Inventory NG** (liaison OCS vers GLPI) et **FusionInventory** (un autre agent d'inventaire, dont l'agent GLPI est un successeur) sont des composants **différents**.

## 6. Des données de parc, donc des données personnelles

Rappel de S12 : l'inventaire relie des machines à des **utilisateurs**. Le serveur GLPI doit être **protégé** (mots de passe, HTTPS, accès restreint, sauvegardes) et l'usage **annoncé** dans la charte informatique.

---

## À retenir

- GLPI = **CMDB + tickets** ; pile **Apache + PHP + MariaDB** ; **base dédiée** avec utilisateur dédié.
- Installation : **composants → base → fichiers → Apache → assistant → sécurité**. La **doc officielle** fait foi ; les versions changent.
- **Inventaire natif** (GLPI ≥ 10) + **agent GLPI** : collecte → envoi → répétition. L'inventaire doit être **activé**.
- Poste absent : **réseau → URL → activation → agent → serveur**.
- OCS = variante à **deux serveurs** et un plugin de liaison.
- **Changer les comptes par défaut** ; **HTTPS** hors laboratoire.
