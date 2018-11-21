function Wind()
{
	let self = this;
		
	self.externalForce = { x: 0, y: 0, z: 0 };

	// Angle
	self.windAngle = 90;
	self.windAngleStart = self.windAngle;
	self.windAngleTarget = 10;

	// Strength
	self.windStrength = 0;
	self.windStrengthStart = self.windStrength;
	self.windStrengthTarget = 10
	self.maxWind = 2.3;
	self.minWind = 0.5;

	self.updateDelay = 25;
	self.updateDelayPassed = 0;
	self.lerpPercantage = 0;

	/**
	 * Updates the wind vector
	 */
	self.update = function(deltaTime)
	{
		if(self.updateDelayPassed <= self.updateDelay)
		{
			self.updateDelayPassed += deltaTime;
			return; 
		}

		self.lerpPercantage += 0.01;

		self.windAngle = self.lerp(self.windAngleStart, self.windAngleTarget, self.lerpPercantage);
		self.windStrength = self.lerp(self.windStrengthStart, self.windStrengthTarget, self.lerpPercantage);

		if(self.lerpPercantage >= 1) { self.newWindValues(); }

		self.convertToVector();		
		self.updateDelayPassed = 0;
	}

	/**
	 * Fetches new random values for wind strength and angle
	 */
	self.newWindValues = function()
	{
		self.windAngleStart = self.windAngle;
		self.windStrengthStart = self.windStrength;

		self.windAngleTarget = self.getRandomArbitrary(0, 360);
		self.windStrengthTarget = self.getRandomArbitrary(self.minWind, self.maxWind);

		self.lerpPercantage = 0;
		self.updateDelay = self.getRandomArbitrary(5, 50);
	}

	/**
	 * Converts from angle and strength to vector
	 */
	self.convertToVector = function()
	{
		self.externalForce.x = Math.cos(self.degToRad(self.windAngle)) * self.windStrength;
		self.externalForce.z = Math.sin(self.degToRad(self.windAngle)) * self.windStrength;
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

	/**
	 * Converts degress to radians
	 */
	self.degToRad = function(degrees)
	{
		return degrees * Math.PI / 180;
	}

}