let HOST_URL = "https://ranouil-sae203.mmi-limoges.fr";

var DataMovie = {};

DataMovie.requestMovies = function (age) {
  return fetch(`${HOST_URL}/server/script.php?todo=readmovies&age=${age}`)
    .then(r => r.json());
};

DataMovie.requestMovieDetails = function (id) {
  return fetch(`${HOST_URL}/server/script.php?todo=readmoviedetail&id=${id}`)
    .then(r => r.json());
};

export { DataMovie };
