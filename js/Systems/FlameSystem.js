function FlameSystem()
{
	let self = this;
	ParticleSystem.call(self);

	self.maxParticles = 4000;
    self.spawnRateMS = 5;
	self.spawnAmount = 50;

	self.particleType = "flame";

	self.particleSpritePath = "./resources/textures/flame.png";
}