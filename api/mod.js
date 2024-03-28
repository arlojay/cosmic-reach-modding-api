import { MultiBar } from "cli-progress";
import { PromisePool } from "@supercharge/promise-pool";
import Block from "./block.js";
import Writer from "./writer.js";
import BlockState, { StateId } from "./blockState.js";

/**
 * Defines a data mod. Every element is added to an instance of this class.
 * 
 * @class Mod
 */
class Mod {
    /**
     * The unique id for this mod.
     *
     * @type {string}
     * @memberof Mod
     */
    id;

    /**
     * The {@link Block|Blocks} declared within this mod.
     *
     * @type {Set<Block>}
     * @memberof Mod
     */
    blocks;

    /**
     * Controls whether the mod is in release mode. When in release mode, the output files are minified to reduce file size.
     *
     * @type {boolean}
     * @memberof Mod
     */
    isRelease;

    /**
     * Initializes a new mod.
     * 
     * @param {string} id The unique id for this mod.
     * @param {Writer} writer The {@link Writer} instance used to write the mod files.
     * @param {boolean} isRelease Controls whether the mod is in release mode. When in release mode, the output files are minified to reduce file size.
     * @memberof Mod
     */
    constructor(id, writer, isRelease) {
        this.id = id;
        this.blocks = new Set;
        /** @type {Writer} */ this.writer = writer;

        this.isRelease = isRelease;
        this.writer.fancy = !this.isRelease;
    }

    /**
     * Locks the current mod and writes all the data to the output directory.
     * 
     * This function MUST be the last function called when creating a mod.
     *
     * @memberof Mod
     */
    async write() {
        const t0 = performance.now();
        const bars = new MultiBar({
            format: "{time} {title} [{bar}] {value}/{total} | {name}",
            hideCursor: true,
            fps: 30
        });

        const concurrency = 64;

        const promisePools = new Set;
        for(const block of this.blocks) {
            const startTime = performance.now();
            {
                const bar = bars.create(block.states.size, 0, { title: block.id.padStart(24, " ") + "  Model construction".padStart(32, " "), time: "        " });
                promisePools.add(PromisePool.withConcurrency(concurrency).for(block.states.values()).process(async (state) => {
                    await this.writer.write(state.model, this.id);
                    bar.increment(1, { name: state.model.name, time: (Math.floor(performance.now() - startTime).toString() + "ms").padEnd(8, " ") });
                }));
            }

            {
                const bar = bars.create(block.states.size, 0, { title: block.id.padStart(24, " ") + "  Trigger sheet compilation".padStart(32, " "), time: 0 });
                promisePools.add(PromisePool.withConcurrency(concurrency).for(block.states.values()).process(async (state) => {
                    await this.writer.write(state.triggerSheet, this.id);
                    bar.increment(1, { name: state.triggerSheet.id, time: (Math.floor(performance.now() - startTime).toString() + "ms").padEnd(8, " ") });
                }));
            }

            promisePools.add(this.writer.write(block, this.id));
        }

        await Promise.all(promisePools);
        bars.stop();

        console.log("Took " + Math.round((performance.now() - t0) * 100) / 100 + "ms");
    }

    /** 
     * Creates a new {@link Block} within this mod.
     * 
     * @return {Block} 
     */
    createBlock(id) {
        const block = new Block(id, this);
        this.blocks.add(block);
        return block;
    }

    /**
     * Returns the id for a given block declared within this mod.
     * 
     * @param {Block|String} block Block entry or block id
     * @returns {string}
     */
    getBlockId(block) {
        if(block instanceof Block) {
            return this.id + ":" + block.id;
        } else {
            return this.id + ":" + block;
        }
    }

    /**
     * Returns the id for a given {@link BlockState} declared within this mod.
     * 
     * The ID for a block state is a string containing all unique values for every 
     * 
     * @param {BlockState} state State id
     */
    getBlockStateId(state) {
        return state.id.toString() || "default";
    }
}

export default Mod;