# Cours – Résoudre un incident

*BTS SIO SISR 1re année – S16 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** tickets, priorités, SLA (S15) ; CMDB (S12).
> - **Mots déjà vus :** incident, ticket, impact, urgence, priorité.
> - **Expliqués dans ce cours :** cycle de vie d'un incident, méthode de diagnostic, corrélation, base de connaissances, supervision. Les mots « ping », « port » et « DNS » sont dans la fiche [minimum réseau](../../ressources/minimum-reseau.md).

## À la fin de ce cours, tu sauras

- [ ] décrire le **cycle de vie** d'un incident et ce que le ticket contient à chaque étape ;
- [ ] appliquer la **méthode de diagnostic** (cinq questions, du plus simple au plus complexe) ;
- [ ] distinguer **réalité** et **connaissance de l'outil** ;
- [ ] **corréler** plusieurs tickets avant d'intervenir ;
- [ ] rédiger une **fiche de connaissance** utile à un collègue.

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **Hors ligne, ça veut dire éteint.** » Non : l'outil dit seulement que le serveur **ne joint plus** l'équipement (§ 2).
> - « **Redémarrer règle tout.** » Cela peut masquer la cause et effacer des indices : on diagnostique d'abord, **une action à la fois** (§ 3).
> - « **Si plusieurs postes sont touchés, chaque utilisateur a un problème différent.** » C'est le plus souvent **un seul** élément partagé en amont (§ 4).

---

## 1. Le cycle de vie d'un incident

Un incident traverse sept étapes. À chacune correspond ce qu'on ajoute au ticket :

| Étape | Ce qu'on ajoute au ticket |
|---|---|
| 1. Signalement | Rien : le ticket n'existe pas encore |
| 2. Enregistrement | Qui, description, date et heure, équipement concerné |
| 3. Qualification | Catégorie, impact, urgence (donc priorité), niveau, délai applicable |
| 4. Diagnostic | Actions tentées et résultats observés |
| 5. Résolution | Solution appliquée, étapes détaillées |
| 6. Validation | Confirmation de l'utilisateur (date, moyen) |
| 7. Clôture | Temps de résolution, fiche de connaissance à créer |

> [!WARNING]
> **Le ticket se remplit en temps réel, pas de mémoire après coup.** Un ticket rédigé après la résolution perd la chronologie et les **hypothèses écartées**, qui servent pourtant la fois suivante.

**Les canaux.** Un ticket arrive par portail, courriel, téléphone ou passage au bureau. Si le poste est coupé du réseau, le portail est inaccessible : le téléphone est le recours, et le service desk saisit à la place de l'utilisateur. La saisie « brute » est incomplète : à toi de la **compléter** (équipement, qualification).

## 2. Réalité et connaissance de l'outil

Deux choses à ne pas confondre :

- la **réalité** : ce qui existe et fonctionne vraiment (câble branché, alimentation, adresse IP) ;
- la **connaissance de l'outil** : ce que l'agent ou le réseau lui a rapporté.

« **Hors ligne** » dans l'outil veut dire **non joignable par le serveur de gestion**, pas forcément éteint. Le geste central du dépannage est de **comparer** les deux : l'outil dit hors ligne ; la réalité montre quoi ?

> **Dans InfraLab** (TP, partie A) : le TP 16 « PC déconnecté » te fait comparer ce que dit l'outil et ce que montre le schéma.

