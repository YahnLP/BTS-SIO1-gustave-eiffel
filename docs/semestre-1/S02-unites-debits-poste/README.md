# S02 – Unités, débits et analyse d'un poste de travail

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S02 – semaine 02 (semestre 1) |
| **Durée** | 4 heures |
| **Prérequis** | [S01](../S01-hardware-software-composants/README.md) (composants, mémoires, stockage) |
| **Matériel** | Un poste **Windows** par étudiant ou par binôme, avec PowerShell et l'Invite de commandes ; accès Internet |
| **Compétences travaillées** | B1.1 · B2.3 amorcée (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Un disque vendu 1 To affiche 931 Go ; un fichier de 4,5 Go met six minutes à passer sur un réseau « 100 mégabits ». Qui a raison, et comment le vérifier ? Et comment savoir ce qu'il y a vraiment dans une machine, sans l'ouvrir ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Convertir** des tailles (octets, Ko/Kio…) et expliquer l'écart entre le décimal et le binaire ;
2. **Convertir** des débits (bit/s, octet/s) et **calculer** un temps de transfert ;
3. **Repérer le maillon le plus lent** d'une chaîne (disque, réseau) ;
4. **Relever** les caractéristiques du processeur, de la mémoire, du stockage, de la carte graphique et de la carte réseau d'un poste Windows, **en interface graphique et en ligne de commande** ;
5. **Documenter** une commande : ce qu'elle fait, ce qu'elle affiche, comment la retrouver.

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Unités, débits, temps de transfert, PowerShell et CMD |
| [TP : le poste et ses chiffres](02-tp.md) | Conversions, débits, analyse du poste, bilan de compétences |
| [Aide-mémoire](03-aide-memoire.md) | Tableaux de conversion et formules |
| [Fiche d'identité du poste](tp/fiche-identite-du-poste.txt) | Fiche à compléter pendant la partie C |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 10 | **Accroche** : le disque de 1 To qui affiche 931 Go | Oral |
| 0 h 10 – 0 h 40 | **Mini-cours** : unités et débits (cours §1 à §3) | Cours et questions |
| 0 h 40 – 1 h 15 | **TP partie A** : unités de stockage | Binôme |
| 1 h 15 – 1 h 30 | Pause | |
| 1 h 30 – 2 h 15 | **TP partie B** : débits et temps de transfert | Binôme |
| 2 h 15 – 2 h 30 | **Mini-cours** : PowerShell et CMD (cours §4 et §5) | Cours et démonstration |
| 2 h 30 – 3 h 40 | **TP partie C** : analyser le poste | Binôme |
| 3 h 40 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

La partie D (raccourcis clavier) est facultative.

## Évaluation

- Compte rendu PDF nommé `RENDU-CS1-TP1.2-NOM.pdf`, avec les calculs posés et les captures demandées.
- Fiche d'identité du poste complétée.
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Sources :** cette séance reprend les questions 6 à 24 du support *Hardware, software et culture informatique* et les travaux 1 à 9 du *TP 1.1 Hardware et software*.
- **Incohérences corrigées :** (1) le support d'origine convertit « 2 Ko » en 2048 octets alors qu'il distingue lui-même Ko (1000) et Kio (1024) : le TP demande les **deux** conversions. (2) Pour 500 Go sur des clés de 32 Go, le corrigé d'origine confond 500 Go et 500 Gio (réponse 17) : le TP pose la question dans les deux sens (réponses 16 et 17) et en tire une règle.
- **Commandes Windows :** les commandes données en aide (repliées) sont celles que je propose ; elles n'ont **pas été exécutées** sur la version de Windows de la salle. À tester avant la séance, en particulier `Get-Package` et la mesure de débit disque. La commande `wmic`, employée dans beaucoup de tutoriels, est dépréciée sur les versions récentes de Windows : elle n'est pas utilisée ici.
- **Mesure de la vitesse de lecture du disque :** non prévue avec un outil imposé (licence non vérifiée) ; à adapter à ce que la salle autorise.
- **Corrigé :** dans `corriges/` à la racine du dépôt.
- **Compétences :** codes et intitulés relus sur l'arrêté du 8 juillet 2024 ; le choix des compétences pour cette séance est une proposition de l'enseignant.

</details>
