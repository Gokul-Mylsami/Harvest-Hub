<?php
    session_destroy();
    $respose = array(
        'status' => 'success',
        "status_code" => "200",
        'message' => 'User logged out successfully'
    );
    echo json_encode($response);
?>