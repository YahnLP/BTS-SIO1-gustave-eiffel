# S10 – Terminal Linux : paquets et premiers scripts Bash

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S10 – semaine 10 (semestre 1) |
| **Durée** | 4 heures |
| **Prérequis** | [S08](../S08-terminal-commandes-de-base/README.md) et [S09](../S09-linux-fichiers-droits-utilisateurs/README.md) : commandes de base, `sudo`, droits, noms avec espaces |
| **Matériel** | VM Debian, accès `sudo`, accès Internet (ou miroir de la salle) pour installer des paquets |
| **Compétences travaillées** | B2.2 · B2.3 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Comment installer et mettre à jour des logiciels proprement sur un serveur, et comment transformer une série de commandes en un script que tout le monde peut relancer sans risque ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Installer, mettre à jour, rechercher et supprimer** un paquet avec `apt`, et expliquer ce qu'est un dépôt et une dépendance ;
2. **Écrire** un script Bash avec shebang, variables, arguments, condition (`if`) et boucle (`for`) ;
3. **Rendre un script exécutable** et le lancer ;
4. **Écrire un script relançable** (idempotent), qui gère le cas où le travail est déjà fait ;
5. **Gérer une erreur** : message clair et arrêt propre ;
6. **Utiliser l'IA pour comprendre** et non pour produire, en gardant la trace de ses échanges.

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Paquets et dépôts, anatomie d'un script, conditions, boucles |
| [TP : automatiser la création de l'arborescence](02-tp.md) | Paquets, premier script, conditions et boucles, script JackCelair, bilan |
| [Aide-mémoire](03-aide-memoire.md) | Commandes `apt` et syntaxe Bash |
| [Grille d'auto-évaluation du script](tp/grille-evaluation-script.txt) | Critères de réussite et journal des prompts |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 50 | **Partie A** : gérer des paquets avec `apt` (cours §1) | Binôme |
| 0 h 50 – 1 h 35 | **Partie B** : mon premier script (cours §2) | Binôme |
| 1 h 35 – 1 h 50 | Pause | |
| 1 h 50 – 2 h 40 | **Partie C** : tests et boucles (cours §3 et §4) | Binôme |
| 2 h 40 – 3 h 40 | **Partie D** : le script JackCelair | Individuel |
| 3 h 40 – 4 h 00 | **Bilan de compétences** | Individuel |

La partie E (améliorations) est pour les étudiants qui avancent vite.

## Évaluation

- Dossier `Rendu_TP/` contenant le script `nom_prenom_create_tp.sh` et un court texte (la commande pour l'exécuter, l'endroit où l'arborescence est créée, ce que fait le script en 2 à 5 lignes), plus le **journal des prompts** si une IA a été utilisée.
- Bilan de compétences rempli en fin de séance.

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Source :** la partie « pour les plus rapides : automatiser la préparation du TP » du support d'origine (script `nom_prenom_create_tp.sh`, critères, règles sur l'IA, bonus). Le support ne traitait ni `apt`, ni les bases du langage Bash : la progression A à C est **ajoutée** pour que le script de la partie D soit à portée de tous.
- **Améliorations apportées au sujet d'origine :**
    - la construction du script est **guidée** (blocs de syntaxe isolés, avec des exemples **sans rapport** avec JackCelair), pour ne pas donner la solution ;
    - les **noms avec espaces** de JackCelair sont le piège central : l'importance des guillemets, vue en S08, est réinvestie ;
    - le **dossier de travail par défaut** est `$HOME/partage-test` (sans `sudo`) ; `/var/partage` est réservé à l'extension, avec `sudo` ;
    - les règles sur l'IA sont conservées, avec un **journal des prompts** structuré (prompt, ce que j'en ai retenu, ce que j'ai modifié) : la démarche compte plus que le résultat ;
    - l'argument de dossier racine et le mode « simulation » (bonus du support) sont conservés en partie E.
- **Paquet utilisé en partie A :** `tree`, qui n'est pas installé par défaut sur Debian. Il permet aussi de vérifier l'arborescence de la partie D. À confirmer sur l'image de la salle (accès au dépôt Debian ou à un miroir).
- **Script de référence :** testé sous Ubuntu 24.04 (Bash), pas sur l'image Debian de la salle. Dans `corriges/S10-create_tp.sh` et expliqué dans `corriges/S10-paquets-scripts-bash.md`.
- **Compétences :** B2.2 et B2.3 sont une proposition à valider.

</details>
