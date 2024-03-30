import { Canvas, Image, createCanvas, loadImage } from "canvas";
import Writeable from "./writeable.js";

import Mod from "./mod.js";

/** 
 * Converts an image to a {@link Canvas}.
 * 
 * @package
 * @param {Image} image The image to convert.
 * @returns {Canvas} The converted canvas.
 */
function imageToCanvas(image) {
    const canvas = createCanvas(image.width, image.height);
    canvas.getContext("2d").drawImage(image, 0, 0);
    return canvas;
}

/**
 * Defines a texture within a {@link Mod}.
 *
 * @class Texture
 * @extends {Writeable}
 */
class Texture extends Writeable {
    /**
     * Creates a new Texture from file location
     * 
     * @param {string} source Image source file name
     * @return {Promise<Texture>}
     */
    static async fromFile(source) {
        return new Texture(source.split(/[\/\\]/g).pop(), imageToCanvas(await loadImage(source)));
    }

    /**
     * Initializes a new Texture.
     * 
     * @param {string} name Image output name
     * @param {Image|Canvas} canvas Image data
     */
    constructor(name, canvas) {
        super();

        /** @type {string} */ this.name = name;
        /** @type {Canvas} */ this.canvas = (canvas instanceof Canvas) ? canvas : imageToCanvas(canvas);
    }

    /**
     * Serializes the Texture into a JSON object.
     * 
     * @override
     * @return {Object} The serialized Texture as a JSON object. 
     * @memberof Texture
     */
    serialize() {
        return this.canvas.toBuffer();
    }
}

/**
 * Defines a colorized texture within a {@link Mod}.
 *
 * @class ColorizedTexture
 */
class ColorizedTexture {
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
    static async createFromFiles(whiteSource, blackSource) {
        return new ColorizedTexture(await loadImage(whiteSource), await loadImage(blackSource));
    }

    /**
     * Initializes a new ColorizedTexture.
     * 
     * @param {Image} whiteTexture White variant image
     * @param {Image} blackTexture Black variant image
     */
    constructor(whiteTexture, blackTexture) {
        /** @type {Canvas} */ this.whiteTexture = imageToCanvas(whiteTexture);
        /** @type {Canvas} */ this.blackTexture = imageToCanvas(blackTexture);
    }

    /**
     * Creates a colorized image by interpolating each color channel from black's channel value to white's channel value
     * @param {string} name Image output name
     * @param {Number} r Red coefficient
     * @param {Number} g Green coefficient
     * @param {Number} b Blue coefficient
     * @param {Number?} a Alpha coefficient (default 0.5)
     * @returns {Canvas}
     */
    createTexture(name, r, g, b, a = 0.5) {
        const canvas = createCanvas(this.whiteTexture.width, this.whiteTexture.height);
        const context = canvas.getContext("2d");

        const whiteData = this.whiteTexture.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
        const blackData = this.blackTexture.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);

        const newData = context.getImageData(0, 0, canvas.width, canvas.height);

        for(let y = 0, i = 0; y < canvas.height; y++) {
            for(let x = 0; x < canvas.width; x++, i += 4) {
                newData.data[i + 0] = (whiteData.data[i + 0] - blackData.data[i + 0]) * r + blackData.data[i + 0];
                newData.data[i + 1] = (whiteData.data[i + 1] - blackData.data[i + 1]) * g + blackData.data[i + 1];
                newData.data[i + 2] = (whiteData.data[i + 2] - blackData.data[i + 2]) * b + blackData.data[i + 2];
                newData.data[i + 3] = (whiteData.data[i + 3] - blackData.data[i + 3]) * a + blackData.data[i + 3];
            }
        }

        context.putImageData(newData, 0, 0);
        return new Texture(name, canvas);
    }
}

export { ColorizedTexture, Texture };