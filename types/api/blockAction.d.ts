export default BlockAction;
/**
 * Defines a block action that can be performed in a {@link TriggerSheet}.
 *
 * @class BlockAction
 */
declare class BlockAction {
    /**
     * Replaces a block at the specified offset from the affected block with the specified block state.
     *
     * @static
     * @param {number} x The x offset.
     * @param {number} y The y offset.
     * @param {number} z The z offset.
     * @param {Block} block The block to replace the existing block with.
     * @return {BlockAction}
     * @memberof BlockAction
     */
    static replaceBlock(x: number, y: number, z: number, block: Block): BlockAction;
    /**
     * Creates an explosion at the specified offset from the affected block.
     *
     * @static
     * @param {number} x The x offset.
     * @param {number} y The y offset.
     * @param {number} z The z offset.
     * @param {Block} block The block to be used to replace all blocks affected by the explosion.
     * @return {BlockAction}
     * @memberof BlockAction
     */
    static explode(x: number, y: number, z: number, block: Block): BlockAction;
    /**
     * Sets the block state parameters at the specified offset from the affected block.
     *
     * @static
     * @param {number} x The x offset.
     * @param {number} y The y offset.
     * @param {number} z The z offset.
     * @param {Object} params The block state parameters to be used.
     * @return {BlockAction}
     * @memberof BlockAction
     */
    static setBlockStateParams(x: number, y: number, z: number, params: any): BlockAction;
    /**
     * Runs a trigger at the specified offset from the affected block.
     *
     * @static
     * @param {number} x The x offset.
     * @param {number} y The y offset.
     * @param {number} z The z offset.
     * @param {string} trigger The trigger to run.
     * @param {number} [tickDelay=0] The number of ticks to delay the trigger.
     * @return {BlockAction}
     * @memberof BlockAction
     */
    static runTrigger(x: number, y: number, z: number, trigger: string, tickDelay?: number): BlockAction;
    /**
     * Plays a sound globally.
     *
     * @static
     * @param {string} sound The sound to play.
     * @param {number} [volume=1] The volume of the sound.
     * @param {number} [pitch=1] The pitch of the sound.
     * @param {number} [pan=0] The pan of the sound.
     * @return {BlockAction}
     * @memberof BlockAction
     */
    static playSound2d(sound: string, volume?: number, pitch?: number, pan?: number): BlockAction;
    /**
     * Initializes a new BlockAction.
     * @param {string} type
     * @memberof BlockAction
     */
    constructor(type: string);
    /**
     * The type of this block action in the game.
     *
     * @type {string}
     * @memberof BlockAction
     */
    type: string;
    /**
     * The parameters for this block action.
     *
     * @type {Object}
     * @memberof BlockAction
     */
    parameters: any;
    /**
     * Serializes the block action into a JSON object.
     *
     * @return {Object} The serialized block action as a JSON object.
     * @memberof BlockAction
     */
    serialize(): any;
    /**
     * Clones the block action into a new instance.
     *
     * @return {BlockAction} A new instance of the current block action.
     * @memberof BlockAction
     */
    clone(): BlockAction;
}
import Block from "./block.js";
