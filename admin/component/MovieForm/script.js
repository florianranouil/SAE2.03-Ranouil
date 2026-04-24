let MovieForm = {};

MovieForm.format = function () {
  return `
    <form id="movieForm">
      <h2>Ajouter un film</h2>
      <label for="name">Titre du film:</label>
      <input type="text" id="name" name="name" required><br><br>

      <label for="director">Réalisateur:</label>
      <input type="text" id="director" name="director" required><br><br>

      <label for="year">Année de sortie:</label>
      <input type="number" id="year" name="year" min="1900" max="2030" required><br><br>

      <label for="length">Durée en minutes:</label>
      <input type="number" id="length" name="length" min="1" required><br><br>

      <label for="description">Description:</label>
      <textarea id="description" name="description" required></textarea><br><br>

      <label for="id_category">Catégorie:</label>
      <select id="id_category" name="id_category" required>
        <option value="">Sélectionnez une catégorie</option>
      </select><br><br>

      <label for="image">Nom du fichier image:</label>
      <input type="text" id="image" name="image" required><br><br>

      <label for="trailer">URL du trailer:</label>
      <input type="url" id="trailer" name="trailer" required><br><br>

      <label for="min_age">Restrictions d'âge:</label>
      <input type="number" id="min_age" name="min_age" min="0" required><br><br>

      <button type="submit">Ajouter le film</button>
    </form>
  `;
};

MovieForm.loadCategories = async function () {
  try {
    const response = await fetch("../server/script.php?todo=getcategories");
    const categories = await response.json();
    const select = document.getElementById("id_category");
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des catégories:", error);
  }
};

export { MovieForm };

