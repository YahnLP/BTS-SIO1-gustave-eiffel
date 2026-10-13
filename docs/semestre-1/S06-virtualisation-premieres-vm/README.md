# S06 – Virtualisation : hyperviseurs et premières machines virtuelles

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S06 – semaine 06 (semestre 1) |
| **Durée** | 4 heures |
| **Prérequis** | Hardware et software : processeur, mémoire, stockage, système d'exploitation (séances S01 à S05) |
| **Matériel** | Poste avec VirtualBox, accès Internet, un disque indiqué par l'enseignant pour stocker les VM, un fichier ISO Windows (à créer si besoin) et un fichier ISO Ubuntu LTS |
| **Compétences travaillées** | B2.1 (en partie) · B2.2 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Une entreprise veut tester un système sans toucher à ses postes réels. Comment faire fonctionner un ordinateur à l'intérieur d'un autre, et avec quelles ressources ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Définir** virtualisation, hyperviseur et machine virtuelle, et dire d'où viennent les ressources d'une VM ;
2. **Distinguer** un hyperviseur de type 1 et de type 2, et la virtualisation de l'émulation et de la conteneurisation ;
3. **Citer** les deux façons d'obtenir une VM (ISO ou OVA/OVF) ;
4. **Créer** une machine virtuelle dans VirtualBox avec une configuration imposée et **installer** un système depuis une ISO ;
5. **Observer** l'effet d'une VM sur les ressources de la machine hôte ;
6. **Refaire seul** la démarche avec un autre système (Ubuntu LTS).

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Machine virtuelle, hyperviseur, types, façons de créer une VM |
| [TP : ma première machine virtuelle](02-tp.md) | Activité de découverte, VM Windows, analyse, VM Ubuntu en autonomie, bilan |
| [Aide-mémoire](03-aide-memoire.md) | La configuration d'une VM et le vocabulaire à retenir |
| [Liste des captures](tp/liste-captures.txt) | Les captures d'écran à fournir dans le compte rendu |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 40 | **Activité de découverte** : définitions, types d'hyperviseurs, usages, façons de créer une VM (TP partie A) | Binôme, recherche |
| 0 h 40 – 2 h 40 | **TP parties B à E** : créer la VM Windows, l'installer, analyser les ressources de l'hôte | Binôme |
| 2 h 40 – 2 h 50 | Pause | |
| 2 h 50 – 3 h 45 | **TP partie F** : refaire seul avec Ubuntu LTS | Individuel |
| 3 h 45 – 4 h 00 | **Bilan de compétences** | Individuel |

Les durées d'origine (40 min, 2 h et 1 h) font 3 h 40 : le déroulé tient en 4 h sans marge. Si le temps manque, la création de l'ISO (partie C) peut être fournie préparée.

## Évaluation

- Compte rendu PDF avec captures d'écran et explications, nommé `RENDU-CS1-TPVirtualisation1-VOTRENOM.pdf` (convention du support d'origine).
- Bilan de compétences rempli à la fin du TP.

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Source :** activité de découverte 1 (questions 1 à 7), TP « Les bases de la virtualisation » et trace écrite « Virtualisation » (sections I à VII). Les sections VIII (modes réseau) et les snapshots sont prévus en S07.
- **Windows :** les supports d'origine citent « Windows 10/11 ». Windows 10 n'est plus pris en charge par Microsoft depuis le 14 octobre 2025 (à vérifier), et Windows 11 exige en principe 4 Go de mémoire, TPM 2.0 et Secure Boot : la configuration d'origine (2 048 Mo) convient à Windows 10, pas forcément à Windows 11. L'outil de création de média Windows 10 est-il encore proposé ? À vérifier. Le texte du TP laisse « 10 ou 11 » et demande de suivre la consigne de l'enseignant.
- **Deuxième disque :** le support d'origine demande « un deuxième disque système avec 20 Go » dans l'installateur. J'ai interprété : une **deuxième partition** de 20 Go sur le disque virtuel de 50 Gio. À confirmer.
- **Identifiants :** le support d'origine impose un nom de système et un mot de passe précis. Je ne reproduis pas le mot de passe dans le site public : le TP renvoie à « le mot de passe donné par l'enseignant ».
- **Disque de stockage :** `D:\` ici, `E:\` dans le TP Linux d'origine. Le texte dit « le disque indiqué par l'enseignant ».
- **Compétences :** B2.1 et B2.2 sont une proposition. La trace écrite d'origine cite d'autres codes (C1.1 à C5.3, blocs B1 à B5) qui ne correspondent pas au référentiel utilisé ici : à aligner.
- **Corrigé :** `corriges/S06-virtualisation-premieres-vm.md` (hors du site publié).

</details>
