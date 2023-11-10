<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $name = $_GET['name'];
    $notation = $_GET['notation'];
    $description = $_GET['description'];

    $result = "Algorithm Added Succesfully";
    $error = false;
    if ($name != "" && $notation != "" && $description != "") {
        $query = "SELECT name, notation, description FROM basic WHERE name = :name AND notation = :notation AND description = :description";

        $statement = $db->prepare($query);
        $statement->bindValue(":name", $name);
        $statement->bindValue(":notation", $notation);
        $statement->bindValue(":description", $description);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        $error = false;
    } else {
        $result = "Failed To fetch Algorithm. Please Try Again";
    }
    $response[] = array("result" => $result, "error" => $error);
    echo json_encode($response);
}

?>