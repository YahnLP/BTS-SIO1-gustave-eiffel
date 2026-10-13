# Corrigé (enseignant) – S11 Conteneurs avec DockerLab

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les réponses aux parties A à E sont repliées dans le TP. Ce document ajoute les sorties vérifiées et les pièges.

## Vérification technique

Les commandes de la mission ont été **rejouées dans le moteur de DockerLab** (exécuté en Node, hors navigateur) :

| Preuve | Résultat observé dans le moteur |
|---|---|
| P1 `docker ps` | `jc-web` publie `0.0.0.0:8080->80/tcp` ; `jc-db` n'affiche que `5432/tcp` (non publié) |
| P2 `curl localhost:8080` | affiche la page écrite dans le volume |
| P3 ping depuis alpine sur le réseau | `PING jc-db (172.18.0.2)` : résolu par le DNS interne |
| P4 ping depuis alpine hors réseau | `ping: bad address 'jc-db'` |
| P5 suppression puis recréation de `jc-web` avec le même volume | la page « Bienvenue chez JackCelair » est toujours servie |
| `uname -r` hôte et conteneur | même valeur (`6.8.0-45-generic`, simulée) |
| `docker inspect -f "{{.Config.Env}}"` | le mot de passe apparaît en clair |

## Pièges relevés

- **Noms d'un caractère** (`x`, `y`) : refusés, comme dans un vrai Docker (nom d'au moins deux caractères).
- **`psql`** n'est pas simulé : ne pas demander de requête SQL ; utiliser `docker exec jc-db pg_isready` pour montrer que la base répond.
- **`curl` et `ping`** n'existent pas dans le conteneur nginx de DockerLab : passer par un conteneur `alpine` temporaire (`docker run --rm --network … alpine …`), comme le TP le prévoit.
- Un volume **anonyme** est créé automatiquement pour `postgres` quand aucun volume n'est précisé : bon point d'entrée pour `docker volume ls` et pour la sauvegarde (S20).
- **Commande sur plusieurs lignes** : le terminal de DockerLab accepte-t-il les `\` en fin de ligne ? **Non vérifié** : le TP prévoit la version sur une ligne.

## Écarts avec le projet de séance

- Les parties A à D **réutilisent** quatre TP intégrés à DockerLab plutôt que d'en réécrire : cohérence avec l'outil et vérification automatique. Si l'auteur modifie ces TP, la page de TP reste valable tant que les intitulés restent les mêmes.
- **Barème indicatif (sur 20) :** parties A à D (10 points : captures + réponses « Je comprends ») ; mission (8 points : cahier des charges 4, preuves P1 à P6 3, schéma 1) ; qualité du compte rendu et du journal (2).

## Parties F et G (ajoutées)

- **Non testé** dans l'environnement de rédaction : `apt install docker.io` (paquet de la distribution Debian), les commandes `docker run` et l'accès aux dépôts depuis le réseau du CFA. **À essayer une fois avant la séance.** Si le réseau du CFA bloque le registre d'images, prévoir un travail hors CFA ou une alternative (page Web locale avec le serveur Web installé en S10, par exemple).
- On valide la **trace** (captures datées, commande et résultat), pas un résultat unique. La fiche R1 est notée sur la complétude des rubriques (annexe VII-1-A), pas sur la technique.
- Barème : à ajouter 4 points sur 20 (F : 3, G : 1) en réduisant d'autant la partie E.
