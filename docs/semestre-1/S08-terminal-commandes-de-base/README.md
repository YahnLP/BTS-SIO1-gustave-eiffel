# S08 – Terminal Linux : les commandes de base

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S08 – semaine 08 (semestre 1) |
| **Durée** | 4 heures |
| **Prérequis** | Séances de virtualisation S06 et S07 (VirtualBox, importer et démarrer une VM) ; une VM Debian fournie (fichier OVA) |
| **Matériel** | Poste avec VirtualBox, VM Debian (OVA), accès au réseau du lycée |
| **Compétences travaillées** | B2.2 · B2.3 (voir [le référentiel](../../ressources/referentiel.md)) ; B1.5 amorcée |

> [!NOTE]
> **Question qui guide la séance :** *« Une entreprise veut des dossiers partagés par service sur un serveur Linux, sans interface graphique. Comment se repérer, observer la machine et construire l'arborescence uniquement avec le terminal ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Se repérer** dans le terminal : lire le prompt, savoir où il est (`pwd`), ce qu'il y a (`ls`), se déplacer (`cd`) avec un chemin absolu ou relatif ;
2. **Observer** la machine : espace disque (`df`, `du`), mémoire (`free`), date (`date`), historique des commandes ;
3. **Créer, copier, déplacer, renommer et supprimer** des dossiers et des fichiers ;
4. **Utiliser `sudo`** et expliquer la différence avec une session `root` ;
5. **Construire une arborescence** de dossiers partagés (`/var/partage`) en un minimum de commandes ;
6. **Chercher de l'aide** par lui-même (`--help`, `man`) avant de demander.

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Terminal, arborescence, commandes, `sudo`, noms de fichiers |
| [TP : l'arborescence de JackCelair](02-tp.md) | Découverte, observation, construction, bilan de compétences |
| [Aide-mémoire](03-aide-memoire.md) | Les commandes de la séance, à garder sous la main |
| [Arborescence attendue](tp/arborescence-attendue.txt) | Modèle à comparer avec le résultat du TP |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 15 | **Accroche** : à quoi sert un serveur sans écran ? Que voit-on sur un serveur en salle informatique ? | Oral |
| 0 h 15 – 0 h 40 | **Mini-cours** : terminal, prompt, arborescence, chemins (cours §1 à §3) | Cours et questions |
| 0 h 40 – 1 h 10 | **TP partie A** : préparer la VM Debian | Binôme |
| 1 h 10 – 1 h 25 | Pause | |
| 1 h 25 – 2 h 05 | **TP partie B** : commandes système, historique, `sudo` | Binôme |
| 2 h 05 – 2 h 45 | **TP partie C** : se déplacer dans l'arborescence, créer et supprimer | Binôme |
| 2 h 45 – 3 h 35 | **TP partie D** : l'arborescence de JackCelair | Binôme |
| 3 h 35 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

Les parties E et F du TP (recherche de fichiers, script) sont pour les étudiants qui avancent vite.

## Évaluation

- Compte rendu PDF avec captures d'écran et explications, nommé `RENDU-CS1-TP3.1-NOM.pdf`.
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Compétences :** codes et intitulés relus sur l'arrêté du 8 juillet 2024 ; le choix des compétences pour cette séance est une proposition de l'enseignant.
- **Corrigé :** dans `corriges/` à la racine du dépôt (hors du site publié, mais visible dans le dépôt GitHub).
- **Répartition des contenus :** les liens symboliques et liens durs, les utilisateurs et groupes, `/etc/services` et l'affichage page par page sont prévus en S09. La création de l'utilisateur `tech2025` est donc reportée.
- **Réseau de la salle :** le TP suppose une VM en accès par pont sur le réseau du lycée (plage 192.168.51.x) ; à confirmer pour la salle utilisée.
- **Disque :** la VM doit être installée sur le disque `E:\`. À adapter si la salle change.

</details>
