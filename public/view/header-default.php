<?php if(!defined('APP_RUN')){ die(); } ?>
		<header class="main-header <?php echo $_base; ?>">
<?php include 'sub-nav.php'; ?>
<?php include 'main-nav.php'; ?>
		</header>

		<header class="mobile-header <?php echo $_base; ?>">
			<div class="bar" style="background-image:url(<?php the_field('nav_logo', 38); ?>)">
				<div class="hamburger">
					<i id="line1"></i>
					<i id="line2"></i>
					<i id="line3"></i>
				</div>
			</div>
			<nav>
				<a href="<?php echo $_root; ?>" class="<?php if ($_base == 'home') echo 'current'; ?>">Home</a>
				<a href="https://github.com/pixijs/pixi.js" target="_blafk">Download</a>
				<a href="http://pixijs.github.io/examples/" target="_blank">Examples</a>
				<a href="<?php echo $_root; ?>gallery" class="<?php if ($_base == 'gallery') echo 'current'; ?>">Gallery</a>
				<div class="mobile-sub-nav">
					<a href="https://github.com/pixijs/pixi.js" target="_blank">Go to GitHub</a>
					<a href="<?php echo $_root; ?>faq">Go to FAQ</a>
					<a href="http://pixijs.github.io/docs/" target="_blank">Documentation</a>
					<a href="<?php echo $_root; ?>tutorials">Tutorials</a>
					<a href="http://www.html5gamedevs.com/forum/15-pixijs/" target="_blank">Game Dev Forum</a>
					<a href="http://www.goodboydigital.com/category/pixi-js/" target="_blank">Blog</a>
				</div>
				<a href="https://goodboydigital.workable.com/" target="_blank">Careers</a>
				<a href="<?php echo $_root; ?>consultancy" class="alt-nav-item <?php if ($_base == 'consultancy') echo 'current'; ?>" style="background-image: url(<?php echo $_root; ?>img/icon-default-gb.png)">Consultancy</a>
				<a href="https://www.patreon.com/user?ty=h&u=2384552" target="_blank" class="alt-nav-item" style="background-image: url(<?php echo $_root; ?>img/icon-default-patron.png)">Support Us</a>
			</nav>
		</header>
