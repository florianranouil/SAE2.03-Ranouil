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

  // ✅ LOGO
  html = html.replaceAll("{{logo}}", "/server/images/logo1.png");

  return html;
};

/* 🔥 AJOUT : gestion du scroll */
NavBar.initScrollEffect = function () {
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return; // sécurité

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
};

export { NavBar };