<?php
//connect to database
include('../utils/connect_db.php');

//fetch all product details from database
$sql = "SELECT * FROM products LIMIT 100";
$result = mysqli_query($conn, $sql);

$response = array(
    'status' => '',
    "status_code" => "",
    'message' => '',
);
// Store the data in an array of JSON objects
$data = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        // $data[] = json_encode($row);
        $temp = array();
        $temp['id'] = $row['id'];
        $temp['name'] = $row['name'];
        $temp['price'] = $row['price'];
        $temp['image'] = $row['image'];
        $temp['description'] = $row['description'];
        $temp['qtyleft'] = $row['qtyleft'];
        $data[] = $temp;
    }
}
else{
    $response['status'] = 'error';
    $response['status_code'] = '404';
    $response['message'] = 'No products found';
    echo json_encode($response);
    exit();
}

$response['status'] = 'success';
$response['status_code'] = '200';
$response['message'] = 'Products fetched successfully';
$response['data'] = $data;


echo json_encode($response);

?>