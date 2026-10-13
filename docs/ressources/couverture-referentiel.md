# Éléments vus en classe et compétences du référentiel

Liste des 21 séances : ce qui est travaillé et la ou les compétences visées (bilan de chaque TP). Les codes « B… » sont un usage courant : l'arrêté du 8 juillet 2024 numérote des activités. Voir le [référentiel](referentiel.md).

> [!NOTE]
> Le choix des compétences par séance est une proposition de l'enseignant. Les parties « preuve réelle » (VM ou entreprise) sont celles qui peuvent alimenter une fiche de réalisation.


## S01 – Hardware et software : vocabulaire et composants

**Vu en classe :**

- **Définir** et distinguer le **hardware** et le **software**, et donner un exemple de chacun
- **Identifier** les composants internes d'une unité centrale et les connecteurs externes, et dire à quoi ils servent
- **Décrire l'architecture de Von Neumann** et le cycle *chercher – décoder – exécuter*
- **Distinguer** RAM, ROM et mémoire cache
- **Comparer** un disque dur mécanique (HDD) et un SSD
- **Relier** un programme écrit par un humain (pseudo-code, Python) à ce que le processeur exécute (langage machine)

**Parties du TP :** Partie A – Identifier les composants · Partie B – Mémoires et stockage · Partie C – La machine papier : exécuter un programme à la main · Partie D – Du pseudo-code au langage machine

**Compétences :**

- **B1.1** – Gérer le patrimoine informatique : J'ai recensé et identifié les composants et les connecteurs d'une machine réelle

## S02 – Unités, débits et analyse d'un poste de travail

**Vu en classe :**

- **Convertir** des tailles (octets, Ko/Kio…) et expliquer l'écart entre le décimal et le binaire
- **Convertir** des débits (bit/s, octet/s) et **calculer** un temps de transfert
- **Repérer le maillon le plus lent** d'une chaîne (disque, réseau)
- **Relever** les caractéristiques du processeur, de la mémoire, du stockage, de la carte graphique et de la carte réseau d'un poste Windows, **en interface graphique et en ligne de commande**
- **Documenter** une commande : ce qu'elle fait, ce qu'elle affiche, comment la retrouver

**Parties du TP :** Partie A – Unités de stockage · Partie B – Débits et temps de transfert · Partie C – Analyser le poste · Partie D – Raccourcis clavier Windows (facultatif)

**Compétences :**

- **B1.1** – Gérer le patrimoine informatique : J'ai relevé et documenté les caractéristiques d'un poste
- **B2.3** – Exploiter, dépanner et superviser une solution d'infrastructure réseau : J'ai utilisé des commandes pour observer l'état d'un poste (processus, réseau)

## S03 – Processeurs, serveurs et choix d'un matériel

**Vu en classe :**

- **Lire** les caractéristiques d'un processeur (famille, génération, cœurs, threads, fréquence, cache, consommation)
- **Comparer** deux processeurs avec des **sources** (fiches constructeur, benchmarks) et expliquer pourquoi les GHz seuls ne suffisent pas
- **Proposer** une configuration par profil d'utilisateur, **dans un budget**, et la justifier
- **Distinguer** un poste de travail et un serveur (processeur, mémoire ECC, RAID, alimentation redondante, formats)
- **Expliquer** ce qu'est un serveur à deux processeurs et pourquoi la mémoire y est répartie (NUMA) — niveau découverte
- **Dimensionner** un serveur qui héberge plusieurs machines virtuelles (préparation de la virtualisation en S06)

**Parties du TP :** Partie A – Lire un processeur · Partie B – Appel d'offres · Partie C – Xeon contre Core · Partie D – Dimensionner un serveur de virtualisation · Partie E – Deux processeurs et NUMA (facultatif, ≈ 20 min)

**Compétences :**

- **B2.1** – Concevoir une solution d'infrastructure réseau : J'ai dimensionné un serveur à partir de besoins chiffrés
- **B1.1** – Gérer le patrimoine informatique : J'ai choisi un matériel selon des besoins, un budget et des sources

