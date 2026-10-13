# Cours – Découvrir Linux

*BTS SIO SISR 1re année – S05 – à lire avant le [TP](02-tp.md)*

## À la fin de ce cours, tu sauras

- [ ] situer **Unix**, **GNU**, **Linux**, **Internet** et le **Web** dans le temps ;
- [ ] distinguer **noyau**, **distribution** et **environnement de bureau** ;
- [ ] présenter les **familles** Debian et Red Hat et leur gestionnaire de paquets ;
- [ ] expliquer ce qu'est une licence **libre** (GPL) ;
- [ ] comparer **Windows** et **Linux** sur quelques points concrets ;
- [ ] relier **langages**, **réseaux** et **systèmes** dans une même histoire.

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

On peut donc avoir **le même noyau** et des systèmes qui se ressemblent peu. Sur un **serveur**, on installe souvent **sans** environnement de bureau : on administre en **ligne de commande**.

## 3. Les grandes familles

| Famille | Exemples | Format de paquet / outil | Remarques |
|---|---|---|---|
| **Debian** | **Debian**, Ubuntu, Linux Mint, **Kali Linux** | `.deb` · **`apt`** / `dpkg` | Debian est un projet communautaire ; Ubuntu et Kali sont **dérivées** de Debian |
| **Red Hat** | Red Hat Enterprise Linux (RHEL), Fedora, Rocky Linux, AlmaLinux | `.rpm` · **`dnf`** / `rpm` | RHEL est commercial (abonnement de support) ; Fedora est la version communautaire proche |

> [!WARNING]
> **Une distribution n'est pas éternelle.** CentOS Linux, longtemps utilisé sur les serveurs, n'est plus maintenu ; on trouve à la place des distributions compatibles avec Red Hat (Rocky Linux, AlmaLinux) et CentOS Stream. Avant de choisir une distribution, on vérifie sa **durée de support** et sa **communauté**.

**Gestionnaire de paquets.** Au lieu de chercher un installeur sur un site, on demande au système d'installer un **paquet** depuis un **dépôt** (serveur de confiance) : le gestionnaire règle aussi les **dépendances** et les **mises à jour**. Tu l'utiliseras en S10 (`apt`).

**Cycle de publication.** Certaines distributions publient des versions **stables** à intervalles longs, d'autres plus souvent ; certaines proposent des versions à **support long** (LTS). Les durées de support changent : on les **recherche** à chaque choix, on ne les retient pas.

## 4. Libre, GPL et modèle économique

Linux est publié sous **GNU GPL** (*General Public License*), une licence **libre** : on peut **utiliser, étudier, modifier et redistribuer** le logiciel, à condition de **transmettre les mêmes libertés** aux utilisateurs des versions modifiées.

- Libre n'est pas forcément gratuit : des entreprises vendent du **support**, de la **formation**, des **versions certifiées** (Red Hat).
- L'absence de licence payante réduit des coûts, **mais** le temps d'administration et les compétences ont un coût : on compare le **coût total**, pas seulement le prix de la licence.

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

**Plusieurs systèmes sur une machine.** Multiboot, machine virtuelle (S06), ou **WSL** (Linux sous Windows, vu en S04).

## 7. Culture informatique : de l'assembleur à Internet

| Période | Langages et outils | Pourquoi |
|---|---|---|
| Années 1950 | **Assembleur** ; **Fortran** et **COBOL** (fin de la décennie) | Éviter d'écrire en binaire ; calcul scientifique et gestion |
| Années 1970 | **C**, **Pascal** | Programmation structurée ; réécriture d'Unix en C |
| Années 1990 | **Python**, **Java** | Langages de haut niveau, portables |
| Aujourd'hui | Python, R, Julia… | Données, intelligence artificielle |

Le **matériel** et le **logiciel** évoluent **ensemble** : les jeux et la vidéo ont poussé les cartes graphiques ; les processeurs **64 bits** ont permis des logiciels plus gourmands en mémoire ; les réseaux plus rapides ont rendu possibles le Web et le cloud.

**Transmettre l'information.** Un exemple : la **fibre optique** transmet des impulsions de **lumière** dans un fil de verre ; elle offre un très haut débit et une faible latence. Elle relève de la **couche physique** du modèle OSI (le modèle OSI est étudié en réseau).

**Enjeux actuels** (à approfondir en veille) : la **consommation énergétique** des centres de données ; l'**ordinateur quantique**, qui utilise des **qubits** (superposition, intrication) et pourrait menacer certains algorithmes de chiffrement actuels, d'où la recherche en **cryptographie post-quantique** ; la **protection du système** (rappelée en S04).

---

## À retenir

- **Unix → GNU → Linux** ; Internet et le Web se développent en parallèle.
- **Noyau** ≠ **distribution** ≠ **environnement de bureau**.
- Familles : **Debian** (`apt`) et **Red Hat** (`dnf`).
- **GPL** : libre, pas forcément gratuit ; compare le **coût total**.
- Linux ≠ Windows : un seul arbre `/`, sensible à la casse, paquets, `root` et `sudo`, droits par propriétaire et groupe.
- On **choisit** un système selon le besoin, les compétences, le support, la durée de vie, le coût total, pas par habitude.
