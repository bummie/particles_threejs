function ParticleSystem()
{
    let self = this;

    self.maxParticles = 100;
    self.availableParticles = [];
    self.particles = [];
    self.spawnRateMS = 100;
    self.spawnAmount = 10;
    self.particleMother = new Particle();
    self.points = null;  

    self.init = function()
    {
        self.crayshit();
    }

    self.update = function()
    {

        self.crayshit();
        
        /*for ( var i = 0; i < scene.children.length; i ++ ) 
        {
            var object = scene.children[ i ];
            if ( object instanceof THREE.Points ) 
            {
                object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
            }
        }*/
        var time = Date.now() * 0.00005;
        var i = 1;
        //self.points.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
    }

    self.crayshit = function()
    {

        // init shit
        var geometry = new THREE.BufferGeometry();
        var vertices = [];
        var material = new THREE.PointsMaterial({
            color: 0xff0000,
            size: 5,
            opacity: 1
         });

        for ( var i = 0; i < 10000; i ++ ) {
            var x = Math.random() * 2000 - 1000;
            var y = Math.random() * 2000 - 1000;
            var z = Math.random() * 2000 - 1000;
            vertices.push( x, y, z );
        }
        geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        self.points = new THREE.Points( geometry, material );
    }

}