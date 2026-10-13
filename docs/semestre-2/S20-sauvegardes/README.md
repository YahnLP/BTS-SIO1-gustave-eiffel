# S20 – Sauvegarder et restaurer

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S20 – semaine 20 (semestre 2) |
| **Durée** | 4 heures |
| **Prérequis** | Terminal et scripts Linux ([S08](../../semestre-1/S08-terminal-commandes-de-base/README.md) à [S10](../../semestre-1/S10-paquets-scripts-bash/README.md)) ; GLPI et sa base ([S13](../S13-glpi-installation-agent/README.md), [S14](../S14-glpi-exploiter-le-parc/README.md)) ; CMDB ([S12](../S12-patrimoine-inventaire/README.md)) ; automatisation ([S19](../S19-automatisation/README.md)) |
| **Matériel** | Une **VM Debian** ; la **VM GLPI** (snapshot `GLPI parc configuré`) ; un **second disque virtuel** ; un navigateur : **[InfraLab](https://yahnlp.github.io/InfraLab/)** (jeu de données « NovaTech complet ») |
| **Compétences travaillées** | B3.4 · B2.3 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Le disque du serveur est détruit ce soir. Qu'a-t-on perdu, en combien de temps remet-on le service en route, et comment le sait-on avant que cela arrive ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Définir** sauvegarde, restauration, RPO, RTO, et la règle **3-2-1** ;
2. **Distinguer** sauvegarde complète, différentielle et incrémentale, et **sauvegarde** et **snapshot** ;
3. **Analyser** les besoins de sauvegarde d'un SI à partir de sa CMDB ;
4. **Sauvegarder** des fichiers avec `tar` et `rsync`, et une **base de données** avec `mysqldump` ;
5. **Tester une restauration** et en tirer un RTO et un RPO mesurés ;
6. **Rédiger** un plan de sauvegarde cohérent avec des contraintes de sécurité et de protection des données.

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Principes, vocabulaire, règle 3-2-1, outils, risques |
| [TP : sauvegarder, restaurer, prouver](02-tp.md) | Analyse avec InfraLab, fichiers, base GLPI, plan, bilan |
| [Aide-mémoire](03-aide-memoire.md) | Commandes et définitions |
| [Analyse de sauvegarde](tp/analyse-sauvegarde.txt) | Tableau à remplir dans InfraLab |
| [Journal de restauration](tp/journal-restauration.txt) | Preuves des sauvegardes et du test |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 10 | **Accroche** : « Mon snapshot, c'est ma sauvegarde » : vrai ou faux ? | Débat |
| 0 h 10 – 0 h 40 | **Mini-cours** : vocabulaire, 3-2-1, méthodes, outils (cours §1 à §6) | Cours et questions |
| 0 h 40 – 1 h 10 | **TP partie A** : InfraLab, quoi sauvegarder à NovaTech ? | Binôme |
| 1 h 10 – 2 h 00 | **TP partie B** : fichiers avec `tar` et `rsync`, test de restauration | Binôme |
| 2 h 00 – 2 h 15 | Pause | |
| 2 h 15 – 2 h 55 | **TP partie C** : sauvegarder et restaurer la base de GLPI | Binôme |
| 2 h 55 – 3 h 40 | **TP partie D** : le plan de sauvegarde de JackCelair | Binôme |
| 3 h 40 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

## Évaluation

- Compte rendu PDF nommé `RENDU-S20-NOM.pdf` : tableau d'analyse, journal de restauration avec preuves, plan de sauvegarde, réponses.
- **Snapshot** de la VM GLPI nommé `GLPI sauvegardé` (et, pour la discussion, rappel : un snapshot n'est pas une sauvegarde).
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Sources :** aucun support d'origine pour cette séance. Elle s'appuie sur S14 (`mysqldump` de la base GLPI), S19 (scripts, `cron`) et sur **InfraLab** : le jeu de données « NovaTech complet » (4 sites, environ 45 équipements, une CMDB de services dont la facturation, le partage de fichiers, la messagerie et l'intranet RH, un NAS dans le datacenter, deux machines virtuelles sur un hôte). Le jeu de données est exploité **hors catalogue** : c'est un TP de lecture et de décision, à jouer en exploration libre (aucun objectif n'est vérifié par l'application).
- **Lecture de la CMDB :** les relations de NovaTech sont lues dans le code du jeu de données (dépôt consulté en octobre 2026) : facturation → logiciel de facturation → SRV-FACT ; partage de fichiers → SRV-FICHIERS ; intranet RH → application RH → HV-DC-01 ; messagerie → SRV-ITSM. **À vérifier à l'écran** avant la séance.
- **Commandes :** `tar`, `rsync`, `mysqldump`, `mysql` sont des commandes standard de Debian, **non exécutées** dans l'environnement de rédaction : à tester sur la VM de la salle. L'**emplacement des fichiers de GLPI** (configuration, documents) dépend de la version et de l'installation : ils sont à retrouver dans la documentation de la version installée (voir S13 et S14).
- **Second disque virtuel :** `lsblk` avant `mkfs` : le formatage détruit les données du disque désigné. À encadrer.
- **Définitions :** RPO, RTO, règle 3-2-1, types de sauvegarde : vocabulaire courant ; à confronter à la référence de la classe.
- **RGPD :** le plan évoque la durée de conservation et la présence de données personnelles dans les sauvegardes ; la mise en œuvre précise (droit à l'effacement et sauvegardes) n'est pas traitée et est signalée comme **à voir avec le délégué à la protection des données** de l'établissement.
- **Compétences :** B3.4 (« Garantir la disponibilité, l'intégrité et la confidentialité… ») est **de mémoire, à vérifier** dans le référentiel du dépôt ; B2.3 aussi. À valider.

</details>
