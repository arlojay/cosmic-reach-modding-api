import { MultiBar } from "cli-progress";
import { PromisePool } from "@supercharge/promise-pool";
import Block from "./block.js";
import Writer from "./writer.js";

class Mod {
    constructor(id, writer, isRelease) {
        this.id = id;
        this.blocks = new Set;
        /** @type {Writer} */ this.writer = writer;

        this.isRelease = isRelease;
        this.writer.fancy = !this.isRelease;
    }

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

    /** @return {Block} */
    createBlock(id) {
        const block = new Block(this.id + ":" + id);
        this.blocks.add(block);
        return block;
    }
}

export default Mod;