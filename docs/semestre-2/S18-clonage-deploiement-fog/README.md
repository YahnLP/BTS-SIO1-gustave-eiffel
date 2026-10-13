# S18 – Cloner et déployer des postes avec FOG

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S18 – semaine 18 (semestre 2) |
| **Durée** | 4 heures |
| **Prérequis** | Virtualisation et réseaux internes VirtualBox ([S06](../../semestre-1/S06-virtualisation-premieres-vm/README.md), [S07](../../semestre-1/S07-virtualisation-avancee/README.md)) ; terminal et paquets Linux ([S08](../../semestre-1/S08-terminal-commandes-de-base/README.md) à [S10](../../semestre-1/S10-paquets-scripts-bash/README.md)) ; cycle de vie des équipements ([S12](../S12-patrimoine-inventaire/README.md)) |
| **Matériel** | VirtualBox ; **une VM serveur Debian vierge** (pas celle de GLPI) ; **une VM modèle** (Debian installée, petit disque) ; **une VM cible** vide ; un **réseau interne isolé** ; un navigateur ; **[InfraLab](https://yahnlp.github.io/InfraLab/)** pour la partie D |
| **Compétences travaillées** | B2.2 · B1.1 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Il faut installer 30 postes identiques avant lundi. Les installer un par un prend des semaines : comment en faire un, puis le copier, et que doit-on corriger sur chaque copie ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Expliquer** le principe du clonage : poste modèle, image, serveur de déploiement ;
2. **Décrire** le démarrage réseau (PXE) : DHCP, TFTP, chargeur de démarrage ;
3. **Installer** un serveur FOG sur un réseau isolé, en s'appuyant sur la **documentation officielle** ;
4. **Capturer** l'image d'un poste modèle et la **déployer** sur un second poste ;
5. **Identifier** ce qu'un clone a d'identique et qui doit être personnalisé (nom, identifiants, licences) ;
6. **Relier** le déploiement au **cycle de vie** et à l'inventaire des équipements (InfraLab).

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Clonage, PXE, FOG, bonnes pratiques et risques |
| [TP : un poste, puis des copies](02-tp.md) | Installer FOG, capturer, déployer, relier à l'inventaire, bilan |
| [Aide-mémoire](03-aide-memoire.md) | Principes et étapes de la séance |
| [Journal de déploiement](tp/journal-deploiement.txt) | Plan d'adressage, tests, chronométrage |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 10 | **Accroche** : 30 postes avant lundi : combien de temps, à la main ? | Calcul et discussion |
| 0 h 10 – 0 h 35 | **Mini-cours** : image, PXE, FOG, identités après clonage (cours §1 à §5) | Cours et questions |
| 0 h 35 – 1 h 30 | **TP partie A** : préparer le réseau isolé et installer le serveur FOG | Binôme |
| 1 h 30 – 1 h 45 | Pause | |
| 1 h 45 – 2 h 25 | **TP partie B** : enregistrer et capturer le poste modèle | Binôme |
| 2 h 25 – 2 h 55 | **TP partie C** : déployer sur le poste cible, vérifier les identités | Binôme |
| 2 h 55 – 3 h 40 | **TP partie D** : InfraLab, TP 30 « Réaffectation d'un poste » | Individuel |
| 3 h 40 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

## Évaluation

- Compte rendu PDF nommé `RENDU-S18-NOM.pdf` : journal de déploiement rempli avec captures, compte rendu exporté d'InfraLab (TP 30), réponses.
- **Snapshot** de la VM serveur nommé `FOG installé`.
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Sources :** aucun support d'origine pour cette séance. Elle s'appuie sur la **documentation officielle de FOG** (pages « capture an image », « deploy an image », prérequis, introduction) consultée à la rédaction, sur **InfraLab** (TP 30) et sur mes connaissances générales (PXE, DHCP). **Rien n'a été exécuté** : FOG n'a pas été installé ni testé ; les commandes d'installation et les questions de l'installeur sont reprises de la page officielle de FOG 1.6.
- **Version et documentation :** la documentation officielle présente plusieurs versions (1.5, 1.6) ; la page d'introduction consultée contient encore des éléments anciens (systèmes cités, antivirus). Les numéros de version de FOG et de Debian ne sont **pas figés** : les étudiants téléchargent la version stable indiquée par le projet. **Les prérequis** (système du serveur, 2 cœurs, 2 Go de mémoire, carte gigabit, 512 Mo sur les postes) sont ceux de la page officielle : **à confirmer** pour la version choisie.
- **Réseau :** FOG peut fournir le DHCP. **Ne jamais activer ce DHCP sur le réseau de l'établissement** : travailler sur un **réseau interne VirtualBox isolé** (voir S07). Le cours décrit le cas d'un DHCP existant (options de démarrage réseau).
- **Poste modèle Linux :** la documentation officielle prend l'exemple de Windows (avec `sysprep`, déchiffrement de BitLocker). Pour tenir en 4 heures, le TP clone un poste **Linux** ; l'exemple Windows reste dans le cours à titre d'extension. **À tester** : le clonage d'un Linux par FOG selon les options de l'image et du système de fichiers.
- **Démarrage réseau dans VirtualBox :** type de carte réseau, ordre de démarrage, BIOS ou UEFI : **à tester** (je pars du BIOS classique, la documentation indiquant un processus presque identique en UEFI).
- **Compte par défaut de l'interface :** à confirmer dans la documentation de la version installée et à **changer** (comme en S13).
- **Licence de FOG :** la documentation indique une licence GPL, sans préciser la version dans la page consultée : **à vérifier** avant d'afficher.
- **Questions de sécurité :** l'image contient les données du poste modèle (donc possiblement personnelles) ; le serveur de déploiement est un **point sensible** (qui modifie l'image modifie tous les futurs postes). Le cours les évoque.
- **Compétences :** B2.2 (confirmé par une page tierce selon le référentiel du dépôt) et B1.1 sont une proposition à valider.

</details>
