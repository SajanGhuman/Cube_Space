<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = filter_var($_GET['categoryID'], FILTER_SANITIZE_NUMBER_INT);

    try {
        $query = "SELECT * FROM categories WHERE categoryID = :id";
        $statement = $db->prepare($query);
        $statement->bindValue(":id", $id, PDO::PARAM_INT);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (empty($result)) {
            $response = json_encode(["error" => true, "message" => "No categories Found"]);
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