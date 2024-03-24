import BlockAction from "./blockAction.js";
import Writeable from "./writeable.js";

const BASE_TRIGGER_SHEET = {};

class TriggerSheet extends Writeable {
    constructor(id, parent) {
        super();
        this.parent = parent;
        this.id = id;
        this.triggers = {};

        if(this.parent?.triggers != null) this.append(this.parent);
    }

    addAction(trigger, action, index = this.triggers[trigger]?.length ?? 0) {
        this.triggers[trigger] ??= new Array;
        this.triggers[trigger].splice(index, 0, action);
    }
    addActions(trigger, actions) {
        this.triggers[trigger] ??= new Array;
        this.triggers[trigger].push(...actions);
    }
    removeTrigger(trigger) {
        delete this.triggers[trigger];
    }
    removeActionByComparison(comparator) {
        for(const triggerId in this.triggers) {
            this.removeTriggerActionByComparison(triggerId, comparator);
        }
    }
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

    serialize() {
        const output = new TriggerSheet(this.id, BASE_TRIGGER_SHEET);
        output.append(this);
        
        return {
            parent: output.parent?.id ?? BASE_TRIGGER_SHEET.id,
            stringId: output.id,
            triggers: Object.fromEntries(Object.keys(output.triggers).map(k => [k, output.triggers[k].map(t => t.serialize())]))
        }
    }

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