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
    $password = $data['password'];
    $password1 = $data['password1'];
    $email = $data['email'];
    $access = $data['access'];

    $result = "";
    $error = false;

    try {
        if ($name != "" && $password != "" && $password1 != "" && $email != "" && $access != "") {
            if ($password === $password1) {
                if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $hashedPass = password_hash($password, PASSWORD_DEFAULT);

                    $query = "INSERT INTO users (name, email, password, access) VALUES (:name, :email, :password, :access)";
                    $statement = $db->prepare($query);
                    $statement->bindValue(":name", $name);
                    $statement->bindValue(":email", $email);
                    $statement->bindValue(":password", $hashedPass);
                    $statement->bindValue(":access", $access);
                    $statement->execute();

                    $result = "User Added Successfully";
                } else {
                    $result = "Invalid Email Format";
                    $error = true;
                }
            } else {
                $result = "Passwords do not match";
                $error = true;
            }
        } else {
            $result = "Failed To Add User. Please Try Again";
            $error = true;
        }
    } catch (PDOException $e) {
        $error = true;
        $result = "Database Access: " . $e->getMessage();
    }

    $response = json_encode(["result" => $result, "error" => $error]);
    echo $response;
}
?>