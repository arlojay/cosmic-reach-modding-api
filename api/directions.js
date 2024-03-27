import { Vector3 } from "three";


class Direction {
    constructor(name, x, y, z) {
        /** @type {DirectionMap} */ this.directionMap = null;
        /** @type {String} */ this.name = name;
        this.vector = new Vector3(x, y, z);
    }
    *[Symbol.iterator]() {
        yield* this.vector.toArray();
    }

    setDirectionMap(directionMap) {
        this.directionMap = directionMap;
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

    inverse() {
        return this.directionMap.inverse(this);
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

    /** @param {function(Direction, Number, Set)} callback */
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
    invert(directionMap) {
        const clone = this.clone();
        const directions = new Set;

        directionMap.directions.forEach(direction => {
            if(!clone.directions.has(direction)) directions.add(direction);
        });

        clone.directions.clear();
        for(const direction of directions) clone.add(direction);

        return clone;
    }

    clone() {
        return new DirectionList(this);
    }
    
    toString() {
        if(this.directions.size == 0) return "none";
        return Array.from(this.directions).map(v => v.name).join("-");
    }
}

class DirectionMap {
    constructor(directions = []) {
        /** @type {Map<String, Direction>} */
        this.directions = new Map;

        for(const direction of directions) this.addDirection(direction);
    }
    *[Symbol.iterator]() {
        yield* this.directions.values();
    }
    addDirection(direction) {
        direction.setDirectionMap(this);
        this.directions.set(direction.name, direction);
    }
    getDirection(name) {
        return this.directions.get(name.toLowerCase());
    }
    values() {
        return this.directions.values();
    }
    keys() {
        return this.directions.keys();
    }

    /** @param {Direction} direction * @returns {Direction} */
    inverse(direction) {
        const inverse = direction.vector.clone().multiplyScalar(-1);

        return this.vectorToDirection(inverse);
    }

    /** @param {Vector3} vector */
    vectorToDirection(vector) {
        let lowestDistance = Infinity;
        let lowestDistanceDirection;

        for(const direction of this.directions.values()) {
            /** @type {Vector3} */
            const directionVector = direction.vector.clone();
            const distance = directionVector.normalize().distanceTo(vector.clone().normalize());
            
            if(distance < lowestDistance) {
                lowestDistance = distance;
                lowestDistanceDirection = direction;
            }
        }

        return lowestDistanceDirection;
    }

    /** @returns {Array<DirectionList>} */
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

    static cardinals = new DirectionMap([
        new Direction("north", 0, 0, 1),
        new Direction("east", 1, 0, 0),
        new Direction("south", 0, 0, -1),
        new Direction("west", -1, 0, 0),
        new Direction("up", 0, 1, 0),
        new Direction("down", 0, -1, 0)
    ]);
    static relative = new DirectionMap([
        new Direction("front", 0, 0, 1),
        new Direction("right", 1, 0, 0),
        new Direction("back", 0, 0, -1),
        new Direction("left", -1, 0, 0),
        new Direction("top", 0, 1, 0),
        new Direction("bottom", 0, -1, 0)
    ]);
    static simpleBlock = new DirectionMap([
        new Direction("front", 0, 0, 1),
        new Direction("back", 0, 0, -1),
        new Direction("side", 0, 0, 0),
    ]);
}

export default Directions;
export { Direction, DirectionList, DirectionMap };