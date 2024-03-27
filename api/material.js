import { Texture } from "./textures.js";

let materialCount = 0;

class Material {
    /** @param {Texture|String} texture */
    constructor(texture) {
        this.id = "m_" + materialCount++;
        this.texture = (texture instanceof Texture) ? texture : null;
        this.fileName = (texture instanceof Texture) ? (texture.name + ".png") : texture;
    }
    serialize() {
        return {
            fileName: this.fileName
        }
    }
}

export default Material;