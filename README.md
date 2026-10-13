# Systèmes et réseaux – BTS SIO SISR 1re année

Cours, TP et aide-mémoire de **BTS SIO option SISR, 1re année** (21 séances de 4 h). Auteur : Yahn LE PRETTRE, Enseignant · Lycée Gustave Eiffel ([formaxionlandes.fr](https://formaxionlandes.fr/)) – licence CC BY-NC-SA 4.0.

**Site (GitHub Pages) :** <https://yahnlp.github.io/BTS-SIO1-gustave-eiffel/>

## Contenu

| Dossier | Contenu |
|---|---|
| [`docs/semestre-1`](docs/semestre-1/README.md) | Séances S01 à S10 : hardware, systèmes d'exploitation, virtualisation, terminal Linux |
| [`docs/semestre-2`](docs/semestre-2/README.md) | Séances S11 à S21 : conteneurs, gestion de parc, ITIL, services (FOG, automatisation, sauvegardes) |
| [`docs/ressources`](docs/ressources/README.md) | Référentiel, outils et simulateurs, licences |
| [`docs/simulateur`](docs/simulateur/) | Le simulateur réseau hors ligne (un seul fichier HTML) |
| [`docs/serveurs`](docs/serveurs/README.md) | Anciens modules serveurs (web, FTP, NAS, Active Directory), conservés pour adaptation, **non listés dans le menu** |
| [`corriges`](corriges/) | Corrigés **réservés à l'enseignant** (non publiés sur le site, mais visibles dans ce dépôt) |
| [`tools`](tools/CONVENTIONS.md) | Conventions de rédaction du site |

## Avancement

Séances publiées : **toutes les séances du semestre 1 (S01 à S10)** : hardware et culture informatique (S01 à S03), systèmes d'exploitation (S04 et S05), virtualisation (S06 et S07), terminal Linux (S08 à S10). Semestre 2 : **toutes les séances (S11 à S21)** : conteneurs (S11), gestion de parc (S12 à S14), ITIL et support (S15 et S16), mise à disposition de services (S17 à S21 : services et SLA, clonage avec FOG, automatisation, sauvegardes, projet de synthèse).

## Principe pédagogique

Anticiper → manipuler → comprendre → vérifier → faire le bilan de ses compétences. Chaque TP contient « J'anticipe » avant de manipuler, des commandes données quand on ne peut pas les deviner (toujours à comprendre : « Je comprends »), des questions « pourquoi » et un bilan final rattaché au référentiel du BTS.

## Travailler en local

```bash
pip install -r requirements.txt
mkdocs serve        # http://127.0.0.1:8000
mkdocs build --strict
```

## Licence

Contenus : **CC BY-NC-SA 4.0**. Simulateur réseau : **EUPL 1.2**. Détail : [`docs/ressources/licences.md`](docs/ressources/licences.md).
