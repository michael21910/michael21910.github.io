<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="5" >
    <link rel="stylesheet" type="text/css" href="style.css" media="screen"/>

	<title> Sensor Data </title>

</head>

<body>

    <h1>SENSOR DATA</h1>
<?php
$servername = "localhost";
$username = "root";
$password = "michael319101823";
$dbname = "db_TugOfWar";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, pull FROM table_TugOfWar ORDER BY id ASC";

echo '<table cellspacing="5" cellpadding="5">
      <tr> 
        <th>ID</th> 
        <th>Value</th>    
      </tr>';
 
if ($result = $conn->query($sql)) {
    while ($row = $result->fetch_assoc()) {
        $row_id = $row["id"];
        $row_pull = $row["pull"]; 
        
        // Uncomment to set timezone to - 1 hour (you can change 1 to any number)
       // $row_reading_time = date("Y-m-d H:i:s", strtotime("$row_reading_time - 1 hours"));
      
        // Uncomment to set timezone to + 4 hours (you can change 4 to any number)
        //$row_reading_time = date("Y-m-d H:i:s", strtotime("$row_reading_time + 4 hours"));
      
        echo '<tr> 
                <td>' . $row_id . '</td> 
                <td>' . $row_pull . '</td>                
              </tr>';
    }
    $result->free();
}

$conn->close();
?> 
</table>

</body>
</html>

	</body>
</html>