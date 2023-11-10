<?php
session_start();
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $email = $data['email'];
    $pass = $data['password'];

    $_SESSION["email"] = $email;
    $_SESSION["pass"] = $pass;


    $result = '';

    if ($email != "" and $pass != "") {
        $query = "SELECT * FROM users WHERE email=:email";
        $statement = $db->prepare($query);
        $statement->bindParam(':email', $email, PDO::PARAM_STR);
        $statement->execute();

        $row = $statement->fetch(PDO::FETCH_ASSOC);
        $error=false;

        if ($row) {
            if ($pass != $row["password"]) {
                $result = "Invalid Password";
                $true=true;
            } else {
                $result = "Logged in successfully! Redirecting...";
                $true=false;
            }
        } else {
            $result = "Email does not exist";
            $error=true;
        }

    } else {
        $result = '';
    }
    $response[] = array("result" => $result, "error" =>$error, "name" => $row['name']);
    echo json_encode($response);
}

?>
