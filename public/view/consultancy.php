<?php if(!defined('APP_RUN')){ die(); } ?>
			<header class="consultancy-header" style="background-image:url(<?php the_field('consultancy_background', 133); ?>)">
				<i class="valign"></i>
				<div class="content">
					<div class="inner">
						<h1 data-delay="0" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb"><?php the_field('consultancy_header', 133); ?></h1>
						<h4 data-delay="0.1" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb"><?php the_field('consultancy_description', 133); ?></h4>
						<a href="#contact-form" data-delay="0.2" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb button">Get in touch</a>
					</div>
				</div>
			</header>

			<section class="services">
				<div class="inner">
					<h2 data-delay="0" data-speed="0.5" data-animation="short-from-bottom" class="underline ani-sfb"><?php the_field('services_header', 133); ?></h2>
					<h5 data-delay="0.1" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb"><?php the_field('services_description', 133); ?></h5>
				</div>

				<div class="inner big-inner">
					<ul class="services-list">
<?php
	$services = get_field('services', 133);
	$i = 0.2;
	foreach ($services as $service) {
?>
						<li data-delay="<?php echo $i; ?>" data-speed="0.5" data-animation="short-from-right" class="ani-sfr">
							<div class="border">
								<img src="<?php echo $service['icon']; ?>" alt="<?php echo $service['title']; ?>" class="icon" />
								<h6 class="bold"><?php echo $service['title']; ?></h6>
								<p class="big-text"><?php echo $service['description']; ?></p>
							</div>
						</li>
<?php
		$i += 0.1;
	}
?>
					</ul>
				</div>
			</section>

			<section class="testimonials">
				<h6 class="bold ani-sft" data-delay="0" data-speed="0.5" data-animation="short-from-top"><?php the_field('testimonials_headline', 133); ?></h6>
				<div class="mask ani-sfb" data-delay="0.25" data-speed="0.5" data-animation="short-from-bottom">
<?php
	$testimonials = get_field('testimonials', 133);
	foreach ($testimonials as $testimonial) {
?>
					<div class="testimonial">
						<div class="avatar">
							<img src="<?php echo $testimonial['profile_picture']; ?>" alt="" />
						</div>
						<div class="text">
							<blockquote><?php echo $testimonial['quote']; ?></blockquote>
							<h6><strong><?php echo $testimonial['name']; ?></strong></h6>
							<p class="big-text"><?php echo $testimonial['company']; ?></p>
						</div>
					</div>
<?php
	}
?>
				</div>
			</section>

			<section class="production-servives" style="background-image:url(<?php the_field('goodboy_background', 133); ?>)">
				<div class="inner">
					<h3 data-delay="0" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb"><?php the_field('goodboy_header', 133); ?></h3>
					<h6 data-delay="0.1" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb"><?php the_field('goodboy_description', 133); ?></h6>
					<a href="http://www.goodboydigital.com" target="_blank" class="button ani-sfb" data-delay="0.2" data-speed="0.5" data-animation="short-from-bottom"><?php the_field('goodboy_call_to_action', 133); ?></a>
				</div>
			</section>

<?php include 'php/contact.php'; global $error; ?>
			<section class="contact" id="contact-form">
				<div class="inner">
					<h3 data-delay="0" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb"><?php the_field('contact_header', 133); ?></h3>
					<h6 data-delay="0.1" data-speed="0.5" data-animation="short-from-bottom" class="ani-sfb"><?php the_field('contact_copy', 133); ?></h6>
					
					<form method="post">
						<div class="row">
							<div class="col-6">
								<div class="form-group ani-sfr form-name" data-delay="0.2" data-speed="0.5" data-animation="short-from-right">
									<label class="control-label" for="form-name">Your name</label>
									<input type="text" class="form-control" id="form-name" placeholder="" />
								</div>
							</div>
							<div class="col-6">
								<div class="form-group ani-sfr form-email" data-delay="0.3" data-speed="0.5" data-animation="short-from-right">
									<label class="control-label" for="form-email">Your email</label>
									<input type="text" class="form-control" id="form-email" placeholder="" />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12 ani-sfr" data-delay="0.4" data-speed="0.5" data-animation="short-from-right">
								<div class="form-group form-group-textarea form-message">
									<label class="control-label" for="form-message">Your message</label>
									<textarea class="form-control" id="form-message" placeholder="" rows="3"></textarea>
								</div>
							</div>
						</div>
						<div class="text-center ani-sfr" data-delay="0.5" data-speed="0.5" data-animation="short-from-right">
							<button class="button">Submit form</button>
<?php if ($error != '') { ?> <p class="margin-bottom-0 pink500"><?php echo $error; ?></p> <?php } ?>
						</div>
					</form>
				</div>
			</section>
