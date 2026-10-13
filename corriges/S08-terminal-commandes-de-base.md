# Corrigé (enseignant) – S08 Terminal Linux, commandes de base

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

**Attention aux pièges.**

## Partie A

Réponse attendue sur NAT / accès par pont : voir « Éléments de réponse » du TP. Prompt de type `utilisateur@machine:~$`.

## Partie B

| Étape | Éléments attendus |
|---|---|
| 1 | `sudo reboot` : la VM redémarre ; mot de passe de root demandé |
| 2 | `su -` (mot de passe de root) ou `sudo -i` (mot de passe de l'utilisateur) ; le prompt se termine par `#` ; `exit` pour sortir |
| 3 | Les flèches parcourent les commandes déjà tapées |
| 4 | `Ctrl + R` : recherche inversée dans l'historique, la commande complète est proposée |
| 5 | `history` |
| 6 | `clear` |
| 7 à 10 | `df -h` : espace disque ; `du -sh ~` : taille du dossier personnel ; `free -m` : mémoire en Mo ; `date` : date et heure |

## Partie C

| Étape | Éléments attendus |
|---|---|
| 7, 8 | `pwd` donne le dossier personnel (par exemple `/home/<utilisateur>`) ; après `cd /`, `pwd` donne `/` |
| 9 | `ls -l` : droits, propriétaire, groupe, taille, date |
| 10 | `cd home` (relatif, depuis `/`) |
| 11 | `cd -` ou `cd ..` (voir TP : ils coïncident ici car on était dans `/`, parent de `/home`) |
| 12 | `mkdir GuyTare` dans `/home` : échec, « Permission denied » |
| 13 | `sudo mkdir GuyTare` : réussite |
| 14 | `sudo rmdir GuyTare` (ou `sudo rm -r GuyTare`) |

## Partie D

Solution en une seule commande (accolades du shell et guillemets) :

```bash
sudo mkdir -p /var/partage/JackCelair/{commerce/{vente,"relation client"},etudes/{développeur,mécanicien,"expert technique"},"direction générale",comptabilité,"ressources humaines",communication}
```

Variante sans accolades (une commande, tous les chemins listés) : `sudo mkdir -p /var/partage/JackCelair/commerce/vente "/var/partage/JackCelair/commerce/relation client" …`.

Vérification : `ls -R /var/partage/JackCelair`. 12 dossiers au total (JackCelair compris).

**Points de vigilance :** la commande `mkdir -p` sans `sudo` échoue sur `/var` ; l'oubli des guillemets crée `relation` et `client` en silence.

## Partie E

`touch "/var/partage/JackCelair/direction générale/note_interne.txt"` ; `sudo` nécessaire si le dossier appartient à root. `find /etc -name "*.conf"` : des messages « Permission denied » apparaissent.

## Points à vérifier avant diffusion

- Comportement exact de `sudo` dans l'image Debian de la salle (le paquet `sudo` n'est pas toujours installé d'origine sous Debian) et groupe de l'utilisateur.
- Existence éventuelle de `/var/partage` dans l'image fournie.
