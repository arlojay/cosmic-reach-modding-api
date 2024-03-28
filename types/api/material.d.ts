export default Material;
/**
 * Defines a material within a {@link BlockModel}.
 *
 * @class Material
 */
declare class Material {
    /**
     * Initializes a new Material.
     *
     * @param {Texture} texture The texture for this material.
     * @memberof Material
     */
    constructor(texture: Texture);
    /**
     * The unique id for this material.
     *
     * @public
     * @type {string}
     * @memberof Material
     */
    public id: string;
    /**
     * The texture for this material.
     *
     * @public
     * @type {Texture}
     * @memberof Material
     */
    public texture: Texture;
    /**
     * The file name for this material.
     *
     * @public
     * @type {string}
     * @memberof Material
     */
    public fileName: string;
    /**
     * Serializes the Material into a JSON object.
     *
     * @override
     * @return {Object} The serialized Material as a JSON object.
     * @memberof Material
     */
    override serialize(): any;
}
import { Texture } from "./textures.js";
