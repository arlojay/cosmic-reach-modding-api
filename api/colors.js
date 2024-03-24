class Color {
    constructor(name, r, g, b) {
        this.name = name;
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
class ColorList {
    constructor() {
        this.colors = new Map;
    }
    /*** @yields {Color} */
    *[Symbol.iterator]() {
        yield* this.colors.values();
    }
    keys() {
        return this.colors.keys();
    }
    values() {
        return this.colors.values();
    }
    getColor(name) {
        return this.colors.get(name.toLowerCase());
    }
    /*** @returns {Color} */
    getColorAtIndex(index) {
        return Array.from(this.colors.values())[index];
    }
    addColor(...colors) {
        for(const color of colors) this.colors.set(color.name, color);
    }
}

const colors = new ColorList;
colors.addColor(
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
);

export default colors;