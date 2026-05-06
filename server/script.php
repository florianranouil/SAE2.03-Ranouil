<?php
// Activer le rapport d'erreurs PHP
error_reporting(E_ALL);

// Forcer l'affichage des erreurs à l'écran
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);


require("controller.php");


if ( isset($_REQUEST['todo']) ){

  header('Content-Type: application/json');

  $todo = $_REQUEST['todo'];

  switch($todo){

    case 'readmovies':

      $age = isset($_GET["age"]) ? intval($_GET["age"]) : 0;
      $data = readMoviesController($age);
      break;

    case 'addmovie':
      $data = addMovieController();
      break;

    case 'getcategories':
      $data = getCategoriesController();
      break;

    case 'readmoviedetail':
      $data = readMovieDetailController();
      break;

    case 'addprofile':
      $data = addProfileController();
      break;

    case 'readprofils':
      $data = readProfilsController();
      break;

 
    case 'updateprofile':
      $data = updateProfileController();
      break;

    default:
      echo json_encode('[error] Unknown todo value');
      http_response_code(400);
      exit();
  }

  if ($data===false){
    echo json_encode('[error] Controller returns false');
    http_response_code(500);
    exit();
  }

  echo json_encode($data);
  http_response_code(200);
  exit();

} 

http_response_code(404);

?>
