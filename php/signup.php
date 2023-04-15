<?php
// Retrieve the data sent from the client-side using $_POST
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

// Connect to the database
include_once('../utils/connect_db.php');

// Check if the email already exists in the database
$sql = "SELECT * FROM user WHERE email = '$email'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
  $response = array(
    'status' => 'error',
    "status_code" => "409",
    'message' => 'Email already exists'
  );
  echo json_encode($response);
  exit();
}

//hash the password
$password = hash('sha256', $password);

// Insert the data into the database
$sql = "INSERT INTO user (name, email, password) VALUES ('$name', '$email', '$password')";
if(mysqli_query($conn, $sql))
{
    $response = array(
        'status' => 'success',
        "status_code" => "200",
        'message' => 'User created successfully'
    );
}
else
{
    $response = array(
        'status' => 'error',
        "status_code" => "500",
        'message' => 'Something went wrong ',
        'error' => mysqli_error($conn)
    );
}
echo json_encode($response);
?>
