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

    $name = $data['name'];
    $username = $data['mail_id'];
    $password = $data['password'];
    

    // Password Hashing -------------------------------------------------------------------------------------------------------------------------------
    
    // $timeTarget = 0.05; // 50 milliseconds

    // $cost = 8;
    // do {
        // $cost++;
        // $start = microtime(true);
        $hashed_password = password_hash($password, PASSWORD_BCRYPT, ["cost" => 8]);
        // $end = microtime(true);
    // } while (($end - $start) < $timeTarget);

    // -------------------------------------------------------------------------------------------------------------------------------------------------


    $check_mail = mysqli_query($conn, "SELECT `username` FROM `user` WHERE `username` = '$username'");
    $sql = "INSERT INTO `user` (`id`, `name`,  `username`, `password`) VALUES (NULL, '$name' , '$username', '$hashed_password');";

    if (mysqli_num_rows($check_mail) > 0) {
        $msg = array('status' => 1 , 'msg' => 'You are already registered!');
    }
    else {
        if (mysqli_query($conn, $sql)) {
            $msg = array('status' => 1 , 'msg' => 'Registration completed');
        }
        else {
            $msg = array('status' => 0 , 'msg' => 'Registraton cannot be completed!');
        }
    }
}
else {
    $msg = array('status' => 0 , 'msg' => 'Connection failed! Try again');
}

echo json_encode($msg);

?>