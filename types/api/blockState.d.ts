export default BlockState;
/**
 * Defines a state for a {@link Block}.
 *
 * @class BlockState
 */
declare class BlockState {
    /**
     * Initializes a new BlockState.
     *
     * @param {StateId} id The id for this block state.
     * @param {BlockModel} model The model for this block state.
     * @param {Object} settings The settings for this block state.
     * @param {Block} parentBlock The parent block for this block state.
     */
    constructor(id: StateId, model: BlockModel, settings: any, parentBlock: Block);
    /**
     * The id for this block state.
     *
     * @type {StateId}
     * @memberof BlockState
     */
    id: StateId;
    /**
     * The parent block for this block state.
     *
     * @type {Block}
     * @memberof BlockState
     */
    parentBlock: Block;
    /**
     * The model for this block state.
     *
     * @type {BlockModel}
     * @memberof BlockState
     */
    model: BlockModel;
    /**
     * The trigger sheet for this block state.
     *
     * @type {TriggerSheet}
     * @memberof BlockState
     */
    triggerSheet: TriggerSheet;
    /**
     * Whether this block state is opaque.
     *
     * @type {boolean}
     * @memberof BlockState
     */
    opaque: boolean;
    /**
     * Whether this block state is transparent.
     *
     * @type {boolean}
     * @memberof BlockState
     */
    transparent: boolean;
    /**
     * The light attenuation for this block state.
     *
     * @type {number}
     * @memberof BlockState
     */
    lightAttenuation: number;
    /**
     * Whether this block state generates slabs.
     *
     * @type {boolean}
     * @memberof BlockState
     */
    generateSlabs: boolean;
    /**
     * The red light level for this block state.
     *
     * @type {number}
     * @memberof BlockState
     */
    lightLevelRed: number;
    /**
     * The green light level for this block state.
     *
     * @type {number}
     * @memberof BlockState
     */
    lightLevelGreen: number;
    /**
     * The blue light level for this block state.
     *
     * @type {number}
     * @memberof BlockState
     */
    lightLevelBlue: number;
    hidden: any;
    /**
     * Clones the block state into a new instance.
     *
     * @param {StateId} id The id for the new block state.
     * @returns {BlockState}
     */
    clone(id?: StateId): BlockState;
    /**
     * Serializes the block state into a JSON object.
     *
     * @override
     * @return {Object} The serialized block state as a JSON object.
     * @memberof BlockState
     */
    override serialize(): any;
    /**
     * Returns the full id for this block state.
     *
     * @return {string}
     * @memberof BlockState
     */
    getFullId(): string;
}
/**
 * Defines a base for a {@link StateId}.
 *
 * @class StateIdBase
 */
export class StateIdBase {
    /**
     * The keys for this state id base.
     *
     * @type {Map<String, String>}
     * @memberof StateIdBase
     */
    keys: Map<string, string>;
    /**
     * Whether this state id base is locked.
     *
     * @type {boolean}
     * @memberof StateIdBase
     */
    locked: boolean;
    /**
     * Gets an empty map with the current keys for this state id base.
     *
     * @return {Map<String, String>}
     * @memberof StateIdBase
     */
    getDefaults(): Map<string, string>;
    /**
     * Adds a key to this state id base.
     *
     * @param {string} key The key to add.
     * @param {string} defaultValue The default value for the key.
     * @memberof StateIdBase
     */
    add(key: string, defaultValue: string): void;
    /**
     * Creates a new {@link StateId} from this state id base.
     *
     * This operation locks this state id base.
     *
     * @returns {StateId}
     * */
    createStateId(): StateId;
    /**
     * Converts the state id base to a string.
     *
     * @return {string}
     * @memberof StateIdBase
     */
    toString(): string;
}
/**
 * Defines a state id for a {@link BlockState}.
 *
 * @class StateId
 */
export class StateId {
    /**
     * Initializes a new StateId.
     *
     * @param {StateIdBase} base
     * @memberof StateId
     */
    constructor(base: StateIdBase);
    /**
     * The base for this state id.
     *
     * @type {StateIdBase}
     * @memberof StateId
     */
    base: StateIdBase;
    /**
     * The states for this state id.
     *
     * @type {Map<String, String>}
     * @memberof StateId
     */
    states: Map<string, string>;
    /**
     * Resets the state id to its default values.
     *
     * @memberof StateId
     */
    reset(): void;
    /**
     * Sets the value of a state key.
     *
     * @param {string} key
     * @param {string} value
     * @memberof StateId
     */
    set(key: string, value: string): void;
    /**
     * Resets the value of a state key to its default value.
     *
     * @param {string} key
     */
    resetKey(key: string): void;
    /**
     * Clones the state id into a new instance.
     *
     * @return {StateId} A new instance of the current state id.
     * @memberof StateId
     */
    clone(): StateId;
    toString(): string;
}
import Block from "./block.js";
import BlockModel from "./blockModel.js";
import TriggerSheet from "./triggerSheet.js";
