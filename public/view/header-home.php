<?php if(!defined('APP_RUN')){ die(); } ?>
		<header class="homepage-header" id="homepage-header">
			<a class="github-fork-ribbon top-right fixed" href="https://github.com/pixijs/pixi.js" title="Fork me on GitHub">Fork me on GitHub</a>
<?php include 'sub-nav.php'; ?>
<?php include 'main-nav.php'; ?>
			<!-- <canvas id="pixi-demo"></canvas> -->
			<iframe class="animation" id="iframe-animation"></iframe>
			<i class="valign"></i>
			<div class="welcome">
				<div class="inner">
					<img src="img/blank.gif" alt="PixiJS Logo" class="pixijs-logo" style="background-image:url(<?php the_field('header_logo', 38); ?>)" />
					<h1><?php the_field('header_header', 38); ?></h1>
					<h4><?php the_field('header_copy', 38); ?></h4>
					<a href="https://github.com/GoodBoyDigital/pixi.js" target="_blank" class="button fixed">Download</a>
					<a href="<?php $_root; ?>tutorials" class="button fixed outline">Get Started</a>
					<h6>Created by <a href="http://www.goodboydigital.com/" target="_blank"><img src="img/blank.gif" alt="goodboy logo" class="goodboy" /></a></h6>
				</div>
			</div>
			<iframe class="counter" src="https://ghbtns.com/github-btn.html?user=pixijs&repo=pixi.js&type=star&count=true" frameborder="0" scrolling="0" width="100px" height="20px"></iframe>
		</header>
