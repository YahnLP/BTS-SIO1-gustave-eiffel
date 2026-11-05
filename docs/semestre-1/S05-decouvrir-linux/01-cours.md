# Cours – Découvrir Linux

*BTS SIO SISR 1re année – S05 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** ce qu'est un système d'exploitation, ses licences et ses outils (S04).
> - **Mots déjà vus :** noyau, système d'exploitation, logiciel libre, licence.
> - **Expliqués dans ce cours :** distribution, environnement de bureau, GPL, familles de distributions, comparaison Windows/Linux. `sudo` et `root` sont seulement **présentés** ; tu les utiliseras vraiment en S08.

## À la fin de ce cours, tu sauras

- [ ] situer **Unix**, **GNU**, **Linux**, **Internet** et le **Web** dans le temps ;
- [ ] distinguer **noyau**, **distribution** et **environnement de bureau** ;
- [ ] présenter les **familles** Debian et Red Hat et leur gestionnaire de paquets ;
- [ ] expliquer ce qu'est une licence **libre** (GPL) ;
- [ ] comparer **Windows** et **Linux** sur quelques points concrets ;
- [ ] identifier les **sujets de veille** liés à ce domaine (énergie, quantique, protection).

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **Linux est un système d'exploitation.** » À l'origine, Linux est seulement un **noyau** ; un système complet est une **distribution** (§ 2).
> - « **Linux est réservé aux informaticiens.** » Faux : des bureaux graphiques existent ; en revanche, sur un **serveur**, on travaille surtout en ligne de commande (§ 2).
> - « **Libre veut dire gratuit.** » Non : le libre porte sur les **libertés**, pas sur le prix (§ 4).

---

## 1. D'où vient Linux ?

| Date | Événement |
|---|---|
| **1969** | Premier lien du réseau **ARPANET** (États-Unis) ; naissance d'**Unix** aux Bell Labs |
| **Années 1970** | Le langage **C** est créé pour réécrire Unix ; Unix se répand dans les universités |
| **1983** | Le réseau ARPANET adopte **TCP/IP**, base d'Internet ; lancement du projet **GNU** (système libre) |
| **1989** | Tim Berners-Lee propose le **Web** au CERN |
| **1991** | Linus Torvalds annonce le **noyau Linux** |
| **1993** | Création de **Debian** |
| **2004** | Première version d'**Ubuntu** |

> [!NOTE]
> Les dates sont celles couramment citées : tu les **vérifies** avec une source en TP.

**L'idée.** Le projet **GNU** fournissait presque tout un système libre (compilateur, commandes, outils) mais **pas de noyau fonctionnel**. Le **noyau Linux** a comblé ce manque. D'où le nom **GNU/Linux** pour désigner le système complet.

## 2. Noyau, distribution, environnement de bureau

| Notion | Ce que c'est | Exemple |
|---|---|---|
| **Noyau** (*kernel*) | Le cœur : matériel, processus, mémoire. **Linux** désigne **à l'origine** ce noyau | Le noyau Linux |
| **Distribution** | Un **système complet** assemblé : noyau + commandes + logiciels + **gestionnaire de paquets** + choix de configuration | Debian, Ubuntu, Fedora |
| **Environnement de bureau** | L'interface graphique (fenêtres, menus), optionnelle | GNOME, KDE Plasma, Xfce |

