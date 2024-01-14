<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $name = filter_var($data['categoryName'], FILTER_SANITIZE_STRING);

    $result = "";
    $error = false;
    try {
        if ($name !== "") {
            $query = "INSERT INTO categories (categoryName) VALUES (:name)";

            $statement = $db->prepare($query);
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