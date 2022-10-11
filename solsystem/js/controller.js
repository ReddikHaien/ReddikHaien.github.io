import { Color, CylinderGeometry, Mesh, MeshBasicMaterial, Object3D, Scene, WebGLRenderer } from "./build/three.module.js";

export default class HandController{
    /**
     * 
     * @param {Scene} scene 
     * @param {WebGLRenderer} renderer
     */
    constructor(scene, renderer){
        this.handGeometry = new CylinderGeometry(0.1,0.1,0.5,16),
        this.handMaterial = new MeshBasicMaterial({
            color: Color.NAMES.forestgreen
        });
        for (let i = 0; i < 2; i++){
            const controller = renderer.xr.getController(i);
            controller.add(new Mesh(this.handGeometry,this.handMaterial));
            scene.add(controller);
        }
    }
}