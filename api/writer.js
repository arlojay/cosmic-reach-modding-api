import { existsSync, mkdirSync, promises as fs } from "node:fs";
import path from "node:path";
import Block from "./block.js";
import TriggerSheet from "./triggerSheet.js";
import BlockModel from "./blockModel.js";
import Writeable from "./writeable.js";
import Material from "./material.js";
import { Texture } from "./textures.js";
import { Presets, SingleBar } from "cli-progress";

class Writer {
    constructor(directory = path.join(process.cwd(), "output")) {
        this.targetDirectory = path.resolve(directory);
        this.fancy = false;
    }

    setTargetDirectory(directory) {
        this.targetDirectory = path.resolve(directory);
    }

    getSublocation(...paths) {
        return path.join(this.targetDirectory, ...paths);
    }

    async createOutputDir() {
        const removeDirs = [
            ["models", "blocks"],
            ["blocks"],
            ["block_events"]
        ];

        let p = "";
        const promises = new Set;

        for(const dir of removeDirs) {
            const dirPath = this.getSublocation(...dir);
            if(existsSync(dirPath)) {
                console.log("Deleting " + dirPath);
                promises.add(fs.rm(dirPath, { recursive: true }));
            }
        }

        await Promise.all(promises);
    
        if(!existsSync(p = this.getSublocation(""))) mkdirSync(p);
        if(!existsSync(p = this.getSublocation("models"))) mkdirSync(p);
        if(!existsSync(p = this.getSublocation("models", "blocks"))) mkdirSync(p);
        if(!existsSync(p = this.getSublocation("blocks"))) mkdirSync(p);
        if(!existsSync(p = this.getSublocation("block_events"))) mkdirSync(p);
    }
    
    /** @param {Writeable} object */
    stringify(object, prefix) {
        return JSON.stringify(object.serialize(prefix), null, this.fancy ? 4 : undefined);
    }
    
    getName(id) {
        return id.replace(/[^A-Za-z0-9\_\-]/g, "_");
    }
    
    async write(object, prefix = "default") {
        if(object instanceof Block) {
            const block = object;

            await fs.writeFile(this.getSublocation("blocks", "block_" + prefix + "_" + this.getName(block.id) + ".json"), this.stringify(object, prefix));
        }
        if(object instanceof TriggerSheet) {
            const triggerSheet = object;
    
            await fs.writeFile(this.getSublocation("block_events", "block_event_" + prefix + "_" + this.getName(triggerSheet.id) + ".json"), this.stringify(object, prefix));
            triggerSheet.written = true;
            if(triggerSheet.parent != null && !triggerSheet.parent.written) this.write(triggerSheet.parent, prefix);
        }
        if(object instanceof BlockModel) {
            const model = object;

            model.getAllMaterials().forEach(material => {
                if(!(material.texture instanceof Texture)) return;

                this.write(material, prefix);
            });
    
            await fs.writeFile(this.getSublocation("models", "blocks", "model_" + prefix + "_" + model.name + ".json"), this.stringify(object, prefix));
        }
        if(object instanceof Material) {
            const material = object;
            if(material.written) return;

            if(!(material.texture instanceof Texture)) return;
            await fs.writeFile(this.getSublocation("textures", "blocks", material.fileName), material.texture.serialize(prefix));
        }
    }
}

export default Writer;