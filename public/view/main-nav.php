<?php if(!defined('APP_RUN')){ die(); } ?>
			<nav class="main-nav">
				<a href="<?php echo $_root; ?>" class="pixi-logo" style="background-image:url(<?php the_field('nav_logo', 38); ?>)"><img src="<?php echo $_root; ?>img/blank.gif" alt="PixiJS Logo" /></a>
				<div class="inner">
					<a href="https://github.com/pixijs/pixi.js" target="_blank" class="main-nav-item">Download</a>
					<a href="http://pixijs.github.io/examples/" target="_blank" class="main-nav-item">Examples</a>
					<a href="<?php echo $_root; ?>gallery" class="main-nav-item <?php if ($_base == 'gallery') echo 'current'; ?>">Gallery</a>
					<div class="main-nav-item has-children <?php if ($_base == 'faq' || $_base == 'tutorials') echo 'current'; ?>">Resources</div>
					<a href="https://goodboydigital.workable.com/" target="_blank" class="main-nav-item">Careers</a>

					<a href="<?php echo $_root; ?>consultancy" class="alt-nav-item <?php if ($_base == 'consultancy') echo 'current'; ?>" style="background-image: url(<?php echo $_root; ?>img/icon-default-gb.png)">Consultancy</a>
					<a href="https://opencollective.com/pixijs" target="_blank" class="alt-nav-item" style="background-image: url(<?php echo $_root; ?>img/icon-default-patron.png)">Support Us</a>
				</div>
			</nav>
