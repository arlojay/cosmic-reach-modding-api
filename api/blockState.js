import Block from "./block.js";
import BlockModel from "./blockModel.js";
import TriggerSheet from "./triggerSheet.js";

class StateId {
    constructor(base) {
        /** @type {StateIdBase} */
        this.base = base;
        /** @type {Map<String, String>} */
        this.states = new Map;
        this.reset();
    }
    reset() {
        this.states.clear();
        for(const [k, v] of this.base.getDefaults()) this.states.set(k, v);
    }
    set(key, value) {
        if(!this.states.has(key)) throw new ReferenceError("Cannot find state with key " + key);

        this.states.set(key, value);
    }
    resetKey(key) {
        if(!this.states.has(key)) throw new ReferenceError("Cannot find state with key " + key);

        this.states.set(key, this.base.keys.get(key));
    }
    clone() {
        const id = new BlockState.StateId(this.base);
        for(const [k, v] of this.states) id.set(k, v);

        return id;
    }
    toString() {
        return Array.from(this.states.keys()).map(v => v + "=" + this.states.get(v)).join(",");
    }
}
class StateIdBase {
    constructor() {
        this.keys = new Map;
        this.locked = false;
    }
    getDefaults() {
        return new Map(this.keys);
    }
    add(key, defaultValue) {
        if(this.locked) throw new ReferenceError("Cannot add keys to id bases that have already created ids");
        this.keys.set(key, defaultValue);
    }
    /** @returns {StateId} */
    createStateId() {
        this.locked = true;
        return new StateId(this);
    }

    toString() {
        const id = this.createStateId();
        this.locked = false;

        return id.toString();
    }
}

class BlockState {
    /**
     * @param {String} id 
     * @param {BlockModel} model 
     * @param {Object} settings 
     * @param {Block} parentBlock 
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

    /** @returns {BlockState} */
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

    getFullId() {
        return this.parentBlock.getFullId() + "[" + this.toString() + "]";
    }
}

export default BlockState;
export { StateIdBase, StateId };