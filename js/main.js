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
}

// Доступно для i18n.js (перерисовка при смене языка)
window.renderWorks = renderWorks;

// Первичный рендер (i18n.js затем перерисует под выбранный язык)
renderWorks("ru");
