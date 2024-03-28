import { Euler, Matrix4, Vector3 } from "three";
import Writeable from "./writeable.js";
import ModelCuboid from "./modelCuboid.js";
import Material from "./material.js";

/**
 * Defines a block model within a {@link Mod}.
 *
 * @class BlockModel
 * @extends {Writeable}
 */
class BlockModel extends Writeable {
    /**
     * The name of the block model.
     *
     * @type {string}
     * @memberof BlockModel
     */
    name;

    /**
     * The cuboids that make up the block model.
     *
     * @type {Array<ModelCuboid>}
     * @memberof BlockModel
     */
    cuboids;

    /**
     * Initializes a new BlockModel.
     * 
     * @param {string} name
     * @memberof BlockModel
     */
    constructor(name) {
        super();
        this.name = name;

        /** @type {Array<ModelCuboid>} */
        this.cuboids = new Array;
    }

    /**
     * Sets the ambient occlusion for the block model.
     *
     * @param {boolean} enableAmbientOcclusion Whether ambient occlusion is enabled.
     * @memberof BlockModel
     */

    setAmbientOcclusionEnabled(enableAmbientOcclusion) {
        for(const cuboid of this.cuboids) {
            cuboid.setAmbientOcclusionEnabled(enableAmbientOcclusion);
        }
    }

    /**
     * Serializes the block model into a JSON object.
     * 
     * @override
     * @return {Object} The serialized block model as a JSON object. 
     * @memberof BlockModel
     */
    serialize() {
        const textures = new Object;
    
        const totalMaterials = this.getAllMaterials();
        
        for(const material of totalMaterials) {
            textures[material.id] = material.serialize();
        }
    
        return {
            textures, cuboids: this.cuboids.filter(v => v.visibleFaces > 0).map(cuboid => cuboid.serialize())
        }
    }

    /**
     * Adds a cuboid to the block model.
     *
     * @param {ModelCuboid} cuboid The cuboid to add.
     * @return {this} 
     * @memberof BlockModel
     */
    addCuboid(cuboid) {
        this.cuboids.push(cuboid);
        return this;
    }
    
    /**
     * Adds multiple cuboids to the block model.
     *
     * @param {...ModelCuboid} cuboids The cuboids to add.
     * @return {this} 
     * @memberof BlockModel
     */
    addCuboids(...cuboids) {
        this.cuboids.push(...cuboids);
        return this;
    }
    
    /**
     * Sets the {@link Material} for all cuboids in the block model.
     *
     * @param {ModelCuboid} cuboid The cuboid to add.
     * @return {this} 
     * @memberof BlockModel
     */
    setAllMaterials(material) {
        for(const cuboid of this.cuboids) {
            cuboid.setAllMaterials(material);
        }
    }

    /** @returns {Array<Material>} */
    getAllMaterials() {
        const materials = new Set;
        for(const cuboid of this.cuboids) {
            cuboid.getMaterials().forEach(material => materials.add(material));
        }
        return Array.from(materials);
    }

    /**
     * Appends the cuboid data from another BlockModel to current BlockModel.
     *
     * @param {BlockModel} other The BlockModel to append.
     * @return {this} The current BlockModel.
     * @memberof BlockModel
     */
    append(other) {
        for(const cuboid of other.cuboids) this.addCuboid(cuboid.clone());

        return this;
    }

    
    /**
     * Clones the BlockModel into a new instance.
     *
     * @param {string} [name=this.name]
     * @return {BlockModel} A new instance of the current BlockModel.
     * @memberof BlockModel
     */
    clone(name = this.name) {
        const model = new BlockModel(name);
        for(const cuboid of this.cuboids) model.addCuboid(cuboid.clone());

        return model;
    }
    
    /**
     * Applies a matrix transformation to the block model.
     *
     * @param {Matrix4} matrix The matrix transformation to apply.
     * @return {this} 
     * @memberof BlockModel
     */
    applyMatrixTransform(matrix) {
        for(const cuboid of this.cuboids) {
            cuboid.applyMatrixTransform(matrix);
        }
        return this;
    }

    /**
     * Translates the block model by the given offset.
     *
     * @param {Vector3} offset The offset to translate the block model by.
     * @return {this} 
     * @memberof BlockModel
     */
    translate(offset) {
        return this.applyMatrixTransform(new Matrix4().setPosition(offset));
    }

    /**
     * Rotates the block model by the given euler angles.
     *
     * @param {Euler} euler The euler angles to rotate the block model by.
     * @return {this} 
     * @memberof BlockModel
     */
    rotate(euler) {
        return this.applyMatrixTransform(new Matrix4().makeRotationFromEuler(euler));
    }

    /**
     * Scales the block model by the given vector.
     *
     * @param {import("three").Vector3Like} vector The vector to scale the block model by.
     * @return {this} 
     * @memberof BlockModel
     */
    scale(vector) {
        return this.applyMatrixTransform(new Matrix4().makeScale(vector.x, vector.y, vector.z));
    }
 
    /**
     * Rotates the block model around its center by the given euler angles.
     *
     * @param {Euler} euler The euler angles to rotate the block model by.
     * @return {this} 
     * @memberof BlockModel
     */
    rotateCentered(euler) {
        return this.translate(new Vector3(-8, -8, -8)).rotate(euler).translate(new Vector3(8, 8, 8));
    }

    /**
     * Scales the block model around its center by the given vector.
     *
     * @param {import("three").Vector3Like} vector
     * @return {this} 
     * @memberof BlockModel
     */
    scaleCentered(vector) {
        return this.translate(new Vector3(-8, -8, -8)).scale(vector).translate(new Vector3(8, 8, 8));
    }
}

export default BlockModel;