## S04 – Système d'exploitation, démarrage et prise en main de Windows

**Vu en classe :**

- **Expliquer** le rôle d'un système d'exploitation (matériel, fichiers, processus et mémoire, interface, sécurité)
- **Décrire** la séquence de démarrage (POST, firmware, chargeur d'amorçage, noyau, session)
- **Distinguer** BIOS et UEFI, MBR et GPT, et **constater** le mode de démarrage d'un poste réel
- **Expliquer** ce que changent les systèmes 32 bits et 64 bits
- **Utiliser** les outils d'observation de Windows (gestionnaire des tâches, services, observateur d'événements) en graphique et en PowerShell
- **Contrôler** l'état de protection d'un poste (mises à jour, antivirus, pare-feu, chiffrement, droits) et formuler une **recommandation**
- **Distinguer** logiciel libre, gratuit et payant, et lire une licence

**Parties du TP :** Partie A – Rôle de l'OS et 32 / 64 bits · Partie B – Le démarrage du poste · Partie C – Les outils de Windows · Partie D – Contrôler la protection du poste · Partie E – Libre, gratuit, payant

**Compétences :**

- **B3.3** – Sécuriser les équipements et les usages des utilisateurs : J'ai contrôlé l'état de protection d'un poste et formulé des recommandations
- **B2.3** – Exploiter, dépanner et superviser une solution d'infrastructure réseau : J'ai observé processus, services et journaux avec des outils graphiques et en PowerShell

## S05 – Découvrir Linux

**Vu en classe :**

- **Situer** dans le temps les jalons d'Unix, de GNU/Linux, d'Internet et du Web
- **Distinguer** le **noyau** Linux d'une **distribution** et d'un **environnement de bureau**
- **Présenter** les grandes familles de distributions (Debian, Red Hat) et leur **gestionnaire de paquets**
- **Choisir** un système d'exploitation pour un besoin donné, en **justifiant** par des critères
- **Comparer** Windows et Linux (organisation des fichiers, droits, installation de logiciels, ligne de commande)
- **Effectuer** une courte **veille** documentée sur un enjeu actuel (énergie, quantique, sécurité du système)

**Parties du TP :** Partie A – La frise des jalons · Partie B – Fiches de distributions · Partie C – Choisir un système pour six situations · Partie D – Windows et Linux côte à côte · Partie E – Veille : une question au choix

**Compétences :**

- **B2.1** – Concevoir une solution d'infrastructure réseau : J'ai choisi un système d'exploitation par situation, avec critères et alternative écartée
- **B1.6** – Organiser son développement professionnel : J'ai fait une veille avec des sources datées et reformulé

## S06 – Virtualisation : hyperviseurs et premières machines virtuelles

**Vu en classe :**

- **Définir** virtualisation, hyperviseur et machine virtuelle, et dire d'où viennent les ressources d'une VM
- **Distinguer** un hyperviseur de type 1 et de type 2, et la virtualisation de l'émulation et de la conteneurisation
- **Citer** les deux façons d'obtenir une VM (ISO ou OVA/OVF)
- **Créer** une machine virtuelle dans VirtualBox avec une configuration imposée et **installer** un système depuis une ISO
- **Observer** l'effet d'une VM sur les ressources de la machine hôte
- **Refaire seul** la démarche avec un autre système (Ubuntu LTS)

**Parties du TP :** Partie A – Activité de découverte · Partie B – Créer la machine virtuelle Windows · Partie C – Créer l'ISO Windows, si nécessaire · Partie D – Installer le système · Partie E – Analyser l'environnement · Partie F – Refaire seul : une VM Ubuntu LTS

**Compétences :**

- **B2.1** – Concevoir une solution d'infrastructure réseau : J'ai justifié le choix d'un type d'hyperviseur et du mode réseau selon un contexte
- **B2.2** – Installer, tester et déployer une solution d'infrastructure réseau : J'ai créé une VM, installé un système depuis une ISO et refait la démarche seul

