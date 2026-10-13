#!/usr/bin/env python3
"""Génère docs/ressources/glossaire.md et includes/abbr.md depuis glossaire_data.py.
Usage : python3 scripts/gen_glossaire.py (depuis la racine du dépôt)"""
import re, pathlib, sys, unicodedata
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from glossaire_data import DATA
root = pathlib.Path(__file__).resolve().parent.parent
def key(t): return unicodedata.normalize("NFD", t.lower()).encode("ascii","ignore").decode()
rows = sorted(DATA, key=lambda r: key(r[0]))
out = ["# Glossaire", "",
"Tous les mots techniques du cours, expliqués simplement. Dans les pages du site, **passe la souris sur un sigle** (BIOS, DHCP, RAID…) : sa définition s'affiche.", "",
"> [!NOTE]",
"> Un terme suivi de la mention **notion technique** dépasse le socle de première année : tu peux le laisser de côté. Les notions de réseau seront vues plus en détail **en cours de réseau** ; voir la fiche [minimum réseau](minimum-reseau.md).", "",
"La colonne « Vu en » indique la séance où le mot apparaît pour la première fois dans le cours.", "",
"| Terme | Sigle | Anglais | Définition | Vu en |", "|---|---|---|---|---|"]
for t, s, e, d, v in rows:
    out.append(f"| **{t}** | {s or ''} | {('*'+e+'*') if e else ''} | {d} | {v} |")
(root/"docs/ressources/glossaire.md").write_text("\n".join(out)+"\n", encoding="utf-8")
ab = []
for t, s, e, d, v in rows:
    if s and re.fullmatch(r"[A-Za-z0-9/ ]+", s) and not s.islower() and s!="root":
        ab.append(f"*[{s}]: {t} : {d}".replace("\n"," "))
(root/"includes").mkdir(exist_ok=True)
(root/"includes/abbr.md").write_text("\n".join(ab)+"\n", encoding="utf-8")
print(len(rows), "termes,", len(ab), "abbr")
