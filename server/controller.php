<?php

/** ARCHITECTURE PHP SERVEUR  : Rôle du fichier controller.php
 * 
 *  Dans ce fichier, on va définir les fonctions de contrôle qui vont traiter les requêtes HTTP.
 *  Les requêtes HTTP sont interprétées selon la valeur du paramètre 'todo' de la requête (voir script.php)
 *  Pour chaque valeur différente, on déclarera une fonction de contrôle différente.
 * 
 *  Les fonctions de contrôle vont éventuellement lire les paramètres additionnels de la requête, 
 *  les vérifier, puis appeler les fonctions du modèle (model.php) pour effectuer les opérations
 *  nécessaires sur la base de données.
 *  
 *  Si la fonction échoue à traiter la requête, elle retourne false (mauvais paramètres, erreur de connexion à la BDD, etc.)
 *  Sinon elle retourne le résultat de l'opération (des données ou un message) à includre dans la réponse HTTP.
 */

/** Inclusion du fichier model.php
 *  Pour pouvoir utiliser les fonctions qui y sont déclarées et qui permettent
 *  de faire des opérations sur les données stockées en base de données.
 */
require("model.php");


function readMoviesController(){
    $movies = getAllMovies();

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
    // Validation des champs obligatoires
    $required = ['name', 'year', 'length', 'description', 'director', 'id_category', 'image', 'trailer', 'min_age'];
    foreach ($required as $field) {
        if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
            return ['error' => "Champ obligatoire manquant: $field"];
        }
    }

    // Validation spécifique
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

    // Vérifier si la catégorie existe
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

    // Ajouter le film
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
    $categories = getCategories();
    return $categories;
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
    // Validation des champs obligatoires
    if (!isset($_POST['name']) || empty(trim($_POST['name']))) {
        return ['error' => 'Le nom du profil est obligatoire'];
    }
    if (!isset($_POST['age_restriction']) || $_POST['age_restriction'] === '') {
        return ['error' => 'La restriction d\'âge est obligatoire'];
    }
    if (!isset($_FILES['avatar']) || $_FILES['avatar']['error'] === UPLOAD_ERR_NO_FILE) {
        return ['error' => 'L\'avatar est obligatoire'];
    }

    // Validation de l'avatar
    if ($_FILES['avatar']['error'] !== UPLOAD_ERR_OK) {
        return ['error' => 'Erreur lors du téléchargement de l\'avatar'];
    }

    // Vérifier le type de fichier
    $allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($_FILES['avatar']['type'], $allowed_types)) {
        return ['error' => 'Format d\'image non supporté'];
    }

    // Vérifier la taille (max 5MB)
    if ($_FILES['avatar']['size'] > 5 * 1024 * 1024) {
        return ['error' => 'L\'image est trop voluminense (max 5MB)'];
    }

    // Validation de la restriction d'âge
    $valid_ages = ['0', '12', '16', '18'];
    if (!in_array($_POST['age_restriction'], $valid_ages)) {
        return ['error' => 'Restriction d\'âge invalide'];
    }

    // Créer le répertoire de destination s'il n'existe pas
    $upload_dir = 'profiles_avatars/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    // Générer un nom unique pour le fichier
    $file_extension = pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
    $avatar_filename = 'profile_' . time() . '_' . uniqid() . '.' . $file_extension;
    $avatar_path = $upload_dir . $avatar_filename;

    // Déplacer le fichier téléchargé
    if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $avatar_path)) {
        return ['error' => 'Erreur lors de la sauvegarde de l\'avatar'];
    }

    // Ajouter le profil à la base de données
    $result = addProfile(
        trim($_POST['name']),
        $avatar_filename,
        (int)$_POST['age_restriction']
    );

    if ($result) {
        return ['success' => 'Le profil a été ajouté avec succès.'];
    } else {
        // Supprimer le fichier en cas d'erreur d'ajout en BDD
        unlink($avatar_path);
        return ['error' => 'Erreur lors de l\'ajout du profil.'];
    }
}
