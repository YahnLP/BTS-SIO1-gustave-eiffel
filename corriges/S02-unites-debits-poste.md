# Corrigé (enseignant) – S02 Unités, débits et analyse d'un poste

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

Les parties A et B sont corrigées dans le TP (réponses repliées). Ce document complète.

## Vérification des calculs

| Calcul | Résultat |
|---|---|
| 10¹² ÷ 2³⁰ | 931,32 Gio |
| 500 × 10⁹ ÷ 2³⁰ | 465,66 Gio |
| 32 × 10⁹ ÷ 2³⁰ | 29,80 Gio |
| 4,7 × 10⁹ ÷ 2³⁰ | 4,377 Gio |
| 500 Gio en Go | 536,87 Go |
| 500 ÷ 32 · 536,87 ÷ 32 | 15,6 · 16,8 |

## Points de vigilance sur les unités

| Piège | Décision |
|---|---|
| Confondre Ko (1000) et Kio (1024) | Le TP demande les deux conversions et pose la règle « on précise l'hypothèse » |
| 500 Go confondus avec 500 Gio, puis 32 Go ≈ 29,8 Gio → 17 clés | Deux hypothèses explicites (16 et 17 clés) ; on retient 17 et la marge |
| Énoncé sans hypothèse sur l'unité du disque | Même traitement |

## Partie C – points d'attention

- **Valeurs à vérifier avant la séance** (commandes non exécutées sur le parc de la salle) : `Get-CimInstance Win32_Processor`, `Win32_PhysicalMemory`, `Win32_VideoController`, `Get-PhysicalDisk`, `Get-NetAdapter`, `Get-ComputerInfo`, `Get-Package`. Sur certaines machines, `SMBIOSMemoryType` renvoie 0 ou une valeur inattendue : l'interface graphique reste alors la référence.
- **Règle Get-Package :** peut demander l'installation d'un fournisseur de paquets ; si c'est bloqué, utiliser `winget list` ou le panneau « Applications installées ».
- **Exécution de scripts :** la politique d'exécution de PowerShell n'empêche pas de taper des commandes une à une ; elle ne concerne que les fichiers de script.
- **Réponses attendues sur duplex :** half duplex = émission ou réception, pas les deux en même temps ; full duplex = les deux simultanément.
- **Barème indicatif :** partie A (6 pts), partie B (8 pts), partie C (6 pts : preuve + commande documentée).
