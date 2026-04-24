var DataMovie = {};

DataMovie.add = function (movieData) {
  var formData = new FormData();
  for (var key in movieData) {
    formData.append(key, movieData[key]);
  }
  return fetch("../server/script.php?todo=addmovie", {
    method: 'POST',
    body: formData
  }).then(function(response) {
    return response.json();
  });
};

export { DataMovie };