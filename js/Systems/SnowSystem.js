function SnowSystem(position)
{
	let self = this;
	ParticleSystem.call(self, position);

	self.maxParticles = 40000;
    self.spawnRateMS = 90;
	self.spawnAmount = self.getRandomArbitrary(100, 150);

	self.particleType = "snow";

	self.particleSize = 0.3;
	self.blending = THREE.AdditiveBlending;
	self.particleSpritePath = "./resources/textures/particles/snow.png";
	self.particleTransparent = true;
}