# Corrigé (enseignant) – S20 Sauvegarder et restaurer

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les réponses aux questions sont repliées dans le TP. **Aucune commande n'a été exécutée** dans l'environnement de rédaction.

## Lecture de NovaTech complet (d'après le code du jeu de données, à vérifier à l'écran)

| Service (CMDB) | Chaîne de dépendance relevée dans le code |
|---|---|
| Facturation comptable | utilise le logiciel de facturation, hébergé sur SRV-FACT |
| Partage de fichiers | dépend de SRV-FICHIERS |
| Intranet RH | utilise l'application RH, hébergée sur l'hôte HV-DC-01 (qui porte aussi les machines virtuelles VM-RH01 et VM-WEB01) |
| Messagerie | dépend de SRV-ITSM |

Autres éléments : un NAS (NAS-DC-01) dans le même datacenter ; commutateurs ; 45 utilisateurs ; un poste sur trois sans agent. La **non-conformité** Office (trois installations de trop) est présente pour S14, hors sujet ici.

## À tester avant la séance

| Point | Pourquoi |
|---|---|
| Chargement de « NovaTech complet » et relations de la CMDB | Vérifier les chaînes ci-dessus à l'écran |
| Second disque virtuel : ajout, nom (`lsblk`), formatage, montage | Étape délicate ; encadrer pour éviter de formater le mauvais disque |
| `tar`, `rsync` installés sur la VM (`rsync` peut manquer) | Installer avec `apt` au besoin |
| `mysqldump` sur la VM GLPI : droits et authentification (`sudo`) | Dépend de la configuration de MariaDB |
| Dossiers de configuration et de fichiers de GLPI | Dépendent de la version et de la procédure d'installation (S13) |
| Option `--single-transaction` | À confirmer dans la documentation de la version de MariaDB |
| `cron` présent sur la VM | Voir S19 |

## Pièges probables

- Restauration **par-dessus** l'original ou la base en service.
- Sauvegarde **sur le même disque** que la source (le second disque oublié).
- `--delete` utilisé sans `--dry-run` : perte de fichiers.
- Étudiants qui disent « restauré » sans **preuve** (empreinte, comparaison, comptage).
- Formatage du **mauvais disque** : insister sur `lsblk` avant `mkfs`.
- Confusion **snapshot / sauvegarde** : le débat de l'accroche doit y revenir à la fin.

## Barème indicatif (20 points)

| Critère | Points |
|---|---|
| Partie A : tableau d'analyse cohérent avec la CMDB, RPO/RTO justifiés | 4 |
| Partie B : archive, synchronisation, restauration prouvée, RTO et RPO mesurés | 5 |
| Partie C : sauvegarde et restauration de la base, comparaison, script | 5 |
| Partie D : plan complet et cohérent (3-2-1, rançon, test, données personnelles) | 5 |
| Réponses « Je comprends » | 1 |

## Compétences

B3.4 et B2.3 sont une proposition à valider ; les deux sont notées « de mémoire, à vérifier » dans le référentiel du dépôt.
