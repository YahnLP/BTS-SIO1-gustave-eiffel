# Cours – Automatiser les tâches d'administration

*BTS SIO SISR 1re année – S19 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** scripts Bash (S10) ; conteneurs (S11) ; changements (S15, S17).
> - **Mots déjà vus :** script, variable, boucle, code de retour, utilisateur, droits.
> - **Expliqués dans ce cours :** automatisation, script fiable, création de comptes en masse, `cron`, SSH et clés, annuaire. **Session chargée, soyez concentrés** : les passages marqués <span class="technique">notion technique</span> sont facultatifs.

## À la fin de ce cours, tu sauras

- [ ] décider **quand** automatiser une tâche ;
- [ ] citer les qualités d'un script **fiable** ;
- [ ] **planifier** une tâche avec `cron` ;
- [ ] distinguer une approche **impérative** et **déclarative** ;
- [ ] évaluer les **risques** d'un script.

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **Un script qui a marché une fois est fiable.** » Pas tant qu'il n'a pas été **relancé**, testé sur des données invalides et journalisé (§ 2).
> - « **`cron` voit mon environnement de terminal.** » Non : son environnement est **minimal** ; on utilise des chemins absolus (§ 4).
> - « **Automatiser supprime le besoin de contrôle.** » Un script se trompe **en masse** : on teste, on journalise et on relit le journal (§ 6).

> [!NOTE] Socle et notions techniques
> **Socle à maîtriser :** §§ 1 à 4, 6, 7 et 9 (script fiable, `cron`, risques, SSH). **Notions techniques facultatives :** §§ 5 et 8 (déclaratif, annuaire).

---

## 1. Pourquoi automatiser

| Gain | Explication |
|---|---|
| **Temps** | Une tâche répétée prend du temps à chaque fois ; un script la fait en secondes |
| **Fiabilité** | Un script fait **toujours la même chose** ; l'humain se trompe quand il répète |
| **Traçabilité** | Un script peut tout **journaliser** |
| **Reproductibilité** | Même résultat sur 1 ou 100 machines |
| **Documentation** | Le script **est** la procédure |

**Mais** : un script se trompe aussi, et **en masse**. Une erreur à la main touche un compte ; une erreur de script touche les 22 d'un coup.

> [!NOTE]
> **Automatiser ou pas ?** Une tâche **fréquente**, **bien comprise**, **stable** et **risquée à la main** mérite un script. Une tâche **rare**, **mal comprise** ou qui demande du **jugement** (arbitrer entre deux demandes, par exemple) ne s'automatise pas : on la **documente** d'abord, on la **fait à la main** plusieurs fois, puis on décide.

## 2. Les qualités d'un script fiable

Tu as vu en [S10](../../semestre-1/S10-paquets-scripts-bash/01-cours.md) les variables, conditions, boucles et le script « relançable ». On ajoute ici :

| Qualité | Question à se poser | Exemple |
|---|---|---|
| **Paramétrable** | Les valeurs changent-elles sans modifier le script ? | Fichier d'entrée en argument |
| **Contrôle des entrées** | Que se passe-t-il avec une donnée **invalide** ? | Ligne vide, identifiant avec espace |
| **Idempotent** | Relancé deux fois, le résultat est-il le même, sans erreur ? | « Créer le compte **s'il n'existe pas** » |
| **Mode d'essai** | Peut-on voir ce qui **serait** fait, sans le faire ? | Option `--test` |
| **Journalisé** | Sait-on **ce qui a été fait**, quand, avec quel résultat ? | Fichier de journal daté |
| **Code de retour** | Une autre tâche peut-elle savoir s'il a **réussi** ? | `exit 0` ou `exit` non nul |
| **Sobre en droits** | Faut-il vraiment être administrateur ? | Limiter `sudo` à ce qui est nécessaire |

**Idempotence.** Une commande est **idempotente** si l'exécuter plusieurs fois donne le même état final qu'une seule fois. C'est la qualité qui rend un script **relançable** après un échec partiel : on le relance, il termine ce qui manquait sans casser ce qui existe.

