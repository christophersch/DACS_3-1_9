// Defines the 3 different skill levels that users can select between
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

let categories = new Map();

// Class for making the block categories visible/invisible
class TabCategory {
    constructor(index) {
        this.id = index;
        this.DOM_element = document.getElementsByClassName("blocklyTreeRow")[index];
        this.DOM_element_default_height = this.DOM_element.style.height;
        this.visible = true;
    }

    // Hides a specific element/category by letting it fade away
    hide = function () {
        if (this.visible) {
            this.DOM_element.style.animation = null;
            this.DOM_element.offsetHeight;
            this.DOM_element.style.animation = "fade_out .5s forwards";
            setTimeout(() => {
                this.DOM_element.style.visibility = "hidden";
                this.DOM_element.style.height = "0px";
                this.visible = false;
            }, 500);
        } else {
            this.DOM_element.style.visibility = "hidden";
            this.DOM_element.style.height = "0px";
            this.visible = false;
        }
    }

    // Hides a specific element/category instantly
    hide_instant = function () {
        this.DOM_element.style.visibility = "hidden";
        this.DOM_element.style.height = "0px";
        this.visible = false;
    }

    // Shows a specific element/category by letting it fade in
    show = function () {
        if (!this.visible) {
            this.DOM_element.style.visibility = "visible";
            this.DOM_element.style.height = this.DOM_element_default_height;
            this.DOM_element.style.animation = null;
            this.DOM_element.offsetHeight;
            this.DOM_element.style.animation = "fade_in .5s forwards"
            this.visible = true;
        } else {
            this.DOM_element.style.visibility = "visible";
            this.DOM_element.style.height = this.DOM_element_default_height;
            this.visible = true;
        }
    }

}

// Initializes all categories and hides them during the intro screens.
// Some categories are created multiple times for the complexity scaling
function initCategories() {

    var cats = [
        ["logic", 0],
        ["loops", 1],
        ["loops2", 2],
        ["math", 3],
        ["math2", 4],
        ["text", 5],
        ["text2", 6],
        ["text3", 7],
        ["lists", 8],
        ["lists2", 9],
        ["color", 10],
        ["variables", 11],
        ["functions", 12],
        ["MultiThreading",13],
        ["farm_funcs", 14],
        ["farm_funcs2", 15],
        ["farm_complex_funcs", 16],
        ["farm_elements", 17]
    ]

    cats.forEach(cat => {
        var cat_object = new TabCategory(cat[1]);
        cat_object.hide_instant();
        categories.set(cat[0], cat_object);
    });

    initializeDebugCodeGenerator();

}

// Refreshes the selection of categories based on the skill level chosen by the user by hiding those categories that are
// not in the selected skill level and showing the ones that are
function refreshCategories() {
    switch (skill_level) {
        case SKILL_LEVELS.BEGINNER:
            categories.get("logic").show();
            categories.get("loops").show();
            categories.get("loops2").hide();
            categories.get("math").show();
            categories.get("math2").hide();
            categories.get("text").show();
            categories.get("text2").hide();
            categories.get("text3").hide();
            categories.get("lists").hide();
            categories.get("lists2").hide();
            categories.get("variables").show();
            categories.get("functions").hide();
            categories.get("MultiThreading").hide();
            categories.get("farm_funcs").show();
            categories.get("farm_funcs2").hide();
            categories.get("farm_complex_funcs").hide();
            break;

        case SKILL_LEVELS.INTERMEDIATE:
            categories.get("logic").show();
            categories.get("loops").hide();
            categories.get("loops2").show();
            categories.get("math").hide();
            categories.get("math2").show();
            categories.get("text").hide();
            categories.get("text2").show();
            categories.get("text3").hide();
            categories.get("lists").show();
            categories.get("lists2").hide();
            categories.get("variables").show();
            categories.get("functions").hide();
            categories.get("MultiThreading").hide();
            categories.get("farm_funcs").hide();
            categories.get("farm_funcs2").show();
            categories.get("farm_complex_funcs").show();
            break;

        case SKILL_LEVELS.EXPERT:
            categories.get("logic").show();
            categories.get("loops").hide();
            categories.get("loops2").show();
            categories.get("math").hide();
            categories.get("math2").show();
            categories.get("text").hide();
            categories.get("text2").hide();
            categories.get("text3").show();
            categories.get("lists").hide();
            categories.get("lists2").show();
            categories.get("variables").show();
            categories.get("functions").show();
            categories.get("MultiThreading").show();
            categories.get("farm_funcs").hide();
            categories.get("farm_funcs2").show();
            categories.get("farm_complex_funcs").show();
            break;
    }

    // Insect farm stuff will always be shown
    categories.get("farm_elements").show();

    // Colors are always hidden
    categories.get("color").hide();
}

// Sets the complexity level specified by the user
function setComplexityLevel(level, intro_screen = false) {
    skill_level = level;
    refreshCategories();

    if (intro_screen) {
        removeIntroScreen();
    }
}

// Removes the skill level selection intro screen
function removeIntroScreen() {
    var skill_level_back = document.getElementById("skill_level_selection_back");
    var skill_level = document.getElementById("skill_level_selection");

    document.body.removeChild(skill_level_back);
    document.body.removeChild(skill_level);
}