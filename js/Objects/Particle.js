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
    self.update = function(deltaTime)
    {
        self.lifeLeft -= deltaTime;
        if(self.isDead()){ return; }

        self.updatePosition();
        self.updateColor();
    }

    /**
     * Copies data from one particle to another
     */
    self.copyData = function(particle)
    {
        self.position = particle.position;
        self.velocity = particle.velocity;
        self.acceleration = particle.acceleration;
        self.gravity = particle.gravity;
        self.useGravity = particle.useGravity; 
      
        self.lifeTime = particle.lifeTime; 
        self.lifeLeft = particle.lifeLeft;
 
        self.startColor = particle.startColor;
        self.endColor = particle.endColor;
        self.color = particle.color;
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
    self.updatePosition = function()
    {
        self.position.x += self.velocity.x;
        self.position.y += self.velocity.y;
        self.position.z += self.velocity.z;
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

    self.lifeAsFraction = function()
    {
        return 1 - (self.lifeLeft / self.lifeTime);
    }

    self.getRandomArbitrary = function(min, max) 
    {
		return Math.random() * (max - min) + min;
	}

}