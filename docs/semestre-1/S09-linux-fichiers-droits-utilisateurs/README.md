# S09 – Terminal Linux : utilisateurs, droits et liens

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S09 – semaine 09 (semestre 1) |
| **Durée** | 4 heures |
| **Prérequis** | [S08](../S08-terminal-commandes-de-base/README.md) : navigation, `mkdir`, `cp`, `mv`, `rm`, `sudo`, arborescence `/var/partage/JackCelair` créée |
| **Matériel** | VM Debian (celle de S08), accès `sudo` |
| **Compétences travaillées** | B1.5 · B2.2 · B3.3 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Comment faire pour que chaque service de JackCelair n'accède qu'à son dossier, et rien d'autre ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Créer** un utilisateur et un groupe, **ajouter** un utilisateur à un groupe, et **vérifier** avec `id` ;
2. **Lire** la sortie de `ls -l` : type, droits, propriétaire, groupe ;
3. **Modifier** les droits (`chmod`, en notation symbolique et en octal) et le propriétaire (`chown`, `chgrp`) ;
4. **Créer et distinguer** un lien dur et un lien symbolique, et prévoir leur comportement après un déplacement ;
5. **Afficher** un fichier entier ou page par page (`cat`, `less`) ;
6. **Appliquer** des habilitations par service sur l'arborescence de JackCelair, puis **les tester** avec de vrais comptes.

## Contenu de la séance

| Document | Rôle |
|---|---|
| [Cours](01-cours.md) | Utilisateurs et groupes, lire les droits, `chmod`, `chown`, liens |
| [TP : les habilitations de JackCelair](02-tp.md) | Utilisateurs, exercice `CommandesLinux`, liens, droits, habilitations, bilan |
| [Aide-mémoire](03-aide-memoire.md) | Les commandes de la séance |
| [Arborescence CommandesLinux attendue](tp/arborescence-commandeslinux-attendue.txt) | Résultat attendu de la partie B |
| [Matrice des habilitations](tp/matrice-habilitations.txt) | Qui doit pouvoir faire quoi, dossier par dossier |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 40 | **Partie A** : utilisateurs et groupes (cours §1) | Binôme |
| 0 h 40 – 1 h 20 | **Partie B** : l'arborescence `CommandesLinux`, afficher des fichiers | Binôme |
| 1 h 20 – 1 h 50 | **Partie C** : liens durs et liens symboliques | Binôme |
| 1 h 50 – 2 h 05 | Pause | |
| 2 h 05 – 2 h 50 | **Partie D** : lire et modifier les droits | Binôme |
| 2 h 50 – 3 h 40 | **Partie E** : les habilitations de JackCelair | Binôme |
| 3 h 40 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

## Évaluation

- Compte rendu PDF avec captures d'écran, commandes et explications, nommé `RENDU-CS1-TP3.2-NOM.pdf` (sur le modèle de `RENDU-CS1-TP3.1-NOM.pdf` de S08).
- Bilan de compétences rempli en fin de séance.

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Contenu :** le TP utilise l'utilisateur `tech2025`, l'arborescence `CommandesLinux`, les liens, `/etc/issue` et `/etc/services`. Les parties D (droits) et E (habilitations de JackCelair) sont ma proposition : groupes, comptes de test et politique de droits.
- **Choix de rédaction :**
    - `carre.txt` et `carré.txt` : un seul nom, `carre.txt` ;
    - « Supprimez le répertoire `cours1` » puis « supprimez l'arborescence `cours1/cours2/cours3/cours4` » : la première suppression échoue (dossier non vide), ce qui est exploité pour faire comprendre la différence entre `rmdir` et `rm -r` ;
    - « Copier le répertoire sous le nom `chaude` » ne dit pas lequel : c'est `froide` ;
    - un « lien dur » puis un « **second lien symbolique** » : il n'y avait pas de premier lien symbolique. J'ajoute un lien symbolique **relatif** avant le lien absolu, pour comparer ;
    - des fichiers vides ne montrent rien quand on affiche un lien : le TP demande d'écrire une ligne dans `rouge.txt` ;
    - `CommandeLinux` (sans s) et `CommandesLinux` : un seul nom, `CommandesLinux`.
- **`/etc/services` :** présent sur Debian avec le paquet `netbase` (en général installé). À vérifier sur l'image fournie.
- **Droits par défaut :** le droit attribué à un nouveau fichier dépend du `umask` ; je le fais constater en TP plutôt que de l'affirmer.
- **Direction générale :** la partie E ne règle pas le cas d'un service qui doit lire les dossiers des autres (listes de contrôle d'accès, `setfacl`, non traité).
- **Compétences :** codes et intitulés relus sur l'arrêté du 8 juillet 2024 ; le choix des compétences pour cette séance est une proposition de l'enseignant.
- **Corrigé :** `corriges/S09-linux-fichiers-droits-utilisateurs.md` (hors du site publié).

</details>
