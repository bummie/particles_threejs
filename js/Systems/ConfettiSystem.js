function ConfettiSystem(position)
{
	let self = this;
	ParticleSystem.call(self, position);

	self.maxParticles = 3000;
    self.spawnRateMS = 2500;
	self.spawnAmount = self.getRandomArbitrary(500, 1500);

	self.particleType = "confetti";

	self.particleSize = 0.25;
	self.blending = THREE.NormalBlending;
	self.particleSpritePath = "./resources/textures/particles/confetti.png";
	self.particleTransparent = true;
}