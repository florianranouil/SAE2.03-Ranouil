let HOST_URL = "https://ranouil-sae203.mmi-limoges.fr";

var DataMovie = {};

// ⭐⭐ MODIFICATION POUR L’ITÉRATION 7 ⭐⭐
// La fonction prend maintenant un paramètre age
DataMovie.requestMovies = function (age) {
  return fetch(`../server/script.php?todo=readmovies&age=${age}`)
    .then(function(response) {
      return response.json();
    });
};

DataMovie.requestMovieDetails = function (id) {
  return fetch(`../server/script.php?todo=readmoviedetail&id=${id}`)
    .then(function(response) {
      return response.json();
    });
};

export { DataMovie };
