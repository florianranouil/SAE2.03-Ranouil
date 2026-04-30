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


    // Validation de la restriction d'âge
    $valid_ages = ['0', '12', '16', '18'];
    if (!in_array($_POST['age_restriction'], $valid_ages)) {
        return ['error' => 'Restriction d\'âge invalide'];
    }




    // Ajouter le profil à la base de données
    $result = addProfile(
        trim($_POST['name']),
        $_POST['avatar'], // L'upload de l'avatar est géré côté client, on suppose que le chemin de l'avatar est envoyé dans ce champ
        (int)$_POST['age_restriction']
    );

    if ($result) {
        return ['success' => 'Le profil a été ajouté avec succès.'];
    } else {
        return ['error' => 'Erreur lors de l\'ajout du profil.'];
    }
}



















