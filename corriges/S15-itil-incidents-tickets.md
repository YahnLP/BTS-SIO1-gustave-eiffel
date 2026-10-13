# Corrigé (enseignant) – S15 ITIL : incidents, demandes et tickets

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les réponses aux questions sont repliées dans le TP. **Aucune manipulation n'a été exécutée** dans GLPI pendant la rédaction.

## À tester avant la séance

| Point | Pourquoi |
|---|---|
| Création de **groupes**, **utilisateurs** du portail, **catégories** | Chemins et noms de champs à confirmer (partie D1) |
| Création d'un **SLA / délai cible** et son **application** à un ticket (manuelle ou par règle) | Le support d'origine suppose un SLA déjà configuré ; sa création n'a pas été testée |
| **Échelle de priorité** de GLPI : noms, ordre, existence de « Majeure », matrice urgence × impact configurable | La correspondance P1 à P4 de la partie D1 en dépend |
| **Statuts** disponibles et libellés (surtout « En cours (planifié) ») | Corrigés par rapport au support d'origine, non vérifiés |
| **Suivi privé / public** : libellé et emplacement | Utilisé dans les tickets 1 et 2 |
| **Association** d'un ticket à un équipement | Chemin à confirmer |
| **Base de connaissances** : disponibilité selon version et droits | Retirée de la version révisée |
| **Temps de résolution** affiché : calendrier, heures ouvrées | Peut différer du calcul manuel (c'est voulu) |
| **Statistiques** : chemin et filtres par technicien | Retirées de la version révisée |

## Pièges probables

- Étudiants qui laissent la priorité à l'**urgence ressentie** de l'appelant : renvoyer à la matrice.
- Escalade sans motif écrit : le motif est dans le **suivi privé**, pas dans le public.
- Jeu de rôle : l'observateur note des impressions plutôt que des critères observables.
- Un seul ticket traité en entier : prévoir un ticket de rechange.

## Barème indicatif (20 points)

| Critère | Points |
|---|---|
| Classement des douze sollicitations justifié (matrice d'InfraLab) | 3 |
| Ticket rédigé (partie B) | 2 |
| InfraLab partie C : constats et justifications (priorité, incident ou demande, escalade) | 7 |
| Préparation de GLPI (groupes, demandeur, catégories, correspondance des priorités) | 2 |
| Deux tickets GLPI (création, lien, affectation, escalade, solution, clôture) et temps de résolution comparé | 4 |
| Jeu de rôle et grille d'observation (obligatoire : communication orale adaptée) | 2 |

**Matrice d'InfraLab** (lue dans `src/itsm/taxonomy.ts`) : impact élevé / urgence élevée → P1 ; élevé / moyenne → P2 ; élevé / faible → P3 ; moyen / élevée → P2 ; moyen / moyenne → P3 ; moyen / faible → P4 ; faible / élevée → P3 ; faible / moyenne → P4 ; faible / faible → P4.

## Compétences

B1.2 et B1.1 sont une proposition à valider (voir le référentiel du dépôt).

## Rétablissement du jeu de rôle

Le jeu de rôle avait été rendu facultatif ; il est **rétabli** car il évalue la communication orale adaptée à l'interlocuteur. Contrepartie de temps : le TP 21 (partie C2) passe en remédiation ou pour les plus rapides. Le déroulé du README est à ajuster à la classe : si les parties A à D occupent 3 h 45, le jeu de rôle est repris au début de S16.
