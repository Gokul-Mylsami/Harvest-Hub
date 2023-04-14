<?php



?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>

    <link rel="stylesheet" href="./styles/login.css" />
    <link rel="stylesheet" href="./styles/index.css" />
</head>

<body>
    <div class="bg-wrapper">
        <div class="form-container">
           <form action="" class="form">
                <h1 class="login-title">Log in</h1>
                <div class="input-field-cotainer"> 
                    <input type="email" class="form-input-field" placeholder="Email" required />
                </div>
                <div class="input-field-cotainer"> 
                    <input type="password" class="form-input-field" placeholder="Password" required />
                </div>
                <div class="input-field-cotainer">
                    <button type="submit" class="submit-btn">Submit</button>
                </div>
                <div>
                    <p class="form-link"> Create New Account ? 
                        <a href="./signup.php" class="form-link">Signup</a>
                    </p>
                </div>
           </form>
        </div>
    </div>
</body>

</html>