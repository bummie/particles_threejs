function ConfettiParticle()
{
    let self = this;
    Particle.call(self);

    self.reset = function()
    {
        // Position
        self.position.x = self.getRandomArbitrary(-0.5, 0.5);
        self.position.y = -2;
        self.position.z = self.getRandomArbitrary(-1, 1) + 5;

        // Velocity
        self.velocity.x = self.getRandomArbitrary(-3, 3);
        self.velocity.y = self.getRandomArbitrary(12, 16);
        self.velocity.z = self.getRandomArbitrary(-3, 3);
    
        // Acceleration
        self.acceleration.x = 0;
        self.acceleration.y = -9.81;
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
        self.lifeTime = self.getRandomArbitrary(1000, 3000);
        self.lifeLeft = self.lifeTime;
    }

    self.reset();
}