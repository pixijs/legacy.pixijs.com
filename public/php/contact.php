<?php

	global $error;

	$remote = $_SERVER['REMOTE_ADDR'];
	$ip = $_SERVER['SERVER_ADDR'];
	$error = '';

	/*echo $remote;
	echo $ip;*/

	if (isset($_POST['name'], $_POST['email'], $_POST['message'])) {
		/*if ($remote != $ip) {
			echo 'Please don\'t post to this script.';
		} else {*/
			$name = $_POST['name'];
			$email = $_POST['email'];
			$message = $_POST['message'];
			if (strlen($name) < 3) {
				$error = 'Please enter your name';
			} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
				$error = 'Invalid email address';
			} else if (strlen($message) < 5) {
				$error = 'Please enter your message';
			} else {

				//$to = 'hello@goodboydigital.com';
				//$subject = 'PixiJS Website Feedback';
				//$headers = "From: $name <$email>";
//
				//mail($to, $subject, $message, $headers);
//
				//$error = 'Thank you, your message was sent.';

				require_once('mail/class.phpmailer.php');
				$mail = new PHPMailer;

				$mail->IsSMTP();
				$mail->SMTPDebug  = 0;
				$mail->SMTPAuth   = true;
				$mail->SMTPSecure = "tls";
				$mail->Host       = "email-smtp.eu-west-1.amazonaws.com";
				$mail->Port       = 25;
				$mail->Username   = "AKIAJJK35GB66ZYJANSQ";
				$mail->Password   = "AoocQMMGFmqmS0Zb8pZW0gxevougCu+cDnH9oyzXj0Bw";

				/*$mail->FromName = $name;
				$mail->From 	= $email;*/
				$mail->FromName = 'Goodboy Digital';
				$mail->From 	= 'hello@goodboydigital.com';
				$mail->AddReplyTo($email, $name);

				$alt = "From: $name\nEmail: $email\n\n$message";
				$message = "<p>From: $name<br/>Email: $email</p><p>$message</p>";


				$mail->AddAddress('hello@goodboydigital.com', 'Goodboy Digital');

				$mail->Subject = 'PixiJS';
				$mail->Body = $message;
				$mail->AltBody = $alt;
					
				if(!$mail->Send()) {
					$error = $mail->ErrorInfo;
				} else {
					$error = 'Thank you, your message was sent.';	
				}

			}
		//}
	}

	echo $error;

?>