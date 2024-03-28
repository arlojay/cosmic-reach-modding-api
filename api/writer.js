import { existsSync, mkdirSync, promises as fs } from "node:fs";
import path from "node:path";
import Block from "./block.js";
import TriggerSheet from "./triggerSheet.js";
import BlockModel from "./blockModel.js";
import Writeable from "./writeable.js";
import Material from "./material.js";
import { Texture } from "./textures.js";
import { Presets, SingleBar } from "cli-progress";

import Mod from "./mod.js";

/**
 * Prepares the output directories and controls the write process for the {@link Mod} files.
 *
 * @class Writer
 */
class Writer {
    /**
     * Creates a new Writer.
     * @param {string} directory The target directory for the mod files. Defaults to "output".
     * @memberof Writer
     */
    constructor(directory = path.join(process.cwd(), "output")) {
        this.targetDirectory = path.resolve(directory);
        this.fancy = false;
    }

    /**
     * Sets the target directory for the mod files.
     *
     * @param {string} directory The new target directory.
     * @memberof Writer
     */
    setTargetDirectory(directory) {
        this.targetDirectory = path.resolve(directory);
    }

    /**
     * Gets the full path to a nested directory within the target directory.
     * 
     * For deeply nested directories, pass every directory as a separate argument in sequence.
     *
     * @param {...string} paths The path segments to join.
     * @return {string} The full path to the nested directory. 
     * @memberof Writer
     */
    getSublocation(...paths) {
        return path.join(this.targetDirectory, ...paths);
    }

    /**
     * Creates the output directory structure for the mod files, if it does not exist.
     * 
     * It will delete existing directories and all files within.
     *
     * @memberof Writer
     */
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
        if(!existsSync(p = this.getSublocation("textures"))) mkdirSync(p);
        if(!existsSync(p = this.getSublocation("textures", "blocks"))) mkdirSync(p);
    }
    
    /** 
     * Serializes a {@link Writeable} object and returns it as a JSON string.
     * 
     * @private
     * @param {Writeable} object A {@link Writeable} object to serialize.
     * @param {string} prefix The prefix to use for the output file name.
     * @returns {string} The serialized object as a JSON string.
     */
    stringify(object, prefix) {
        return JSON.stringify(object.serialize(prefix), null, this.fancy ? 4 : undefined);
    }
    
    /**
     * Returns a valid file name from a given mod element id.
     *
     * @param {string} id The id to convert to a file name.
     * @return {string} The file name corresponding to the given id. 
     * @memberof Writer
     */
    getName(id) {
        return id.replace(/[^A-Za-z0-9\_\-]/g, "_");
    }
    
    /**
     * Writes a {@link Writeable} object to the output directory.
     *
     * @param {Writeable} object The object to write.
     * @param {string} prefix The prefix to use for the output file name.
     * @memberof Writer
     */
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