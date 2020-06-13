<?php if(!defined('APP_RUN')){ die(); } ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title><?php echo $_title; ?></title>
		<meta name="description" content="<?php echo $_description; ?>">
		<meta name="format-detection" content="telephone-no">
		<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width, minimal-ui">
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="format-detection" content="telephone=no">
		<meta property="og:url" content="http://www.pixijs.com/<?php echo $_base; ?>">
		<meta property="og:image" content="http://www.pixijs.com/img/facebook.png">
		<meta property="og:image:width" content="470">
		<meta property="og:image:height" content="470">
		<meta property="og:type" content="website">
		<meta property="og:title" content="<?php echo $_title; ?>">
		<meta property="og:description" content="<?php echo $_description; ?>">
		<link rel="icon" type="image/gif" href="<?php echo $_root; ?>img/favicon.png">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
		<link rel="stylesheet" href="<?php echo $_root; ?>css/pixi.css?v=<?php echo $version; ?>">
<?php if ($_base == 'home' || $_base == 'consultancy') { ?>
		<?php if ($offline) { ?>
		<link rel="stylesheet" href="?php echo $_root; ?>offline/flickity.min.css">
		<?php } else { ?>
		<link rel="stylesheet" href="https://npmcdn.com/flickity@1.2/dist/flickity.min.css">
		<?php } ?>
<?php } ?>
		<script src="<?php echo $_root; ?>js/modernizr.custom.min.js"></script>
		<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		<script>
			(adsbygoogle = window.adsbygoogle || []).push({
				google_ad_client: "pub-4447648765111291",
				enable_page_level_ads: true
			});
		</script>
	</head>
	<body class="<?php echo $_base; ?>">
<?php
	if ($_base == 'home') include 'header-home.php';
	include 'header-default.php';
?>
		<article class="main-content">
