let DataMovie = {};

DataMovie.add = async function (movieData) {
  const formData = new FormData();
  for (const key in movieData) {
    formData.append(key, movieData[key]);
  }
  const response = await fetch("../server/script.php?todo=addmovie", {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  return data;
};

export { DataMovie };