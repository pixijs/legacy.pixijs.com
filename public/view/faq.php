<?php if(!defined('APP_RUN')){ die(); } ?>
			<section class="faqs">
				<div class="inner">
					<h2 data-delay="0" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb">FAQ</h2>

					<div class="faq-list ani-sfb" data-delay="0.1" data-speed="0.5" data-animation="short-from-bottom">

<?php
	$taxonomy = 'faq_section';
	$tax_terms = get_terms($taxonomy);
	foreach ($tax_terms as $tax_term) {
?>
						<h4><?php echo $tax_term->name; ?></h4>
						<ul>
<?php
		$args = array(
			'posts_per_page' => -1,
			'post_type' => 'faqs',
			'post_status' => 'publish',
			'orderby' => 'menu_order',
			'order' => 'DESC',
			'taxonomy' => $taxonomy,
			'term' => $term->slug
		);

		$posts = get_posts($args);
		setup_postdata($posts);

		$i = 1;
		foreach ($posts as $post) {
?>
							<li>
								<p class="mono num"><?php echo str_pad($i, 2, "0", STR_PAD_LEFT); ?>/</p>
								<h6><?php the_title(); ?></h6>
								<div class="indicator">
									<i class="h"></i><i class="v"></i>
								</div>
								<p class="big-text"><?php the_field('answer'); ?></p>
							</li>
<?php
			$i++;
		}
?>
						</ul>
<?php
	}
?>
					</div>
				</div>
			</section>
