<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $userID = isset($data['userID']) ? filter_var($data['userID'], FILTER_SANITIZE_NUMBER_INT) : null;
    $name = isset($data['name']) ? filter_var($data['name'], FILTER_SANITIZE_STRING) : null;
    $content = isset($data['content']) ? filter_var($data['content'], FILTER_SANITIZE_STRING) : null;
    $pageKey = isset($data['pageKey']) ? filter_var($data['pageKey'], FILTER_SANITIZE_STRING) : null;
    $result = "";
    $error = false;

    try {
        if (!empty($content)) {
            $query = "INSERT INTO comments (userID,commentName, content,pageKey) VALUES (:userID, :commentName, :content,:pageKey)";

            $statement = $db->prepare($query);
            $statement->bindValue(":userID", $userID, PDO::PARAM_INT);
            $statement->bindValue(":commentName", $name, PDO::PARAM_STR);
            $statement->bindValue(":content", $content, PDO::PARAM_STR);
            $statement->bindValue(":pageKey", $pageKey, PDO::PARAM_STR);
            $statement->execute();

            $result = "Comment Added Successfully";
        } else {
            $result = "Failed To Add Comment. Please Try Again";
            $error = true;
        }
    } catch (PDOException $e) {
        $error = true;
        $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
    }
    $response = json_encode(["result" => $result, "error" => $error]);
    echo $response;
}
?>