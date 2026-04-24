import { MovieCategory } from "../MovieCategory/script.js";

var Section1 = {};

Section1.render = function (categories, detailHandler = "C.handlerDetail") {
  if (!Array.isArray(categories)) {
    return "";
  }

  return categories
    .map(function (category) {
      return MovieCategory.format(category.category, category.movies, detailHandler);
    })
    .join("");
};

export { Section1 };