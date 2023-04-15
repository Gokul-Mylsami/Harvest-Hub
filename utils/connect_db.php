<?php
// connect to the database
$servername = "db";
$username = "root";
$password = "password123";
$dbname = "harvesthub";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>