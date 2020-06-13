<?php if(!defined('APP_RUN')){ die(); } ?>

<?php global $error; include 'php/submit.php'; ?>
			<section class="projects">
				<div class="inner no-max">
					<h2>Submit your project</h2>
				</div>
<?php
	if ($error != 1) { // Successfull
?>
				<div class="inner inline-submit-form-success">
					<h4>Thank you for your submission.</h4>
					<p class="big-text">Once verified your project will appear in the gallery.</p>
					<a href="<?php echo $_root; ?>gallery" class="button">View Gallery</a>
				</div>
<?php
	} else { // End Successfull
?>
				<div class="inline-submit-form">
<?php
		include 'view/form.php';
?>
				</div>
<?php
	} // End Show form
?>
			</section>
