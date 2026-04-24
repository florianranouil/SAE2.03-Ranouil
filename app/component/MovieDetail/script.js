let MovieDetail = {};

MovieDetail.format = function (movie) {
  let html = `
    <div class="movie-detail">
      <h1>${movie.title}</h1>
      <img src="../server/images/${movie.image}" alt="${movie.title}" class="movie-poster">
      <p><strong>Description:</strong> ${movie.description}</p>
      <p><strong>Réalisateur:</strong> ${movie.director}</p>
      <p><strong>Année:</strong> ${movie.date}</p>
      <p><strong>Catégorie:</strong> ${movie.type}</p>
      <p><strong>Durée:</strong> ${movie.length} minutes</p>
      <p><strong>Restrictions d'âge:</strong> ${movie.min_age} ans</p>
      <div class="trailer">
        <h2>Trailer</h2>
        <iframe width="560" height="315" src="${movie.trailer}" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `;
  return html;
};

export { MovieDetail };