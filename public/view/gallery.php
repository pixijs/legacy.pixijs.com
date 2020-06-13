<?php if(!defined('APP_RUN')){ die(); } ?>
<?php
	$post = get_post(96); 

	global $error;
	$error = '';
?>
			<div class="submit-form">
				<img src="<?php echo $_root; ?>img/close.svg" class="close" width="23px" height="23px" />
				<?php include 'form.php'; ?>
			</div>

			<section class="gallery-submit">
				<p class="big-text ani-sft" data-delay="0" data-speed="0.5" data-animation="short-from-top">Do you have a PixiJS project you would like featured in our gallery?</p>
				<button class="button transparent ani-sfb show-submission" data-speed="0.5" data-animation="short-from-bottom">Submit</button>
			</section>

			<section class="projects">
				<div class="inner no-max">
					<h2 data-delay="0.3" data-speed="0.5" data-animation="short-from-bottom" class="underline ani-sfb"><?php echo $post->post_content; ?></h2>
				</div>
				<div class="project-list margin-top-20">
<?php
	$args = array(
		'posts_per_page' => -1,
		'post_type' => 'projects',
		'post_status' => 'publish',
		'orderby' => 'menu_order',
		'order' => 'DESC'
	);

	$posts = get_posts($args);
	setup_postdata($posts);

	$i = 0;
	foreach ($posts as $post) {
		//$image = wp_get_attachment_url(get_post_thumbnail_id($post->ID), 'large');
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
			</section>
