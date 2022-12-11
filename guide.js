var guide_index = 0;

const GUIDE_STEPS = [
    {
        entext: "Welcome to the guide!<br>This guide will help you get started with programming with blocks.<br>Click \"Next\" to continue.",
        detext: "Willkommen zum Tutorial!<br>Dieses Tutorial wird Ihnen helfen mit dem Programmieren mit Blöcken zu starten.<br>Klicken Sie \"Weiter\" um fortzufahren.",
        nltext: "Welkom naar het tutorial!<br>Dit tutorial maakt u met de het programmeren van blokken vertrouwd.<br>Klik \"Volgende\" om verder te gaan.",
        frtext: "Bienvenue au tutoriel!<br>Cet tutoriel va vous aider à programmer avec des blocs.<br>Cliquez \"Prochain\" pour continuer.",
        next: true,
        action: function() {
            var guide = document.getElementById("guide");
            guide.style.margin = "auto";
            guide.style.width = 400+"px";
            guide.style.height = 250+"px";
        }
    },
    {
        entext: "You can choose your language here.",
        detext: "Hier können Sie die Sprache auswählen.",
        nltext: "Hier kunt u de taal uitkiezen.",
        frtext: "Vous pouvez choisir votre langue préférée ici.",
        next: true,
        action: function() {
            var guide = document.getElementById("guide");
            document.getElementById("language_selection").style.animation = "guide_highlight 1s infinite ease-in-out";
            var language_selection = document.getElementById("language_selection");
            var language_selection_rect = language_selection.getBoundingClientRect();

            guide.style.width = 240+"px";
            guide.style.height = 250+"px";

            guide.style.margin = "5px";
            guide.style.left = language_selection_rect.left + language_selection_rect.width + 15 + "px";
            guide.style.top = language_selection_rect.top + "px";
        },
        finish: function() {
            document.getElementById("language_selection").style.animation = "none";
        }
    },
    {
        entext: "You can choose blocks from the toolbox on the left.",
        detext: "Links können sie die Blöcke der Toolbox auswählen.",
        nltext: "Aan de linkerkant kunt u de blokken van de toolbox uitkiezen.",
        frtext: "À gauche, vous pouvez choisir les blocs de la boîte à outils.",
        next: true,
        action: function() {
            var guide = document.getElementById("guide");
            document.getElementsByClassName("blocklyToolboxDiv")[0].style.animation = "guide_highlight_2 1s infinite ease-in-out";
            var toolbox = document.getElementsByClassName("blocklyToolboxDiv")[0];
            var toolbox_rect = toolbox.getBoundingClientRect();
            guide.style.left = toolbox_rect.left + toolbox_rect.width + 15 + "px";
            guide.style.top = toolbox_rect.top + "px";
            guide.style.height = 250+"px";
        },
        finish: function() {
            document.getElementsByClassName("blocklyToolboxDiv")[0].style.animation = "none";
        }
    },
    {
        entext: "Choose the category.",
        detext: "Bitte wählen Sie eine Kategorie aus.",
        nltext: "Kies een categorie.",
        frtext: "Choisissez une catégorie.",
        next: false,
        action: function() {
            var guide = document.getElementById("guide");
            guide.style.height = 150+"px";
            document.getElementsByClassName("blocklyToolboxCategory")[0].style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementsByClassName("blocklyToolboxCategory")[1].style.animation = "guide_highlight_2 1s infinite ease-in-out";
            var toolbox_category = document.getElementsByClassName("blocklyToolboxCategory")[0];
            var toolbox_category_rect = toolbox_category.getBoundingClientRect();
            guide.style.left = toolbox_category_rect.left + toolbox_category_rect.width + "10px";
            guide.style.top = toolbox_category_rect.top + "px";
        },
        waitUntil: function() {
            return document.getElementsByClassName("blocklyFlyout")[1].style.display !== "none";
        },
        finish: function() {
            document.getElementsByClassName("blocklyToolboxCategory")[0].style.animation = "none";
            document.getElementsByClassName("blocklyToolboxCategory")[1].style.animation = "none";
        }
    },
    {
        entext: "Drag any block to the work space.",
        detext: "Bitte ziehen Sie einen Block in die Arbeitsfläche.",
        nltext: "Trek een willekeurig blok naar de werkruimte.",
        frtext: "Faites glisser n'importe quel bloc vers l'espace de travails.",
        next: false,
        action: function() {
            var guide = document.getElementById("guide");
            var path = document.getElementsByClassName("blocklyPath")[0];
            var path_rect = path.getBoundingClientRect();
            guide.style.height = 150 + "px";
            guide.style.margin = "10px";
            guide.style.left = path_rect.left + path_rect.width + 90 + "px";
            guide.style.top = path_rect.top + "px";
        },
        waitUntil: function() {
            return Blockly.getMainWorkspace().getTopBlocks().length > 0;
        }
    },
    {
        entext: "You can see the source code of your script on the right.",
        detext: "Rechts können Sie den Quellcode des Skripts sehen.",
        nltext: "Aan de rechterkant kunt u de broncode van de script zien.",
        frtext: "Vous pouvez voir le source code du script à droite.",
        next: true,
        action: function() {
            var guide = document.getElementById("guide");
            var debug_panel = document.getElementById("debugText1");
            var debug_panel_rect = debug_panel.getBoundingClientRect();
            debug_panel.style.animation = "guide_highlight_2 1s infinite ease-in-out";
            guide.style.height = 260+"px";
            guide.style.margin = "auto";
            guide.style.left = debug_panel_rect.left - debug_panel_rect.height/3 + "px";
            guide.style.top = debug_panel_rect.top - debug_panel_rect.height/2 + "px";
        },
        finish: function() {
            document.getElementById("debugText1").style.animation = "none";
        }
    },
    {
        entext: "To remove the block, you can drag it either to the trash bin or to the toolbox menu",
        detext: "Um den Block zu entfernen, können Sie ihn entweder in den Mülleimer oder zurück in das Toolboxmenü ziehen.",
        nltext: "Om de blok te verwijderen, kunt u het in de bin vuilnisbak of terug in de toolboxmenu plaatsen.",
        frtext: "Pour eliminer le bloc, vous pouvez le placer dans la poubelle où le replacer dans le toolboxmenu.",
        next: true,
        action: function() {
            var guide = document.getElementById("guide");
            var path = document.getElementsByClassName("blocklyToolboxDiv")[0];
            var path_rect = path.getBoundingClientRect();

            var ws = document.getElementsByClassName("blocklyWorkspace")[0];
            ws.parentElement.style.animation = "guide_highlight_2 1s infinite ease-in-out";
            var child = ws.firstElementChild.cloneNode(true);
            ws.appendChild(child);
            child.style.height = "80%";
            child.style.stroke = "none";
            ws.firstElementChild.style.width = "87.5%";
            child.style.background = "#DFDBFE";

            document.getElementsByClassName("blocklyToolboxDiv")[0].style.animation = "guide_highlight_2 1s infinite ease-in-out";
            guide.style.height = 260+"px";
            guide.style.margin = "5px";
            guide.style.left =  20 + "px";
            guide.style.top = path_rect.bottom - path_rect.height/2.5 + "px";
        }
    },
    {
        entext: "Remove the block from the working space.",
        detext: "Bitte entfernen Sie den Block von der Arbeitsfläche.",
        nltext: "Verwijder de bloc van de werkruimte.",
        frtext: "Eliminez le bloc de l'espace de travails.",
        next: false,
        action: function() {
            var guide = document.getElementById("guide");
            guide.style.height = 160+"px";
        },
        waitUntil: function() {
            return Blockly.getMainWorkspace().getTopBlocks().length === 0;
        },

        finish: function(){
            document.getElementsByClassName("blocklyToolboxDiv")[0].style.animation = "none";
            document.getElementsByClassName("blocklyWorkspace")[0].parentElement.style.animation = "none";
            // document.getElementsByClassName("blocklyWorkspace")[0].parentElement.style.background = rgb(199,199,255);
        }
    },
    {
        entext: "You can specify the renderer of the blocks, complexity level, and the server here.",
        detext: "Sie können den Renderer der Blöcke, den Komplexitätsgrad und den Server hier ändern.",
        nltext: "U kunt de renderer van de blokken, de complexiteitsniveau en de server hier wijzigen.",
        frtext: "Vous pouvez changer le renderer des blocs, le niveau de complexité et le server ici.",
        next: true,
        action: function() {
            document.getElementById("renderer").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("beginner").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("intermediate").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("expert").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("token").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            var guide = document.getElementById("guide");
            var rect = document.getElementById("token").getBoundingClientRect()
            guide.style.height = 260+"px";
            guide.style.left = document.getElementById("token").getBoundingClientRect().right + 15 +"px"
            guide.style.top = document.getElementById("expert").getBoundingClientRect().top+"px"
        },
        finish: function(){
            document.getElementById("renderer").style.animation = "none";
            document.getElementById("beginner").style.animation = "none";
            document.getElementById("intermediate").style.animation = "none";
            document.getElementById("expert").style.animation = "none";
            document.getElementById("token").style.animation = "none";
            document.getElementById("local").style.animation = "none";
        }
    },
    {
        entext: "To get the output of the script, you need to send the code first.",
        detext: "Um den Output vom Skript zu bekommen, müssen Sie zuerst den Code abschicken.",
        nltext: "Om de output van de script te ontvangen, moet u eerst de code afzenden.",
        frtext: "Pour obtenir l'output de script, vous devez d'abord envoyez le code.",
        next: true,
        action: function() {
            document.getElementById("send_code_request").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("output").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("outputText").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            var guide = document.getElementById("guide");
            var rect = document.getElementById("beginner").getBoundingClientRect()
        },
        finish: function(){
            document.getElementById("send_code_request").style.animation = "none";
            document.getElementById("output").style.animation = "none";
            document.getElementById("outputText").style.animation = "none";
        }
    },
    {
        entext: "Success, now you can start coding!",
        detext: "Nun können sie mit dem Programmieren beginnen. Viel Erfolg!",
        nltext: "Nu kunt u met programmeren beginnen. Veel success!",
        frtext: "Maintenant vous pouvez commencer à programmer. Bonne chance!",
        action: function () {
            document.getElementById("guideBack").style.display = "none"

        }
    }
];

