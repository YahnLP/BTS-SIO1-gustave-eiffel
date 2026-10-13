# Cours – Sauvegarder et restaurer

*BTS SIO SISR 1re année – S20 – à lire avant le [TP](02-tp.md)*

> [!NOTE] Ce que tu dois savoir déjà
> - **Prérequis :** scripts et `cron` (S10, S19) ; GLPI et sa base de données (S13, S14).
> - **Mots déjà vus :** sauvegarde, instantané, base de données, `cron`, SSH.
> - **Expliqués dans ce cours :** RPO, RTO, règle 3-2-1, types de sauvegarde, différence avec instantané et réplication, empreinte, chiffrement.

## À la fin de ce cours, tu sauras

- [ ] définir **sauvegarde**, **restauration**, **RPO**, **RTO** ;
- [ ] appliquer la règle **3-2-1** ;
- [ ] distinguer les **types de sauvegarde** ;
- [ ] distinguer **sauvegarde**, **snapshot** et **réplication** ;
- [ ] expliquer pourquoi une sauvegarde doit être **testée** ;
- [ ] évaluer les **risques** (ransomware, données personnelles, accès).

## 1. Une sauvegarde sert à restaurer

Une **sauvegarde** est une **copie de données**, conservée à part, qui permet de **restaurer** le service après une perte : panne de disque, erreur humaine, suppression, virus, sinistre.

> [!WARNING]
> **Une sauvegarde qui n'a jamais été restaurée n'est pas une sauvegarde : c'est une hypothèse.** Le test de restauration est la seule preuve.

| Cause de perte | Exemple |
|---|---|
| Panne matérielle | Disque en panne |
| Erreur humaine | Dossier supprimé, base écrasée |
| Malveillance | Logiciel de rançon qui chiffre les données |
| Logiciel | Mise à jour qui corrompt une base |
| Sinistre | Incendie, inondation du local |

## 2. Deux nombres qui guident tout

| Sigle | Sens | Question |
|---|---|---|
| **RPO** (*recovery point objective*) | **Perte de données maximale admissible**, exprimée en temps | « Jusqu'à quand revient-on en arrière ? » |
| **RTO** (*recovery time objective*) | **Durée maximale d'interruption admissible** | « En combien de temps doit-on être de nouveau en service ? » |

Exemple : si la facturation tolère de perdre au plus 24 h de travail, son **RPO est de 24 h** : il faut au moins une sauvegarde par jour. Si elle doit être de nouveau disponible en 4 h, son **RTO est de 4 h** : la restauration doit être **plus rapide** que cela, et cela se **mesure**.

Un RPO ou un RTO **plus exigeant** coûte plus cher (fréquence, stockage, matériel de secours). Ils se **négocient** avec les utilisateurs, service par service, en s'appuyant sur la **CMDB** : un service critique ou très dépendant des autres demande des objectifs plus serrés.

## 3. La règle 3-2-1

