# Aide-mémoire – Hardware et software

*BTS SIO SISR 1re année – S01*

> Un mot ou un sigle inconnu ? Passe la souris dessus, ou ouvre le [glossaire](../../ressources/glossaire.md). Repère <span class="technique">notion technique</span> : à lire sans l'apprendre par cœur.

## Vocabulaire

| Mot | Sens en une phrase |
|---|---|
| Hardware | Les éléments physiques de l'ordinateur |
| Software | Les programmes et données qui font travailler le hardware |
| Firmware | Logiciel stocké dans une puce du matériel (BIOS, UEFI) |
| CPU | Processeur : exécute les instructions |
| GPU | Processeur graphique : calcule l'image |
| RAM | Mémoire vive : programmes en cours, vidée à l'arrêt |
| ROM | Mémoire qui garde son contenu (firmware) |
| Cache | Petite mémoire très rapide dans le processeur |
| NIC | Carte réseau |

## Composants

| Composant | Rôle |
|---|---|
| Carte mère | Relie tout |
| Processeur | Exécute |
| RAM | Mémoire de travail |
| SSD / HDD | Stockage durable |
| Carte graphique | Image |
| Alimentation | Courant |
| Ventilation | Évacue la chaleur |

## Von Neumann

- Mémoire **unique** pour instructions et données.
- Cycle : **chercher → décoder → exécuter**, puis instruction suivante (compteur ordinal).
- Limite : le processeur attend la mémoire (goulot d'étranglement).

## Hiérarchie des mémoires

registres › cache L1 › L2 › L3 › RAM › SSD › HDD
(du plus rapide, petit et cher au plus lent, grand et bon marché)

## HDD ou SSD ?

| Besoin | Choix habituel |
|---|---|
| Système et applications, rapidité | SSD |
| Gros volume d'archives à petit prix | HDD |
| Machine portable, résistance aux chocs | SSD |
