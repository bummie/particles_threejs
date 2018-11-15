function ParticleSystem()
{
    let self = this;

    self.maxParticles = 100;
    self.availableParticles = [];
    self.particles = [];
    self.spawnRateMS = 100;
    self.spawnAmount = 10;
    self.particleMother = new Particle();
	self.points = null;  

    self.init = function()
    {
		self.points = new THREE.Points( self.initBuffer(), self.initMaterial() );
		
		for(let i = 0; i < 1000; i++)
		{
			self.particles.push(new Particle());
		}
    }

    self.update = function(deltaTime)
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