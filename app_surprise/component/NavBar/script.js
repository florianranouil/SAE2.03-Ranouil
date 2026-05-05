var templateFile = await fetch("./component/NavBar/template.html");
var template = await templateFile.text();

var NavBar = {};

NavBar.format = function (
  hAbout = "C.handlerAbout()",
  hHome = "C.handlerHome()",
  hProfil = "C.handlerProfil()"
) {
  var html = template;
  html = html.replaceAll("{{hHome}}", hHome);
  html = html.replaceAll("{{hProfil}}", hProfil);
  return html;
};

export { NavBar };

