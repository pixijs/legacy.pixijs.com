<?php if(!defined('APP_RUN')){ die(); } ?>
			<section class="brand-logos">
				<p class="big-text"><?php the_field('brands_header', 38); ?></p>
				<div class="inner">
					<div class="mask">
<?php
	$logos = get_field('brands_logos', 38);
	foreach ($logos as $logo) {
?>
						<div style="background-image:url(<?php echo $logo['url']; ?>);" class="logo"></div>
<?php
	}
?>
					</div>
				</div>
			</section>

			<section class="features">
				<div class="row">
					<div class="col">
						<span class="num">01</span>
						<h3 class="underline"><?php the_field('main_features_header_1', 38); ?></h3>
						<h6><?php the_field('main_features_description_1', 38); ?></h6>
					</div>
					<div class="col">
						<span class="num">02</span>
						<h3 class="underline"><?php the_field('main_features_header_2', 38); ?></h3>
						<h6><?php the_field('main_features_description_2', 38); ?></h6>
					</div>
					<div class="col">
						<span class="num">03</span>
						<h3 class="underline"><?php the_field('main_features_header_3', 38); ?></h3>
						<h6><?php the_field('main_features_description_3', 38); ?></h6>
					</div>
				</div>
				<div class="devices">
					<div class="device desktop" data-delay="0">
						<img src="img/device-desktop.png" alt="Desktop" />
						<canvas id="device-desktop-canvas"></canvas>
					</div>
					<div class="device ipad" data-delay="0.15">
						<img src="img/device-ipad.png" alt="iPad" />
						<canvas id="device-ipad-canvas"></canvas>
					</div>
					<div class="device iphone" data-delay="0.45">
						<img src="img/device-iphone.png" alt="iPhone" />
						<canvas id="device-iphone-canvas"></canvas>
					</div>
					<div class="device phone" data-delay="0.75">
						<img src="img/device-phone.png" alt="Phone" />
						<canvas id="device-phone-canvas"></canvas>
					</div>
					<div class="device laptop" data-delay="0.3">
						<img src="img/device-laptop.png" alt="Laptop" />
						<canvas id="device-laptop-canvas"></canvas>
					</div>
					<div class="device tablet" data-delay="0.6">
						<img src="img/device-tablet.png" alt="Tablet" />
						<canvas id="device-tablet-canvas"></canvas>
					</div>
				</div>
				<div class="button-center calc">
					<a href="#features-list" class="button outline" data-delay="0.9">All features</a>
				</div>
			</section>
			
			<section class="info-block">
				<img src="img/dotjs-logo.png" alt="dotJS Logo" class="dotjs" />
				<span class="type_8"><?php the_field('dotjs_header', 38); ?>&nbsp;</span>
				<span class="type_9"> - <?php the_field('dotjs_description', 38); ?></span>
			</section>

			<section class="projects">
				<div class="inner">
					<h2 data-delay="0" data-speed="0.5" data-animation="short-from-bottom" class="underline ani-sfb"><?php the_field('gallery_header', 38); ?></h2>
					<h5 data-delay="0.15" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb"><?php the_field('gallery_description', 38); ?></h5>
				</div>
				<div class="project-list">

<?php
	$args = array(
		'posts_per_page' => 3,
		'post_type' => 'projects',
		'post_status' => 'publish',
		'orderby' => 'rand', /* menu_order */
		//'order' => 'DESC',
		'meta_key' => 'display',
		'meta_value' => 'featured'
	);

	$posts = get_posts($args);

	$args = array(
		'posts_per_page' => 1,
		'post_type' => 'projects',
		'post_status' => 'publish',
		'orderby' => 'rand',
		//'order' => 'DESC',
		'meta_key' => 'display',
		'meta_value' => 'goodboy'
	);

	$posts = array_merge($posts, get_posts($args));
	shuffle($posts);/**/
	
	setup_postdata($posts);

	$i = 0;
	foreach ($posts as $post) {
		//$image = wp_get_attachment_url(get_post_thumbnail_id($post->ID), 'thumbnail');
		$image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'large');
		$image = $image[0];
?>
					<div class="project ani-lfr" data-delay="<?php echo 0.3 + ($i*0.2); ?>" data-speed="0.35" data-animation="long-from-right">
						<a href="<?php the_field('url'); ?>" target="_blank">
							<div class="thumbnail" style="background-image:url(<?php echo $image; ?>)"></div>
							<div class="description">
								<h5><?php the_title(); ?></h5>
								<p class="big-text"><?php the_field('company_name'); ?></p>
							</div>
						</a>
					</div>
