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
import CustomMaterial from "./customMaterial.js";

export default class SolarSystem{
    /**
     *
     * @param {Scene} scene
     */
    constructor(scene){
        let radius = 1;
        let widthSegments = 64;
        let heightSegments = 64;

        this.root = new Object3D();
        this.root.position.z = -1;
        scene.add(this.root);

        let sunGeometry = new SphereGeometry(radius,widthSegments,heightSegments);

        let sunTextureUrl = 'assets/texture_sun.jpg';
        let sunTexture = new TextureLoader().load(sunTextureUrl);

        this.sunMaterial = new CustomMaterial(sunTexture);
    

        this.sun = new Mesh(sunGeometry,this.sunMaterial);
        this.root.add(this.sun);

        this.sunLight = new PointLight(new Color(1.0,1.0,0.9),3);
        this.root.add(this.sunLight);

        this.ambientLight = new AmbientLight(new Color(1.0,1.0,1.0),0.05);
        this.root.add(this.ambientLight);
        this.eartOrbit = new Object3D();
        this.root.add(this.eartOrbit);

        let earthTextureUrl = "assets/texture_earth.jpg";
        let earthTexture = new TextureLoader().load(earthTextureUrl);
        let earthLightTexture = new TextureLoader().load("assets/earthspec1k.jpg");
        let earthMaterial = new MeshPhongMaterial({
            map: earthTexture,
            shininess: 1.0,
            specularMap: earthLightTexture
        });

        radius = 0.5;
        let earthGeometry = new SphereGeometry(radius,widthSegments,heightSegments);
        this.earth = new Mesh(earthGeometry,earthMaterial);
        this.eartOrbit.add(this.earth);

        this.earth.position.x = 3;
        
        let marsTextureUrl = "assets/mars.jpg";
        let marsTexture = new TextureLoader().load(marsTextureUrl);
        let marsMaterial = new MeshPhongMaterial({
            map: marsTexture,
            shininess: 1.0
        });

        radius = 0.3;
        let marsGeometry = new SphereGeometry(radius,widthSegments,heightSegments);
        this.mars = new Mesh(marsGeometry,marsMaterial);
        this.mars.position.x = 5;
        this.marsOrbit = new Object3D();
        this.marsOrbit.add(this.mars);
        this.root.add(this.marsOrbit);
    }


    animate(){
        let strength = 0.3 + Math.abs(Math.sin(performance.now() * 0.001)) * 0.7;
        this.sunMaterial.strength = strength;
        this.sun.rotation.y += 0.001;
        this.eartOrbit.rotation.y += 0.005;
        this.earth.rotation.y += 0.003;
        this.marsOrbit.rotation.y += 0.001;
        this.mars.rotation.y += 0.002;
    }
}