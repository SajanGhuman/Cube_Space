<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $userID = isset($data['userID']) ? filter_var($data['userID'], FILTER_SANITIZE_NUMBER_INT) : null;
    $name = isset($data['name']) ? filter_var($data['name'], FILTER_SANITIZE_STRING) : null;
    $email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_STRING) : null;
    $access = isset($data['access']) ? filter_var($data['access'], FILTER_SANITIZE_STRING) : null;

    $result = "";
    $error = false;

    try {
            if ($userID !== null || $name !== null || $email !== null || $access !== null) {
                $result = "";
                $error = false;
                $query = "UPDATE users SET name = :name, email = :email, access = :access WHERE userID = :userID";

                $statement = $db->prepare($query);
                $statement->bindValue(":userID", $userID, PDO::PARAM_INT);
                $statement->bindValue(":name", $name, PDO::PARAM_STR);
                $statement->bindValue(":email", $email, PDO::PARAM_STR);
                $statement->bindValue(":access", $access, PDO::PARAM_STR);
                $statement->execute();

                $result = "User Updated Successfully";
            }else {
            $result = "Something was null";
            $error = true;
            $response = json_encode(["result" => $result, "error" => $error]);
        }
    } catch (PDOException $e) {
        $error = true;
        $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
    }
    $response = json_encode(["result" => $result, "error" => $error]);
    echo $response;
}
?>