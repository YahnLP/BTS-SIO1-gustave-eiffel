# Corrigé (enseignant) – S06 Virtualisation : premières machines virtuelles

*Document réservé à l'enseignant : hors du dossier `docs/`, il n'est pas publié sur le site (mais il est visible dans le dépôt GitHub).*

**Attention aux pièges.**

## Partie A (activité de découverte)

Voir « Éléments de réponse » du TP et le cours, sections 1 à 5.

## Parties B à D

Voir « Éléments de réponse » du TP. Points à vérifier sur les captures :

- nom `CS1 - W10 - NOM`, 2 048 Mo, 2 cœurs, disque dynamique de 50 Gio au format VMDK, réseau en accès par pont ;
- ISO ajoutée sur un lecteur optique du contrôleur SATA ;
- installation avancée, deuxième partition de 20 Go, compte hors ligne, nom `sisr` ;
- aucune capture ne doit afficher un mot de passe.

## Partie E

Résultat dépendant du poste. Une conclusion attendue : la VM n'a aucune ressource propre, tout est prélevé sur l'hôte (mémoire surtout, processeur et disque au démarrage).

## Partie F

VM Ubuntu LTS reprenant les mêmes contraintes. Attendu : type Linux, version Ubuntu (64 bits), nom `CS1 - Ubuntu - NOM`. Le temps gagné vient de la démarche déjà connue.

## Points à vérifier avant diffusion

- Version de Windows retenue (10 ou 11) et disponibilité de l'outil de création de média.
- Interprétation du « deuxième disque système de 20 Go » comme deuxième partition.
- Mot de passe du compte de la VM : à fournir oralement ou sur papier.
