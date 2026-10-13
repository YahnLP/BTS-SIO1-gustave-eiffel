# Aide-mémoire – Résoudre un incident

*BTS SIO SISR 1re année – S16*

> Un mot ou un sigle inconnu ? Passe la souris dessus, ou ouvre le [glossaire](../../ressources/glossaire.md). Repère <span class="technique">notion technique</span> : à lire sans l'apprendre par cœur.

## Les sept étapes

Signalement → enregistrement → qualification → diagnostic → résolution → validation → clôture.

## Les cinq questions

1. Est-ce que ça a déjà fonctionné ?
2. Qu'est-ce qui a changé récemment ?
3. Est-ce reproductible ?
4. Isolé ou généralisé ?
5. Message d'erreur ? (copie exacte)

## Règles d'or

- Ticket ouvert **avant** d'agir, rempli **en temps réel**.
- Du plus simple au plus complexe (alimentation, câble, réseau, logiciel).
- **Une action à la fois**, résultat noté.
- Plusieurs pannes simultanées : **cause commune en amont**.
- Résolu = vérifié côté **réalité** et côté **outil**, puis confirmé par l'**utilisateur**.

## Solution en quatre éléments

Symptôme constaté · cause · action réalisée · vérification.

## Poste Windows lent (PowerShell)

```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10 Name, CPU, WorkingSet
Get-PSDrive -PSProvider FileSystem
Get-CimInstance Win32_StartupCommand | Select-Object Name, Command, Location
Get-Service | Where-Object { $_.Status -eq "Stopped" -and $_.StartType -eq "Automatic" }
```

Gestionnaire des tâches : Ctrl+Maj+Échap.

## InfraLab : rappels

- **Enregistrer** (Ctrl+S) dans un fichier `.infralab.json` ; **Ouvrir** (Ctrl+O).
- **Recommencer** repart de l'état initial du TP.
- Indices : 2 points chacun ; la solution annule les points d'autonomie.
- Exporter le compte rendu en fin de TP.