<figure class="raid-fig">
<svg viewBox="0 0 720 358" role="img" aria-labelledby="ly-t" xmlns="http://www.w3.org/2000/svg"><title id="ly-t">Les couches d'un système Linux : matériel, noyau, outils GNU, paquets, bureau, applications</title>
<rect x="20" y="14" width="440" height="50" rx="8" class="rd-blk rd-k-c"/><text x="240.0" y="36" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Applications</text><text x="240.0" y="52" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">navigateur, bureautique, serveur Web…</text><rect x="20" y="72" width="440" height="50" rx="8" class="rd-blk rd-k-d"/><text x="240.0" y="94" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Environnement de bureau (optionnel)</text><text x="240.0" y="110" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">GNOME, KDE Plasma, Xfce</text><rect x="20" y="130" width="440" height="50" rx="8" class="rd-blk rd-k-b"/><text x="240.0" y="152" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Gestionnaire de paquets et dépôts</text><text x="240.0" y="168" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">apt, dnf : installer, mettre à jour</text><rect x="20" y="188" width="440" height="50" rx="8" class="rd-blk rd-k-b"/><text x="240.0" y="210" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Outils GNU : commandes, bibliothèques</text><text x="240.0" y="226" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">ls, cp, bash, compilateur</text><rect x="20" y="246" width="440" height="50" rx="8" class="rd-blk rd-k-a"/><text x="240.0" y="268" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Noyau Linux</text><text x="240.0" y="284" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">matériel, processus, mémoire</text><rect x="20" y="304" width="440" height="40" rx="8" class="rd-disk"/><text x="240" y="329" text-anchor="middle" class="rd-t">Matériel</text><path d="M474,70 L484,70 L484,296 L474,296" fill="none" class="rd-arrow"/><text x="494" y="175" class="rd-name" style="font-size:13px">Distribution</text><text x="494" y="193" class="rd-note" style="font-size:12px">= tout cela,</text><text x="494" y="209" class="rd-note" style="font-size:12px">assemblé et</text><text x="494" y="225" class="rd-note" style="font-size:12px">maintenu</text>
</svg>
<figcaption>Une distribution assemble le noyau Linux, les outils GNU, un gestionnaire de paquets et, au choix, un bureau.</figcaption>
</figure>
On peut donc avoir **le même noyau** et des systèmes qui se ressemblent peu. Sur un **serveur**, on installe souvent **sans** environnement de bureau : on administre en **ligne de commande**.


**Je vérifie.** Ubuntu et Linux Mint utilisent le même noyau. Pourquoi sont-elles pourtant deux distributions différentes ?

<details markdown="1">
<summary>Voir la réponse</summary>

Parce qu'une distribution, c'est **plus que le noyau** : le choix des logiciels, du bureau, de la configuration et des mises à jour fait la différence.

</details>

## 3. Les grandes familles

| Famille | Exemples | Format de paquet / outil | Remarques |
|---|---|---|---|
| **Debian** | **Debian**, Ubuntu, Linux Mint, **Kali Linux** | `.deb` · **`apt`** / `dpkg` | Debian est un projet communautaire ; Ubuntu et Kali sont **dérivées** de Debian |
| **Red Hat** | Red Hat Enterprise Linux (RHEL), Fedora, Rocky Linux, AlmaLinux | `.rpm` · **`dnf`** / `rpm` | RHEL est commercial (abonnement de support) ; Fedora est la version communautaire proche |

