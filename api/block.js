import BlockState, { StateId, StateIdBase } from "./blockState.js";
import Writeable from "./writeable.js";

class Block extends Writeable {
    constructor(id) {
        super();
        this.id = id;
        this.defaultState = new StateIdBase;

        /** @type {Map<StateId, BlockState>} */
        this.states = new Map;
    }

    /** @returns {BlockState} */
    createBlockState(model, settings) {
        const state = new BlockState(this.defaultState.createStateId(), model, settings);
        this.states.set(state.id, state);
        return state;
    }

    getDefaultAsString() {
        return this.id + "[" + this.defaultState + "]";
    }

    getStringForState(state) {
        return this.id + "[" + (state.id ?? state).toString() + "]";
    }

    serialize(prefix) {
        const blockStates = new Object;
        const hasStates = this.defaultState.keys.size > 0;

        for(const state of this.states.keys()) {
            blockStates[state.toString()] = this.states.get(state).serialize(prefix);
        }
        if(!hasStates) {
            blockStates["default"] = blockStates[""];
            delete blockStates[""];
        }

        const defaultParams = Object.fromEntries((this.defaultState ?? Array.from(this.states.values()).pop().id).toString().split(",").map(v => v.split("=")));

        return {
            stringId: this.id,
            defaultParams: defaultParams,
            blockStates
        }
    }
}



export default Block;