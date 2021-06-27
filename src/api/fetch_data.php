<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'conn.php';

$data = file_get_contents("php://input");

if (!empty($data)) {

  $username = json_decode($data,true);

  $sql = "SELECT * FROM `data` WHERE `userid` = '$username' ";

  $result = mysqli_query($conn, $sql) or die("Query Failed: ".mysqli_error());

  $json = array();
  $total_records = mysqli_num_rows($result);

  if($total_records > 0){
    while ($row = mysqli_fetch_assoc($result)){
      $json[] = $row;
    }
  }

}

echo json_encode($json);
?>