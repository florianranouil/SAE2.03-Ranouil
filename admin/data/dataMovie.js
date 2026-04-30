// URL de base (on garde la même logique que ton premier fichier)
let HOST_URL = ".."; 

let DataMovie = {};

// On utilise "async" pour pouvoir utiliser "await" à l'intérieur
DataMovie.add = async function (movieData) {
    // On prépare les données du formulaire
    let formData = new FormData();
    for (let key in movieData) {
        formData.append(key, movieData[key]);
    }

    // On envoie la requête avec "await"
    // On utilise HOST_URL pour construire l'adresse
    let answer = await fetch(HOST_URL + "/server/script.php?todo=addmovie", {
        method: 'POST',
        body: formData
    });

    // On attend la réponse et on la convertit en JSON
    let data = await answer.json();

    // On retourne le résultat
    return data;
};

export { DataMovie };

