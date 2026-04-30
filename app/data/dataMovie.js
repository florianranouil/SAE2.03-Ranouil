let HOST_URL = "https://ranouil-sae203.mmi-limoges.fr";

var DataMovie = {};

DataMovie.requestMovies = function () {
  return fetch("../server/script.php?todo=readmovies").then(function(response) {
    return response.json();
  });
};

DataMovie.requestMovieDetails = function (id) {
  return fetch(`../server/script.php?todo=readmoviedetail&id=${id}`).then(function(response) {
    return response.json();
  });
};

export { DataMovie };
