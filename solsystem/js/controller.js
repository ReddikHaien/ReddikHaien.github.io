import { Color, CylinderGeometry, Mesh, MeshBasicMaterial, MeshPhongMaterial, Object3D, Raycaster, Scene, WebGLRenderer } from "./build/three.module.js";

export default class HandController{
    /**
     * 
     * @param {Scene} scene 
     * @param {WebGLRenderer} renderer
     */
    constructor(scene, renderer){
        this.handGeometry = new CylinderGeometry(0.05,0.05,0.05,16),
        this.handMaterial = new MeshPhongMaterial({
            color: Color.NAMES.forestgreen
        });
        
        this.raycaster = new Raycaster();

        for (let i = 0; i < 2; i++){
            const controller = renderer.xr.getController(i);
            controller.add(new Mesh(this.handGeometry,this.handMaterial));
            scene.add(controller);
        }
    }

    selectStart(event){
        this.raycaster.intersectObject()
    }

    selectEnd(event){

    }
}