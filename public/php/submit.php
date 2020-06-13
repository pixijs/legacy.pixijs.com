<?php

	global $error;

	$error = '';

	if (!isset($wp)) {		
		require_once('../wp/wp-config.php');
		$wp->init();
		$wp->parse_request();
		$wp->query_posts();
		$wp->register_globals();
	}

	$display = isset($_POST['display']);

	session_start();
	if (!isset($_SESSION['form_key'])) {
		echo 'Server error';
		die();
	}

	if (isset($_POST['gallery-title'], $_POST['gallery-company'], $_POST['gallery-url'], $_FILES['gallery-image'], $_POST['gallery-handle'], $_POST['form-key'])) {

		if ($_SESSION['form_key'] != $_POST['form-key']) {
			echo 'Please don\'t post to this script. '.$remote.' != '.$ip;
			unset($_SESSION['form_key']);
		} else {
			$title 		= wp_strip_all_tags($_POST['gallery-title']);
			$company 	= wp_strip_all_tags($_POST['gallery-company']);
			$url 		= wp_strip_all_tags($_POST['gallery-url']);
			$handle 	= wp_strip_all_tags($_POST['gallery-handle']);
			$file 		= $_FILES['gallery-image'];

			if (strlen($title) < 3) {
				$error = 'Please enter a title for your submission';
			} else if (strlen($company) < 3) {
				$error = 'Please enter a company or developers name';
			} else if (strlen($url) < 3) {
				$error = 'Please enter a URL';
			} else {

				$post = array(
					'post_title' => $title,
					'post_type' => 'projects'
				);
				$id = wp_insert_post($post);

				update_field('company_name', $company, $id);
				update_field('url', $url, $id);
				update_field('twitter_handles', $handle, $id);

				// upload media
				require_once(ABSPATH.'wp-admin/includes/image.php');
          		require_once(ABSPATH.'wp-admin/includes/file.php');
          		require_once(ABSPATH.'wp-admin/includes/media.php');
				$attachment_id = media_handle_upload('gallery-image', $id);

				set_post_thumbnail($id, $attachment_id);

				$error = 1;

			}
		}
	}

	if ($display) {
		echo $error;
	}

?>