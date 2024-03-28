import { Vector3 } from "three";

/**
 * Defines a direction.
 *
 * @class Direction
 */
class Direction {
    /**
     * The direction map for this direction.
     *
     * @type {DirectionMap}
     * @memberof Direction
     */
    directionMap;

    /**
     * The name of this direction.
     *
     * @type {string}
     * @memberof Direction
     */
    name;

    /**
     * The vector for this direction.
     *
     * @type {Vector3}
     * @memberof Direction
     */
    vector;

    /**
     * Initializes a new Direction.
     * @param {string} name
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @memberof Direction
     */
    constructor(name, x, y, z) {
        /** @type {DirectionMap} */ this.directionMap = null;
        /** @type {string} */ this.name = name;
        this.vector = new Vector3(x, y, z);
    }

    *[Symbol.iterator]() {
        yield* this.vector.toArray();
    }

    /**
     * Sets the direction map for this direction.
     *
     * @param {DirectionMap} directionMap
     * @memberof Direction
     */
    setDirectionMap(directionMap) {
        this.directionMap = directionMap;
    }
    
    /**
     * The x component of the direction.
     *
     * @readonly
     * @type {number}
     * @memberof Direction
     */
    get x() {
        return this.vector.x;
    }
    
    /**
     * The y component of the direction.
     *
     * @readonly
     * @type {number}
     * @memberof Direction
     */
    get y() {
        return this.vector.y;
    }
    
    /**
     * The z component of the direction.
     *
     * @readonly
     * @type {number}
     * @memberof Direction
     */
    get z() {
        return this.vector.z;
    }

    /**
     * The name of the direction with the first letter capitalized.
     *
     * @readonly
     * @memberof Direction
     */
    get uppercaseName() {
        return this.name[0].toUpperCase() + this.name.slice(1);
    }

    /**
     * Checks whether a direction name is equal to this direction name.
     *
     * @param {string} name The name to check.
     * @return {boolean} 
     * @memberof Direction
     */
    is(name) {
        return this.name.toLowerCase() == name.toLowerCase();
    }

    /**
     * Returns the inverse of this direction.
     *
     * @return {Direction} 
     * @memberof Direction
     */
    inverse() {
        return this.directionMap.inverse(this);
    }
    
    /**
     * Returns the string representation of the direction.
     *
     * @return {string} 
     * @memberof Direction
     */
    toString() {
        return this.name;
    }
}

/**
 * Defines a list of {@link Direction|Directions}.
 *
 * @class DirectionList
 */
class DirectionList {
    /**
     * The {@link Direction|Directions} in the list.
     *
     * @type {Set<Direction>}
     * @memberof DirectionList
     */
    directions;

    /**
     * Initializes a new DirectionList.
     * @param {Array<Direction>} [directions=[]] The {@link Direction|Directions} to initialize the list with.
     * @memberof DirectionList
     */
    constructor(directions = []) {
        this.directions = new Set;
        for(const direction of directions) this.directions.add(direction);
    }

    *[Symbol.iterator]() {
        yield* this.directions;
    }
    
    /**
     * Adds a {@link Direction} to the list.
     *
     * @param {Direction} direction The {@link Direction} to add.
     * @memberof DirectionList
     */
    add(direction) {
        this.directions.add(direction);
    }
    
    /**
     * Removes a {@link Direction} from the list.
     *
     * @param {Direction} direction The {@link Direction} to remove.
     * @memberof DirectionList
     */
    remove(direction) {
        this.directions.delete(direction);
    }
    
    /**
     * Checks whether a {@link Direction} exists in the list.
     *
     * @param {Direction} direction The {@link Direction} to check.
     * @memberof DirectionList
     */
    has(direction) {
        this.directions.has(direction);
    }

    /**
     * The number of {@link Direction|Directions} in the list.
     *
     * @readonly
     * @memberof DirectionList
     */
    get size() {
        return this.directions.size;
    }

    /** 
     * Executes a provided function once per each {@link Direction} in the list, in insertion order.
     * @param {function(Direction, Number, Set)} callback
     */
    forEach(callback) {
        this.directions.forEach(callback);
    }

    /**
     * Checks whether a direction with the specified name exists in the list.
     *
     * @param {string} name The name of the direction to check.
     * @return {boolean} 
     * @memberof DirectionList
     */
    hasDirection(name) {
        for(const direction of this.directions) {
            if(direction.is(name)) return true;
        }
        return false;
    }

    /**
     * Removes a direction with the specified name from the list.
     *
     * @param {string} name
     * @memberof DirectionList
     */
    removeDirection(name) {
        for(const direction of this.directions) {
            if(direction.is(name)) this.directions.delete(direction);
        }
    }

