<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $algID = filter_var($data['algID'], FILTER_VALIDATE_INT);
    $checked = ($data['checked']);
    $url = ($data['url']);
    if ($data['type'] === "F2L" || $data['type'] === "f2l") {
        $categoryID = 1;
    }
    if ($data['type'] === "OLL" || $data['type'] === "oll") {
        $categoryID = 2;
    }
    if ($data['type'] === "PLL" || $data['type'] === "pll") {
        $categoryID = 3;
    }
    if ($data['type'] === "COLL" || $data['type'] === "coll") {
        $categoryID = 4;
    }

    if ($algID !== false && $algID !== null) {
        $result = "";
        $error = false;
        try {
            if ($checked) {
                $query = "UPDATE algorithms SET url = '' WHERE algID = :algID";
                $statement = $db->prepare($query);
                $statement->bindValue(":algID", $algID, PDO::PARAM_INT);
                $statement->execute();
                $basePath = '../front-end/public/f2l/';

                $imagePath = $basePath . $url;

                if (file_exists($imagePath)) {
                    if (unlink($imagePath)) {
                        $delete = "done";
                    } else {
                        $delete = "no";
                    }
                } else {
                    $result = 'Image not found.';
                }
            }

            $query = "UPDATE algorithms SET name = :name, notation = :notation, type = :type,categoryID = :categoryID WHERE algID = :algID";

            $statement = $db->prepare($query);
            $statement->bindValue(":name", $data['name']);
            $statement->bindValue(":notation", $data['notation']);
            $statement->bindValue(":type", $data['type']);
            $statement->bindParam(":categoryID", $categoryID);
            $statement->bindValue(":algID", $algID, PDO::PARAM_INT);
            $statement->execute();

            $result = "Algorithm Updated Successfully";
        } catch (PDOException $e) {
            $error = true;
            $result = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
        }
        $response = json_encode(["result" => $result, "error" => $error]);
        echo $response;
    } else {
        $response = json_encode(["error" => true, "message" => "Invalid or missing algID"]);
        echo $response;
    }
}
?>