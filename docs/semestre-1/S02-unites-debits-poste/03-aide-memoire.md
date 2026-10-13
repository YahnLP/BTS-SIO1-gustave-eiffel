# Aide-mémoire – Unités, débits et poste Windows

*BTS SIO SISR 1re année – S02*

> Un mot ou un sigle inconnu ? Passe la souris dessus, ou ouvre le [glossaire](../../ressources/glossaire.md). Repère <span class="technique">notion technique</span> : à lire sans l'apprendre par cœur.

## Préfixes

| Décimal | Valeur | Binaire | Valeur |
|---|---|---|---|
| Ko | 10³ = 1 000 | Kio | 2¹⁰ = 1 024 |
| Mo | 10⁶ | Mio | 2²⁰ = 1 048 576 |
| Go | 10⁹ | Gio | 2³⁰ = 1 073 741 824 |
| To | 10¹² | Tio | 2⁴⁰ = 1 099 511 627 776 |

## Formules

| Besoin | Formule |
|---|---|
| bit/s → octet/s | ÷ 8 |
| octet/s → bit/s | × 8 |
| Go marqué → Gio affichés | × 0,931 (environ) |
| Temps de transfert | taille en octets ÷ débit en octet/s |
| Débit d'une chaîne | le plus faible des maillons |

## Repères

- 1 Gbit/s = 125 Mo/s ; 100 Mbit/s = 12,5 Mo/s ; 8 Mbit/s = 1 Mo/s.
- 1 To marqué ≈ 931 Gio ; 500 Go marqués ≈ 466 Gio.

## PowerShell : le minimum

| Besoin | Piste |
|---|---|
| Chercher une commande | `Get-Command *mot*` |
| Lire l'aide | `Get-Help NomDeCommande` |
| Choisir des colonnes | tube puis `Select-Object` : `Get-Process` suivi de `Select-Object Name, Id` |
| Lister les processus | `Get-Process` (CMD : `tasklist`) |
| Afficher l'adresse IP | `ipconfig` (PowerShell : `Get-NetIPAddress`) |
