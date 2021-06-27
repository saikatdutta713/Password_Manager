<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'conn.php';

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$url = $data['url'];

if(!empty($url)){

    if (!empty(file_get_contents("php://input"))) {


        $sql = "UPDATE `user` SET `image`='$url' WHERE `username` = '$username';";

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

}
elseif (empty($url)) {
    
    $sql = "SELECT `image` FROM `user` WHERE `username` = '$username';";

    $result = mysqli_query($conn,$sql);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo $row['image'];
    }
    else {
        echo 0;
    }

}

?>