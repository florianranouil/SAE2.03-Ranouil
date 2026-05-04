var templateFile = await fetch(new URL("./template.html", import.meta.url));
var template = await templateFile.text();

var NavBar = {};

NavBar.format = function (
  hAbout = "C.handlerAbout()",
  hHome = "C.handlerHome()",
  hProfil = "C.handlerProfil()"
) {
  var html = template;
  html = html.replaceAll("{{hAbout}}", hAbout);
  html = html.replaceAll("{{hHome}}", hHome);
  html = html.replaceAll("{{hProfil}}", hProfil); // ✅ AJOUT ESSENTIEL
  return html;
};

export { NavBar };
