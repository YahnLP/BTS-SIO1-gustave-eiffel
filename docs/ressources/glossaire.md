# Glossaire

Tous les mots techniques du cours, expliqués simplement. Dans les pages du site, **passe la souris sur un sigle** (BIOS, DHCP, RAID…) : sa définition s'affiche.

> [!NOTE]
> Un terme suivi de la mention **notion technique** dépasse le socle de première année : tu peux le laisser de côté. Les notions de réseau seront vues plus en détail **en cours de réseau** ; voir la fiche [minimum réseau](minimum-reseau.md).

La colonne « Vu en » indique la séance où le mot apparaît pour la première fois dans le cours.

| Terme | Sigle | Anglais | Définition | Vu en |
|---|---|---|---|---|
| **Accès mémoire non uniforme** | NUMA | *non-uniform memory access* | Dans un serveur à deux processeurs, chacun accède plus vite à sa propre mémoire qu'à celle de l'autre. | S03 |
| **Accord de niveau de service** | SLA | *service level agreement* | Engagement écrit sur la qualité d'un service (délais de prise en charge et de résolution, disponibilité). | S15 |
| **Accord de niveau opérationnel** | OLA | *operational level agreement* | Engagement entre équipes d'une même organisation. | S17 |
| **Administrateur système** | root |  | Compte tout-puissant sous Linux : il peut tout lire, tout modifier, tout supprimer. | S05 |
| **Adresse IP** | IP | *internet protocol* | Numéro qui identifie une machine sur un réseau (exemple : 192.168.1.20). Voir la fiche « minimum réseau ». | S07 |
| **Agent** |  | *agent* | Petit programme installé sur un poste pour remonter ses informations à un serveur. | S12 |
| **Annuaire** |  | *directory* | Base centralisée des comptes, groupes et machines d'une organisation. | S19 |
| **Annuaire de Microsoft** | AD | *Active Directory* | Annuaire utilisé dans les entreprises Windows. Notion technique. | S19 |
| **Appliance virtuelle** | OVA | *open virtualization appliance* | Fichier unique contenant une machine virtuelle toute prête, à importer. | S06 |
| **Arborescence** |  | *directory tree* | L'organisation des dossiers en arbre, à partir d'une racine unique. | S08 |
| **Attribution automatique d'adresses** | DHCP | *dynamic host configuration protocol* | Service qui donne automatiquement une adresse IP aux machines qui se connectent. Vu en cours de réseau. | S07 |
| **Base de connaissances** |  | *knowledge base* | Recueil des solutions déjà trouvées, pour traiter plus vite les incidents semblables. | S16 |
| **Base de données** |  | *database* | Programme qui stocke et retrouve des données organisées en tables (MariaDB). | S13 |
| **Base de gestion des configurations** | CMDB | *configuration management database* | Base de données qui décrit les éléments du parc et les liens entre eux. | S12 |
| **Benchmark** |  | *benchmark* | Test standardisé qui note les performances d'un matériel pour le comparer. | S03 |
| **Bibliothèque d'infrastructure des technologies de l'information** | ITIL | *information technology infrastructure library* | Ensemble de bonnes pratiques pour organiser un service informatique. | S15 |
| **Bit** |  | *bit* | La plus petite information : 0 ou 1. | S02 |
| **Boucle** |  | *loop* | Instruction qui répète des commandes pour chaque élément d'une liste. | S10 |
| **Bus** |  | *bus* | Ensemble de fils qui transportent les données entre les composants. | S01 |
| **Bus d'extension PCIe** | PCIe | *PCI Express* | Bus rapide pour brancher des cartes (graphique, réseau) et des SSD NVMe. | S01 |
| **Carte graphique** | GPU | *graphics processing unit* | Composant spécialisé dans le calcul d'images. | S01 |
| **Carte mère** |  | *motherboard* | La grande carte sur laquelle tous les composants sont branchés. | S01 |
| **Centre de services** |  | *service desk* | Point d'entrée unique des utilisateurs pour leurs demandes et incidents. | S15 |
| **Chaîne de disques** |  | *disk chain* | Suite de fichiers disque créés par les instantanés successifs : trop longue, elle ralentit la VM. | S07 |
| **Changement** |  | *change* | Modification planifiée de l'infrastructure, avec évaluation du risque. | S15 |
| **Chemin absolu** |  | *absolute path* | Adresse complète d'un fichier, qui part de la racine (/var/partage/x). | S08 |
| **Chemin relatif** |  | *relative path* | Adresse d'un fichier qui part du dossier où l'on se trouve. | S08 |
| **Chiffrement** |  | *encryption* | Rendre des données illisibles sans la clé. | S20 |
| **Clé publique et clé privée** |  | *public / private key* | Paire de clés : celle que l'on partage et celle que l'on garde secrète ; ce que l'une chiffre, seule l'autre le déchiffre. | S19 |
| **Clonage** |  | *cloning* | Copier à l'identique un disque ou un système sur d'autres machines. | S18 |
| **Code de retour** |  | *exit code* | Nombre rendu par une commande à la fin : 0 si tout s'est bien passé, autre chose en cas d'erreur. | S10 |
| **Commission nationale de l'informatique et des libertés** | CNIL |  | Autorité française qui contrôle l'application du RGPD. | S12 |
| **Connexion sécurisée à distance** | SSH | *secure shell* | Prendre le contrôle d'un terminal sur une autre machine, par une connexion chiffrée. | S19 |
| **Conteneur** |  | *container* | Une application emballée avec ce dont elle a besoin et isolée du reste, sans système complet ; plus léger qu'une VM. | S06 |
| **Contrôle de compte d'utilisateur** | UAC | *user account control* | Fenêtre de Windows qui demande une confirmation avant une action d'administrateur. | S04 |
| **Cœur** |  | *core* | Un « petit processeur » dans le processeur : plus de cœurs permettent de faire plusieurs choses en même temps. | S03 |
| **Débit** |  | *throughput* | Quantité de données transmises par seconde (en bits par seconde pour un réseau). | S02 |
| **Demande de service** |  | *service request* | Demande prévue et courante (créer un compte, installer un logiciel) : ce n'est pas une panne. | S15 |
| **Démarrage par le réseau** | PXE | *preboot execution environment* | Une machine démarre en allant chercher son système sur le réseau au lieu d'un disque. | S18 |
| **Disponibilité** |  | *availability* | Part du temps pendant lequel le service est utilisable, en pourcentage. | S17 |
| **Disque dur** | HDD | *hard disk drive* | Stockage à plateaux tournants : grand, peu cher, assez lent. | S01 |
| **Disque SSD** | SSD | *solid state drive* | Stockage sans pièce mobile (mémoire flash) : plus rapide et plus résistant aux chocs qu'un disque dur. | S01 |
| **Distribution** |  | *distribution* | Un système Linux complet prêt à installer : noyau, outils et logiciels réunis (Debian, Ubuntu…). | S05 |
| **Donnée personnelle** |  | *personal data* | Toute information qui permet d'identifier une personne (nom, adresse, identifiant, adresse IP). | S12 |
| **Droits** |  | *permissions* | Ce qu'un utilisateur a le droit de faire avec un fichier : lire (r), écrire (w), exécuter (x). | S09 |
| **Durée maximale d'interruption admise** | RTO | *recovery time objective* | Le temps maximum acceptable pour remettre le service en marche après une panne. | S20 |
| **Élément de configuration** | CI | *configuration item* | Un élément décrit dans la CMDB : poste, serveur, logiciel, service. | S12 |
| **Empreinte** |  | *hash* | Valeur calculée à partir d'un fichier : si le fichier change, l'empreinte change. Sert à vérifier qu'une copie est intacte. | S20 |
| **Émulation** |  | *emulation* | Imiter par logiciel un matériel différent ; plus lent que la virtualisation. | S06 |
| **Entité** |  | *entity* | Dans GLPI : une division de l'organisation (site, service) qui cloisonne les données. | S14 |
| **Entretien d'explicitation** |  |  | Échange avec le jury où tu expliques ce que tu as fait et pourquoi. | S21 |
| **Extensions invité** |  | *Guest Additions* | Logiciels installés dans la VM pour améliorer l'affichage, le presse-papiers et les dossiers partagés. | S07 |
| **Fichier de configuration YAML** | YAML |  | Format de texte où l'on décrit une configuration avec des retraits. Notion technique. | S19 |
| **Fréquence** |  | *clock speed* | Nombre de cycles par seconde d'un processeur, en gigahertz (GHz). Ne suffit pas à comparer deux processeurs. | S03 |
| **Gestion libre de parc informatique** | GLPI |  | Logiciel libre de gestion de parc et d'assistance (tickets). | S13 |
| **Gigahertz** | GHz |  | Un milliard de cycles par seconde. | S03 |
| **Grappe de disques** | RAID | *redundant array of independent disks* | Plusieurs disques utilisés ensemble pour gagner en vitesse et/ou résister à la panne d'un disque. Ce n'est pas une sauvegarde. | S03 |
| **Groupe** |  | *group* | Ensemble d'utilisateurs auxquels on donne les mêmes droits. | S09 |
| **Hôte** |  | *host* | L'ordinateur réel qui fait tourner les machines virtuelles. | S06 |
| **Hyperviseur** |  | *hypervisor* | Le logiciel qui crée et fait tourner les machines virtuelles (VirtualBox, VMware, Proxmox). | S06 |
| **Image** |  | *image* | Le modèle figé à partir duquel on lance un conteneur (comme un moule). | S11 |
| **Image disque ISO** | ISO |  | Un fichier qui contient le contenu d'un DVD d'installation. | S06 |
| **Image maîtresse** |  | *golden image* | Poste de référence correctement installé, copié ensuite sur d'autres postes. | S18 |
| **Impact** |  | *impact* | Combien de personnes ou d'activités sont touchées par l'incident. | S15 |
| **Incident** |  | *incident* | Interruption ou dégradation d'un service ; on veut le rétablir vite. | S15 |
| **Instantané** |  | *snapshot* | Photographie de l'état d'une VM à un instant pour pouvoir y revenir. Ce n'est pas une sauvegarde. | S07 |
| **Interface de gestion Windows** | WMI | *Windows management instrumentation* | Façon d'interroger à distance un poste Windows. Notion technique. | S12 |
| **Interface de stockage NVMe** | NVMe |  | Connexion rapide pour SSD, branchée directement sur le bus PCIe. | S01 |
| **Interface de stockage SATA** | SATA |  | Type de connexion classique entre un disque et la carte mère. | S01 |
| **Interface graphique** | GUI | *graphical user interface* | On commande avec la souris, des fenêtres et des icônes. | S04 |
| **Inventaire** |  | *inventory* | La liste à jour de ce que possède l'organisation, avec ses caractéristiques. | S12 |
| **Invité** |  | *guest* | Le système installé dans une machine virtuelle. | S06 |
| **Licence publique générale** | GPL | *general public license* | Licence libre qui impose de redistribuer sous la même licence les versions modifiées. | S05 |
| **Lien symbolique** |  | *symbolic link* | Raccourci vers un autre fichier ou dossier. | S09 |
| **Ligne de commande** | CLI | *command line interface* | On commande en tapant du texte dans un terminal. | S04 |
| **Logiciel** |  | *software* | Un programme : des instructions qui disent à la machine quoi faire. | S01 |
| **Logiciel libre** |  | *free software* | Logiciel dont on peut lire le code, modifier et redistribuer ; libre ne veut pas dire gratuit. | S05 |
| **Machine virtuelle** | VM | *virtual machine* | Un ordinateur simulé par un logiciel, qui tourne dans une fenêtre de l'ordinateur réel. | S06 |
| **Masque de création de droits** |  | *umask* | Réglage qui détermine les droits donnés par défaut aux nouveaux fichiers. Notion technique. | S09 |
| **Matériel** |  | *hardware* | Les pièces physiques d'un ordinateur que l'on peut toucher. | S01 |
| **Mémoire à correction d'erreurs** | ECC | *error correcting code* | Mémoire de serveur qui détecte et corrige certaines erreurs. | S03 |
| **Mémoire vive** | RAM | *random access memory* | Mémoire rapide où l'ordinateur place ce qu'il utilise en ce moment ; elle se vide quand on éteint. | S01 |
| **Micrologiciel de démarrage** | BIOS | *basic input output system* | Programme inscrit sur la carte mère qui démarre la machine avant le système ; ancienne génération. | S01 |
| **Micrologiciel de démarrage moderne** | UEFI | *unified extensible firmware interface* | Remplaçant moderne du BIOS : démarrage plus rapide, disques de grande taille, démarrage sécurisé. | S01 |
| **Module de plateforme de confiance** | TPM | *trusted platform module* | Puce de sécurité qui stocke des clés de chiffrement ; exigée par Windows 11. | S04 |
| **Noyau** |  | *kernel* | Le cœur du système d'exploitation : il gère le matériel, la mémoire et les programmes. | S04 |
| **Octet** |  | *byte* | Un groupe de 8 bits ; l'unité de la taille des fichiers. | S02 |
| **Paquet** |  | *package* | Un logiciel emballé avec ses informations, installé par le gestionnaire de paquets. | S05 |
| **Partition** |  | *partition* | Une portion d'un disque, traitée comme un disque à part. | S04 |
| **Patrimoine informatique** |  | *IT assets* | L'ensemble des équipements, logiciels et licences d'une organisation. | S12 |
| **Perte de données maximale admise** | RPO | *recovery point objective* | La quantité de données (exprimée en temps) que l'on accepte de perdre. | S20 |
| **Pilote** |  | *driver* | Petit logiciel qui apprend au système à utiliser un matériel. | S01 |
| **Ping** |  | *ping* | Commande qui teste si une machine répond sur le réseau. | S07 |
| **Plan de continuité d'activité** | PCA |  | Organisation qui permet à l'activité de continuer malgré un sinistre. Notion technique. | S20 |
| **Plan de reprise d'activité** | PRA |  | Organisation qui permet de relancer l'activité après un sinistre. Notion technique. | S20 |
| **Port** |  | *port* | Numéro qui désigne un service sur une machine (80 pour le web, 22 pour SSH). Voir la fiche « minimum réseau ». | S11 |
| **Portfolio** |  | *portfolio* | Dossier numérique qui rassemble les preuves de tes compétences. | S21 |
| **Priorité** |  | *priority* | Calculée à partir de l'impact et de l'urgence ; elle fixe l'ordre de traitement. | S15 |
| **Problème** |  | *problem* | La cause de fond d'un ou plusieurs incidents ; on cherche à la supprimer. | S15 |
| **Processeur** | CPU | *central processing unit* | Le composant qui exécute les instructions des programmes. | S01 |
| **Profil** |  | *profile* | Dans GLPI : l'ensemble des droits d'un utilisateur (technicien, administrateur). | S14 |
| **Prompt** |  | *prompt* | Texte affiché avant le curseur dans le terminal (qui, sur quelle machine, dans quel dossier). | S08 |
| **Propriétaire** |  | *owner* | L'utilisateur auquel appartient un fichier ; il détermine qui est « utilisateur » dans les droits. | S09 |
| **Protocole d'annuaire** | LDAP | *lightweight directory access protocol* | Langage pour interroger un annuaire. Notion technique. | S19 |
| **Protocole de communication réseau** | TCP/IP |  | L'ensemble de règles de communication utilisé par Internet. Vu en cours de réseau. | S05 |
| **Protocole de supervision réseau** | SNMP | *simple network management protocol* | Permet d'interroger à distance un équipement réseau (imprimante, commutateur) sur son état. | S12 |
| **Racine** |  | *root directory* | Le dossier de départ de toute l'arborescence Linux, noté /. | S08 |
| **Recette** |  | *acceptance test* | Vérification que la réalisation fonctionne comme prévu, devant le jury. | S21 |
| **Redirection** |  | *redirection* | Envoyer le résultat d'une commande dans un fichier avec > (écrase) ou >> (ajoute à la fin). | S08 |
| **Redondance** |  | *redundancy* | Doubler un élément pour que la panne d'un seul ne stoppe pas le service. | S03 |
| **Registre** |  | *registry* | Le dépôt en ligne où l'on télécharge des images (Docker Hub). | S11 |
| **Règle 3-2-1** |  | *3-2-1 rule* | 3 copies, sur 2 supports différents, dont 1 hors du site. | S20 |
| **Règlement général sur la protection des données** | RGPD | *GDPR* | Loi européenne qui protège les données personnelles. | S12 |
| **Remplaçable à chaud** |  | *hot swap* | Qui se change sans éteindre la machine. | S03 |
| **Restauration** |  | *restore* | Remettre les données sauvegardées en place ; c'est elle qui prouve que la sauvegarde sert. | S20 |
| **Sauvegarde** |  | *backup* | Copie de données sur un autre support, pour pouvoir les restaurer. | S20 |
| **Script** |  | *script* | Fichier texte contenant des commandes qui s'exécutent à la suite. | S10 |
| **Serveur web** |  | *web server* | Programme qui envoie les pages aux navigateurs (nginx, Apache). | S11 |
| **Service** |  | *service* | Un résultat utile pour l'utilisateur (messagerie, impression), pas une machine. | S15 |
| **Shell** |  | *shell* | Le programme qui lit les commandes tapées dans le terminal et les exécute. Sous Debian : bash. | S04 |
| **Stratégie de groupe** | GPO | *group policy object* | Règles appliquées automatiquement aux comptes et aux postes Windows d'un domaine. Notion technique. | S19 |
| **Super-utilisateur temporaire** |  | *sudo* | Commande qui exécute une seule commande avec les droits de root, après confirmation par mot de passe. | S08 |
| **Supervision** |  | *monitoring* | Surveillance automatique de l'état des machines et services, avec alerte en cas de panne. | S16 |
| **Système d'exploitation** |  | *operating system* | Le logiciel principal qui fait le lien entre le matériel et les applications (Windows, Linux, macOS). | S04 |
| **Table de partition GPT** | GPT | *GUID partition table* | Façon moderne d'organiser un disque, utilisée avec l'UEFI : disques très grands, nombreuses partitions. | S04 |
| **Table de partition MBR** | MBR | *master boot record* | Ancienne façon d'organiser un disque : limitée à 2 To et 4 partitions principales. | S04 |
| **Tâche planifiée Linux** |  | *cron* | Service qui exécute une commande à heure fixe ou à intervalle régulier. | S19 |
| **Temps moyen de résolution** | MTTR | *mean time to repair* | Durée moyenne pour réparer une panne. | S15 |
| **Terminal** |  | *terminal* | Fenêtre où l'on tape des commandes. | S04 |
| **Ticket** |  | *ticket* | Fiche qui garde la trace d'un incident ou d'une demande, de son ouverture à sa clôture. | S15 |
| **Traduction d'adresses** | NAT | *network address translation* | Le routeur ou l'hôte fait passer les machines du réseau privé sur Internet avec sa propre adresse. Vu en cours de réseau. | S07 |
| **Tube** |  | *pipe* | Le symbole | : le résultat d'une commande devient l'entrée de la suivante. | S08 |
| **Urgence** |  | *urgency* | Rapidité avec laquelle l'incident doit être traité. | S15 |
| **Utilisateur** |  | *user* | Un compte qui identifie une personne ou un service sur le système. | S09 |
| **Variable** |  | *variable* | Nom qui désigne une valeur mémorisée par le script. | S10 |
| **Volume** |  | *volume* | Espace de stockage qui survit à la suppression du conteneur. | S11 |
