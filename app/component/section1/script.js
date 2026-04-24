import { NavBar } from "../NavBar/script.js";
import { DataMovie } from "../../data/dataMovie.js";
import { Movie } from "../Movie/script.js";

let section1 = {};

section1.render = function (films) {
  let html = `<h2 class="h2">grid</h2>`;
  html += `<div class="grid">`;
  html += Movie.format(films);
  html += `</div>`;
  return html;
};

window.C = {};
window.V = {};

C.handlerAbout = function () {
  alert(
    "Ceci est une base de projet pour la SAE2.03 édition 2025. Bonne chance !"
  );
};

C.loadMovies = async function () {
  try {
    const movies = await DataMovie.requestMovies();
    V.renderSection1(movies);
  } catch (error) {
    console.error("Erreur lors du chargement des films:", error);
  }
};

V.renderNavBar = function (hAbout) {
  let header = document.querySelector("#header");
  header.innerHTML = NavBar.format(hAbout);
};

V.renderSection1 = function (movies) {
  let content = document.querySelector("#content");
  content.innerHTML = section1.render(movies);
};

C.start = function () {
  V.renderNavBar("C.handlerAbout()");
  C.loadMovies();
};

C.start();

export { section1 };