## S07 – Virtualisation avancée : réseau, snapshots et fonctionnalités de l'hyperviseur

**Vu en classe :**

- **Importer** une VM depuis un fichier OVA
- **Créer et restaurer un snapshot**, et expliquer pourquoi ce n'est **pas une sauvegarde**
- **Installer** les Guest Additions sur Windows et sur Linux
- **Choisir** le mode réseau adapté (NAT, Réseau NAT, Réseau interne, Accès par pont) selon le besoin
- **Configurer** une adresse IP manuelle et **tester** la communication avec `ping`
- **Déduire** des tests les communications possibles dans chaque mode

**Parties du TP :** Partie A – Activité de découverte · Partie B – Préparer les environnements · Partie C – Le snapshot · Partie D – Les Guest Additions · Partie E – Faire communiquer les VM

**Compétences :**

- **B2.2** – Installer, tester et déployer une solution d'infrastructure réseau : J'ai importé des VM, installé les Guest Additions, configuré des adresses IP et testé les communications
- **B2.3** – Exploiter, dépanner et superviser une solution d'infrastructure réseau : J'ai pris et restauré un snapshot, et j'ai diagnostiqué un `ping` sans réponse

## S08 – Terminal Linux : les commandes de base

**Vu en classe :**

- **Se repérer** dans le terminal : lire le prompt, savoir où il est (`pwd`), ce qu'il y a (`ls`), se déplacer (`cd`) avec un chemin absolu ou relatif
- **Observer** la machine : espace disque (`df`, `du`), mémoire (`free`), date (`date`), historique des commandes
- **Créer, copier, déplacer, renommer et supprimer** des dossiers et des fichiers
- **Utiliser `sudo`** et expliquer la différence avec une session `root`
- **Construire une arborescence** de dossiers partagés (`/var/partage`) en un minimum de commandes
- **Chercher de l'aide** par lui-même (`--help`, `man`) avant de demander

**Parties du TP :** Partie A – Préparer l'environnement · Partie B – Observer la machine · Partie C – Se déplacer, créer, supprimer · Partie D – Construire l'arborescence de JackCelair · Partie E – Pour aller plus vite (facultatif) · Partie F – Automatiser la préparation (facultatif, étudiants rapides)

**Compétences :**

- **B2.2** – Installer, tester et déployer une solution d'infrastructure réseau : J'ai préparé une VM Debian et construit l'arborescence demandée
- **B2.3** – Exploiter, dépanner et superviser une solution d'infrastructure réseau : J'ai observé la machine (`df`, `du`, `free`) et repéré une erreur de permission
- **B1.5** – Mettre à disposition des utilisateurs un service informatique : J'ai créé les dossiers de partage (les droits viendront en S09)

## S09 – Terminal Linux : utilisateurs, droits et liens

**Vu en classe :**

- **Créer** un utilisateur et un groupe, **ajouter** un utilisateur à un groupe, et **vérifier** avec `id`
- **Lire** la sortie de `ls -l` : type, droits, propriétaire, groupe
- **Modifier** les droits (`chmod`, en notation symbolique et en octal) et le propriétaire (`chown`, `chgrp`)
- **Créer et distinguer** un lien dur et un lien symbolique, et prévoir leur comportement après un déplacement
- **Afficher** un fichier entier ou page par page (`cat`, `less`)
- **Appliquer** des habilitations par service sur l'arborescence de JackCelair, puis **les tester** avec de vrais comptes

**Parties du TP :** Partie A – Utilisateurs et groupes · Partie B – L'arborescence `CommandesLinux` · Partie C – Les liens · Partie D – Lire et modifier les droits · Partie E – Les habilitations de JackCelair · Partie F – Hygiène numérique : mots de passe, double authentification, hameçonnage

**Compétences :**

- **B1.5** – Mettre à disposition des utilisateurs un service informatique : J'ai rendu les dossiers de partage utilisables par les bons services
- **B2.2** – Installer, tester et déployer une solution d'infrastructure réseau : J'ai créé comptes et groupes et configuré les droits
- **B3.3** – Sécuriser les équipements et les usages des utilisateurs : J'ai limité l'accès de chaque service à son dossier et testé la politique

