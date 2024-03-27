import { Box3 } from "three";
import Material from "./material.js";
import { Direction } from "./directions.js";

const DEFAULT_MATERIAL = new Material("debug.png");

class ModelCuboid {
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

    /** @returns {ModelCuboid} */
    setAmbientOcclusionEnabled(ambientOcclusionEnabled) {
        this.ambientOcclusion = ambientOcclusionEnabled;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setAllMaterials(material) {
        this.materials.west = this.materials.east = this.materials.down = this.materials.up = this.materials.north = this.materials.south = material;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setIndividualMaterials(west, east, down, up, north, south) {
        this.materials = { west, east, down, up, north, south };
        return this;
    }
    
    /** @param {Direction} direction * @returns {ModelCuboid} */
    setFaceMaterial(direction, material) {
        this.materials[direction.name] = material;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setWestMaterial(material) {
        this.materials.west = material;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setEastMaterial(material) {
        this.materials.east = material;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setDownMaterial(material) {
        this.materials.down = material;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setUpMaterial(material) {
        this.materials.up = material;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setSouthMaterial(material) {
        this.materials.south = material;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setNorthMaterial(material) {
        this.materials.north = material;
        return this;
    }

    getMaterials() {
        return Object.values(this.materials);
    }

    
    /** @returns {ModelCuboid} */
    setAllVisible(visible) {
        this.visible.west = this.visible.east = this.visible.down = this.visible.up = this.visible.north = this.visible.south = visible;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setIndividualVisible(west, east, down, up, north, south) {
        this.visible = { west, east, down, up, north, south };
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setFaceVisible(face, visible) {
        this.visible[face] = visible;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setWestVisible(visible) {
        this.visible.west = visible;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setEastVisible(visible) {
        this.visible.east = visible;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setDownVisible(visible) {
        this.visible.down = visible;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setUpVisible(visible) {
        this.visible.up = visible;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setSouthVisible(visible) {
        this.visible.south = visible;
        return this;
    }
    
    /** @returns {ModelCuboid} */
    setNorthVisible(visible) {
        this.visible.north = visible;
        return this;
    }

    get visibleFaces() {
        return Object.keys(this.visible).reduce((p, c) => p + this.visible[c], 0)
    }

    
    /** @returns {ModelCuboid} */
    applyMatrixTransform(matrix) {
        this.box.applyMatrix4(matrix);
        return this;
    }
    clone() {
        const cuboid = new ModelCuboid(this.box.clone());
        cuboid.setAmbientOcclusionEnabled(this.ambientOcclusion);
        Object.assign(cuboid.materials, this.materials);

        return cuboid;
    }
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