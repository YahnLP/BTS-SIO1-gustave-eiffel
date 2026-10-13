# Aide-mémoire – Services et SLA

*BTS SIO SISR 1re année – S17*

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

## InfraLab

Temps simulé : « +15 min », « +1 h », « +1 jour ». Calendrier : page **Paramètres** de la vue ITSM. Enregistrer : Ctrl+S.
