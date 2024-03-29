function ConfettiParticle(position)
{
    let self = this;
    Particle.call(self, position);

    self.reset = function()
    {
        // Position
        self.position.x = position.x + self.getRandomArbitrary(-0.1, 0.1);
        self.position.y = position.y + -2;
        self.position.z = position.z + self.getRandomArbitrary(-0.1, 0.1);

        // Velocity
        self.velocity.x = self.getRandomArbitrary(-1, 1);
        self.velocity.y = self.getRandomArbitrary(15, 20);
        self.velocity.z = self.getRandomArbitrary(-1, 1);
    
        // Acceleration
        self.acceleration.x = 0;
        self.acceleration.y = self.getRandomArbitrary(-9.81, -2);
        self.acceleration.z = 0;

        // StartColor
        self.startColor.r = Math.random();
        self.startColor.g = Math.random();
        self.startColor.b = Math.random();

        // EndColor
        self.endColor.r = self.startColor.r;
        self.endColor.g = self.startColor.g;
        self.endColor.b = self.startColor.b;

        // Life
        self.lifeTime = self.getRandomArbitrary(4000, 5000);
        self.lifeLeft = self.lifeTime;
    }

    self.reset();
}