# S05 – Découvrir Linux

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S05 – semaine 05 (semestre 1) |
| **Durée** | 4 heures |
| **Prérequis** | [S04](../S04-systemes-exploitation-windows/README.md) (système d'exploitation, licences, outils Windows) |
| **Matériel** | Poste avec accès Internet ; **aucune installation** n'est demandée dans cette séance |
| **Compétences travaillées** | B2.1 · B1.6 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Il y a « Linux » sur des serveurs, des téléphones, des box, des superordinateurs. Mais Linux, qu'est-ce que c'est exactement ? Pourquoi autant de versions ? Et comment décider quel système installer pour quel besoin ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Situer** dans le temps les jalons d'Unix, de GNU/Linux, d'Internet et du Web ;
2. **Distinguer** le **noyau** Linux d'une **distribution** et d'un **environnement de bureau** ;
3. **Présenter** les grandes familles de distributions (Debian, Red Hat) et leur **gestionnaire de paquets** ;
4. **Choisir** un système d'exploitation pour un besoin donné, en **justifiant** par des critères ;
5. **Comparer** Windows et Linux (organisation des fichiers, droits, installation de logiciels, ligne de commande) ;
6. **Effectuer** une courte **veille** documentée sur un enjeu actuel (énergie, quantique, sécurité du système).

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Histoire, noyau et distributions, familles, licence, Windows et Linux, culture informatique |
| [TP : Linux, mode d'emploi pour choisir](02-tp.md) | Frise, fiches de distributions, choix argumenté, comparaison, veille, bilan de compétences |
| [Aide-mémoire](03-aide-memoire.md) | Vocabulaire et correspondances Windows / Linux |
| [Grille de choix d'un système](tp/grille-choix-systeme.txt) | Grille à remplir pendant la partie C |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 10 | **Accroche** : où y a-t-il du Linux autour de nous ? | Oral |
| 0 h 10 – 0 h 50 | **Mini-cours** : histoire, noyau, distributions, licence (cours §1 à §5) | Cours et questions |
| 0 h 50 – 1 h 20 | **TP partie A** : la frise des jalons | Binôme |
| 1 h 20 – 1 h 55 | **TP partie B** : fiches de distributions | Binôme |
| 1 h 55 – 2 h 10 | Pause | |
| 2 h 10 – 2 h 55 | **TP partie C** : choisir un système pour six situations | Binôme |
| 2 h 55 – 3 h 25 | **TP partie D** : Windows et Linux, côte à côte | Binôme |
| 3 h 25 – 3 h 40 | **TP partie E** : veille (une question au choix) | Individuel |
| 3 h 40 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

## Évaluation

- Compte rendu PDF nommé `RENDU-CS1-TP2.2-NOM.pdf`, avec les tableaux **sourcés** et la grille de choix.
- Note de veille (5 lignes, 2 sources).
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Sources :** partie « Culture informatique et transmission » du support *Hardware, software et culture informatique* (langages, Internet, transmission, quantique, énergie, protection du système) et exemples de systèmes d'exploitation de la partie « Software ». Le support d'origine ne contenait **pas** de séance « Découvrir Linux » : le contenu est de moi.
- **Décision de séquence :** aucune installation ici. L'installation et la manipulation de Linux se font **après la virtualisation** : machine virtuelle en S06 et S07, terminal en S08 à S10. La partie D demande des **prédictions** (« J'anticipe ») que les étudiants vérifieront en S08.
- **Incohérences corrigées :** (1) le support d'origine place Fortran et COBOL dans les années 1960 ; ils datent de la fin des années 1950. (2) Il cite CentOS parmi les systèmes serveur ; CentOS Linux n'est plus maintenu, remplacé en pratique par des distributions compatibles (Rocky Linux, AlmaLinux) et par CentOS Stream, qui se place en amont de Red Hat Enterprise Linux. (3) Le support parle de « langage machine → Internet » sans lien : la frise de la partie A les relie.
- **Dates :** les dates du corrigé sont de ma mémoire et à **confirmer par les sources que citent les étudiants**.
- **Cycles de support** (Debian, Ubuntu LTS, RHEL) : volontairement **laissés à rechercher** : ils changent et je ne les fige pas.
- **Veille :** quantique, énergie des centres de données, sécurité du système sont des sujets qui évoluent vite ; exiger des sources datées.
- **Corrigé :** dans `corriges/` à la racine du dépôt.
- **Compétences :** codes et intitulés relus sur l'arrêté du 8 juillet 2024 ; le choix des compétences pour cette séance est une proposition de l'enseignant.

</details>
