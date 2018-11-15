function FlameParticle()
{
    let self = this;
    Particle.call(self);

    self.position.y = -2;

    self.velocity.x = self.getRandomArbitrary(-0.001, 0.001);
    self.velocity.y = self.getRandomArbitrary(0.005, 0.01);
    self.velocity.z = self.getRandomArbitrary(-0.001, 0.001);

    // StartColor
    self.startColor.r = 1;

    // EndColor
    self.endColor.r = 1;
    self.endColor.g = 1;
    self.endColor.b = 0;

}