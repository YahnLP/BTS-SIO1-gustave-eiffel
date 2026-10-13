# Aide-mémoire – Virtualisation : premières machines virtuelles

*BTS SIO SISR 1re année – S06*

> Un mot ou un sigle inconnu ? Passe la souris dessus, ou ouvre le [glossaire](../../ressources/glossaire.md). Repère <span class="technique">notion technique</span> : à lire sans l'apprendre par cœur.

## Vocabulaire

| Mot | Définition |
|---|---|
| **Machine hôte** | l'ordinateur physique qui héberge les VM |
| **Système invité** | le système installé dans une VM |
| **Hyperviseur** | le logiciel qui crée, répartit et isole les ressources des VM |
| **Virtualisation** | plusieurs systèmes isolés sur une même machine physique |
| **Émulation** | imitation d'un système différent, par traduction des instructions (plus lent) |
| **Conteneur** | environnement isolé qui partage le noyau de l'hôte (Docker, LXC) |

## Type 1 ou type 2

| | Type 2 (hébergé) | Type 1 (natif) |
|---|---|---|
| Installation | sur un système existant | directement sur le matériel |
| Usage | test, formation, développement | production, serveurs |
| Exemples | VirtualBox, VMware Workstation, Parallels, UTM | ESXi, Hyper-V, KVM, Xen |

## Deux façons d'obtenir une VM

| Méthode | Fichier | Remarque |
|---|---|---|
| VM « nue » + installation | **ISO** | on choisit les ressources, puis on installe le système |
| VM préconfigurée | **OVA** (paquet complet) ou **OVF** (description seule) | seulement depuis des sites officiels |

## Formats de disques virtuels

| Format | Origine |
|---|---|
| VDI | VirtualBox |
| VMDK | VMware |
| VHD / VHDX | Microsoft Hyper-V |
| QCOW2, IMG | QEMU, UTM |

## Configuration d'une VM dans VirtualBox

| Réglage | À décider |
|---|---|
| Nom | clair et unique (convention : `CS1 - Système - NOM`) |
| Emplacement | un disque avec assez de place, jamais `C:` |
| Type et version | le système à installer (64 bits) |
| Mémoire vive | selon le système ; prélevée sur l'hôte |
| Processeurs | nombre de cœurs attribués à la VM |
| Disque | taille maximale ; **dynamique** (grossit) ou **fixe** |
| Réseau | NAT par défaut ; accès par pont pour une VM visible sur le réseau |

## Avant de créer une VM

- [ ] La virtualisation matérielle (**VT-x** ou **AMD-V**) est activée dans le BIOS/UEFI.
- [ ] Il reste assez de **mémoire** et de **place disque** sur l'hôte.
- [ ] L'ISO ou l'OVA vient d'une **source officielle**.

> [!WARNING]
> Une VM téléchargée sur Internet peut contenir des virus. Utiliser uniquement des sites officiels.
