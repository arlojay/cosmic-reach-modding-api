import BlockAction from "./blockAction.js";
import Writeable from "./writeable.js";

/**
 * @typedef {Function} BlockActionComparator
 * @param {BlockAction} action The action to compare.
 * @returns {boolean} Whether the action matches the comparison.
 */

/** 
 * The parent for any {@link TriggerSheet} that does not have a parent explicitly declared.
 * 
 * @package
 * @readonly
 * @type {Object<string, TriggerSheet>} 
 */
const BASE_TRIGGER_SHEET = {};

/**
 * Defines a collection of triggers and actions that can be executed by a block.
 *
 * @class TriggerSheet
 * @extends {Writeable}
 */
class TriggerSheet extends Writeable {
    /**
     * The parent TriggerSheet for this trigger sheet.
     *
     * @type {TriggerSheet}
     * @memberof TriggerSheet
     */
    parent;

    /**
     * The unique id for this trigger sheet.
     *
     * @type {string}
     * @memberof TriggerSheet
     */
    id;

    /**
     * The triggers and actions for this trigger sheet.
     *
     * @type {Object<string, Array<BlockAction>>}
     * @memberof TriggerSheet
     */
    triggers;

    /**
     * Initializes a new trigger sheet.
     * 
     * @param {string} id The unique id for this trigger sheet.
     * @param {parent} [parent=null] The parent TriggerSheet for this trigger sheet.
     * @memberof TriggerSheet
     */
    constructor(id, parent = null) {
        super();
        this.parent = parent;
        this.id = id;
        this.triggers = {};

        if(this.parent?.triggers != null) this.append(this.parent);
    }

    /**
     * Adds a new action to the trigger sheet.
     * 
     * If the {@link trigger} does not exist, it will be created.
     *
     * @param {string} trigger The trigger to add the action to.
     * @param {BlockAction} action The action to add.
     * @param {number} index The index to insert the action at.
     * @memberof TriggerSheet
     */
    addAction(trigger, action, index = this.triggers[trigger]?.length ?? 0) {
        if(action instanceof Array) throw new TypeError("Use addActions() for array support");
        this.triggers[trigger] ??= new Array;
        this.triggers[trigger].splice(index, 0, action);
    }

    /**
     * Adds multiple actions to multiple triggers within the trigger sheet.
     * 
     * For each trigger on {@link triggers}, the corresponding actions in {@link actions} will be added.
     *
     * @param {string|Array<string>} triggers
     * @param {Array<BlockAction>} actions
     * @memberof TriggerSheet
     */
    addActions(triggers, actions) {
        if(actions instanceof BlockAction) throw new TypeError("Use addAction() to add one action");
        if(!(triggers instanceof Array)) triggers = [triggers];
        for(const trigger of triggers) for(const action of actions) this.addAction(trigger, action);
    }

    /**
     * Removes a trigger from the trigger sheet.
     *
     * @param {string} trigger
     * @memberof TriggerSheet
     */
    removeTrigger(trigger) {
        delete this.triggers[trigger];
    }

    /**
     * Removes an action from all triggers within the trigger sheet.
     *
     * @param {BlockActionComparator} comparator The function to use to select actions.
     * @memberof TriggerSheet
     */
    removeActionByComparison(comparator) {
        for(const triggerId in this.triggers) {
            this.removeTriggerActionByComparison(triggerId, comparator);
        }
    }

    /**
     * Removes an action from a specific trigger within the trigger sheet.
     *
     * @param {string} trigger
     * @param {BlockActionComparator} comparator The function to use to select actions.
     * @memberof TriggerSheet
     */
    removeTriggerActionByComparison(trigger, comparator) {
        const actions = this.triggers[trigger];
        const deletions = new Array;

        for(const action of actions) {
            if(comparator(action)) deletions.push(action);
        }
        for(const deletion of deletions) {
            actions.splice(actions.indexOf(deletion), 1);
        }

        this.triggers[trigger] = actions;
    }

    /**
     * Serializes the trigger sheet into a JSON object.
     * 
     * @override
     * @param {string} prefix The prefix to use for the string id.
     * @return {Object} The serialized trigger sheet as a JSON object. 
     * @memberof TriggerSheet
     */
    serialize(prefix) {
        const output = new TriggerSheet(this.id, BASE_TRIGGER_SHEET);
        output.append(this);
        
        return {
            parent: output.parent?.id ?? BASE_TRIGGER_SHEET.id,
            stringId: prefix + ":" + output.id,
            triggers: Object.fromEntries(Object.keys(output.triggers).map(k => [k, output.triggers[k].map(t => t.serialize())]))
        }
    }

    /**
     * Clones the trigger sheet into a new instance.
     *
     * @param {string} [id=this.id]
     * @return {TriggerSheet} A new instance of the current trigger sheet.
     * @memberof TriggerSheet
     */
    clone(id = this.id) {
        const sheet = new TriggerSheet(id, this.parent);
        for(const triggerId in this.triggers) {
            const triggers = this.triggers[triggerId];
            for(const trigger of triggers) {
                sheet.addAction(triggerId, trigger.clone());
            }
        }
        return sheet;
    }

    /**
     * Appends another trigger sheet to this trigger sheet.
     *
     * @param {TriggerSheet} other The trigger sheet to append.
     * @return {this} The current trigger sheet.
     * @memberof TriggerSheet
     */
    append(other) {
        for(const triggerId in other.triggers) {
            for(const trigger of other.triggers[triggerId]) {
                this.addAction(triggerId, trigger.clone());
            }
        }
        return this;
    }
}

{
    const sheet = new TriggerSheet("base:block_events_default", {});
    sheet.addAction("onPlace", BlockAction.replaceBlock(0, 0, 0, "self"));
    sheet.addAction("onPlace", BlockAction.playSound2d("block-place.ogg"));
    sheet.addAction("onBreak", BlockAction.replaceBlock(0, 0, 0, "base:air[default]"));
    sheet.addAction("onBreak", BlockAction.playSound2d("block-break.ogg"));
    sheet.written = true;
    Object.assign(BASE_TRIGGER_SHEET, sheet);
}

export default TriggerSheet;