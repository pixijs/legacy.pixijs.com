<?php if(!defined('APP_RUN')){ die(); } ?>
			<section class="tutorials">
				<div class="inner">
					<h2 data-delay="0" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb">Tutorials</h2>

					<div class="row">
						<div class="col-8 ani-sfb" data-delay="0.1" data-speed="0.5" data-animation="short-from-bottom">
							<div class="list">
								<h4>Community Tutorials</h4>
								<ul>
<?php
	$args = array(
		'posts_per_page' => -1,
		'post_type' => 'tutorial',
		'post_status' => 'publish',
		'orderby' => 'date',
		'order' => 'ASC'
	);

	$posts = get_posts($args);
	setup_postdata($posts);

	$i = 0;
	foreach ($posts as $post) {
?>
									<li>
										<?php /*<a href="tutorials/<?php echo $post->post_name; ?>">*/ ?>
										<a href="<?php the_field('external_url', $post->ID); ?>" target="_blank">
											<p class="mono num"><?php echo str_pad($i+1, 2, "0", STR_PAD_LEFT); ?>/</p>
											<div class="details">
												<h6 class="mono"><?php the_title(); ?></h6>
												<p class="mono author">_by <?php the_field('author', $post->ID); ?></p>
												<p class="date small-text">Added <?php echo date('F j Y', strtotime($post->post_date)); ?></p>
											</div>
										</a>
									</li>
<?php
		$i++;
	}
?>
								</ul>
							</div>
						</div>
						<div class="col-4 ani-sfb" data-delay="0.2" data-speed="0.5" data-animation="short-from-bottom">
							<div class="books">
								<!-- <h4>Books</h4> -->
<?php
	$books = get_field('books', 123);
	$m = 0;
	$i = 1;
	foreach ($books as $book) {
?>
								<a href="<?php echo $book['url']; ?>" target="_blank" class="margin-top-<?php echo $m; ?> book-<?php echo $i; ?>">
									<h4><?php echo $book['type_header']; ?></h4>
									<h6 class="mono"><?php echo $book['book_title']; ?>
									</h6>
									<p class="mono author">_by <?php echo $book['author_name']; ?></p>
									<p class="date small-text">Published <?php echo date('F Y', strtotime($book['date_published'])); ?></p>
								</a>
<?php
		$m = 20;
		$i++;
	}
?>
							</div>
						</div>
					</div>
				</div>
			</section>
