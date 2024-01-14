<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $algID = filter_var($_GET['algID'], FILTER_VALIDATE_INT);

    if ($algID !== false && $algID !== null) {
        try {
            $query = "SELECT * FROM algorithms WHERE algID = :algID";

            $statement = $db->prepare($query);
            $statement->bindValue(":algID", $algID, PDO::PARAM_INT);
            $statement->execute();

            $result = $statement->fetchAll(PDO::FETCH_ASSOC);

            if (empty($result)) {
                $response = json_encode(["error" => true, "message" => "Algorithm not found"]);
            } else {
                $response = json_encode(["result" => $result, "error" => false]);
            }

            echo $response;
        } catch (PDOException $e) {
            $response = json_encode(["error" => true, "message" => "Database error: " . $e->getMessage()]);
            echo $response;
        }
    } else {
        $response = json_encode(["error" => true, "message" => "Invalid or missing algID"]);
        echo $response;
    }
}
?>