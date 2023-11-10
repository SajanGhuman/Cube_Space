<?php
require('connect.php');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $name = $data['name'];
    $notation = $data['notation'];
    $description = $data['description'];

    $result = "Algorithm Added Succesfully";
    $error = false;
    if ($name != "" && $notation != "" && $description != "") {
        $query = "INSERT INTO basic (name, notation, description) VALUES (:name, :notation, :description)";

        $statement = $db->prepare($query);
        $statement->bindValue(":name", $name);
        $statement->bindValue(":notation", $notation);
        $statement->bindValue(":description", $description);
        $statement->execute();
    } else {
        $result = "Failed To Add Algorithm. Please Try Again";
        $error = true;
    }
    $response[] = array("result" => $result, "error" => $error);
    echo json_encode($response);
}

?>