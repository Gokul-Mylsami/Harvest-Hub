<?php
    session_start();
    if(session_destroy())
    {
        $response = array(
            'status' => 'success',
            'message' => 'User logged out successfully'
        );  
    }
    else
    {
        $response = array(
            'status' => 'error',
            'message' => 'User not logged out'
        );  
    }

    echo json_encode($response);
?>