<?php
	ob_start('ob_gzhandler');

	header('X-UA-Compatible: IE=edge,chrome=1');
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	date_default_timezone_set('Europe/London');
	define('APP_RUN', true);

	// Escape all vars
	if (isset($_GET)) {
		foreach ($_GET as $key => $value) {
			$_GET[$key] = htmlspecialchars(strip_tags($value));
		}
	}

	$_server = isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'live';
	if ($_server == 'localhost') {
		$_root = '/pixijs/bin/';
	} else {
		$_root = '/';
	}

	require_once('wp/wp-config.php');
	$wp->init();
	$wp->parse_request();
	$wp->query_posts();
	$wp->register_globals();

	$_base = isset($_GET['base']) ? strip_tags($_GET['base']) : '';
	$_base = str_replace('/', '', $_base);	
	if ($_base == '') $_base = 'home';

	$_category = isset($_GET['category']) ? strip_tags($_GET['category']) : '';

	$version = '1.0.1';
	$offline = false;

	$_title = 'PixiJS';
	$_description = 'PixiJS - The HTML5 Creation Engine. Create beautiful digital content with the fastest, most flexible 2D WebGL renderer.';

	if ($_base == 'consultancy') {
		$_title = 'Consultancy - PixiJS';
		$_description = "Whether it's product optimisation, multiplatform advice or collaborative project scoping, PixiJS creator and Goodboy Technical Partner Mat Groves and the Goodboy Team are on hand to help you out.";
	}
	if ($_base == 'gallery') {
		$_title = 'Gallery - PixiJS';
		$_description = 'PixiJS Inspiration from Around the World.';
	}
	if ($_base == 'faq') {
		$_title = 'FAQ - PixiJS';
		$_description = 'Find answers to the most common PixiJS questions here.';
	}
	if ($_base == 'tutorials') {
		$_title = 'Tutorials - PixiJS';
		$_description = 'Get started using PixiJS.';
	}

	include 'view/header.php';
	if (file_exists('view/'.$_base.'.php'))
		include 'view/'.$_base.'.php';
	else
		include 'view/404.php';
	include 'view/footer.php';

	ob_flush();
?>