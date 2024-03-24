class BlockAction {
    static replaceBlock(x, y, z, block) {
        const action = new BlockAction("base:replace_block_state");
        action.parameters.xOff = x;
        action.parameters.yOff = y;
        action.parameters.zOff = z;
        action.parameters.blockStateId = block;
        return action;
    }
    static explode(x, y, z, block) {
        const action = new BlockAction("base:explode");
        action.parameters.xOff = x;
        action.parameters.yOff = y;
        action.parameters.zOff = z;
        action.parameters.blockStateId = block;
        return action;
    }
    static setBlockStateParams(x, y, z, params) {
        const action = new BlockAction("base:set_block_state_params");
        action.parameters.xOff = x;
        action.parameters.yOff = y;
        action.parameters.zOff = z;
        action.parameters.params = params;
        return action;
    }
    static runTrigger(x, y, z, trigger) {
        const action = new BlockAction("base:run_trigger");
        action.parameters.xOff = x;
        action.parameters.yOff = y;
        action.parameters.zOff = z;
        action.parameters.triggerId = trigger;
        return action;
    }
    static playSound2d(sound, volume = 1, pitch = 1, pan = 0) {
        const action = new BlockAction("base:play_sound_2d");
        action.parameters.sound = sound;
        action.parameters.volume = volume;
        action.parameters.pitch = pitch;
        action.parameters.pan = pan;
        return action;
    }

    constructor(type) {
        this.type = type;
        this.parameters = {};
    }

    serialize() {
        return {
            actionId: this.type,
            parameters: this.parameters
        };
    }

    clone() {
        const action = new BlockAction(this.type);
        Object.assign(action.parameters, JSON.parse(JSON.stringify(this.parameters)));
        return action;
    }
}

export default BlockAction;