# Conventions de rédaction du site (à relire avant toute modification)

1. **Tout changement de contenu est validé par l'enseignant** avant publication sur `main`.
2. **Gabarit d'une séance** (`docs/semestre-N/Sxx-nom/`) : `README.md` (fiche séance), `01-cours.md`, `02-tp.md`, `03-aide-memoire.md`, dossier `tp/` (ressources du TP). Les images vont dans `images/`.
3. **Principes d'un TP :** « But » et « Contraintes » ; **« J'anticipe »** avant chaque manipulation ; commandes données quand on ne peut pas les deviner, toujours accompagnées d'un **« Je comprends »** ; questions « pourquoi » ; **bilan final** rattaché aux compétences du référentiel du BTS SIO SISR (page `docs/ressources/referentiel.md`).
4. **Réponses :** les blocs `<details><summary>Voir la réponse</summary>` (ou « Éléments de réponse ») deviennent des zones de réponse manuscrites à l'export PDF. Les blancs `______` et les cellules vides de tableau deviennent des cases à remplir. Les « Notes pour l'enseignant » ne sont pas imprimées.
5. **Titres :** pas d'emoji dans les titres de la nouvelle structure.
6. **Corrigés :** dans `corriges/` à la racine, hors du dossier `docs/` (non publiés sur le site).
7. **Licences :** documents en CC BY-NC-SA 4.0. Toute licence d'outil tiers non vérifiée est marquée « à vérifier » dans `docs/ressources/licences.md` ; n'en inventer aucune. Les outils cités sont détectés par mots-clés dans `docs/xtra/extra.js` (tableau `TOOLS`).
8. **Contenu technique :** ne rien affirmer qu'on n'a pas vérifié ; signaler les doutes dans le texte (encadré ou « Notes pour l'enseignant »).
9. **Compétences :** codes uniquement via `docs/ressources/referentiel.md` (page à vérifier sur le texte officiel).
10. **Simulateurs :** InfraLab et DockerLab sont cités par lien externe. Le simulateur réseau est conservé dans `docs/simulateur/` pour d'éventuelles séances réseau.
11. **Vérification avant commit :** `mkdocs build --strict` doit passer.
12. **Numérotation :** les séances sont numérotées S01 à S21, avec une colonne « Semaine » (01 à 21) sans date : les semaines ne sont pas consécutives.
