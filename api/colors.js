/**
 * Defines a color.
 *
 * @class Color
 */
class Color {
    /**
     * Initializes a new Color.
     * 
     * @param {string} name The name of the color.
     * @param {number} r The red value of the color.
     * @param {number} g The green value of the color.
     * @param {number} b The blue value of the color.
     * @memberof Color
     */
    constructor(name, r, g, b) {
        this.name = name;
        this.r = r;
        this.g = g;
        this.b = b;
    }

    /**
     * Returns the string representation of the color.
     *
     * @return {string} 
     * @memberof Color
     */
    toString() {
        return this.name;
    }

    /**
     * Returns the sRGB representation of the color.
     *
     * @readonly
     * @memberof Color
     */
    get srgb() {
        return {
            r: this.r / 15,
            g: this.g / 15,
            b: this.b / 15
        }
    }

    /**
     * Returns the sRGB representation of the color in 0-255.
     *
     * @readonly
     * @memberof Color
     */
    get srgb255() {
        return {
            r: Math.floor((this.r / 15) * 255),
            g: Math.floor((this.g / 15) * 255),
            b: Math.floor((this.b / 15) * 255)
        }
    }
}

/**
 * Defines a list of colors.
 *
 * @class ColorList
 */
class ColorList {
    /**
     * The colors in the list.
     *
     * @type {Map<string, Color>}
     * @memberof ColorList
     */
    colors;

    /**
     * Initializes a new ColorList.
     * @param {Map<string, Color>} [colors=null]
     * @memberof ColorList
     */
    constructor(colors = null) {
        this.colors = new Map;

        if(colors instanceof Array) for(const color of colors) this.addColor(color);
    }
    /** @yields {Color} */
    *[Symbol.iterator]() {
        yield* this.colors.values();
    }

    /**
     * Returns the keys of the color list.
     *
     * @return {Array<string>} 
     * @memberof ColorList
     */
    keys() {
        return this.colors.keys();
    }

    /**
     * Returns the values of the color list.
     *
     * @return {Array<Color>} 
     * @memberof ColorList
     */
    values() {
        return this.colors.values();
    }

    /**
     * Returns the color with the specified name.
     *
     * @param {string} name
     * @return {Color|undefined} 
     * @memberof ColorList
     */
    getColor(name) {
        return this.colors.get(name.toLowerCase());
    }

    /** 
     * Returns the color at the specified index.
     * 
     * @param {number} index The index of the color.
     * @returns {Color} 
     */
    getColorAtIndex(index) {
        return Array.from(this.colors.values())[index];
    }

    /**
     * Adds a color to the list.
     *
     * @param {...Color} colors The colors to add.
     * @memberof ColorList
     */
    addColor(...colors) {
        for(const color of colors) this.colors.set(color.name, color);
    }
}

/**
 * A list of default colors that can be used.
 *
 * @class Colors
 */
class Colors {
    static crColors = new ColorList([
        new Color("white", 15, 15, 15),
        new Color("red", 15, 0, 0),
        new Color("orange", 13, 7, 0),
        new Color("yellow", 13, 13, 0),
        new Color("lime", 7, 13, 0),
        new Color("green", 0, 15, 0),
        new Color("spring_green", 0, 13, 7),
        new Color("cyan", 0, 13, 13),
        new Color("azure", 0, 7, 13),
        new Color("blue", 0, 0, 15),
        new Color("violet", 7, 0, 13),
        new Color("magenta", 13, 0, 13),
        new Color("rose", 13, 0, 7),
    ])
}
export {
    Color, ColorList,
    
    Colors
};