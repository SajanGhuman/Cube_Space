<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $name = isset($data['name']) ? filter_var($data['name'], FILTER_SANITIZE_STRING) : null;
    $email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : null;
    $pass1 = isset($data['pass1']) ? filter_var($data['pass1'], FILTER_SANITIZE_STRING) : null;
    $pass2 = isset($data['pass2']) ? filter_var($data['pass2'], FILTER_SANITIZE_STRING) : null;

    $result = "You Have Registered Successfully";
    $error = false;

    if ($name !== null && $email !== null && $pass1 !== null && $pass2 !== null) {
        if ($pass1 === $pass2) {
            $hashedPass = password_hash($pass1, PASSWORD_DEFAULT);
            $query = "INSERT INTO users (name, email, password) VALUES (:name, :email, :pass)";

            $statement = $db->prepare($query);
            $statement->bindParam(":name", $name, PDO::PARAM_STR);
            $statement->bindParam(":email", $email, PDO::PARAM_STR);
            $statement->bindParam(":pass", $hashedPass, PDO::PARAM_STR);
            $statement->execute();
        } else {
            $result = "Passwords do not match";
            $error = true;
        }
    } else {
        $result = "Registration Failed!! Please Try Again";
        $error = true;
    }

    $response[] = array("result" => $result, "error" => $error);
    echo json_encode($response);
}
?>