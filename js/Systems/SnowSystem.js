function SnowSystem(position)
{
	let self = this;
	ParticleSystem.call(self, position);

	self.maxParticles = 45000;
    self.spawnRateMS = 100;
	self.spawnAmount = self.getRandomArbitrary(150, 200);

	self.particleType = "snow";

	self.particleSize = 0.3;
	self.blending = THREE.AdditiveBlending;
	self.particleSpritePath = "./resources/textures/particles/snow.png";
	self.particleTransparent = true;
}