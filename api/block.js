import BlockState, { StateId, StateIdBase } from "./blockState.js";
import Mod from "./mod.js";
import Writeable from "./writeable.js";

class Block extends Writeable {
    /**
     * @param {String} id 
     * @param {Mod} parentMod 
     */
    constructor(id, parentMod) {
        super();
        this.id = id;
        this.parentMod = parentMod;
        this.defaultState = new StateIdBase;

        /** @type {Map<StateId, BlockState>} */
        this.states = new Map;
    }

    /** @returns {BlockState} */
    createBlockState(model, settings = {}) {
        const state = new BlockState(this.defaultState.createStateId(), model, settings, this);
        this.states.set(state.id, state);
        return state;
    }

    getFullId() {
        return this.parentMod.id + ":" + this.id;
    }

    getDefaultAsString() {
        return this.getFullId() + "[" + this.defaultState + "]";
    }

    getStringForState(state) {
        return this.getFullId() + "[" + (state.id ?? state).toString() + "]";
    }

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