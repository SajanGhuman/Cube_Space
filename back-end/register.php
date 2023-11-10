<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $name = $data['name'];
    $email = $data['email'];
    $pass1 = $data['pass1'];
    $pass2 = $data['pass2'];

    $result = "You Have Resgistered Succesfully";
    $error = false;
    if ($name != "" && $email != "" && $pass1 != "" && $pass2 != "" && $pass1 === $pass2) {
        $query = "INSERT INTO users (name, email, password) VALUES (:name, :email, :pass)";

        $statement = $db->prepare($query);
        $statement->bindValue(":name", $name);
        $statement->bindValue(":email", $email);
        $statement->bindValue(":pass", $pass1);
        $statement->execute();
    } else {
        $result = "Registratin Failed!! Please Try Again";
        $error = true;
    }
    $response[] = array("result" => $result, "error" => $error);
    echo json_encode($response);
}

?>