/**
 * Defines a cuboid that has different materials depending on it's direction.
 *
 * @class FrontBackCuboid
 */
export class FrontBackCuboid {
    /**
     * Initializes a new FrontBackCuboid.
     * @param {ModelCuboid} cuboid
     * @param {Material} frontMaterial
     * @param {Material} backMaterial
     * @param {Material} sideMaterialUp
     * @param {Material} sideMaterialRight
     * @param {Material} sideMaterialDown
     * @param {Material} sideMaterialLeft
     * @memberof FrontBackCuboid
     */
    constructor(cuboid: ModelCuboid, frontMaterial: Material, backMaterial: Material, sideMaterialUp: Material, sideMaterialRight: Material, sideMaterialDown: Material, sideMaterialLeft: Material);
    /**
     * The cuboid used within this structure.
     *
     * @private
     * @type {ModelCuboid}
     * @memberof FrontBackCuboid
     */
    private cuboid;
    /**
     * The front material.
     *
     * @type {Material}
     * @memberof FrontBackCuboid
     */
    frontMaterial: Material;
    /**
     * The back material.
     *
     * @type {Material}
     * @memberof FrontBackCuboid
     */
    backMaterial: Material;
    /**
     * The up material.
     *
     * @type {Material}
     * @memberof FrontBackCuboid
     */
    upMaterial: Material;
    /**
     * The down material.
     *
     * @type {Material}
     * @memberof FrontBackCuboid
     */
    downMaterial: Material;
    /**
     * The right material.
     *
     * @type {Material}
     * @memberof FrontBackCuboid
     */
    rightMaterial: Material;
    /**
     * The left material.
     *
     * @type {Material}
     * @memberof FrontBackCuboid
     */
    leftMaterial: Material;
    /** @type {Material} */ sideMaterialUp: Material;
    /** @type {Material} */ sideMaterialRight: Material;
    /** @type {Material} */ sideMaterialDown: Material;
    /** @type {Material} */ sideMaterialLeft: Material;
    /**
     * Calculates the materials for the cuboid for the specified direction and returns it.
     *
     * @param {Direction} direction The direction to get the cuboid for.
     * @returns {ModelCuboid}
     */
    getForDirection(direction: Direction): ModelCuboid;
}
import Material from "./material.js";
import { Direction } from "./directions.js";
import ModelCuboid from "./modelCuboid.js";
