# S19 – Automatiser les tâches d'administration

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S19 – semaine 19 (semestre 2) |
| **Durée** | 4 heures |
| **Prérequis** | Scripts Bash ([S10](../../semestre-1/S10-paquets-scripts-bash/README.md)) ; conteneurs ([S11](../S11-conteneurs-dockerlab/README.md)) ; services et changements ([S17](../S17-services-sla-catalogue/README.md)) |
| **Matériel** | Une **VM Debian** (celle de S08 à S10) avec `sudo` ; un navigateur par étudiant : **[DockerLab](https://yahnlp.github.io/DockerLab/)** (aucune installation) |
| **Compétences travaillées** | B2.2 · B1.5 · B2.3 · B3.3 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Vingt-deux comptes à créer, la même tâche chaque semaine, la même application à relancer à l'identique : faut-il la refaire à la main à chaque fois ? Et qu'est-ce qui rend un script fiable plutôt que dangereux ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Justifier** l'automatisation d'une tâche (fréquence, erreurs, traçabilité) et **repérer** ce qu'il ne faut pas automatiser ;
2. **Écrire** un script **robuste** : paramètres, contrôle des données, **idempotence**, mode d'essai, journal ;
3. **Planifier** l'exécution d'un script avec `cron` ;
4. **Décrire** une infrastructure dans un **fichier déclaratif** (Docker Compose) et la reproduire en une commande ;
5. **Comparer** une démarche impérative (commandes) et une démarche déclarative (fichier) ;
6. **Évaluer** les risques d'un script (droits, erreurs en masse, secrets).

## Contenu de la séance

| Document | Rôle |
|---|---|
| [TP : du geste répété au script](02-tp.md) | **À faire en premier** : Création de comptes en masse, planification, Compose, bilan |
| [Cours](01-cours.md) | **À lire après le TP**, pour confronter ses résultats : Pourquoi et quand automatiser, qualités d'un script, planification, déclaratif |
| [Aide-mémoire](03-aide-memoire.md) | Commandes et rappels |
| [Fichier des utilisateurs](tp/utilisateurs.md) | Données du TP (avec des défauts volontaires) |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 10 | **Accroche** : 22 comptes à la main : combien de temps, combien d'erreurs ? | Calcul et discussion |
| 0 h 10 – 1 h 00 | **TP partie A** : script de création de comptes depuis un fichier | Binôme |
| 1 h 00 – 1 h 30 | **Confrontation** et mini-cours : automatiser, script robuste, `cron`, déclaratif (cours §1 à §6) | Mise en commun, cours et questions |
| 1 h 30 – 2 h 00 | **TP partie B** : planifier un rapport avec `cron` | Binôme |
| 2 h 00 – 2 h 15 | Pause |  |
| 2 h 15 – 2 h 55 | **TP partie C** : DockerLab, « Docker Compose » (facultative ou à la maison) ; les autres passent à **G** | Individuel |
| 2 h 55 – 3 h 30 | **TP partie D** : la mission de S11 en un fichier Compose | Binôme |
| 3 h 30 – 3 h 40 | **TP partie E** : automatiser, oui, mais quand ? | Individuel |
| (selon avancement) | **TP partie F** (SSH) et **partie G** (annuaire OpenLDAP) : preuve réelle | Binôme |
| 3 h 40 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

## Évaluation

- Compte rendu PDF nommé `RENDU-S19-NOM.pdf` : le script commenté, son journal d'exécution (premier lancement et relance), la ligne `cron` et son résultat, le fichier Compose et les preuves, les réponses.
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Choix pédagogique :** le TP précède le cours. L'élève cherche seul (essais, observation, aides données, Web), se trompe parfois, puis confronte ses réponses au cours : l'écart entre ce qu'il pensait et ce qui est établi crée le conflit cognitif qui fixe la notion. Il n'a donc pas le cours sous les yeux pendant le TP ; les « éléments de réponse » repliés restent à ouvrir **après** l'essai.
- **Sources :** la séance s'appuie sur S10 (scripts, relançabilité), sur les **TP de DockerLab** (« Docker Compose : lancer une application en une commande », catalogue de l'application, dépôt consulté en octobre 2026) et sur la mission de S11. Les commandes Linux (`useradd`, `getent`, `crontab`…) sont des commandes courantes de Debian, **non exécutées** dans l'environnement de rédaction : à tester sur la VM de la salle.
- **Partie D (hors catalogue) :** c'est un TP **non intégré** à DockerLab : les consignes sont dans ce site et se jouent dans un **laboratoire vide** de DockerLab. Compose y est **simulé** : les options exactes prises en charge sont à vérifier en jouant le TP avant la séance (champs `networks`, `volumes`, `environment`, `ports`).
- **Fichier des utilisateurs :** il contient des **défauts volontaires** : doublon, ligne vide, majuscules, accent, espace dans l'identifiant, colonne manquante, colonne en trop. Les noms sont fictifs.
- **Mots de passe :** le TP ne les traite pas : un mot de passe initial **ne se met pas** dans un fichier ni en argument de commande. Le sujet est discuté, pas implémenté.
- **Pas de PowerShell :** l'automatisation sous Windows (PowerShell) est évoquée au cours mais non pratiquée, faute de VM Windows imposée à cette séance.
- **Lien ITIL :** la partie E rattache l'automatisation à la **demande standard** et au **changement standard** (S15, S17) ; les définitions sont celles du cours de S15.
- **Compétences :** codes et intitulés relus sur l'arrêté du 8 juillet 2024 ; le choix des compétences pour cette séance est une proposition de l'enseignant.
- **Cours (audit pédagogique) :** trois SVG (création de comptes à la place du Mermaid, cinq champs de `cron`, paire de clés SSH) ; idées reçues ; quatre « Je vérifie » ; socle et notions techniques distingués. Les exemples de lignes `cron` sont de ma main (cas fictifs).
</details>
