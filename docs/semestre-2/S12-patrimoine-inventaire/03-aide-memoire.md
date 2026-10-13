# Aide-mémoire – Inventaire et patrimoine

*BTS SIO SISR 1re année – S12*

> Un mot ou un sigle inconnu ? Passe la souris dessus, ou ouvre le [glossaire](../../ressources/glossaire.md). Repère <span class="technique">notion technique</span> : à lire sans l'apprendre par cœur.

## Vocabulaire

| Mot | Sens |
|---|---|
| Patrimoine / parc | Ensemble des ressources numériques de l'organisation |
| CI | Élément de configuration : élément géré individuellement |
| CMDB | Base de données des CI et de leurs relations |
| Identifiant d'inventaire | Numéro unique et stable collé sur l'équipement |
| Agent | Programme installé sur le poste qui collecte l'inventaire |
| Agentless | Inventaire à distance sans agent (SNMP, WMI <span class="technique">notion technique</span>) |
| Charte informatique | Règles d'usage signées par les utilisateurs |

## Attributs d'une fiche

identifiant · type · marque · modèle · numéro de série · nom · utilisateur · service · localisation · date d'achat · état · système

## Cycle de vie

commande → stock → déploiement (en service) → exploitation et maintenance → retrait → recyclage

## Calcul du temps manuel

temps total = nombre de postes × temps par poste (ici 45 min)

## Contrôler un fichier CSV avec séparateur `;` (colonnes numérotées à partir de 1)

| Besoin | Commande |
|---|---|
| Nombre de lignes | `wc -l fichier.csv` |
| Afficher une colonne | `cut -d';' -f5 fichier.csv` |
| Doublons dans une colonne | `cut -d';' -f5 fichier.csv` puis `sort` puis `uniq -d` |
| Compter les valeurs d'une colonne | `cut -d';' -f11 fichier.csv` puis `sort` puis `uniq -c` |
| Lignes où la colonne 5 est vide | `awk -F';' 'NR>1 && $5==""' fichier.csv` |
| Lignes avec un format de date inattendu | `awk -F';' 'NR>1 && $10 !~ /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/' fichier.csv` |

Enchaîner avec le tube `|` : `cut -d';' -f5 fichier.csv | sort | uniq -d`

## Défauts de qualité

doublon · champ vide · formats différents · valeurs non normalisées · valeur incohérente · fiche périmée

## Données personnelles

finalité · minimisation · information (charte) · sécurité · durée
