# Exercices à ouvrir dans DockerLab

*BTS SIO SISR 1re année – S11 – deux laboratoires préparés, à télécharger puis à ouvrir dans [DockerLab](https://yahnlp.github.io/DockerLab/)*

> [!NOTE] Comment ouvrir un exercice
> 1. **Télécharge** le fichier de l'exercice (lien ci-dessous).
> 2. Ouvre **[DockerLab](https://yahnlp.github.io/DockerLab/)**, clique sur **Ouvrir** (barre du haut) et choisis le fichier `.json` : le laboratoire apparaît **déjà préparé**, comme un serveur que tu découvres.
> 3. Travaille dans le terminal de DockerLab, puis **réponds ici**.
>
> DockerLab est un **simulateur** : ces exercices servent à comprendre avant de passer au réel (partie F du TP).

---

## Exercice 1 – Que dit le code de sortie ?

**Fichier :** [dockerlab-exercice-codes-de-sortie.json](dockerlab-exercice-codes-de-sortie.json){ download }

**Situation.** Cinq conteneurs se sont arrêtés : `tache`, `script`, `attente`, `site` et `base`. Tu dois comprendre **pourquoi** chacun s'est arrêté, à partir de ce que Docker en dit.

**J'anticipe.** Sans rien taper : selon toi, lesquels se sont arrêtés **normalement** ? ______________________

**Je constate.** Tape `docker ps -a` et complète :

| Conteneur | Code de sortie (colonne STATUS) |
|---|---|
| `tache` | |
| `script` | |
| `attente` | |
| `site` | |
| `base` | |

Pour chacun, regarde aussi `docker logs NOM` : un journal vide est lui aussi une information.

**Je comprends.**

1. `base` : que dit son journal ? Comment le **corriger** ? (Fais-le : supprime-le, recrée-le, vérifie avec `docker ps`.) ______________________
2. `script` s'est arrêté avec un code différent de 0 mais son journal est vide. Que peut-on **en conclure**, et que **ne peut-on pas** en conclure ? ______________________
3. `attente` (la commande `sleep 3600`) et `site` (un serveur Web) ont **tous deux** été arrêtés avec `docker stop`. Pourquoi leurs codes ne sont-ils pas les mêmes ? ______________________
4. Retrouve le **numéro du signal** : 137 − 128 = ? Et pour 143 ? ______________________

<details markdown="1">
<summary>Éléments de réponse</summary>

| Conteneur | Code | Lecture |
|---|---|---|
| `tache` | 0 | a fini son travail (afficher « bonjour ») : fin normale |
| `script` | 3 | le programme a **lui-même** demandé à sortir avec 3 (commande `exit 3`) |
| `attente` | 137 | tué brutalement (128 + 9, SIGKILL) |
| `site` | 0 | s'est arrêté proprement quand Docker le lui a demandé |
| `base` | 1 | erreur de l'application : mot de passe absent |

1. Le journal dit qu'il faut définir `POSTGRES_PASSWORD`. Correction : `docker rm base`, puis `docker run -d --name base -e POSTGRES_PASSWORD=exemple postgres:16`. `docker ps` doit montrer l'état **Up**.
2. Un code différent de 0 signale une **erreur ou un arrêt anormal** ; il ne dit pas **laquelle** : la signification du numéro est choisie par le programme. Il faut chercher ailleurs (journal, documentation, configuration).
3. `docker stop` envoie d'abord une demande d'arrêt propre (SIGTERM). Le serveur Web la **traite** et se ferme : code 0. `sleep` ne la traite pas : Docker attend **10 secondes**, puis envoie SIGKILL : 137.
4. 137 − 128 = **9** (SIGKILL) ; 143 − 128 = **15** (SIGTERM).

</details>

---

## Exercice 2 – Retrouve la commande

**Fichier :** [dockerlab-exercice-retrouver-la-commande.json](dockerlab-exercice-retrouver-la-commande.json){ download }

**Situation.** Un collègue a lancé deux conteneurs, `site` et `base`, puis il est parti sans rien noter. Tu dois **retrouver les commandes** qu'il a tapées, uniquement en **observant l'état** du serveur.

> [!WARNING]
> **Règle du jeu :** n'utilise pas `history` (il contient la réponse). Sur un vrai serveur que tu découvres, tu n'as que l'état des conteneurs : c'est ce que tu apprends à lire.

**J'anticipe.** Les deux conteneurs tournent. Selon toi, quel élément d'une commande `docker run` est **impossible à deviner** sans regarder ? ______________________

**Je constate.** Complète le tableau avec les commandes suivantes.

| Ce que je cherche | Où le trouver | Ma réponse |
|---|---|---|
| Image et tag de chaque conteneur | `docker ps` (colonne IMAGE) | |
| Port **publié** | `docker ps` (colonne PORTS), `docker port site` | |
| Réseau utilisé | `docker network ls`, puis `docker network inspect app` | |
| Volume | `docker volume ls`, puis `docker inspect -f "{{json .Mounts}}" base` | |
| Variable d'environnement | `docker inspect -f "{{.Config.Env}}" base` (cherche celle qui **n'appartient pas** à l'image : les autres sont fournies par l'image) | |

**Je comprends.**

1. Écris les **deux commandes** `docker run` complètes, **et** celle qui a créé le réseau. ______________________
2. Lequel des deux conteneurs est **joignable depuis l'extérieur** ? Comment le vois-tu ? ______________________
3. Pourquoi la base peut-elle être jointe par le site, alors qu'aucun port n'est publié ? ______________________

<details markdown="1">
<summary>Éléments de réponse</summary>

**1. Les commandes.**

```text
docker network create app
docker run -d --name site --network app -p 8080:80 nginx:1.27
docker run -d --name base --network app -e POSTGRES_PASSWORD=exemple -v donnees:/var/lib/postgresql/data postgres:16
```

L'ordre des options n'a pas d'importance, mais l'**image** (avec son tag) vient **en dernier**.

**2.** Le **site** : la colonne PORTS de `docker ps` indique `0.0.0.0:8080->80/tcp`. La base n'affiche que `5432/tcp`, **sans** flèche : son port n'est pas publié.

**3.** Les deux conteneurs sont sur le **même réseau Docker** : ils se joignent **par leur nom** (`base`), sans passer par l'hôte.

</details>
