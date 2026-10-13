# Aide-mémoire – Paquets et scripts Bash

*BTS SIO SISR 1re année – S10*

## Paquets Debian (`apt`)

| Je veux… | Commande |
|---|---|
| rafraîchir la liste des paquets | `sudo apt update` |
| mettre à jour les paquets installés | `sudo apt upgrade` (simulation : `apt -s upgrade`) |
| chercher · décrire | `apt search mot` · `apt show paquet` |
| installer | `sudo apt install paquet` |
| supprimer · supprimer avec la configuration | `sudo apt remove paquet` · `sudo apt purge paquet` |
| nettoyer les dépendances inutiles | `sudo apt autoremove` |
| mises à jour en attente | `apt list --upgradable` |
| fichiers d'un paquet | `dpkg -L paquet` |
| dans un script | `sudo apt-get install -y paquet` |

> [!IMPORTANT]
> `update` rafraîchit la **liste** ; `upgrade` **installe** les mises à jour. Toujours `update` d'abord.

## Script Bash : le squelette

```bash
#!/bin/bash
# Description du script

VARIABLE="valeur"

if [ -d "$VARIABLE" ]; then
    echo "existe"
else
    echo "n'existe pas"
fi

for e in "un" "deux mots"; do
    echo "$e"
done
```

## Syntaxe

| Élément | Syntaxe |
|---|---|
| shebang (1re ligne) | `#!/bin/bash` |
| commentaire | `# texte` |
| variable · usage | `NOM="x"` (pas d'espace autour du `=`) · `"$NOM"` |
| argument · nombre | `$1`, `$2` · `$#` |
| valeur par défaut | `"${1:-defaut}"` |
| liste · parcours | `L=("a b" "c")` · `for e in "${L[@]}"; do … done` |
| condition | `if [ test ]; then … elif … else … fi` |
| code de retour · arrêt | `$?` · `exit 1` |
| message d'erreur | `echo "erreur" >&2` |

## Tests

| Test | Vrai si… |
|---|---|
| `[ -d "$x" ]` · `[ -f "$x" ]` · `[ -e "$x" ]` | dossier · fichier · existe |
| `[ ! -d "$x" ]` | n'est pas un dossier |
| `[ "$a" = "$b" ]` | textes égaux |
| `[ "$n" -eq 3 ]` | nombre égal (`-ne`, `-gt`, `-lt`) |

Les **espaces dans les crochets** sont obligatoires.

## Lancer et déboguer

| Commande | Effet |
|---|---|
| `chmod +x s.sh` · `./s.sh` | rendre exécutable · lancer |
| `bash s.sh` | lancer sans le droit `x` |
| `bash -n s.sh` | vérifier la syntaxe |
| `bash -x s.sh` | afficher chaque commande exécutée |

## Script « relançable »

| Technique | Exemple |
|---|---|
| tester avant d'agir | `if [ ! -d "$d" ]; then mkdir "$d"; fi` |
| option sans erreur | `mkdir -p "$d"` |
| signaler ce qui est fait | « créé » / « déjà présent » |
| guillemets autour des variables | `mkdir -p "$d"` (jamais `mkdir -p $d`) |
