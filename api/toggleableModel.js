import ModelCollection from "./modelCollection.js";

class ToggleableModel {
    constructor() {
        /*** @type {Map(String, ModelCollection)} */
        this.models = new Map;
        /*** @type {ModelCollection} */
        this.baseModel = null;
    }
    setBaseModel(model) {
        this.baseModel = model;
    }
    setModel(category, model) {
        this.models.set(category, model);
    }
    getModel(category) {
        return this.models.get(category);
    }

    create(categories, name) {
        const model = this.baseModel ?? new ModelCollection(name);

        for(const category of categories) {
            model.append(this.models.get(category));
        }

        return model.clone(name);
    }
}

export default ToggleableModel;