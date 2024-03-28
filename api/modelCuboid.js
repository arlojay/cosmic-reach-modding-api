import { Box3 } from "three";
import Material from "./material.js";
import { Direction } from "./directions.js";

import BlockModel from "./blockModel.js";

/**
 * @typedef ModelCuboidMaterials
 * @property {Material} west
 * @property {Material} east
 * @property {Material} down
 * @property {Material} up
 * @property {Material} north
 * @property {Material} south
 */

/**
 * @typedef ModelCuboidVisible
 * @property {boolean} west
 * @property {boolean} east
 * @property {boolean} down
 * @property {boolean} up
 * @property {boolean} north
 * @property {boolean} south
 */

/** 
 * The default material for the faces of a cuboid.
 * 
 * @package
 * @readonly
 * @type {Material} 
 */
const DEFAULT_MATERIAL = new Material("debug.png");

/**
 * Defines a cuboid within a {@link BlockModel}.
 *
 * @class ModelCuboid
 */
class ModelCuboid {
    /**
     * The bounding box of the cuboid.
     *
     * @type {Box3}
     * @memberof ModelCuboid
     */
    box;

    /**
     * Whether ambient occlusion is enabled for the cuboid.
     *
     * @type {boolean}
     * @memberof ModelCuboid
     */
    ambientOcclusion;

    /**
     * The materials for each face of the cuboid.
     *
     * @type {ModelCuboidMaterials}
     * @memberof ModelCuboid
     */
    materials;

    /**
     * The visibility of each face of the cuboid.
     *
     * @type {ModelCuboidVisible}
     * @memberof ModelCuboid
     */
    visible;

    /**
     * Initializes a new ModelCuboid.
     * 
     * @param {Box3} box The bounding box of the cuboid.
     * @memberof ModelCuboid
     */
    constructor(box) {
        /**
         * @type {Box3}
         */
        this.box = box;
        this.ambientOcclusion = false;

        this.materials = {
            west: DEFAULT_MATERIAL,
            east: DEFAULT_MATERIAL,
            down: DEFAULT_MATERIAL,
            up: DEFAULT_MATERIAL,
            north: DEFAULT_MATERIAL,
            south: DEFAULT_MATERIAL
        };
        this.visible = {
            west: true,
            east: true,
            down: true,
            up: true,
            north: true,
            south: true
        }
    }

    /** 
     * Sets the ambient occlusion for the cuboid.
     * 
     * @param {boolean} ambientOcclusionEnabled Whether ambient occlusion is enabled.
     * @returns {this} 
     */
    setAmbientOcclusionEnabled(ambientOcclusionEnabled) {
        this.ambientOcclusion = ambientOcclusionEnabled;
        return this;
    }
    
    /** 
     * Sets the material for all faces of the cuboid.
     * 
     * @param {Material} material The material to set.
     * @returns {this} 
     */
    setAllMaterials(material) {
        this.materials.west = this.materials.east = this.materials.down = this.materials.up = this.materials.north = this.materials.south = material;
        return this;
    }
    
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
    setIndividualMaterials(west, east, down, up, north, south) {
        this.materials = { west, east, down, up, north, south };
        return this;
    }
    
    /** 
     * Sets the material for a specific face of the cuboid.
     * 
     * @param {Direction} direction The direction of the face.
     * @param {Material} material The material for the face.
     * @returns {this} 
     */
    setFaceMaterial(direction, material) {
        this.materials[direction.name] = material;
        return this;
    }
    
    /** 
     * Sets the material for the west face of the cuboid.
     * 
     * @param {Material} material The material for the west face.
     * @returns {this} 
     */
    setWestMaterial(material) {
        this.materials.west = material;
        return this;
    }

    /** 
     * Sets the material for the east face of the cuboid.
     * 
     * @param {Material} material The material for the east face.
     * @returns {this} 
     */
    setEastMaterial(material) {
        this.materials.east = material;
        return this;
    }
    
    /** 
     * Sets the material for the down face of the cuboid.
     * 
     * @param {Material} material The material for the down face.
     * @returns {this} 
     */
    setDownMaterial(material) {
        this.materials.down = material;
        return this;
    }
    
    /** 
     * Sets the material for the up face of the cuboid.
     * 
     * @param {Material} material The material for the up face.
     * @returns {this} 
     */
    setUpMaterial(material) {
        this.materials.up = material;
        return this;
    }
    
    /** 
     * Sets the material for the south face of the cuboid.
     * 
     * @param {Material} material The material for the south face.
     * @returns {this} 
     */
    setSouthMaterial(material) {
        this.materials.south = material;
        return this;
    }
    
    /** 
     * Sets the material for the north face of the cuboid.
     * 
     * @param {Material} material The material for the north face.
     * @returns {this} 
     */
    setNorthMaterial(material) {
        this.materials.north = material;
        return this;
    }

    /**
     * Gets the materials for all faces of the cuboid.
     *
     * @return {Array<Material>} 
     * @memberof ModelCuboid
     */
    getMaterials() {
        return Object.values(this.materials);
    }

    
    /** 
     * Sets the visibility for all faces of the cuboid.
     * 
     * @param {boolean} visible Whether the faces are visible.
     * @returns {this} 
     */
    setAllVisible(visible) {
        this.visible.west = this.visible.east = this.visible.down = this.visible.up = this.visible.north = this.visible.south = visible;
        return this;
    }
    
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
    setIndividualVisible(west, east, down, up, north, south) {
        this.visible = { west, east, down, up, north, south };
        return this;
    }
    