## S10 – Terminal Linux : paquets et premiers scripts Bash

**Vu en classe :**

- **Installer, mettre à jour, rechercher et supprimer** un paquet avec `apt`, et expliquer ce qu'est un dépôt et une dépendance
- **Écrire** un script Bash avec shebang, variables, arguments, condition (`if`) et boucle (`for`)
- **Rendre un script exécutable** et le lancer
- **Écrire un script relançable** (idempotent), qui gère le cas où le travail est déjà fait
- **Gérer une erreur** : message clair et arrêt propre
- **Utiliser l'IA pour comprendre** et non pour produire, en gardant la trace de ses échanges

**Parties du TP :** Partie A – Gérer des paquets avec `apt` · Partie B – Mon premier script · Partie C – Tester et répéter · Partie D – Le script de création de l'arborescence · Partie E – Pour aller plus loin (facultatif)

**Compétences :**

- **B2.2** – Installer, tester et déployer une solution d'infrastructure réseau : J'ai installé un paquet avec `apt` et automatisé la création d'une arborescence par un script relançable
- **B2.3** – Exploiter, dépanner et superviser une solution d'infrastructure réseau : J'ai simulé une mise à jour, testé une erreur et diagnostiqué un script avec `bash -n` et `bash -x`

## S11 – Conteneurs avec DockerLab

**Vu en classe :**

- **Comparer** une machine virtuelle et un conteneur (noyau, poids, démarrage, isolation)
- **Distinguer** image, conteneur, registre et tag
- **Piloter** le cycle de vie d'un conteneur (`run`, `ps`, `logs`, `stop`, `start`, `rm`)
- **Publier un port** et **configurer** un conteneur avec des variables d'environnement
- **Conserver des données** avec un **volume** et le démontrer
- **Relier** des conteneurs par un **réseau** et les joindre **par leur nom**
- **Diagnostiquer** un conteneur en panne (`ps -a`, `logs`, `inspect`, code de sortie)
- **Déployer** un petit service complet (site + base de données) et **prouver** qu'il fonctionne

**Parties du TP :** Partie A – Première rencontre avec Docker · Partie B – Le cycle de vie d'un conteneur · Partie C – Ports et variables d'environnement · Partie D – Volumes : garder ses données · Partie E – Mission : le site et la base de JackCelair · Partie F – La preuve réelle : Docker dans une VM Debian · Partie G – Ta première fiche de réalisation

**Compétences :**

- **B2.2** – Installer, tester et déployer une solution d'infrastructure réseau : J'ai déployé un site et une base dans des conteneurs, avec réseau et volumes
- **B2.3** – Exploiter, dépanner et superviser une solution d'infrastructure réseau : J'ai diagnostiqué un conteneur en panne (`ps -a`, `logs`, `inspect`)
- **B1.5** – Mettre à disposition des utilisateurs un service informatique : J'ai rendu le site accessible sans exposer la base

## S12 – Patrimoine informatique et inventaire

**Vu en classe :**

- **Définir** le patrimoine informatique et la notion d'**élément de configuration** (CI)
- **Concevoir** une fiche d'inventaire (attributs, identifiant unique, cycle de vie)
- **Inventorier** à la main un petit parc et **justifier** ses choix
- **Chiffrer** le coût d'un inventaire manuel et le comparer à un inventaire automatisé
- **Contrôler la qualité** d'un inventaire (doublons, champs vides, formats, états incohérents), avec un tableur **ou** des commandes Linux
- **Expliquer** les enjeux de **données personnelles** d'un inventaire et le rôle de la **charte informatique**
- **Comparer** quelques outils d'inventaire (agent, sans agent) et choisir selon un contexte

**Parties du TP :** Partie A – Concevoir la fiche d'inventaire · Partie B – Inventorier la salle · Partie C – Chiffrer l'inventaire manuel · Partie D – Dans InfraLab : découvrir, identifier, compléter · Partie E – Contrôler la qualité d'un inventaire · Partie F – Données personnelles et choix d'un outil · Partie G – Le registre des traitements construit à partir de l'inventaire

