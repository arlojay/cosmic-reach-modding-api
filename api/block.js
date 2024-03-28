import BlockState, { StateId, StateIdBase } from "./blockState.js";
import Mod from "./mod.js";
import Writeable from "./writeable.js";

import BlockModel from "./blockModel.js";

/**
 * Defines a block within a {@link Mod}.
 *
 * @class Block
 * @extends {Writeable}
 */
class Block extends Writeable {
    /**
     * The unique id for this block.
     *
     * @type {string}
     * @memberof Block
     */
    id;

    /**
     * The {@link Mod} instance that contains this block.
     *
     * @memberof Block
     */
    parentMod;

    /**
     * The default {@link BlockState} for this block.
     *
     * @memberof Block
     */
    defaultState;

    /**
     * The list of {@link BlockState|BlockStates} for this block.
     *
     * @memberof Block
     */
    states;

    /**
     * Initializes a new block.
     * 
     * @param {string} id The unique id for this block.
     * @param {Mod} parentMod The {@link Mod} instance that contains this block.
     * @memberof Block
     */
    constructor(id, parentMod) {
        super();
        this.id = id;
        this.parentMod = parentMod;
        this.defaultState = new StateIdBase;

        /** @type {Map<StateId, BlockState>} */
        this.states = new Map;
    }

    /** 
     * Creates a new {@link BlockState} for this block.
     * 
     * @param {BlockModel} model The model for the state.
     * @returns {BlockState} The generated BlockState.
     * @memberof Block
     */
    createBlockState(model, settings = {}) {
        const state = new BlockState(this.defaultState.createStateId(), model, settings, this);
        this.states.set(state.id, state);
        return state;
    }

    /**
     * Returns the full id for this block within its parent {@link Mod}.
     *
     * @return {string} 
     * @memberof Block
     */
    getFullId() {
        return this.parentMod.id + ":" + this.id;
    }

    /**
     * Returns the identifier for the default {@link BlockState} within this block.
     *
     * @return {string} 
     * @memberof Block
     */
    getDefaultAsString() {
        return this.getFullId() + "[" + this.defaultState + "]";
    }

    /**
     * Returns the identifier for a given {@link BlockState} within this block.
     *
     * @param {BlockState} state The {@link BlockState} to get the identifier from.
     * @return {string} 
     * @memberof Block
     */
    getStringForState(state) {
        return this.getFullId() + "[" + (state.id ?? state).toString() + "]";
    }

    /**
     * Serializes this block and returns it as a JSON object.
     *
     * @override
     * @return {Object} 
     * @memberof Block
     */
    serialize() {
        const blockStates = new Object;
        const hasStates = this.defaultState.keys.size > 0;

        for(const state of this.states.keys()) {
            blockStates[state.toString()] = this.states.get(state).serialize();
        }
        if(!hasStates) {
            blockStates["default"] = blockStates[""];
            delete blockStates[""];
        }

        const defaultParams = Object.fromEntries((this.defaultState ?? Array.from(this.states.values()).pop().id).toString().split(",").map(v => v.split("=")));

        return {
            stringId: this.getFullId(),
            defaultParams: defaultParams,
            blockStates
        }
    }
}



export default Block;