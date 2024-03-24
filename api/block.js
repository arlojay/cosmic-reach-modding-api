import BlockState, { StateId, StateIdBase } from "./blockState.js";
import Writeable from "./writeable.js";

class Block extends Writeable {
    constructor(id) {
        super();
        this.id = id;
        this.defaultState = new StateIdBase;

        /*** @type {Map<StateId, BlockState>} */
        this.states = new Map;
    }

    /*** @returns {BlockState} */
    createBlockState(model, settings) {
        const state = new BlockState(this.defaultState.createStateId(), model, settings);
        this.states.set(state.id, state);
        return state;
    }

    getDefaultAsString() {
        return this.id + "[" + this.defaultState + "]";
    }

    serialize() {
        const blockStates = new Object;

        for(const state of this.states.keys()) {
            blockStates[state.toString()] = this.states.get(state).serialize();
        }

        const defaultParams = Object.fromEntries((this.defaultState ?? Array.from(this.states.values()).pop().id).toString().split(",").map(v => v.split("=")));

        return {
            stringId: this.id, defaultParams, blockStates
        }
    }
}



export default Block;