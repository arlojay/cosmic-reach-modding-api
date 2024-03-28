export default Mod;
/**
 * Defines a data mod. Every element is added to an instance of this class.
 *
 * @class Mod
 */
declare class Mod {
    /**
     * Initializes a new mod.
     *
     * @param {string} id The unique id for this mod.
     * @param {Writer} writer The {@link Writer} instance used to write the mod files.
     * @param {boolean} isRelease Controls whether the mod is in release mode. When in release mode, the output files are minified to reduce file size.
     * @memberof Mod
     */
    constructor(id: string, writer: Writer, isRelease: boolean);
    /**
     * The unique id for this mod.
     *
     * @type {string}
     * @memberof Mod
     */
    id: string;
    /**
     * The {@link Block|Blocks} declared within this mod.
     *
     * @type {Set<Block>}
     * @memberof Mod
     */
    blocks: Set<Block>;
    /**
     * Controls whether the mod is in release mode. When in release mode, the output files are minified to reduce file size.
     *
     * @type {boolean}
     * @memberof Mod
     */
    isRelease: boolean;
    /** @type {Writer} */ writer: Writer;
    /**
     * Locks the current mod and writes all the data to the output directory.
     *
     * This function MUST be the last function called when creating a mod.
     *
     * @memberof Mod
     */
    write(): Promise<void>;
    /**
     * Creates a new {@link Block} within this mod.
     *
     * @return {Block}
     */
    createBlock(id: any): Block;
    /**
     * Returns the id for a given block declared within this mod.
     *
     * @param {Block|String} block Block entry or block id
     * @returns {string}
     */
    getBlockId(block: Block | string): string;
    /**
     * Returns the id for a given {@link BlockState} declared within this mod.
     *
     * The ID for a block state is a string containing all unique values for every
     *
     * @param {BlockState} state State id
     */
    getBlockStateId(state: BlockState): string;
}
import Block from "./block.js";
import Writer from "./writer.js";
import BlockState from "./blockState.js";
