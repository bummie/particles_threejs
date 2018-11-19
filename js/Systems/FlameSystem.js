function FlameSystem(position)
{
	let self = this;
	ParticleSystem.call(self, position);

	self.maxParticles = 3000;
    self.spawnRateMS = self.getRandomArbitrary(5, 50);
	self.spawnAmount = self.getRandomArbitrary(50, 100);

	self.particleType = "flame";

	self.particleSize = 0.25;
	self.blending = THREE.AdditiveBlending; //THREE.NormalBlending;
	self.particleSpritePath = "./resources/textures/particles/flame.png";
	self.particleTransparent = true;
}