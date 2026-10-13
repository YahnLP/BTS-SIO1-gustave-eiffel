# S16 – Résoudre des incidents avec InfraLab

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S16 – semaine 16 (semestre 2) |
| **Durée** | 4 heures |
| **Prérequis** | Tickets et priorités ([S15](../S15-itil-incidents-tickets/README.md)) ; notion de CMDB ([S12](../S12-patrimoine-inventaire/README.md)) |
| **Matériel** | Un navigateur par étudiant : **[InfraLab](https://yahnlp.github.io/InfraLab/)** (aucune installation) ; pour la partie D, la VM cliente Windows de S06 |
| **Compétences travaillées** | B1.2 · B2.3 · B3.4 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Trois utilisateurs appellent : pas de réseau. Faut-il intervenir sur trois postes, ou chercher ce qu'ils ont en commun ? Et comment prouver, après coup, ce qu'on a fait ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Suivre** le cycle de vie complet d'un incident, de l'appel à la clôture ;
2. **Diagnostiquer** avec une méthode : cinq questions, du plus simple au plus complexe ;
3. **Distinguer** ce que l'**outil de gestion** connaît de ce que montre la **réalité** de l'infrastructure ;
4. **Corréler** plusieurs tickets vers une **cause commune** avant d'intervenir ;
5. **Documenter** une résolution (symptôme, cause, action, vérification) et en tirer une fiche de base de connaissances ;
6. **Diagnostiquer** un poste Windows lent avec les outils du système.

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Cycle de vie d'un incident, méthode de diagnostic, corrélation, connaissance |
| [TP : dépanner, corréler, documenter](02-tp.md) | Parties A à D autour des TP d'InfraLab et d'un poste Windows, bilan |
| [Aide-mémoire](03-aide-memoire.md) | Méthode et commandes de diagnostic |
| [Journal d'incident](tp/journal-incident.txt) | À remplir en temps réel |
| [Fiche de base de connaissances](tp/fiche-base-de-connaissances.txt) | Modèle de fiche |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 10 | **Accroche** : « Hors ligne » veut-il dire « éteint » ? | Discussion |
| 0 h 10 – 0 h 35 | **Mini-cours** : cycle de vie, méthode, corrélation (cours §1 à §4) | Cours et questions |
| 0 h 35 – 1 h 25 | **TP partie A** : InfraLab, TP 16 « PC déconnecté » | Binôme |
| 1 h 25 – 1 h 50 | **TP partie B** : InfraLab, TP 18 « Switch en panne » (remédiation ou plus rapides ; les autres avancent) | Binôme |
| 1 h 50 – 2 h 05 | Pause | |
| 2 h 05 – 3 h 05 | **TP partie C** : InfraLab, TP 19 « Plusieurs utilisateurs impactés » | Binôme |
| 3 h 05 – 3 h 40 | **TP partie D** : poste Windows lent, ticket et fiche de connaissance | Binôme |
| (suite) | **TP partie E** : supervision légère et panne provoquée sur VM (à caler sur les temps gagnés ; sinon reprise en début de S17) | Binôme |
| 3 h 40 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

## Évaluation

- Compte rendu PDF nommé `RENDU-S16-NOM.pdf` : les **comptes rendus exportés d'InfraLab** (TP 16, 18, 19), les journaux d'incident, la fiche de connaissance, les réponses.
- **Un fichier de travail** `.infralab.json` enregistré (le travail d'InfraLab reste dans le navigateur du poste).
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Choix :** la séance s'appuie sur **InfraLab** (version 1.2) : les TP 16, 18 et 19 du catalogue, dont le contenu et les vérifications viennent de l'application. Le support d'origine « ITIL – Suite » (cycle de vie, méthode de diagnostic, base de connaissances) et son TP de trois incidents Windows (imprimante, accès dossier, poste lent) fournissent le cadre méthodologique ; seul l'incident « poste lent » est conservé en partie D, car InfraLab ne couvre ni annuaire, ni droits de fichiers, ni GPO.
- **Non repris du TP d'origine :** l'incident « accès dossier refusé » (droits de partage et NTFS) suppose un serveur de fichiers et un annuaire ; il peut faire l'objet d'une séance Windows Server hors de cette séquence. L'incident « imprimante » s'appuie sur du matériel réel.
- **Autres TP InfraLab utiles :** TP 17 (serveur arrêté), 20 (incident majeur), 43 (arrêt d'un hyperviseur) : voir le [corrigé](https://github.com/YahnLP/BTS-SIO1-gustave-eiffel/blob/main/corriges/S16-resolution-incidents-infralab.md) pour le placement possible.
- **Commandes d'origine :** le support d'origine utilise `wmic`, outil **obsolète** dans les versions récentes de Windows (je pense qu'il est désactivé par défaut dans Windows 11 récent ; **à vérifier** sur la version de la salle). Le TP utilise **PowerShell**.
- **Poste lent :** l'incident doit être **préparé** sur la VM cliente (voir le corrigé) ; la préparation proposée n'a pas été testée.
- **Compétences :** codes et intitulés relus sur l'arrêté du 8 juillet 2024 ; le choix des compétences pour cette séance est une proposition de l'enseignant.
- **Licence d'InfraLab :** code sous EUPL 1.2 ; le nom et l'identité visuelle ne sont pas couverts (page d'accueil du projet).

</details>
