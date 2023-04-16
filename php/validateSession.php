<?php
session_start();
if(!isset($_SESSION['user'])){
    $response['status'] = 'error';
    $response['message'] = 'You are not logged in';
    echo json_encode($response);
    exit();
}
else
{
    $response['status'] = 'success';
    $response['message'] = 'You are logged in';
    $response['user'] = $_SESSION['user'];
    echo json_encode($response);
    exit();
}
?>