# Plan d'adressage et tableau de tests – S07

## Réseau interne « LAN » (étapes de la partie E)

| Machine | Adresse IP | Masque | Passerelle |
|---|---|---|---|
| VM Windows | `192.168.100.1` | `255.255.255.0` | aucune |
| VM Kali | `192.168.100.2` | `255.255.255.0` | aucune |

*Adresses de l'exemple de la trace écrite.*

## Modes à tester, dans l'ordre

1. **Accès par pont** (carte reliée au réseau du lycée)
2. **NAT**
3. **Réseau NAT**
4. **Réseau interne « LAN »**
5. **Réseau interne** : « LAN » pour Windows et « LAN2 » pour Kali

> [!WARNING] Après chaque changement de mode
> Dans VirtualBox, change le mode, puis **désactive et réactive la carte réseau** dans le système de la VM pour relancer sa configuration réseau.

## Tableau à compléter

**OK** = réponse au ping, **KO** = pas de réponse. À copier dans le compte rendu.

<div class="fiche" markdown>

| Mode | Adresse Windows | Adresse Kali | W → K | K → W | W → hôte | K → hôte | Internet |
|---|---|---|---|---|---|---|---|
| Accès par pont | | | | | | | |
| NAT | | | | | | | |
| Réseau NAT | | | | | | | |
| Réseau interne (LAN) | | | | | | | |
| Réseau interne (LAN / LAN2) | | | | | | | |

</div>
