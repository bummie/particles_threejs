function ParticleSystem(position)
{
    let self = this;

	self.position = position;

    self.maxParticles = 1000;
    self.availableParticles = [];
    self.particles = [];
    self.spawnRateMS = 10;
	self.spawnAmount = 10;
	self.lastTimeSpawned = Date.now();

	self.particleType = "default";
	self.particleTransparent = false;

	self.particleSize = 1;
	self.blending = THREE.NormalBlending;
    self.particleSpritePath = "./resources/textures/flame.png";
	self.points = null;  
	self.sprite = null;

	self.garbageCollectionDelay = 250;
	self.garbageCollectionDelayTimePassed = 0;

    self.init = function()
    {
		self.loadSprite();
		self.points = new THREE.Points( self.initBuffer(), self.initMaterial() );
    }

    self.update = function(deltaTime, externalForce)
    {
		self.garbageCollection(deltaTime);
		self.spawnParticles();
		self.updateGeometry(deltaTime, externalForce);
	}
	
	self.loadSprite = function()
	{
		if(self.particleSpritePath == null) { return; }
		var textureLoader = new THREE.TextureLoader();
		self.sprite = textureLoader.load( self.particleSpritePath );
	}

	/**
	 * Spawns particles in given bursts
	 */
	self.spawnParticles = function()
	{
		if(self.particles.length >= self.maxParticles) { return; }

		let now = Date.now();
		if((now - self.lastTimeSpawned) < self.spawnRateMS ) { return; }

		for(let i = 0; i < self.spawnAmount; i++)
		{
			self.spawnParticle();
		}

		self.lastTimeSpawned = now;
	}
	
	/**
	 * Frees dead particles from in action list to avaiable
	 */
	self.garbageCollection = function(deltaTime)
	{
		if(self.garbageCollectionDelayTimePassed <= self.garbageCollectionDelay) { self.garbageCollectionDelayTimePassed += deltaTime; return;}

		for(let i = self.particles.length - 1; i >= 0; i--)
		{
			if(self.particles[i].isDead())
			{
				self.availableParticles.push(self.particles[i]);
				self.particles.splice(i, 1);
			}
		}

		self.garbageCollectionDelayTimePassed = 0;
	}

	/**
	 * Spawns a particle, either one existing being resued or creates a new one
	 */
	self.spawnParticle = function(position)
	{
		if(self.availableParticles.length <= 0) 
		{
			let particle = null;
			
			switch(self.particleType)
			{
				case "flame":
					particle = new FlameParticle(self.position);
				break;

				case "smoke":
					particle = new SmokeParticle(self.position);
				break;
				
				case "confetti":
					particle = new ConfettiParticle(self.position);
				break;

				case "snow":
					particle = new SnowParticle(self.position);
				break;
			}
			
			self.particles.push(particle); 
			
			return;
		}

		let poppedParticle = self.availableParticles.pop();
		poppedParticle.reset();

		if(poppedParticle == null || poppedParticle == undefined) { return; }
		self.particles.push(poppedParticle);
	}

	/**
	 * Updates the vertices in the geometry
	 */
	self.updateGeometry = function(deltaTime, externalForce)
	{
		self.points.geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( self.particlePositionsToVerts(deltaTime, externalForce), 3 ) );
		self.points.geometry.attributes.position.needsUpdate = true;

		self.points.geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( self.particleColorsToColor(), 3 ) );
		self.points.geometry.attributes.color.needsUpdate = true;
	}

	/**
	 * Inits the geometry buffer
	 */
	self.initBuffer = function()
	{
		let geometry = new THREE.BufferGeometry();
		
		return geometry;
	}

	/**
	 * Inits the material used for all of the particles
	 */
	self.initMaterial = function()
	{
		return new THREE.PointsMaterial(
		{
			map: self.sprite, 
			blending: self.blending,
		 	transparent: true,
            size: self.particleSize,
			opacity: 1,
			depthWrite: !self.particleTransparent,
			vertexColors: THREE.VertexColors
         });
	}

	/**
	 * Turns the particles positins into an array of only the positions to be loaded into the 
	 */
	self.particlePositionsToVerts = function(deltaTime, externalForce)
	{
		let verts = [];
		for(let i = 0; i < self.particles.length; i++)
		{
			if(self.particles[i] == undefined || self.particles[i].isDead()) { continue; }

			self.particles[i].update(deltaTime, externalForce);
			verts.push(self.particles[i].position.x, self.particles[i].position.y, self.particles[i].position.z);
		}

		return verts;
	}

	/**
	 * Turns the particles positins into an array of only the positions to be loaded into the 
	 */
	self.particleColorsToColor = function()
	{
		let verts = [];
		for(let i = 0; i < self.particles.length; i++)
		{
			if(self.particles[i] == undefined) { continue; }

			verts.push(self.particles[i].color.r, self.particles[i].color.g, self.particles[i].color.b);
		}

		return verts;
	}

	/**
     * Returns a random value between a minimum and maximum value
     */
    self.getRandomArbitrary = function(min, max) 
    {
		return Math.random() * (max - min) + min;
	}
}