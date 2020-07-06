window.deviceAnimation = function(canvas, width, height) {

	var renderer = PIXI.autoDetectRenderer(width, height);
	//document.body.appendChild(renderer.view);
	var renderer = new PIXI.CanvasRenderer(width, height, {
		view: document.getElementById(canvas),
		transparent: false,
		autoResize: true
	});

	/*
	// create the root of the scene graph
	var stage = new PIXI.Container();

	// holder to store the aliens
	var aliens = [];

	var totalDudes = 20;

	for (var i = 0; i < totalDudes; i++)
	{
		// create a new Sprite that uses the image name that we just generated as its source
		var dude =  PIXI.Sprite.fromImage('tmp/eggHead.png');

		// set the anchor point so the texture is centerd on the sprite
		dude.anchor.set(0.5);

		// set a random scale for the dude - no point them all being the same size!
		dude.scale.set(0.8 + Math.random() * 0.3);

		// finally lets set the dude to be at a random position..
		dude.position.x = Math.random() * renderer.width;
		dude.position.y = Math.random() * renderer.height;

		dude.tint = Math.random() * 0xFFFFFF;

		// create some extra properties that will control movement :
		// create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
		dude.direction = Math.random() * Math.PI * 2;

		// this number will be used to modify the direction of the dude over time
		dude.turningSpeed = Math.random() - 0.8;

		// create a random speed for the dude between 0 - 2
		dude.speed = 2 + Math.random() * 2;

		// finally we push the dude into the aliens array so it it can be easily accessed later
		aliens.push(dude);

		stage.addChild(dude);
	}

	// create a bounding box for the little dudes
	var dudeBoundsPadding = 100;
	var dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding,
										-dudeBoundsPadding,
										renderer.width + dudeBoundsPadding * 2,
										renderer.height + dudeBoundsPadding * 2);

	var tick = 0;

	requestAnimationFrame(animate);

	function animate() {

		// iterate through the dudes and update their position
		for (var i = 0; i < aliens.length; i++)
		{
			var dude = aliens[i];
			dude.direction += dude.turningSpeed * 0.01;
			dude.position.x += Math.sin(dude.direction) * dude.speed;
			dude.position.y += Math.cos(dude.direction) * dude.speed;
			dude.rotation = -dude.direction - Math.PI / 2;

			// wrap the dudes by testing their bounds...
			if (dude.position.x < dudeBounds.x)
			{
				dude.position.x += dudeBounds.width;
			}
			else if (dude.position.x > dudeBounds.x + dudeBounds.width)
			{
				dude.position.x -= dudeBounds.width;
			}

			if (dude.position.y < dudeBounds.y)
			{
				dude.position.y += dudeBounds.height;
			}
			else if (dude.position.y > dudeBounds.y + dudeBounds.height)
			{
				dude.position.y -= dudeBounds.height;
			}
		}

		// increment the ticker
		tick += 0.1;

		// time to render the stage!
		renderer.render(stage);

		// request another animation frame...
		requestAnimationFrame(animate);
	}
	*/
	var stage = new PIXI.Container();

	var stagew = width, stageh = height;

	var circle = new PIXI.Graphics();
	circle.lineStyle(0);
	circle.beginFill(0xffffff, 1);
	circle.drawCircle(stagew*0.5, stageh*0.5, 20);
	circle.endFill();
	
	var lights = [];
	for (var i = 0; i < 100; i++) {
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

	animate();
}
