#!/bin/bash
# Crée l'arborescence de JackCelair. Relançable sans erreur.
# Usage : ./create_tp.sh [-n] [dossier_racine]     (-n : simulation, rien n'est créé)

SIMULATION=0
if [ "$1" = "-n" ]; then
    SIMULATION=1
    shift
fi

BASE="${1:-$HOME/partage-test}"
RACINE="$BASE/JackCelair"

DOSSIERS=(
    "commerce/vente"
    "commerce/relation client"
    "etudes/développeur"
    "etudes/mécanicien"
    "etudes/expert technique"
    "direction générale"
    "comptabilité"
    "ressources humaines"
    "communication"
)

echo "Création de l'arborescence JackCelair dans : $RACINE"
if [ "$SIMULATION" -eq 1 ]; then
    echo "(mode simulation : rien n'est créé)"
fi

if [ ! -d "$BASE" ]; then
    echo "Le dossier $BASE n'existe pas : il sera créé."
fi

for d in "${DOSSIERS[@]}"; do
    chemin="$RACINE/$d"
    if [ -d "$chemin" ]; then
        echo "  déjà présent : $d"
    elif [ "$SIMULATION" -eq 1 ]; then
        echo "  serait créé  : $d"
    else
        if mkdir -p "$chemin"; then
            echo "  créé         : $d"
        else
            echo "  ERREUR : impossible de créer $d" >&2
            exit 1
        fi
    fi
done

echo "Terminé."
