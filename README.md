# Cosmic Reach Modding API
### Dynamic asset generation for [Cosmic Reach](https://finalforeach.itch.io/cosmic-reach)
This library creates a pipeline for creating and compiling mods using only JavaScript. It can create **blocks** (with many different states), **block events** (referred to as "trigger sheets"), **block models**, and even procedural **textures**.

# Examples

### Basic Stone Block
The following is an example script for a mod that adds a stone block that does, well, nothing.
```js
import { Mod, BlockModel, ModelCuboid, Material, Writer } from "crmod-api";
import { Box3, Vector3 } from "three";

const writer = new Writer("./build"); // Output directory of the mod
const mod = new Mod("examplemod", writer); // Create a mod with the prefix "examplemod"

const block = mod.createBlock("stone"); // Will write to "./build/blocks/block_examplemod_stone.json
const model = new BlockModel("stone"); // Will write to "./build/models/blocks/model_examplemod_stone.json


/* =====================
 Create the block model
======================== */

// Create a cuboid that spans a whole block (each "unit" is one sixteenth of a block: one pixel in a texture)
const cube = new ModelCuboid(new Box3(
    new Vector3(0, 0, 0),
    new Vector3(16, 16, 16)
));

// Make sure the block will respond to ambient occlusion (the default is `false`)
cube.setAmbientOcclusionEnabled(true);

// Use the default stone texture ("materials" are different texture entries usually found at the top of the
// model; they're called "textures" in the game, but they behave more like materials with texture maps)
cube.setAllMaterials(new Material("stone.png"));

// Models are made up of cuboids with different materials and properties
model.addCuboid(cube);

const state = block.createBlockState(model); // Create a default block state with our new model


/* ==============
 Compile the mod
================= */

// Gets the folders ready for a mod to write to (deletes existing files!)
// TIP: this leaves `blocks/textures/` intact.
// (This is a separate function in case multiple mods should be compiled at once)
await writer.createOutputDir();

// Compiles the mod and writes it to the directory
await mod.write();
```
---

### Glowing Cheese
The following is an example script for a mod that adds a glowing cheese block that, when interacted with, disappears. *No cheese for you!*
```js
import { Mod, BlockModel, ModelCuboid, Material, TriggerSheet, BlockAction, Writer } from "crmod-api";
import { Box3, Vector3 } from "three";

const writer = new Writer("./build");
const mod = new Mod("examplemod", writer);

const myBlockId = "magic_cheese"; // So we don't have to type it multiple times

const block = mod.createBlock(myBlockId); // Will write to "./build/blocks/block_examplemod_magic_cheese.json
const model = new BlockModel(myBlockId); // Will write to "./build/models/blocks/model_examplemod_magic_cheese.json


/* =====================
 Create the block model
======================== */

const cube = new ModelCuboid(new Box3(
    new Vector3(0, 0, 0),
    new Vector3(16, 16, 16)
));

cube.setAmbientOcclusionEnabled(true);
cube.setAllMaterials(new Material("cheese.png"));
model.addCuboid(cube);


/* =============================================
 Create the block's trigger sheet (block event)
================================================ */

// Trigger sheets (called "block events" by the game) are usually unique per block state
const triggerSheet = new TriggerSheet(myBlockId);

triggerSheet.addAction("onInteract", BlockAction.replaceBlock(0, 0, 0, "base:air[default]"));


/*
    State parameters are added after a block state is created. It cannot be passed while constructing.
    The second parameter specifies custom options.
    You can change the block's state parameters by calling `state.id.set("param", "value")`

    Only parameters added by `block.defaultState.add("param", "defaultValue")` can be changed.
*/
const state = block.createBlockState(model, {
    triggerSheet: triggerSheet,

    lightLevelRed: 15,
    lightLevelGreen: 13,
    lightLevelBlue: 2
});


/* ==============
 Compile the mod
================= */

await writer.createOutputDir();
await mod.write();
```