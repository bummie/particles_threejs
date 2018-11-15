function ParticleSystem()
{
    let self = this;

    self.maxParticles = 1000;
    self.availableParticles = [];
    self.particles = [];
    self.spawnRateMS = 100;
	self.spawnAmount = 10;
	self.lastTimeSpawned = Date.now();

    self.particleType = "flame";
	self.points = null;  

    self.init = function()
    {
		self.points = new THREE.Points( self.initBuffer(), self.initMaterial() );
    }

    self.update = function(deltaTime)
    {
		self.garbageCollection();
		self.spawnParticles();
		self.updateGeometry(deltaTime);
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
	self.garbageCollection = function()
	{
		for(let i = self.particles.length - 1; i >= 0; i--)
		{
			if(self.particles[i].isDead())
			{
				self.availableParticles.push(self.particles[i]);
				self.particles.splice(i, 1);
				console.log("Available: " + self.availableParticles.length);
				console.log("Particles: " + self.particles.length);			}
		}
	}

	/**
	 * Spawns a particle, either one existing being resued or creates a new one
	 */
	self.spawnParticle = function()
	{
		if(self.availableParticles.length <= 0) 
		{
			let particle = new FlameParticle();
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
	self.updateGeometry = function(deltaTime)
	{
		self.points.geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( self.particlePositionsToVerts(deltaTime), 3 ) );
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
            color: 0xFFFFFF,
            size: 1,
			opacity: 1,
			vertexColors: THREE.VertexColors
         });
	}

	/**
	 * Turns the particles positins into an array of only the positions to be loaded into the 
	 */
	self.particlePositionsToVerts = function(deltaTime)
	{
		let verts = [];
		for(let i = 0; i < self.particles.length; i++)
		{
			if(self.particles[i] == undefined) { continue; }

			self.particles[i].update(deltaTime);
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
}