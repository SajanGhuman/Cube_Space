<?php
define('DB_DSN', 'u945950483_Serverside');
define('DB_USER', 'u945950483_sajan');
define('DB_PASS', '123');
try {
    $db = new PDO(DB_DSN, DB_USER, DB_PASS);
} catch (PDOException $e) {
    print "Error: " . $e->getMessage();
    die();
}
?>