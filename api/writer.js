import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import Block from "./block.js";
import TriggerSheet from "./triggerSheet.js";
import ModelCollection from "./modelCollection.js";
import Writeable from "./writeable.js";

class Writer {
    constructor(directory = path.join(process.cwd(), "output")) {
        this.targetDirectory = path.resolve(directory);
    }

    setTargetDirectory(directory) {
        this.targetDirectory = path.resolve(directory);
    }

    getSublocation(...paths) {
        return path.join(this.targetDirectory, ...paths);
    }

    createOutputDir() {    
        let p = "";
        if(existsSync(p = this.getSublocation("models", "blocks"))) rmSync(p, { recursive: true });
        if(existsSync(p = this.getSublocation("blocks"))) rmSync(p, { recursive: true });
        if(existsSync(p = this.getSublocation("block_events"))) rmSync(p, { recursive: true });
    
        if(!existsSync(p = this.getSublocation(""))) mkdirSync(p);
        if(!existsSync(p = this.getSublocation("models"))) mkdirSync(p);
        if(!existsSync(p = this.getSublocation("models", "blocks"))) mkdirSync(p);
        if(!existsSync(p = this.getSublocation("blocks"))) mkdirSync(p);
        if(!existsSync(p = this.getSublocation("block_events"))) mkdirSync(p);
    }
    
    /*** @param {Writeable} object */
    stringify(object) {
        return JSON.stringify(object.serialize(), null, 4);
    }
    
    getName(id) {
        return id.replace(/[^A-Za-z0-9\_\-]/g, "_");
    }
    
    write(object) {
        if(object instanceof Block) {
            const block = object;
    
            block.states.forEach((state) => {
                this.write(state.model);
                this.write(state.triggerSheet);
            });
            writeFileSync(this.getSublocation("blocks", "block_" + this.getName(block.id) + ".json"), this.stringify(object));
        }
        if(object instanceof TriggerSheet) {
            const triggerSheet = object;
    
            writeFileSync(this.getSublocation("block_events", "block_event_" + this.getName(triggerSheet.id) + ".json"), this.stringify(object));
            triggerSheet.written = true;
            if(triggerSheet.parent != null && !triggerSheet.parent.written) this.write(triggerSheet.parent);
        }
        if(object instanceof ModelCollection) {
            const model = object;
    
            writeFileSync(this.getSublocation("models", "blocks", "model_" + model.name + ".json"), this.stringify(object));
        }
    }
}

export default Writer;