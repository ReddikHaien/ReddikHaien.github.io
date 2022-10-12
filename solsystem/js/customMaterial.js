import { Material, ShaderMaterial } from "./build/three.module.js"

const VS = 
`
out vec2 vUv;
void main() 
{
    vUv = uv;
	vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
	gl_Position = projectionMatrix * modelViewPosition;
}

`
const FS =
`
in vec2 vUv;
uniform sampler2D textureInShader; 
uniform float strength;
void main() {
	gl_FragColor = vec4(texture2D(textureInShader,vUv).xyz * strength,1.0);
}
`
export default class CustomMaterial extends ShaderMaterial{
    constructor(texture){
        const uniforms = {
            strength: {value: 1.0},
            textureInShader: {value: texture}
        }
        super({
            uniforms,
            vertexShader: VS,
            fragmentShader: FS
        });
    }

    /**
     * @param {number} value
     */
    set strength(value){
        this.uniforms.strength.value = value;
    }
}