| Chiffre | Règle |
|---|---|
| **3** | Au moins **3 copies** des données (l'original compte pour une) |
| **2** | Sur au moins **2 supports différents** |
| **1** | Dont **1 copie hors site** (ailleurs que le local principal) |

Un NAS posé **à côté** du serveur protège d'une panne de disque, pas d'un incendie. Une copie qui reste **connectée en permanence** peut être **chiffrée par un logiciel de rançon** en même temps que l'original : d'où l'intérêt d'une copie **déconnectée** ou **non modifiable**.

## 4. Les types de sauvegarde

| Type | Ce qui est copié | Avantage | Inconvénient |
|---|---|---|---|
| **Complète** | **Tout** | Restauration simple | Longue, volumineuse |
| **Différentielle** | Ce qui a changé depuis la **dernière complète** | Restauration en 2 étapes | Grossit jusqu'à la prochaine complète |
| **Incrémentale** | Ce qui a changé depuis la **dernière sauvegarde** (quelle qu'elle soit) | Rapide, légère | Restauration = complète + toutes les incrémentales : la chaîne doit être intacte |

**Rotation** : on garde plusieurs générations (par exemple 7 quotidiennes, 4 hebdomadaires, 12 mensuelles). Plus on garde longtemps, plus il faut de stockage **et** plus on garde de données personnelles (voir §6).

## 5. Sauvegarde, snapshot, réplication

| | Définition | Protège de | Ne protège pas de |
|---|---|---|---|
| **Sauvegarde** | Copie **stockée à part** | Panne, erreur, rançon (si copie isolée), sinistre (si hors site) | – |
| **Snapshot** (instantané d'une VM) | État **sur le même stockage** que la VM | Une mauvaise manipulation qu'on veut annuler vite | **Panne du stockage** : il disparaît avec la VM |
| **Réplication** | Copie **en continu** vers un autre site | Indisponibilité du site | **Erreur ou suppression** : elle se **réplique** aussitôt |

> [!NOTE]
> Dans ces TP, tu fais des snapshots de tes VM pour pouvoir **revenir en arrière**. C'est un outil de **confort de travail**, pas une sauvegarde.

## 6. Les outils de la séance

| Outil | Usage |
|---|---|
| `tar` | Regrouper (et compresser) des fichiers dans une **archive** |
| `rsync` | **Synchroniser** deux dossiers en ne copiant que ce qui a changé |
| `mysqldump` | **Exporter** une base MariaDB / MySQL en instructions SQL (S14) |
| `sha256sum` | Calculer une **empreinte** pour vérifier qu'un fichier n'a pas changé |
| `cron` | Planifier (S19) |

**`rsync` et la barre oblique finale.** `rsync -a source/ destination/` copie le **contenu** de `source` ; sans barre oblique finale sur la source, `rsync` copie le **dossier lui-même** dans la destination. Option `--dry-run` : montre ce qui serait fait. Option `--delete` : supprime en destination ce qui n'existe plus à la source : **à utiliser avec précaution**.

## 7. Sécurité et protection des données

- Les sauvegardes contiennent **les mêmes données que l'original**, donc des **données personnelles** : leur accès doit être aussi **restreint** que celui de l'original, et leur durée de conservation **justifiée**.
- Une sauvegarde peut être **chiffrée** (rendue illisible sans clé) ; alors la **clé** devient critique : si elle est perdue, la sauvegarde est inutilisable. Elle se conserve **ailleurs** que la sauvegarde.
- Le **compte** qui sauvegarde a les droits d'**écriture** sur les sauvegardes : s'il est compromis, elles le sont aussi.
- Les sauvegardes sont à **superviser** : une sauvegarde qui échoue en silence est une fausse sécurité (S19).
- La question de l'effacement des données personnelles **dans** les sauvegardes est à voir avec le **délégué à la protection des données** de l'organisation.

### Chiffrer un fichier avec `gpg`

`gpg` (GnuPG) est un outil libre de chiffrement. Il propose deux façons de faire :

| | Principe | Exemple |
|---|---|---|
| **Avec une phrase secrète** (chiffrement *symétrique*) | La **même** phrase chiffre et déchiffre | `gpg -c fichier` puis `gpg fichier.gpg` |
| **Avec une paire de clés** (chiffrement *asymétrique*) | On chiffre avec la clé **publique** du destinataire ; seul celui qui a la clé **privée** peut déchiffrer (voir la paire de clés de [S19](../S19-automatisation/README.md), partie SSH) | `gpg --encrypt --recipient NOM fichier` |

Dans les deux cas, **sans la phrase secrète ou la clé privée, le fichier est perdu**. Teste toujours le déchiffrement avant de supprimer l'original.

> [!TIP] À toi de chercher
> Avec `man gpg` ou `gpg --help`, retrouve l'option qui **déchiffre** un fichier et celle qui liste les clés. Résume-les en deux phrases dans ta fiche.

## 8. Que sauvegarder ?

Pour un service, il faut sauvegarder **tout ce qui est nécessaire pour le remettre en route** :

| Élément | Exemple (GLPI) |
|---|---|
| **Données** | La base |
| **Fichiers** | Documents joints |
| **Configuration** | Fichiers de configuration du serveur Web et de l'application |
| **Procédure de restauration** | Le **document** qui explique comment faire |

Un oubli classique : sauvegarder la base **sans** les fichiers ou la configuration, ou la procédure.

## Pour aller plus loin : PCA et PRA <span class="technique">notion technique</span>

> [!TIP] Pour aller plus loin
> Au-delà de la sauvegarde, une organisation prévoit comment **continuer** ou **reprendre** son activité après un sinistre. Le **PCA** (plan de continuité d'activité) décrit comment l'activité se **poursuit** pendant l'incident (mode dégradé, site de secours). Le **PRA** (plan de reprise d'activité) décrit comment **redémarrer** après une interruption. Les deux s'appuient sur les **RTO** et **RPO** de chaque service. Retiens la différence ; le détail est facultatif.

## Je retiens

- Une sauvegarde se **teste** : sans restauration réussie, elle ne prouve rien.
- **RPO** = perte de données admissible ; **RTO** = arrêt admissible ; on les **mesure**.
- **3-2-1** : 3 copies, 2 supports, 1 hors site.
- **Snapshot** ≠ sauvegarde ; **réplication** ≠ sauvegarde (elle copie aussi les erreurs).
- Sauvegarder **tout ce qu'il faut pour restaurer**, y compris la procédure.
- Les sauvegardes sont des **données sensibles** : accès, durée, clés.
