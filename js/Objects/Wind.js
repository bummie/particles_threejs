function Wind()
{
	
	let self = this;
	// Add windangleTarget and strength, linear interpolation towards it use deltatime as delay
	// Convert angle to x and y coords, then multiply with strength.
	// I partikkelsystemene som bruker random på ting, oppdatere disse randomverdiene hver frame. 
	self.windAngle = 90;
	self.windAngleTarget = 10;
	self.windStrength = 5;
	self.externalForce = { x: 0, y: 0, z: 0 }; // Wind

	self.updateDelay = 100;
	self.updateDelayPassed = 0;

	self.update = function(deltaTime)
	{
		if(self.updateDelayPassed <= self.updateDelay)
		{
			self.updateDelayPassed += deltaTime;
			return; 
		}

		self.convertToVector();		
		self.updateDelayPassed = 0;
	}

	/**
	 * Converts from angle and strength to vector
	 */
	self.convertToVector = function()
	{
		self.externalForce.x = Math.cos(self.windAngle) * self.windStrength;
		self.externalForce.y = Math.sin(self.windAngle) * self.windStrength;
	}

	/**
     *  Linear interpolation between two values
     * */
    self.lerp = function(a, b, fraction)
    {
        return a + fraction * (b - a);
    }

    /**
     * Returns a random value between a minimum and maximum value
     */
    self.getRandomArbitrary = function(min, max) 
    {
		return Math.random() * (max - min) + min;
	}
	
}