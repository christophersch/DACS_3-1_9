const SKILL_LEVELS = {
    BEGINNER: 0,
    INTERMEDIATE: 1,
    EXPERT: 2
}
let skill_level = SKILL_LEVELS.BEGINNER;

/*
    access level 0:
    Purpose: Teach user step-by-step programming.
    - basic logic modules (if)
    - insect farm elements
    - insect farm functions

    access level 1:
    - text

    access level 2 (free mode):
    Purpose of free mode: General programming.
    Allows the user to build routines for the insect farm using custom functions
    - functions
*/

/*
    map:
    logic: blockly-0
    loops: blockly-1
    math: blockly-2
    text: blockly-3
    lists: blockly-4

    variables: blockly-5
    functions: blockly-6
*/

let categories = new Map();

class TabCategory {
    constructor(id) {
        this.id = id;
        this.DOM_element = document.getElementById(id);
        this.DOM_element_default_height = this.DOM_element.style.height;
        this.visible = true;
    }

    hide = function() {
        this.DOM_element.style.visibility = "hidden";
        this.DOM_element.style.height = "0px";
        this.visible = false;
    }

    show = function() {
        this.DOM_element.style.visibility = "visible";
        this.DOM_element.style.height = this.DOM_element_default_height;
        if (!this.visible) {
            this.DOM_element.style.animation = null;
            this.DOM_element.offsetHeight;
            this.DOM_element.style.animation = "fade_in .5s forwards"
        }
        this.visible = true;
    }
}

function setUpCategories() {
    categories.set("logic",     new TabCategory("blockly-0"));
    categories.set("loops",     new TabCategory("blockly-1"));
    categories.set("math",      new TabCategory("blockly-2"));
    categories.set("text",      new TabCategory("blockly-3"));
    categories.set("lists",     new TabCategory("blockly-4"));
    categories.set("variables", new TabCategory("blockly-6"));
    categories.set("functions", new TabCategory("blockly-7"));
    categories.set("farm_elements", new TabCategory("blockly-9"));
    categories.set("farm_funcs", new TabCategory("blockly-a"));
    categories.set("farm_complex_funcs", new TabCategory("blockly-b"));
}

setUpCategories()

categories.forEach((vals, keys) => {
    vals.hide();
});

function refreshCategories() {
    switch(skill_level) {
        case SKILL_LEVELS.BEGINNER:
                categories.get("logic")         .show();
                categories.get("loops")         .show();
                categories.get("math")          .hide();
                categories.get("text")          .hide();
                categories.get("lists")         .hide();
                categories.get("variables")     .hide();
                categories.get("functions")     .hide();
            break;

        case SKILL_LEVELS.INTERMEDIATE:
                categories.get("logic")         .show();
                categories.get("loops")         .show();
                categories.get("math")          .show();
                categories.get("text")          .show();
                categories.get("lists")         .hide();
                categories.get("variables")     .hide();
                categories.get("functions")     .hide();

            break;

        case SKILL_LEVELS.EXPERT:
                categories.get("logic")         .show();
                categories.get("loops")         .show();
                categories.get("math")          .show();
                categories.get("text")          .show();
                categories.get("lists")         .show();
                categories.get("variables")     .show();
                categories.get("functions")     .show();
            break;
    }

    categories.get("farm_elements") .show();
    categories.get("farm_funcs")    .show();
    categories.get("farm_complex_funcs").show();
}

function setComplexityLevel(level, intro_screen=false) {
    skill_level = level;
    refreshCategories();

    if (intro_screen) {
        removeIntroScreen();
    }
}

function removeIntroScreen() {
    var skill_level_back = document.getElementById("skill_level_selection_back");
    var skill_level = document.getElementById("skill_level_selection");

    document.body.removeChild(skill_level_back);
    document.body.removeChild(skill_level);
}
