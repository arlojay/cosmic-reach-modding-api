export default BlockModel;
/**
 * Defines a block model within a {@link Mod}.
 *
 * @class BlockModel
 * @extends {Writeable}
 */
declare class BlockModel extends Writeable {
    /**
     * Initializes a new BlockModel.
     *
     * @param {string} name
     * @memberof BlockModel
     */
    constructor(name: string);
    /**
     * The name of the block model.
     *
     * @type {string}
     * @memberof BlockModel
     */
    name: string;
    /**
     * The cuboids that make up the block model.
     *
     * @type {Array<ModelCuboid>}
     * @memberof BlockModel
     */
    cuboids: Array<ModelCuboid>;
    /**
     * Sets the ambient occlusion for the block model.
     *
     * @param {boolean} enableAmbientOcclusion Whether ambient occlusion is enabled.
     * @memberof BlockModel
     */
    setAmbientOcclusionEnabled(enableAmbientOcclusion: boolean): void;
    /**
     * Serializes the block model into a JSON object.
     *
     * @override
     * @return {Object} The serialized block model as a JSON object.
     * @memberof BlockModel
     */
    override serialize(): any;
    /**
     * Adds a cuboid to the block model.
     *
     * @param {ModelCuboid} cuboid The cuboid to add.
     * @return {this}
     * @memberof BlockModel
     */
    addCuboid(cuboid: ModelCuboid): this;
    /**
     * Adds multiple cuboids to the block model.
     *
     * @param {...ModelCuboid} cuboids The cuboids to add.
     * @return {this}
     * @memberof BlockModel
     */
    addCuboids(...cuboids: ModelCuboid[]): this;
    /**
     * Sets the {@link Material} for all cuboids in the block model.
     *
     * @param {ModelCuboid} cuboid The cuboid to add.
     * @return {this}
     * @memberof BlockModel
     */
    setAllMaterials(material: any): this;
    /** @returns {Array<Material>} */
    getAllMaterials(): Array<Material>;
    /**
     * Appends the cuboid data from another BlockModel to current BlockModel.
     *
     * @param {BlockModel} other The BlockModel to append.
     * @return {this} The current BlockModel.
     * @memberof BlockModel
     */
    append(other: BlockModel): this;
    /**
     * Clones the BlockModel into a new instance.
     *
     * @param {string} [name=this.name]
     * @return {BlockModel} A new instance of the current BlockModel.
     * @memberof BlockModel
     */
    clone(name?: string): BlockModel;
    /**
     * Applies a matrix transformation to the block model.
     *
     * @param {Matrix4} matrix The matrix transformation to apply.
     * @return {this}
     * @memberof BlockModel
     */
    applyMatrixTransform(matrix: Matrix4): this;
    /**
     * Translates the block model by the given offset.
     *
     * @param {Vector3} offset The offset to translate the block model by.
     * @return {this}
     * @memberof BlockModel
     */
    translate(offset: Vector3): this;
    /**
     * Rotates the block model by the given euler angles.
     *
     * @param {Euler} euler The euler angles to rotate the block model by.
     * @return {this}
     * @memberof BlockModel
     */
    rotate(euler: Euler): this;
    /**
     * Scales the block model by the given vector.
     *
     * @param {import("three").Vector3Like} vector The vector to scale the block model by.
     * @return {this}
     * @memberof BlockModel
     */
    scale(vector: any): this;
    /**
     * Rotates the block model around its center by the given euler angles.
     *
     * @param {Euler} euler The euler angles to rotate the block model by.
     * @return {this}
     * @memberof BlockModel
     */
    rotateCentered(euler: Euler): this;
    /**
     * Scales the block model around its center by the given vector.
     *
     * @param {import("three").Vector3Like} vector
     * @return {this}
     * @memberof BlockModel
     */
    scaleCentered(vector: any): this;
}
import Writeable from "./writeable.js";
import ModelCuboid from "./modelCuboid.js";
import Material from "./material.js";
