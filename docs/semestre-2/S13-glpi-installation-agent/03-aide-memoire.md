# Aide-mémoire – GLPI et agent d'inventaire

*BTS SIO SISR 1re année – S13*

## Pile à installer (Debian)

| Besoin | Commande |
|---|---|
| Mettre à jour | `sudo apt update` puis `sudo apt upgrade -y` |
| Installer Apache et MariaDB | `sudo apt install -y apache2 mariadb-server` |
| Installer PHP (liste à compléter avec l'assistant GLPI) | `sudo apt install -y php php-mysql php-curl php-gd php-intl php-xml php-mbstring php-zip php-bz2` |
| Sécuriser MariaDB | `sudo mysql_secure_installation` |
| Ouvrir la console de la base | `sudo mysql` |

## Base de données

```sql
CREATE DATABASE glpi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'glpi'@'localhost' IDENTIFIED BY 'mot-de-passe-fictif';
GRANT ALL PRIVILEGES ON glpi.* TO 'glpi'@'localhost';
FLUSH PRIVILEGES;
```

## Apache

| Besoin | Commande |
|---|---|
| Activer la réécriture | `sudo a2enmod rewrite` |
| Désactiver le site par défaut · activer GLPI | `sudo a2dissite 000-default.conf` · `sudo a2ensite glpi.conf` |
| Vérifier la configuration | `sudo apache2ctl configtest` |
| Redémarrer | `sudo systemctl restart apache2` |
| Journal d'erreurs | `sudo tail -n 20 /var/log/apache2/error.log` |

## Fichiers de GLPI

| Besoin | Commande |
|---|---|
| Extraire l'archive | `sudo tar -xzf glpi-VERSION.tgz -C /var/www/html/` |
| Donner les droits à Apache | `sudo chown -R www-data:www-data /var/www/html/glpi` |

## Agent Windows (documentation officielle de l'agent)

| Besoin | Exemple |
|---|---|
| Installation silencieuse | `msiexec /i GLPI-Agent-VERSION-x64.msi /quiet SERVER=http://IP_SERVEUR/ TAG=TP RUNNOW=1` |
| Plusieurs serveurs | `SERVER=http://IP1/,http://IP2/` |
| Dossier d'installation | `C:\Program Files\GLPI-Agent` |
| Journal de l'agent | `C:\Program Files\GLPI-Agent\logs\glpi-agent.log` |

À lancer dans l'**Invite de commandes** (pas dans PowerShell, d'après la documentation de l'installeur).

## Variante OCS (agent Windows, d'après le TP d'origine)

`"C:\Program Files\OCS Inventory Agent\OCSInventory.exe" /np /server:IP_SERVEUR /debug /logfile:C:\Temp\ocs.log`

## Diagnostic d'un poste absent

réseau → URL de l'agent → inventaire activé → pare-feu → journal de l'agent → journaux du serveur
