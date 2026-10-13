# Corrigé (enseignant) – S10 Paquets et premiers scripts Bash

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

**Attention aux pièges.**

Le script de référence est dans `corriges/S10-create_tp.sh`. Il a été testé sous Ubuntu 24.04 (pas sur l'image Debian de la salle) : première exécution, relance, mode simulation, dossier de base inaccessible.

## Partie A

Selon l'image : `tree` absent au départ (`which tree` ne renvoie rien) ; `apt show tree` affiche version et dépendances ; `apt update` met à jour les paquets installés ; l'installation annonce les paquets supplémentaires éventuels ; `dpkg -L tree` liste les fichiers ; `apt -s upgrade` simule ; après `remove`, `which tree` ne renvoie plus rien.

## Partie B

`bonjour.sh` : shebang, commentaire, `echo "Je m'appelle ..."`, `hostname`, `date`. Avec argument : `echo "Bonjour ${1:-monde}"`. `./bonjour.sh` sans `x` : `Permission denied`.

## Partie C

```bash
#!/bin/bash
# existe.sh
if [ -d "$1" ]; then
    echo "C'est un dossier"
elif [ -f "$1" ]; then
    echo "C'est un fichier"
else
    echo "N'existe pas"
fi
```

Sans guillemets autour de `$1`, `./existe.sh "mon dossier"` provoque une erreur de syntaxe du test (deux mots dans les crochets).

`dossiers1.sh` : à la seconde exécution, `mkdir: cannot create directory ... File exists`. `dossiers2.sh` : aucune erreur. `dossiers3.sh` : « créé » puis « déjà présent ».

## Partie D : critères de correction

- Shebang présent ; syntaxe valide (`bash -n`) ; message clair.
- Les 12 dossiers (JackCelair compris) avec les noms exacts ; relance sans erreur ; dossier présent signalé ; erreur de création gérée avec `exit 1` et code de retour non nul (`echo $?` renvoie 1).
- Pièges : variables non entourées de guillemets (noms avec espaces coupés), accents, `mkdir` sans `-p` pour les niveaux intermédiaires.
- Journal des prompts rempli, cohérent avec le script rendu. Un script identique à la référence sans trace de démarche doit alerter.

## Partie E

Paramétrage par argument : `BASE="${1:-$HOME/partage-test}"`. Simulation : test de l'option `-n` en tête du script, puis `shift`. Avec `sudo`, les dossiers créés appartiennent à `root` : les droits de S09 restent à appliquer.

## Points à vérifier avant diffusion

- Accès au dépôt Debian (ou miroir) depuis la salle pour installer `tree`.
- `nano` ou un autre éditeur disponible sur l'image.
- Comportement de `apt` et messages exacts sur l'image Debian.
