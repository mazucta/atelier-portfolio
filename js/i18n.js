// ============================================================
//  i18n + переключатель языков (бургер с анимацией)
//  Языки: de, en, et, ru. Флаги — инлайновые SVG.
// ============================================================

// --- Флаги стран (компактные SVG) ---
var FLAGS = {
  de: '<svg viewBox="0 0 60 39" preserveAspectRatio="none"><rect width="60" height="13" y="0" fill="#000"/><rect width="60" height="13" y="13" fill="#DD0000"/><rect width="60" height="13" y="26" fill="#FFCE00"/></svg>',
  en: '<svg viewBox="0 0 60 40" preserveAspectRatio="none"><rect width="60" height="40" fill="#012169"/><path d="M0,0 60,40 M60,0 0,40" stroke="#fff" stroke-width="8"/><path d="M0,0 60,40 M60,0 0,40" stroke="#C8102E" stroke-width="4"/><rect x="25" width="10" height="40" fill="#fff"/><rect y="15" width="60" height="10" fill="#fff"/><rect x="27" width="6" height="40" fill="#C8102E"/><rect y="17" width="60" height="6" fill="#C8102E"/></svg>',
  et: '<svg viewBox="0 0 60 39" preserveAspectRatio="none"><rect width="60" height="13" y="0" fill="#0072CE"/><rect width="60" height="13" y="13" fill="#000"/><rect width="60" height="13" y="26" fill="#fff"/></svg>',
  ru: '<svg viewBox="0 0 60 39" preserveAspectRatio="none"><rect width="60" height="13" y="0" fill="#fff"/><rect width="60" height="13" y="13" fill="#0039A6"/><rect width="60" height="13" y="26" fill="#D52B1E"/></svg>'
};

var LANGS = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
  { code: "et", name: "Eesti" },
  { code: "ru", name: "Русский" }
];

