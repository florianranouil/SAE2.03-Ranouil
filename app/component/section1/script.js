// On crée l'objet qui affiche la grille de films
export const section1 = {
  render: (films) => `<div class="grid">${Movie.format(films)}</div>`
};

// C = Contrôleur (Les actions)
window.C = {
  handlerAbout: () => alert("Ceci est une base de projet pour la SAE2.03 édition 2025. Bonne chance !"),

  loadMovies: () => {
    DataMovie.requestMovies()
      .then(movies => V.renderSection1(movies))
      .catch(err => console.error("Erreur :", err));
  },

  start: () => {
    V.renderNavBar("C.handlerAbout()");
    C.loadMovies();
  }
};

// V = Vue (L'affichage dans le HTML)
window.V = {
  renderNavBar: (hAbout) => {
    document.querySelector("#header").innerHTML = NavBar.format(hAbout);
  },

  renderSection1: (movies) => {
    document.querySelector("#content").innerHTML = section1.render(movies);
  }
};

// On lance le tout
C.start();