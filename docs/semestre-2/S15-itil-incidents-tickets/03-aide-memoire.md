# Aide-mémoire – ITIL et tickets

*BTS SIO SISR 1re année – S15*

> Un mot ou un sigle inconnu ? Passe la souris dessus, ou ouvre le [glossaire](../../ressources/glossaire.md). Repère <span class="technique">notion technique</span> : à lire sans l'apprendre par cœur.

## Quatre types

| Type | En une phrase |
|---|---|
| Incident | Panne ou dégradation : **rétablir** |
| Problème | Cause à chercher : **supprimer** la cause |
| Demande de service | Demande standard, sans panne |
| Changement | Modification planifiée de l'infrastructure |

## Matrice de priorité (exemple d'enseignement, celle d'InfraLab ; à adapter à chaque organisation)

| Urgence ↓ / Impact → | Haut | Moyen | Bas |
|---|---|---|---|
| Haute | P1 | P2 | P3 |
| Moyenne | P2 | P3 | P4 |
| Basse | P3 | P4 | P4 |

## Ticket complet

Titre court · utilisateur et contact · description (quoi, quand, message exact) · impact · actions tentées · priorité · niveau · pièces jointes.

## Statuts GLPI (à confirmer)

Nouveau → En cours (attribué) → En cours (planifié) → En attente → Résolu → Clos.

## Escalade N1 vers N2

Hors compétence ou accès · délai menacé · incident récurrent (3e fois) · impact élargi · pas de procédure · production menacée.

## Indicateurs

| Sigle | Calcul ou sens |
|---|---|
| MTTR | somme des temps de résolution ÷ nombre d'incidents |
| MTTA | temps moyen avant prise en charge |
| FCR | résolu au premier contact |
| % SLA | tickets traités dans les délais ÷ total |

## Avant toute intervention (technicien N1)

1. J'ouvre le ticket **avant** de commencer.
2. Je collecte : qui, quoi, quand, impact.
3. Je demande : « qu'est-ce qui a changé récemment ? »
4. Une action à la fois, je note le résultat.
5. Je teste avec l'utilisateur, je valide la clôture.
6. Je calcule le temps de résolution.
