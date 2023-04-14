<!-- products : id(pk), name, price, qtyleft, description,image  -->
<!--  -->
<!-- user : name, password, email(pk), cartitems [{id:product_id,noOfProduct:2}] -->

<?php
// connect to the database
$servername = "db"; // Service name defined in docker-compose.yml
$username = "root"; // MySQL username
$password = "password123"; // MySQL password
$dbname = "harvesthub"; // Name of the database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>