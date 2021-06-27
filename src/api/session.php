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

    if (isset($data['login']) && isset($data['username']) && $data['login'] == true) {
        session_start();
        $username = $data['username'];
        $_SESSION["username"] = $username;
        echo json_encode($_SESSION);
    }
    elseif (isset($data['login']) && $data['login'] == false) {
        session_start();
        session_unset("username");
        session_destroy();
    }
    elseif (!isset($data['login']) && !isset($data['username']) && isset($data['get'])) {
        session_start();
        
        $get = $data['get'];

        if (isset($_SESSION[$data['get']])) {
            echo json_encode($_SESSION[$get]);
        }
        else {
            echo json_encode($_SESSION);
        }
    }

}



?>