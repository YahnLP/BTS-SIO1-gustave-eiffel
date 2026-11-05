# Cours – Unités, débits et lecture d'un poste

*BTS SIO SISR 1re année – S02 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** la fiche d'identité d'un poste (S01) : composants, mémoires, stockage.
> - **Mots déjà vus :** bit, octet, processeur, mémoire vive, SSD.
> - **Expliqués dans ce cours :** préfixes (kilo, méga, Kio, Mio), conversions, débit et temps de transfert, PowerShell et CMD.

## À la fin de ce cours, tu sauras

- [ ] convertir des tailles entre **octets**, **Ko/Mo/Go/To** et **Kio/Mio/Gio/Tio** ;
- [ ] expliquer pourquoi un disque de **1 To** s'affiche **≈ 931 Gio** ;
- [ ] convertir un débit de **bit/s** en **octet/s** et calculer un **temps de transfert** ;
- [ ] trouver le **maillon le plus lent** d'une chaîne ;
- [ ] interroger un poste Windows avec **PowerShell** et l'**Invite de commandes**.

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **Mon disque de 1 To est défectueux : Windows n'affiche que 931 Go.** » Non : le fabricant compte par 1 000, Windows par 1 024 (§ 1).
> - « **100 Mbit/s, ça fait 100 Mo/s.** » Non : il faut diviser par 8, donc 12,5 Mo/s (§ 3).
> - « **Le Wi-Fi 6 donne 9,6 Gbit/s chez moi.** » C'est un maximum théorique de la norme ; le débit réel est bien plus bas (§ 3).
> - « **Pour aller plus vite, il suffit d'améliorer un élément.** » Seul compte le plus lent de la chaîne (§ 3).

---

## 1. Bits, octets et préfixes

Un **bit** vaut 0 ou 1. Un **octet** (*byte*, symbole **o** ou **B**) regroupe **8 bits**.

Il existe **deux familles** de préfixes :

| Famille | Préfixe | Symbole | Valeur en octets |
|---|---|---|---|
| **Décimale** (SI) | kilo | Ko | 1 000 |
| | méga | Mo | 1 000 000 |
| | giga | Go | 1 000 000 000 |
| | téra | To | 1 000 000 000 000 |
| **Binaire** (CEI) | kibi | Kio | 1 024 |
| | mébi | Mio | 1 048 576 (1024²) |
| | gibi | Gio | 1 073 741 824 (1024³) |
| | tébi | Tio | 1 099 511 627 776 (1024⁴) |

> [!WARNING]
> **Piège courant.** Dans la vie de tous les jours, on écrit « Ko » en pensant 1024. Rigoureusement, **Ko = 1000 octets** et **Kio = 1024 octets**. Quand une consigne parle de « Ko » sans précision, on **précise l'hypothèse** dans sa réponse.

**Pourquoi 1 To s'affiche ≈ 931 Gio ?**

Le fabricant compte en décimal : 1 To = 1 000 000 000 000 octets. Windows compte en binaire (puissances de 1024) mais affiche l'unité « Go » :

> 1 000 000 000 000 ÷ 1 073 741 824 ≈ **931,3** Gio

Rien n'est perdu : ce sont deux façons de compter. Le décimal donne un nombre plus grand, donc plus « vendeur ».

> [!NOTE]
> Tous les systèmes ne comptent pas pareil : Windows affiche en binaire sous l'étiquette « Go », macOS affiche en décimal, et sous Linux `df -h` compte en puissances de 1024 alors que `df -H` compte en puissances de 1000.

**Je vérifie.** Une clé USB annonce 64 Go. Quelle capacité approximative Windows affiche-t-il ?

<details markdown="1">
<summary>Voir la réponse</summary>

64 × 10⁹ ÷ 2³⁰ ≈ 64 × 0,931 ≈ **59,6 Gio**, affichés « 59,6 Go » par Windows. Rien n'est perdu.

</details>

## 2. Convertir : la méthode

| Je pars de… | Je veux… | Je fais… |
|---|---|---|
| des Ko, Mo, Go, To | des octets | × 1 000 par étape |
| des Kio, Mio, Gio, Tio | des octets | × 1 024 par étape |
| des octets | des Gio | ÷ 1 073 741 824 |
| des Go marqués (fabricant) | des Gio affichés | × 10⁹ ÷ 2³⁰ (≈ × 0,931) |

Ordre de grandeur utile : **1 Go (décimal) ≈ 0,93 Gio**, **1 To ≈ 0,91 Tio**.

## 3. Débits et temps de transfert

