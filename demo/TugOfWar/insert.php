<?php
$servername = "localhost";
$username = "root";
$password = "michael319101823";
$dbname = "db_TugOfWar";

// $api_key_value = "tPmAT5Ab3j7F9";

$pull = 0;

if(isset($_GET["pull"])) {
    $pull = $_GET["pull"];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn -> connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }         
    $sql = "INSERT INTO table_TugOfWar (pull) VALUES ('$pull')";       
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } 
    else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }    
    $conn->close();
}
else {
    echo "An error occurs";
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}