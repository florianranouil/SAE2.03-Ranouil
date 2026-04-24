var templateFile = await fetch(new URL("./template.html", import.meta.url));
var template = await templateFile.text();

var NavBar = {};

NavBar.format = function (hAbout = "C.handlerAbout()", hHome = "C.handlerHome()") {
  var html = template;
  html = html.replaceAll("{{hAbout}}", hAbout);
  html = html.replaceAll("{{hHome}}", hHome);
  return html;
};

export { NavBar };
