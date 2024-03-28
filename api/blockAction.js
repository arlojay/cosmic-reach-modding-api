import Block from "./block.js";
import TriggerSheet from "./triggerSheet.js";

/**
 * Defines a block action that can be performed in a {@link TriggerSheet}.
 *
 * @class BlockAction
 */
class BlockAction {
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
    static replaceBlock(x, y, z, block) {
        const action = new BlockAction("base:replace_block_state");
        action.parameters.xOff = x;
        action.parameters.yOff = y;
        action.parameters.zOff = z;
        action.parameters.blockStateId = block;
        return action;
    }

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
    static explode(x, y, z, block) {
        const action = new BlockAction("base:explode");
        action.parameters.xOff = x;
        action.parameters.yOff = y;
        action.parameters.zOff = z;
        action.parameters.blockStateId = block;
        return action;
    }

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
    static setBlockStateParams(x, y, z, params) {
        const action = new BlockAction("base:set_block_state_params");
        action.parameters.xOff = x;
        action.parameters.yOff = y;
        action.parameters.zOff = z;
        action.parameters.params = Object.fromEntries(Object.entries(params).map(([k, v]) => [k, `${v}`]));
        return action;
    }

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
    static runTrigger(x, y, z, trigger, tickDelay = 0) {
        const action = new BlockAction("base:run_trigger");
        action.parameters.xOff = x;
        action.parameters.yOff = y;
        action.parameters.zOff = z;
        action.parameters.triggerId = trigger;
        action.parameters.tickDelay = tickDelay;
        return action;
    }

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
    static playSound2d(sound, volume = 1, pitch = 1, pan = 0) {
        const action = new BlockAction("base:play_sound_2d");
        action.parameters.sound = sound;
        action.parameters.volume = volume;
        action.parameters.pitch = pitch;
        action.parameters.pan = pan;
        return action;
    }

    /**
     * The type of this block action in the game.
     * 
     * @type {string}
     * @memberof BlockAction
     */
    type;

    /**
     * The parameters for this block action.
     *
     * @type {Object}
     * @memberof BlockAction
     */
    parameters;

    /**
     * Initializes a new BlockAction.
     * @param {string} type
     * @memberof BlockAction
     */
    constructor(type) {
        this.type = type;
        this.parameters = {};
    }

    /**
     * Serializes the block action into a JSON object.
     * 
     * @return {Object} The serialized block action as a JSON object. 
     * @memberof BlockAction
     */
    serialize() {
        return {
            actionId: this.type,
            parameters: this.parameters
        };
    }

    
    /**
     * Clones the block action into a new instance.
     *
     * @return {BlockAction} A new instance of the current block action.
     * @memberof BlockAction
     */
    clone() {
        const action = new BlockAction(this.type);
        Object.assign(action.parameters, JSON.parse(JSON.stringify(this.parameters)));
        return action;
    }
}

export default BlockAction;