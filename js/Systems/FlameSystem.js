function FlameSystem()
{
	let self = this;
	ParticleSystem.call(self);

	self.maxParticles = 2000;
    self.spawnRateMS = self.getRandomArbitrary(5, 100);
	self.spawnAmount = self.getRandomArbitrary(50, 100);

	self.particleType = "flame";

	self.particleSize = 0.6;
	self.particleSpritePath = "./resources/textures/particles/flame.png";
	self.particleTransparent = true;
}