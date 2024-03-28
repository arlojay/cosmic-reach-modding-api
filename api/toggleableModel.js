import BlockModel from "./blockModel.js";

/**
 * A model that can be toggled between different states.
 *
 * @class ToggleableModel
 */
class ToggleableModel {
    /**
     * The collections of models that can be toggled.
     *
     * @private
     * @type {Map(String, BlockModel)}
     * @memberof ToggleableModel
     */
    models;

    /**
     * The base model that the toggleable model is based on.
     *
     * @private
     * @type {BlockModel}
     * @memberof ToggleableModel
     */
    basemodel;

    /**
     * Initializes a new ToggleableModel.
     * @memberof ToggleableModel
     */
    constructor() {
        /** @type {Map(String, ModelCollection)} */
        this.models = new Map;
        /** @type {BlockModel} */
        this.baseModel = null;
    }

    /**
     * Sets the base model for the toggleable model.
     *
     * @param {BlockModel} model The base model.
     * @memberof ToggleableModel
     */
    setBaseModel(model) {
        this.baseModel = model;
    }

    /**
     * Sets the model for a specific category.
     *
     * @param {string} category The category of the model.
     * @param {BlockModel} model The model to set.
     * @memberof ToggleableModel
     */
    setModel(category, model) {
        this.models.set(category, model);
    }

    /**
     * Gets the model for a specific category.
     *
     * @param {string} category The category of the model.
     * @return {BlockModel} 
     * @memberof ToggleableModel
     */
    getModel(category) {
        return this.models.get(category);
    }

    /**
     * Creates a new model based on the base model with the specified categories.
     *
     * @param {Array<string>} categories The categories to include in the model.
     * @param {string} name The name of the new model.
     * @return {BlockModel} 
     * @memberof ToggleableModel
     */
    create(categories, name) {
        const model = this.baseModel ?? new BlockModel(name);

        for(const category of categories) {
            model.append(this.models.get(category));
        }

        return model.clone(name);
    }
}

export default ToggleableModel;