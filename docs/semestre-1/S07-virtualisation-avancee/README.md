# S07 – Virtualisation avancée : réseau, snapshots et fonctionnalités de l'hyperviseur

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S07 – semaine 07 (semestre 1) |
| **Durée** | 4 heures |
| **Prérequis** | [S06](../S06-virtualisation-premieres-vm/README.md) : créer et installer une VM dans VirtualBox ; notions d'adresse IP et de `ping` |
| **Matériel** | Poste avec VirtualBox, fichiers OVA Windows et Kali (fournis), accès au réseau du lycée |
| **Compétences travaillées** | B2.2 · B2.3 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Comment relier des machines virtuelles entre elles et avec l'extérieur, et comment revenir en arrière après une erreur sans tout réinstaller ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Importer** une VM depuis un fichier OVA ;
2. **Créer et restaurer un snapshot**, et expliquer pourquoi ce n'est **pas une sauvegarde** ;
3. **Installer** les Guest Additions sur Windows et sur Linux ;
4. **Choisir** le mode réseau adapté (NAT, Réseau NAT, Réseau interne, Accès par pont) selon le besoin ;
5. **Configurer** une adresse IP manuelle et **tester** la communication avec `ping` ;
6. **Déduire** des tests les communications possibles dans chaque mode.

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Modes réseau, snapshots et disque de différences, Guest Additions, stockage |
| [TP : relier des machines virtuelles](02-tp.md) | Import, snapshot, Guest Additions, tests réseau, bilan de compétences |
| [Aide-mémoire](03-aide-memoire.md) | Tableau des modes réseau, commandes de test, snapshots |
| [Plan d'adressage et de tests](tp/plan-adressage-et-tests.txt) | Adresses à utiliser et tableau de tests à compléter |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 45 | **Activité de découverte** : modes réseau, snapshots, stockage (TP partie A) | Binôme, recherche |
| 0 h 45 – 1 h 00 | **Partie B** : importer les VM Windows et Kali | Binôme |
| 1 h 00 – 1 h 25 | **Partie C** : créer et restaurer un snapshot | Binôme |
| 1 h 25 – 1 h 40 | Pause | |
| 1 h 40 – 2 h 10 | **Partie D** : Guest Additions (Windows et Kali) | Binôme |
| 2 h 10 – 3 h 30 | **Partie E** : faire communiquer les VM, mode par mode | Binôme |
| 3 h 30 – 3 h 45 | **Bilan de compétences** | Individuel |
| 3 h 45 – 4 h 00 | Marge, reprise des tests qui ont échoué | |

Les parties F à I (fonctionnalités avancées, accès au réseau de la salle, compléments de cours, situation professionnelle) sont à faire si le temps le permet, ou en travail personnel.

## Évaluation

- Compte rendu PDF avec captures d'écran, tests `ping` et explications, nommé `RENDU-CS1-TPVirtualisation2-VOTRENOM.pdf` (convention du support d'origine).
- Bilan de compétences rempli en fin de séance.

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Sources :** activité de découverte 2 (questions 1 à 18 et snapshots), TP « Virtualisation avancée » (étapes 1 à 24), trace écrite sections VIII et IX. L'ensemble dépasse 4 h (3 h 40 pour l'activité seule d'après le support, 3 h à 4 h pour le TP) : **le tri est ma proposition**. Les questions 1 à 6, 9, 10 et 14 de l'activité (paramètres généraux, mémoire, cœurs et threads, formats, systèmes de fichiers, OS Live), les fonctionnalités (copier-coller, glisser-déposer, dossier partagé) et l'accès au réseau de la salle sont déplacés en parties facultatives. À arbitrer.
- **Adressage du réseau interne :** le support d'origine ne donne pas d'adresses pour les étapes 16 à 19. J'ai repris l'exemple de la trace écrite : 192.168.100.1 (Windows) et 192.168.100.2 (Kali), masque 255.255.255.0.
- **Résultats attendus :** les cases du tableau de tests sont déduites de la trace écrite et ne sont **pas toutes vérifiées sur un poste**. En particulier, la communication entre la VM en mode NAT et l'hôte dépend de la version de VirtualBox et de la cible visée : à contrôler en salle avant de corriger.
- **Pare-feu Windows :** par défaut, Windows bloque en général les requêtes `ping` entrantes. Un `ping` sans réponse vers une VM ou un poste Windows ne prouve donc pas l'absence de liaison. Le TP le signale.
- **Guest Additions sous Kali :** la procédure d'origine (montage du CD puis `VBoxLinuxAdditions.run`) peut échouer si les outils de compilation et les en-têtes du noyau ne sont pas installés. À tester sur l'image OVA fournie.
- **Réseau NAT :** ce mode nécessite de créer un réseau NAT dans les préférences ou le gestionnaire de réseau de VirtualBox (l'emplacement varie selon la version). Le support d'origine ne le décrit pas : à préciser en salle.
- **Salle :** les noms de cartes (Realtek, TP-Link), le dossier `D:\MVORG` et l'adressage `10.[salle].[plot].[poste]` viennent du support d'origine et sont propres à la salle.
- **Compétences :** B2.2 et B2.3 sont une proposition à valider.
- **Corrigé :** `corriges/S07-virtualisation-avancee.md` (hors du site publié).

</details>
