export default Block;
/**
 * Defines a block within a {@link Mod}.
 *
 * @class Block
 * @extends {Writeable}
 */
declare class Block extends Writeable {
    /**
     * Initializes a new block.
     *
     * @param {string} id The unique id for this block.
     * @param {Mod} parentMod The {@link Mod} instance that contains this block.
     * @memberof Block
     */
    constructor(id: string, parentMod: Mod);
    /**
     * The unique id for this block.
     *
     * @type {string}
     * @memberof Block
     */
    id: string;
    /**
     * The {@link Mod} instance that contains this block.
     *
     * @memberof Block
     */
    parentMod: Mod;
    /**
     * The default {@link BlockState} for this block.
     *
     * @memberof Block
     */
    defaultState: StateIdBase;
    /**
     * The list of {@link BlockState|BlockStates} for this block.
     *
     * @memberof Block
     */
    states: Map<any, any>;
    /**
     * Creates a new {@link BlockState} for this block.
     *
     * @param {BlockModel} model The model for the state.
     * @returns {BlockState} The generated BlockState.
     * @memberof Block
     */
    createBlockState(model: BlockModel, settings?: {}): BlockState;
    /**
     * Returns the full id for this block within its parent {@link Mod}.
     *
     * @return {string}
     * @memberof Block
     */
    getFullId(): string;
    /**
     * Returns the identifier for the default {@link BlockState} within this block.
     *
     * @return {string}
     * @memberof Block
     */
    getDefaultAsString(): string;
    /**
     * Returns the identifier for a given {@link BlockState} within this block.
     *
     * @param {BlockState} state The {@link BlockState} to get the identifier from.
     * @return {string}
     * @memberof Block
     */
    getStringForState(state: BlockState): string;
    /**
     * Serializes this block and returns it as a JSON object.
     *
     * @override
     * @return {Object}
     * @memberof Block
     */
    override serialize(): any;
}
import Writeable from "./writeable.js";
import Mod from "./mod.js";
import { StateIdBase } from "./blockState.js";
import BlockModel from "./blockModel.js";
import BlockState from "./blockState.js";
