<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $id = filter_var($data['id'], FILTER_VALIDATE_INT);
   

    if ($id !== false && $id !== null) {
        $result = "";
        $error = false;
        try {
            $query = "UPDATE comments SET commentName = :commentName, content = :content WHERE id = :id";

            $statement = $db->prepare($query);
            $statement->bindValue(":commentName", $data['commentName']);
            $statement->bindValue(":content", $data['content']);
            $statement->bindValue(":id", $id, PDO::PARAM_INT);
            $statement->execute();

            $result = "Comment Updated Successfully";
        } catch (PDOException $e) {
            $error = true;
            $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
        }
        $response = json_encode(["result" => $result, "error" => $error]);
        echo $response;
    } else {
        $response = json_encode(["error" => true, "message" => "Invalid or missing id"]);
        echo $response;
    }
}
?>