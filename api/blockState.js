import Block from "./block.js";
import BlockModel from "./blockModel.js";
import TriggerSheet from "./triggerSheet.js";

/**
 * Defines a state id for a {@link BlockState}.
 *
 * @class StateId
 */
class StateId {
    /**
     * The base for this state id.
     *
     * @type {StateIdBase}
     * @memberof StateId
     */
    base;
    
    /**
     * The states for this state id.
     * 
     * @type {Map<String, String>}
     * @memberof StateId
     */
    states;

    /**
     * Initializes a new StateId.
     * 
     * @param {StateIdBase} base
     * @memberof StateId
     */
    constructor(base) {
        /** @type {StateIdBase} */
        this.base = base;
        /** @type {Map<String, String>} */
        this.states = new Map;
        this.reset();
    }

    /**
     * Resets the state id to its default values.
     *
     * @memberof StateId
     */
    reset() {
        this.states.clear();
        for(const [k, v] of this.base.getDefaults()) this.states.set(k, v);
    }

    /**
     * Sets the value of a state key.
     *
     * @param {string} key
     * @param {string} value
     * @memberof StateId
     */
    set(key, value) {
        if(!this.states.has(key)) throw new ReferenceError("Cannot find state with key " + key);

        this.states.set(key, value);
    }

    /**
     * Resets the value of a state key to its default value.
     * 
     * @param {string} key 
     */
    resetKey(key) {
        if(!this.states.has(key)) throw new ReferenceError("Cannot find state with key " + key);

        this.states.set(key, this.base.keys.get(key));
    }

    
    /**
     * Clones the state id into a new instance.
     *
     * @return {StateId} A new instance of the current state id.
     * @memberof StateId
     */
    clone() {
        const id = new BlockState.StateId(this.base);
        for(const [k, v] of this.states) id.set(k, v);

        return id;
    }
    toString() {
        return Array.from(this.states.keys()).map(v => v + "=" + this.states.get(v)).join(",");
    }
}

/**
 * Defines a base for a {@link StateId}.
 *
 * @class StateIdBase
 */
class StateIdBase {
    /**
     * The keys for this state id base.
     *
     * @type {Map<String, String>}
     * @memberof StateIdBase
     */
    keys;

    /**
     * Whether this state id base is locked.
     *
     * @type {boolean}
     * @memberof StateIdBase
     */
    locked;

    /**
     * Initializes a new StateIdBase.
     * 
     * @memberof StateIdBase
     */
    constructor() {
        this.keys = new Map;
        this.locked = false;
    }

    /**
     * Gets an empty map with the current keys for this state id base.
     *
     * @return {Map<String, String>} 
     * @memberof StateIdBase
     */
    getDefaults() {
        return new Map(this.keys);
    }

    /**
     * Adds a key to this state id base.
     *
     * @param {string} key The key to add.
     * @param {string} defaultValue The default value for the key.
     * @memberof StateIdBase
     */
    add(key, defaultValue) {
        if(this.locked) throw new ReferenceError("Cannot add keys to id bases that have already created ids");
        this.keys.set(key, defaultValue);
    }

    /** 
     * Creates a new {@link StateId} from this state id base.
     * 
     * This operation locks this state id base.
     * 
     * @returns {StateId} 
     * */
    createStateId() {
        this.locked = true;
        return new StateId(this);
    }

    /**
     * Converts the state id base to a string.
     *
     * @return {string} 
     * @memberof StateIdBase
     */
    toString() {
        const id = this.createStateId();
        this.locked = false;

        return id.toString();
    }
}

/**
 * Defines a state for a {@link Block}.
 *
 * @class BlockState
 */
class BlockState {
    /**
     * The id for this block state.
     *
     * @type {StateId}
     * @memberof BlockState
     */
    id;

    /**
     * The parent block for this block state.
     *
     * @type {Block}
     * @memberof BlockState
     */
    parentBlock;

    /**
     * The model for this block state.
     *
     * @type {BlockModel}
     * @memberof BlockState
     */
    model;

