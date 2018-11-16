function SmokeSystem()
{
	let self = this;
	ParticleSystem.call(self);

	self.maxParticles = 1000;
    self.spawnRateMS = 5;
	self.spawnAmount = 50;

	self.particleType = "smoke";

	self.particleSpritePath = "./resources/textures/particles/smoke.png";
}