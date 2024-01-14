<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
header('Cache-Control: no-store, must-revalidate');



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $id = filter_var($data['algID'], FILTER_VALIDATE_INT);
    if ($id === false || $id === null) {
        $response = json_encode(['error' => 'Invalid or missing algID']);
    } else {
        $result = '';
        $error = false;

        try {
            $query = "SELECT * FROM algorithms WHERE algID = :algID";
            $statement = $db->prepare($query);
            $statement->bindParam(':algID', $id, PDO::PARAM_INT);
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);

            if (empty($result)) {
                $response = json_encode(['error' => 'No record found for the provided algID']);
            } else {
                $response = json_encode(['result' => $result, 'error' => $error]);
            }
        } catch (PDOException $e) {
            $error = true;
            $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
        }
    }

    echo $response;
}
?>