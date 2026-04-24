import { Movie } from "../Movie/script.js";

let templateFile = await fetch(new URL("./template.html", import.meta.url));
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function (categoryName, films) {
  let html = template;
  html = html.replace("{{categoryName}}", categoryName);
  html = html.replace("{{movieCards}}", Movie.format(films));
  return html;
};

export { MovieCategory };