Un **débit** se mesure en **bit/s** (réseau) ou en **octet/s** (copie de fichiers, disques).

| Unité | Valeur |
|---|---|
| 1 Kbit/s | 1 000 bit/s |
| 1 Mbit/s | 1 000 000 bit/s |
| 1 Gbit/s | 1 000 000 000 bit/s |
| 1 octet/s | 8 bit/s |

On compte les débits en **décimal**. Pour passer de bit/s à octet/s : **÷ 8**.

> 100 Mbit/s = 12,5 Mo/s · 1 Gbit/s = 125 Mo/s

**Temps de transfert minimal théorique :**

> temps (s) = taille (octets) × 8 ÷ débit (bit/s) = taille (octets) ÷ débit (octet/s)

Exemple : 700 Mo à 20 Mbit/s → 700 × 10⁶ × 8 ÷ (20 × 10⁶) = **280 s**, soit 4 min 40.

**Les erreurs fréquentes.**

| Erreur | Exemple | Comment l'éviter |
|---|---|---|
| Confondre bit et octet | lire « 100 Mbit/s » comme « 100 Mo/s » | Toujours demander : **b minuscule = bit, o ou B = octet** |
| Oublier de convertir avant de calculer | diviser 700 Mo par 20 Mbit/s | Mettre taille **et** débit dans la **même unité** (en octets, ou en bits) |
| Mélanger décimal et binaire | convertir des Go en Gio avec × 1 000 | Noter la famille de préfixes avant de calculer |
| Arrondir trop tôt | arrondir 931,3 à 900 au milieu du calcul | Arrondir **à la fin**, avec une unité |

**Débit théorique et débit réel.** Le débit **théorique** est le maximum de la norme. Le débit **réel** est plus bas : protocoles (en-têtes), qualité du signal, interférences Wi-Fi, charge du réseau, vitesse des disques aux deux bouts. Le calcul ci-dessus donne donc un temps **minimal**.

**Ordres de grandeur** (valeurs théoriques ; à recouper avec les sources du TP) :

| Technologie | Débit théorique |
|---|---|
| ADSL | quelques Mbit/s à environ 20 Mbit/s |
| Fibre optique (particulier) | 100 Mbit/s à plusieurs Gbit/s |
| Ethernet « Gigabit » | 1 Gbit/s |
| Wi-Fi 5 (802.11ac) | jusqu'à environ 3,5 Gbit/s |
| Wi-Fi 6 (802.11ax) | jusqu'à environ 9,6 Gbit/s |

**Le maillon le plus lent.** Quand une donnée traverse plusieurs éléments (disque source, réseau, disque destination), le débit global est celui du **plus lent**.

**Exemple résolu.** On copie un dossier de **30 Go** d'un poste vers un autre. Le disque source est un HDD qui lit à **100 Mo/s**, le réseau est un Ethernet **1 Gbit/s**, le disque destination est un SSD qui écrit à **500 Mo/s**. Combien de temps, au minimum ?

| Étape | Calcul | Résultat |
|---|---|---|
| 1. Tout mettre en octets/s | réseau : 1 Gbit/s ÷ 8 | 125 Mo/s |
| 2. Comparer les trois maillons | 100 Mo/s, 125 Mo/s, 500 Mo/s | le plus lent : le **disque source** |
| 3. Taille en Mo | 30 Go × 1 000 | 30 000 Mo |
| 4. Temps | 30 000 ÷ 100 | **300 s**, soit 5 min |

Le goulot n'est pas le réseau, mais le vieux disque : passer à un réseau 10 Gbit/s ne changerait rien, alors qu'un SSD source ramènerait la copie à environ 4 min (limitée alors par le réseau, 125 Mo/s : 30 000 ÷ 125 = 240 s).

**Je vérifie.** Une chaîne comprend un SSD à 500 Mo/s, un réseau Wi-Fi à 300 Mbit/s et un disque à 120 Mo/s. Quel est le maillon le plus lent ?

<details markdown="1">
<summary>Voir la réponse</summary>

Le Wi-Fi : 300 Mbit/s ÷ 8 = **37,5 Mo/s**, inférieur aux 120 et 500 Mo/s. Comparer en bit/s sans convertir aurait donné une mauvaise réponse.

</details>

**Je vérifie.** Combien de temps pour transférer 600 Mo à 80 Mbit/s, au minimum ?

<details markdown="1">
<summary>Voir la réponse</summary>

80 Mbit/s = 10 Mo/s, donc 600 ÷ 10 = **60 s**. Autre écriture : 600 × 10⁶ × 8 ÷ (80 × 10⁶) = 60 s.

