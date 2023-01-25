# Modification and expansion guide
This project is largely based on Google's open source Blockly project, this means that for example defining a new block one should refer to the blockly documentation.

Blockly version = v8.0.5
## Adding new blocks
Blocks are added in the file *custom_blocks.js* including the Python code that a block represents.
Every block must have a name, a description of its external features, and a definition of its internals.  
For example the following block has as a name ``Grab``, external features ``Blockly.Blocks['Grab']``, and as its internals ``Blockly.Python['Grab']``:
```javascript
Blockly.Blocks['Grab'] = {
    init: function() {
        this.jsonInit({
            "type": "Grab",
            "message0": "%{BKY_GRAB_TITLE}",
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": ["Item", "Box"]
                }
            ],
            "colour": ITEM_INTERACTION_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "tooltip": "%{BKY_GRAB_TOOLTIP}"
        });
    }
}

Blockly.Python['Grab'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.grab(' + value_object + ')\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}
```
We used the json format for defining the external features of our blocks.

For more details regarding block definitions, please use the guide at [developers.google.com/blockly/guides/overview](https://developers.google.com/blockly/guides/overview), or the included download.

Once a block is defined, it can be added by including it in a category in the file *index.html*, for example the block ``Grab`` is included in the category ``%{BKY_INSECT_FARM_FUNCTIONS_TITLE}`` as follows:
```html
<category colour="190" name="%{BKY_INSECT_FARM_FUNCTIONS_TITLE}">
            <block type="Grab">
            </block>
        </category>
```
Note: ``%{BKY_INSECT_FARM_FUNCTIONS_TITLE}`` is used to give this category a language appropriate title.

## Adding new categories
Categories are defined in *index.html* and must at least contain a colour and a name, see section *Adding new blocks* for an example.  
Further more for a category to be visible it must be set to visible in *complexity_scaling.js*. 
This is done by giving it a name to reference by 
(in method ``initCategories()`` variable ``cats``, where the number refer to when it is mentioned, from the top down, in *index.html*),
and giving it for each difficulty level a visibility state (in method ``refreshCategories()``, using for each case the ``showCat(x, s)`` method).

## Languages
Currently, implement are Dutch (nl), German (de), English (en), and French (fr).  
*de.js*, *en.js*, *fr.js*, and *nl.js* contain category titles, and other block related texts for each language. Note that for example ``%{BKY_GRAB_TOOLTIP}`` in the example in section *Adding new blocks* is replaced by the value of ``Blockly.Msg.GRAB_TOOLTIP`` in *en.js* (if english is the selected language).   
*guide.js* contains under variable names entext, detext, frtext, and nltext all the texts used in the tutorial (note the same variable name is used multiple times).  
Lastly some additional texts can be found in *index.html* functions ``hideAdvanced()``, ``changeRenderer()``, ``closeGuide()``, variable ``language``, and lastly at the bottom of the code.


