# Corrigé (enseignant) – S12 Patrimoine informatique et inventaire

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les réponses sont repliées dans le TP. Ce document ajoute la vérification du fichier et le barème.

## Vérification du CSV (commandes exécutées dans l'environnement de rédaction)

| Contrôle | Résultat |
|---|---|
| Lignes | 19 (1 en-tête + 18 équipements) |
| Colonnes par ligne | 12 pour toutes les lignes |
| Numéros de série en double | `SN-A100201`, `SN-A200311` |
| Numéros de série vides | INV-0007, INV-0012 |
| Valeurs de `etat` | `En service` ×13, `en service` ×1, `EN SERVICE ` ×1, `Actif` ×1, `En panne` ×1, `Retire` ×1 |
| Dates hors format ISO | INV-0004 (`13/02/2024`) |
| Date future | INV-0015 (`2027-03-01`) |
| Occurrences de `Windows 10` | 3 |

Remarque : la comparaison « date future » suppose la date du jour d'octobre 2026 ; sur une date de séance plus tardive, adapter le fichier.

## Points d'attention

- Les étudiants qui travaillent sous **tableur** peuvent rencontrer le séparateur `;` mal interprété selon la langue du logiciel : prévoir l'import avec séparateur explicite.
- `grep -c "Windows 10"` compte aussi une éventuelle mention dans un autre champ : sans conséquence sur ce fichier.
- Les durées « automatisé » du support d'origine ne sont pas sourcées : ne pas les valider comme des faits ; les faire **discuter**.

## Barème indicatif (sur 20)

Partie A (4) · partie B (4) · partie C (3) · partie D (6) · parties E et F (3).

## Écarts avec le support d'origine

| Support d'origine | Décision |
|---|---|
| « Intégration GLPI (via plugin FusionInventory) » pour OCS | Corrigé dans les notes : le plugin d'intégration d'OCS s'appelle « OCS Inventory NG » ; FusionInventory est un autre agent |
| Compétences B1.1 et B1.4 (« outils de gestion de parc ») | Alignées sur B1.1 (et B3.1 pour les données personnelles) ; B1.4 du référentiel du site est « travailler en mode projet » |
| Tableau de gain (45 min → 2 min, etc.) | Conservé comme **ordre de grandeur à discuter**, avec le calcul du temps manuel |
