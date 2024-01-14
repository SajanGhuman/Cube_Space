<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $pageKey = isset($_GET['pageKey']) ? filter_var($_GET['pageKey'], FILTER_VALIDATE_INT) : null;

    if ($pageKey === null) {
        $response = json_encode(["error" => true, "message" => "Invalid or missing pageKey"]);
        echo $response;
        exit;
    }

    try {
        $query = "SELECT comments.*, users.name 
        FROM comments 
        JOIN users ON comments.userID = users.userID 
        WHERE pageKey = :pageKey
        ORDER BY comments.id DESC";
        $statement = $db->prepare($query);
        $statement->bindValue(":pageKey", $pageKey, PDO::PARAM_INT);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (empty($result)) {
            $response = json_encode(["error" => true, "message" => "Be the first one to comment "]);
        } else {
            $response = json_encode(["result" => $result, "error" => false]);
        }

        echo $response;
    } catch (PDOException $e) {
        $response = json_encode(["error" => true, "message" => "Database error: " . $e->getMessage()]);
        echo $response;
    }
}
?>