**Compétences :**

- **B1.1** – Gérer le patrimoine informatique : J'ai conçu une fiche d'inventaire, relevé des équipements, complété des fiches dans InfraLab et contrôlé la qualité d'un inventaire
- **B3.1** – Protéger les données à caractère personnel : J'ai identifié les données personnelles d'un inventaire et expliqué comment les encadrer

## S13 – Installer GLPI et inventorier avec l'agent

**Vu en classe :**

- **Décrire** l'architecture de GLPI (navigateur, serveur Web et PHP, base de données)
- **Installer** GLPI sur une VM Debian (Apache, PHP, MariaDB), en s'appuyant sur la **documentation officielle**
- **Sécuriser** une installation de base (mot de passe de la base, comptes par défaut)
- **Activer l'inventaire** dans GLPI et **installer l'agent GLPI** sur un poste Windows
- **Vérifier** qu'un poste remonte et **comparer** l'inventaire automatique à une fiche manuelle
- **Diagnostiquer** un poste qui ne remonte pas (réseau, URL, journaux)
- **Situer** la variante **OCS Inventory NG** et la différence avec l'agent GLPI

**Parties du TP :** Partie A – Dans InfraLab : l'agent et ses pannes · Partie B – Préparer les machines · Partie C – Installer GLPI · Partie D – Activer l'inventaire et installer l'agent · Partie E – Comparer et faire le lien avec InfraLab

**Compétences :**

- **B2.2** – Installer, tester et déployer une solution d'infrastructure réseau : J'ai installé GLPI, déployé l'agent sur un poste et testé le résultat avec un plan de tests
- **B1.1** – Gérer le patrimoine informatique : J'ai distingué découverte et agent dans InfraLab, fait remonter un poste dans GLPI et comparé avec ma fiche manuelle

## S14 – Exploiter le parc dans GLPI

**Vu en classe :**

- **Se repérer** dans l'interface de GLPI (menus, fiche d'un équipement, historique)
- **Compléter** la CMDB avec des équipements non inventoriables automatiquement (imprimante, écran, commutateur)
- **Organiser** les accès : entités, utilisateurs, groupes, profils, et **tester** ce que voit chaque profil
- **Suivre** les logiciels installés et les licences
- **Sauvegarder** la base de GLPI et expliquer pourquoi
- **Produire** un rapport ou un tableau de bord et le **commenter**

**Parties du TP :** Partie A – Dans InfraLab : droits, CI, licences · Partie B – Transposer dans GLPI : parc et licences · Partie C – Transposer dans GLPI : profils, entités, droits · Partie D – Sauvegarder la base · Partie E – Rapport et commentaire (à la maison, ≈ 20 min)

**Compétences :**

- **B1.1** – Gérer le patrimoine informatique : J'ai distingué actif et CI et mesuré une conformité de licences dans InfraLab, complété la CMDB de GLPI, produit un rapport commenté
- **B3.1** – Protéger les données à caractère personnel : J'ai observé le moindre privilège dans InfraLab, limité les accès par profil et entité dans GLPI, testé les droits, sauvegardé la base

## S15 – ITIL : incidents, demandes et tickets

**Vu en classe :**

- **Distinguer** incident, problème, demande de service et changement
- **Fixer une priorité** à partir de l'impact et de l'urgence, avec une matrice
- **Rédiger** un ticket complet, exploitable par un autre technicien sans rappeler l'utilisateur
- **Décider** d'une escalade N1 vers N2 et la **justifier** (dans InfraLab)
- **Traiter** deux tickets dans GLPI (création, lien, affectation, suivis, escalade, résolution, clôture) après les avoir traités dans **InfraLab**
- **Mesurer** un temps de résolution et le comparer à un délai cible

**Parties du TP :** Partie A – Classer et prioriser · Partie B – Rédiger un ticket · Partie C – Dans InfraLab : prioriser, qualifier, escalader · Partie D – Transposer dans GLPI : deux tickets · Partie E – Jeu de rôle du technicien N1

