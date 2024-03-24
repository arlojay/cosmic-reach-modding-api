import { Matrix4, Vector3 } from "three";
import Writeable from "./writeable.js";
import ModelCuboid from "./modelCuboid.js";

class ModelCollection extends Writeable {
    constructor(name) {
        super();
        this.name = name;

        /*** @type {Array<ModelCuboid>} */
        this.cuboids = new Array;
    }
    setAmbientOcclusionEnabled(enableAmbientOcclusion) {
        for(const cuboid of this.cuboids) {
            cuboid.setAmbientOcclusionEnabled(enableAmbientOcclusion);
        }
    }
    serialize() {
        const textures = new Object;
    
        const totalMaterials = new Set;
        for(const cuboid of this.cuboids) {
            cuboid.getMaterials().forEach(material => totalMaterials.add(material));
        }
        for(const material of totalMaterials) {
            textures[material.id] = material.serialize();
        }
    
        return {
            textures, cuboids: this.cuboids.filter(v => v.visibleFaces > 0).map(cuboid => cuboid.serialize())
        }
    }
    addCuboid(cuboid) {
        this.cuboids.push(cuboid);
        return this;
    }
    addCuboids(...cuboids) {
        this.cuboids.push(...cuboids);
        return this;
    }
    setAllMaterials(material) {
        for(const cuboid of this.cuboids) {
            cuboid.setAllMaterials(material);
        }
    }

    append(other) {
        for(const cuboid of other.cuboids) this.addCuboid(cuboid.clone());

        return this;
    }
    clone(name = this.name) {
        const model = new ModelCollection(name);
        for(const cuboid of this.cuboids) model.addCuboid(cuboid.clone());

        return model;
    }
    
    applyMatrixTransform(matrix) {
        for(const cuboid of this.cuboids) {
            cuboid.applyMatrixTransform(matrix);
        }
        return this;
    }

    translate(offset) {
        return this.applyMatrixTransform(new Matrix4().setPosition(offset));
    }

    rotate(euler) {
        return this.applyMatrixTransform(new Matrix4().makeRotationFromEuler(euler));
    }

    scale(vector) {
        return this.applyMatrixTransform(new Matrix4().makeScale(vector.x, vector.y, vector.z));
    }

    rotateCentered(euler) {
        return this.translate(new Vector3(-8, -8, -8)).rotate(euler).translate(new Vector3(8, 8, 8));
    }
    scaleCentered(vector) {
        return this.translate(new Vector3(-8, -8, -8)).scale(vector).translate(new Vector3(8, 8, 8));
    }
}

export default ModelCollection;