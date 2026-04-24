var templateFile = await fetch(new URL("./template.html", import.meta.url));
var template = await templateFile.text();

var MovieDetail = {};

MovieDetail.format = function (movie) {
  if (!movie || typeof movie !== "object") {
    return "<div class='movie-detail'>Film introuvable.</div>";
  }

  var html = template;
  html = html.replaceAll("{{title}}", movie.title || "");
  html = html.replaceAll("{{image}}", movie.image || "");
  html = html.replaceAll("{{description}}", movie.description || "");
  html = html.replaceAll("{{director}}", movie.director || "");
  html = html.replaceAll("{{date}}", movie.date || "");
  html = html.replaceAll("{{type}}", movie.type || "");
  html = html.replaceAll("{{length}}", movie.length || "");
  html = html.replaceAll("{{min_age}}", movie.min_age || "");
  html = html.replaceAll("{{trailer}}", movie.trailer || "");

  return html;
};

export { MovieDetail };