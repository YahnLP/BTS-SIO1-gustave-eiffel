# S17 – Services, SLA et catalogue de services

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S17 – semaine 17 (semestre 2) |
| **Durée** | 4 heures |
| **Prérequis** | Tickets, priorités ([S15](../S15-itil-incidents-tickets/README.md)) ; diagnostic et corrélation ([S16](../S16-resolution-incidents-infralab/README.md)) ; notion de CMDB ([S12](../S12-patrimoine-inventaire/README.md)) |
| **Matériel** | Un navigateur par étudiant : **[InfraLab](https://yahnlp.github.io/InfraLab/)** (aucune installation) ; papier ou traitement de texte pour la partie D |
| **Compétences travaillées** | B1.5 · B1.2 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Que promet-on exactement à un utilisateur, comment le mesure-t-on, et que se passe-t-il quand le week-end est compté, ou qu'un équipement central tombe ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Définir** un service, un SLA, un OLA et un contrat de sous-traitance, et les **distinguer** ;
2. **Calculer** un délai ou une indisponibilité tolérée à partir d'un engagement ;
3. **Piloter** un SLA : qualification rapide, prise en charge, suspension de l'horloge, résolution ;
4. **Choisir** le calendrier d'un SLA (continu ou heures ouvrées) et en mesurer l'effet ;
5. **Conduire** un incident majeur : priorité, rétablissement, communication ;
6. **Rédiger** des fiches de service pour un catalogue et les relier aux éléments de la CMDB.

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Service, catalogue, SLA, OLA, calendrier, disponibilité, incident majeur |
| [TP : promettre, mesurer, tenir](02-tp.md) | Parties A à D autour d'InfraLab et d'un catalogue, bilan |
| [Aide-mémoire](03-aide-memoire.md) | Définitions, calculs, structure d'une fiche de service |
| [Modèle de fiche de service](tp/modele-fiche-service.txt) | Pour la partie D |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 10 | **Accroche** : « Disponible 99,9 % », ça fait combien de minutes d'arrêt par mois ? | Calcul au tableau |
| 0 h 10 – 0 h 35 | **Mini-cours** : service, SLA, calendrier, incident majeur (cours §1 à §6) | Cours et questions |
| 0 h 35 – 1 h 15 | **TP partie A** : InfraLab, TP 22 « SLA : tenir les délais » | Binôme |
| 1 h 15 – 1 h 50 | **TP partie B** : InfraLab, TP 41 « SLA : le week-end compte-t-il ? » | Binôme |
| 1 h 50 – 2 h 05 | Pause | |
| 2 h 05 – 2 h 55 | **TP partie C** : InfraLab, TP 20 « Incident majeur » | Binôme |
| 2 h 55 – 3 h 40 | **TP partie D** : le catalogue de services de JackCelair | Binôme |
| 3 h 40 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

## Évaluation

- Compte rendu PDF nommé `RENDU-S17-NOM.pdf` : les **comptes rendus exportés d'InfraLab** (TP 22, 41, 20), les calculs, le catalogue (fiches de service), les réponses.
- **Un fichier de travail** `.infralab.json` enregistré.
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Sources :** aucun support d'origine pour cette séance. Elle s'appuie sur **InfraLab** (version 1.2) : TP 22, 41 et 20 du catalogue ; TP 21 (incident ou demande) et 17 / 43 en remédiation ou approfondissement. Les définitions ITIL (SLA, OLA, contrat de sous-traitance, catalogue de services) viennent du cours ITIL d'origine pour le SLA et de **mes connaissances** pour OLA et catalogue : **à vérifier** avec la référence ITIL utilisée en classe.
- **Calculs de la partie B :** l'échéance en heures ouvrées est **calculée à la main** dans le TP (calendrier lundi–vendredi, 8 h–18 h, comme dans InfraLab) puis **comparée** à l'application. Ma prévision (mercredi 11 h) suppose que « 24 h » se compte en heures **ouvrées** : à vérifier dans l'application avant la séance.
- **Pas de pénalités chiffrées** : le cours d'origine cite un exemple de réduction de facture à titre d'illustration ; il n'est pas repris comme règle.
- **Compétences :** B1.5 (« Mettre à disposition des utilisateurs un service informatique ») est confirmé par une page tierce selon le référentiel du dépôt ; B1.2 est de mémoire, à vérifier. À valider.
- **Licence d'InfraLab :** EUPL 1.2 pour le code ; le nom et l'identité visuelle ne sont pas couverts.

</details>
