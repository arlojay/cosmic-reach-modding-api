export default Writer;
/**
 * Prepares the output directories and controls the write process for the {@link Mod} files.
 *
 * @class Writer
 */
declare class Writer {
    /**
     * Creates a new Writer.
     * @param {string} directory The target directory for the mod files. Defaults to "output".
     * @memberof Writer
     */
    constructor(directory?: string);
    targetDirectory: any;
    fancy: boolean;
    /**
     * Sets the target directory for the mod files.
     *
     * @param {string} directory The new target directory.
     * @memberof Writer
     */
    setTargetDirectory(directory: string): void;
    /**
     * Gets the full path to a nested directory within the target directory.
     *
     * For deeply nested directories, pass every directory as a separate argument in sequence.
     *
     * @param {...string} paths The path segments to join.
     * @return {string} The full path to the nested directory.
     * @memberof Writer
     */
    getSublocation(...paths: string[]): string;
    /**
     * Creates the output directory structure for the mod files, if it does not exist.
     *
     * It will delete existing directories and all files within.
     *
     * @memberof Writer
     */
    createOutputDir(): Promise<void>;
    /**
     * Serializes a {@link Writeable} object and returns it as a JSON string.
     *
     * @private
     * @param {Writeable} object A {@link Writeable} object to serialize.
     * @param {string} prefix The prefix to use for the output file name.
     * @returns {string} The serialized object as a JSON string.
     */
    private stringify;
    /**
     * Returns a valid file name from a given mod element id.
     *
     * @param {string} id The id to convert to a file name.
     * @return {string} The file name corresponding to the given id.
     * @memberof Writer
     */
    getName(id: string): string;
    /**
     * Writes a {@link Writeable} object to the output directory.
     *
     * @param {Writeable} object The object to write.
     * @param {string} prefix The prefix to use for the output file name.
     * @memberof Writer
     */
    write(object: Writeable, prefix?: string): Promise<void>;
}
import Writeable from "./writeable.js";
