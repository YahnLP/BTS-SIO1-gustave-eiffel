# Corrigé (enseignant) – S18 Cloner et déployer des postes avec FOG

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les réponses aux questions sont repliées dans le TP. **Aucune manipulation n'a été exécutée** dans l'environnement de rédaction : FOG n'a pas été installé. Les commandes et les questions de l'installeur viennent de la **page d'installation officielle de FOG 1.6** et des pages « capture an image » et « deploy an image » consultées à la rédaction.

## À tester avant la séance (sur le matériel de la salle)

| Point | Pourquoi |
|---|---|
| **Branche et version** de FOG (`working-1.6` d'après la page consultée) | La procédure diffère entre 1.5 et 1.6 ; la page officielle fait foi |
| **Étape de la base de données** | L'installeur attend que l'interface web ait créé ou mis à jour le schéma : les étudiants oublient de revenir valider |
| **Démarrage réseau dans VirtualBox** | Type de carte, ordre de démarrage, BIOS ou UEFI : non testé |
| **DHCP de FOG** sur le réseau interne | Le réseau interne doit être commun aux trois VM ; vérifier l'absence de tout autre DHCP |
| **Clonage d'un Linux** (options d'image par défaut) | La documentation prend l'exemple de Windows ; non testé pour Debian |
| **Identifiants initiaux** de l'interface web | La documentation donne un compte et un mot de passe d'une première installation ; non testés ; les faire changer |
| Adresse d'accès à l'interface | La page indique une adresse en HTTPS alors que le HTTPS est facultatif à l'installation : vérifier l'adresse réelle |
| **Temps** : installation, capture, déploiement | Dépendent des disques et de l'hôte ; les durées du TP sont indicatives |
| Accès réseau du serveur (GitHub, dépôts de paquets) | Carte NAT nécessaire pour l'installation |

## Pièges probables

- **Carte réseau en pont** pendant l'installation avec DHCP activé : un second DHCP sur le réseau de la salle. À vérifier **avant** chaque installation.
- Installeur validé **avant** l'étape de la base : installation en échec ; consulter les journaux du dossier `bin`.
- Capture lancée **sans tâche** : le poste affiche seulement le menu.
- Cible de **taille insuffisante** : prévoir un disque au moins égal à celui du modèle.
- Étudiants qui ne **changent pas** les identifiants par défaut : point de sécurité noté dans les tests (T2).
- Compte rendu sans les **réponses de l'installeur** : exiger le tableau du journal.

## Extension Windows (pour les groupes en avance)

La documentation FOG décrit : installer Windows, ses logiciels et pilotes, installer le **client FOG**, **déchiffrer BitLocker**, **sysprep** puis éteindre ; mêmes étapes de capture ensuite. Non testé ici.

## Barème indicatif (20 points)

| Critère | Points |
|---|---|
| Réseau isolé vérifié, plan d'adressage, snapshot | 3 |
| Installation du serveur : réponses justifiées, sécurité (T2) | 4 |
| Capture : image créée, associée, tâche, durée et taille notées | 3 |
| Déploiement et vérification des identités (T6, T7), personnalisation | 4 |
| InfraLab TP 30 : compte rendu exporté, réponses | 3 |
| Questions « Je comprends » (PXE, risques, sysprep, multidiffusion) | 3 |

Le **score d'InfraLab** n'entre pas dans la note.

## Compétences

B2.2 et B1.1 sont une proposition à valider (voir le référentiel du dépôt).

## Partie E (ajoutée)

Évaluation : ordre logique (sauvegarde avant déploiement, effacement après restitution), points de contrôle, retour arrière, mise à jour de l'inventaire. Le **détail technique de l'effacement sécurisé** n'est pas fourni : à compléter avec la politique du CFA ou de l'entreprise (non vérifié).
