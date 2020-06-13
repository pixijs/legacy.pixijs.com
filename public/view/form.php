<?php
	session_start();
	$_SESSION['form_key'] = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 20);
?>
				<form method="post" action="<?php echo $_root; ?>submit" id="submit-form" enctype="multipart/form-data">
					<h3>Submit gallery</h3>
					<div class="inner">
						<div class="form-group gallery-company margin-top-20">
							<label class="control-label" for="gallery-company">Created by</label>
							<input type="text" class="form-control" id="gallery-company" name="gallery-company" placeholder="" value="<?php if (isset($_POST['gallery-company'])) echo $_POST['gallery-company']; ?>" />
						</div>
						<div class="form-group gallery-title margin-top-20">
							<label class="control-label" for="gallery-title">Project name</label>
							<input type="text" class="form-control" id="gallery-title" name="gallery-title" placeholder="" value="<?php if (isset($_POST['gallery-title'])) echo $_POST['gallery-title']; ?>" />
						</div>
						<div class="form-group gallery-url margin-top-20">
							<label class="control-label" for="gallery-url">URL</label>
							<input type="text" class="form-control" id="gallery-url" name="gallery-url" placeholder="" value="<?php if (isset($_POST['gallery-url'])) echo $_POST['gallery-url']; ?>" />
						</div>
						<div class="form-group gallery-handle margin-top-20">
							<label class="control-label" for="gallery-handle">Twitter handle of creators</label>
							<input type="text" class="form-control" id="gallery-handle" name="gallery-handle" placeholder="" value="<?php if (isset($_POST['gallery-handle'])) echo $_POST['gallery-handle']; ?>" />
							<i class="helper">For example @goodboydigital. We will tweet selected projects.</i>
						</div>
						<div class="image-upload-container">
							<div class="preview">Attach Screenshot</div>
							<div class="instructions">We accept 540x312px jpegs, no larger than 200kb.</div>
							<input type="file" name="gallery-image" id="gallery-image" name="gallery-image" accept="image/jpeg,image/jpg" />
						</div>

						<div class="text-center margin-top-20">
							<button class="button">Submit form</button>
<?php if ($error != '') { ?> <p class="margin-bottom-0 pink500"><?php echo $error; ?></p> <?php } ?>
						</div>
					</div>
					<input type="hidden" name="form-key" value="<?php echo $_SESSION['form_key']; ?>" />
				</form>

				<div class="success">
					<div class="inner">
						<h3>All done!</h3>
						<h4>Thank you for your submission. Follow us on Twitter <a href="http://www.twitter.com/goodboydigital" target="_blank">@goodboydigital</a> to keep up to date with all the latest additions to the PixiJS gallery.</h4>
					</div>
				</div>