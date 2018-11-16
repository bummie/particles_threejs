function Particle()
{
    let self = this;

    self.position = { x: 0, y: 0, z: 0 };
    self.velocity = { x: 0, y: 0, z: 0 };
    self.acceleration = { x: 0, y: 0, z: 0 };
    self.gravity = { x: 0, y: -9.81, z: 0 };
    self.useGravity = false;

    self.lifeTime = 3000;
    self.lifeLeft = self.lifeTime;

    self.startColor = { r: 0.0, g: 0.0, b: 0.0 };
    self.endColor = { r: 1.0, g: 1.0, b: 1.0 };
    self.color = { r: 0, g: 0, b: 0 };

    /**
     * Updates the properties for the particle
     */
    self.update = function(deltaTime, externalForce)
    {
        self.lifeLeft -= deltaTime;
        if(self.isDead()){ return; }

        self.updatePosition((deltaTime/1000), externalForce);
        self.updateColor();
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
     * Updates the position for the particle based on life
     */
    self.updatePosition = function(deltaTime, externalForce)
    {
        self.velocity.x += (self.acceleration.x + externalForce.x) * deltaTime; 
        self.velocity.y += (self.acceleration.y + externalForce.x) * deltaTime;
        self.velocity.z += (self.acceleration.z + externalForce.x) * deltaTime;

        self.position.x += self.velocity.x * deltaTime;
        self.position.y += self.velocity.y * deltaTime;
        self.position.z += self.velocity.z * deltaTime;
    }

    /**
     * Update color based on where the particle is in this current life
     */
    self.updateColor = function()
    {
        self.color.r = self.lerp(self.startColor.r, self.endColor.r, self.lifeAsFraction());
        self.color.g = self.lerp(self.startColor.g, self.endColor.g, self.lifeAsFraction());
        self.color.b = self.lerp(self.startColor.b, self.endColor.b, self.lifeAsFraction());
    }

    /**
     *  Linear interpolation between two values
     * */
    self.lerp = function(a, b, fraction)
    {
        return a + fraction * (b - a);
    }

    /**
     * Returns how much the particle has to live as a fraction
     */
    self.lifeAsFraction = function()
    {
        return 1 - (self.lifeLeft / self.lifeTime);
    }

    /**
     * Returns a random value between a minimum and maximum value
     */
    self.getRandomArbitrary = function(min, max) 
    {
		return Math.random() * (max - min) + min;
	}

}