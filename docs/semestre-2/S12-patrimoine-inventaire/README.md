# S12 – Patrimoine informatique et inventaire

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S12 – semaine 12 (semestre 2) |
| **Durée** | 4 heures |
| **Prérequis** | [S02](../../semestre-1/S02-unites-debits-poste/README.md) (fiche d'identité d'un poste) ; terminal Linux ([S08](../../semestre-1/S08-terminal-commandes-de-base/README.md) à [S10](../../semestre-1/S10-paquets-scripts-bash/README.md)) |
| **Matériel** | Quelques équipements de la salle à inventorier (poste, écran, imprimante, switch…) ; un poste avec un **tableur** ou une **VM Debian** ; accès Internet pour **[InfraLab](https://yahnlp.github.io/InfraLab/)** (dans le navigateur, rien à installer) |
| **Compétences travaillées** | B1.1 · B3.1 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« En S02, tu as mis 30 à 45 minutes à décrire UN poste. Une entreprise en a 200. Que veut-on savoir sur chaque équipement, comment éviter que ces informations soient fausses, et qu'a-t-on le droit de collecter ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Définir** le patrimoine informatique et la notion d'**élément de configuration** (CI) ;
2. **Concevoir** une fiche d'inventaire (attributs, identifiant unique, cycle de vie) ;
3. **Inventorier** à la main un petit parc et **justifier** ses choix ;
   *puis, dans InfraLab, **distinguer** saisie, découverte et agent, **identifier** un actif et **compléter** la fiche d'un équipement sans agent ;*
4. **Chiffrer** le coût d'un inventaire manuel et le comparer à un inventaire automatisé ;
5. **Contrôler la qualité** d'un inventaire (doublons, champs vides, formats, états incohérents), avec un tableur **ou** des commandes Linux ;
6. **Expliquer** les enjeux de **données personnelles** d'un inventaire et le rôle de la **charte informatique** ;
7. **Comparer** quelques outils d'inventaire (agent, sans agent) et choisir selon un contexte.

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Patrimoine, CI, inventaire manuel et automatisé, qualité des données, RGPD, outils |
| [TP : l'inventaire de JackCelair](02-tp.md) | Fiche d'inventaire, inventaire de la salle, **InfraLab (TP 1, 4, 9)**, contrôle qualité, RGPD, choix d'outil, bilan |
| [Aide-mémoire](03-aide-memoire.md) | Attributs d'une fiche, commandes de contrôle, vocabulaire |
| [Extrait d'inventaire (CSV)](tp/inventaire-extrait.csv) | Un inventaire fictif de 18 équipements, à contrôler |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 10 | **Accroche** : 200 postes, 45 minutes chacun : combien de temps ? | Oral |
| 0 h 10 – 0 h 40 | **Mini-cours** : patrimoine, CI, cycle de vie, inventaire (cours §1 à §4) | Cours et questions |
| 0 h 40 – 1 h 05 | **TP partie A** : concevoir la fiche d'inventaire | Binôme |
| 1 h 05 – 1 h 25 | **TP partie B** : inventorier la salle (4 équipements) | Binôme |
| 1 h 25 – 1 h 35 | **TP partie C** : chiffrer l'inventaire manuel | Binôme |
| 1 h 35 – 1 h 50 | Pause | |
| 1 h 50 – 2 h 15 | **TP partie D1 (InfraLab)** : TP 1 « Découvrir le SI de NovaTech » | Binôme, navigateur |
| 2 h 15 – 2 h 45 | **TP partie D2 (InfraLab)** : TP 4 « Identifier un actif » | Binôme |
| 2 h 45 – 3 h 15 | **TP partie D3 (InfraLab)** : TP 9 « Équipement sans agent » (ou D4 pour les plus rapides) | Binôme |
| 3 h 15 – 3 h 40 | **Mini-cours** qualité (cours §5) puis **TP partie E** : contrôler un inventaire | Cours puis binôme |
| 3 h 40 – 4 h 00 | **Partie F** (données personnelles, choix d'outil) en version courte, puis bilan | Oral et individuel |

> [!WARNING]
> **Séance dense.** Les durées sont une **estimation à valider en classe**. Variantes : D3 en travail personnel ; la partie F (choix d'un outil) traitée à l'oral. Le bilan de compétences peut être terminé à la maison.

## Évaluation

- Compte rendu PDF nommé `RENDU-S12-NOM.pdf` (convention nouvelle de ce site), avec la fiche d'inventaire, l'inventaire de la salle, le contrôle qualité et les réponses.
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **InfraLab :** la partie D s'appuie sur les TP 1, 4 et 9 du catalogue (le TP 2 « Ajouter du matériel » et le TP 3 « Comprendre les deux vues » sont repris en S15 ou en remédiation) ; D4 est une mission **hors catalogue** écrite pour ce cours sur le jeu de données « NovaTech complet ». Le contrôle qualité d'un inventaire (partie E) et le CSV sont de moi.
- **Données du CSV :** entièrement **fictives** ; utilisateurs pseudonymisés (U01…U12) volontairement, pour illustrer la minimisation des données. Défauts glissés dans le fichier (corrigé) : numéros de série en double et manquants, états écrits de plusieurs façons, un format de date différent, une date d'achat dans le futur, des noms manquants, trois postes sous Windows 10 dont un « retiré ».
- **Gain de temps :** les durées « inventaire automatisé » (2 min, 2 h, 4 h…) sont des **estimations non sourcées** ; le TP demande de les **discuter**, pas de les retenir comme des faits.
- **Plugin et compétences :** le TP et le cours de S13 ne parlent que du plugin « OCS Inventory NG » (à ne pas confondre avec FusionInventory, un autre composant). Compétences : B1.1 et B3.1 (voir le [référentiel du site](../../ressources/referentiel.md)).
- **RGPD :** la partie F reste au niveau « principes » (information, finalité, minimisation, charte). Le texte exact de la réponse juridique n'est **pas** un avis juridique ; à compléter avec le référent RGPD de l'établissement.
- **Corrigé :** dans `corriges/` à la racine du dépôt.
- **Compétences :** codes et intitulés relus sur l'arrêté du 8 juillet 2024 ; le choix des compétences pour cette séance est une proposition de l'enseignant.

</details>