**Compétences :**

- **B1.2** – Répondre aux incidents et aux demandes d'assistance et d'évolution : J'ai classé, priorisé, rédigé et traité des tickets dans InfraLab puis dans GLPI, jusqu'à la clôture, avec escalade justifiée
- **B1.1** – Gérer le patrimoine informatique : J'ai lié un ticket à un équipement dans InfraLab puis dans GLPI

## S16 – Résoudre des incidents avec InfraLab

**Vu en classe :**

- **Suivre** le cycle de vie complet d'un incident, de l'appel à la clôture
- **Diagnostiquer** avec une méthode : cinq questions, du plus simple au plus complexe
- **Distinguer** ce que l'**outil de gestion** connaît de ce que montre la **réalité** de l'infrastructure
- **Corréler** plusieurs tickets vers une **cause commune** avant d'intervenir
- **Documenter** une résolution (symptôme, cause, action, vérification) et en tirer une fiche de base de connaissances
- **Diagnostiquer** un poste Windows lent avec les outils du système

**Parties du TP :** Partie A – InfraLab, TP 16 « PC déconnecté » · Partie B – InfraLab, TP 18 « Switch en panne » · Partie C – InfraLab, TP 19 « Plusieurs utilisateurs impactés » · Partie D – Un poste Windows lent · Partie E – La preuve réelle : une panne détectée par une supervision

**Compétences :**

- **B1.2** – Répondre aux incidents et aux demandes d'assistance et d'évolution : J'ai qualifié, traité, documenté et clos des tickets, avec vérification auprès de l'utilisateur
- **B2.3** – Exploiter, dépanner et superviser une solution d'infrastructure réseau : J'ai remonté une panne à sa cause (équipement en amont) et rétabli le service
- **B3.4** – Garantir la disponibilité, l'intégrité et la confidentialité des services informatiques et des données de l'organisation face à des cyberattaques : J'ai mis en place une supervision de disponibilité et mesuré une indisponibilité

## S17 – Services, SLA et catalogue de services

**Vu en classe :**

- **Définir** un service, un SLA, un OLA et un contrat de sous-traitance, et les **distinguer**
- **Calculer** un délai ou une indisponibilité tolérée à partir d'un engagement
- **Piloter** un SLA : qualification rapide, prise en charge, suspension de l'horloge, résolution
- **Choisir** le calendrier d'un SLA (continu ou heures ouvrées) et en mesurer l'effet
- **Conduire** un incident majeur : priorité, rétablissement, communication
- **Rédiger** des fiches de service pour un catalogue et les relier aux éléments de la CMDB

**Parties du TP :** Partie A – InfraLab, TP 22 « SLA : tenir les délais » · Partie B – InfraLab, TP 41 « SLA : le week-end compte-t-il ? » · Partie C – InfraLab, TP 20 « Incident majeur » · Partie D – Le catalogue de services de JackCelair · Partie E – La preuve réelle : transposer dans GLPI · Partie F – La preuve réelle : la vitrine en ligne d'un service

**Compétences :**

- **B1.5** – Mettre à disposition des utilisateurs un service informatique : J'ai rédigé des fiches de catalogue avec engagements et éléments de configuration
- **B1.2** – Répondre aux incidents et aux demandes d'assistance et d'évolution : J'ai piloté des SLA et conduit un incident majeur
- **B1.3** – Développer la présence en ligne de l'organisation : J'ai audité une présence en ligne et publié une page conforme sur une VM

## S18 – Cloner et déployer des postes avec FOG

**Vu en classe :**

- **Expliquer** le principe du clonage : poste modèle, image, serveur de déploiement
- **Décrire** le démarrage réseau (PXE) : DHCP, TFTP, chargeur de démarrage
- **Installer** un serveur FOG sur un réseau isolé, en s'appuyant sur la **documentation officielle**
- **Capturer** l'image d'un poste modèle et la **déployer** sur un second poste
- **Identifier** ce qu'un clone a d'identique et qui doit être personnalisé (nom, identifiants, licences)
- **Relier** le déploiement au **cycle de vie** et à l'inventaire des équipements (InfraLab)

