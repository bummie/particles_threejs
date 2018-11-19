function SnowSystem(position)
{
	let self = this;
	ParticleSystem.call(self, position);

	self.maxParticles = 20000;
    self.spawnRateMS = 50;
	self.spawnAmount = self.getRandomArbitrary(50, 100);

	self.particleType = "snow";

	self.particleSize = 0.3;
	self.blending = THREE.AdditiveBlending;
	self.particleSpritePath = "./resources/textures/particles/snow.png";
	self.particleTransparent = true;
}