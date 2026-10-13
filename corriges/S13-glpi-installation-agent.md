# Corrigé (enseignant) – S13 Installer GLPI et inventorier avec l'agent

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les réponses aux questions sont repliées dans le TP. Ce document liste les **points à tester avant la séance** et les pièges probables. **Aucune commande n'a été exécutée** dans l'environnement de rédaction.

## À tester avant la séance (sur une VM Debian de la salle)

| Point | Pourquoi |
|---|---|
| Version de PHP livrée par la version de Debian de la salle (`php -v`) et compatibilité avec la dernière version stable de GLPI | GLPI impose une version minimale de PHP : la consulter sur la page des prérequis officielle |
| Liste des **extensions PHP** que l'assistant d'installation demande | La liste du TP est volontairement incomplète : l'assistant affiche les manquantes (parties « J'anticipe » et « Constat ») |
| **Fuseaux horaires** : commande de chargement et droit `SELECT` sur la table des fuseaux | L'assistant les exige dans les versions récentes ; les commandes sont à chercher dans la page officielle (partie C2) |
| **Hôte virtuel** : le fichier du TP reprend la structure de la page officielle ; vérifier que les règles de réécriture sont bien nécessaires pour la version choisie | Un 404 dès la page d'accueil vient en général de la réécriture ou du `DocumentRoot` |
| **Droits** : `chown -R www-data:www-data /var/www/html/glpi` est la version simplifiée ; la doc officielle sépare configuration, données et journaux | Vérifier que l'assistant peut écrire la configuration |
| **Comptes par défaut** : lesquels sont créés et avec quels mots de passe | À confirmer sur l'instance installée (le TP d'origine cite `glpi / glpi`) |
| **Agent Windows** : version à télécharger, paramètres `SERVER`, `TAG`, `RUNNOW` | D'après la documentation de l'installeur ; la commande doit être lancée depuis l'Invite de commandes |
| **Forcer un inventaire** : méthode exacte (option de la commande de l'agent, interface locale) | Non vérifié : laissée aux étudiants dans la partie D3 |
| **Réseau** : accès par pont ou carte NAT + réseau interne, plan `192.168.X.0/24` | Dépend de la salle (voir S07) |

## Réponses attendues (compléments)

- **T4 :** après installation des extensions manquantes (`sudo apt install php-<extension>`) et redémarrage d'Apache, rafraîchir l'assistant.
- **Partie E1 :** différences fréquentes : RAM affichée en Mio ou Gio selon la source (rappel S02), nom du système avec un libellé différent, nombre de logiciels très supérieur (composants système).
- **Ancienne partie « serveur d'un voisin »** (retirée du TP) : si l'agent n'accepte pas la liste (version ancienne), reconfigurer le serveur cible à chaque cycle, comme dans le TP d'origine.

## Barème indicatif (sur 20)

InfraLab partie A (3) · plan de tests rempli et justifié (5) · journal d'installation avec erreurs et corrections (4) · sécurité des comptes (3) · comparaison et lien avec InfraLab, partie E (3) · questions « Je comprends » (2).

## Écarts avec le TP d'origine

| TP d'origine | Décision |
|---|---|
| Serveur OCS + plugin OCS dans GLPI | Remplacé par l'inventaire natif et l'agent GLPI ; OCS en variante (cours §5) |
| Installation de GLPI 10.0.x dans `/var/www/html/glpi` avec des commandes génériques (`10.0.x`) | Version **non figée** : dernière version stable à chercher ; structure alignée sur la page d'installation officielle |
| Identifiants `glpi / glpi` donnés sans demander de les changer | Volet sécurité ajouté (partie C6) |
| Douze cycles de reconfiguration de l'agent | Retirés du TP révisé (la liste de serveurs reste dans le cours) |
