function SmokeSystem()
{
	let self = this;
	ParticleSystem.call(self);

	self.maxParticles = 1000;
    self.spawnRateMS = 100;
	self.spawnAmount = self.getRandomArbitrary(20, 70);

	self.particleType = "smoke";

	self.particleSpritePath = "./resources/textures/particles/smoke.png";
}