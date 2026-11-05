# Aide-mémoire – Services et SLA

*BTS SIO SISR 1re année – S17*

> Un mot ou un sigle inconnu ? Passe la souris dessus, ou ouvre le [glossaire](../../ressources/glossaire.md). Repère <span class="technique">notion technique</span> : à lire sans l'apprendre par cœur.

## Accords

| Accord | Entre |
|---|---|
| SLA | DSI et clients |
| OLA | Équipes internes de la DSI |
| Contrat de sous-traitance | DSI et fournisseur externe |

## Indisponibilité tolérée (mois de 30 jours = 43 200 min)

| Disponibilité | Par mois |
|---|---|
| 99 % | 432 min (7 h 12) |
| 99,5 % | 216 min (3 h 36) |
| 99,9 % | 43,2 min |

Formule : (1 − disponibilité) × durée de la période.

## Délais d'exemple (S15)

| Priorité | Prise en charge | Résolution |
|---|---|---|
| P1 | 15 min | 4 h |
| P2 | 1 h | 8 h |
| P3 | 4 h | 24 h |
| P4 | 1 jour ouvré | 5 jours |

## Piloter un SLA

Qualifier vite · prendre en charge · suspendre **à bon escient** · résoudre avant l'échéance.
Calendrier = **ce qui est promis** (continu ou heures ouvrées).

## Incident majeur

Cause d'abord · coordinateur · rétablir · communiquer sur un ticket principal (prochaine information datée) · revue après incident.

## Fiche de service

Nom · description · bénéficiaires · demande · prérequis · plage · disponibilité · délais · exclusions · éléments de configuration · équipe · indicateur.

## Identité numérique de l'organisation

Domaine (échéance) · certificat (expiration) · comptes officiels (comptes nominatifs, double authentification) · messagerie : **SPF** (serveurs autorisés), **DKIM** (signature), **DMARC** (que faire si échec, rapports).

```text
jackcelair.example        TXT "v=spf1 ip4:203.0.113.10 include:_spf.messagerie.example -all"
_dmarc.jackcelair.example TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@jackcelair.example"
```

`-all` refuser · `~all` suspect · `p=none` observer · `quarantine` spam · `reject` refuser. Vérifier : `nslookup -type=TXT domaine` ou `dig TXT _dmarc.domaine`. Déploiement : inventaire, SPF, DKIM, DMARC `none`, lire les rapports, `quarantine`, `reject`.

Usurpation : **ne pas répondre**, conserver les preuves (en-têtes, captures datées), prévenir la direction (elle décide de la plainte), signaler : **Signal Spam** (courriel), **33700** (SMS), **Pharos** (site), **17Cyber** (diagnostic, tchat police/gendarmerie), **Afnic** (faux `.fr`), plateforme (faux profil).

## InfraLab

Temps simulé : « +15 min », « +1 h », « +1 jour ». Calendrier : page **Paramètres** de la vue ITSM. Enregistrer : Ctrl+S.
