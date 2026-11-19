/* Pastilles d'autonomie et boutons « Ouvrir » dans les tableaux de progression */
function decorate() {
  document.querySelectorAll(".md-typeset table td").forEach(function (td) {
    var t = td.textContent.trim();
    if (t === "🟢 Guidé") td.innerHTML = '<span class="pill pill-g">Guidé</span>';
    else if (t === "🟡 Semi-guidé") td.innerHTML = '<span class="pill pill-y">Semi-guidé</span>';
    else if (t === "🔴 Autonome") td.innerHTML = '<span class="pill pill-r">Autonome</span>';
    else if (t === "🚧 en préparation") td.innerHTML = '<span class="soon">🚧 en préparation</span>';
    else { var a = td.querySelector("a"); if (a && a.textContent.indexOf("Ouvrir") >= 0 && td.children.length === 1) { a.className = "btn-open"; a.textContent = "Ouvrir →"; } }
  });
}
if (window.document$) document$.subscribe(decorate); else document.addEventListener("DOMContentLoaded", decorate);

/* Mode « projection » : texte agrandi, panneaux latéraux masqués. Bouton à côté du thème clair/foncé.
   Retour arrière : cliquer à nouveau (le choix est mémorisé dans le navigateur). */
(function () {
  var KEY = "projection-mode", root = document.documentElement;
  function get() { try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; } }
  function set(v) { try { localStorage.setItem(KEY, v ? "1" : "0"); } catch (e) { } }
  function apply(on, btn) {
    root.classList.toggle("projection", on);
    if (btn) { btn.setAttribute("aria-pressed", on ? "true" : "false"); btn.title = on ? "Quitter le mode projection" : "Mode projection (texte agrandi)"; }
  }
  function mount() {
    if (document.getElementById("projection-btn")) return;
    var pal = document.querySelector('[data-md-component="palette"]');
    var btn = document.createElement("button");
    btn.id = "projection-btn"; btn.type = "button"; btn.className = "md-header__button md-icon";
    btn.setAttribute("aria-label", "Mode projection");
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M2 4h20v12h-9v2h3v2H8v-2h3v-2H2V4m2 2v8h16V6H4m3 6 2.2-5h1.6L13 12h-1.5l-.4-1H8.9l-.4 1H7m2.3-2.2h1.4L10 8l-.7 1.8m5.2 2.2V7h1.5v5h-1.5Z"/></svg>';
    btn.addEventListener("click", function () { var on = !root.classList.contains("projection"); set(on); apply(on, btn); });
    if (pal && pal.parentNode) pal.parentNode.insertBefore(btn, pal.nextSibling); else { var h = document.querySelector(".md-header__inner"); if (h) h.appendChild(btn); }
    apply(get(), btn);
  }
  apply(get());
  if (window.document$) document$.subscribe(mount); else document.addEventListener("DOMContentLoaded", mount);
})();

/* Flèches pour replier / rouvrir le menu de gauche et la table des matières (choix mémorisé) */
(function () {
  var root = document.documentElement;
  function get(k) { try { return localStorage.getItem(k) === "1"; } catch (e) { return false; } }
  function set(k, v) { try { localStorage.setItem(k, v ? "1" : "0"); } catch (e) { } }
  function refresh() {
    var n = root.classList.contains("hide-nav"), t = root.classList.contains("hide-toc");
    var bn = document.getElementById("toggle-nav"), bt = document.getElementById("toggle-toc");
    if (bn) { bn.textContent = n ? "›" : "‹"; bn.title = n ? "Afficher le menu" : "Masquer le menu"; }
    if (bt) { bt.textContent = t ? "‹" : "›"; bt.title = t ? "Afficher la table des matières" : "Masquer la table des matières"; }
  }
  function make(id, cls, key) {
    if (document.getElementById(id)) return;
    var b = document.createElement("button"); b.id = id; b.type = "button"; b.className = "side-toggle";
    b.addEventListener("click", function () { var on = !root.classList.contains(cls); root.classList.toggle(cls, on); set(key, on); refresh(); });
    document.body.appendChild(b);
  }
  root.classList.toggle("hide-nav", get("hide-nav")); root.classList.toggle("hide-toc", get("hide-toc"));
  function mount() { make("toggle-nav", "hide-nav", "hide-nav"); make("toggle-toc", "hide-toc", "hide-toc"); refresh(); }
  if (window.document$) document$.subscribe(mount); else document.addEventListener("DOMContentLoaded", mount);
})();

