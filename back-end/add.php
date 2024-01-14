<?php
ini_set('display_errors', 1);
require('connect.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $notation = filter_var($_POST['notation'], FILTER_SANITIZE_STRING);
    $type = strtolower(filter_var($_POST['type'], FILTER_SANITIZE_STRING));

    $result = "";
    $error = false;

    try {
        $image_valid = true;

        if ($name != "" && $notation != "" && $type != "") {
            if (!empty($_FILES['file'])) {
                function file_upload_path($original_filename, $upload_subfolder_name = 'f2l')
                {
                    $current_folder = dirname(__FILE__);
                    $frontend_folder = realpath($current_folder . '/../front-end');
                    $decoded_filename = urldecode($original_filename);
                    $path_segment = [$frontend_folder, 'public', $upload_subfolder_name, basename($decoded_filename)];
                    return join(DIRECTORY_SEPARATOR, $path_segment);
                }

                function file_is_an_image($temporary_path, $new_path)
                {
                    $allowed_mime_types = ['image/jpeg', 'image/png'];
                    $allowed_file_extensions = ['jpg', 'jpeg', 'png'];

                    $actual_file_extentions = pathinfo($new_path, PATHINFO_EXTENSION);
                    $actual_mime_type = getimagesize($temporary_path)['mime'];

                    $file_extension_is_valid = in_array($actual_file_extentions, $allowed_file_extensions);
                    $mime_type_is_valid = in_array($actual_mime_type, $allowed_mime_types);

                    return $file_extension_is_valid && $mime_type_is_valid;
                }

                $image_uploaded = isset($_FILES['file']) && ($_FILES['file']['error'] === 0);
                if ($image_uploaded && file_is_an_image($temporary_image_path, $new_image_path)) {
                    $image_filename = $_FILES['file']['name'];
                    $temporary_image_path = $_FILES['file']['tmp_name'];
                    $new_image_path = file_upload_path($image_filename);
                    move_uploaded_file($temporary_image_path, $new_image_path);

                    // error_log("Debug: Temporary Image Path - " . $temporary_image_path);
                    // error_log("Debug: New Image Path - " . $new_image_path);
                }
            }

            if ($image_valid) {
                $query = "INSERT INTO algorithms (name, notation, type,url) VALUES (:name, :notation, :type, :url)";
                $statement = $db->prepare($query);
                $statement->bindValue(":name", $name);
                $statement->bindValue(":notation", $notation);
                $statement->bindValue(":type", $type);

                if (isset($image_filename) && !$error) {
                    $statement->bindValue(":url", $image_filename);
                } else {
                    $statement->bindValue(":url", '');
                }

                $statement->execute();
            }
        } else {
            $result = "Failed to Add Algorithm. Please Fill in All Required Fields.";
            $error = true;
        }
    } catch (PDOException $e) {
        $error = true;
        $result = "Database Access: " . $e->getMessage();
    }

    $response = json_encode(["result" => $result ?? "Success", "error" => $error ?? false]);
    echo $response;
    exit();
}
//     $image = new ImageResize($new_image_path);
//     $image->resize(40, 40);
//     $image->save($new_image_path);

// } else {
//     error_log("Debug: Invalid File Type or MIME Type");
//     $result = 'The image is not valid. Please try again';
//     $error = true;
//     $image_valid = false;
?>