**Ne jamais mettre de secret dans un script** (mot de passe, clé) : il serait lisible par tous ceux qui lisent le script, son historique et ses sauvegardes.

## 3. Créer des comptes en masse : le principe

Exemple de tâche répétitive : à chaque rentrée, créer les comptes d'une liste d'utilisateurs.

<figure class="raid-fig">
<svg viewBox="0 0 720 276" role="img" aria-labelledby="act" xmlns="http://www.w3.org/2000/svg"><title id="act">Création de comptes en masse : validation, existence, mode d'essai, création, journal</title>
<defs><marker id="acm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="6" y="20" width="110" height="56" rx="8" class="rd-blk rd-k-c"/><text x="61.0" y="44.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Lire une</text><text x="61.0" y="60.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">ligne</text><rect x="150" y="20" width="110" height="56" rx="8" class="rd-blk rd-k-d"/><text x="205.0" y="44.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Ligne</text><text x="205.0" y="60.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">valide ?</text><rect x="294" y="20" width="110" height="56" rx="8" class="rd-blk rd-k-d"/><text x="349.0" y="44.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Compte déjà</text><text x="349.0" y="60.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">présent ?</text><rect x="438" y="20" width="110" height="56" rx="8" class="rd-blk rd-k-d"/><text x="493.0" y="44.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Mode</text><text x="493.0" y="60.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">d'essai ?</text><rect x="582" y="20" width="110" height="56" rx="8" class="rd-blk rd-k-b"/><text x="637.0" y="44.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Créer</text><text x="637.0" y="60.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">le compte</text><path d="M117,48 H149" class="rd-arrow" marker-end="url(#acm)"/><path d="M261,48 H293" class="rd-arrow" marker-end="url(#acm)"/><text x="277" y="40" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:700">oui</text><path d="M405,48 H437" class="rd-arrow" marker-end="url(#acm)"/><text x="421" y="40" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:700">non</text><path d="M549,48 H581" class="rd-arrow" marker-end="url(#acm)"/><text x="565" y="40" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:700">non</text><rect x="150" y="140" width="110" height="50" rx="8" class="rd-blk rd-k-a"/><text x="205.0" y="161.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Journaliser</text><text x="205.0" y="177.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">un refus</text><path d="M205,77 V139" class="rd-arrow" marker-end="url(#acm)"/><text x="213" y="112" text-anchor="start" class="rd-note" style="font-size:11px;font-weight:700">non</text><path d="M205,191 V229" class="rd-arrow" marker-end="url(#acm)"/><rect x="294" y="140" width="110" height="50" rx="8" class="rd-blk rd-k-a"/><text x="349.0" y="161.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Journaliser :</text><text x="349.0" y="177.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">déjà existant</text><path d="M349,77 V139" class="rd-arrow" marker-end="url(#acm)"/><text x="357" y="112" text-anchor="start" class="rd-note" style="font-size:11px;font-weight:700">oui</text><path d="M349,191 V229" class="rd-arrow" marker-end="url(#acm)"/><rect x="438" y="140" width="110" height="50" rx="8" class="rd-blk rd-k-a"/><text x="493.0" y="161.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Afficher ce</text><text x="493.0" y="177.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">qui serait fait</text><path d="M493,77 V139" class="rd-arrow" marker-end="url(#acm)"/><text x="501" y="112" text-anchor="start" class="rd-note" style="font-size:11px;font-weight:700">oui</text><path d="M493,191 V229" class="rd-arrow" marker-end="url(#acm)"/><rect x="582" y="140" width="110" height="50" rx="8" class="rd-blk rd-k-a"/><text x="637.0" y="161.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Journaliser</text><text x="637.0" y="177.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">le résultat</text><path d="M637,77 V139" class="rd-arrow" marker-end="url(#acm)"/><path d="M637,191 V229" class="rd-arrow" marker-end="url(#acm)"/><rect x="6" y="230" width="704" height="34" rx="8" class="rd-blk rd-k-c"/><text x="358.0" y="251.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Ligne suivante : retour au début tant qu'il reste des lignes</text>
</svg>
<figcaption>Chaque ligne du fichier passe par les mêmes contrôles ; chaque issue est journalisée.</figcaption>
</figure>

<details markdown="1">
<summary>Comment lire ce schéma</summary>

On suit **une ligne du fichier à la fois**, de gauche à droite. Si la ligne n'est pas valide, on journalise un refus et on passe à la suivante. Si le compte existe déjà, on le note et on passe à la suivante (c'est ce qui rend le script **relançable**). Sinon, en mode d'essai on affiche seulement ce qui serait fait ; hors mode d'essai on crée le compte et on journalise le résultat. Toutes les issues mènent à la même étape : **la ligne suivante**.

