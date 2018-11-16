function ConfettiSystem()
{
	let self = this;
	ParticleSystem.call(self);

	self.maxParticles = 3000;
    self.spawnRateMS = 1000;
	self.spawnAmount = self.getRandomArbitrary(1000, 1200);

	self.particleType = "confetti";

	self.particleSpritePath = null;
}