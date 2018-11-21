function SnowParticle(position)
{
    let self = this;
    Particle.call(self, position);

    self.reset = function()
    {
        // Position
        self.position.x = position.x + self.getRandomArbitrary(-20, 20);
        self.position.y = position.y;
        self.position.z = position.z + self.getRandomArbitrary(-20, 20);

        // Velocity
        self.velocity.x = 0;
        self.velocity.y = 0;
        self.velocity.z = 0;
    
        // Acceleration
        self.acceleration.x = 0;
        self.acceleration.y = self.getRandomArbitrary(-1.5, -0.5);
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
        self.lifeTime = self.getRandomArbitrary(15000, 17000);
        self.lifeLeft = self.lifeTime;
    }

    self.reset();
}