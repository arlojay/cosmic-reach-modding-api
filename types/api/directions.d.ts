export default Directions;
/**
 * Defines a set of predefined {@link Direction|Directions}.
 *
 * @class Directions
 */
declare class Directions {
    /**
     * Capitalizes the first character of a direction name.
     *
     * @static
     * @param {string} direction The direction name to capitalize.
     * @return {string}
     * @memberof Directions
     */
    static capitalize(direction: string): string;
    /**
     * Uncapitalizes all charactera of a direction name.
     *
     * @static
     * @param {string} direction
     * @return {string}
     * @memberof Directions
     */
    static uncapitalize(direction: string): string;
    /**
     * The cardinal directions.
     *
     * @static
     * @memberof Directions
     */
    static cardinals: DirectionMap;
    /**
     * The relative directions.
     *
     * @static
     * @memberof Directions
     */
    static relative: DirectionMap;
    /**
     * The directions for a simple block.
     *
     * @static
     * @memberof Directions
     */
    static simpleBlock: DirectionMap;
}
/**
 * Defines a direction.
 *
 * @class Direction
 */
export class Direction {
    /**
     * Initializes a new Direction.
     * @param {string} name
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @memberof Direction
     */
    constructor(name: string, x: number, y: number, z: number);
    /**
     * The direction map for this direction.
     *
     * @type {DirectionMap}
     * @memberof Direction
     */
    directionMap: DirectionMap;
    /**
     * The name of this direction.
     *
     * @type {string}
     * @memberof Direction
     */
    name: string;
    /**
     * The vector for this direction.
     *
     * @type {Vector3}
     * @memberof Direction
     */
    vector: Vector3;
    /**
     * Sets the direction map for this direction.
     *
     * @param {DirectionMap} directionMap
     * @memberof Direction
     */
    setDirectionMap(directionMap: DirectionMap): void;
    /**
     * The x component of the direction.
     *
     * @readonly
     * @type {number}
     * @memberof Direction
     */
    readonly get x(): number;
    /**
     * The y component of the direction.
     *
     * @readonly
     * @type {number}
     * @memberof Direction
     */
    readonly get y(): number;
    /**
     * The z component of the direction.
     *
     * @readonly
     * @type {number}
     * @memberof Direction
     */
    readonly get z(): number;
    /**
     * The name of the direction with the first letter capitalized.
     *
     * @readonly
     * @memberof Direction
     */
    readonly get uppercaseName(): string;
    /**
     * Checks whether a direction name is equal to this direction name.
     *
     * @param {string} name The name to check.
     * @return {boolean}
     * @memberof Direction
     */
    is(name: string): boolean;
    /**
     * Returns the inverse of this direction.
     *
     * @return {Direction}
     * @memberof Direction
     */
    inverse(): Direction;
    /**
     * Returns the string representation of the direction.
     *
     * @return {string}
     * @memberof Direction
     */
    toString(): string;
    [Symbol.iterator](): Generator<any, void, any>;
}
/**
 * Defines a list of {@link Direction|Directions}.
 *
 * @class DirectionList
 */
export class DirectionList {
    /**
     * Initializes a new DirectionList.
     * @param {Array<Direction>} [directions=[]] The {@link Direction|Directions} to initialize the list with.
     * @memberof DirectionList
     */
    constructor(directions?: Array<Direction>);
    /**
     * The {@link Direction|Directions} in the list.
     *
     * @type {Set<Direction>}
     * @memberof DirectionList
     */
    directions: Set<Direction>;
    /**
     * Adds a {@link Direction} to the list.
     *
     * @param {Direction} direction The {@link Direction} to add.
     * @memberof DirectionList
     */
    add(direction: Direction): void;
    /**
     * Removes a {@link Direction} from the list.
     *
     * @param {Direction} direction The {@link Direction} to remove.
     * @memberof DirectionList
     */
    remove(direction: Direction): void;
    /**
     * Checks whether a {@link Direction} exists in the list.
     *
     * @param {Direction} direction The {@link Direction} to check.
     * @memberof DirectionList
     */
    has(direction: Direction): void;
    /**
     * The number of {@link Direction|Directions} in the list.
     *
     * @readonly
     * @memberof DirectionList
     */
    readonly get size(): number;
    /**
     * Executes a provided function once per each {@link Direction} in the list, in insertion order.
     * @param {function(Direction, Number, Set)} callback
     */
    forEach(callback: (arg0: Direction, arg1: number, arg2: Set<any>) => any): void;
    /**
     * Checks whether a direction with the specified name exists in the list.
     *
     * @param {string} name The name of the direction to check.
     * @return {boolean}
     * @memberof DirectionList
     */
    hasDirection(name: string): boolean;
    /**
     * Removes a direction with the specified name from the list.
     *
     * @param {string} name
     * @memberof DirectionList
     */
    removeDirection(name: string): void;
    /**
     * Creates a bitmask from a {@link DirectionMap}.
     *
     * @param {DirectionMap} directionMap
     * @return {number}
     * @memberof DirectionList
     */
    createBitmask(directionMap: DirectionMap): number;
    /**
     * Inverts a {@link DirectionMap}.
     *
     * @param {DirectionMap} directionMap
     * @return {*}
     * @memberof DirectionList
     */
    invert(directionMap: DirectionMap): any;
    /**
     * Clones the direction list into a new instance.
     *
     * @param {string} [id=this.id]
     * @return {DirectionList} A new instance of the current direction list.
     * @memberof DirectionList
     */
    clone(): DirectionList;
    /**
     * Returns the string representation of the direction list.
     *
     * @return {*}
     * @memberof DirectionList
     */
    toString(): any;
    [Symbol.iterator](): Generator<Direction, void, undefined>;
}
/**
 * Defines a map of {@link Direction|Directions}.
 *
 * @class DirectionMap
 */
export class DirectionMap {
    /**
     * Initializes a new DirectionMap.
     * @param {Array<Direction>} [directions=[]] The {@link Direction|Directions} to initialize the map with.
     * @memberof DirectionMap
     */
    constructor(directions?: Array<Direction>);
    /**
     * The {@link Direction|Directions} in the list.
     *
     * @type {Map<String, Direction>}
     * @memberof DirectionList
     */
    directions: Map<string, Direction>;
    /**
     * Adds a {@link Direction} to the map.
     *
     * @param {Direction} direction The {@link Direction} to add.
     * @memberof DirectionMap
     */
    addDirection(direction: Direction): void;
    /**
     * Gets a {@link Direction} from the map by name.
     *
     * @param {string} name The name of the direction to get.
     * @return {Direction}
     * @memberof DirectionMap
     */
    getDirection(name: string): Direction;
    /**
     * Gets the {@link Direction|Directions} within the map.
     *
     * @return {Array<Direction>}
     * @memberof DirectionMap
     */
    values(): Array<Direction>;
    /**
     * Gets the direction names within the map.
     *
     * @return {Array<string>}
     * @memberof DirectionMap
     */
    keys(): Array<string>;
    /**
     * Returns the inverse of a direction.
     *
     * @param {Direction} direction The direction to invert.
     * @returns {Direction}
     */
    inverse(direction: Direction): Direction;
    /**
     * Returns the direction closest to a vector.
     *
     * @param {Vector3} vector The vector to compare.
     */
    vectorToDirection(vector: Vector3): Direction;
    /**
     * Returns the adjacency list for the direction map.
     * @returns {Array<DirectionList>}
     */
    combinations(): Array<DirectionList>;
    [Symbol.iterator](): Generator<Direction, void, undefined>;
}
