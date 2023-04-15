<?php 
//connect to database
include('../utils/connect_db.php');

$response = array(
    'status' => '',
    "status_code" => "",
    'message' => '',
);

$_userEmail = 'abc@gmail.com';
if(isset($_POST['action']) && $_POST['action'] === 'get'){
    
    $sql = "SELECT cartitems FROM user WHERE email = '$_userEmail'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $cartitems = $row['cartitems'];
        $cartitems = json_decode($cartitems, true);
        $response['status'] = 'success';
        $response['status_code'] = '200';
        $response['message'] = 'Cart items fetched successfully';
        $response['data'] = $cartitems;
    } else {
        $response['status'] = 'error';
        $response['status_code'] = '404';
        $response['message'] = 'No cart items found';
    }
}

if(isset($_POST['action']) && $_POST['action'] === 'add'){
    $_id = $_POST['id'];
    $_name = $_POST['name'];

    $sql = "SELECT * FROM products WHERE id = '$_id'";
    $result = mysqli_query($conn, $sql);
    $product = mysqli_fetch_assoc($result);

    $sql = "SELECT cartitems FROM user WHERE email = '$_userEmail'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);

    $cartitems = $row['cartitems'];

    if($cartitems === null){
        //update the user table cart items to [{id:1,noOfProducts:1}]
        $user_products[] = array(
            'id' => $_id,
            'quantity' => 1,
        );

        $user_products = json_encode($user_products);
        
        $sql = "UPDATE user SET cartitems = '$user_products' WHERE email = '$_userEmail'";
        $result = mysqli_query($conn, $sql);
        if($result){
            $response['status'] = 'success';
            $response['status_code'] = '200';
            $response['message'] = 'Cart items added successfully';
            $response['data'] = $user_products;
        } else {
            $response['status'] = 'error';
            $response['status_code'] = '500';
            $response['message'] = 'Cart items could not be added';
        }
    } else {
        $cartitems = json_decode($cartitems, true);


        $newCartItems = array(
            'id' => $_id,
            'quantity' => 1,
        );

        $cartitems[] = $newCartItems;
        $cartitems = json_encode($cartitems);

        //update the user table cart items to [{id:1,noOfProducts:1}]
        $sql = "UPDATE user SET cartitems = '$cartitems' WHERE email = '$_userEmail'";
        $result = mysqli_query($conn, $sql);
        if($result){
            $response['status'] = 'success';
            $response['status_code'] = '200';
            $response['message'] = 'Cart items added successfully';
            $response['data'] = $cartitems;
        } else {
            $response['status'] = 'error';
            $response['status_code'] = '500';
            $response['message'] = 'Cart items could not be added';
            $response['data'] = $cartitems;
        }
    }
}


echo json_encode($response);



?>