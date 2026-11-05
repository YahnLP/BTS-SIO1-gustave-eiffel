# S11 – Conteneurs avec DockerLab

| Élément | Détail |
|---|---|
| **Niveau** | BTS SIO option SISR, 1re année |
| **Séance** | S11 – semaine 11 (semestre 2) |
| **Durée** | 4 heures |
| **Prérequis** | Virtualisation ([S06](../../semestre-1/S06-virtualisation-premieres-vm/README.md) et [S07](../../semestre-1/S07-virtualisation-avancee/README.md)) ; terminal Linux ([S08](../../semestre-1/S08-terminal-commandes-de-base/README.md) à [S10](../../semestre-1/S10-paquets-scripts-bash/README.md)) |
| **Matériel** | Un navigateur par étudiant : **[DockerLab](https://yahnlp.github.io/DockerLab/)** (aucune installation) |
| **Compétences travaillées** | B2.2 · B2.3 · B1.5 (voir [le référentiel](../../ressources/referentiel.md)) |

> [!NOTE]
> **Question qui guide la séance :** *« Une machine virtuelle met une minute à démarrer et pèse plusieurs gigaoctets. Une application peut-elle être isolée, déplacée et redémarrée en une seconde ? Et que devient la base de données quand on supprime le conteneur ? »*

## Objectifs

À la fin de la séance, l'étudiant est capable de :

1. **Comparer** une machine virtuelle et un conteneur (noyau, poids, démarrage, isolation) ;
2. **Distinguer** image, conteneur, registre et tag ;
3. **Piloter** le cycle de vie d'un conteneur (`run`, `ps`, `logs`, `stop`, `start`, `rm`) ;
4. **Publier un port** et **configurer** un conteneur avec des variables d'environnement ;
5. **Conserver des données** avec un **volume** et le démontrer ;
6. **Relier** des conteneurs par un **réseau** et les joindre **par leur nom** ;
7. **Diagnostiquer** un conteneur en panne (`ps -a`, `logs`, `inspect`, code de sortie) ;
8. **Déployer** un petit service complet (site + base de données) et **prouver** qu'il fonctionne.

## Contenu de la séance

| Document | Rôle |
|---|---|
| [TP : du conteneur au service](02-tp.md) | **À faire en premier** : Quatre TP guidés de DockerLab, puis une mission complète, bilan de compétences |
| [Cours](01-cours.md) | **À lire après le TP**, pour confronter ses résultats : Machine virtuelle ou conteneur, image, cycle de vie, ports, variables, volumes, réseaux, diagnostic |
| [Aide-mémoire](03-aide-memoire.md) | Les commandes Docker de la séance |
| [Journal de commandes](tp/journal-de-commandes.md) | Modèle de journal à tenir pendant la mission |
| [Exercices à ouvrir dans DockerLab](tp/exercices-dockerlab.md) | Deux laboratoires préparés (`.json`) à ouvrir avec le bouton *Ouvrir* de DockerLab : codes de sortie, retrouver la commande |

## Déroulé conseillé (4 h)

| Durée | Activité | Format |
|---|---|---|
| 0 h 00 – 0 h 10 | **Accroche** : démarrer une VM, puis un conteneur : comparer | Démonstration |
| 0 h 10 – 0 h 35 | **TP partie A** : première rencontre avec Docker | Individuel ou binôme |
| 0 h 35 – 1 h 05 | **Confrontation** et mini-cours : conteneurs, image, cycle de vie (cours §1 à §4) | Mise en commun, cours et questions |
| 1 h 05 – 1 h 35 | **TP partie B** : le cycle de vie d'un conteneur | Individuel ou binôme |
| 1 h 35 – 1 h 50 | Pause |  |
| 1 h 50 – 2 h 25 | **TP partie C** : ports et variables d'environnement | Individuel ou binôme |
| 2 h 25 – 3 h 00 | **TP partie D** : volumes | Individuel ou binôme |
| 3 h 00 – 3 h 40 | **TP partie E** : mission « le site et la base de JackCelair » (réseaux) | Binôme |
| 3 h 40 – 4 h 00 | **Bilan de compétences** et retour sur les « pourquoi » | Individuel puis oral |

Les TP de DockerLab « Dépannage », « Réseaux Docker » et « Faire le ménage » sont proposés aux étudiants qui avancent vite ou à reprendre en autonomie.

## Évaluation

- Compte rendu PDF nommé `RENDU-S11-NOM.pdf`, avec les captures et le journal de commandes de la mission.
- Bilan de compétences rempli à la fin du TP (individuel).

<details markdown="1">
<summary>Notes pour l'enseignant</summary>

- **Choix pédagogique :** le TP précède le cours. L'élève cherche seul (essais, observation, aides données, Web), se trompe parfois, puis confronte ses réponses au cours : l'écart entre ce qu'il pensait et ce qui est établi crée le conflit cognitif qui fixe la notion. Il n'a donc pas le cours sous les yeux pendant le TP ; les « éléments de réponse » repliés restent à ouvrir **après** l'essai.
- **Support :** la séance s'appuie sur **DockerLab** (outil de l'auteur du site) : ses TP « Première rencontre avec Docker », « Le cycle de vie d'un conteneur », « Publier des ports et configurer par variables » et « Volumes : garder ses données quand le conteneur disparaît » sont intégrés au simulateur avec consignes commentées et vérification automatique. Cette page ne les **reproduit pas** : elle les **encadre** (anticiper, comprendre, preuves) et ajoute une mission finale.
- **Vérification technique :** j'ai relu le code du dépôt DockerLab (liste de commandes, 18 TP, 13 images) et **rejoué en Node** les commandes de la mission dans son moteur : elles produisent bien le comportement décrit. Je n'ai **pas** ouvert l'interface dans un navigateur : les intitulés exacts des boutons (« TP d'exemple », « Nouveau », « Recommencer ») viennent du README du dépôt.
- **Limites du simulateur** (d'après son README et mes essais) : aucun vrai programme exécuté, 13 images (alpine, busybox, ubuntu, debian, nginx, httpd, redis, postgres, mysql, mariadb, node, python, hello-world), `psql` non simulé (seul `pg_isready` répond), `curl` et `ping` absents des conteneurs nginx (ils existent dans alpine). Docker réel : à montrer en démonstration si la salle l'autorise.
- **Licence de DockerLab :** EUPL 1.2, comme le Simulateur Réseau (indication de l'auteur) ; le dépôt de l'outil ne contient pas encore de fichier `LICENSE` (voir la page des licences).
- **Suite :** Docker Compose et Dockerfile sont aussi simulés par DockerLab (TP intégrés) : à réserver à une séance ultérieure (automatisation, S19) si le planning le permet.
- **Compétences :** codes et intitulés relus sur l'arrêté du 8 juillet 2024 ; le choix des compétences pour cette séance est une proposition de l'enseignant.

</details>
