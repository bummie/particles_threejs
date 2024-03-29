function FlameParticle(position)
{
    let self = this;
    Particle.call(self, position);

    self.reset = function()
    {
        let radius = 0.15;
        let degrees = self.getRandomArbitrary(1, 360);

        // Position
        self.position.x = position.x + (radius * Math.cos(degrees));
        self.position.y = position.y;
        self.position.z = position.x + (radius * Math.sin(degrees));

        // Velocity
        self.velocity.x = self.getRandomArbitrary(-0.6, 0.6);
        self.velocity.y = self.getRandomArbitrary(2, 4);
        self.velocity.z = self.getRandomArbitrary(-0.6, 0.6);
    
        // Acceleration
        self.acceleration.x = 0;
        self.acceleration.y = -0.6;
        self.acceleration.z = 0;

        // StartColor
        self.startColor.r = 1.0;
        self.startColor.g = 0.0;
        self.startColor.b = 0.0;

        // EndColor
        self.endColor.r = 1.0;
        self.endColor.g = 1.0;
        self.endColor.b = 0.0;

        // Life
        self.lifeTime = self.getRandomArbitrary(250, 500);
        self.lifeLeft = self.lifeTime;
    }

    self.reset();
}