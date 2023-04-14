<!-- products : id(pk), name, price, qtyleft, description,image  -->
<!--  -->
<!-- user : name, password, email(pk), cartitems [{id:product_id,noOfProduct:2}] -->
<?php

// connect to the database
include('./connect_db.php');

$sql = "CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    qtyleft INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
)";

if (mysqli_query($conn, $sql)) {
    echo "Table products created successfully";
} else {
    die("Error creating table: " . mysqli_error($conn));
}

$sql = "CREATE TABLE IF NOT EXISTS user (
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL PRIMARY KEY,
    cartitems VARCHAR(255) NOT NULL
)";


if (mysqli_query($conn, $sql)) {
    echo "Table Users created successfully";
} else {
    die("Error creating table: " . mysqli_error($conn));
}

$sql = "DELETE FROM products";
if (!mysqli_query($conn, $sql)) {
    die("Unable to delete all the data's" . mysqli_error($conn));
}

$sql = "DELETE FROM user";
if (!mysqli_query($conn, $sql)) {
    die("Unable to delete all the data's" . mysqli_error($conn));
}


$json_string = file_get_contents('./datas.json');
$datas = json_decode($json_string);

foreach ($datas as $data) {
    $name = $data->name;
    $price = $data->price;
    $qtyleft = $data->qtyleft;
    $description = $data->description;
    $image = $data->imageURL;

    $sql = "INSERT INTO products (name, price, qtyleft, description, image) VALUES ('$name', '$price', '$qtyleft', '$description', '$image')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        die("Error Insertind values " . mysqli_error($conn));
    }
}

?>