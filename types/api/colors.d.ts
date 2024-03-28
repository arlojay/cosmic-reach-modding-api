/**
 * Defines a color.
 *
 * @class Color
 */
export class Color {
    /**
     * Initializes a new Color.
     *
     * @param {string} name The name of the color.
     * @param {number} r The red value of the color.
     * @param {number} g The green value of the color.
     * @param {number} b The blue value of the color.
     * @memberof Color
     */
    constructor(name: string, r: number, g: number, b: number);
    name: string;
    r: number;
    g: number;
    b: number;
    /**
     * Returns the string representation of the color.
     *
     * @return {string}
     * @memberof Color
     */
    toString(): string;
    /**
     * Returns the sRGB representation of the color.
     *
     * @readonly
     * @memberof Color
     */
    readonly get srgb(): {
        r: number;
        g: number;
        b: number;
    };
    /**
     * Returns the sRGB representation of the color in 0-255.
     *
     * @readonly
     * @memberof Color
     */
    readonly get srgb255(): {
        r: number;
        g: number;
        b: number;
    };
}
/**
 * Defines a list of colors.
 *
 * @class ColorList
 */
export class ColorList {
    /**
     * Initializes a new ColorList.
     * @param {Map<string, Color>} [colors=null]
     * @memberof ColorList
     */
    constructor(colors?: Map<string, Color>);
    /**
     * The colors in the list.
     *
     * @type {Map<string, Color>}
     * @memberof ColorList
     */
    colors: Map<string, Color>;
    /**
     * Returns the keys of the color list.
     *
     * @return {Array<string>}
     * @memberof ColorList
     */
    keys(): Array<string>;
    /**
     * Returns the values of the color list.
     *
     * @return {Array<Color>}
     * @memberof ColorList
     */
    values(): Array<Color>;
    /**
     * Returns the color with the specified name.
     *
     * @param {string} name
     * @return {Color|undefined}
     * @memberof ColorList
     */
    getColor(name: string): Color | undefined;
    /**
     * Returns the color at the specified index.
     *
     * @param {number} index The index of the color.
     * @returns {Color}
     */
    getColorAtIndex(index: number): Color;
    /**
     * Adds a color to the list.
     *
     * @param {...Color} colors The colors to add.
     * @memberof ColorList
     */
    addColor(...colors: Color[]): void;
    /** @yields {Color} */
    [Symbol.iterator](): Generator<Color, void, undefined>;
}
/**
 * A list of default colors that can be used.
 *
 * @class Colors
 */
export class Colors {
    static crColors: ColorList;
}