<figure class="raid-fig">
<svg viewBox="0 0 720 270" role="img" aria-labelledby="fa-t" xmlns="http://www.w3.org/2000/svg"><title id="fa-t">Deux familles de distributions : Debian et ses dérivées, Red Hat et ses compatibles</title>
<defs><marker id="fl" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><text x="30" y="24" class="rd-name" style="font-size:13px">Famille Debian : .deb, apt</text><rect x="120" y="36" width="130" height="46" rx="8" class="rd-blk rd-k-a"/><text x="185.0" y="56" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Debian</text><text x="185.0" y="72" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">communautaire</text><rect x="30" y="120" width="130" height="46" rx="8" class="rd-blk rd-k-a"/><text x="95.0" y="140" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Ubuntu</text><text x="95.0" y="156" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">dérivée de Debian</text><rect x="210" y="120" width="130" height="46" rx="8" class="rd-blk rd-k-a"/><text x="275.0" y="140" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Kali Linux</text><text x="275.0" y="156" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">dérivée de Debian</text><rect x="30" y="204" width="130" height="46" rx="8" class="rd-blk rd-k-a"/><text x="95.0" y="224" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Linux Mint</text><text x="95.0" y="240" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">dérivée d'Ubuntu</text><line x1="165" y1="83" x2="110" y2="118" class="rd-arrow" marker-end="url(#fl)"/><line x1="205" y1="83" x2="265" y2="118" class="rd-arrow" marker-end="url(#fl)"/><line x1="95" y1="167" x2="95" y2="202" class="rd-arrow" marker-end="url(#fl)"/><text x="390" y="24" class="rd-name" style="font-size:13px">Famille Red Hat : .rpm, dnf</text><rect x="480" y="36" width="130" height="46" rx="8" class="rd-blk rd-k-b"/><text x="545.0" y="56" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Fedora</text><text x="545.0" y="72" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">communautaire</text><rect x="480" y="120" width="130" height="46" rx="8" class="rd-blk rd-k-b"/><text x="545.0" y="140" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">RHEL</text><text x="545.0" y="156" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">commercial, support</text><rect x="400" y="204" width="130" height="46" rx="8" class="rd-blk rd-k-b"/><text x="465.0" y="224" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">Rocky Linux</text><text x="465.0" y="240" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">compatible RHEL</text><rect x="560" y="204" width="130" height="46" rx="8" class="rd-blk rd-k-b"/><text x="625.0" y="224" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:700">AlmaLinux</text><text x="625.0" y="240" text-anchor="middle" class="rd-t" style="font-size:13px;font-weight:500">compatible RHEL</text><line x1="545" y1="83" x2="545" y2="118" class="rd-arrow" marker-end="url(#fl)"/><line x1="520" y1="167" x2="470" y2="202" class="rd-arrow" marker-end="url(#fl)"/><line x1="570" y1="167" x2="620" y2="202" class="rd-arrow" marker-end="url(#fl)"/>
</svg>
<figcaption>Une flèche signifie « sert de base à ». Chaque famille a son format de paquet et son gestionnaire.</figcaption>
</figure>

**Je vérifie.** Ubuntu et Kali sont-elles de la famille Red Hat ? Quel outil installe un paquet dessus ?

<details markdown="1">
<summary>Voir la réponse</summary>

Non : elles sont **dérivées de Debian**. On y installe un paquet avec **`apt`** (paquets `.deb`), pas avec `dnf`.

</details>

> [!WARNING]
> **Une distribution n'est pas éternelle.** CentOS Linux, longtemps utilisé sur les serveurs, n'est plus maintenu ; on trouve à la place des distributions compatibles avec Red Hat (Rocky Linux, AlmaLinux) et CentOS Stream. Avant de choisir une distribution, on vérifie sa **durée de support** et sa **communauté**.

**Gestionnaire de paquets.** Au lieu de chercher un installeur sur un site, on demande au système d'installer un **paquet** depuis un **dépôt** (serveur de confiance) : le gestionnaire règle aussi les **dépendances** et les **mises à jour**. Tu l'utiliseras en S10 (`apt`).

**Cycle de publication.** Certaines distributions publient des versions **stables** à intervalles longs, d'autres plus souvent ; certaines proposent des versions à **support long** (LTS). Les durées de support changent : on les **recherche** à chaque choix, on ne les retient pas.

## 4. Libre, GPL et modèle économique

Linux est publié sous **GNU GPL** (*General Public License*), une licence **libre** : on peut **utiliser, étudier, modifier et redistribuer** le logiciel, à condition de **transmettre les mêmes libertés** aux utilisateurs des versions modifiées.

- Libre n'est pas forcément gratuit : des entreprises vendent du **support**, de la **formation**, des **versions certifiées** (Red Hat).
- L'absence de licence payante réduit des coûts, **mais** le temps d'administration et les compétences ont un coût : on compare le **coût total**, pas seulement le prix de la licence.


**Je vérifie.** Une entreprise veut éviter de payer des licences. Pourquoi Linux n'est-il pas forcément « gratuit » pour elle ?

<details markdown="1">
<summary>Voir la réponse</summary>

Parce que le **coût total** comprend aussi l'installation, l'administration, la formation et le support. On compare le coût total, pas seulement le prix de la licence.

</details>

## 5. Où trouve-t-on Linux ?

