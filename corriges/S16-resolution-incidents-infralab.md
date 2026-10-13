# Corrigé (enseignant) – S16 Résoudre des incidents avec InfraLab

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les réponses aux questions sont repliées dans le TP. Les solutions d'InfraLab proviennent du catalogue de l'application (version 1.2, dépôt consulté en octobre 2026) ; **je n'ai pas joué les TP dans un navigateur**.

## Solutions d'InfraLab (d'après le catalogue)

| TP | Solution |
|---|---|
| 16 PC déconnecté | Qualifier : Réseau / Poste sans réseau, impact faible, urgence moyenne. Lier à PC-COMPTA-01. Le poste n'a plus de lien actif : rebrancher son interface sur le port du commutateur du siège. Constater que l'agent redevient joignable, rédiger la solution, commenter la vérification, résoudre, clore. |
| 18 Switch en panne | Les trois événements « hors ligne » remontent au même événement racine : un commutateur éteint. Le rallumer. |
| 19 Plusieurs utilisateurs impactés | Lier chaque ticket à son poste, qualifier, classer la demande en demande de service. Les trois postes dépendent du même commutateur éteint. Le rallumer, commenter la vérification pour chaque utilisateur, documenter, résoudre, clore. |

## Autres TP d'InfraLab utilisables

| TP | Usage possible |
|---|---|
| 17 Serveur arrêté (40 min) | Séance de remédiation, ou S17 (lien avec la CMDB et les services) |
| 20 Incident majeur (50 min) | S17 (priorités, communication, services) |
| 43 Quand l'hyperviseur s'arrête (45 min) | S17 ; se joue dans le temps simulé (avancer l'horloge) |

## Préparer la partie D (poste Windows lent)

**Non testé.** Pistes, à valider sur la VM de la salle :

- lancer **plusieurs processus PowerShell qui boucle** pour saturer le processeur (par exemple une boucle infinie lancée au démarrage), à stopper ensuite ;
- ajouter une entrée de démarrage factice, pour la question « programmes lancés au démarrage » ;
- préparer un poste **sain** de comparaison.

Ne pas utiliser de logiciel malveillant ni de test de charge tiers dont la licence n'a pas été vérifiée.

## À tester avant la séance

| Point | Pourquoi |
|---|---|
| Accès à InfraLab depuis le réseau de la salle (site hébergé sur GitHub Pages) | Aucune installation, mais il faut l'accès à ce site |
| **Enregistrement** des fichiers `.infralab.json` selon le navigateur | Chrome et Edge proposent un dossier ; Firefox et Safari téléchargent |
| Commandes PowerShell de la partie D | Versions de Windows de la salle |
| Lien GLPI pour la partie D | Ticket avec équipement associé, base de connaissances si disponible |
| Fonctionnement des **indices** et du **mode examen** | Mode examen sans indices à privilégier pour l'évaluation |

## Pièges probables

- Étudiants qui **cliquent** pour valider les objectifs sans lire les étapes : exiger le journal en temps réel.
- Réponses aux questions de compréhension **devinées** : demander l'explication orale.
- Compte rendu exporté sans le journal : le journal prouve le raisonnement.
- Partie D : correction appliquée avant de mesurer : exiger la mesure **avant et après**.

## Barème indicatif (20 points)

| Critère | Points |
|---|---|
| Journaux tenus en temps réel, cinq questions posées avant d'agir | 4 |
| TP 16 : qualification, diagnostic, solution en quatre éléments | 4 |
| TP 18 : cause commune identifiée et expliquée | 3 |
| TP 19 : corrélation, tri incident/demande, traces auprès de chaque utilisateur | 4 |
| Partie D : diagnostic mesuré, correction, fiche de connaissance | 4 |
| Liens avec les outils réels (réponses) | 1 |

Le **score d'InfraLab** n'entre pas dans la note : il mesure la complétion et l'autonomie, pas une compétence.

## Compétences

B1.2 et B2.3 sont une proposition à valider (voir le référentiel du dépôt).

## Partie E (ajoutée)

- **Non testé** : les pannes proposées (câble virtuel décoché, DNS modifié) et les commandes sont standard mais n'ont pas été jouées dans une VM pour cette séance. Le choix de la panne appartient au binôme ; l'enseignant peut imposer une liste.
- Évaluer : méthode (ordre des tests), journal, clôture du ticket, **message à l'utilisateur** (compréhensible, sans jargon). Cette partie couvre l'indicateur de communication orale/écrite adaptée à l'interlocuteur.
