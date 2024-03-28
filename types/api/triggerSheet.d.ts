export default TriggerSheet;
export type BlockActionComparator = Function;
/**
 * Defines a collection of triggers and actions that can be executed by a block.
 *
 * @class TriggerSheet
 * @extends {Writeable}
 */
declare class TriggerSheet extends Writeable {
    /**
     * Initializes a new trigger sheet.
     *
     * @param {string} id The unique id for this trigger sheet.
     * @param {parent} [parent=null] The parent TriggerSheet for this trigger sheet.
     * @memberof TriggerSheet
     */
    constructor(id: string, parent?: Window);
    /**
     * The parent TriggerSheet for this trigger sheet.
     *
     * @type {TriggerSheet}
     * @memberof TriggerSheet
     */
    parent: TriggerSheet;
    /**
     * The unique id for this trigger sheet.
     *
     * @type {string}
     * @memberof TriggerSheet
     */
    id: string;
    /**
     * The triggers and actions for this trigger sheet.
     *
     * @type {Object<string, Array<BlockAction>>}
     * @memberof TriggerSheet
     */
    triggers: {
        [x: string]: Array<BlockAction>;
    };
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
    addAction(trigger: string, action: BlockAction, index?: number): void;
    /**
     * Adds multiple actions to multiple triggers within the trigger sheet.
     *
     * For each trigger on {@link triggers}, the corresponding actions in {@link actions} will be added.
     *
     * @param {string|Array<string>} triggers
     * @param {Array<BlockAction>} actions
     * @memberof TriggerSheet
     */
    addActions(triggers: string | Array<string>, actions: Array<BlockAction>): void;
    /**
     * Removes a trigger from the trigger sheet.
     *
     * @param {string} trigger
     * @memberof TriggerSheet
     */
    removeTrigger(trigger: string): void;
    /**
     * Removes an action from all triggers within the trigger sheet.
     *
     * @param {BlockActionComparator} comparator The function to use to select actions.
     * @memberof TriggerSheet
     */
    removeActionByComparison(comparator: BlockActionComparator): void;
    /**
     * Removes an action from a specific trigger within the trigger sheet.
     *
     * @param {string} trigger
     * @param {BlockActionComparator} comparator The function to use to select actions.
     * @memberof TriggerSheet
     */
    removeTriggerActionByComparison(trigger: string, comparator: BlockActionComparator): void;
    /**
     * Clones the trigger sheet into a new instance.
     *
     * @param {string} [id=this.id]
     * @return {TriggerSheet} A new instance of the current trigger sheet.
     * @memberof TriggerSheet
     */
    clone(id?: string): TriggerSheet;
    /**
     * Appends another trigger sheet to this trigger sheet.
     *
     * @param {TriggerSheet} other The trigger sheet to append.
     * @return {this} The current trigger sheet.
     * @memberof TriggerSheet
     */
    append(other: TriggerSheet): this;
}
import Writeable from "./writeable.js";
import BlockAction from "./blockAction.js";
