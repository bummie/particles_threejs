function Renderer()
{
    let self = this;

    self.scene = new THREE.Scene();
    self.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    self.renderer = new THREE.WebGLRenderer({canvas: document.getElementById("mainCanvas"), antialias: true});
    self.controls = new THREE.OrbitControls( self.camera, self.renderer.domElement );

    // Cube
    self.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    self.material = new THREE.MeshBasicMaterial( { color: 0x0f0fff } );
    self.cube = new THREE.Mesh( self.geometry, self.material ); 

    self.flames = new ParticleSystem();

	self.lastTime = Date.now();

    self.init = function()
    {
        self.camera.position.z = 5;
        self.controls.update();

        self.flames.init();
        self.scene.add( self.flames.points );
        //self.scene.add( self.cube );

        self.initCameraControl();

        requestAnimationFrame(self.update);
    }

    self.update = function()
    {
		let now = Date.now();
		let deltaTime = (now - self.lastTime);

		self.cube.rotation.x += 0.01;
        self.cube.rotation.y += 0.01;
        
        self.flames.update(deltaTime);

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

    self.initCameraControl = function()
    {
        self.controls.enableDamping = true;
        self.controls.dampingFactor = 0.25;
        self.controls.screenSpacePanning = false;
        self.controls.minDistance = 1;
        self.controls.maxDistance = 50;
        self.controls.maxPolarAngle = Math.PI / 2;
    }
}

