function Renderer()
{
    let self = this;

    self.scene = new THREE.Scene();
    self.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.001, 3000 );
    self.renderer = new THREE.WebGLRenderer({canvas: document.getElementById("mainCanvas"), antialias: true});
    self.controls = new THREE.OrbitControls( self.camera, self.renderer.domElement );

    self.reflectionCube = null; 

	self.particleSystems = [];

	self.wind = new Wind();

    self.lastTime = Date.now();

    self.fireFlickDelay = 100;
    self.fireTimeCurrent = 0;
    
    /**
     * Init stuff before update loop starts
     */
    self.init = function()
    {
        self.camera.position.z = 5;
        self.controls.update();

        self.initSkybox();
    
        self.addSceneryObjects();

        self.initParticleSystems();
        self.initCameraControl();
        requestAnimationFrame(self.update);
    }

    /**
     * Updates every frame
     */
    self.update = function()
    {
		let now = Date.now();
        let deltaTime = (now - self.lastTime);
        
        self.controls.update();
		self.wind.update(deltaTime);
        self.updateParticleSystems(deltaTime, self.wind.externalForce);
        self.updateWindDirectionMesh();
        self.flickerFireLight(deltaTime);
        
        self.render();
		self.lastTime = now;
        requestAnimationFrame(self.update);
    }

    /**
     * Renders the scene to the canvas
     */
    self.render = function()
    {
        self.renderer.render(self.scene, self.camera);
    }

    /**
     * Inits the camera controller with settings
     */
    self.initCameraControl = function()
    {
        self.controls.enableDamping = true;
        self.controls.dampingFactor = 0.25;
        self.controls.screenSpacePanning = false;
        self.controls.minDistance = 0.5;
        self.controls.maxDistance = 100;
        self.controls.maxPolarAngle = Math.PI / 2;
    }

    /**
     * Initilializes the skybox textures
     */
    self.initSkybox = function()
    {
        let path = "./resources/textures/skybox/";
        let format = '.jpg';
        let urls = [
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
        ];

        self.reflectionCube = new THREE.CubeTextureLoader().load( urls );
        self.reflectionCube.format = THREE.RGBFormat;
        self.scene.background = self.reflectionCube;
    }

    /**
     * Initializes all the particle systems
     */
    self.initParticleSystems = function()
    {
        self.particleSystems.push(new FlameSystem({x: 0, y: -2, z: 0}));
        self.particleSystems.push(new SmokeSystem({x: 0, y: -2, z: 0}));
        self.particleSystems.push(new ConfettiSystem({x: 2.5, y: -2, z: 0}));
        self.particleSystems.push(new SnowSystem({x: 0, y: 15, z: 0}));

        for(let i = 0; i < self.particleSystems.length; i++)
        {
            self.particleSystems[i].init();
            self.scene.add( self.particleSystems[i].points );
        }
    }

    /**
     * Updates all the particles in the system
     */
    self.updateParticleSystems = function(deltaTime, externalForce)
    {
        for(let i = 0; i < self.particleSystems.length; i++)
        {
            self.particleSystems[i].update(deltaTime, externalForce);
        }
    }

    /**
     * Updates the wind direction
     */
    self.updateWind = function()
    {
        let maxWind = 3;

        if(self.externalForce.x > maxWind || self.externalForce.x < -maxWind ) { self.externalForce.x = 0; }
        if(self.externalForce.z > maxWind || self.externalForce.z < -maxWind ) { self.externalForce.z = 0; }

        self.externalForce.x += self.getRandomArbitrary(-1, 1);
        self.externalForce.z += self.getRandomArbitrary(-1, 1);
    }

	/**
     * Returns a random value between a minimum and maximum value
     */
    self.getRandomArbitrary = function(min, max) 
    {
		return Math.random() * (max - min) + min;
    }
    
    /**
     * Adds some objects to make the scenere look more nice
	 * Very ugly code below, be aware. 
     */
    self.addSceneryObjects = function()
    {
        // Basic cube used a floor
        let floorMaterial = new THREE.MeshPhongMaterial();
        floorMaterial.color = new THREE.Color( 0xAFB1BC );
        let floor = new THREE.Mesh( new THREE.CubeGeometry( 200, 0.1, 200 ), floorMaterial );
        floor.position.y = -2.3;
        self.scene.add(floor);

        // Stones around fire
        let firestoneMaterial = new THREE.MeshPhongMaterial();
        firestoneMaterial.color = new THREE.Color( 0x282121 );
        firestoneMaterial.shininess = 0;
        let stoneAmount = 12;
        let radius = 0.35;
        let part = 360 / stoneAmount;
        for(let i = 0; i < stoneAmount; i++)
        {
            let degrees = part * i;
            let stone = new THREE.Mesh( new THREE.SphereGeometry( 0.15, 8, 8 ), firestoneMaterial );
            stone.position.x = (radius * Math.cos(degrees));
            stone.position.y = -2;
            stone.position.z = (radius * Math.sin(degrees));

            self.scene.add(stone);
        }

        // WindDirection
        self.windArrowMaterial = new THREE.MeshPhongMaterial();
        self.windArrowMaterial.color = new THREE.Color( 0xFF0000 );

        self.windArrowMesh = new THREE.Mesh( new THREE.CylinderGeometry( 0.3, 0.1, 1, 8 ), self.windArrowMaterial );
        self.windArrowMesh.position.y = 0;
        self.windArrowMesh.position.x = -2;
        self.windArrowMesh.rotation.z = Math.PI/2;
        self.scene.add(self.windArrowMesh);
        
        // Confettibox
        let confettiboxMaterial = new THREE.MeshPhongMaterial();
        confettiboxMaterial.color = new THREE.Color( 0xF1F5A4 );
        let confettiBox = new THREE.Mesh( new THREE.CubeGeometry( 0.5, 1, 0.5 ), confettiboxMaterial );
        confettiBox.position.y = -2;
        confettiBox.position.x = 2.5;
        self.scene.add(confettiBox);

        //Fire light
        self.fireLight = new THREE.PointLight( 0xF9D57D, 1, 10 );
        self.fireLight.position.set( 0, 0, 0 );
        self.scene.add( self.fireLight );

        // Ambient light
        var light = new THREE.AmbientLight( 0x404040 ); // soft white light
        self.scene.add( light );
    }

    /**
     * Updates the wind direction with scale and angle based on wind
     */
    self.updateWindDirectionMesh = function()
    {
        self.windArrowMesh.rotation.y = Math.atan2(self.wind.externalForce.x, self.wind.externalForce.z) - Math.PI/2;
        self.windArrowMesh.scale.y = self.wind.windStrength;
    }

    /**
     * Makes the firelight flicker
     */
    self.flickerFireLight = function(deltaTime)
    {
        self.fireTimeCurrent += deltaTime;

        if(self.fireTimeCurrent >= self.fireFlickDelay)
        {
            self.fireLight.intensity += self.getRandomArbitrary(-0.1, 0.1);
            self.fireTimeCurrent = 0;
            self.fireFlickDelay = self.getRandomArbitrary(100, 350);

            if(self.fireLight.intensity <= 1.8) { self.fireLight.intensity = 2; }
            if(self.fireLight.intensity > 2.2) { self.fireLight.intensity = 2; }
        }
    }
}

