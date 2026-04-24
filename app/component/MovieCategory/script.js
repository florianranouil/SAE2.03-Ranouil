import { Movie } from "../Movie/script.js";

var templateFile = await fetch(new URL("./template.html", import.meta.url));
var template = await templateFile.text();

var MovieCategory = {};

MovieCategory.format = function (categoryName, films, detailHandler = "C.handlerDetail") {
  var html = template;
  html = html.replace("{{categoryName}}", categoryName);
  html = html.replace("{{movieCards}}", Movie.format(films, detailHandler));
  return html;
};

export { MovieCategory };