Serveurs Web et d'entreprise, infrastructures **cloud**, conteneurs, **Android** (qui s'appuie sur le noyau Linux), box Internet, équipements réseau, objets connectés, superordinateurs. Sur les **postes de travail** d'entreprise, Windows est encore majoritaire ; sur les **serveurs**, Linux est très répandu.

## 6. Windows et Linux : points de comparaison

| Sujet | Windows | Linux |
|---|---|---|
| **Organisation des fichiers** | Lecteurs : `C:\`, `D:\` ; séparateur `\` | **Un seul arbre** partant de `/` ; séparateur `/` |
| **Majuscules / minuscules** | Sans importance par défaut | **Sensible** : `Fichier` et `fichier` sont deux fichiers |
| **Administrateur** | Compte Administrateur, UAC | Compte **root**, `sudo` |
| **Droits** | Listes de contrôle d'accès (ACL) | Droits **lecture / écriture / exécution** par propriétaire, groupe, autres (S09) |
| **Installer un logiciel** | Un installeur (`.exe`, `.msi`) ou un magasin | Un **paquet** depuis un **dépôt** (`apt`, `dnf`) |
| **Interface** | Graphique, PowerShell | Terminal (bash) et, si besoin, un bureau |
| **Fichiers cachés** | Fichiers cachés = attribut | Nom commençant par un **point** (`.bashrc`) |
| **Licence** | Propriétaire, payante | Libre (GPL…) |

**Une même tâche, deux systèmes.** Ces commandes sont des correspondances **à vérifier en S08** avec un vrai terminal ; elles te permettent de corriger tes prédictions du TP.

| Je veux… | Windows | Linux |
|---|---|---|
| Savoir dans quel dossier je suis | `cd` | `pwd` |
| Lister le contenu du dossier | `dir` | `ls` |
| Voir les processus | `tasklist` | `ps aux` |
| Voir mon adresse IP | `ipconfig` | `ip a` |
| Voir l'espace disque | Gestion des disques | `df -h` |
| Connaître la version du système | `winver` | `cat /etc/os-release` |
| Savoir sous quel compte je suis | `whoami` | `whoami` |
| Installer un logiciel | installeur `.exe` / `.msi` | `sudo apt install <paquet>` (famille Debian) |

**Plusieurs systèmes sur une machine.** Multiboot, machine virtuelle (S06), ou **WSL** (Linux sous Windows, vu en S04).

> [!NOTE]
> **`root` et `sudo`, en une phrase.** Sous Linux, le compte **root** peut tout faire, y compris casser le système ; on utilise donc un compte normal et on emprunte les droits de root, le temps d'**une seule commande**, avec `sudo`. Tu n'as rien à taper pour le moment : tu t'en serviras à partir de [S08](../S08-terminal-commandes-de-base/README.md).

## 7. Pour la veille <span class="technique">complément</span>

Trois sujets d'actualité, **à approfondir dans la partie E du TP** avec des sources datées :

- la **consommation énergétique** des centres de données (mesurée par le **PUE**, vu en S03) ;
- l'**ordinateur quantique**, qui utilise des **qubits** et pourrait menacer certains algorithmes de chiffrement, d'où la **cryptographie post-quantique** ;
- la **protection du système** contre les rançongiciels (rappel de la section 6 de S04).

Le matériel et le logiciel évoluent **ensemble** : les jeux et la vidéo ont poussé les cartes graphiques, les processeurs **64 bits** ont permis des logiciels plus gourmands, les réseaux rapides ont rendu possibles le Web et le cloud.

---

## À retenir

- **Unix → GNU → Linux** ; Internet et le Web se développent en parallèle.
- **Noyau** ≠ **distribution** ≠ **environnement de bureau**.
- Familles : **Debian** (`apt`) et **Red Hat** (`dnf`).
- **GPL** : libre, pas forcément gratuit ; compare le **coût total**.
- Linux ≠ Windows : un seul arbre `/`, sensible à la casse, paquets, `root` et `sudo`, droits par propriétaire et groupe.
- On **choisit** un système selon le besoin, les compétences, le support, la durée de vie, le coût total, pas par habitude.
