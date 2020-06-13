<?php

	require_once('wp/wp-config.php');
	$wp->init();

	if (isset($_GET['term']) && $_GET['term'] == 'masthead') {

		$urls = get_field('iframe_animations', 38);
		$arr = array();
		foreach($urls as $url) {
			$arr[] = $url['iframe_url'];
		}
		echo implode(',', $arr);

	} else {
		/*if (isset($_GET['term'])) {
			$term = $_GET['term'];
			$args = array(
				'posts_per_page' => 1,
				'post_type' => 'animation',
				'post_status' => 'publish',
				'orderby' => 'rand',
				'taxonomy' => 'area',
				'term' => $term
			);
		} else {
			$args = array(
				'posts_per_page' => 1,
				'post_type' => 'animation',
				'post_status' => 'publish',
				'orderby' => 'rand'
			);
		}

		$posts = get_posts($args);
		foreach($posts as $post):

			the_field('animation_code');

		endforeach;*/
		the_field('code', 38);

	}

?>