import Block from "./block.js";

class Mod {
    constructor(id, writer) {
        this.id = id;
        this.blocks = new Set;
        this.writer = writer;
    }

    write() {
        for(const block of this.blocks) {
            this.writer.write(block);
        }
    }

    /*** @return {Block} */
    createBlock(id) {
        const block = new Block(id);
        this.blocks.add(block);
        return block;
    }
}

export default Mod;