**Parties du TP :** Partie A – Préparer le réseau et installer le serveur · Partie B – Enregistrer et capturer le poste modèle · Partie C – Déployer sur le poste cible et vérifier les identités · Partie D – InfraLab, TP 30 « Réaffectation d'un poste » · Partie E – Écrire la procédure de remplacement d'un poste

**Compétences :**

- **B2.2** – Installer, tester et déployer une solution d'infrastructure réseau : J'ai installé un serveur de déploiement, capturé et déployé une image, testé le résultat
- **B1.1** – Gérer le patrimoine informatique : J'ai relié le poste déployé à son cycle de vie et à l'inventaire

## S19 – Automatiser les tâches d'administration

**Vu en classe :**

- **Justifier** l'automatisation d'une tâche (fréquence, erreurs, traçabilité) et **repérer** ce qu'il ne faut pas automatiser
- **Écrire** un script **robuste** : paramètres, contrôle des données, **idempotence**, mode d'essai, journal
- **Planifier** l'exécution d'un script avec `cron`
- **Décrire** une infrastructure dans un **fichier déclaratif** (Docker Compose) et la reproduire en une commande
- **Comparer** une démarche impérative (commandes) et une démarche déclarative (fichier)
- **Évaluer** les risques d'un script (droits, erreurs en masse, secrets)

**Parties du TP :** Partie A – Un script de création de comptes · Partie B – Planifier un rapport avec `cron` · Partie C – DockerLab : Compose en une commande · Partie D – La mission de S11 en un fichier · Partie E – Automatiser : quand, et jusqu'où ? · Partie F – La preuve réelle : administrer à distance avec SSH · Partie G – La preuve réelle : de ton script à un annuaire

**Compétences :**

- **B2.2** – Installer, tester et déployer une solution d'infrastructure réseau : J'ai écrit et testé un script, planifié une tâche et décrit un déploiement dans un fichier
- **B1.5** – Mettre à disposition des utilisateurs un service informatique : J'ai automatisé des demandes standard (comptes) en gardant la traçabilité
- **B2.3** – Exploiter, dépanner et superviser une solution d'infrastructure réseau : J'ai administré à distance (SSH) et exploité un annuaire
- **B3.3** – Sécuriser les équipements et les usages des utilisateurs : J'ai remplacé le mot de passe par une clé et évité les mots de passe en clair

## S20 – Sauvegarder et restaurer

**Vu en classe :**

- **Définir** sauvegarde, restauration, RPO, RTO, et la règle **3-2-1**
- **Distinguer** sauvegarde complète, différentielle et incrémentale, et **sauvegarde** et **snapshot**
- **Analyser** les besoins de sauvegarde d'un SI à partir de sa CMDB
- **Sauvegarder** des fichiers avec `tar` et `rsync`, et une **base de données** avec `mysqldump`
- **Tester une restauration** et en tirer un RTO et un RPO mesurés
- **Rédiger** un plan de sauvegarde cohérent avec des contraintes de sécurité et de protection des données

**Parties du TP :** Partie A – InfraLab : que faut-il sauvegarder à NovaTech ? · Partie B – Sauvegarder des fichiers et prouver la restauration · Partie C – Sauvegarder et restaurer la base de GLPI · Partie D – Le plan de sauvegarde de JackCelair · Partie E – Chiffrer une sauvegarde · Partie F – PCA et PRA : continuer, puis reprendre

**Compétences :**

- **B3.4** – Garantir la disponibilité, l'intégrité et la confidentialité des services informatiques et des données de l'organisation face à des cyberattaques : J'ai défini des objectifs, sauvegardé, restauré et vérifié, et rédigé un plan avec sécurité et protection des données
- **B2.3** – Exploiter, dépanner et superviser une solution d'infrastructure réseau : J'ai planifié et testé des sauvegardes sur un serveur
- **B1.1** – Gérer le patrimoine informatique : J'ai identifié les services et équipements à protéger à partir de la CMDB, et défini les objectifs de reprise

