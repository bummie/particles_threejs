function Renderer()
{
    let self = this;

    self.scene = new THREE.Scene();
    self.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    self.renderer = new THREE.WebGLRenderer({canvas: document.getElementById("mainCanvas"), antialias: true});

    self.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    self.material = new THREE.MeshBasicMaterial( { color: 0x0f0fff } );
    self.cube = new THREE.Mesh( self.geometry, self.material ); 

    self.init = function()
    {
        self.scene.add( self.cube );
        self.camera.position.z = 5;

        requestAnimationFrame(self.render);
    }

    /**
     * Renders the scene to the canvas
     */
    self.render = function()
    {
        self.cube.rotation.x += 0.01;
        self.cube.rotation.y += 0.01;
        
        self.renderer.render(self.scene, self.camera);
        requestAnimationFrame(self.render);
    }
   
}

