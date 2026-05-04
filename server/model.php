<?php
/**
 * Fonctions d'accès à la base de données
 * pour l'application SAE2.03
 */

/* ------------------------------
   CONFIGURATION BASE DE DONNÉES
   ------------------------------ */

define("HOST", "localhost");
define("DBNAME", "SAE203");
define("DBLOGIN", "usersae203");
define("DBPWD", "nairolf13HARDEN!");


/* ------------------------------
   FILMS (PAS DE CHEMIN DYNAMIQUE)
   ------------------------------ */

function getAllMovies(){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

    $sql = "SELECT m.id, m.name AS title, m.year AS date, 
                   c.name AS type, m.image
            FROM Movie m 
            LEFT JOIN Category c ON m.id_category = c.id";

    $stmt = $cnx->prepare($sql);
    $stmt->execute();

    // ❌ NE PAS TOUCHER AUX CHEMINS DES FILMS
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}

function addMovie($name, $year, $length, $description, $director, $id_category, $image, $trailer, $min_age){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

        $sql = "INSERT INTO Movie (name, year, length, description, director, id_category, image, trailer, min_age)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $cnx->prepare($sql);
        $stmt->execute([$name, $year, $length, $description, $director, $id_category, $image, $trailer, $min_age]);

        return true;
    } catch (Exception $e) {
        return false;
    }
}

function getCategories(){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

    $sql = "SELECT id, name FROM Category";

    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}

function getMovieById($id){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

    $sql = "SELECT m.id, m.name AS title, m.year AS date, m.length, m.description,
                   m.director, c.name AS type, m.image, m.trailer, m.min_age
            FROM Movie m
            LEFT JOIN Category c ON m.id_category = c.id
            WHERE m.id = ?";

    $stmt = $cnx->prepare($sql);
    $stmt->execute([$id]);

    // ❌ NE PAS TOUCHER AUX CHEMINS DES FILMS
    return $stmt->fetch(PDO::FETCH_OBJ);
}


/* ------------------------------
   PROFILS (CHEMIN DYNAMIQUE)
   ------------------------------ */

function addProfile($name, $avatar, $age_restriction){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

        $sql = "INSERT INTO Profile (name, avatar, age_restriction)
                VALUES (?, ?, ?)";

        $stmt = $cnx->prepare($sql);
        $stmt->execute([$name, $avatar, $age_restriction]);

        return true;
    } catch (Exception $e) {
        return false;
    }
}

function getAllProfils(){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

        $sql = "SELECT id, name, avatar, age_restriction FROM Profile";
        $stmt = $cnx->prepare($sql);
        $stmt->execute();

        $profils = $stmt->fetchAll(PDO::FETCH_OBJ);

        // ✔ CHEMIN DYNAMIQUE UNIQUEMENT POUR LES PROFILS
        foreach ($profils as $p) {
            $p->avatar = "/server/images/" . $p->avatar;
        }

        return $profils;

    } catch (Exception $e) {
        return false;
    }
}

function getprofilID($id){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

        $sql = "SELECT id, name, avatar, age_restriction
                FROM Profile
                WHERE id = ?";

        $stmt = $cnx->prepare($sql);
        $stmt->execute([$id]);

        $profil = $stmt->fetch(PDO::FETCH_OBJ);

        if ($profil) {
            // ✔ CHEMIN DYNAMIQUE UNIQUEMENT POUR LES PROFILS
            $profil->avatar = "/server/images/" . $profil->avatar;
        }

        return $profil;

    } catch (Exception $e) {
        return false;
    }
}

?>
