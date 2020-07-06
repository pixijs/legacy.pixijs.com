window.homeHeaderAnimation = function() {
	var renderer = new PIXI.CanvasRenderer(800, 600, {
		view: document.getElementById("pixi-demo"),
		transparent: false,
		autoResize: true
	});

	var stage = new PIXI.Container();

	var stagew = 0, stageh = 0;
	resize();

	var circle = new PIXI.Graphics();
	circle.lineStyle(0);
	circle.beginFill(0xffffff, 1);
	circle.drawCircle(stagew*0.5, stageh*0.5, 20);
	circle.endFill();
	
	var lights = [];
	for (var i = 0; i < 500; i++) {
		var light = circle.clone();
		lights.push(light);
		var scale = (Math.random() * 0.5) - 0.5;
		light.scale.x = scale;
		light.scale.y = scale;
		light.alpha = 0;
		light.x = Math.random() * stagew;
		light.y = Math.random() * stageh;
		light.tx = (Math.random() * 2) - 1;
		light.ty = (Math.random() * 2) - 1;
		light.direction = Math.random() * Math.PI * 2;
		light.turningSpeed = Math.random() - 0.8;
		light.speed = Math.random() * 2;
		light.ma = 0.5 - (Math.random() * 0.3);
		light.ms = Math.random() / 300;
		light.md = 1;
		stage.addChild(light);
	}

	var padding = 100;
	var bounds = new PIXI.Rectangle(-padding, -padding, renderer.width + padding * 2, renderer.height + padding * 2);

	function animate() {
		requestAnimationFrame(animate);
		
		for (var i = 0; i < lights.length; i++) {
			var light = lights[i];
			/*light.x += light.tx;
			light.y += light.ty;*/

			light.direction += light.turningSpeed * 0.01;
			light.x += Math.sin(light.direction) * light.speed;
			light.y += Math.cos(light.direction) * light.speed;
			light.rotation = -light.direction - Math.PI / 2;

			if (light.position.x < bounds.x) {
				light.position.x += bounds.width;
			} else if (light.position.x > bounds.x + bounds.width) {
				light.position.x -= bounds.width;
			}

			if (light.position.y < bounds.y) {
				light.position.y += bounds.height;
			} else if (light.position.y > bounds.y + bounds.height) {
				light.position.y -= bounds.height;
			}

			light.alpha += light.md * light.ms;
			if (light.alpha >= light.ma || light.alpha <= 0) {
				light.md *= -1;
			}
		}

		renderer.render(stage);
	}

	function resize () {
		stagew = document.getElementById('homepage-header').offsetWidth,
		stageh = document.getElementById('homepage-header').offsetHeight;
		renderer.resize(stagew, stageh);
	};

	window.onresize = resize;

	animate();
};