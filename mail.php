<?php

$userName = $_POST['userNameForm'];
$userPhone = $_POST['userPhoneForm'];
$userEmail  = $_POST['userEmailForm'];
$descriptionProject = $_POST['descriptionProject'];


var_dump($userName . ' ' . $userPhone);
echo $userName;
echo $userPhone;


$to      = 'denisko.I@mail.ru';
$subject = 'New client';
$message = 'User' . "$userName" . "\r\n" . 'User phone' . "$userPhone" . "\r\n" . 'User email' . "$userEmail" . "\r\n" . 'descriptionProject' . $descriptionProject;
$headers = 'From: webbestteam@gmail.com' . "\r\n" .
    'Reply-To: webbestteam@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);


/*$to      = 'nobody@example.com';
$subject = 'the subject';
$message = 'hello';
$headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);*/
?>