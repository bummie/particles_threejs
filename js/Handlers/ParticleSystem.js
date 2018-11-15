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

    self.update = function()
    {
		
		self.points.geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( self.particlesToVerts(), 3 ) );
		self.points.geometry.attributes.position.needsUpdate = true;
	}
	
	self.initBuffer = function()
	{
		let geometry = new THREE.BufferGeometry();
		
		return geometry;
	}

	self.initMaterial = function()
	{
		return new THREE.PointsMaterial(
		{
            color: 0xFF0000,
            size: 1,
            opacity: 1
         });
	}

	self.particlesToVerts = function()
	{
		let verts = [];
		for(let i = 0; i < self.particles.length; i++)
		{
			self.particles[i].update(0.001);
			verts.push(self.particles[i].position.x, self.particles[i].position.y, self.particles[i].position.z);
		}

		return verts;
	}
}