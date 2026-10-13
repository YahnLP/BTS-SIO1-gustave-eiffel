# Aide-mémoire – Sauvegardes

*BTS SIO SISR 1re année – S20*

## Vocabulaire

| Terme | Sens |
|---|---|
| RPO | Perte de données maximale admissible (en temps) |
| RTO | Arrêt maximal admissible |
| 3-2-1 | 3 copies, 2 supports, 1 hors site |
| Complète / différentielle / incrémentale | Tout / depuis la dernière complète / depuis la dernière sauvegarde |
| Snapshot | État sur le **même** stockage : n'est pas une sauvegarde |

## Commandes

| Besoin | Commande |
|---|---|
| Lister les disques | `lsblk` |
| Créer une archive compressée | `tar -czf archive.tar.gz -C dossier-parent nom` |
| Lister une archive | `tar -tzf archive.tar.gz` |
| Extraire dans un dossier | `tar -xzf archive.tar.gz -C /tmp/restauration` |
| Synchroniser | `rsync -a source/ destination/` |
| Simuler | `rsync -a --dry-run -v source/ destination/` |
| Empreinte | `sha256sum fichier` |
| Comparer deux dossiers | `diff -r dossier1 dossier2` |
| Exporter une base | `sudo mysqldump --single-transaction glpi > glpi-$(date +%F).sql` |
| Restaurer dans une base de test | `sudo mysql glpi_restauration < glpi-AAAA-MM-JJ.sql` |
| Lister les fichiers de plus de 7 jours | `find /chemin -name 'glpi-*.sql' -mtime +7 -print` |

> `rsync source/ dest/` copie le **contenu** de `source` ; sans barre finale, elle copie le **dossier**. `--delete` supprime en destination ce qui n'existe plus à la source : danger.

## Rappels

- **Une sauvegarde non testée n'existe pas.**
- Restaurer **à côté**, jamais par-dessus.
- Sauvegarder aussi : configuration, fichiers joints, procédure.
- Les sauvegardes contiennent des **données personnelles** et des **secrets** : accès restreint.
- Copie **déconnectée** ou **non modifiable** contre la rançon.
