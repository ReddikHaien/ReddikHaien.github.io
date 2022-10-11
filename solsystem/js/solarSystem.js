"use strict"
import {
    AmbientLight,
    Color,
    Mesh,
    MeshBasicMaterial,
    MeshPhongMaterial,
    Object3D, PointLight,
    SphereGeometry,
    TextureLoader
} from "./build/three.module.js";

export default class SolarSystem{
    /**
     *
     * @param {Scene} scene
     */
    constructor(scene){
        let radius = 5;
        let widthSegments = 64;
        let heightSegments = 64;

        this.root = new Object3D();
        this.root.position.z = -10;
        scene.add(this.root);

        let sunGeometry = new SphereGeometry(radius,widthSegments,heightSegments);

        let sunTextureUrl = 'assets/texture_sun.jpg';
        let sunTexture = new TextureLoader().load(sunTextureUrl);

        let sunMaterial = new MeshBasicMaterial({
            map: sunTexture
        });


        this.sun = new Mesh(sunGeometry,sunMaterial);
        this.root.add(this.sun);

        this.sunLight = new PointLight(new Color(1.0,1.0,0.9),3);
        this.root.add(this.sunLight);

        this.ambientLight = new AmbientLight(new Color(1.0,1.0,1.0),0.05);
        this.root.add(this.ambientLight);
        this.eartOrbit = new Object3D();
        this.root.add(this.eartOrbit);

        let earthTextureUrl = "assets/texture_earth.jpg";
        let earthTexture = new TextureLoader().load(earthTextureUrl);
        let earthMaterial = new MeshPhongMaterial({
            map: earthTexture,
            shininess: 1.0
        });

        radius = 2.5;
        let earthGeometry = new SphereGeometry(radius,widthSegments,heightSegments);
        this.earth = new Mesh(earthGeometry,earthMaterial);
        this.eartOrbit.add(this.earth);

        this.earth.position.x = 15;
    }


    animate(){
        this.sun.rotation.y += 0.001;
        this.eartOrbit.rotation.y += 0.005;
        this.earth.rotation.y += 0.003;
    }
}