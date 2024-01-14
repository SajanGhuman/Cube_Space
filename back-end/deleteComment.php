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
        $id = filter_var($data['id'], FILTER_VALIDATE_INT);

        if ($id !== false && $id !== null) {
            $query = "DELETE FROM comments WHERE id = :id";
            $statement = $db->prepare($query);
            $statement->bindParam(':id', $id, PDO::PARAM_INT);
            $statement->execute();
            $rowCount = $statement->rowCount();

            if ($rowCount > 0) {
                $response = json_encode(['success' => 'Row deleted successfully']);
            } else {
                $response = json_encode(['error' => 'No rows deleted. Check if user exists.']);
            }
        } else {
            $response = json_encode(['error' => 'Invalid or missing id']);
        }
    } catch (PDOException $e) {
        $error = true;
        $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
    }
}
echo $response;
?>