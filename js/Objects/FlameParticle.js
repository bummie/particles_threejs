function FlameParticle()
{
    let self = this;
    Particle.call(self);

    self.reset = function()
    {
        // Position
        self.position.x = 0;
        self.position.y = -2;
        self.position.z = 0;

        // Velocity
        self.velocity.x = self.getRandomArbitrary(-0.01, 0.01);
        self.velocity.y = self.getRandomArbitrary(0.007, 0.08);
        self.velocity.z = self.getRandomArbitrary(-0.01, 0.01);
    
        // StartColor
        self.startColor.r = 1.0;
        self.startColor.g = 0.0;
        self.startColor.b = 0.0;

        // EndColor
        self.endColor.r = 1.0;
        self.endColor.g = 1.0;
        self.endColor.b = 0.0;

        // Life
        self.lifeTime = self.getRandomArbitrary(1000, 1500);
        self.lifeLeft = self.lifeTime;
    }

    self.reset();
}