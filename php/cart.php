<?php 
//connect to database
include('../utils/connect_db.php');

$response = array(
    'status' => '',
    "status_code" => "",
    'message' => '',
);

$_userEmail = 'abc@gmail.com';

$products = array();
$sql = "SELECT * FROM products";
$result = mysqli_query($conn, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}
if(isset($_POST['action']) && $_POST['action'] === 'get'){
    $sql = "SELECT cartitems FROM user WHERE email = '$_userEmail'"; 
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);

    if ($row['cartitems']!=null) {
        $cartitems = $row['cartitems'];
        $cartitems = json_decode($cartitems, true);
        $data = array();
        foreach($cartitems as $cartitem){
            foreach($products as $product)
            {
                if($cartitem['id'] == $product['id']){
                    $data[] = array(
                        'id' => $product['id'],
                        'name' => $product['name'],
                        'price' => $product['price'],
                        'image' => $product['image'],
                        'description' => $product['description'],
                        'qtyleft' => $product['qtyleft'],
                        'quantity' => $cartitem['quantity'],
                    );
                }
            }
        }
        $response['status'] = 'success';
        $response['status_code'] = '200';
        $response['message'] = 'Cart items fetched successfully';
        $response['data'] = $data;
    } else {
        $response['status'] = 'error';
        $response['status_code'] = '404';
        $response['message'] = 'No cart items found';
    }
}

if(isset($_POST['action']) && $_POST['action'] === 'add'){
    $_id = $_POST['id'];
    $_name = $_POST['name'];

    $sql = "SELECT cartitems FROM user WHERE email = '$_userEmail'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);

    $cartitems = $row['cartitems'];

    if($cartitems === null){
        $user_products[] = array(
            'id' => $_id,
            'quantity' => 1,
        );

        $user_products = json_encode($user_products);
        
        $sql = "UPDATE user SET cartitems = '$user_products' WHERE email = '$_userEmail'";
        $result = mysqli_query($conn, $sql);
        
        $data = array();
        

        if($result){

            $data[] = array(
                'id' => $_id,
                'name' => $_name,
                'price' => $product['price'],
                'image' => $product['image'],
                'description' => $product['description'],
                'qtyleft' => $product['qtyleft'],
                'quantity' => 1,
            );

            $response['status'] = 'success';
            $response['status_code'] = '200';
            $response['message'] = 'Cart items added successfully';
            $response['data'] = $data;
        } else {
            $response['status'] = 'error';
            $response['status_code'] = '500';
            $response['message'] = 'Cart items could not be added';
        }
    } else {
        $cartitems = json_decode($cartitems, true);

        foreach($cartitems as $item)
        {

            if($item['id'] === $_id)
            {
                $response['status'] = 'error';
                $response['status_code'] = '500';
                $response['message'] = 'Product already exists in cart';
                echo json_encode($response);
                exit();
            }
        }

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