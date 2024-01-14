<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $kid = filter_var($data['id'], FILTER_VALIDATE_INT);
    $id = filter_var($data['categoryID'], FILTER_VALIDATE_INT);
    $name = filter_var($data['categoryName'], FILTER_SANITIZE_STRING);


    if ($id !== false && $id !== null) {
        $result = "";
        $error = false;
        try {
            $query = "UPDATE categories SET categoryID = :categoryID, categoryName = :name WHERE  categoryID = :id";

            $statement = $db->prepare($query);
            $statement->bindValue(":categoryID", $id);
            $statement->bindValue(":id", $kid);
            $statement->bindValue(":name", $name);
            $statement->execute();

            $result = "Category Updated Successfully";
        } catch (PDOException $e) {
            $error = true;
            $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
        }
        $response = json_encode(["result" => $result, "error" => $error]);
        echo $response;
    } else {
        $response = json_encode(["error" => true, "message" => "Invalid or missing id"]);
        echo $response;
    }
}
?>