/* Le simulateur s'ouvre toujours dans un nouvel onglet : on garde la page du TP sous la main */
(function () {
  function tag() {
    document.querySelectorAll('a[href*="simulateur-reseau.html"]').forEach(function (a) { a.target = "_blank"; a.rel = "noopener"; });
  }
  if (window.document$) document$.subscribe(tag); else document.addEventListener("DOMContentLoaded", tag);
})();


/* Enregistrer la page en PDF : bouton dans l'en-tête → ouvre la fenêtre d'impression (« Enregistrer au format PDF »).
   Mise en page « manuel » (voir extra.css), bloc d'identité, zones de réponse manuscrites, licences en fin de document. */
(function () {
  var AUTHOR = "Yahn LE PRETTRE", ROLE = "Enseignant · Lycée Gustave Eiffel", SITE = "https://yahnlp.github.io/BTS-SIO1-gustave-eiffel/";
  var CLASSES = { "Semestre 1": "BTS SIO SISR · 1re année · Semestre 1", "Semestre 2": "BTS SIO SISR · 1re année · Semestre 2",
                  "Ressources": "BTS SIO SISR · 1re année · Ressources", "Serveurs": "Parcours complémentaire · Serveurs" };
  var KINDS = { "cours": "Cours", "tp": "Travaux pratiques", "aide-mémoire": "Aide-mémoire", "aide-memoire": "Aide-mémoire", "comparatif": "Fiche" };
  /* Outils cités dans les documents (détection par mots-clés) : licence indiquée à titre d'information */
  var TOOLS = [
    { re: /simulateur r[ée]seau/i, name: "Simulateur Réseau (outil du site)", lic: "EUPL 1.2", note: "© Yahn LE PRETTRE – Formaxion Landes · code ouvert" },
    { re: /packet tracer/i, name: "Cisco Packet Tracer", lic: "Logiciel propriétaire Cisco", note: "gratuit via Cisco Networking Academy ; non redistribuable" },
    { re: /virtualbox/i, name: "Oracle VirtualBox", lic: "GPL v3 (Extension Pack : PUEL)", note: "le pack d'extensions est soumis à une licence propriétaire Oracle" },
    { re: /wireshark/i, name: "Wireshark", lic: "GPL v2 ou ultérieure", note: "" },
    { re: /apache2?\b|apache2ctl/i, name: "Apache HTTP Server", lic: "Apache License 2.0", note: "" },
    { re: /nginx/i, name: "Nginx", lic: "BSD 2 clauses", note: "" },
    { re: /mariadb/i, name: "MariaDB", lic: "GPL v2", note: "" },
    { re: /vsftpd/i, name: "vsftpd", lic: "GPL v2", note: "" },
    { re: /filezilla/i, name: "FileZilla", lic: "GPL v2 ou ultérieure", note: "" },
    { re: /openvpn/i, name: "OpenVPN", lic: "GPL v2", note: "" },
    { re: /\bdebian\b/i, name: "Debian GNU/Linux", lic: "Logiciel libre (principalement GPL)", note: "" },
    { re: /ubuntu/i, name: "Ubuntu", lic: "Logiciel libre (principalement GPL)", note: "marque Canonical" },
    { re: /\binfralab\b/i, name: "InfraLab (simulateur ITSM / ITAM)", lic: "EUPL 1.2", note: "© Yahn LE PRETTRE – Formaxion Landes ; le nom et l'identité visuelle ne sont pas cédés par la licence" },
    { re: /\bdockerlab\b|docker lab/i, name: "DockerLab (simulateur Docker)", lic: "EUPL 1.2", note: "© Yahn LE PRETTRE – Formaxion Landes ; le nom et l'identité visuelle ne sont pas cédés par la licence" },
    { re: /\bdocker\b/i, name: "Docker", lic: "Docker Engine : Apache License 2.0 ; Docker Desktop : licence propriétaire Docker", note: "à vérifier auprès de l'éditeur" },
    { re: /\bbash\b/i, name: "GNU Bash", lic: "GPL v3 ou ultérieure", note: "" },
    { re: /ocs inventory|\bocs\b/i, name: "OCS Inventory NG", lic: "GPL v2", note: "à vérifier auprès de l'éditeur" },
    { re: /\bfog\b/i, name: "FOG Project", lic: "GPL v3", note: "à vérifier auprès de l'éditeur" },
    { re: /\bglpi\b/i, name: "GLPI", lic: "GPL v3", note: "" },
    { re: /zabbix/i, name: "Zabbix", lic: "AGPL v3 (depuis la v7.0)", note: "" },
    { re: /uptime kuma/i, name: "Uptime Kuma", lic: "MIT", note: "" },
    { re: /windows/i, name: "Microsoft Windows", lic: "Logiciel propriétaire Microsoft", note: "" }
  ];
  function clean(t) { return (t || "").replace(/[\u{1F000}-\u{1FFFF}\u{2190}-\u{21FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}‍]/gu, "").replace(/\s+/g, " ").trim(); }
  function esc(s) { var x = document.createElement("div"); x.textContent = s; return x.innerHTML; }
  function chain() {
    return Array.prototype.map.call(document.querySelectorAll(".md-nav--primary > .md-nav__list > .md-nav__item--active > label, .md-nav--primary > .md-nav__list > .md-nav__item--active > a, .md-nav--primary .md-nav__item--active > .md-nav__link, .md-nav--primary .md-nav__item--active > label"), function (e) { return clean(e.textContent); });
  }
  function info() {
    var h1 = document.querySelector(".md-content h1"), c = chain(), full = clean(h1 ? h1.textContent : document.title);
    var section = c[0] || "", mod = (c[1] && c[1] !== full) ? c[1] : "";
    var m = full.match(/^(Cours|TP|Aide-mémoire|Aide-memoire|Comparatif)\s*[–—-]\s*(.+)$/i);
    var kind = m ? (KINDS[m[1].toLowerCase()] || m[1]) : "Document", title = m ? m[2] : full;
    return { cls: CLASSES[section] || (section ? "BTS SIO SISR · 1re année · " + section : "BTS SIO SISR · 1re année"), section: section, mod: mod, kind: kind, title: title };
  }
  function build(i) {
    var host = document.querySelector(".md-content__inner"); if (!host) return;
    ["print-cover", "print-colophon"].forEach(function (id) { var o = document.getElementById(id); if (o) o.remove(); });
    var logo = document.querySelector(".md-header__button.md-logo img"), d = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    var el = document.createElement("div"); el.id = "print-cover";
    el.innerHTML = '<div class="pc-top"><span class="pc-left">' + (logo ? '<img src="' + logo.src + '" alt="">' : "") + '<span>' + esc(i.cls) + '</span></span><span class="pc-kind">' + esc(i.kind) + '</span></div>' +
      '<p class="pc-title">' + esc(i.title) + '</p>' + (i.mod ? '<p class="pc-module">Module · ' + esc(i.mod) + '</p>' : "") +
      '<div class="pc-meta"><span><b>' + esc(AUTHOR) + '</b> – ' + esc(ROLE) + '</span><span>' + esc(SITE.replace("https://", "")) + '</span>' +
      '<span>Édité le ' + esc(d) + '</span><span>Licence <b>CC BY-NC-SA 4.0</b></span></div>';
    host.insertBefore(el, host.firstChild);
    /* Licences et crédits */
    var text = host.textContent.replace(/Voir la réponse/g, ""), hasSim = !!host.querySelector('a[href*="simulateur-reseau"]');
    var rows = TOOLS.filter(function (t, k) { return k === 0 ? (hasSim || t.re.test(text)) : t.re.test(text); });
    var col = document.createElement("div"); col.id = "print-colophon";
    col.innerHTML = '<h2>Licences et crédits</h2>' +
      '<p><b>Ce document</b> – © ' + esc(AUTHOR) + ', enseignant au Lycée Gustave Eiffel. Placé sous licence <b>Creative Commons Attribution – Pas d\'utilisation commerciale – Partage dans les mêmes conditions 4.0 (CC BY-NC-SA 4.0)</b> : vous pouvez le partager et l\'adapter à des fins non commerciales, en citant l\'auteur et en conservant la même licence. <small>creativecommons.org/licenses/by-nc-sa/4.0/deed.fr</small></p>' +
      (rows.length ? '<table><thead><tr><th>Outil cité ou utilisé</th><th>Licence</th><th>Remarque</th></tr></thead><tbody>' +
        rows.map(function (t) { return '<tr><td>' + esc(t.name) + '</td><td>' + esc(t.lic) + '</td><td>' + esc(t.note) + '</td></tr>'; }).join("") + '</tbody></table>' : "") +
      '<p><small>Les marques citées (Cisco, Microsoft, Oracle, Docker, etc.) appartiennent à leurs propriétaires respectifs. Les licences des outils tiers sont indiquées à titre d\'information : se reporter aux textes officiels. Détail : ' + esc(SITE.replace("https://", "")) + 'ressources/licences/</small></p>';
    host.appendChild(col);
  }
  /* En-têtes courants (hors première page) : injectés avec les vraies valeurs du document */
  function runningHeader(i) {
    var st = document.createElement("style"); st.id = "print-running";
    function q(s) { return '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'; }
    var t = i.title.length > 80 ? i.title.slice(0, 77) + "…" : i.title;
    st.textContent = '@page { @top-left { content: ' + q(i.cls + (i.mod ? "  ·  " + i.mod.split("·")[0].trim() : "")) + '; font: 7.5pt "Segoe UI", Helvetica, Arial, sans-serif; color: #6b7280; vertical-align: bottom; padding-bottom: 4mm; }' +
      ' @top-right { content: ' + q(t) + '; font: 7.5pt "Segoe UI", Helvetica, Arial, sans-serif; color: #6b7280; vertical-align: bottom; padding-bottom: 4mm; } }' +
      ' @page :first { @top-left { content: none; } @top-right { content: none; } }';
    document.head.appendChild(st); return st;
  }
  /* Zones de réponse : les « Voir la réponse » / « Correction » ne sont PAS imprimés ; ils deviennent des cadres lignés
     où l'élève écrit à la main (corrigé ensuite par l'enseignant). Les aides et commandes restent imprimées. */
  var ANSWER = /^(?:🔑\s*|🔒\s*)?(voir la réponse|voir des réponses|réponse|éléments de réponse|correction|causes cachées)/i;
  var TEACHER = /^(points d.attention|notes? pour l.enseignant|aide\b|aides\b)/i;   /* « Aide (à ouvrir après avoir cherché) » : donne la réponse, donc jamais imprimée */
  function prepareAnswers(undo) {
    document.querySelectorAll(".md-content details").forEach(function (d) {
      var s = d.querySelector(":scope > summary"), t = clean(s ? s.textContent : "");
      if (TEACHER.test(t)) { d.classList.add("print-hide"); undo.push(function () { d.classList.remove("print-hide"); }); return; }
      if (ANSWER.test(t)) {
        var len = (d.textContent || "").length - (s ? s.textContent.length : 0);
        var lines = Math.max(2, Math.min(8, Math.round(len / 85) + 1));
        var z = document.createElement("div"); z.className = "answer-zone"; z.style.setProperty("--lines", lines);
        z.innerHTML = '<span class="az-label">Ma réponse</span>';
        d.classList.add("print-hide"); d.parentNode.insertBefore(z, d.nextSibling);
        undo.push(function () { d.classList.remove("print-hide"); z.remove(); });
      } else if (!d.open) { d.open = true; undo.push(function () { d.open = false; }); }
    });
  }
  /* Cellules vides = cases à remplir ; « ______ » (que Markdown transforme en <strong><em>_</em></strong>) = trait à compléter */
  function prepareBlanks(undo) {
    var host = document.querySelector(".md-content__inner");
    host.querySelectorAll(".md-typeset table td").forEach(function (td) {
      if (!td.textContent.trim() && !td.querySelector("img,input,svg")) { td.classList.add("ans-cell"); undo.push(function () { td.classList.remove("ans-cell"); }); }
    });
    host.querySelectorAll(".md-typeset table").forEach(function (tb) {
      if (!tb.querySelector("td.ans-cell")) return;
      tb.querySelectorAll("thead th").forEach(function (th) {
        if (/réponse|obtenu|résultat|constat|observation|à remplir|ta réponse|ma réponse|diagnostic|cause|correction/i.test(th.textContent) && tb.querySelectorAll("thead th").length <= 3) {
          var old = th.style.width; th.style.width = "55%"; undo.push(function () { th.style.width = old; });
        }
      });
    });
    /* Traits « ______ » (que Markdown transforme parfois en <strong><em>_</em></strong>) : supprimés à l'impression ;
       la question reçoit à la place un cadre « Ma réponse » (sauf si un cadre suit déjà, ou dans un tableau). */
    /* Lignes d'identité courtes (« Binôme : ____ / ____ ») : on garde de vrais traits à compléter */
    host.querySelectorAll(".md-typeset > p, .md-content__inner > p").forEach(function (pp) {
      if (pp.closest("details, table, li")) return;
      var raw = pp.textContent;
      if (!/^\s*(binôme|nom|prénom|date|classe|groupe|élève|équipe)\b[^_]{0,30}:/i.test(raw) || !/_/.test(raw)) return;
      var oldHtml = pp.innerHTML, label = raw.match(/^\s*([^:_]{1,40}:)/)[1];
      var rest = raw.slice(raw.indexOf(label) + label.length).replace(/_+/g, "\u0000").replace(/\u0000(\s*\u0000)+/g, "\u0000");
      var html = '<strong>' + esc(label) + '</strong> ' + esc(rest).replace(/\u0000/g, '<span class="blank" style="--n:14"></span>');
      pp.innerHTML = html;
      undo.push(function () { pp.innerHTML = oldHtml; });
    });
    var blocks = [], seen = [];
    function mark(node) {
      if (node.closest && node.closest("details.print-hide")) return;
      var td = node.closest ? node.closest("td, th") : null;
      if (td) { if (!td.textContent.replace(/_/g, "").trim()) { /* cellule vide : case à remplir */ } return; }
      var blk = node.closest("li, p"); if (!blk) return;
      if (blk.tagName === "P" && blk.parentNode && blk.parentNode.tagName === "LI" && blk.parentNode.querySelectorAll(":scope > p").length === 1) blk = blk.parentNode;
      if (seen.indexOf(blk) < 0) { seen.push(blk); blocks.push({ el: blk, n: 0 }); }
      blocks[seen.indexOf(blk)].n += 1;
    }
    host.querySelectorAll("strong").forEach(function (st) {
      if (!st.parentNode || st.dataset.pfDone) return;
      if (st.textContent.trim() !== "_") return;
      var group = [st], nx = st.nextSibling;
      while (nx && nx.nodeType === 1 && nx.tagName === "STRONG" && nx.textContent.trim() === "_") { group.push(nx); nx = nx.nextSibling; }
      group.forEach(function (g) { g.dataset.pfDone = "1"; });
      if (st.closest("details.print-hide")) return;
      mark(st);
      var hid = group.map(function (g) { g.style.display = "none"; return g; });
      var tail = (nx && nx.nodeType === 3 && /^\s*_+\s*$/.test(nx.nodeValue)) ? nx : null, tailOld = tail ? tail.nodeValue : "";
      if (tail) tail.nodeValue = "";
      undo.push(function () { hid.forEach(function (g) { g.style.display = ""; delete g.dataset.pfDone; }); if (tail) tail.nodeValue = tailOld; });
    });
    var walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
      if (!/_{3,}/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
      for (var p = n.parentNode; p && p.nodeType === 1; p = p.parentNode) { if (/^(CODE|PRE|SCRIPT|STYLE)$/.test(p.tagName) || p.id === "print-cover" || p.id === "print-colophon") return NodeFilter.FILTER_REJECT; }
      return NodeFilter.FILTER_ACCEPT; } });
    var nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      var old = n.nodeValue; if (n.parentNode.closest && n.parentNode.closest("details.print-hide")) return; mark(n.parentNode);
      n.nodeValue = old.replace(/\s*_{3,}\s*/g, " ");
      undo.push(function () { n.nodeValue = old; });
    });
    /* Restes de traits mal analysés par Markdown (« _ » isolés, <em>_</em>) dans les blocs concernés */
    blocks.forEach(function (b) {
      b.el.querySelectorAll("em, strong").forEach(function (e) {
        if (/^\s*_+\s*$/.test(e.textContent) && e.style.display !== "none" && !e.closest("code,pre")) { e.style.display = "none"; undo.push(function () { e.style.display = ""; }); }
      });
      var w = document.createTreeWalker(b.el, NodeFilter.SHOW_TEXT), tn, list = [];
      while ((tn = w.nextNode())) { if (/(^|\s)_+(?=\s|$|[·,.;:\/)])/.test(tn.nodeValue) && !tn.parentNode.closest("code,pre")) list.push(tn); }
      list.forEach(function (tn) { var o = tn.nodeValue; tn.nodeValue = o.replace(/(^|\s)_+(?=\s|$|[·,.;:\/)])/g, "$1"); undo.push(function () { tn.nodeValue = o; }); });
    });
    blocks.forEach(function (b) {
      var nx = b.el.nextElementSibling;
      if (nx && (nx.classList.contains("answer-zone") || (nx.classList.contains("print-hide") && nx.nextElementSibling && nx.nextElementSibling.classList.contains("answer-zone")))) return;
      var z = document.createElement("div"); z.className = "answer-zone"; z.style.setProperty("--lines", b.n > 1 ? 3 : 2);
      z.innerHTML = '<span class="az-label">Ma réponse</span>';
      if (b.el.tagName === "LI") b.el.appendChild(z); else b.el.parentNode.insertBefore(z, b.el.nextSibling);
      undo.push(function () { z.remove(); });
    });
  }
  /* Titres sans pictogrammes (aspect « manuel ») */
  function prepareHeadings(undo) {
    var sel = ".md-typeset h2, .md-typeset h3, .md-typeset h4, .md-typeset .admonition-title, .md-typeset summary";
    document.querySelectorAll(sel).forEach(function (h) {
      var w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT), n, list = [];
      while ((n = w.nextNode())) list.push(n);
      list.forEach(function (t) {
        var old = t.nodeValue, nv = old.replace(/[\u{1F000}-\u{1FFFF}\u{2190}-\u{21FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}‍]/gu, "").replace(/^\s+/, "");
        if (nv !== old) { t.nodeValue = nv; undo.push(function () { t.nodeValue = old; }); }
      });
    });
  }
  function printPdf() {
    var i = info(), oldTitle = document.title, oldScheme = document.body.getAttribute("data-md-color-scheme"), undo = [];
    build(i); var rh = runningHeader(i); prepareAnswers(undo); prepareBlanks(undo); prepareHeadings(undo);
    document.body.setAttribute("data-md-color-scheme", "default");     // toujours imprimer en clair
    document.title = [i.section, i.mod && i.mod.split("·")[0].trim(), i.kind, i.title].filter(Boolean).join(" - ").replace(/[\/:*?"<>|]/g, "");
    function restore() {
      document.title = oldTitle;
      if (oldScheme) document.body.setAttribute("data-md-color-scheme", oldScheme);
      undo.reverse().forEach(function (f) { try { f(); } catch (e) { } });
      ["print-cover", "print-colophon"].forEach(function (id) { var c = document.getElementById(id); if (c) c.remove(); });
      if (rh.parentNode) rh.remove();
      window.removeEventListener("afterprint", restore);
    }
    window.addEventListener("afterprint", restore);
    setTimeout(function () { window.print(); }, 50);
  }
  function mount() {
    if (!document.querySelector(".md-content h1") || document.getElementById("pdf-btn")) return;
    var btn = document.createElement("button");
    btn.id = "pdf-btn"; btn.type = "button"; btn.className = "md-header__button md-icon";
    btn.title = "Enregistrer cette page en PDF"; btn.setAttribute("aria-label", "Enregistrer cette page en PDF");
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m4 18H6V4h7v5h5v11m-6-1-4-4h2.5v-3h3v3H16l-4 4Z"/></svg>';
    btn.addEventListener("click", printPdf);
    var ref = document.getElementById("projection-btn") || document.querySelector('[data-md-component="palette"]');
    if (ref && ref.parentNode) ref.parentNode.insertBefore(btn, ref.nextSibling); else { var h = document.querySelector(".md-header__inner"); if (h) h.appendChild(btn); }
  }
  if (window.document$) document$.subscribe(mount); else document.addEventListener("DOMContentLoaded", mount);
})();
