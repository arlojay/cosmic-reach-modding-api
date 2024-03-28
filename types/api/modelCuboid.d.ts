export default ModelCuboid;
export type ModelCuboidMaterials = {
    west: Material;
    east: Material;
    down: Material;
    up: Material;
    north: Material;
    south: Material;
};
export type ModelCuboidVisible = {
    west: boolean;
    east: boolean;
    down: boolean;
    up: boolean;
    north: boolean;
    south: boolean;
};
/**
 * Defines a cuboid within a {@link BlockModel}.
 *
 * @class ModelCuboid
 */
declare class ModelCuboid {
    /**
     * Initializes a new ModelCuboid.
     *
     * @param {Box3} box The bounding box of the cuboid.
     * @memberof ModelCuboid
     */
    constructor(box: Box3);
    /**
     * The bounding box of the cuboid.
     *
     * @type {Box3}
     * @memberof ModelCuboid
     */
    box: Box3;
    /**
     * Whether ambient occlusion is enabled for the cuboid.
     *
     * @type {boolean}
     * @memberof ModelCuboid
     */
    ambientOcclusion: boolean;
    /**
     * The materials for each face of the cuboid.
     *
     * @type {ModelCuboidMaterials}
     * @memberof ModelCuboid
     */
    materials: ModelCuboidMaterials;
    /**
     * The visibility of each face of the cuboid.
     *
     * @type {ModelCuboidVisible}
     * @memberof ModelCuboid
     */
    visible: ModelCuboidVisible;
    /**
     * Sets the ambient occlusion for the cuboid.
     *
     * @param {boolean} ambientOcclusionEnabled Whether ambient occlusion is enabled.
     * @returns {this}
     */
    setAmbientOcclusionEnabled(ambientOcclusionEnabled: boolean): this;
    /**
     * Sets the material for all faces of the cuboid.
     *
     * @param {Material} material The material to set.
     * @returns {this}
     */
    setAllMaterials(material: Material): this;
    /**
     * Sets the material for each face of the cuboid individually.
     *
     * @param {Material} west The material for the west face.
     * @param {Material} east The material for the east face.
     * @param {Material} down The material for the down face.
     * @param {Material} up The material for the up face.
     * @param {Material} north The material for the north face.
     * @param {Material} south The material for the south face.
     * @returns {this}
     */
    setIndividualMaterials(west: Material, east: Material, down: Material, up: Material, north: Material, south: Material): this;
    /**
     * Sets the material for a specific face of the cuboid.
     *
     * @param {Direction} direction The direction of the face.
     * @param {Material} material The material for the face.
     * @returns {this}
     */
    setFaceMaterial(direction: Direction, material: Material): this;
    /**
     * Sets the material for the west face of the cuboid.
     *
     * @param {Material} material The material for the west face.
     * @returns {this}
     */
    setWestMaterial(material: Material): this;
    /**
     * Sets the material for the east face of the cuboid.
     *
     * @param {Material} material The material for the east face.
     * @returns {this}
     */
    setEastMaterial(material: Material): this;
    /**
     * Sets the material for the down face of the cuboid.
     *
     * @param {Material} material The material for the down face.
     * @returns {this}
     */
    setDownMaterial(material: Material): this;
    /**
     * Sets the material for the up face of the cuboid.
     *
     * @param {Material} material The material for the up face.
     * @returns {this}
     */
    setUpMaterial(material: Material): this;
    /**
     * Sets the material for the south face of the cuboid.
     *
     * @param {Material} material The material for the south face.
     * @returns {this}
     */
    setSouthMaterial(material: Material): this;
    /**
     * Sets the material for the north face of the cuboid.
     *
     * @param {Material} material The material for the north face.
     * @returns {this}
     */
    setNorthMaterial(material: Material): this;
    /**
     * Gets the materials for all faces of the cuboid.
     *
     * @return {Array<Material>}
     * @memberof ModelCuboid
     */
    getMaterials(): Array<Material>;
    /**
     * Sets the visibility for all faces of the cuboid.
     *
     * @param {boolean} visible Whether the faces are visible.
     * @returns {this}
     */
    setAllVisible(visible: boolean): this;
    /**
     * Sets the visibility for each face of the cuboid individually.
     *
     * @param {boolean} west  Whether the west face is visible.
     * @param {boolean} east  Whether the east face is visible.
     * @param {boolean} down  Whether the down face is visible.
     * @param {boolean} up    Whether the up face is visible.
     * @param {boolean} north Whether the north face is visible.
     * @param {boolean} south Whether the south face is visible.
     * @returns {this}
     */
    setIndividualVisible(west: boolean, east: boolean, down: boolean, up: boolean, north: boolean, south: boolean): this;
    /**
     * Sets the visibility for a specific face of the cuboid.
     *
     * @param {Direction} face The direction of the face.
     * @param {boolean} visible Whether the face is visible.
     * @returns {this}
     */
    setFaceVisible(face: Direction, visible: boolean): this;
    /**
     * Sets the visibility for the west face of the cuboid.
     *
     * @param {boolean} visible Whether the west face is visible.
     * @returns {this}
     */
    setWestVisible(visible: boolean): this;
    /**
     * Sets the visibility for the west face of the cuboid.
     *
     * @param {boolean} visible Whether the west face is visible.
     * @returns {this}
     */
    setEastVisible(visible: boolean): this;
    /**
     * Sets the visibility for the down face of the cuboid.
     *
     * @param {boolean} visible Whether the down face is visible.
     * @returns {this}
     */
    setDownVisible(visible: boolean): this;
    /**
     * Sets the visibility for the up face of the cuboid.
     *
     * @param {boolean} visible Whether the up face is visible.
     * @returns {this}
     */
    setUpVisible(visible: boolean): this;
    /**
     * Sets the visibility for the south face of the cuboid.
     *
     * @param {boolean} visible Whether the south face is visible.
     * @returns {this}
     */
    setSouthVisible(visible: boolean): this;
    /**
     * Sets the visibility for the north face of the cuboid.
     *
     * @param {boolean} visible Whether the north face is visible.
     * @returns {this}
     */
    setNorthVisible(visible: boolean): this;
    /**
     * Gets number of visible faces.
     *
     * @readonly
     * @memberof ModelCuboid
     */
    readonly get visibleFaces(): any;
    /**
     * Applies a matrix transformation to the cuboid.
     *
     * @param {Matrix4} matrix The matrix to apply.
     * @returns {this}
     */
    applyMatrixTransform(matrix: Matrix4): this;
    /**
     * Clones the cuboid into a new instance.
     *
     * @return {ModelCuboid} A new instance of the current cuboid.
     * @memberof ModelCuboid
     */
    clone(): ModelCuboid;
    /**
     * Serializes the cuboid into a JSON object.
     *
     * @override
     * @return {Object} The serialized cuboid as a JSON object.
     * @memberof ModelCuboid
     */
    override serialize(): any;
}
import Material from "./material.js";
import { Direction } from "./directions.js";
