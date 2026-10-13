# Cours – Unités, débits et lecture d'un poste

*BTS SIO SISR 1re année – S02 – à lire avant le [TP](02-tp.md)*

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

Chercher de l'aide : `Get-Help Get-Process`, ou `Get-Command *disk*` pour lister les commandes dont le nom contient « disk ».

> [!TIP]
> **Documenter une commande**, c'est écrire : (1) la commande exacte, (2) ce qu'elle fait en une phrase, (3) ce qu'on lit dans le résultat, (4) comment tu l'as trouvée. C'est ce qu'on attend d'un technicien : si la commande est perdue, le travail est à refaire.

## 5. Lire les caractéristiques d'un poste

| Élément | Ce qu'on cherche | Interface graphique | Ligne de commande |
|---|---|---|---|
| Processeur | modèle, fréquence, cœurs | Gestionnaire des tâches › Performances ; Informations système | voir TP |
| RAM | quantité, type, utilisée | Gestionnaire des tâches › Performances | voir TP |
| Carte graphique | modèle, pilote | Gestionnaire de périphériques | voir TP |
| Stockage | nombre, type, capacité | Gestion des disques | voir TP |
| Carte réseau | modèle, débit | Connexions réseau | voir TP |

**Cœurs physiques et cœurs logiques.** Un cœur **physique** est une unité de calcul réelle. Un cœur **logique** (ou *thread*) provient de l'**Hyper-Threading** (Intel) ou du **SMT** (AMD) : un cœur physique traite alors deux fils d'exécution. Un processeur à 4 cœurs physiques avec Hyper-Threading apparaît donc avec **8 cœurs logiques**.

**Half duplex et full duplex.** En **half duplex**, la carte réseau émet *ou* reçoit, pas les deux en même temps (comme un talkie-walkie). En **full duplex**, elle émet *et* reçoit simultanément (comme un téléphone). Les réseaux Ethernet modernes commutés fonctionnent en full duplex.

---

## À retenir

- **1 octet = 8 bits.** Décimal : Ko, Mo, Go, To (× 1000). Binaire : Kio, Mio, Gio, Tio (× 1024).
- **1 To marqué ≈ 931 Gio affichés** : ce n'est pas une perte.
- **Mbit/s ÷ 8 = Mo/s.** Temps = taille × 8 ÷ débit.
- Le débit d'une chaîne est celui de son **maillon le plus lent**.
- En PowerShell : `Verbe-Nom`, tube `|`, `Select-Object` ; on **documente** chaque commande.
