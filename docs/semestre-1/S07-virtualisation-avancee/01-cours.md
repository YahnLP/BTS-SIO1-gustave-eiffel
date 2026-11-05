# Cours – Virtualisation avancée : réseau, snapshots et Guest Additions

*BTS SIO SISR 1re année – S07 – à lire **après** avoir cherché par toi-même dans le [TP](02-tp.md), pour confronter tes réponses*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** créer et démarrer une VM dans VirtualBox (S06) ; savoir ce qu'est une adresse IP : voir la fiche [minimum réseau](../../ressources/minimum-reseau.md).
> - **Mots déjà vus :** hôte, invité, hyperviseur, ISO.
> - **Expliqués dans ce cours :** modes réseau de VirtualBox, instantané (snapshot), chaîne de disques, Guest Additions, stockage d'une VM. Les notions de réseau (NAT, DHCP, adresse IP) seront **vues en cours de réseau** : ici, tu retiens seulement ce qui sert à connecter une VM.

## À la fin de ce cours, tu sauras

- [ ] décrire les **cinq modes réseau** de VirtualBox et choisir le bon selon le besoin ;
- [ ] configurer une **adresse IP manuelle** et tester avec **`ping`** ;
- [ ] expliquer ce qu'est un **snapshot**, une **chaîne de disques** et pourquoi ce n'est **pas une sauvegarde** ;
- [ ] dire à quoi servent les **Guest Additions** ;
- [ ] distinguer un disque virtuel **dynamique** d'un disque **fixe**.

> [!IMPORTANT] Idées reçues à confronter à tes réponses du TP
> - « **Un `ping` sans réponse prouve qu'il n'y a pas de liaison.** » Non : le pare-feu de Windows bloque en général les `ping` entrants (§ 1).
> - « **Deux machines avec la même adresse IP sont forcément en conflit.** » Pas en mode NAT : chaque VM est derrière son propre NAT (§ 1).
> - « **Un snapshot est une sauvegarde.** » Non : il dépend du disque d'origine, stocké au même endroit (§ 2).

---

## 1. Les modes réseau de VirtualBox

À sa création, une VM reçoit une **carte réseau virtuelle**. Le **mode d'accès** de cette carte décide comment la VM obtient son adresse, à quel réseau elle appartient et avec qui elle peut communiquer.

> [!NOTE]
> **Mots de réseau dans ce tableau.** *Adresse IP* : numéro d'une machine sur un réseau ; *DHCP* : service qui distribue ces adresses automatiquement ; *NAT* : l'hôte fait sortir la VM sur Internet avec sa propre adresse. Ces notions seront **vues plus en détail en cours de réseau** ; la fiche [minimum réseau](../../ressources/minimum-reseau.md) donne l'essentiel. Ici, tu dois seulement choisir le bon mode pour un besoin donné.

