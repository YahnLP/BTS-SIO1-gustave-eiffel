# Outils et simulateurs

| Outil | Usage dans la formation | Accès |
|---|---|---|
| **InfraLab** | Gestion de parc, inventaire, tickets, incidents, changements, CMDB, SLA (ITSM et ITAM). Version 1.2 : 48 TP d'après le dépôt (la page d'accueil en annonce 46), enregistrement en fichier `.infralab.json`. | [yahnlp.github.io/InfraLab](https://yahnlp.github.io/InfraLab/) |
| **DockerLab** | Simulateur Docker : terminal, vue navigateur, ressources. | [yahnlp.github.io/DockerLab](https://yahnlp.github.io/DockerLab/) |
| **Simulateur réseau** | Câblage, adressage, commandes sur équipements, hors ligne. | [Ouvrir](../simulateur/simulateur-reseau.html) · [mode d'emploi](simulateur.md) |
| **VirtualBox** | Machines virtuelles Debian et Windows. | Installé sur les postes de la salle |

Les simulateurs ne se connectent à aucun vrai réseau ni à aucun vrai outil.

> [!NOTE]
> **Limites d'InfraLab** (d'après sa page) : pas de supervision, pas d'Active Directory ni de GPO, pas de déploiement de logiciels, pas de haute disponibilité. **DockerLab** (d'après le README de son dépôt) : commandes `docker run/ps/stop/start/logs/exec/inspect…`, volumes, réseaux, Docker Compose et Dockerfile simulés, 18 TP intégrés avec vérification automatique, 13 images ; limites : aucun vrai programme n'est exécuté, `psql` n'est pas simulé. Licence : EUPL 1.2, d'après l'auteur (voir la page des licences).
