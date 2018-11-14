function ParticleSystem()
{
    let self = this;

    self.maxParticles = 100;
    self.availableParticles = [];
    self.particles = [];
    self.spawnRateMS = 100;
    self.spawnAmount = 10;
    self.particleMother = new Particle();

    

}