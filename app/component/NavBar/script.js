var templateFile = await fetch(new URL("./template.html", import.meta.url));
var template = await templateFile.text();

var NavBar = {};

NavBar.format = function (hAbout, hHome) {
  var html = template;
  html = html.replace("{{hAbout}}", hAbout);
  html = html.replace("{{hHome}}", hHome);
  return html;
};

export { NavBar };
