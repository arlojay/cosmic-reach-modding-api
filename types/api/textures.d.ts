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
     * @param {string} whiteSource The path for the white variant image.
     * @param {string} blackSource The path for the black variant image.
     * @return {ColorizedTexture} The colorized texture.
     * @memberof ColorizedTexture
     */
    static createFromFiles(whiteSource: string, blackSource: string): ColorizedTexture;
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
