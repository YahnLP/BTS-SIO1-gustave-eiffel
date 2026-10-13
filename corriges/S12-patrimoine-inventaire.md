# Corrigé (enseignant) – S12 Patrimoine informatique et inventaire

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les réponses sont repliées dans le TP. Ce document ajoute la vérification du fichier et le barème.

## Vérification du CSV (commandes exécutées dans l'environnement de rédaction)

| Contrôle | Résultat |
|---|---|
| Lignes | 19 (1 en-tête + 18 équipements) |
| Colonnes par ligne | 12 pour toutes les lignes |
| Numéros de série en double | `SN-A100201`, `SN-A200311` |
| Numéros de série vides | INV-0007, INV-0011 |
| Valeurs de `etat` | `En service` ×13, `en service` ×1, `EN SERVICE ` ×1, `Actif` ×1, `En panne` ×1, `Retire` ×1 |
| Dates hors format ISO | INV-0004 (`13/02/2024`) |
| Date future | INV-0015 (`2027-03-01`) |
| Occurrences de `Windows 10` | 3 |

Remarque : la comparaison « date future » suppose la date du jour d'octobre 2026 ; sur une date de séance plus tardive, adapter le fichier.

## Partie D (InfraLab) : repères

- Les **objectifs** de chaque scénario sont évalués par InfraLab (TP 1 : expliquer pourquoi le Parc est vide, faire apparaître PC21, PC22 et PC23, dire ce que la découverte ne sait pas ; TP 4 : numéro d'inventaire, numéro de série, fin de garantie sur PC-COMPTA-01 ; TP 9 : IMP-COMPTA sans données d'agent). **Le score InfraLab n'est pas la note** : on note les **constats** du compte rendu et les réponses.
- **Non vérifié :** les libellés exacts des champs et des boutons d'InfraLab ; les éléments de réponse de D1 à D3 sont rédigés d'après les contextes et objectifs du catalogue. À confronter à l'écran avant la première séance.
- **D4 (hors catalogue)** : les chiffres sont à lire dans l'outil (jeu de données déterministe) ; d'après le code du jeu de données, un poste sur trois n'a pas d'agent. Non vérifié à l'écran.

## Points d'attention

- Les étudiants qui travaillent sous **tableur** peuvent rencontrer le séparateur `;` mal interprété selon la langue du logiciel : prévoir l'import avec séparateur explicite.
- `grep -c "Windows 10"` compte aussi une éventuelle mention dans un autre champ : sans conséquence sur ce fichier.
- Les durées « automatisé » ne sont pas sourcées : ne pas les valider comme des faits ; les faire **discuter**.

## Barème indicatif (sur 20)

Partie A (3) · partie B (2) · partie C (2) · partie D, InfraLab (6) · partie E, CSV (5) · partie F (2).

## Partie G (ajoutée)

Rubriques inspirées des rubriques usuelles d'un registre de traitements (finalité, catégories de données, personnes, destinataires, durée, sécurité). Vérifier la liste exacte auprès de la CNIL avant d'en faire un modèle de référence. Évaluer la cohérence avec la partie F ; ce n'est pas un avis juridique. B3.1 est travaillée ici de façon concrète.
