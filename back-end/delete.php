<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    try {
        $algID = filter_var($data['algID'], FILTER_VALIDATE_INT);

        if ($algID !== false && $algID !== null) {
            $query = "DELETE FROM algorithms WHERE algID = :algID";
            $statement = $db->prepare($query);
            $statement->bindParam(':algID', $algID, PDO::PARAM_INT);
            $statement->execute();
            $rowCount = $statement->rowCount();

            if ($rowCount > 0) {
                $response = json_encode(['success' => 'Row deleted successfully']);
                echo $response;
                exit();
            } else {
                $response = json_encode(['error' => 'No rows deleted. Check if algID exists.']);
                echo $response;
                exit();
            }
        } else {
            $response = json_encode(['error' => 'Invalid or missing algID']);
            echo $response;
            exit();
        }
    } catch (PDOException $e) {
        $error = true;
        $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
        echo $response;
        exit();
    }
}
?>