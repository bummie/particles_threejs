function SmokeParticle()
{
    let self = this;
    Particle.call(self);

    self.reset = function()
    {
        // Position
        self.position.x = self.getRandomArbitrary(-0.5, 0.5);
        self.position.y = self.getRandomArbitrary(0.8, 1.2);
        self.position.z = self.getRandomArbitrary(-1, 1);

        // Velocity
        self.velocity.x = self.getRandomArbitrary(-0.1, 0.1);
        self.velocity.y = self.getRandomArbitrary(2, 5);
        self.velocity.z = self.getRandomArbitrary(-0.1, 0.1);
    
        // Acceleration
        self.acceleration.x = 0;
        self.acceleration.y = -0.6;
        self.acceleration.z = 0;

        // StartColor
        self.startColor.r = 0.0;
        self.startColor.g = 0.0;
        self.startColor.b = 0.0;

        // EndColor
        self.endColor.r = 1.0;
        self.endColor.g = 1.0;
        self.endColor.b = 1.0;

        // Life
        self.lifeTime = self.getRandomArbitrary(500, 1200);
        self.lifeLeft = self.lifeTime;
    }

    self.reset();
}