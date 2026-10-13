# S13 – Installer GLPI et inventorier avec l'agent

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S13 – semaine 13 (semestre 2) |
| **Durée** | 4 heures |
| **Prérequis** | Virtualisation ([S06](../../semestre-1/S06-virtualisation-premieres-vm/README.md), [S07](../../semestre-1/S07-virtualisation-avancee/README.md)) ; terminal et paquets Linux ([S08](../../semestre-1/S08-terminal-commandes-de-base/README.md) à [S10](../../semestre-1/S10-paquets-scripts-bash/README.md)) ; inventaire ([S12](../S12-patrimoine-inventaire/README.md)) |
| **Matériel** | **[InfraLab](https://yahnlp.github.io/InfraLab/)** (navigateur) ; VirtualBox ; une **VM serveur Debian** (ISO ou OVA) avec accès Internet pour `apt` et les téléchargements ; une **VM cliente Windows** (celle de S06) ; navigateur |
| **Compétences travaillées** | B2.2 · B1.1 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Comment un parc de postes peut-il se décrire tout seul dans un outil central, et que faut-il installer et sécuriser pour que ce soit fiable ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Décrire** l'architecture de GLPI (navigateur, serveur Web et PHP, base de données) ;
2. **Installer** GLPI sur une VM Debian (Apache, PHP, MariaDB), en s'appuyant sur la **documentation officielle** ;
3. **Sécuriser** une installation de base (mot de passe de la base, comptes par défaut) ;
4. **Activer l'inventaire** dans GLPI et **installer l'agent GLPI** sur un poste Windows ;
5. **Vérifier** qu'un poste remonte et **comparer** l'inventaire automatique à une fiche manuelle ;
6. **Diagnostiquer** un poste qui ne remonte pas (réseau, URL, journaux) ;
7. **Situer** la variante **OCS Inventory NG** et la différence avec l'agent GLPI.

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Architecture GLPI, installation, inventaire natif et agent, variante OCS, diagnostic |
| [TP : un serveur GLPI et un premier poste](02-tp.md) | InfraLab (TP 6 et 10), préparer, installer GLPI, inventorier avec l'agent, comparer, bilan |
| [Aide-mémoire](03-aide-memoire.md) | Commandes et paramètres de la séance |
| [Plan de tests](tp/plan-de-tests.txt) | Tableau de tests à remplir pendant l'installation |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 10 | **Accroche** : 22 postes, une seule console : démonstration d'une fiche d'ordinateur dans GLPI | Démonstration |
| 0 h 10 – 0 h 40 | **Mini-cours** : architecture, installation, inventaire natif et agent (cours §1 à §4) | Cours et questions |
| 0 h 40 – 1 h 05 | **TP partie A1 (InfraLab)** : TP 6 « Installer un agent » | Binôme, navigateur |
| 1 h 05 – 1 h 40 | **TP partie A2 (InfraLab)** : TP 10 « Agent en erreur » | Binôme |
| 1 h 40 – 1 h 50 | **TP partie B** : préparer les machines virtuelles (en réalité, restaurer les VM de la séance) | Binôme |
| 1 h 50 – 2 h 50 | **TP partie C** : installer GLPI | Binôme |
| 2 h 50 – 3 h 05 | Pause | |
| 3 h 05 – 3 h 40 | **TP partie D** : activer l'inventaire, installer l'agent | Binôme |
| 3 h 40 – 3 h 52 | **TP partie E** : comparer avec la fiche manuelle, lien avec InfraLab | Binôme |
| 3 h 52 – 4 h 00 | **Bilan de compétences** (à terminer à la maison) | Individuel |

> [!WARNING]
> **Séance dense, et l'installation de GLPI est le point risqué.** Si l'installation prend du retard, le TP 10 d'InfraLab passe en travail personnel. Pour gagner du temps, l'enseignant peut fournir une **VM Debian avec la pile Apache, PHP et MariaDB déjà installée** (la partie C commence alors à l'assistant d'installation).

## Évaluation

- Compte rendu PDF nommé `RENDU-S13-NOM.pdf` : journal d'installation, plan de tests rempli avec captures, comparaison, réponses.
- **Snapshot** de la VM serveur nommé `GLPI installé` (réutilisé en S14 et S15).
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Sources :** le TP d'origine « OCS Inventory » (installer GLPI + OCS sur Debian/Ubuntu, agent Windows, comparaison avec la fiche manuelle, cycle de collecte, questions de réflexion). **Décision :** l'agent d'inventaire est l'**agent GLPI** (inventaire natif de GLPI depuis la version 10, d'après l'aide officielle de GLPI). OCS reste une **variante** décrite au cours (§5) et dans les « Notes » ci-dessous, pas une procédure complète.
- **Version de GLPI :** le TP d'origine décrit GLPI **10.0.x** (installation dans `/var/www/html/glpi`) ; la page d'installation officielle consultée à la rédaction décrit GLPI **11.0.x** (répertoire public `/var/www/html/glpi/public`, séparation configuration, données et journaux). **Les commandes du TP n'ont pas été exécutées** : elles sont écrites d'après cette page et mes connaissances. Un test complet sur une VM de la salle est **indispensable avant la séance** (versions de PHP et de MariaDB de Debian, règles de réécriture d'Apache, extensions PHP manquantes, droits des dossiers). Les numéros de version ne sont pas figés : les étudiants téléchargent la dernière version stable indiquée sur la page des publications de GLPI.
- **Agent :** les paramètres de l'installeur Windows (`SERVER`, `TAG`, `RUNNOW`, `EXECMODE`…) viennent de la documentation officielle de l'agent ; les points **non vérifiés** (commande exacte pour forcer un inventaire, port de l'interface locale de l'agent, nom du service Windows) sont laissés à la recherche des étudiants dans la documentation.
- **Comptes par défaut :** le TP d'origine indique `glpi / glpi` ; GLPI crée plusieurs comptes de démonstration. À **vérifier sur la version installée** et à **changer** (volet sécurité du TP).
- **Incohérences corrigées :** (1) le TP d'origine installe le plugin « OCS Inventory NG » alors que le cours d'origine cite « FusionInventory » : deux composants différents (voir S12). (2) Le TP d'origine demande « Outils › OCS Inventory NG › Import » : cet écran n'existe qu'avec le plugin OCS ; il est donc absent du TP GLPI. (3) Le TP d'origine met l'agent en HTTP sur le port 80 alors que le cours dit « HTTPS » : le TP travaille en HTTP **en laboratoire** et demande d'expliquer pourquoi la production exige HTTPS.
- **Cycle de collecte collaboratif :** le TP d'origine reconfigure l'agent à chaque cycle pour viser le serveur d'un autre élève. L'installeur de l'agent accepte une **liste de serveurs** (paramètre `SERVER` séparé par des virgules, d'après la documentation officielle) : la partie E s'appuie là-dessus au lieu de 12 reconfigurations.
- **Réseau :** le TP d'origine utilise l'accès par pont avec l'adresse `192.168.X.1` pour le serveur et `192.168.X.10` pour le client (X = numéro d'élève). À confirmer selon le réseau de la salle (voir S07).
- **Variante OCS :** serveur Apache + Perl + base `ocsweb`, console `ocsreports`, agent Windows, et plugin « OCS Inventory NG » dans GLPI. Le TP d'origine donne la procédure ; non reprise ici car les URLs et numéros de version du TP d'origine (`2.12.x`, `10.0.x`) sont génériques et non vérifiés.
- **InfraLab (révision) :** la partie A s'appuie sur les TP 6 et 10 du catalogue ; les TP 7 et 8 sont proposés en remédiation. La variante OCS reste au cours ; la partie « serveur d'un voisin » (douze reconfigurations de l'agent) ont été **retirées du TP** : pas de temps, et InfraLab porte la notion. Les éléments de réponse de la partie A d'après le catalogue sont à **confronter à l'écran**.
- **Corrigé :** dans `corriges/` à la racine du dépôt.
- **Compétences :** codes et intitulés relus sur l'arrêté du 8 juillet 2024 ; le choix des compétences pour cette séance est une proposition de l'enseignant.

</details>
