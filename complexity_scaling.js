
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

class TabCategory {
    constructor(index) {
        this.id = index;
        this.DOM_element = document.getElementsByClassName("blocklyTreeRow")[index];
        this.DOM_element_default_height = this.DOM_element.style.height;
        this.visible = true;
    }

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

    hide_instant = function () {
        this.DOM_element.style.visibility = "hidden";
        this.DOM_element.style.height = "0px";
        this.visible = false;
    }

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

function initCategories() {

    var cats = [
        ["logic", 0],
        ["loops", 1],
        ["math", 2],
        ["text", 3],
        ["lists", 4],
        ["color", 5],
        ["variables", 6],
        ["functions", 7],
        ["farm_elements", 8],
        ["farm_funcs", 9],
        ["farm_complex_funcs", 10]
    ]

    cats.forEach(cat => {
        var cat_object = new TabCategory(cat[1]);
        cat_object.hide_instant();
        categories.set(cat[0], cat_object);
    });

}


function refreshCategories() {
    switch (skill_level) {
        case SKILL_LEVELS.BEGINNER:
            categories.get("logic").show();
            categories.get("loops").show();
            categories.get("math").hide();
            categories.get("text").hide();
            categories.get("lists").hide();
            categories.get("variables").hide();
            categories.get("functions").hide();
            break;

        case SKILL_LEVELS.INTERMEDIATE:
            categories.get("logic").show();
            categories.get("loops").show();
            categories.get("math").show();
            categories.get("text").show();
            categories.get("lists").hide();
            categories.get("variables").hide();
            categories.get("functions").hide();

            break;

        case SKILL_LEVELS.EXPERT:
            categories.get("logic").show();
            categories.get("loops").show();
            categories.get("math").show();
            categories.get("text").show();
            categories.get("lists").show();
            categories.get("variables").show();
            categories.get("functions").show();
            break;
    }

    // Insect farm stuff will always be shown
    categories.get("farm_elements").show();
    categories.get("farm_funcs").show();
    categories.get("farm_complex_funcs").show();

    // Colors are always hidden
    categories.get("color").hide();
}

function setComplexityLevel(level, intro_screen = false) {
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