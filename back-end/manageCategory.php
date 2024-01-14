<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $id = filter_var($data['id'], FILTER_VALIDATE_INT);
    $name = filter_var($data['categoryName'], FILTER_SANITIZE_STRING);

    $result = "";
    $error = false;
    try {
        if ($id !== false && $id !== null && $name !== "") {
            $query = "UPDATE categories SET categoryId = :id, categoryName = :name";

            $statement = $db->prepare($query);
            $statement->bindValue(":id", $id, PDO::PARAM_INT);
            $statement->bindValue(":name", $name, PDO::PARAM_STR);
            $statement->execute();

            $result = "Category Added Successfully";
        } else {
            $result = "Failed To Add Category. Invalid or missing data.";
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