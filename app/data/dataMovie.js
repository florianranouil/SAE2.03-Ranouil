let DataMovie = {};

DataMovie.requestMovies = async function () {
  const response = await fetch("../server/script.php?todo=readmovies");
  const data = await response.json();
  return data;
};

DataMovie.requestMovieDetails = async function (id) {
  const response = await fetch(`../server/script.php?todo=readmoviedetail&id=${id}`);
  const data = await response.json();
  return data;
};

export { DataMovie };
