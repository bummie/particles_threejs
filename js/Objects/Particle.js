function Particle()
{
    let self = this;

    self.position = { x: Math.random() * (10 - 12) + 1, y: Math.random() * (20 - 1) + -2, z: 0 };
    self.veloctity = { x: 0, y: Math.random() + 0.05, z: 0 };
    self.acceleration = { x: 0, y: 0, z: 0 };
    self.lifeTime = 3000;
    self.lifeLeft = self.lifeTime;
    self.startColor = { r: 0.9, g: 0.0, b: 0.0 };
    self.endColor = { r: 1, g: 1, b: 0 };
	self.color = { r: Math.random(), g: Math.random(), b: Math.random() };
    self.useGravity = false;
    self.gravity = { x: 0, y: -9.81, z: 0 };

    /**
     * Updates the properties for the particle
     */
    self.update = function(deltaTime)
    {
        self.lifeLeft -= deltaTime;
        if(self.isDead()){ return; }

        self.position.x += self.veloctity.x;
        self.position.y += self.veloctity.y;
        self.position.z += self.veloctity.z;

        self.color.r = self.lerp(self.startColor.r, self.endColor.r, self.lifeAsFraction());
        self.color.g = self.lerp(self.startColor.g, self.endColor.g, self.lifeAsFraction());
        self.color.b = self.lerp(self.startColor.b, self.endColor.b, self.lifeAsFraction());
    }

    /**
     * Returns true if particle has ran out of life juice
     */
    self.isDead = function()
    {
        if(self.lifeLeft < 0) { return true; }
        return false;
    }

    /**
     *  Linear interpolation between two values
     * */
    self.lerp = function(a, b, fraction)
    {
        return a + fraction * (b - a);
    }

    self.lifeAsFraction = function()
    {
        return 1 - (self.lifeLeft / self.lifeTime);
    }

}