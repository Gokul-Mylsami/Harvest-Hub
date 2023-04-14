<?php

if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    echo $name." ".$email." ".$password;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>

    <link rel="stylesheet" href="./styles/login.css" />
    <link rel="stylesheet" href="./styles/index.css" />
</head>

<body>
    <div class="bg-wrapper">
        <div class="form-container">
           <form class="form" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="POST">
                <h1 class="login-title">Sign up</h1>
                <div class="input-field-cotainer"> 
                    <input type="name" name="name" class="form-input-field" placeholder="Name" required />
                </div>
                <div class="input-field-cotainer"> 
                    <input type="email" name="email" class="form-input-field" placeholder="Email" required />
                </div>
                <div class="input-field-cotainer"> 
                    <input type="password" name="password" class="form-input-field" placeholder="Password" required />
                </div>
                <div class="input-field-cotainer">
                    <!-- <button type="submit" class="submit-btn">Submit</button> -->
                    <input type="submit" name="submit" value="Submit" class="submit-btn" />
                </div>
                <div>
                    <p class="form-link"> Already having account ? 
                        <a href="./login.php" class="form-link">Login</a>
                    </p>
                </div>
           </form>
        </div>
    </div>
</body>

</html>