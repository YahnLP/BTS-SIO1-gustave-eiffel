# Minimum réseau

*Cette fiche donne le strict nécessaire pour suivre les séances de virtualisation, de conteneurs, de GLPI et d'incidents. Le réseau est étudié en détail **en cours de réseau** : ici, tu retiens seulement ce qui sert à manipuler.*

> [!NOTE]
> Quand une séance cite un mot de cette fiche, tu n'as **pas** à tout maîtriser : tu dois savoir **à quoi il sert** et **où le lire** sur une machine.

## 1. Les cinq éléments à connaître

| Mot | À quoi ça sert | Exemple | Où le lire |
|---|---|---|---|
| **Adresse IP** | Identifie une machine sur un réseau, comme une adresse postale | `192.168.1.20` | Windows : `ipconfig` · Linux : `ip a` |
| **Masque** | Dit quelles machines sont « dans le même réseau » que toi | `255.255.255.0` (souvent écrit `/24`) | même commande |
| **Passerelle** | La machine (le routeur) par laquelle on sort vers Internet | `192.168.1.1` | Windows : `ipconfig` · Linux : `ip route` |
| **DNS** | Traduit un nom (`exemple.fr`) en adresse IP | `8.8.8.8` | Windows : `ipconfig /all` · Linux : `cat /etc/resolv.conf` |
| **Port** | Numéro qui désigne un service sur une machine | `80` web · `22` SSH | `ss -tln` (Linux) |

Une machine qui n'a pas ces quatre premiers réglages ne peut pas atteindre Internet. C'est le premier réflexe de diagnostic.

## 2. Qui donne l'adresse ? Le DHCP

Dans la plupart des réseaux, tu ne tapes pas l'adresse IP à la main : un service appelé **DHCP** la donne automatiquement quand la machine se connecte. On parle d'**adresse fixe** (écrite à la main) pour un serveur, d'**adresse automatique** pour un poste.

## 3. Adresses privées et NAT

Les adresses qui commencent par `10.`, `172.16.` à `172.31.` ou `192.168.` sont **privées** : elles ne servent que dans un réseau local. Pour sortir sur Internet, le routeur fait passer toutes les machines par **sa** propre adresse publique : c'est le **NAT**. Dans VirtualBox, le mode « NAT » fait la même chose pour la machine virtuelle.

## 4. Les trois tests de base

| Test | Commande | Ce que ça prouve |
|---|---|---|
| Ma machine a une adresse | `ipconfig` / `ip a` | La carte réseau est configurée |
| La passerelle répond | `ping 192.168.1.1` | Je suis bien dans mon réseau local |
| Je sais traduire un nom | `ping exemple.fr` | Le DNS fonctionne et j'accède à Internet |

Si le test 2 réussit mais pas le test 3 : problème de **DNS** ou de sortie vers Internet. Si le test 1 échoue : problème de carte ou de DHCP.

## 5. Où cette fiche sert-elle ?

| Séance | Pourquoi |
|---|---|
| S07 | Modes réseau de VirtualBox (NAT, pont, réseau interne) |
| S11 | Publier un **port** d'un conteneur |
| S13 | Joindre le serveur GLPI par son adresse |
| S16 | Diagnostiquer un incident « le poste n'a plus Internet » |
| S18 | Démarrage par le réseau (le serveur donne une adresse) |

> [!TIP] Pour aller plus loin
> Le découpage en sous-réseaux, le calcul avec le masque, les VLAN et le routage <span class="technique">notion technique</span> sont traités en cours de réseau, pas dans ce cours.
