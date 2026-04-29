// let templateFile = await fetch('./component/ListeMovies/template.html');
// let template = await templateFile.text();

// let templateFileLi = await fetch('./component/ListeMovies/templateLi.html');
// let templateLi = await templateFileLi.text();


// let ListeMovies = {};

// ListeMovies.format = function(film){
//     let html= templateLi;
//     html = html.replace('{{nomFilm}}', film.name);
//     html = html.replace("{{imageFilm}}", film.image);
//     html = html.replace("{{handler}}", "V.renderMovieDetail("+film.id+");");
//     return html;
// }

// ListeMovies.formatMany = function(data){
//     let html = template;

//     let liste = "";
//     for (const film of data) {
//         liste += ListeMovies.format(film);
//     }

//     html = html.replace("{{listeItems}}", liste);
//     return html;
// }

// export {ListeMovies};

let templateFile = await fetch('./component/ListeMovies/template.html');
let template = await templateFile.text();

let templateFileLi = await fetch('./component/ListeMovies/templateLi.html');
let templateLi = await templateFileLi.text();

let ListeMovies = {};

ListeMovies.format = function (film, handler) {
    let html = templateLi;
    html = html.replace('{{nomFilm}}', film.name);
    // html = html.replace('{{imageFilm}}', film.image);
    html = html.replace('{{imageFilm}}', `images/${film.image}`);
    html = html.replace('{{anneeFilm}}', film.year);
    html = html.replace('{{handler}}', `${handler}(${film.id})`);
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