// --- Словарь переводов ---
var I18N = {
  ru: {
    "doc.title": "ATELIER — портфолио студии",
    "meta.edition": "Веб-студия · Издание №01",
    "nav.works": "Работы",
    "nav.approach": "Подход",
    "nav.contact": "Контакт",
    "hero.kicker": "Портфолио · 2026",
    "hero.title": '<span class="reveal-line"><span>Сайты,</span></span><span class="reveal-line indent"><span>которые <em>работают</em></span></span><span class="reveal-line"><span>за вас.</span></span>',
    "hero.sub": "Делаем сайты клиентов максимально красивыми и полезными — чтобы сайт брал на себя всю монотонную работу за мастеров, а у них оставалось время на главное.",
    "btn.viewWork": "Смотреть работы",
    "btn.discuss": "Обсудить проект",
    "works.title": 'Избранные<br><em>работы</em>',
    "works.kicker": "Индекс проектов",
    "manifesto.kicker": "Подход",
    "manifesto.quote": 'Сайт должен <em>продавать и помогать</em> каждый день — а не быть просто красивой витриной.',
    "stat1.label": "проектов сдано — от идеи до запуска",
    "stat2.label": "сайт берёт запись, ответы и заявки на себя",
    "stat3.label": "внимания к деталям дизайна и пользе",
    "contact.kicker": "Свяжитесь",
    "contact.big": "Начнём проект",
    "footer.made": "Сделано с вниманием к деталям",
    "footer.edition": "Издание №01 · Бумага & чернила",
    "proj.back": "← Все работы",
    "proj.caseMeta": "Кейс · проект",
    "proj.kicker": "Кейс",
    "proj.desc": "Подробное описание: задача заказчика, что было сделано и какой получился результат.",
    "proj.cta": "Хочу такой же проект",
    "proj.home": "На главную",
    "proj1.title": '<span class="reveal-line"><span>Проект</span></span><span class="reveal-line indent"><span><em>№01</em></span></span>',
    "proj2.title": '<span class="reveal-line"><span>Проект</span></span><span class="reveal-line indent"><span><em>№02</em></span></span>'
  },
  en: {
    "doc.title": "ATELIER — studio portfolio",
    "meta.edition": "Web studio · Issue №01",
    "nav.works": "Work",
    "nav.approach": "Approach",
    "nav.contact": "Contact",
    "hero.kicker": "Portfolio · 2026",
    "hero.title": '<span class="reveal-line"><span>Sites that</span></span><span class="reveal-line indent"><span><em>work</em> for</span></span><span class="reveal-line"><span>you.</span></span>',
    "hero.sub": "We make our clients' websites as beautiful as they are useful — so the site takes over the routine work for the masters, leaving them time for what truly matters.",
    "btn.viewWork": "View work",
    "btn.discuss": "Discuss a project",
    "works.title": 'Selected<br><em>work</em>',
    "works.kicker": "Project index",
    "manifesto.kicker": "Approach",
    "manifesto.quote": 'A website should <em>sell and help</em> every day — not just be a pretty showcase.',
    "stat1.label": "projects delivered — from idea to launch",
    "stat2.label": "the site handles bookings, replies and leads",
    "stat3.label": "attention to design detail and real usefulness",
    "contact.kicker": "Get in touch",
    "contact.big": "Start a project",
    "footer.made": "Made with attention to detail",
    "footer.edition": "Issue №01 · Paper & ink",
    "proj.back": "← All work",
    "proj.caseMeta": "Case · project",
    "proj.kicker": "Case study",
    "proj.desc": "Detailed description: the client's task, what was done and the result achieved.",
    "proj.cta": "I want a project like this",
    "proj.home": "Home",
    "proj1.title": '<span class="reveal-line"><span>Project</span></span><span class="reveal-line indent"><span><em>№01</em></span></span>',
    "proj2.title": '<span class="reveal-line"><span>Project</span></span><span class="reveal-line indent"><span><em>№02</em></span></span>'
  },
  de: {
    "doc.title": "ATELIER — Studio-Portfolio",
    "meta.edition": "Webstudio · Ausgabe №01",
    "nav.works": "Arbeiten",
    "nav.approach": "Ansatz",
    "nav.contact": "Kontakt",
    "hero.kicker": "Portfolio · 2026",
    "hero.title": '<span class="reveal-line"><span>Websites,</span></span><span class="reveal-line indent"><span>die <em>arbeiten</em></span></span><span class="reveal-line"><span>für Sie.</span></span>',
    "hero.sub": "Wir gestalten die Websites unserer Kunden so schön wie nützlich — damit die Seite den Meistern die Routinearbeit abnimmt und ihnen Zeit für das Wesentliche bleibt.",
    "btn.viewWork": "Arbeiten ansehen",
    "btn.discuss": "Projekt besprechen",
    "works.title": 'Ausgewählte<br><em>Arbeiten</em>',
    "works.kicker": "Projektindex",
    "manifesto.kicker": "Ansatz",
    "manifesto.quote": 'Eine Website soll jeden Tag <em>verkaufen und helfen</em> — nicht nur ein schönes Schaufenster sein.',
    "stat1.label": "Projekte umgesetzt — von der Idee bis zum Launch",
    "stat2.label": "die Seite übernimmt Termine, Antworten und Anfragen",
    "stat3.label": "Aufmerksamkeit für Designdetails und Nutzen",
    "contact.kicker": "Kontakt aufnehmen",
    "contact.big": "Projekt starten",
    "footer.made": "Mit Liebe zum Detail gemacht",
    "footer.edition": "Ausgabe №01 · Papier & Tinte",
    "proj.back": "← Alle Arbeiten",
    "proj.caseMeta": "Fall · Projekt",
    "proj.kicker": "Fallstudie",
    "proj.desc": "Ausführliche Beschreibung: die Aufgabe des Kunden, was umgesetzt wurde und welches Ergebnis entstand.",
    "proj.cta": "Ich möchte so ein Projekt",
    "proj.home": "Zur Startseite",
    "proj1.title": '<span class="reveal-line"><span>Projekt</span></span><span class="reveal-line indent"><span><em>№01</em></span></span>',
    "proj2.title": '<span class="reveal-line"><span>Projekt</span></span><span class="reveal-line indent"><span><em>№02</em></span></span>'
  },
  et: {
    "doc.title": "ATELIER — stuudio portfoolio",
    "meta.edition": "Veebistuudio · Number №01",
    "nav.works": "Tööd",
    "nav.approach": "Lähenemine",
    "nav.contact": "Kontakt",
    "hero.kicker": "Portfoolio · 2026",
    "hero.title": '<span class="reveal-line"><span>Veebilehed,</span></span><span class="reveal-line indent"><span>mis <em>töötavad</em></span></span><span class="reveal-line"><span>teie eest.</span></span>',
    "hero.sub": "Teeme klientide veebilehed sama ilusaks kui kasulikuks — et leht võtaks meistrite eest üle rutiinse töö ja jätaks neile aega olulise jaoks.",
    "btn.viewWork": "Vaata töid",
    "btn.discuss": "Aruta projekti",
    "works.title": 'Valitud<br><em>tööd</em>',
    "works.kicker": "Projektide indeks",
    "manifesto.kicker": "Lähenemine",
    "manifesto.quote": 'Veebileht peab iga päev <em>müüma ja aitama</em> — mitte olema lihtsalt ilus vaateaken.',
    "stat1.label": "projekti valminud — ideest käivituseni",
    "stat2.label": "leht võtab broneeringud, vastused ja päringud enda peale",
    "stat3.label": "tähelepanu disaini detailidele ja kasule",
    "contact.kicker": "Võta ühendust",
    "contact.big": "Alustame projekti",
    "footer.made": "Tehtud tähelepanuga detailidele",
    "footer.edition": "Number №01 · Paber & tint",
    "proj.back": "← Kõik tööd",
    "proj.caseMeta": "Juhtum · projekt",
    "proj.kicker": "Juhtumiuuring",
    "proj.desc": "Üksikasjalik kirjeldus: kliendi ülesanne, mida tehti ja milline tulemus saavutati.",
    "proj.cta": "Soovin samasugust projekti",
    "proj.home": "Avalehele",
    "proj1.title": '<span class="reveal-line"><span>Projekt</span></span><span class="reveal-line indent"><span><em>№01</em></span></span>',
    "proj2.title": '<span class="reveal-line"><span>Projekt</span></span><span class="reveal-line indent"><span><em>№02</em></span></span>'
  }
};

