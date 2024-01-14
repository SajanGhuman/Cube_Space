<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $selected = strtolower($data['selected']);
    $search = '%' . $data['search'] . '%';
    $searchBy = $data['searchBy'];
    $type = strtolower($data['type']);
    $error = false;

    try {
        $query = "SELECT * FROM algorithms WHERE 1";

        if (!empty($search)) {
            if ($searchBy === 'name') {
                $query .= " AND name LIKE  UPPER(:search)";
            } else if ($searchBy === 'notation') {
                $query .= " AND notation LIKE  UPPER(:search)";
            }
        }

        if (!empty($type)) {
            $query .= " AND type = :type";
        }
        if ($selected && $selected === 'name') {
            $query .= " ORDER BY name ASC";
        } elseif ($selected && $selected === 'date') {
            $query .= " ORDER BY date_created DESC";
        } elseif ($selected && $selected === 'modified') {
            $query .= " ORDER BY date_modified DESC";
        }

        $statement = $db->prepare($query);

        if (!empty($search)) {
            $statement->bindParam(':search', $search, PDO::PARAM_STR);
        }

        if (!empty($type)) {
            $statement->bindParam(':type', $type, PDO::PARAM_STR);
        }

        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (empty($result)) {
            $response = json_encode(['error' => 'No data found']);
        } else {
            $response = json_encode(['result' => $result, 'error' => $error]);
        }
    } catch (PDOException $e) {
        $error = true;
        $response = json_encode(['error' => 'Database Access: ' . $e->getMessage()]);
    }

    echo $response;
}
?>