<?php
		$i++;
	}
?>
				</div>
				<div class="button-container margin-top-5">
					<a href="gallery" class="button transparent border-after">View all</a>
					<a href="gallery/submit" class="button transparent show-submission">Submit Project</a>
				</div>
			</section>

			<section class="consultancy">
				<i class="valign"></i>
				<div class="content">
					<div class="inner">
						<h3 data-delay="0" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb"><?php the_field('consultancy_header', 38); ?></h3>
						<h5 data-delay="0.15" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb"><?php the_field('consultancy_description', 38); ?></h5>

						<div class="button-container">
							<a data-delay="0.3" data-speed="0.5" data-animation="short-from-bottom" href="consultancy#contact-form" class="button fixed white ani-sfb">Get in touch</a>
							<a data-delay="0.45" data-speed="0.5" data-animation="short-from-bottom" href="consultancy" class="button fixed outline ani-sfb">Learn more</a>
						</div>
					</div>
				</div>
			</section>

			<section class="support">
				<i class="bg-1"></i>
				<i class="bg-2"></i>
				<div class="inner">
					<h3 data-delay="0" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb"><?php the_field('patron_header', 38); ?></h3>
					<div data-delay="0.15" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb">
						<h5><?php the_field('patron_description', 38); ?></h5>
					</div>
					<?php /*<ul class="patrons ani-sfb" data-delay="0.3" data-speed="0.5" data-animation="short-from-bottom">
						<li class="text-right">
							<span id="patreon-count"></span><small>Patrons</small>
						</li>
						<li class="sep">/</li>
						<li>
							<span id="patreon-total"></span><small>per month</small>
						</li>
					</ul>*/ ?>
					<a href="https://opencollective.com/pixijs" target="_blank" class="button white blue-text ani-sfb" data-delay="0.45" data-speed="0.5" data-animation="short-from-bottom">Make a DONATION</a>
				</div>
			</section>

			<section class="features-list" id="features-list">
				<h2 class="underline ani-sfb" data-delay="0" data-speed="0.5" data-animation="short-from-bottom">PixiJS Features</h2>
				<div class="inner">
<?php
	$args = array(
		'posts_per_page' => -1,
		'post_type' => 'features',
		'post_status' => 'publish',
		'orderby' => 'menu_order',
		'order' => 'DESC'
	);

	$posts = get_posts($args);

	// split into 2 halves
	list($p1, $p2) = array_chunk($posts, ceil(count($posts) / 2));

?>
					<ul class="features-col left-col">
<?php
	$i = 0;
	foreach ($p1 as $post) {
		$image = wp_get_attachment_url(get_post_thumbnail_id($post->ID), 'thumbnail');
?>
						<li data-delay="<?php echo $i; ?>">
							<img src="<?php echo $image; ?>" alt="<?php echo $post->post_title; ?> graphic" />
							<div class="text">
								<h6 class="bold"><?php echo $post->post_title; ?></h6>
								<p class="big-text"><?php the_field('description', $post->ID); ?></p>
							</div>
<?php
		$i += 0.2;
	}
?>
					</ul>
					<ul class="features-col right-col">
<?php
	$i = 0.1;
	foreach ($p2 as $post) {
		$image = wp_get_attachment_url(get_post_thumbnail_id($post->ID), 'thumbnail');
?>
						<li data-delay="<?php echo $i; ?>">
							<img src="<?php echo $image; ?>" alt="<?php echo $post->post_title; ?> graphic" />
							<div class="text">
								<h6 class="bold"><?php echo $post->post_title; ?></h6>
								<p class="big-text"><?php the_field('description', $post->ID); ?></p>
							</div>
<?php
		$i += 0.2;
	}
?>
					</ul>
				</div>
			</section>

			<section class="get-started">
				<div class="inner">
					<h3 data-delay="0" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb"><?php the_field('started_header', 38); ?></h3>
					<div data-delay="0.15" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb">
						<h5><?php the_field('started_description', 38); ?></h5>
					</div>
				</div>
				<div class="button-container">
					<a href="https://github.com/GoodBoyDigital/pixi.js" target="_blank" class="button fixed ani-sfb" data-delay="0.3" data-speed="0.5" data-animation="short-from-bottom">Download</a>
					<a href="<?php $_root; ?>tutorials" class="button fixed outline pink ani-sfb" data-delay="0.45" data-speed="0.5" data-animation="short-from-bottom">Get Started</a>
				</div>
			</section>
