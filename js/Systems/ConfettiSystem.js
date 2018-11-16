function ConfettiSystem()
{
	let self = this;
	ParticleSystem.call(self);

	self.maxParticles = 3000;
    self.spawnRateMS = 2500;
	self.spawnAmount = self.getRandomArbitrary(500, 1500);

	self.particleType = "confetti";

	self.particleSpritePath = "./resources/textures/particles/confetti.png";
	self.particleTransparent = true;
}