</details>


## 4. PowerShell et Invite de commandes

Windows propose deux terminaux :

| | Invite de commandes (CMD) | PowerShell |
|---|---|---|
| Âge | ancien | plus récent |
| Commandes | courtes (`ipconfig`, `tasklist`) | de la forme **Verbe-Nom** (`Get-Process`) |
| Ce qu'on échange | du texte | des **objets**, qu'on filtre |

Dans PowerShell, une commande (*cmdlet*) s'appelle `Verbe-Nom`, par exemple `Get-Process`. On enchaîne avec le **tube** `|` et on choisit les colonnes avec `Select-Object` :

```powershell
Get-Process | Select-Object Name, Id
```

**Texte contre objet : ce qu'on voit.** Pour lister les processus :

```text
C:\> tasklist
Nom de l'image          PID  Nom de la session  Utilisation mémoire
=================== ======== ================== ====================
chrome.exe              4812 Console                      180 436 Ko
```

`tasklist` renvoie du **texte** déjà mis en forme : on le lit, mais on ne peut pas facilement en extraire une colonne. En PowerShell :

```powershell
PS C:\> Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 3 Name, Id
```

Ici chaque processus est un **objet** avec des propriétés (`Name`, `Id`, `WorkingSet`…) : on peut **trier**, **filtrer** et **choisir les colonnes** sans retraiter du texte.

Chercher de l'aide : `Get-Help Get-Process`, ou `Get-Command *disk*` pour lister les commandes dont le nom contient « disk ».

> [!TIP]
> **Documenter une commande**, c'est écrire : (1) la commande exacte, (2) ce qu'elle fait en une phrase, (3) ce qu'on lit dans le résultat, (4) comment tu l'as trouvée. C'est ce qu'on attend d'un technicien : si la commande est perdue, le travail est à refaire.

## 5. Lire une fiche technique : les caractéristiques d'un poste

| Élément | Ce qu'on cherche | Interface graphique | Ligne de commande |
|---|---|---|---|
| Processeur | modèle, fréquence, cœurs | Gestionnaire des tâches › Performances ; Informations système | voir TP |
| RAM | quantité, type, utilisée | Gestionnaire des tâches › Performances | voir TP |
| Carte graphique | modèle, pilote | Gestionnaire de périphériques | voir TP |
| Stockage | nombre, type, capacité | Gestion des disques | voir TP |
| Carte réseau | modèle, débit | Connexions réseau | voir TP |

**Cœurs physiques et cœurs logiques.** Un cœur **physique** est une unité de calcul réelle. Un cœur **logique** (ou *thread*) provient de l'**Hyper-Threading** (Intel) ou du **SMT** (AMD) : un cœur physique traite alors deux fils d'exécution. Un processeur à 4 cœurs physiques avec Hyper-Threading apparaît donc avec **8 cœurs logiques**.

**Half duplex et full duplex.** En **half duplex**, la carte réseau émet *ou* reçoit, pas les deux en même temps (comme un talkie-walkie). En **full duplex**, elle émet *et* reçoit simultanément (comme un téléphone). Les réseaux Ethernet modernes commutés fonctionnent en full duplex.

**Je vérifie.** Un processeur annonce « 6 cœurs, 12 threads ». Combien de cœurs physiques et de cœurs logiques le Gestionnaire des tâches affichera-t-il ?

<details markdown="1">
<summary>Voir la réponse</summary>

**6 cœurs physiques** et **12 cœurs logiques** : chaque cœur traite deux fils d'exécution grâce à l'Hyper-Threading ou au SMT.

</details>

**Je vérifie.** Dans quelle unité calcule-t-on un temps de transfert : en bit/s ou en octet/s ?

<details markdown="1">
<summary>Voir la réponse</summary>

Dans **n'importe laquelle, à condition d'être cohérent** : taille en octets avec un débit en octets/s, ou taille en bits (× 8) avec un débit en bits/s.

</details>

---

## À retenir

- **1 octet = 8 bits.** Décimal : Ko, Mo, Go, To (× 1000). Binaire : Kio, Mio, Gio, Tio (× 1024).
- **1 To marqué ≈ 931 Gio affichés** : ce n'est pas une perte.
- **Mbit/s ÷ 8 = Mo/s.** Temps = taille × 8 ÷ débit.
- Le débit d'une chaîne est celui de son **maillon le plus lent**.
- En PowerShell : `Verbe-Nom`, tube `|`, `Select-Object` ; on **documente** chaque commande.
