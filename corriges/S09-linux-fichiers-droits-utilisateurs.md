# Corrigé (enseignant) – S09 Utilisateurs, droits et liens

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

**Attention aux pièges.**

Les commandes de ce TP ont été essayées dans un environnement Ubuntu 24.04 (pas dans l'image Debian de la salle) : voir les points à vérifier en fin de document.

## Partie A

`sudo adduser tech2025` ; `sudo usermod -aG sudo tech2025` ; `id tech2025` doit montrer `sudo` parmi les groupes ; `su - tech2025`.

## Partie B

| Étape | Commande |
|---|---|
| 2 | `mkdir CommandesLinux && cd CommandesLinux` |
| 3 | `mkdir -p cours1/cours2/cours3/cours4` |
| 4 | `ls -r` |
| 5 | `rmdir cours1` : échec (« Directory not empty ») |
| 6 | `rm -r cours1` ou `rmdir -p cours1/cours2/cours3/cours4` ; vérification avec `ls -R` |
| structure | `mkdir -p couleur/froide forme/angle forme/courbe` |
| 7 | `cp /etc/services .` |
| 8 | `touch rond.txt triangle.txt carre.txt rectangle.txt vert.txt bleu.txt` |
| 9, 10 | `mv rond.txt forme/courbe/` ; `mv triangle.txt carre.txt rectangle.txt forme/angle/` ; `mv vert.txt bleu.txt couleur/froide/` |
| 12 | `cp -r froide chaude` (depuis `couleur`) ; sans `-r` : `cp: -r not specified; omitting directory` |
| 13 | `mv bleu.txt rouge.txt` ; `mv vert.txt jaune.txt` (dans `chaude`) |
| B3 | `cat /etc/issue` ; `less services` |

Résultat final : `tp/arborescence-commandeslinux-attendue.txt`.

## Partie C

`echo "rouge" > rouge.txt` ; `ln rouge.txt orange.txt` ; `ln -s rouge.txt orangeRelatif` ; `ln -s "$PWD/rouge.txt" orangeAbsolu` (ou le chemin complet). Après `mv couleur peinture` :

| Lien | Résultat constaté |
|---|---|
| `orange.txt` (dur) | affiche `rouge` |
| `orangeRelatif` | affiche `rouge` |
| `orangeAbsolu` | `No such file or directory` (lien cassé) |

Après `rm rouge.txt` : `orange.txt` affiche toujours `rouge` ; `orangeRelatif` est cassé.

## Partie D

Valeurs de `umask` et droits des nouveaux fichiers : **à constater sur l'image de la salle** (dans mon essai sous Ubuntu : `umask` 0002, fichiers en `rw-rw-r--` ; sous Debian, valeur à vérifier).

D3 : sans `x` sur `tableau` (avec `r`) : `ls tableau` affiche le nom du fichier, `cat tableau/note.txt` et `cd tableau` sont refusés. Sans `r` (avec `x`) : `ls tableau` refusé, `cat tableau/note.txt` fonctionne (affiche le contenu).

## Partie E

```bash
for g in grp-commerce grp-etudes grp-direction grp-compta grp-rh grp-communication; do sudo addgroup $g; done
sudo chgrp -R grp-commerce /var/partage/JackCelair/commerce
sudo chmod -R 2770 /var/partage/JackCelair/commerce
sudo chgrp -R grp-etudes /var/partage/JackCelair/etudes
sudo chmod -R 2770 /var/partage/JackCelair/etudes
sudo chgrp grp-direction "/var/partage/JackCelair/direction générale"
sudo chmod 2770 "/var/partage/JackCelair/direction générale"
sudo chgrp grp-compta /var/partage/JackCelair/comptabilité
sudo chmod 2770 /var/partage/JackCelair/comptabilité
sudo chgrp grp-rh "/var/partage/JackCelair/ressources humaines"
sudo chmod 2770 "/var/partage/JackCelair/ressources humaines"
sudo chgrp grp-communication /var/partage/JackCelair/communication
sudo chmod 2770 /var/partage/JackCelair/communication
sudo chmod 755 /var/partage/JackCelair
sudo adduser alice; sudo adduser bruno; sudo adduser carla
sudo usermod -aG grp-commerce alice
sudo usermod -aG grp-etudes bruno
sudo usermod -aG grp-compta carla
```

Résultats des tests (constatés dans mon essai) :

| Test | Résultat |
|---|---|
| `alice` crée `commerce/vente/devis.txt` | OK ; fichier `alice grp-commerce` (grâce au setgid) |
| `alice` : `ls etudes` | `Permission denied` |
| `bruno` : `cat devis.txt` | `Permission denied` (pas de `x` sur `commerce` pour « autres ») |
| `bruno` crée `etudes/mécanicien/plan.txt` | OK |
| `carla` : `ls /var/partage/JackCelair` | liste les six services |
| `carla` : `cd "direction générale"` | `Permission denied` |

`usermod -G sudo alice` (sans `-a`) a bien fait perdre à `alice` son appartenance à `grp-commerce`.

## Points à vérifier avant diffusion

- Image Debian de la salle : `adduser`, `addgroup`, `sudo`, `less`, `man` installés ; `/etc/services` présent (paquet `netbase`) ; valeur du `umask`.
- Les noms de comptes (`tech2025`, `alice`, `bruno`, `carla`) sont des propositions ; supprimer les comptes de test en fin de séance (`sudo deluser --remove-home nom`).

## Partie F (ajoutée) : hygiène numérique

- Calculs : 26⁸ = 208 827 064 576 ; 62⁸ = 218 340 105 584 896 ; 26¹² = 95 428 956 661 682 176 (à refaire avec `python3` avant la séance).
- **Non testé** dans l'environnement de rédaction : `chage -M`, `chage -l`, lecture de `/etc/shadow` dans la VM de la salle.
- La double authentification se fait sur un compte **personnel** de l'élève : ne rien lui demander de montrer. Les messages de F3 sont fictifs (domaines `.example`).
- Compétence B3.3 (sécuriser les équipements et les usages) : cette partie en est la preuve la plus directe de la séance. Barème : F = 4 points, pris sur la partie E.
