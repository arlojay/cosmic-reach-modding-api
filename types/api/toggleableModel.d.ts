export default ToggleableModel;
/**
 * A model that can be toggled between different states.
 *
 * @class ToggleableModel
 */
declare class ToggleableModel {
    /**
     * The collections of models that can be toggled.
     *
     * @private
     * @type {Map(String, BlockModel)}
     * @memberof ToggleableModel
     */
    private models;
    /**
     * The base model that the toggleable model is based on.
     *
     * @private
     * @type {BlockModel}
     * @memberof ToggleableModel
     */
    private basemodel;
    /** @type {BlockModel} */
    baseModel: BlockModel;
    /**
     * Sets the base model for the toggleable model.
     *
     * @param {BlockModel} model The base model.
     * @memberof ToggleableModel
     */
    setBaseModel(model: BlockModel): void;
    /**
     * Sets the model for a specific category.
     *
     * @param {string} category The category of the model.
     * @param {BlockModel} model The model to set.
     * @memberof ToggleableModel
     */
    setModel(category: string, model: BlockModel): void;
    /**
     * Gets the model for a specific category.
     *
     * @param {string} category The category of the model.
     * @return {BlockModel}
     * @memberof ToggleableModel
     */
    getModel(category: string): BlockModel;
    /**
     * Creates a new model based on the base model with the specified categories.
     *
     * @param {Array<string>} categories The categories to include in the model.
     * @param {string} name The name of the new model.
     * @return {BlockModel}
     * @memberof ToggleableModel
     */
    create(categories: Array<string>, name: string): BlockModel;
}
import BlockModel from "./blockModel.js";
