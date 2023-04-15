<?php 
    include('../utils/connect_db.php');
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM user WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);
    
    //session
    session_start();

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);;

        if($password === $row['password']){
            $response = array(
                'status' => 'success',
                "status_code" => "200",
                'message' => 'User logged in successfully',
                'user' => $row['email']
            );
            $_SESSION['email'] = $row['email'];
        } else {
            $response = array(
                'status' => 'error',
                "status_code" => "401",
                'message' => 'Invalid password'
            );
        }
    } else {
        $response = array(
            'status' => 'error',
            "status_code" => "404",
            'message' => 'User not found'
        );
    }

    echo json_encode($response);
?>