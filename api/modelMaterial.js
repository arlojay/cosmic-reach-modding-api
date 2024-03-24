let materialCount = 0;

class ModelMaterial {
    constructor(texture) {
        this.id = "material_" + materialCount++;
        this.texture = texture;
    }
    serialize() {
        return {
            fileName: this.texture
        }
    }
}

export default ModelMaterial;