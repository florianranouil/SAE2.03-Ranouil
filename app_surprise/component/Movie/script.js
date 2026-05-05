let templateFile = await fetch(new URL("./template.html", import.meta.url));
let template = await templateFile.text();

let Movie = {};

Movie.format = function (films, detailHandler = "C.handlerDetail") {
  if (!Array.isArray(films)) {
    films = [films];
  }

  var html = "";
  for (var i = 0; i < films.length; i++) {
    let film = films[i];
    let film__image = film.image ? `../server/images/${film.image}` : "";
    let filmHtml = template;
    filmHtml = filmHtml.replaceAll("{{film__detailHandler}}", `${detailHandler}(${film.id || ""})`);
    filmHtml = filmHtml.replaceAll("{{film__date}}", film.date || "");
    filmHtml = filmHtml.replaceAll("{{film__type}}", film.type || "");
    filmHtml = filmHtml.replaceAll("{{film__title}}", film.title || "");
    filmHtml = filmHtml.replaceAll("{{film__image}}", film__image);
    filmHtml = filmHtml.replaceAll("{{film__id}}", film.id || "");
    html += filmHtml;
  }

  return html;
};
console.log(Movie);

export { Movie };