    /** 
     * Sets the visibility for a specific face of the cuboid.
     * 
     * @param {Direction} face The direction of the face.
     * @param {boolean} visible Whether the face is visible.
     * @returns {this} 
     */
    setFaceVisible(face, visible) {
        this.visible[face] = visible;
        return this;
    }
    
    /** 
     * Sets the visibility for the west face of the cuboid.
     * 
     * @param {boolean} visible Whether the west face is visible.
     * @returns {this} 
     */
    setWestVisible(visible) {
        this.visible.west = visible;
        return this;
    }
    
    /** 
     * Sets the visibility for the west face of the cuboid.
     * 
     * @param {boolean} visible Whether the west face is visible.
     * @returns {this} 
     */
    setEastVisible(visible) {
        this.visible.east = visible;
        return this;
    }
    
    /** 
     * Sets the visibility for the down face of the cuboid.
     * 
     * @param {boolean} visible Whether the down face is visible.
     * @returns {this} 
     */
    setDownVisible(visible) {
        this.visible.down = visible;
        return this;
    }
    
    /** 
     * Sets the visibility for the up face of the cuboid.
     * 
     * @param {boolean} visible Whether the up face is visible.
     * @returns {this} 
     */
    setUpVisible(visible) {
        this.visible.up = visible;
        return this;
    }
    
    /** 
     * Sets the visibility for the south face of the cuboid.
     * 
     * @param {boolean} visible Whether the south face is visible.
     * @returns {this} 
     */
    setSouthVisible(visible) {
        this.visible.south = visible;
        return this;
    }
    
    /** 
     * Sets the visibility for the north face of the cuboid.
     * 
     * @param {boolean} visible Whether the north face is visible.
     * @returns {this} 
     */
    setNorthVisible(visible) {
        this.visible.north = visible;
        return this;
    }

    /**
     * Gets number of visible faces.
     *
     * @readonly
     * @memberof ModelCuboid
     */
    get visibleFaces() {
        return Object.keys(this.visible).reduce((p, c) => p + this.visible[c], 0)
    }

    
    /** 
     * Applies a matrix transformation to the cuboid.
     * 
     * @param {Matrix4} matrix The matrix to apply.
     * @returns {this} 
     */
    applyMatrixTransform(matrix) {
        this.box.applyMatrix4(matrix);
        return this;
    }

    /**
     * Clones the cuboid into a new instance.
     *
     * @return {ModelCuboid} A new instance of the current cuboid.
     * @memberof ModelCuboid
     */
    clone() {
        const cuboid = new ModelCuboid(this.box.clone());
        cuboid.setAmbientOcclusionEnabled(this.ambientOcclusion);
        Object.assign(cuboid.materials, this.materials);

        return cuboid;
    }

    /**
     * Serializes the cuboid into a JSON object.
     * 
     * @override
     * @return {Object} The serialized cuboid as a JSON object. 
     * @memberof ModelCuboid
     */
    serialize() {
        return {
            localBounds: [
                this.box.min.x, this.box.min.y, this.box.min.z, 
                this.box.max.x, this.box.max.y, this.box.max.z, 
            ],
            faces: {
                localNegX: this.visible.west ? {
                    uv: [ this.box.min.z, 16 - this.box.max.y, this.box.max.z, 16 - this.box.min.y ],
                    ambientocclusion: this.ambientOcclusion,
                    cullFace: this.box.min.x == 0,
                    texture: this.materials.west.id
                } : undefined,
                localNegY: this.visible.down ? {
                    uv: [ 16 - this.box.min.x, this.box.max.z, 16 - this.box.max.x, this.box.min.z ],
                    ambientocclusion: this.ambientOcclusion,
                    cullFace: this.box.min.y == 0,
                    texture: this.materials.down.id
                } : undefined,
                localNegZ: this.visible.south ? {
                    uv: [ 16 - this.box.min.x, 16 - this.box.max.y, 16 - this.box.max.x, 16 - this.box.min.y ],
                    ambientocclusion: this.ambientOcclusion,
                    cullFace: this.box.min.z == 0,
                    texture: this.materials.south.id
                } : undefined,
                localPosX: this.visible.east ? {
                    uv: [ 16 - this.box.max.z, 16 - this.box.max.y, 16 - this.box.min.z, 16 - this.box.min.y ],
                    ambientocclusion: this.ambientOcclusion,
                    cullFace: this.box.max.x == 16,
                    texture: this.materials.east.id
                } : undefined,
                localPosY: this.visible.up ? {
                    uv: [ 16 - this.box.min.x, 16 - this.box.min.z, 16 - this.box.max.x, 16 - this.box.max.z ],
                    ambientocclusion: this.ambientOcclusion,
                    cullFace: this.box.max.y == 16,
                    texture: this.materials.up.id
                } : undefined,
                localPosZ: this.visible.north ? {
                    uv: [ this.box.min.x, 16 - this.box.max.y, this.box.max.x, 16 - this.box.min.y ],
                    ambientocclusion: this.ambientOcclusion,
                    cullFace: this.box.max.z == 16,
                    texture: this.materials.north.id
                } : undefined
            }
        }
    }
}

export default ModelCuboid;