    /**
     * The trigger sheet for this block state.
     *
     * @type {TriggerSheet}
     * @memberof BlockState
     */
    triggerSheet;

    /**
     * Whether this block state is opaque.
     *
     * @type {boolean}
     * @memberof BlockState
     */
    opaque;

    /**
     * Whether this block state is transparent.
     *
     * @type {boolean}
     * @memberof BlockState
     */
    transparent;

    /**
     * The light attenuation for this block state.
     *
     * @type {number}
     * @memberof BlockState
     */
    lightAttenuation;

    /**
     * Whether this block state generates slabs.
     *
     * @type {boolean}
     * @memberof BlockState
     */
    generateSlabs;

    /**
     * The red light level for this block state.
     *
     * @type {number}
     * @memberof BlockState
     */
    lightLevelRed;

    /**
     * The green light level for this block state.
     *
     * @type {number}
     * @memberof BlockState
     */
    lightLevelGreen;

    /**
     * The blue light level for this block state.
     *
     * @type {number}
     * @memberof BlockState
     */
    lightLevelBlue;

    /**
     * Whether this block state is hidden in the catalog.
     *
     * @type {number}
     * @memberof BlockState
     */
    lightLevelRed;

    /**
     * Initializes a new BlockState.
     * 
     * @param {StateId} id The id for this block state.
     * @param {BlockModel} model The model for this block state.
     * @param {Object} settings The settings for this block state.
     * @param {Block} parentBlock The parent block for this block state.
     */
    constructor(id, model, settings, parentBlock) {
        /** @type {StateId} */
        this.id = id;
        this.parentBlock = parentBlock;
        
        /** @type {BlockModel} */
        this.model = model;
        
        /** @type {TriggerSheet} */
        this.triggerSheet = settings.triggerSheet ?? undefined;
        
        this.opaque = settings.opaque ?? true;
        this.transparent = settings.transparent ?? false;
        this.lightAttenuation = settings.lightAttenuation ?? 15;
        this.generateSlabs = settings.generateSlabs ?? false;
        this.lightLevelRed = settings.lightLevelRed ?? 0;
        this.lightLevelGreen = settings.lightLevelGreen ?? 0;
        this.lightLevelBlue = settings.lightLevelBlue ?? 0;
        this.hidden = settings.hidden ?? false;
    }

    /** 
     * Clones the block state into a new instance.
     * 
     * @param {StateId} id The id for the new block state.
     * @returns {BlockState} 
     */
    clone(id = this.id) {
        return new BlockState(id.clone(), this.model.clone(), {
            opaque: this.opaque,
            transparent: this.transparent,
            lightAttenuation: this.lightAttenuation,
            generateSlabs: this.generateSlabs,
            lightLevelRed: this.lightLevelRed,
            lightLevelGreen: this.lightLevelGreen,
            lightLevelBlue: this.lightLevelBlue,
            hidden: this.hidden,
            triggerSheet: this.triggerSheet?.id,
        })
    }

    /**
     * Serializes the block state into a JSON object.
     * 
     * @override
     * @return {Object} The serialized block state as a JSON object. 
     * @memberof BlockState
     */
    serialize() {
        const prefix = this.parentBlock.parentMod.id;
        return {
            modelName: "model_" + prefix + "_" + this.model.name,
            isOpaque: this.opaque,
            isTransparent: this.transparent,
            lightAttenuation: this.lightAttenuation,
            generateSlabs: this.generateSlabs,
            lightLevelRed: this.lightLevelRed,
            lightLevelGreen: this.lightLevelGreen,
            lightLevelBlue: this.lightLevelBlue,
            catalogHidden: this.hidden,
            blockEventsId: this.triggerSheet == null ? undefined : prefix + ":" + this.triggerSheet.id
        }
    }

    /**
     * Returns the full id for this block state.
     *
     * @return {string} 
     * @memberof BlockState
     */
    getFullId() {
        return this.parentBlock.getFullId() + "[" + this.id + "]";
    }
}

export default BlockState;
export { StateIdBase, StateId };