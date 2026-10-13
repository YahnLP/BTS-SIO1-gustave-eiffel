# Aide-mémoire – Processeurs, serveurs et dimensionnement

*BTS SIO SISR 1re année – S03*

## Lire un processeur

| Critère | Question à se poser |
|---|---|
| Génération | Est-il récent ? |
| Cœurs / threads | Mes logiciels en profitent-ils ? |
| Fréquence base / turbo | À architecture égale seulement |
| Cache L3 | Grande taille = moins d'attente de la RAM |
| TDP | Refroidissement et alimentation suffisants ? |
| Graphique intégré | Suffit-il pour l'usage ? |

## Démarche de choix

1. Décrire les besoins par profil.
2. Traduire en critères mesurables.
3. Comparer avec au moins **deux** sources.
4. Vérifier budget et compatibilité.
5. Justifier par écrit.

## RAID

| Niveau | Disques min. | Capacité utile | Pannes supportées |
|---|---|---|---|
| 0 | 2 | n × taille | 0 |
| 1 | 2 | 1 × taille | 1 |
| 5 | 3 | (n − 1) × taille | 1 |
| 6 | 4 | (n − 2) × taille | 2 |
| 10 | 4 | (n ÷ 2) × taille | 1 au minimum |

**RAID ≠ sauvegarde.**

## Dimensionner

- RAM = (somme des VM + hôte) × 1,25
- Cœurs physiques ≈ somme des vCPU ÷ 2 (règle empirique)
- Stockage utile selon le RAID, avec une marge

## Vocabulaire serveur

| Mot | Sens |
|---|---|
| ECC | Mémoire qui corrige certaines erreurs |
| Hot-swap | Remplacement à chaud d'un disque |
| U | Unité de hauteur en baie : 44,45 mm |
| NUMA | Accès mémoire plus rapide vers son propre processeur |
| PUE | Énergie totale du site ÷ énergie des équipements informatiques |
