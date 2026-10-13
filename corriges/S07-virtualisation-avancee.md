# Corrigé (enseignant) – S07 Virtualisation avancée

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

## Partie A

Voir « Éléments de réponse » du TP et le cours (sections 1, 2 et 4).

## Parties B à D

Voir « Éléments de réponse » du TP. Vérifier sur les captures : snapshot nommé clairement, VM restaurée à l'état initial, installation des Guest Additions terminée, redémarrages effectués.

## Partie E : résultats attendus (à contrôler sur le poste avant de corriger)

Déduits du cours ; **non vérifiés** sur un poste de la salle.

| Mode | Entre VM | Vers l'hôte | Vers Internet | Remarque |
|---|---|---|---|---|
| Accès par pont | oui | oui | oui | adresses fournies par le DHCP du lycée (ou statiques) ; `ping` Windows souvent bloqué par le pare-feu |
| NAT | non | non (à vérifier) | oui | chaque VM a `10.0.2.15` par défaut |
| Réseau NAT | oui | non | oui | nécessite un réseau NAT créé dans VirtualBox |
| Réseau interne `LAN` | oui | non | non | adresses manuelles `192.168.100.1` et `.2` |
| Réseau interne `LAN` / `LAN2` | non | non | non | deux réseaux distincts : le nom est l'étiquette du réseau |

Commandes de la partie E4 côté Kali : `ip addr add` ajoute l'adresse à l'interface ; `ip link set ... up` active l'interface. Cette configuration est **temporaire** : elle disparaît au redémarrage, car elle n'est pas enregistrée dans la configuration réseau du système.

## Parties F à I

F, G : captures de tests. H : réponses à rédiger avec l'aide de VirtualBox ; les points non traités dans le cours (couleurs de la mémoire, cœurs et threads, systèmes de fichiers, OS Live) sont à compléter par l'enseignant. I : rédaction libre ; attendu : type 1, plusieurs VM (annuaire et DNS, fichiers, impression, préproduction), limites (un seul serveur physique reste un point de défaillance, coût de la licence et du matériel, snapshots non substituables aux sauvegardes).

## Points à vérifier avant diffusion

- Résultats réels de chaque mode (surtout NAT vers hôte) avec la version de VirtualBox installée.
- Procédure d'installation des Guest Additions sous Kali (outils de compilation, en-têtes du noyau).
- Création du réseau NAT (emplacement dans l'interface).
