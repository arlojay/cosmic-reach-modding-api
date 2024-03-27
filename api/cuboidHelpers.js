import { Box3, Vector3 } from "three";
import Directions, { Direction } from "./directions.js";
import ModelCuboid from "./modelCuboid.js";
import Material from "./material.js";

class FrontBackCuboid {
    constructor(cuboid, frontMaterial, backMaterial, sideMaterialUp, sideMaterialRight, sideMaterialDown, sideMaterialLeft) {
        /** @type {ModelCuboid} */ this.cuboid = cuboid;
        
        /** @type {Material} */ this.frontMaterial = frontMaterial;
        /** @type {Material} */ this.backMaterial = backMaterial;
        /** @type {Material} */ this.sideMaterialUp = sideMaterialUp;
        /** @type {Material} */ this.sideMaterialRight = sideMaterialRight;
        /** @type {Material} */ this.sideMaterialDown = sideMaterialDown;
        /** @type {Material} */ this.sideMaterialLeft = sideMaterialLeft;
    }

    /** @param {Direction} direction */
    getForDirection(direction) {
        const cuboid = this.cuboid.clone();

        if(direction.is("up")) cuboid.setAllMaterials(this.sideMaterialUp);
        if(direction.is("down")) cuboid.setAllMaterials(this.sideMaterialDown);

        if(direction.is("east")) {
            cuboid.setUpMaterial(this.sideMaterialLeft);
            cuboid.setDownMaterial(this.sideMaterialLeft);

            cuboid.setNorthMaterial(this.sideMaterialRight);
            cuboid.setSouthMaterial(this.sideMaterialLeft);
        }
        if(direction.is("west")) {
            cuboid.setUpMaterial(this.sideMaterialRight);
            cuboid.setDownMaterial(this.sideMaterialRight);
            
            cuboid.setNorthMaterial(this.sideMaterialLeft);
            cuboid.setSouthMaterial(this.sideMaterialRight);
        }
        if(direction.is("north")) {
            cuboid.setUpMaterial(this.sideMaterialUp);
            cuboid.setDownMaterial(this.sideMaterialDown);

            cuboid.setEastMaterial(this.sideMaterialLeft);
            cuboid.setWestMaterial(this.sideMaterialRight);
        }
        if(direction.is("south")) {
            cuboid.setUpMaterial(this.sideMaterialDown);
            cuboid.setDownMaterial(this.sideMaterialUp);
            
            cuboid.setEastMaterial(this.sideMaterialRight);
            cuboid.setWestMaterial(this.sideMaterialLeft);
        }

        cuboid.setFaceMaterial(direction, this.frontMaterial);
        cuboid.setFaceMaterial(direction.inverse(), this.backMaterial);

        return cuboid;
    }
}


export { FrontBackCuboid };