</details>




**Je vérifie.** Pourquoi ajoute-t-on un mode d'essai à un script de création de comptes ?

<details markdown="1">
<summary>Voir la réponse</summary>

Parce qu'un script se trompe **en masse** : le mode d'essai montre ce qui **serait** fait sans rien modifier, et permet de corriger le fichier avant de toucher 22 comptes.

</details>

**Je vérifie.** Le script est lancé deux fois de suite sur le même fichier. Que doit-il afficher la deuxième fois ?

<details markdown="1">
<summary>Voir la réponse</summary>

Que les comptes **existent déjà**, sans erreur ni doublon : c'est l'**idempotence**. Si la deuxième exécution échoue ou recrée des comptes, le script n'est pas fiable.

</details>

Commandes utiles sous Debian (administrateur) : `useradd` crée un compte ; `getent passwd NOM` ou `id NOM` teste son existence ; `groupadd` et `getent group` pour les groupes ; `userdel -r` supprime un compte et son dossier. Consulte `man useradd` pour les options.

## 4. Planifier : `cron`

`cron` exécute des commandes à **heures fixes**. Chaque utilisateur a sa **table** (`crontab -e` pour l'éditer, `crontab -l` pour la lister).

Une ligne contient **cinq champs de temps**, puis la commande :

| Champ | Valeurs |
|---|---|
| minute | 0 à 59 |
| heure | 0 à 23 |
| jour du mois | 1 à 31 |
| mois | 1 à 12 |
| jour de la semaine | 0 à 7 (0 et 7 = dimanche) |

<figure class="raid-fig">
<svg viewBox="0 0 720 242" role="img" aria-labelledby="crt" xmlns="http://www.w3.org/2000/svg"><title id="crt">Les cinq champs de temps d'une ligne cron, avec trois exemples lus champ par champ</title>
<defs><marker id="crm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="22" y="8" width="124" height="50" rx="8" class="rd-blk rd-k-b"/><text x="84.0" y="29.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">minute</text><text x="84.0" y="45.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">0 à 59</text><rect x="160" y="8" width="124" height="50" rx="8" class="rd-blk rd-k-b"/><text x="222.0" y="29.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">heure</text><text x="222.0" y="45.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">0 à 23</text><rect x="298" y="8" width="124" height="50" rx="8" class="rd-blk rd-k-b"/><text x="360.0" y="29.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">jour du mois</text><text x="360.0" y="45.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">1 à 31</text><rect x="436" y="8" width="124" height="50" rx="8" class="rd-blk rd-k-b"/><text x="498.0" y="29.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">mois</text><text x="498.0" y="45.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">1 à 12</text><rect x="574" y="8" width="124" height="50" rx="8" class="rd-blk rd-k-b"/><text x="636.0" y="29.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">jour semaine</text><text x="636.0" y="45.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">0 à 7</text><text x="84" y="92" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">30</text><text x="222" y="92" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">7</text><text x="360" y="92" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">*</text><text x="498" y="92" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">*</text><text x="636" y="92" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">1-5</text><text x="360" y="112" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:500">→ 7 h 30, du lundi au vendredi</text><text x="84" y="144" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">*/5</text><text x="222" y="144" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">*</text><text x="360" y="144" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">*</text><text x="498" y="144" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">*</text><text x="636" y="144" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">*</text><text x="360" y="164" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:500">→ toutes les 5 minutes</text><text x="84" y="196" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">0</text><text x="222" y="196" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">2</text><text x="360" y="196" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">1</text><text x="498" y="196" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">*</text><text x="636" y="196" text-anchor="middle" class="rd-t" style="font-family:ui-monospace,Consolas,monospace;font-size:16px;font-weight:700">*</text><text x="360" y="216" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:500">→ à 2 h 00, le 1er de chaque mois</text>
</svg>
<figcaption>On lit toujours de gauche à droite : minute, heure, jour du mois, mois, jour de la semaine ; la commande vient après les cinq champs.</figcaption>
</figure>

<details markdown="1">
<summary>Comment lire ce schéma</summary>

Les cinq cases du haut donnent **l'ordre** et les **valeurs permises** de chaque champ. Chaque exemple en dessous remplit ces cinq champs dans l'ordre ; la phrase sous les chiffres est la **lecture en français**. Pour `30 7 * * 1-5` : minute 30, heure 7, tous les jours du mois (`*`), tous les mois (`*`), du lundi (1) au vendredi (5), donc 7 h 30 en semaine. Une étoile veut dire « peu importe ».

</details>


`*` veut dire « tous » ; `*/5` « toutes les 5 unités ». Exemples : `30 7 * * 1-5` : 7 h 30 du lundi au vendredi ; `*/5 * * * *` : toutes les 5 minutes.


**Je vérifie.** Lis cette ligne de crontab : `15 3 * * 0 /usr/local/bin/sauvegarde.sh`.

<details markdown="1">
<summary>Voir la réponse</summary>

Minute 15, heure 3, tous les jours du mois, tous les mois, jour de la semaine 0 : **dimanche à 3 h 15**, le script est lancé (chemin absolu).

</details>

**Pièges classiques :**

- `cron` a un **environnement minimal** : utilise des **chemins absolus** dans la commande et dans le script ;
- la sortie d'un travail planifié doit être **redirigée** vers un fichier, sinon elle est perdue ou envoyée par courriel local ;
- dans une ligne de crontab, le caractère `%` a un sens spécial : il doit être **protégé** par une barre oblique inverse ;
- un travail planifié qui échoue **en silence** est pire qu'une tâche oubliée : on vérifie les journaux.


**Je vérifie.** Pourquoi la ligne `0 2 * * * date +%F >> /var/log/essai.log` ne se comporte-t-elle pas comme prévu ?

<details markdown="1">
<summary>Voir la réponse</summary>

Dans une crontab, `%` a un **sens spécial** (il marque une fin de ligne de commande) : il faut le protéger par une barre oblique inverse, `\%`. Sinon la commande est coupée.

</details>

> [!NOTE]
> Il existe aussi les **minuteries systemd** (*timers*), plus récentes ; on ne les pratique pas ici. Sur une VM minimale, le service `cron` peut ne pas être installé : vérifie.

## 5. Impératif ou déclaratif <span class="technique">notion technique</span>

> [!TIP] Pour aller plus loin
> Si le temps manque, retiens seulement la différence : **impératif** = je donne les étapes ; **déclaratif** = je décris le résultat voulu. Le fichier Compose et le YAML sont là pour illustrer.

| | **Impératif** | **Déclaratif** |
|---|---|---|
| Idée | Décrire les **étapes** | Décrire l'**état voulu** |
| Exemple | Suite de commandes `docker run`, script Bash | Fichier `compose.yaml` |
| Relance | À soigner (idempotence à écrire soi-même) | Naturelle : l'outil compare l'état voulu et l'état réel |
| Partage | Script à lire | Fichier lisible et **versionné** |

**Docker Compose** décrit une application (services, réseaux, volumes) dans **un fichier YAML** et la pilote avec `docker compose up -d` et `docker compose down`. La commande `up` est **idempotente** : relancée alors que rien n'a changé, elle ne recrée rien (constaté dans le TP de DockerLab).

Le **YAML** est un format où l'**indentation par espaces** (jamais de tabulation) exprime l'imbrication.

> [!NOTE]
> Dans l'industrie, on parle d'« **infrastructure décrite par du code** » : le fichier est conservé dans un dépôt, relu, versionné et rejoué. Compose en est une petite illustration ; d'autres outils font de même pour des serveurs entiers.

## 6. Les risques de l'automatisation

| Risque | Mesure |
|---|---|
| Erreur **en masse** | Mode d'essai, test sur peu de données, sauvegarde avant |
| **Droits** excessifs | Principe du moindre privilège |
| **Secrets** en clair | Jamais dans le script ni en argument ; gestion dédiée |
| Script **non maîtrisé** (copié sans lecture) | Lire avant d'exécuter ; garder une trace de la source |
| Script **oublié** qui continue à tourner | Inventaire des tâches planifiées, revue régulière |
| **Absence de journal** | Journaliser, et lire le journal |

## 7. Automatisation et ITIL

Une **demande standard** (S15, S17), prévisible et bien définie, est la candidate idéale à l'automatisation : création de compte, installation d'un logiciel autorisé. Un **changement standard** (pré-approuvé, risque faible, procédure connue) peut aussi être scripté. Mais le **suivi** reste : la demande est **tracée** dans le ticket, même si l'exécution est automatique.

## 8. Annuaires : centraliser les comptes <span class="technique">notion technique</span>

> [!TIP] Pour aller plus loin
> Les annuaires (LDAP, Active Directory, GPO) dépassent le socle de première année. **Idée à retenir :** un annuaire est une liste centrale des comptes, que plusieurs applications interrogent au lieu d'avoir chacune leurs comptes. Le détail est facultatif ; il sera revu en deuxième année.

Sans **annuaire**, chaque application a ses propres comptes. Un annuaire est une base **en arbre** de personnes, groupes et machines, que les applications interrogent pour **authentifier**. Le protocole **LDAP** (port 389 ; LDAPS, chiffré, 636) l'interroge. Une entrée a un nom unique, le **DN**, par exemple `uid=clefebvre,ou=Personnes,dc=jackcelair,dc=lan` ; elle est décrite par des **attributs** (`uid`, `cn`, `sn`, `mail`) et des **classes d'objet** (`inetOrgPerson`…). On **recherche** avec un filtre (`(uid=clefebvre)`) et on **s'authentifie** par une **liaison** (*bind*) ; un échec renvoie « Invalid credentials ».

| Risque | Parade |
|---|---|
| Mots de passe en clair sur le port 389 | LDAPS ou StartTLS |
| Compte de service trop puissant | Moindre privilège : lecture seule, un compte par application |
| Départs oubliés | Procédure d'arrivée et de départ |

**Active Directory** est l'annuaire de **Microsoft** : il s'appuie sur LDAP, Kerberos et DNS, et ajoute **domaine**, **contrôleur de domaine** et **stratégies de groupe** (GPO) pour configurer les postes. OpenLDAP n'a ni GPO ni gestion des postes. L'annuaire contient des **données personnelles** (S12) : il entre dans le registre des traitements.

## 9. Se connecter à distance : SSH

Un serveur n'a souvent ni écran ni clavier à portée de main : on s'y connecte **par le réseau**. **SSH** (*Secure Shell*) ouvre un **terminal sur une autre machine**, avec une connexion **chiffrée** (illisible pour qui écoute le réseau). Il écoute sur le **port 22** (voir la fiche [minimum réseau](../../ressources/minimum-reseau.md)).

```text
ssh utilisateur@adresse_du_serveur
```

À la **première connexion**, SSH affiche l'**empreinte** du serveur et demande si tu lui fais confiance : c'est la vérification que tu parles bien au bon serveur et pas à un imposteur. Ensuite, tu t'authentifies de deux façons possibles :

| Méthode | Principe | Avantage / limite |
|---|---|---|
| **Mot de passe** | Tu tapes le mot de passe du compte | Simple, mais peut être deviné ou volé |
| **Paire de clés** | Une **clé privée** (secrète, sur ton poste) et une **clé publique** (déposée sur le serveur) | Pas de mot de passe qui circule ; plus sûr |

<figure class="raid-fig">
<svg viewBox="0 0 720 176" role="img" aria-labelledby="skt" xmlns="http://www.w3.org/2000/svg"><title id="skt">Principe d'une paire de clés SSH : la clé publique va sur le serveur, la clé privée reste sur le poste</title>
<defs><marker id="skm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="10" y="20" width="200" height="110" rx="8" class="rd-blk rd-k-c"/><text x="110.0" y="63.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Ton poste</text><text x="110.0" y="79.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">clé PRIVÉE</text><text x="110.0" y="95.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">secrète, jamais partagée</text><rect x="510" y="20" width="200" height="110" rx="8" class="rd-blk rd-k-a"/><text x="610.0" y="63.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Le serveur</text><text x="610.0" y="79.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">clé PUBLIQUE</text><text x="610.0" y="95.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">déposée, copiable</text><path d="M211,55 H509" class="rd-arrow" marker-end="url(#skm)"/><text x="360" y="46" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">1. ssh-copy-id : on envoie la clé publique</text><path d="M211,100 H509" class="rd-arrow" marker-end="url(#skm)"/><text x="360" y="91" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">2. ssh : preuve de possession de la clé privée</text><text x="360" y="160" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:600">La clé privée ne quitte jamais le poste : seul le cadenas (clé publique) voyage.</text>
</svg>
<figcaption>Le serveur reconnaît le poste parce que celui-ci prouve qu'il détient la clé privée associée à la clé publique déposée.</figcaption>
</figure>

<details markdown="1">
<summary>Comment lire ce schéma</summary>

Deux machines, deux clés. La **clé publique** est un cadenas : elle peut être copiée sur le serveur (flèche 1), sans danger si quelqu'un la voit. La **clé privée** est la clé du cadenas : elle reste sur le poste. À la connexion (flèche 2), le poste **prouve** qu'il possède la clé privée sans jamais l'envoyer, et le serveur, qui connaît le cadenas correspondant, le laisse entrer.

</details>


**Comprendre la paire de clés.** C'est comme un cadenas et sa clé. Tu fabriques les deux ensemble : le **cadenas** (clé publique) peut être copié et posé sur autant de serveurs que tu veux ; la **clé** (clé privée) reste chez toi et **ne se partage jamais**. Seule la clé privée ouvre un cadenas qui lui correspond.

| Étape | Commande |
|---|---|
| fabriquer la paire | `ssh-keygen` |
| déposer la clé publique sur le serveur | `ssh-copy-id utilisateur@adresse_du_serveur` |
| se connecter ensuite | `ssh utilisateur@adresse_du_serveur` |

> [!TIP] À toi de chercher
> Avec `man ssh-keygen`, trouve comment choisir le **type de clé** et ce que fait une **phrase secrète** (*passphrase*). Résume-le en deux phrases dans ta fiche.

**Bonnes pratiques :** ne jamais envoyer ni publier sa clé **privée** ; protéger la clé par une phrase secrète ; supprimer la clé publique du serveur quand une personne part.

## Je retiens

- On automatise ce qui est **fréquent, compris, stable**.
- Un script fiable : **paramètres, contrôle des entrées, idempotence, essai, journal, code de retour**.
- `cron` : cinq champs de temps, **chemins absolus**, sortie **redirigée**, `%` protégé.
- **Déclaratif** : on décrit l'état voulu (Compose) ; l'outil fait le reste.
- Un script se trompe **en masse** : on teste d'abord et on journalise.
- **Pas de secret** dans un script.
- **SSH** : terminal à distance chiffré ; une **paire de clés** (publique sur le serveur, privée jamais partagée) évite les mots de passe.
- Un **annuaire** centralise les comptes (LDAP, DN, filtre, liaison) ; **Active Directory** y ajoute domaine et GPO.
