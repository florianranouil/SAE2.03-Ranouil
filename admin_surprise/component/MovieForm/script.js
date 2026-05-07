let templateFile = await fetch('./component/MovieForm/template.html');
let template = await templateFile.text();

let MovieForm = {};

MovieForm.format = function (handler) {
  let html = template;
  html = html.replace("{{handler}}", handler);
  return html;
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



