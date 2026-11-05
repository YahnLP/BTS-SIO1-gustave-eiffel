# Matrice des habilitations – S09

*Dossiers partagés de JackCelair, sous `/var/partage/JackCelair`.*

- **rw** : lire, créer, modifier, supprimer.
- **--** : aucun accès (pas même entrer dans le dossier).

| Groupe | commerce | etudes | direction générale | comptabilité | ressources humaines | communication |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| `grp-commerce` | **rw** | -- | -- | -- | -- | -- |
| `grp-etudes` | -- | **rw** | -- | -- | -- | -- |
| `grp-direction` | -- | -- | **rw** | -- | -- | -- |
| `grp-compta` | -- | -- | -- | **rw** | -- | -- |
| `grp-rh` | -- | -- | -- | -- | **rw** | -- |
| `grp-communication` | -- | -- | -- | -- | -- | **rw** |

- Les sous-dossiers **héritent du service** : `vente` et `relation client` → commerce ; `développeur`, `mécanicien` et `expert technique` → etudes.
- Le dossier `JackCelair` lui-même reste en **lecture et traversée** pour tous : on voit les noms des services, on n'entre que dans le sien.

## Comptes de test (fictifs)

| Compte | Groupe |
|---|---|
| `alice` | `grp-commerce` |
| `bruno` | `grp-etudes` |
| `carla` | `grp-compta` |
