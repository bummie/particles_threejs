function SnowSystem()
{
	let self = this;
	ParticleSystem.call(self);

	self.maxParticles = 10000;
    self.spawnRateMS = 100;
	self.spawnAmount = self.getRandomArbitrary(50, 100);

	self.particleType = "snow";

	self.particleSize = 0.3;
	self.particleSpritePath = "./resources/textures/particles/snow.png";
	self.particleTransparent = true;
}