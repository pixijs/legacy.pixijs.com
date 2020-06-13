<?php if(!defined('APP_RUN')){ die(); } ?>
		</article>
		<footer class="main-footer">
			<div class="inner">
				<div class="row">
					<div class="col-8">
						<a href="http://www.goodboydigital.com/" target="_blank" class="goodboy-logo"><img src="<?php echo $_root; ?>img/blank.gif" alt="goodboy logo" /></a>
						<p>&copy; <?php echo date('Y'); ?> Goodboy Digital Ltd. All Rights Reserved</p>
						<p>A labour of love built by Mat Groves <a href="https://twitter.com/doormat23" target="_blank">@doormat23</a> and the <a href="https://github.com/pixijs/pixi.js" target="_blank">PixiJS team</a>.</p>
					</div>
					<div class="col-4">
						<nav class="social-links">
							<a href="https://twitter.com/goodboydigital" target="_blank" class="twitter"><i class="fa fa-twitter"></i></a>
							<a href="https://www.facebook.com/goodboydigital" target="_blank" class="facebook"><i class="fa fa-facebook"></i></a>
						</nav>
						<h6>
							<a href="http://www.twitter.com/#pixijs" target="_blank">#PixiJS</a>
							<div class="prev">
								<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 23 14" xml:space="preserve"><line x1="0" y1="7" x2="7" y2="1" /><line x1="0" y1="7" x2="7" y2="13" /><line x1="0" y1="7" x2="23" y2="7" /></svg>
							</div>
							<div class="next">
								<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 23 14" xml:space="preserve"><line x1="22" y1="7" x2="16" y2="1" /><line x1="22" y1="7" x2="16" y2="13" /><line x1="0" y1="7" x2="23" y2="7" /></svg>
							</div>
						</h6>
						<ul class="twitter-feed">
						</ul>
					</div>
				</div>
			</div>
		</footer>
<?php
	global $error;
	$error = '';
?>
<?php /*if ($_base == 'home' || $_base == 'gallery') { ?>
		<div class="submit-modal">
			<div class="window">
				<i class="close-modal">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30" xml:space="preserve"><line x1="0" y1="0" x2="30" y2="30" /><line x1="0" y1="30" x2="30" y2="0" /></svg>
				</i>
				<h6 class="bold margin-top-20 margin-bottom-0">Submit your project to our gallery</h6>
<?php include 'view/form.php'; ?>
				<div class="success">
					<div class="text-center">
						<h4>Thank you for your submission.</h4>
						<p class="big-text">Once verified your project will appear in the gallery.</p>
						<button class="close button">Close</button>
					</div>
				</div>
			</div>
		</div>
<?php }*/ ?>

		<input type="hidden" id="site-root" value="<?php echo $_root; ?>" />
		<input type="hidden" id="site-base" value="<?php echo $_base; ?>" />
		<input type="hidden" id="site-category" value="<?php echo $_category; ?>" />
	<?php if ($offline) { ?>
		<script src="<?php echo $_root; ?>offline/jquery-1.12.0.min.js"></script>
	<?php } else { ?>
		<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
	<?php } ?>
		<script src="<?php echo $_root; ?>js/pixi.min.js?v=<?php echo $version; ?>"></script>
		<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-80710473-1', 'auto');
		ga('send', 'pageview');
		</script>
	</body>
</html>