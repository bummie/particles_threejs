function SmokeSystem()
{
	let self = this;
	ParticleSystem.call(self);

	self.maxParticles = 1000;
    self.spawnRateMS = 100;
	self.spawnAmount = self.getRandomArbitrary(20, 70);

	self.particleType = "smoke";

	self.particleSize = 0.8;
	self.blending = THREE.AdditiveBlending;
	self.particleSpritePath = "./resources/textures/particles/smoke.png";
	self.particleTransparent = true;
}