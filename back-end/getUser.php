<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userID = isset($_GET['userID']) ? filter_var($_GET['userID'], FILTER_SANITIZE_STRING) : null;

    try {
        if ($userID !== null) {
            $query = "SELECT * FROM users WHERE userID = :userID";
            $statement = $db->prepare($query);
            $statement->bindValue(":userID", $userID);
            $statement->execute();

            $result = $statement->fetchAll(PDO::FETCH_ASSOC);

            if (empty($result)) {
                $response = json_encode(["error" => true, "message" => "No user Found"]);
            } else {
                $response = json_encode(["result" => $result, "error" => false]);
            }

            echo $response;
        } else {
            $response = json_encode(["error" => true, "message" => "Invalid or missing user ID"]);
            echo $response;
        }
    } catch (PDOException $e) {
        $response = json_encode(["error" => true, "message" => "Database error: " . $e->getMessage()]);
        echo $response;
    }
}
?>