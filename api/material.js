import { Texture } from "./textures.js";

import BlockModel from "./blockModel.js";

/** 
 * Private variable that serves as an incremental counter for the number of materials created.
 * 
 * @package
 * @type {number} 
 */
let materialCount = 0;

/**
 * Defines a material within a {@link BlockModel}.
 *
 * @class Material
 */
class Material {
    /**
     * The unique id for this material.
     *
     * @public
     * @type {string}
     * @memberof Material
     */
    id;

    /**
     * The texture for this material.
     *
     * @public
     * @type {Texture}
     * @memberof Material
     */
    texture;

    /**
     * The file name for this material.
     *
     * @public
     * @type {string}
     * @memberof Material
     */
    fileName;

    /**
     * Initializes a new Material.
     * 
     * @param {Texture} texture The texture for this material.
     * @memberof Material
     */
    constructor(texture) {
        this.id = "m_" + materialCount++;
        this.texture = (texture instanceof Texture) ? texture : null;
        this.fileName = (texture instanceof Texture) ? (texture.name + ".png") : texture;
    }

    /**
     * Serializes the Material into a JSON object.
     * 
     * @override
     * @return {Object} The serialized Material as a JSON object. 
     * @memberof Material
     */
    serialize() {
        return {
            fileName: this.fileName
        }
    }
}

export default Material;