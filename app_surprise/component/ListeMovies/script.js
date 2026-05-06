let templateFile = await fetch('./component/ListeMovies/template.html');
let template = await templateFile.text();

let templateFileLi = await fetch('./component/ListeMovies/templateLi.html');
let templateLi = await templateFileLi.text();

let ListeMovies = {};

ListeMovies.format = function (film, handler) {
    let html = templateLi;
    html = html.replaceAll('{{nomFilm}}', film.title);
    html = html.replaceAll('{{imageFilm}}', film.image);
    html = html.replaceAll('{{anneeFilm}}', film.date);
    html = html.replaceAll('{{handler}}', `${handler}(${film.id})`);
    return html;
};

ListeMovies.formatMany = function (categories, handler) {
    let html = template;

    let liste = "";
    for (const category of categories) {
        liste += `<h2>${category.category}</h2>`; // <-- CORRECTION ICI
        for (const film of category.movies) {
            liste += ListeMovies.format(film, handler);
        }
    }

    html = html.replace('{{listeItems}}', liste);
    return html;
};

export { ListeMovies };