function setGuide(enabled) {
    document.getElementById("guide_intro").style.display = "none";
    if (enabled) {
        var lang = getLanguage();
        beginGuide(lang);
    }
}

function beginGuide(lang) {
    document.getElementById("guide").style.display = "block";
    document.getElementById("guideBack").style.display = "none";
    document.getElementById("guideNext").style.display = "block";
    guide_index = 0;
    showGuideStep(lang);
}

function showGuideStep(lang) {
    var guide = document.getElementById("guide");
    var guide_back = document.getElementById("guideBack");
    var guide_next = document.getElementById("guideNext");
    var guide_text = document.getElementById("guideText");

    if (lang === "en") {
        guide_text.innerHTML = GUIDE_STEPS[guide_index].entext;
    }
    else if(lang === "de") {
        guide_text.innerHTML = GUIDE_STEPS[guide_index].detext;
    }
    else if(lang === "nl") {
        guide_text.innerHTML = GUIDE_STEPS[guide_index].nltext;
    }
    else {
        guide_text.innerHTML = GUIDE_STEPS[guide_index].frtext;
    }
    guide_next.style.display = (guide_index < GUIDE_STEPS.length - 1 && GUIDE_STEPS[guide_index].next) ? "block" : "none";
    guide_back.style.display = guide_index > 0 ? "block" : "none";

    if (typeof GUIDE_STEPS[guide_index].action === "function") {
        GUIDE_STEPS[guide_index].action();
    }

    if (typeof GUIDE_STEPS[guide_index].waitUntil === "function") {
        var interval = setInterval(function() {
            if (typeof GUIDE_STEPS[guide_index].waitUntil !== "function") {
                clearInterval(interval);
                return;
            }
            if (GUIDE_STEPS[guide_index].waitUntil()) {
                clearInterval(interval);
                guideNext(lang);
            }
        }, 30);
    }
}

function guideBack(lang) {
    if (typeof GUIDE_STEPS[guide_index].finish === "function") {
        GUIDE_STEPS[guide_index].finish();
    }
    guide_index--;
    showGuideStep(lang);
}

function guideNext(lang) {
    if (typeof GUIDE_STEPS[guide_index].finish === "function") {
        GUIDE_STEPS[guide_index].finish();
    }
    guide_index++;
    showGuideStep(lang);
}