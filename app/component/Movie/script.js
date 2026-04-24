var templateFile = await fetch(new URL("./template.html", import.meta.url));
var template = await templateFile.text();

var Movie = {};

Movie.format = function (films) {
  if (!Array.isArray(films)) {
    films = [films];
  }

  var html = "";
  for (var i = 0; i < films.length; i++) {
    var film = films[i];
    var film__image = film.image ? `../server/images/${film.image}` : "";
    var filmHtml = template;
    filmHtml = filmHtml.replaceAll("{{film__date}}", film.date || "");
    filmHtml = filmHtml.replaceAll("{{film__type}}", film.type || "");
    filmHtml = filmHtml.replaceAll("{{film__title}}", film.title || "");
    filmHtml = filmHtml.replaceAll("{{film__image}}", film__image);
    filmHtml = filmHtml.replaceAll("{{film__id}}", film.id || "");
    html += filmHtml;
  }

  return html;
};

export { Movie };