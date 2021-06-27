<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'conn.php';

$data = file_get_contents("php://input");

if (!empty($data)) {
    
    $data = json_decode(file_get_contents("php://input"), true);

    $sitename = $data['sitename'];
    $username = $data['username'];
    $password = $data['password'];

    $sql = "INSERT INTO `data` (`id`, `sitename`, `username`, `password`) VALUES (NULL, '$sitename', '$username', '$password');";

    if (mysqli_query($conn, $sql)) {
        echo 1;
    }
    else {
        echo 0;
    }

}
else {
    echo 2;
}

?>