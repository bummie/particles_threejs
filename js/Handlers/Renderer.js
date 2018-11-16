function Renderer()
{
    let self = this;

    self.scene = new THREE.Scene();
    self.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.001, 3000 );
    self.renderer = new THREE.WebGLRenderer({canvas: document.getElementById("mainCanvas"), antialias: true});
    self.controls = new THREE.OrbitControls( self.camera, self.renderer.domElement );

    self.reflectionCube = null; 

    self.particleSystems = [];
    self.externalForce = { x: 0.5, y: 0, z: 0 }; // Wind

    self.lastTime = Date.now();
    
    self.floorMaterial = new THREE.MeshBasicMaterial();
    self.floorMaterial.color = new THREE.Color( 0x2F2F2F );
    self.floor = new THREE.Mesh( new THREE.CubeGeometry( 200, 0.1, 200 ), self.floorMaterial );

    /**
     * Init stuff before update loop starts
     */
    self.init = function()
    {
        self.camera.position.z = 5;
        self.controls.update();

        self.initSkybox();
        self.scene.background = self.reflectionCube;
        
        self.floor.position.y = -3.5;
        self.scene.add(self.floor);

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
        
        self.updateWind();
        self.updateParticleSystems(deltaTime, self.externalForce);
		self.render();
        
        self.controls.update();
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
    }

    /**
     * Initializes all the particle systems
     */
    self.initParticleSystems = function()
    {
        self.particleSystems.push(new FlameSystem());
        self.particleSystems.push(new SmokeSystem());
        self.particleSystems.push(new ConfettiSystem());
        self.particleSystems.push(new SnowSystem());
        

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
}