Un incident n'est résolu que lorsque le service est constaté rétabli **des deux côtés** : la réalité (ça marche) et l'outil (il revoit l'équipement).

## 3. La méthode de diagnostic

**Du plus simple au plus complexe** : avant de toucher au logiciel, vérifie le câble ; avant le câble, vérifie que la machine est allumée. On remonte ainsi la chaîne : **alimentation, câble, carte réseau, adresse, service, application**. (Pour les curieux : cela correspond à une remontée des couches du modèle OSI, de la couche physique vers l'application.)

**Cinq questions, dans l'ordre :**

| Question | Ce qu'elle révèle |
|---|---|
| 1. Est-ce que ça a déjà fonctionné ? | Régression ou jamais configuré |
| 2. Qu'est-ce qui a changé récemment ? | Cause immédiate probable (mise à jour, déplacement, nouveau câble) |
| 3. Est-ce reproductible ? | Ponctuel ou permanent |
| 4. Est-ce isolé ou généralisé ? | Un poste → le poste ; plusieurs → réseau ou serveur |
| 5. Y a-t-il un message d'erreur ? | Information directe : **copie-le exactement**, ne le paraphrase pas |

**Une action à la fois.** Si tu en fais deux, tu ne sais pas laquelle a agi.

**Je vérifie.** Un poste apparaît « hors ligne » dans l'outil. Quelle est la première vérification, et pourquoi ?

<details markdown="1">
<summary>Voir la réponse</summary>

Regarder **la réalité** : le poste est-il allumé, le câble branché ? « Hors ligne » veut dire non joignable par le serveur, pas forcément éteint. On part du plus simple.

</details>

**Je vérifie.** Pourquoi ne change-t-on qu'une chose à la fois pendant un diagnostic ?

<details markdown="1">
<summary>Voir la réponse</summary>

Si deux actions sont faites ensemble et que le problème disparaît, **on ne sait pas laquelle l'a corrigé** : la fiche de connaissance serait fausse et la cause pourrait revenir.

</details>


## 4. Plusieurs tickets, une cause

Quand plusieurs équipements tombent **en même temps**, la cause est rarement chez chacun : elle est le plus souvent **en amont**, dans un élément qu'ils partagent (commutateur, serveur, hôte de virtualisation). Avant d'intervenir poste par poste, **corrèle** : qu'ont-ils en commun ?

<figure class="raid-fig">
<svg viewBox="0 0 720 236" role="img" aria-labelledby="cot" xmlns="http://www.w3.org/2000/svg"><title id="cot">Une cause commune en amont produit plusieurs postes hors ligne, donc plusieurs tickets</title>
<defs><marker id="com" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="255" y="10" width="210" height="50" rx="8" class="rd-blk rd-k-d"/><text x="360.0" y="31.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Cause commune</text><text x="360.0" y="47.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">commutateur éteint</text><rect x="60" y="96" width="110" height="50" rx="8" class="rd-blk rd-k-b"/><text x="115.0" y="117.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Poste 1</text><text x="115.0" y="133.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">hors ligne</text><rect x="60" y="176" width="110" height="46" rx="8" class="rd-blk rd-k-a"/><text x="115.0" y="195.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Ticket 1</text><text x="115.0" y="211.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">9 h 02</text><path d="M115,147 V175" class="rd-arrow" marker-end="url(#com)"/><rect x="305" y="96" width="110" height="50" rx="8" class="rd-blk rd-k-b"/><text x="360.0" y="117.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Poste 2</text><text x="360.0" y="133.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">hors ligne</text><rect x="305" y="176" width="110" height="46" rx="8" class="rd-blk rd-k-a"/><text x="360.0" y="195.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Ticket 2</text><text x="360.0" y="211.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">9 h 03</text><path d="M360,147 V175" class="rd-arrow" marker-end="url(#com)"/><rect x="550" y="96" width="110" height="50" rx="8" class="rd-blk rd-k-b"/><text x="605.0" y="117.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Poste 3</text><text x="605.0" y="133.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">hors ligne</text><rect x="550" y="176" width="110" height="46" rx="8" class="rd-blk rd-k-a"/><text x="605.0" y="195.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Ticket 3</text><text x="605.0" y="211.0" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">9 h 05</text><path d="M605,147 V175" class="rd-arrow" marker-end="url(#com)"/><path d="M300,61 L135,95" class="rd-arrow" marker-end="url(#com)"/><path d="M360,61 V95" class="rd-arrow" marker-end="url(#com)"/><path d="M420,61 L605,95" class="rd-arrow" marker-end="url(#com)"/>
</svg>
<figcaption>Trois tickets arrivés à quelques minutes d'intervalle pointent vers l'élément partagé : le commutateur.</figcaption>
</figure>

**Comment lire ce schéma.** On part du **haut** : un seul élément en panne (le commutateur) rend **hors ligne** les trois postes qui en dépendent, et chaque utilisateur ouvre **son** ticket. On voit donc trois tickets à l'arrivée, mais une seule cause à la source. La démarche est de **remonter** des tickets vers ce que les postes ont en commun, puis d'agir **une fois** sur la cause.



**Exemple de corrélation (cas fictif, NovaTech).**

| Heure | Ticket | Poste | Lieu |
|---|---|---|---|
| 9 h 02 | INC-0101 | PC-A | Couloir 2 |
| 9 h 03 | INC-0102 | PC-B | Couloir 2 |
| 9 h 05 | INC-0103 | PC-C | Couloir 2 |

Démarche : trois pannes en trois minutes, **même couloir** ; chaque poste est branché sur le **même commutateur** (on le lit dans la CMDB ou sur le schéma). Hypothèse : le commutateur, pas les postes. Vérification : le commutateur est-il alimenté ? Une seule action, et les trois postes reviennent. On traite ensuite **chaque ticket séparément** : résolution, vérification auprès de l'utilisateur, clôture.


**Je vérifie.** Pourquoi n'est-il pas efficace d'intervenir poste par poste dans ce cas ?

<details markdown="1">
<summary>Voir la réponse</summary>

Parce que la cause est **en amont** : trois interventions identiques sur les postes ne règlent rien tant que le commutateur est éteint. On perd du temps et on rate la cause.

</details>

Une seule action sur la bonne cause rétablit tout ce qui en dépendait. > **Dans InfraLab** (TP, parties B et C) : le TP 18 « Switch en panne » et le TP 19 « Plusieurs utilisateurs impactés » appliquent cette logique. Les TP 17 (serveur arrêté), 20 (incident majeur) et 43 (arrêt d'un hyperviseur) sont proposés en prolongement.

Chaque ticket garde pourtant **sa propre résolution** et **sa propre vérification** auprès de son utilisateur. Traiter la cause commune est le début de la **gestion des problèmes** (ITIL).

## 5. La base de connaissances

Une **fiche de connaissance** transforme l'expérience d'un technicien en capital collectif : trois mois plus tard, un autre technicien rencontre le même incident et trouve la solution en quelques minutes.

| Section | Contenu |
|---|---|
| Titre | Le symptôme, en une phrase |
| Symptômes | Ce que voit l'utilisateur |
| Causes connues | 1 à 3, les plus fréquentes |
| Solution | Étapes numérotées et précises |
| Vérification | Comment s'assurer que c'est résolu |
| Escalade | Quand passer au niveau supérieur |
| Mots-clés | Pour la recherche |

La **solution d'un ticket** se rédige en quatre éléments : **symptôme constaté**, **cause**, **action réalisée**, **vérification**. Cette solution est la matière première de la fiche.

## 6. Diagnostiquer un poste Windows lent (partie D)

Ordre de la méthode : **ressources**, puis **processus et services**, puis **disque et démarrage**.

| Que vérifier ? | Moyen |
|---|---|
| Processeur, mémoire, disque en direct | Gestionnaire des tâches (Ctrl+Maj+Échap), onglet Performances |
| Processus les plus gourmands | PowerShell (commande ci-dessous) |
| Espace disque | `Get-PSDrive -PSProvider FileSystem` |
| Services automatiques arrêtés | `Get-Service` filtré sur l'état |
| Programmes lancés au démarrage | `Get-CimInstance Win32_StartupCommand` |

```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10 Name, CPU, WorkingSet
```

> [!NOTE]
> **Commandes et versions.** Tu rencontreras sur Internet la commande `wmic`, **retirée ou désactivée** dans les versions récentes de Windows. Les commandes PowerShell ci-dessus sont des commandes de référence, à **tester sur la VM de la salle** : note les écarts.

Les seuils de repos souvent cités (processeur sous 80 %, mémoire sous 85 %, disque sous 80 %, plus de 10 % d'espace libre) sont des **repères**, pas des normes : juge toujours **par comparaison** avec un poste sain.

## Détecter avant l'utilisateur : la supervision

La **supervision** consiste à **surveiller en continu** l'état des équipements et des services, à **alerter** quand quelque chose sort de la normale, et à **garder l'historique**. Elle est **proactive** : elle voit parfois la panne **avant** l'utilisateur, ou avant qu'elle n'arrive (disque presque plein).

| Pratique | Question à laquelle elle répond |
|---|---|
| **Inventaire** (S12) | Qu'avons-nous ? |
| **Supervision** | Est-ce que ça marche **maintenant** ? |
| **Dépannage** (cette séance) | **Pourquoi** ça ne marche plus ? |
| **Sauvegarde** (S20) | Peut-on **récupérer** ? |

**Quoi surveiller ?** La disponibilité (ping, port ouvert), le service (page Web, base), les ressources (processeur, mémoire, **espace disque**), des éléments de sécurité (certificat qui expire), un traitement métier (la sauvegarde de la nuit a-t-elle eu lieu ?). On choisit ce qui a un **impact** et on suit la CMDB : services critiques d'abord.

**Comment ?** Une **sonde active** interroge la cible depuis l'extérieur (ping, port TCP, requête HTTP) et voit ce que l'utilisateur voit ; un **agent** installé sur la cible voit l'intérieur ; le protocole **SNMP** (UDP 161) interroge les équipements réseau et les imprimantes. Les anciennes versions de SNMP protègent l'accès par une simple « communauté » en clair ; la version 3 ajoute authentification et chiffrement.

**Seuils et états.** Un seuil fixe quand une mesure devient anormale. On utilise couramment trois états : **OK**, **avertissement**, **critique** (par exemple disque à 80 % puis 90 %). Trop bas, les seuils déclenchent des **fausses alertes** qu'on finit par ignorer ; trop hauts, ils préviennent trop tard. Une alerte dit **quoi**, **où**, **depuis quand**, quelle **gravité**, et vers **qui**. Elle donne un **ticket** (S15) traité selon son SLA (S17).

**Disponibilité mesurée** = temps où le service répond ÷ temps total. Sur 30 jours (43 200 minutes), 99,9 % tolère 43,2 minutes d'arrêt.

**Outils** (licences et versions à vérifier) : Zabbix, Nagios et dérivés, Centreon (complets, plus lourds) ; Uptime Kuma (léger, disponibilité de sites et de ports) ; outils intégrés des hébergeurs.

## Je retiens

- Sept étapes ; le ticket se remplit **en temps réel**.
- **Hors ligne ≠ éteint** : on compare l'outil et la réalité.
- Cinq questions, **une action à la fois**, du plus simple au plus complexe.
- Plusieurs symptômes simultanés : **chercher la cause commune en amont**.
- Résolu = constaté **des deux côtés** ; chaque ticket a sa solution et sa vérification.
- Une solution bien rédigée devient une **fiche de connaissance**.
- La **supervision** surveille, alerte et garde l'historique : sondes, agents, SNMP, seuils (OK, avertissement, critique).
