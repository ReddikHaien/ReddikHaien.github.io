"use strict"

import {Color, PerspectiveCamera, Scene, WebGLRenderer} from "./build/three.module.js";
import SolarSystem from "./solarSystem.js";
import {VRButton} from "./build/VRButton.js";
import HandController from "./controller.js";

export default class App{

    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;

        this.fov = 75;
        this.near = 0.1;
        this.far = 1000.0;

        this.camera = new PerspectiveCamera(this.fov,this.aspect,this.near,this.far);

        this.camera.position.z = 50;

        this.scene = new Scene();

        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2");
        this.renderer = new WebGLRenderer({
            canvas,
            context: gl,
        });

        this.renderer.setClearColor(new Color(0,0,0));
        this.renderer.setSize(this.width,this.height);

        this.renderer.xr.enabled = true;
        document.body.append(VRButton.createButton(this.renderer));
        document.body.appendChild(this.renderer.domElement);

        this.solarSystem = new SolarSystem(this.scene);
        this.handController = new HandController(this.scene,this.renderer);

        this.render_closure = this.render.bind(this);
        this.renderer.setAnimationLoop(this.render_closure);
    }

    render(){
        this.renderer.render(this.scene,this.camera);

        this.solarSystem.animate();
    }
}

new App();