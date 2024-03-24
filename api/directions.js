import { Vector3 } from "three";


class Direction {
    constructor(name, x, y, z) {
        this.name = name;
        this.vector = new Vector3(x, y, z);
    }
    *[Symbol.iterator]() {
        yield* this.vector.toArray();
    }
    
    get x() {
        return this.vector.x;
    }
    get y() {
        return this.vector.y;
    }
    get z() {
        return this.vector.z;
    }
    get uppercaseName() {
        return this.name[0].toUpperCase() + this.name.slice(1);
    }

    is(name) {
        return this.name.toLowerCase() == name.toLowerCase();
    }
    
    toString() {
        return this.name;
    }
}

class DirectionList {
    constructor(directions = []) {
        this.directions = new Set;
        for(const direction of directions) this.directions.add(direction);
    }
    *[Symbol.iterator]() {
        yield* this.directions;
    }
    
    add(direction) {
        this.directions.add(direction);
    }
    remove(direction) {
        this.directions.delete(direction);
    }
    has(direction) {
        this.directions.has(direction);
    }

    get size() {
        return this.directions.size;
    }

    /*** @param {function(Direction, Number, Set)} callback */
    forEach(callback) {
        this.directions.forEach(callback);
    }

    hasDirection(name) {
        for(const direction of this.directions) {
            if(direction.is(name)) return true;
        }
        return false;
    }
    removeDirection(name) {
        for(const direction of this.directions) {
            if(direction.is(name)) this.directions.delete(direction);
        }
    }
    createBitmask(directionMap) {
        let bitmask = 0;
        const directions = Array.from(directionMap.values());

        for(let i = 0; i < directions.length; i++) {
            bitmask |= (this.directions.has(directions[i]) << i);
        }

        return bitmask;
    }
    
    toString() {
        if(this.directions.size == 0) return "none";
        return Array.from(this.directions).map(v => v.name).join("-");
    }
}

class DirectionMap {
    constructor() {
        /*** @type {Map<String, Direction>} */
        this.directions = new Map;
    }
    addDirection(...directions) {
        for(const direction of directions) this.directions.set(direction.name, direction);
    }
    getDirection(name) {
        return this.directions.get(name.toLowerCase());
    }
    *[Symbol.iterator]() {
        yield* this.directions.values();
    }
    values() {
        return this.directions.values();
    }
    keys() {
        return this.directions.keys();
    }

    /*** @returns {Array<DirectionList>} */
    combinations() {
        const keys = Array.from(this.directions.keys());
        const totalCombinations = 2 ** keys.length;
        const combinations = new Array;

        for(let i = 0; i < totalCombinations; i++) {
            const bits = i.toString(2).padStart(keys.length, "0");
            const combination = keys.filter((_, i) => bits[i] == "1").map(k => this.directions.get(k));
            combinations.push(new DirectionList(combination));
        }

        return combinations;
    }
}

class Directions {
    static capitalize(direction) {
        return direction[0].toUpperCase() + direction.slice(1);
    }
    static uncapitalize(direction) {
        return direction.toLowerCase();
    }

    static cardinals = new DirectionMap();

    static {
        Directions.cardinals.addDirection(
            new Direction("north", 0, 0, 1),
            new Direction("east", 1, 0, 0),
            new Direction("south", 0, 0, -1),
            new Direction("west", -1, 0, 0),
            new Direction("up", 0, 1, 0),
            new Direction("down", 0, -1, 0)
        );
    }
}

export default Directions;