## S21 – Projet de synthèse et bilan

**Vu en classe :**

- **Mobiliser** ensemble inventaire, tickets, problèmes, changements, licences et habilitations dans une même situation (projet de synthèse)
- **Arbitrer** entre l'urgence (rétablir le service) et l'hygiène (inventaire, licences, comptes)
- **Constituer un dossier de preuves** : choisir, dater, contextualiser
- **Auto-évaluer** ses compétences avec honnêteté (non maîtrisé, maîtrise partielle, bonne maîtrise, excellente maîtrise) et **identifier** ses axes de progrès
- **Présenter oralement** une réalisation en cinq minutes, avec une preuve

**Parties du TP :** Partie A – Entraînement : InfraLab, TP 40 « Administrateur ITSM de NovaTech » · Partie B – Ta réalisation individuelle documentée · Partie C – Dossier de preuves, matrice et tableau de synthèse · Partie D – Entretien d'explicitation et recette, croisés · Partie E – Bilan de l'année

**Compétences :**

- **B1.1** – Gérer le patrimoine informatique : J'ai complété un inventaire, géré affectations et licences dans le projet de synthèse
- **B1.2** – Répondre aux incidents et aux demandes d'assistance et d'évolution : J'ai traité des tickets de la qualification à la clôture et regroupé la cause
- **B3.1** – Protéger les données à caractère personnel : J'ai limité les droits, vérifié mes preuves et masqué les données sensibles
- **B2.2** – Installer, tester et déployer une solution d'infrastructure réseau : J'ai réalisé et documenté une solution en environnement réel, avec une recette
- **B1.6** – Organiser son développement professionnel : J'ai tenu ma veille et fait le point sur mon parcours

## Synthèse par compétence

| Compétence | Séances |
|---|---|
| **B1.1** – Gérer le patrimoine informatique | S01, S02, S03, S12, S13, S14, S15, S18, S20, S21 |
| **B1.2** – Répondre aux incidents et aux demandes d'assistance et d'évolution | S15, S16, S17, S21 |
| **B1.3** – Développer la présence en ligne de l'organisation | S17 |
| **B1.4** – Travailler en mode projet | *pas de TP dédié* |
| **B1.5** – Mettre à disposition des utilisateurs un service informatique | S08, S09, S11, S17, S19 |
| **B1.6** – Organiser son développement professionnel | S05, S21 |
| **B2.1** – Concevoir une solution d'infrastructure réseau | S03, S05, S06 |
| **B2.2** – Installer, tester et déployer une solution d'infrastructure réseau | S06, S07, S08, S09, S10, S11, S13, S18, S19, S21 |
| **B2.3** – Exploiter, dépanner et superviser une solution d'infrastructure réseau | S02, S04, S07, S08, S10, S11, S16, S19, S20 |
| **B3.1** – Protéger les données à caractère personnel | S12, S14, S21 |
| **B3.2** – Préserver l'identité numérique de l'organisation | *pas de TP dédié* |
| **B3.3** – Sécuriser les équipements et les usages des utilisateurs | S04, S09, S19 |
| **B3.4** – Garantir la disponibilité, l'intégrité et la confidentialité des services informatiques et des données de l'organisation face à des cyberattaques | S16, S20 |
| **B3.5A** – Assurer la cybersécurité d'une infrastructure réseau, d'un système, d'un service | *pas de TP dédié* |

> [!NOTE]
> **B1.6** est aussi alimentée par la « ligne de veille » en fin de chaque TP et le [carnet de veille](carnet-veille.md). **B1.4** (travailler en mode projet) et **B3.2** (identité numérique) n'ont pas de TP dédié ; **B3.5A** (cybersécurité d'une infrastructure) n'est abordée qu'en périphérie (droits, SSH, chiffrement, hygiène numérique). Ces trois points sont des lacunes connues du programme actuel.
