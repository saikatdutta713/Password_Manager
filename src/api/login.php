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

    $username = $data['mail_id'];
    $password = $data['password'];

    $hashed_password = password_hash($password, PASSWORD_BCRYPT, ["cost" => 8]);

    
    if (mysqli_num_rows(mysqli_query($conn, "SELECT `username` FROM `user` WHERE `username` = '$username'")) > 0) {
        $row = mysqli_fetch_assoc(mysqli_query($conn, "SELECT `name`,`password` FROM `user` WHERE `username` = '$username'"));
        
        // $hashed_password = $row['password'];

        if (password_verify($password, $hashed_password)) {
            $msg = array('status' => 1, 'msg' => 'You logged in Successfully!', 'name' => $row['name'] , 'username' => $username );            
        }
        else {
            $msg = array('status' => 0, 'msg' => 'Wrong password!');
        }
    }
    else {
        $msg = array('status' => 0, 'msg' => 'You are not Registered!');
    }

}
else {
    $msg = array('status' => 0, 'msg' => 'Cunnection failed! Try again');
}

echo json_encode($msg);

?>