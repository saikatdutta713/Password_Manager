<?php

$server = "localhost";
$user = "root";
$password = "";
$db = "passwordmanager";

$conn = mysqli_connect($server,$user,$password,$db) or die("Connection Failed: ".mysqli_connect_error());

?>