    /**
     * Creates a bitmask from a {@link DirectionMap}.
     *
     * @param {DirectionMap} directionMap
     * @return {number} 
     * @memberof DirectionList
     */
    createBitmask(directionMap) {
        let bitmask = 0;
        const directions = Array.from(directionMap.values());

        for(let i = 0; i < directions.length; i++) {
            bitmask |= (this.directions.has(directions[i]) << i);
        }

        return bitmask;
    }

    /**
     * Inverts a {@link DirectionMap}.
     *
     * @param {DirectionMap} directionMap
     * @return {*} 
     * @memberof DirectionList
     */
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

    
    /**
     * Clones the direction list into a new instance.
     *
     * @param {string} [id=this.id]
     * @return {DirectionList} A new instance of the current direction list.
     * @memberof DirectionList
     */
    clone() {
        return new DirectionList(this);
    }
    
    /**
     * Returns the string representation of the direction list.
     *
     * @return {*} 
     * @memberof DirectionList
     */
    toString() {
        if(this.directions.size == 0) return "none";
        return Array.from(this.directions).map(v => v.name).join("-");
    }
}

/**
 * Defines a map of {@link Direction|Directions}.
 *
 * @class DirectionMap
 */
class DirectionMap {
    /**
     * The {@link Direction|Directions} in the list.
     *
     * @type {Map<String, Direction>}
     * @memberof DirectionList
     */
    directions;

    /**
     * Initializes a new DirectionMap.
     * @param {Array<Direction>} [directions=[]] The {@link Direction|Directions} to initialize the map with.
     * @memberof DirectionMap
     */
    constructor(directions = []) {
        /** @type {Map<String, Direction>} */
        this.directions = new Map;

        for(const direction of directions) this.addDirection(direction);
    }

    *[Symbol.iterator]() {
        yield* this.directions.values();
    }

    /**
     * Adds a {@link Direction} to the map.
     *
     * @param {Direction} direction The {@link Direction} to add.
     * @memberof DirectionMap
     */
    addDirection(direction) {
        direction.setDirectionMap(this);
        this.directions.set(direction.name, direction);
    }

    /**
     * Gets a {@link Direction} from the map by name.
     *
     * @param {string} name The name of the direction to get.
     * @return {Direction} 
     * @memberof DirectionMap
     */
    getDirection(name) {
        return this.directions.get(name.toLowerCase());
    }

    /**
     * Gets the {@link Direction|Directions} within the map.
     *
     * @return {Array<Direction>} 
     * @memberof DirectionMap
     */
    values() {
        return this.directions.values();
    }

    /**
     * Gets the direction names within the map.
     *
     * @return {Array<string>} 
     * @memberof DirectionMap
     */
    keys() {
        return this.directions.keys();
    }

    /** 
     * Returns the inverse of a direction.
     * 
     * @param {Direction} direction The direction to invert.
     * @returns {Direction} 
     */
    inverse(direction) {
        const inverse = direction.vector.clone().multiplyScalar(-1);

        return this.vectorToDirection(inverse);
    }

    /** 
     * Returns the direction closest to a vector.
     * 
     * @param {Vector3} vector The vector to compare.
     */
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

    /** 
     * Returns the adjacency list for the direction map.
     * @returns {Array<DirectionList>} 
     */
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

/**
 * Defines a set of predefined {@link Direction|Directions}.
 *
 * @class Directions
 */
class Directions {
    /**
     * Capitalizes the first character of a direction name.
     *
     * @static
     * @param {string} direction The direction name to capitalize.
     * @return {string} 
     * @memberof Directions
     */
    static capitalize(direction) {
        return direction[0].toUpperCase() + direction.slice(1);
    }

    /**
     * Uncapitalizes all charactera of a direction name.
     *
     * @static
     * @param {string} direction
     * @return {string} 
     * @memberof Directions
     */
    static uncapitalize(direction) {
        return direction.toLowerCase();
    }

    /**
     * The cardinal directions.
     *
     * @static
     * @memberof Directions
     */
    static cardinals = new DirectionMap([
        new Direction("north", 0, 0, 1),
        new Direction("east", 1, 0, 0),
        new Direction("south", 0, 0, -1),
        new Direction("west", -1, 0, 0),
        new Direction("up", 0, 1, 0),
        new Direction("down", 0, -1, 0)
    ]);

    /**
     * The relative directions.
     *
     * @static
     * @memberof Directions
     */
    static relative = new DirectionMap([
        new Direction("front", 0, 0, 1),
        new Direction("right", 1, 0, 0),
        new Direction("back", 0, 0, -1),
        new Direction("left", -1, 0, 0),
        new Direction("top", 0, 1, 0),
        new Direction("bottom", 0, -1, 0)
    ]);

    /**
     * The directions for a simple block.
     *
     * @static
     * @memberof Directions
     */
    static simpleBlock = new DirectionMap([
        new Direction("front", 0, 0, 1),
        new Direction("back", 0, 0, -1),
        new Direction("side", 0, 0, 0),
    ]);
}

export default Directions;
export { Direction, DirectionList, DirectionMap };