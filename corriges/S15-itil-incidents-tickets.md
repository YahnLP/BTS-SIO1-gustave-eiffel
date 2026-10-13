# Corrigé (enseignant) – S15 ITIL : incidents, demandes et tickets

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les réponses aux questions sont repliées dans le TP. **Aucune manipulation n'a été exécutée** dans GLPI pendant la rédaction.

## À tester avant la séance

| Point | Pourquoi |
|---|---|
| Création de **groupes**, **utilisateurs** du portail, **catégories** | Chemins et noms de champs à confirmer (partie C) |
| Création d'un **SLA / délai cible** et son **application** à un ticket (manuelle ou par règle) | Le support d'origine suppose un SLA déjà configuré ; sa création n'a pas été testée |
| **Échelle de priorité** de GLPI : noms, ordre, existence de « Majeure », matrice urgence × impact configurable | La correspondance P1 à P4 de la partie C en dépend |
| **Statuts** disponibles et libellés (surtout « En cours (planifié) ») | Corrigés par rapport au support d'origine, non vérifiés |
| **Suivi privé / public** : libellé et emplacement | Utilisé dans les tickets 1 à 3 |
| **Association** d'un ticket à un équipement | Chemin à confirmer |
| **Base de connaissances** : disponibilité selon version et droits | Étape facultative du ticket 3 |
| **Temps de résolution** affiché : calendrier, heures ouvrées | Peut différer du calcul manuel (c'est voulu) |
| **Statistiques** : chemin et filtres par technicien | Partie D, ticket 4 |

## Pièges probables

- Étudiants qui laissent la priorité à l'**urgence ressentie** de l'appelant : renvoyer à la matrice.
- Ticket 3 sans reformulation : le titre recopie le mail. Exiger un titre de dix mots au plus.
- Escalade sans motif écrit : le motif est dans le **suivi privé**, pas dans le public.
- Jeu de rôle : l'observateur note des impressions plutôt que des critères observables.
- Un seul ticket traité en entier : prévoir un ticket de rechange.

## Barème indicatif (20 points)

| Critère | Points |
|---|---|
| Classement des douze sollicitations justifié | 3 |
| Tickets rédigés (scénarios A et B) | 4 |
| Préparation de GLPI (groupes, demandeurs, catégories, délai, correspondance) | 3 |
| Quatre tickets traités (création, lien, affectation, escalade, solution, clôture) | 6 |
| Temps de résolution calculé et comparé ; statistiques lues | 2 |
| Jeu de rôle et grille d'observation | 2 |

## Compétences

B1.2 et B1.1 sont une proposition à valider (voir le référentiel du dépôt).
