<?php
define('DB_HOST', '193.203.166.71'); 
define('DB_DSN', 'mysql:host=' . DB_HOST . ';dbname=u945950483_Serverside;charset=utf8');
define('DB_USER', 'u945950483_sajan');
define('DB_PASS', '5240401@!Hh');
try {
    $db = new PDO(DB_DSN, DB_USER, DB_PASS);
    // echo "Connected successfully";
} catch (PDOException $e) {
    print "Error: " . $e->getMessage();
    die();
}
?>
