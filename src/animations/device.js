window.deviceAnimation = function(canvas, width, height) {
	var renderer = PIXI.autoDetectRenderer(width, height);
	var renderer = new PIXI.CanvasRenderer(width, height, {
		view: document.getElementById(canvas),
		transparent: false,
		autoResize: true,
      	backgroundColor: 0xe9eaed
	});

	var stage = new PIXI.Container();
	renderer.render(stage);
	var stagew = width, stageh = height;

	var circle = new PIXI.Graphics();
	circle.lineStyle(0);
	circle.beginFill(0xe91e63, 1);
	circle.drawCircle(stagew*0.5, stageh*0.5, 40);
	circle.endFill();
	
  	var circleTexture = circle.generateCanvasTexture();
  
	var lights = [];
	for (var i = 0; i < 30; i++) {
		var light = new PIXI.Sprite(circleTexture);//circle.clone();
		lights.push(light);
        light.anchor.set(0.5);
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
		
      	var rect = renderer.view.getBoundingClientRect();
		var height = (window.innerHeight || document.documentElement.clientHeight)
       
        if(rect.bottom < 50 || rect.bottom > height) {
          return;
        }
      	
		for (var i = 0; i < lights.length; i++) {
			var light = lights[i];
			
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