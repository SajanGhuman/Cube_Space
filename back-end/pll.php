<?php
require('connect.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$query = "SELECT * FROM pll";
$statement = $db->prepare($query);
$statement->execute();

$rows = $statement->fetchAll(PDO::FETCH_ASSOC);

if (empty($rows)) {
    $Json = json_encode(['error' => 'No data found']);
} else {
    $Json = json_encode($rows);
}
echo $Json;

?>
