function ParticleSystem()
{
    let self = this;

    self.maxParticles = 1000;
    self.availableParticles = [];
    self.particles = [];
    self.spawnRateMS = 1000;
	self.spawnAmount = 100;
	self.lastTimeSpawned = Date.now();

    self.particleType = "flame";
	self.points = null;  

    self.init = function()
    {
		self.points = new THREE.Points( self.initBuffer(), self.initMaterial() );
    }

    self.update = function(deltaTime)
    {
		self.spawnParticles();
		self.updateGeometry(deltaTime);
	}

	self.spawnParticles = function()
	{
		if(self.particles.length >= self.maxParticles) { return; }

		let now = Date.now();
		if((now - self.lastTimeSpawned) < self.spawnRateMS ) { return; }

		console.log(self.particles.length);
		for(let i = 0; i < self.spawnAmount; i++)
		{
			self.spawnParticle();
		}

		self.lastTimeSpawned = now;
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

		self.particles.push(self.availableParticles.pop().copyData(self.particleMother));
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
			verts.push(self.particles[i].color.r, self.particles[i].color.g, self.particles[i].color.b);
		}

		return verts;
	}
}