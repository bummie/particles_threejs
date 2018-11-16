function SnowParticle()
{
    let self = this;
    Particle.call(self);

    self.reset = function()
    {
        // Position
        self.position.x = self.getRandomArbitrary(-10, 10);
        self.position.y = 50;
        self.position.z = self.getRandomArbitrary(-10, 10) - 15;

        // Velocity
        self.velocity.x = 0;
        self.velocity.y = 0;
        self.velocity.z = 0;
    
        // Acceleration
        self.acceleration.x = 0;
        self.acceleration.y = self.getRandomArbitrary(-2.5, -0.1);
        self.acceleration.z = 0;

        // StartColor
        self.startColor.r = 1.0;
        self.startColor.g = 1.0;
        self.startColor.b = 1.0;

        // EndColor
        self.endColor.r = 0.85;
        self.endColor.g = 0.85;
        self.endColor.b = 0.85;
        
        // Life
        self.lifeTime = self.getRandomArbitrary(7000, 10000);
        self.lifeLeft = self.lifeTime;
    }

    self.reset();
}