/**
 * Defines a colorized texture within a {@link Mod}.
 *
 * @class ColorizedTexture
 */
export class ColorizedTexture {
    /**
     * Creates a colorized texture from two image files.
     *
     * @static
     * @async
     * @param {string} whiteSource The path for the white variant image.
     * @param {string} blackSource The path for the black variant image.
     * @return {Promise<ColorizedTexture>} The colorized texture.
     * @memberof ColorizedTexture
     */
    static async createFromFiles(whiteSource: string, blackSource: string): Promise<ColorizedTexture>;
    /**
     * Initializes a new ColorizedTexture.
     *
     * @param {Image} whiteTexture White variant image
     * @param {Image} blackTexture Black variant image
     */
    constructor(whiteTexture: Image, blackTexture: Image);
    /** @type {Canvas} */ whiteTexture: Canvas;
    /** @type {Canvas} */ blackTexture: Canvas;
    /**
     * Creates a colorized image by interpolating each color channel from black's channel value to white's channel value
     * @param {string} name Image output name
     * @param {Number} r Red coefficient
     * @param {Number} g Green coefficient
     * @param {Number} b Blue coefficient
     * @param {Number?} a Alpha coefficient (default 0.5)
     * @returns {Canvas}
     */
    createTexture(name: string, r: number, g: number, b: number, a?: number | null): Canvas;
}
/**
 * Defines a texture within a {@link Mod}.
 *
 * @class Texture
 * @extends {Writeable}
 */
export class Texture extends Writeable {
    /**
     * Creates a new Texture from file location
     * 
     * @static
     * @async
     * @param {string} source Image source file name
     * @return {Promise<Texture>}
     */
    static async fromFile(source: string): Promise<Texture>;
    /**
     * Initializes a new Texture.
     *
     * @param {string} name Image output name
     * @param {Image|Canvas} canvas Image data
     */
    constructor(name: string, canvas: Image | Canvas);
    /** @type {string} */ name: string;
    /** @type {Canvas} */ canvas: Canvas;
    /**
     * Serializes the Texture into a JSON object.
     *
     * @override
     * @return {Object} The serialized Texture as a JSON object.
     * @memberof Texture
     */
    override serialize(): any;
}
import Writeable from "./writeable.js";
