// ===== Основная логика страницы =====

document.getElementById("year").textContent = new Date().getFullYear();

// Локализованное значение поля проекта
function pick(field, lang) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.ru || "";
}

// Рендер проектов в стиле журнального индекса (с учётом языка)
function renderWorks(lang) {
  lang = lang || window.currentLang || "ru";
  const list = document.getElementById("works-list");
  if (!list || typeof projects === "undefined") return;

  list.innerHTML = projects.map(function (p, i) {
    const num = String(i + 1).padStart(2, "0");
    const title = pick(p.title, lang);
    const desc = pick(p.description, lang);
    const tagsArr = (p.tags && (p.tags[lang] || p.tags.ru)) || [];
    const tags = tagsArr.map(function (t) { return "<li>" + t + "</li>"; }).join("");

    return (
      '<a class="work" href="' + p.link + '">' +
        '<span class="work__no">' + num + "</span>" +
        '<div class="work__main">' +
          '<h3 class="work__title">' + title + "</h3>" +
          '<p class="work__desc">' + desc + "</p>" +
          '<ul class="work__tags">' + tags + "</ul>" +
        "</div>" +
        '<div class="work__thumb"><img src="' + p.image + '" alt="' + title + '"></div>' +
      "</a>"
    );
  }).join("");

  // Появление строк при скролле
  const rows = list.querySelectorAll(".work");
  if (!("IntersectionObserver" in window)) {
    rows.forEach(function (r) { r.classList.add("in"); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (e.target.dataset.delay || "0") + "ms";
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  rows.forEach(function (r, i) {
    r.dataset.delay = (i % 3) * 90;
    io.observe(r);
  });
}

// Доступно для i18n.js (перерисовка при смене языка)
window.renderWorks = renderWorks;

// Первичный рендер (i18n.js затем перерисует под выбранный язык)
renderWorks("ru");
