function Particle()
{
    let self = this;

    self.position = { x: 0, y: 0, z: 0 };
    self.veloctity = { x: 0, y: 1, z: 0 };
    self.acceleration = { x: 0, y: 0, z: 0 };
    self.lifetime = 1;
    self.startColor = { r: 10, g: 10, b: 10 };
    self.useGravity = false;
    self.gravity = { x: 0, y: -9.81, z: 0 };

    /**
     * Updates the properties for the particle
     */
    self.update = function(deltaTime)
    {
        self.lifetime -= deltaTime;
        if(self.isDead()){ return; }

        self.position.x += self.veloctity.x;
        self.position.y += self.veloctity.y;
        self.position.z += self.veloctity.z;
    }

    /**
     * Returns true if particle has ran out of life juice
     */
    self.isDead = function()
    {
        if(self.lifetime < 0) { return true; }
        return false;
    }

}