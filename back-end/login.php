<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : null;
    $pass = isset($data['password']) ? filter_var($data['password'], FILTER_SANITIZE_STRING) : null;

    $result = '';
    $response = array();
    $error = true;

    if ($email !== null && $pass !== null) {
        $query = "SELECT * FROM users WHERE email=:email";
        $statement = $db->prepare($query);
        $statement->bindParam(':email', $email, PDO::PARAM_STR);
        $statement->execute();

        $row = $statement->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            if (!password_verify($pass, $row["password"])) {
                $result = "Invalid Password";
                error_log("Entered password: " . $pass);
                error_log("Stored hashed password: " . $row["password"]);
                error_log("Password verification result: " . var_export(password_verify($pass, $row["password"]), true));
            } else {
                $result = "Logged in successfully! Redirecting...";
                $error = false;
                $response = array("result" => $result, "error" => $error, "access" => $row["access"], "userID" => $row["userID"], "name" => $row["name"], "email" => $row["email"]);
            }
        } else {
            $result = "Email does not exist";
        }
    } else {
        $result = "Invalid or missing email or password";
    }

    $response[] = array("result" => $result, "error" => $error);
    echo json_encode($response);
}
?>