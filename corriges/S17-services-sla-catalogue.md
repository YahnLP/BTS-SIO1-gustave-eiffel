# Corrigé (enseignant) – S17 Services, SLA et catalogue

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les réponses aux questions sont repliées dans le TP. Les éléments d'InfraLab viennent du catalogue de l'application (version 1.2, dépôt consulté en octobre 2026) ; **je n'ai pas joué les TP dans un navigateur**.

## Solutions d'InfraLab (d'après le catalogue)

| TP | Éléments |
|---|---|
| 22 SLA | Deux tickets attendent depuis 10 minutes (temps simulé) ; le premier bloque la comptabilité (P1 : 15 min / 6 h) ; le SLA court dès la création ; « en attente » suspend l'horloge de résolution |
| 41 Week-end | Vendredi 17 h, imprimante, P3 (24 h) ; lundi 7 h, affiché « dépassé » avec un calendrier continu ; à régler en heures ouvrées (lundi–vendredi 8 h–18 h), puis choisir le calendrier d'un service promis 24 h / 24 |
| 20 Incident majeur | Commutateur central du siège éteint ; comptabilité P1, imprimante P4 ; rallumer, informer sur le ticket principal, résoudre et documenter le ticket de la comptabilité |

## À tester avant la séance

| Point | Pourquoi |
|---|---|
| **Échéance en heures ouvrées** du TP 41 | Ma prévision (mercredi 11 h) suppose que « 24 h » se compte en heures ouvrées ; vérifier l'affichage de l'application |
| Réglage du calendrier (page Paramètres, droit d'administration) | Le compte utilisé doit avoir le droit |
| **Temps simulé** | Il n'avance que par action de l'élève |
| Accès à InfraLab depuis le réseau de la salle | Site hébergé sur GitHub Pages |
| Chemin du temps restant dans GLPI (question A) | À confirmer sur la version installée |

## Autres TP d'InfraLab utiles

TP 21 (incident ou demande, 30 min) en remédiation ; TP 17 (serveur arrêté) et 43 (hyperviseur) pour l'analyse d'impact et le lien avec la CMDB ; TP 32 et 38 (relations et dépendances) en S12 à S14 (voir la révision de ces séances).

## Pièges probables

- Calculs d'échéance **faits après** avoir vu la réponse de l'application : exiger les prédictions écrites avant.
- Fiches de service **trop techniques** pour l'utilisateur : relire la description en deux phrases.
- Promesses de 99,9 % posées sans regarder les composants : la question de cohérence de la partie D sert à cela.
- Confusion **SLA / OLA** : demander un exemple de chaque dans le catalogue.

## Barème indicatif (20 points)

| Critère | Points |
|---|---|
| Prédictions écrites avant l'action (parties A et B) | 3 |
| TP 22 : qualification, suspension, comparaison | 3 |
| TP 41 : calculs corrects, explication du calendrier | 4 |
| TP 20 : priorités, journal, message d'information | 4 |
| Catalogue : quatre fiches cohérentes, éléments de configuration, calcul | 5 |
| Lien avec les outils réels | 1 |

Le **score d'InfraLab** n'entre pas dans la note.

## Compétences

B1.5 et B1.2 sont une proposition à valider (voir le référentiel du dépôt).

## Partie E (ajoutée)

- **Non vérifié** : les intitulés exacts des menus GLPI pour les SLA, calendriers, catégories et gabarits de tickets (variable selon la version). La consigne demande volontairement à l'élève de les repérer et de les noter. Essayer sur la version installée en S13 avant la séance.
- Valider la **cohérence** entre la fiche de service de la partie D et le SLA configuré (délais, calendrier).

## Présence en ligne intégrée à S17 (partie F)

Faute de séance dédiée, la **présence en ligne** (B1.3) est rattachée aux services. **Non testé** : `apt install nginx`, répertoire `/var/www/html`, `curl`, `nslookup`/`dig` (le DNS depuis la salle dépend du réseau verrouillé). La partie « mentions légales » est un **rappel de principes** à vérifier auprès du référent juridique ; le TP n'invente aucune règle. L'audit est à faire sur l'**entreprise de l'apprenti** (observation) ou une organisation publique : ne jamais cibler une personne privée. Le TP 41 passe en remédiation pour libérer le temps. Barème : F (5 points) pris sur B et D.

## Fixer les délais d'une organisation (ajout)

Le cours explique désormais d'où viennent les délais d'un SLA (besoin métier, capacité de l'équipe, engagements des fournisseurs, coût, mesure). Les valeurs P1 à P4 restent un exemple d'enseignement.