> **Pour visualiser** : [ProtoLab](https://yahnlp.github.io/ProtoLab/) montre, protocole par protocole, comment une machine obtient son adresse (**DHCP**) et comment la box traduit les adresses à la sortie (**IP**, NAT). C'est facultatif : ici, tu choisis seulement le bon mode.

| Mode | Adresse IP automatique (DHCP) | Entre VM | Internet | Avec l'hôte | Usage typique |
|---|---|---|---|---|---|
| **NAT** | oui | non | oui | non (à vérifier en TP) | une VM isolée qui télécharge, met à jour, navigue |
| **Réseau NAT** | oui | oui | oui | non | plusieurs VM qui se parlent et sortent sur Internet |
| **Accès par pont** | oui, si un serveur DHCP existe sur le réseau | oui | oui | oui | une VM visible sur le réseau comme une machine physique (serveur web, FTP, DHCP, DNS) |
| **Réseau interne** | **non** (adresse manuelle) | oui | non | non | réseau isolé pour des tests |
| **Réseau privé hôte** | oui | oui | non | oui | tester la communication entre l'hôte et une VM |

> [!NOTE]
> Les cases « avec l'hôte » du mode NAT dépendent de la version de VirtualBox et de la cible visée : **c'est justement ce que tu vérifies en TP**.

### NAT

La VM utilise la connexion de l'hôte grâce à une **traduction d'adresse** (NAT), comme une box Internet. Elle n'a pas d'adresse visible sur le réseau local : par défaut, VirtualBox lui attribue une adresse du type `10.0.2.15`. Comme chaque VM est derrière son **propre** NAT, plusieurs VM peuvent avoir cette même adresse sans conflit : elles sont sur des **réseaux distincts**, donc **ne se voient pas**.

- Avantage : Internet tout de suite, sans configuration.
- Limite : pas de communication directe entre VM.


<figure class="raid-fig">
<svg viewBox="0 0 720 200" role="img" aria-labelledby="natt" xmlns="http://www.w3.org/2000/svg"><title id="natt">Mode NAT : chaque VM derrière son propre NAT</title>
<defs><marker id="natm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="8" y="8" width="440" height="184" rx="12" class="rd-disk"/><text x="22" y="28" text-anchor="start" class="rd-note" style="font-size:13px;font-weight:700">Hôte</text><rect x="30" y="40" width="120" height="50" rx="8" class="rd-blk rd-k-c" /><text x="90.0" y="62" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 1</text><text x="90.0" y="78" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">10.0.2.15</text><rect x="30" y="120" width="120" height="50" rx="8" class="rd-blk rd-k-c" /><text x="90.0" y="142" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 2</text><text x="90.0" y="158" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">10.0.2.15</text><rect x="240" y="40" width="100" height="50" rx="8" class="rd-blk rd-k-d" /><text x="290.0" y="62" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">NAT</text><text x="290.0" y="78" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">de la VM 1</text><rect x="240" y="120" width="100" height="50" rx="8" class="rd-blk rd-k-d" /><text x="290.0" y="142" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">NAT</text><text x="290.0" y="158" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">de la VM 2</text><line x1="150" y1="65" x2="240" y2="65" class="rd-arrow" marker-end="url(#natm)"/><line x1="150" y1="145" x2="240" y2="145" class="rd-arrow" marker-end="url(#natm)"/><line x1="340" y1="65" x2="560" y2="92" class="rd-arrow" marker-end="url(#natm)"/><line x1="340" y1="145" x2="560" y2="108" class="rd-arrow" marker-end="url(#natm)"/><rect x="560" y="70" width="130" height="60" rx="8" class="rd-blk rd-k-a" /><text x="625.0" y="98" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Internet</text><text x="625.0" y="112" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">via l'hôte</text><line x1="90" y1="92" x2="90" y2="118" class="rd-arrow rd-copy"/><text x="98" y="109" text-anchor="start" class="rd-note" style="font-size:11px;font-weight:600">ne se voient pas</text>
</svg>
<figcaption>NAT : chaque VM sort sur Internet par son propre NAT. Même adresse, réseaux distincts : elles ne se voient pas.</figcaption>
</figure>

### Réseau NAT

Extension du NAT : les VM d'un **même réseau NAT** partagent un réseau privé, **communiquent entre elles** et sortent sur Internet par la connexion de l'hôte. Ce réseau doit être créé dans les paramètres de VirtualBox.


<figure class="raid-fig">
<svg viewBox="0 0 720 200" role="img" aria-labelledby="rnatt" xmlns="http://www.w3.org/2000/svg"><title id="rnatt">Mode Réseau NAT : un réseau partagé entre les VM</title>
<defs><marker id="rnatm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="8" y="8" width="440" height="184" rx="12" class="rd-disk"/><text x="22" y="28" text-anchor="start" class="rd-note" style="font-size:13px;font-weight:700">Hôte</text><rect x="30" y="40" width="120" height="50" rx="8" class="rd-blk rd-k-c" /><text x="90.0" y="70" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 1</text><rect x="30" y="120" width="120" height="50" rx="8" class="rd-blk rd-k-c" /><text x="90.0" y="150" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 2</text><rect x="240" y="70" width="130" height="60" rx="8" class="rd-blk rd-k-d" /><text x="305.0" y="98" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Réseau NAT</text><text x="305.0" y="112" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">partagé par les VM</text><line x1="150" y1="65" x2="240" y2="92" class="rd-arrow" marker-end="url(#rnatm)" marker-start="url(#rnatm)"/><line x1="150" y1="145" x2="240" y2="108" class="rd-arrow" marker-end="url(#rnatm)" marker-start="url(#rnatm)"/><line x1="370" y1="100" x2="560" y2="100" class="rd-arrow" marker-end="url(#rnatm)"/><rect x="560" y="70" width="130" height="60" rx="8" class="rd-blk rd-k-a" /><text x="625.0" y="98" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Internet</text><text x="625.0" y="112" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">via l'hôte</text><text x="305" y="152" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">les VM se parlent</text>
</svg>
<figcaption>Réseau NAT : les VM partagent un même réseau privé et sortent ensemble sur Internet.</figcaption>
</figure>

### Accès par pont

La carte virtuelle est reliée directement à la **carte physique** de l'hôte : la VM est une machine à part entière du réseau local, avec sa propre adresse (fournie par le DHCP du réseau, s'il y en a un).

- Avantage : idéal pour tester des serveurs accessibles depuis l'extérieur.
- Risques : moins sûr (la VM est **exposée sur le réseau réel**) ; certains réseaux **refusent** de donner une adresse à une VM. Si le DHCP refuse, on peut configurer une **adresse IP statique**.


<figure class="raid-fig">
<svg viewBox="0 0 720 200" role="img" aria-labelledby="pontt" xmlns="http://www.w3.org/2000/svg"><title id="pontt">Mode Accès par pont : la VM est une machine du réseau local</title>
<defs><marker id="pontm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="8" y="8" width="440" height="184" rx="12" class="rd-disk"/><text x="22" y="28" text-anchor="start" class="rd-note" style="font-size:13px;font-weight:700">Hôte</text><rect x="30" y="40" width="120" height="50" rx="8" class="rd-blk rd-k-c" /><text x="90.0" y="70" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 1</text><rect x="30" y="120" width="120" height="50" rx="8" class="rd-blk rd-k-c" /><text x="90.0" y="150" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 2</text><rect x="230" y="70" width="140" height="60" rx="8" class="rd-blk rd-k-d" /><text x="300.0" y="98" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Carte physique</text><text x="300.0" y="112" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">de l'hôte</text><line x1="150" y1="65" x2="230" y2="92" class="rd-arrow" marker-end="url(#pontm)"/><line x1="150" y1="145" x2="230" y2="108" class="rd-arrow" marker-end="url(#pontm)"/><line x1="370" y1="100" x2="540" y2="100" class="rd-arrow" marker-end="url(#pontm)" marker-start="url(#pontm)"/><rect x="540" y="30" width="160" height="140" rx="8" class="rd-blk rd-k-a" /><text x="620.0" y="82" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Réseau local</text><text x="620.0" y="98" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">(le réseau du lycée)</text><text x="620.0" y="112" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">autres machines,</text><text x="620.0" y="128" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">routeur, Internet</text><text x="380" y="90" text-anchor="start" class="rd-note" style="font-size:11px;font-weight:600">adresse du</text><text x="380" y="122" text-anchor="start" class="rd-note" style="font-size:11px;font-weight:600">réseau local</text>
</svg>
<figcaption>Accès par pont : la VM apparaît sur le réseau local comme une machine physique, avec sa propre adresse.</figcaption>
</figure>

### Réseau interne

VirtualBox crée un réseau **totalement isolé**, identifié par un **nom**. Toutes les VM dont la carte porte **le même nom** communiquent entre elles ; une VM avec un autre nom est sur un autre réseau. Rien ne distribue d'adresses : il faut **configurer l'IP à la main**.


<figure class="raid-fig">
<svg viewBox="0 0 720 200" role="img" aria-labelledby="intt" xmlns="http://www.w3.org/2000/svg"><title id="intt">Mode Réseau interne : réseau isolé</title>
<defs><marker id="intm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="8" y="8" width="500" height="184" rx="12" class="rd-disk"/><text x="22" y="28" text-anchor="start" class="rd-note" style="font-size:13px;font-weight:700">Hôte</text><rect x="30" y="44" width="400" height="124" rx="10" class="rd-disk" style="stroke-dasharray:5 3"/><text x="44" y="64" text-anchor="start" class="rd-note" style="font-size:12px;font-weight:700">Réseau interne « LAN »</text><rect x="50" y="80" width="150" height="60" rx="8" class="rd-blk rd-k-c" /><text x="125.0" y="108" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 1</text><text x="125.0" y="122" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">192.168.100.1</text><rect x="260" y="80" width="150" height="60" rx="8" class="rd-blk rd-k-c" /><text x="335.0" y="108" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 2</text><text x="335.0" y="122" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">192.168.100.2</text><line x1="200" y1="110" x2="260" y2="110" class="rd-arrow" marker-end="url(#intm)" marker-start="url(#intm)"/><line x1="430" y1="106" x2="560" y2="106" class="rd-arrow rd-copy"/><text x="495" y="98" text-anchor="middle" class="rd-note" style="font-size:11px;font-weight:600">aucun lien</text><rect x="560" y="76" width="140" height="60" rx="8" class="rd-blk rd-disk" style="stroke-dasharray:5 3"/><text x="630.0" y="111" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Hôte et Internet</text>
</svg>
<figcaption>Réseau interne : les VM de même nom de réseau se parlent ; rien n'entre ni ne sort.</figcaption>
</figure>


**Pour que deux VM se parlent en réseau interne**, il faut qu'elles soient dans le **même réseau** : ici, les trois premiers nombres identiques (`192.168.100`) et le **même masque** (`255.255.255.0`, qui dit justement quelles machines sont « dans le même réseau » : voir la fiche [minimum réseau](../../ressources/minimum-reseau.md)). Si tu changes la VM 2 en `192.168.200.2`, elle sort de ce réseau et le `ping` échoue.

### Réseau privé hôte

Un commutateur virtuel privé relie l'**hôte** et les VM : ils se parlent (réseau souvent en `192.168.56.0/24`, hôte en `192.168.56.1`), mais la VM n'a **pas d'accès Internet**.


<figure class="raid-fig">
<svg viewBox="0 0 720 200" role="img" aria-labelledby="privt" xmlns="http://www.w3.org/2000/svg"><title id="privt">Mode Réseau privé hôte : l'hôte et les VM, sans Internet</title>
<defs><marker id="privm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="20" y="40" width="120" height="50" rx="8" class="rd-blk rd-k-c" /><text x="80.0" y="70" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 1</text><rect x="20" y="120" width="120" height="50" rx="8" class="rd-blk rd-k-c" /><text x="80.0" y="150" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM 2</text><rect x="220" y="70" width="150" height="60" rx="8" class="rd-blk rd-k-d" /><text x="295.0" y="98" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Commutateur virtuel</text><text x="295.0" y="112" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">privé</text><line x1="140" y1="65" x2="220" y2="92" class="rd-arrow" marker-end="url(#privm)" marker-start="url(#privm)"/><line x1="140" y1="145" x2="220" y2="108" class="rd-arrow" marker-end="url(#privm)" marker-start="url(#privm)"/><line x1="370" y1="100" x2="460" y2="100" class="rd-arrow" marker-end="url(#privm)" marker-start="url(#privm)"/><rect x="460" y="70" width="150" height="60" rx="8" class="rd-blk rd-k-a" /><text x="535.0" y="98" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Hôte</text><text x="535.0" y="112" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">192.168.56.1</text><text x="20" y="190" text-anchor="start" class="rd-note" style="font-size:12px;font-weight:600">Les VM ne peuvent pas aller sur Internet depuis ce réseau.</text>
</svg>
<figcaption>Réseau privé hôte : l'hôte et les VM se parlent ; aucun accès à Internet.</figcaption>
</figure>

> [!TIP]
> Une VM peut avoir **plusieurs cartes réseau**, chacune dans un mode différent. Un serveur web peut par exemple avoir une carte en « Réseau interne » (vers la base de données) et une en « Accès par pont » (vers les utilisateurs).

### Quel mode choisir ?


<figure class="raid-fig">
<svg viewBox="0 0 720 330" role="img" aria-labelledby="treet" xmlns="http://www.w3.org/2000/svg"><title id="treet">Arbre de décision : quel mode réseau choisir</title>
<defs><marker id="treem" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="250" y="8" width="220" height="50" rx="8" class="rd-blk rd-k-d" /><text x="360.0" y="30" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">La VM doit-elle accéder</text><text x="360.0" y="46" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">à Internet ?</text><path d="M360,58 V73 H130 V88" class="rd-arrow" marker-end="url(#treem)"/><text x="240" y="70" text-anchor="end" class="rd-note" style="font-size:11px;font-weight:600">non</text><path d="M360,58 V73 H575 V88" class="rd-arrow" marker-end="url(#treem)"/><text x="470" y="70" text-anchor="start" class="rd-note" style="font-size:11px;font-weight:600">oui</text><rect x="10" y="88" width="240" height="56" rx="8" class="rd-blk rd-k-d" /><text x="130.0" y="114" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">L'hôte doit-il pouvoir</text><text x="130.0" y="128" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">lui parler ?</text><rect x="440" y="88" width="270" height="56" rx="8" class="rd-blk rd-k-d" /><text x="575.0" y="114" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Doit-elle être visible sur le réseau</text><text x="575.0" y="128" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">local comme une vraie machine ?</text><path d="M70,144 V178" class="rd-arrow" marker-end="url(#treem)"/><text x="62" y="164" text-anchor="end" class="rd-note" style="font-size:11px;font-weight:600">oui</text><path d="M190,144 V178" class="rd-arrow" marker-end="url(#treem)"/><text x="198" y="164" text-anchor="start" class="rd-note" style="font-size:11px;font-weight:600">non</text><rect x="10" y="178" width="115" height="50" rx="8" class="rd-blk rd-k-b" /><text x="67.5" y="200" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Réseau</text><text x="67.5" y="216" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">privé hôte</text><rect x="135" y="178" width="115" height="50" rx="8" class="rd-blk rd-k-b" /><text x="192.5" y="200" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Réseau</text><text x="192.5" y="216" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">interne</text><path d="M490,144 V178" class="rd-arrow" marker-end="url(#treem)"/><text x="482" y="164" text-anchor="end" class="rd-note" style="font-size:11px;font-weight:600">oui</text><path d="M620,144 V170" class="rd-arrow" marker-end="url(#treem)"/><text x="628" y="160" text-anchor="start" class="rd-note" style="font-size:11px;font-weight:600">non</text><rect x="440" y="178" width="100" height="50" rx="8" class="rd-blk rd-k-b" /><text x="490.0" y="200" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Accès</text><text x="490.0" y="216" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">par pont</text><rect x="555" y="170" width="130" height="64" rx="8" class="rd-blk rd-k-d" /><text x="620.0" y="192" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Plusieurs VM</text><text x="620.0" y="207" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">doivent-elles</text><text x="620.0" y="222" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">se parler ?</text><path d="M585,234 V268" class="rd-arrow" marker-end="url(#treem)"/><text x="577" y="256" text-anchor="end" class="rd-note" style="font-size:11px;font-weight:600">oui</text><path d="M655,234 V268" class="rd-arrow" marker-end="url(#treem)"/><text x="658" y="256" text-anchor="start" class="rd-note" style="font-size:11px;font-weight:600">non</text><rect x="520" y="268" width="120" height="46" rx="8" class="rd-blk rd-k-b" /><text x="580.0" y="296" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Réseau NAT</text><rect x="650" y="268" width="60" height="46" rx="8" class="rd-blk rd-k-b" /><text x="680.0" y="296" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">NAT</text>
</svg>
<figcaption>On part du besoin (Internet, hôte, visibilité, communication entre VM) pour arriver au mode.</figcaption>
</figure>

**Je vérifie.** Une VM héberge un serveur web que les postes du lycée doivent joindre. Quel mode ?

<details markdown="1">
<summary>Voir la réponse</summary>

**Accès par pont** : la VM doit être visible sur le réseau local, avec sa propre adresse.

</details>

**Je vérifie.** Dans un réseau interne, la VM 1 est en `192.168.100.1` et la VM 2 en `192.168.200.2` (masque `255.255.255.0`). Se parlent-elles ?

<details markdown="1">
<summary>Voir la réponse</summary>

Non : elles ne sont pas dans le même réseau (`192.168.100` contre `192.168.200`). Il faut mettre les trois premiers nombres identiques.

</details>

### Options avancées d'une carte

| Option | Rôle |
|---|---|
| Type de carte | modèle de carte virtuelle vu par le système invité |
| Mode promiscuité | permet de « voir » tout le trafic : utile pour l'analyse avec Wireshark |
| Adresse MAC | identifiant de la carte virtuelle, modifiable |

### À retenir pour les tests

> [!IMPORTANT]
> **Après chaque changement de mode** dans VirtualBox, il faut **désactiver puis réactiver** la carte réseau dans le **système de la VM** pour qu'elle relance sa configuration réseau.

- `ping adresse` teste la communication. Le **pare-feu** de Windows bloque en général les `ping` entrants : un `ping` sans réponse ne prouve **pas** qu'il n'y a pas de liaison. Vérifie avant de conclure.
- `ipconfig` (Windows) et `ip a` (Linux ; l'ancienne commande `ifconfig` existe encore sur certains systèmes) affichent la configuration réseau.

**Je vérifie.** Deux VM sont en mode **NAT** et ont toutes deux l'adresse `10.0.2.15`. Pourquoi n'y a-t-il pas de conflit d'adresse ?

<details markdown="1">
<summary>Voir la réponse</summary>

Chaque VM est derrière son propre NAT : elles sont sur des réseaux distincts, même si l'adresse est identique. C'est aussi pour cela qu'elles ne peuvent pas se joindre.

</details>

**Je vérifie.** Quel mode choisir pour simuler un réseau d'entreprise fermé de trois VM, sans aucun lien avec le réseau du lycée ?

<details markdown="1">
<summary>Voir la réponse</summary>

Le **réseau interne** : les trois VM portent le même nom de réseau et s'adressent à la main ; rien ne sort, rien n'entre.

</details>

## 2. Les snapshots

Un **snapshot** (instantané) est une **photographie de l'état d'une VM** à un instant donné : disque virtuel, mémoire, configuration matérielle, paramètres réseau. En quelques secondes, on peut revenir à cet état.

### À quoi ça sert

| Usage | Exemple |
|---|---|
| **Tester sans risque** | snapshot avant une mise à jour, une installation ou un changement de réglage réseau ; on revient en arrière si ça casse |
| **Garder un état stable** | système fraîchement installé, mise à jour validée, environnement de TP prêt |
| **Expérimenter** | casser, tester, recommencer sans réinstaller |
| **Accélérer un projet** | snapshot « système + Apache », puis « système + Apache + MariaDB » |

Le nom change selon l'hyperviseur : *snapshot* (VirtualBox, VMware, Proxmox/KVM, XenServer), *checkpoint* (Hyper-V).

### La chaîne de disques (disk chain)

Quand on crée un snapshot, l'hyperviseur **ne modifie plus le disque principal** : il crée un **fichier de différences** où vont toutes les nouvelles écritures.


<figure class="raid-fig">
<svg viewBox="0 0 720 140" role="img" aria-labelledby="cht" xmlns="http://www.w3.org/2000/svg"><title id="cht">Chaîne de disques d'une VM avec deux snapshots</title>
<defs><marker id="chm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="var(--disk-s)"/></marker></defs><rect x="10" y="30" width="150" height="64" rx="8" class="rd-blk rd-k-a" /><text x="85.0" y="60" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Disque principal</text><text x="85.0" y="74" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">figé : plus modifié</text><rect x="185" y="30" width="150" height="64" rx="8" class="rd-blk rd-k-b" /><text x="260.0" y="60" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Snapshot 1</text><text x="260.0" y="74" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">fichier de différences</text><rect x="360" y="30" width="150" height="64" rx="8" class="rd-blk rd-k-b" /><text x="435.0" y="60" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">Snapshot 2</text><text x="435.0" y="74" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">fichier de différences</text><rect x="560" y="30" width="150" height="64" rx="8" class="rd-blk rd-k-c" /><text x="635.0" y="60" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:700">VM en</text><text x="635.0" y="74" text-anchor="middle" class="rd-t" style="font-size:12px;font-weight:500">fonctionnement</text><line x1="160" y1="62" x2="185" y2="62" class="rd-arrow" marker-end="url(#chm)"/><line x1="335" y1="62" x2="360" y2="62" class="rd-arrow" marker-end="url(#chm)"/><line x1="510" y1="62" x2="560" y2="62" class="rd-arrow" marker-end="url(#chm)"/><text x="435" y="122" text-anchor="middle" class="rd-note" style="font-size:12px;font-weight:600">les nouvelles écritures vont ici</text><line x1="435" y1="108" x2="435" y2="96" class="rd-arrow" marker-end="url(#chm)"/>
</svg>
<figcaption>Chaque snapshot ajoute un fichier de différences : le disque principal n'est plus modifié.</figcaption>
</figure>


Plus un snapshot reste actif longtemps, plus le fichier de différences **grossit**.

### Pourquoi ce n'est pas une sauvegarde

Un snapshot dépend du disque principal et des fichiers de différences, qui sont **au même endroit**. Si le stockage tombe en panne, **tout** est perdu, snapshot compris. Une sauvegarde est une **copie indépendante**, conservée ailleurs.

### Les risques d'une chaîne trop longue

| Risque | Pourquoi |
|---|---|
| **Performances dégradées** | chaque lecture passe par le disque principal puis par les fichiers de différences |
| **Espace disque** | les fichiers de différences peuvent devenir très volumineux ; un stockage plein bloque la VM et peut corrompre des données |
| **Chaîne fragile** | un seul fichier endommagé peut rendre toute la VM inutilisable ; une fusion (*merge*) peut échouer |
| **Sauvegardes compliquées** | beaucoup d'outils refusent de sauvegarder une VM qui a un snapshot actif |

> [!WARNING]
> Ne jamais laisser tourner longtemps une VM **critique** (annuaire, base de données, serveur de fichiers) avec un snapshot actif.

**Je vérifie.** Pourquoi un snapshot ne remplace-t-il jamais une sauvegarde ?

<details markdown="1">
<summary>Voir la réponse</summary>

Il dépend des fichiers du disque d'origine, stockés au même endroit : une panne du stockage détruit à la fois la VM et ses snapshots. Une sauvegarde est une copie indépendante, sur un autre support ou un autre site.

</details>

## 3. Les Guest Additions

Les **Guest Additions** sont un ensemble de pilotes et d'outils installés **dans le système invité** (Windows, Linux) pour mieux l'intégrer à l'hôte. Elles apportent notamment :

- le **copier-coller** et le **glisser-déposer** entre l'hôte et la VM ;
- les **dossiers partagés** ;
- le redimensionnement de l'écran et une meilleure gestion de la souris.

On les installe depuis le menu **Périphériques** de VirtualBox (insérer l'image CD des Additions invité), puis on lance l'installation dans la VM.

## 4. Le stockage d'une VM

| Type de disque virtuel | Principe | Avantage | Inconvénient |
|---|---|---|---|
| **Allocation dynamique** | le fichier **grossit** à mesure que la VM écrit | peu de place prise au départ | peut ralentir en grossissant ; la place doit exister sur l'hôte le moment venu |
| **Taille fixe** | tout l'espace est **réservé** à la création | accès plus prévisible | occupe toute la taille tout de suite |

Les formats de fichiers de disque (VDI, VMDK, VHD…) sont décrits dans le [cours S06](../S06-virtualisation-premieres-vm/01-cours.md).

## 5. Une situation professionnelle : migrer un serveur vers la virtualisation

**Contexte.** Une PME de 80 salariés a **un seul serveur physique** Windows Server 2016 (partage de fichiers, imprimante réseau, DHCP). Le matériel a 7 ans et devient instable. Il faut moderniser sans interrompre l'activité, et prévoir un serveur de sauvegarde et un serveur de test.

**Problème.** Un seul serveur est un **point de défaillance unique** (SPOF) : s'il tombe, toute l'entreprise est paralysée.

**Solution envisagée.** Un serveur neuf avec un **hyperviseur de type 1** (par exemple ESXi, Hyper-V ou Proxmox) et plusieurs VM : annuaire et DNS, serveur de fichiers, serveur d'impression, préproduction. Bénéfices : isolation des rôles, snapshots avant les mises à jour critiques, sauvegardes et migrations facilitées, économie de matériel, évolution progressive.

**Je vérifie.** La virtualisation supprime-t-elle le point de défaillance unique dans cet exemple ?

<details markdown="1">
<summary>Voir la réponse</summary>

Pas à elle seule : avec **un seul** serveur physique, si la machine tombe, toutes les VM tombent. La haute disponibilité n'apparaît qu'avec **un second serveur** physique.

</details>
