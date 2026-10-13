# Aide-mémoire – Virtualisation avancée

*BTS SIO SISR 1re année – S07*

> Un mot ou un sigle inconnu ? Passe la souris dessus, ou ouvre le [glossaire](../../ressources/glossaire.md). Repère <span class="technique">notion technique</span> : à lire sans l'apprendre par cœur.

## Modes réseau de VirtualBox

| Mode | DHCP | Entre VM | Internet | Hôte | Quand le choisir |
|---|---|---|---|---|---|
| NAT | oui | non | oui | à vérifier | une VM isolée qui télécharge et met à jour |
| Réseau NAT | oui | oui | oui | non | plusieurs VM qui se parlent et sortent sur Internet |
| Accès par pont | si le réseau en a un | oui | oui | oui | une VM visible sur le réseau comme une machine physique |
| Réseau interne | non (IP manuelle) | oui, **même nom** | non | non | réseau fermé de tests |
| Réseau privé hôte | oui | oui | non | oui | tester hôte et VM |

> [!IMPORTANT]
> Après **chaque changement de mode** : désactiver puis réactiver la carte réseau **dans le système de la VM**.

## Tests réseau

| Besoin | Windows | Linux |
|---|---|---|
| Configuration réseau | `ipconfig` | `ip a` |
| Tester une adresse | `ping adresse` | `ping -c 4 adresse` |
| Adresse manuelle (temporaire) | propriétés IPv4 de la carte | `sudo ip addr add 192.168.100.2/24 dev eth0` puis `sudo ip link set eth0 up` |

Si un `ping` ne répond pas : adresse correcte ? même mode et même nom de réseau ? carte réactivée ? **pare-feu de la cible** ?

## Snapshots

| Action | Où |
|---|---|
| Prendre un instantané | menu **Machine** > **Prendre un instantané** |
| Restaurer | gestionnaire des instantanés > **Restaurer** |

| À retenir | |
|---|---|
| Un snapshot est un **fichier de différences** ajouté au disque principal | la chaîne grossit |
| Ce n'est **pas** une sauvegarde | même stockage, perdu en cas de panne |
| Trop de snapshots | lenteur, espace, chaîne fragile, sauvegardes compliquées |
| VM critique | éviter de garder un snapshot actif longtemps |

## Guest Additions

| Système | Procédure |
|---|---|
| Windows | **Périphériques** > **Insérer l'image CD des Additions invité**, exécuter le CD, redémarrer |
| Linux (Kali) | même menu, puis `sudo mkdir -p /mnt/cdrom`, `sudo mount /dev/cdrom /mnt/cdrom`, `cd /mnt/cdrom`, `sudo sh ./VBoxLinuxAdditions.run --nox11`, `sudo shutdown -r now` |

Elles apportent : copier-coller, glisser-déposer, dossiers partagés, écran redimensionnable.
