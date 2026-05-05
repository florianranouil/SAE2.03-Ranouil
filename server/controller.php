<?php

require("model.php");

function readMoviesController($age){
    // On récupère les films filtrés par âge
    $movies = getAllMovies($age);

    // Regroupement par catégories (inchangé)
    $groups = [];
    foreach ($movies as $movie) {
        $categoryName = $movie->type ?: 'Sans catégorie';
        if (!isset($groups[$categoryName])) {
            $groups[$categoryName] = [];
        }
        $groups[$categoryName][] = $movie;
    }

    ksort($groups);

    $result = [];
    foreach ($groups as $category => $moviesInCategory) {
        $result[] = [
            'category' => $category,
            'movies' => $moviesInCategory
        ];
    }

    return $result;
}

function addMovieController(){
    $required = ['name', 'year', 'length', 'description', 'director', 'id_category', 'image', 'trailer', 'min_age'];
    foreach ($required as $field) {
        if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
            return ['error' => "Champ obligatoire manquant: $field"];
        }
    }

    if (!is_numeric($_POST['year']) || $_POST['year'] < 1900 || $_POST['year'] > date('Y') + 1) {
        return ['error' => 'Année invalide'];
    }
    if (!is_numeric($_POST['length']) || $_POST['length'] <= 0) {
        return ['error' => 'Durée invalide'];
    }
    if (!is_numeric($_POST['min_age']) || $_POST['min_age'] < 0) {
        return ['error' => 'Restriction d\'âge invalide'];
    }
    if (!is_numeric($_POST['id_category'])) {
        return ['error' => 'Catégorie invalide'];
    }

    $categories = getCategories();
    $validCategory = false;
    foreach ($categories as $cat) {
        if ($cat->id == $_POST['id_category']) {
            $validCategory = true;
            break;
        }
    }
    if (!$validCategory) {
        return ['error' => 'Catégorie inexistante'];
    }

    $result = addMovie(
        trim($_POST['name']),
        (int)$_POST['year'],
        (int)$_POST['length'],
        trim($_POST['description']),
        trim($_POST['director']),
        (int)$_POST['id_category'],
        trim($_POST['image']),
        trim($_POST['trailer']),
        (int)$_POST['min_age']
    );

    if ($result) {
        return ['success' => 'Le film a été ajouté avec succès.'];
    } else {
        return ['error' => 'Erreur lors de l\'ajout du film.'];
    }
}

function getCategoriesController(){
    return getCategories();
}

function readMovieDetailController(){
    if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
        return ['error' => 'ID de film invalide'];
    }
    $id = (int)$_GET['id'];
    $movie = getMovieById($id);
    if (!$movie) {
        return ['error' => 'Film non trouvé'];
    }
    return $movie;
}

function addProfileController(){
    if (!isset($_POST['name']) || empty(trim($_POST['name']))) {
        return ['error' => 'Le nom du profil est obligatoire'];
    }
    if (!isset($_POST['age_restriction']) || $_POST['age_restriction'] === '') {
        return ['error' => 'La restriction d\'âge est obligatoire'];
    }

    $valid_ages = ['0', '12', '16', '18'];
    if (!in_array($_POST['age_restriction'], $valid_ages)) {
        return ['error' => 'Restriction d\'âge invalide'];
    }

    $result = addProfile(
        trim($_POST['name']),
        $_POST['avatar'],
        (int)$_POST['age_restriction']
    );

    if ($result) {
        return ['success' => 'Le profil a été ajouté avec succès.'];
    } else {
        return ['error' => 'Erreur lors de l\'ajout du profil.'];
    }
}

function readProfilsController(){
    return getAllProfils();
}

# --------------------------------------------------------------------
# ⭐⭐⭐ ITÉRATION 8 : MODIFIER UN PROFIL ⭐⭐⭐
# --------------------------------------------------------------------
function updateProfileController(){

    // Vérification des champs obligatoires
    if (!isset($_POST['id']) || !is_numeric($_POST['id'])) {
        return ['error' => 'ID de profil invalide'];
    }

    if (!isset($_POST['name']) || empty(trim($_POST['name']))) {
        return ['error' => 'Le nom est obligatoire'];
    }

    if (!isset($_POST['age_restriction']) || $_POST['age_restriction'] === '') {
        return ['error' => 'La restriction d\'âge est obligatoire'];
    }

    $valid_ages = ['0', '12', '16', '18'];
    if (!in_array($_POST['age_restriction'], $valid_ages)) {
        return ['error' => 'Restriction d\'âge invalide'];
    }

    // Avatar facultatif
    $avatar = isset($_POST['avatar']) ? trim($_POST['avatar']) : "";

    // Appel au modèle
    $result = updateProfile(
        (int)$_POST['id'],
        trim($_POST['name']),
        $avatar,
        (int)$_POST['age_restriction']
    );

    if ($result) {
        return ['success' => 'Le profil a été modifié avec succès.'];
    } else {
        return ['error' => 'Erreur lors de la modification du profil.'];
    }
}

?>