function t(lang, key) {
  var v = I18N[lang] && I18N[lang][key];
  if (v == null) v = (I18N.ru && I18N.ru[key]) || "";
  return v;
}

function applyLang(lang) {
  if (!I18N[lang]) lang = "ru";
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var v = t(lang, el.getAttribute("data-i18n"));
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
    var v = t(lang, el.getAttribute("data-i18n-html"));
    if (v) el.innerHTML = v;
  });

  var dt = t(lang, "doc.title");
  if (dt) document.title = dt;

  var cur = document.getElementById("lang-current");
  if (cur) cur.innerHTML = FLAGS[lang] + "<span>" + lang.toUpperCase() + "</span>";

  document.querySelectorAll("#lang-menu button[data-lang]").forEach(function (b) {
    b.setAttribute("aria-current", b.getAttribute("data-lang") === lang ? "true" : "false");
  });

  if (typeof window.renderWorks === "function") window.renderWorks(lang);

  window.currentLang = lang;
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

function buildLangMenu() {
  var menu = document.getElementById("lang-menu");
  if (!menu) return;
  menu.innerHTML = LANGS.map(function (l) {
    return '<li><button type="button" data-lang="' + l.code + '">' +
             '<span class="flag">' + FLAGS[l.code] + "</span>" +
             "<span>" + l.name + "</span>" +
           "</button></li>";
  }).join("");
}

function initLang() {
  buildLangMenu();

  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  // По умолчанию — английский; сохранённый выбор пользователя имеет приоритет.
  var initial = saved || "en";

  applyLang(initial);

  var langEl = document.getElementById("lang");
  var toggle = document.getElementById("lang-toggle");
  var menu = document.getElementById("lang-menu");
  if (!langEl || !toggle) return;

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = langEl.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  if (menu) {
    menu.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-lang]");
      if (!b) return;
      applyLang(b.getAttribute("data-lang"));
      langEl.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  document.addEventListener("click", function (e) {
    if (!langEl.contains(e.target)) {
      langEl.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      langEl.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (document.readyState !== "loading") initLang();
else document.addEventListener("DOMContentLoaded", initLang);
