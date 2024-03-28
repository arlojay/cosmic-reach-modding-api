/**
 * Defines an abstract class that represents a object that can be written to a file.
 *
 * @abstract
 * @class Writeable
 */
class Writeable {
    constructor() {
        this.written = false;
    }

    /**
     * Serializes the object to a JSON object.
     *
     * @abstract
     * @param {string} prefix A prefix to be used internally to identify the object.
     * @return {Object} The serialized object as a JSON object.
     * @memberof Writeable
     */
    serialize(prefix) {
        return {};
    }
}

export default Writeable;