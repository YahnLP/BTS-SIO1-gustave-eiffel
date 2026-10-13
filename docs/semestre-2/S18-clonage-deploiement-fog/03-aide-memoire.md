# Aide-mémoire – Clonage et déploiement

*BTS SIO SISR 1re année – S18*

## Principe

Poste modèle soigné → **capture** → image sur le serveur → **déploiement** sur les postes cibles.

## Démarrage réseau (PXE)

Poste → **DHCP** (adresse + où démarrer) → **TFTP** (chargeur, menu) → système de déploiement.

> Un second serveur DHCP ne s'ajoute **jamais** sur un réseau de production. En TP : réseau interne isolé.

## Installer FOG (page officielle FOG 1.6 ; à comparer avec ta version)

```bash
apt-get -y install git
cd /root
git clone https://github.com/FOGProject/fogproject.git
cd fogproject
git fetch --all
git checkout working-1.6
cd /root/fogproject/bin
./installfog.sh
```

Pendant l'installation : ouvrir l'interface web pour créer ou mettre à jour la base, **puis** valider dans le terminal.
Réponses de l'installeur conservées dans un fichier de réglages ; journaux dans le dossier `bin` du dépôt.

## Parcours

| Étape | Où |
|---|---|
| Enregistrer le modèle (enregistrement rapide) | Menu de démarrage |
| Créer l'image | Interface web |
| Associer l'image à l'hôte | Fiche de l'hôte |
| Tâche de capture, puis démarrer le poste | Fiche de l'hôte |
| Déployer : enregistrement complet, image, déploiement immédiat | Menu puis poste cible |

## Après le clone

| À personnaliser | Pourquoi |
|---|---|
| Nom d'hôte | Pas de doublon |
| Identifiants du système (sysprep sous Windows) | Gestion et licences |
| Clés SSH du serveur (Linux) | Identité cryptographique unique |
| Comptes et mots de passe | Pas de secret du modèle sur tous les postes |

## Risques

Image obsolète · données personnelles dans le modèle · serveur de déploiement compromis · licences · **écrasement du disque cible**.
