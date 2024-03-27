class Color {
    constructor(name, r, g, b) {
        this.name = name;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    toString() {
        return this.name;
    }
    get srgb() {
        return {
            r: this.r / 15,
            g: this.g / 15,
            b: this.b / 15
        }
    }
    get srgb255() {
        return {
            r: Math.floor((this.r / 15) * 255),
            g: Math.floor((this.g / 15) * 255),
            b: Math.floor((this.b / 15) * 255)
        }
    }
}
class ColorList {
    constructor(colors = null) {
        this.colors = new Map;

        if(colors instanceof Array) for(const color of colors) this.addColor(color);
    }
    /** @yields {Color} */
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
    /** @returns {Color} */
    getColorAtIndex(index) {
        return Array.from(this.colors.values())[index];
    }
    addColor(...colors) {
        for(const color of colors) this.colors.set(color.name, color);
    }
}


const colors = {
    crColors: new ColorList([
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
    
    colors
};