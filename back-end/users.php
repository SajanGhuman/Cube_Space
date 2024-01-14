<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $query = "SELECT * FROM users";
        $statement = $db->prepare($query);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (empty($result)) {
            $response = json_encode(["error" => true, "message" => "No users found!!"]);
        } else {
            foreach ($result as &$user) {
                $user['userID'] = filter_var($user['userID'], FILTER_SANITIZE_NUMBER_INT);
                $user['name'] = filter_var($user['name'], FILTER_SANITIZE_STRING);
                $user['email'] = filter_var($user['email'], FILTER_SANITIZE_EMAIL);
            }
            // unset($user);

            $response = json_encode(["result" => $result, "error" => false]);
        }

        echo $response;
    } catch (PDOException $e) {
        $response = json_encode(["error" => true, "message" => "Database error: " . $e->getMessage()]);
        echo $response;
    }
}
?>
