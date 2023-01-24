var guide_index = 0;

// Defines every step in the tutorial/guide
const GUIDE_STEPS = [
    {
        entext: "Welcome to the guide!<br>This guide will help you get started with programming with blocks.<br>Click \"Next\" to continue.",
        detext: "Willkommen zum Tutorial!<br>Dieses Tutorial wird dir helfen mit dem Programmieren mit Blöcken zu starten.<br>Klicke \"Weiter\" um fortzufahren.",
        nltext: "Welkom bij de tutorial!<br>Dit tutorial maakt u vertrouwd met het programmeren met blokken.<br>Klik op \"Volgende\" om verder te gaan.",
        frtext: "Bienvenue au tutoriel!<br>Ce tutoriel vous aidera à programmer avec des blocs.<br>Cliquez \"Suivant\" pour continuer.",
        next: true,
        width: 400,
        height: 250,
        action: function() {
            var guide = document.getElementById("guide");
            guide.style.margin = "auto";
        }
    },
    {
        entext: "You can choose your language here.",
        detext: "Hier kannst du die Sprache auswählen.",
        nltext: "Hier kunt u uw taal uitkiezen.",
        frtext: "Vous pouvez choisir votre langue préférée ici.",
        next: true,
        width: 240,
        height: 250,
        action: function() {
            var guide = document.getElementById("guide");
            document.getElementById("language_selection").style.animation = "guide_highlight 1s infinite ease-in-out";
            var language_selection = document.getElementById("language_selection");
            var language_selection_rect = language_selection.getBoundingClientRect();
            guide.style.margin = "5px";
            guide.style.left = language_selection_rect.left + language_selection_rect.width + 15 + "px";
            guide.style.top = language_selection_rect.top - 200 + "px";
        },
        finish: function() {
            document.getElementById("language_selection").style.animation = "none";
        }
    },
    {
        entext: "You can choose blocks from the toolbox on the left.",
        detext: "Links kannst du die Blöcke der Toolbox auswählen.",
        nltext: "Aan de linkerkant kunt u blokken van de toolbox uitkiezen.",
        frtext: "À gauche, vous pouvez sélectionner les blocs depuis la boîte à outils.",
        next: true,
        width: 240,
        height: 250,
        action: function() {
            var guide = document.getElementById("guide");
            document.getElementsByClassName("blocklyToolboxDiv")[0].style.animation = "guide_highlight_2 1s infinite ease-in-out";
            var toolbox = document.getElementsByClassName("blocklyToolboxDiv")[0];
            var toolbox_rect = toolbox.getBoundingClientRect();
            guide.style.left = toolbox_rect.left + toolbox_rect.width + 15 + "px";
            guide.style.top = toolbox_rect.top + 50 + "px";
            guide.style.margin = "5px";

            // guide.style.left = 350 + "px";
            // guide.style.top = 1+"px";
        },
        finish: function() {
            document.getElementsByClassName("blocklyToolboxDiv")[0].style.animation = "none";
        }
    },
    {
        entext: "Choose a category.",
        detext: "Bitte wähle eine Kategorie aus.",
        nltext: "Kies een categorie.",
        frtext: "Choisissez une catégorie.",
        next: false,
        width: 240,
        height: 150,
        action: function() {
            var guide = document.getElementById("guide");
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
        detext: "Bitte zieh einen Block in die Arbeitsfläche.",
        nltext: "Trek een blok naar de werkruimte.",
        frtext: "Faites glisser n'importe quel bloc vers l'espace de travail.",
        next: false,
        width: 240,
        height: 150,
        action: function() {
            var guide = document.getElementById("guide");
            var path = document.getElementsByClassName("blocklyPath")[0];
            var path_rect = path.getBoundingClientRect();
            guide.style.margin = "10px";
            guide.style.left = path_rect.left + path_rect.width +100 + "px";
            guide.style.top = path_rect.top + "px";
        },
        waitUntil: function() {
            return Blockly.getMainWorkspace().getTopBlocks().length > 0;
        }
    },
    {
        entext: "You can see the source code of your script on the right.",
        detext: "Rechts kannst du den Quellcode des Skripts sehen.",
        nltext: "Aan de rechterkant kunt u de broncode van het script zien.",
        frtext: "Vous pouvez voir le code source de votre script à droite.",
        next: true,
        width: 240,
        height: 260,
        action: function() {
            var workspace = Blockly.getMainWorkspace();

            if (Blockly.getMainWorkspace().getTopBlocks().length === 0) {
                var block = workspace.newBlock("controls_forEach");
                block.initSvg();
                block.moveBy(30, 150);
                block.render();
            }
            var guide = document.getElementById("guide");
            var debug_panel = document.getElementById("debug");
            var debug_panel_rect = debug_panel.getBoundingClientRect();
            debug_panel.style.animation = "guide_highlight_2 1s infinite ease-in-out";
            guide.style.margin = "auto";
            guide.style.left = debug_panel_rect.left + "px";
            guide.style.top = debug_panel_rect.top + "px";
            // guide.style.left = debug_panel_rect.left - debug_panel_rect.height/3 + "px";
            // guide.style.top = debug_panel_rect.top - debug_panel_rect.height/2 + "px";
        },
        finish: function() {
            document.getElementById("debug").style.animation = "none";
        }
    },
    {
        entext: "There are three different shapes of blocks. " +
                "<br>Round shape blocks represent objects," +
                "<br>Hexagon blocks refer to boolean conditions," +
                "<br>Rectangular blocks represent everything else.",
        detext: "Es gibt drei verschiedene Arten von Blöcken. " +
                "<br>Runde Blöcke repräsentieren Objekte," +
                "<br>Hexagon-Blöcke beziehen sich auf boolean Bedingungen. " +
                "<br>Viereckige Blöcke beziehen sich auf den Rest.",
        nltext: "Er zijn drie verschillende vormen van blokken."+
                "<br>Ronde blokken staan voor objecten,"+
                "<br>Zeshoekige blokken staan voor logische objecten. " +
                "<br>Rechthoekige blokken staan voor de rest.",
        frtext: "Il y a trois différents types de blocs." +
                "<br>Les blocs ronds représentent des objects. " +
                "<br>Les blocs hexagonaux représentent les conditions booléennes." +
                "<br>Les blocs rectangulaires représentent tout le reste.",
        next: true,
        width: 450,
        height: 260,
        action: function() {
            var guide = document.getElementById("guide");
            var path_rect = document.getElementsByClassName("blocklyToolboxDiv")[0].getBoundingClientRect();

            guide.style.left = path_rect.right + "px";
            guide.style.top = path_rect.bottom - path_rect.height/2 + "px";

            var workspace = Blockly.getMainWorkspace();
            workspace.clear();
            var block = workspace.newBlock("logic_null");
            block.initSvg();
            block.moveBy(30, 150);
            block.render();
            var block1 = workspace.newBlock("math_number");
            block1.initSvg();
            block1.moveBy(100, 150);
            block1.render();
            var block2 = workspace.newBlock("logic_ternary");
            block2.initSvg();
            block2.moveBy(30, 200);
            block2.render();
            var block3 = workspace.newBlock("logic_negate");
            block3.initSvg();
            block3.moveBy(200, 10);
            block3.render();
            var block4 = workspace.newBlock("logic_boolean");
            block4.initSvg();
            block4.moveBy(200, 60);
            block4.render();
            var block5 = workspace.newBlock("controls_repeat_ext");
            block5.initSvg()
            block5.moveBy(300, 150);
            block5.render();
            var block6 = workspace.newBlock("controls_whileUntil");
            block6.initSvg();
            block6.moveBy(300, 300);
            block6.render();
            // connection working
            // var blockConnection = block.getInput('TEXT').connection;
            // var block1Connection = block1.outputConnection;
            // blockConnection.connect(block1Connection);

            guide.style.margin = "auto";
        },
        finish: function() {
            var workspace = Blockly.getMainWorkspace();
            workspace.clear();
        }
    },
    {
        entext: "Rectangular blocks are connectable to each other, " +
                "and their empty spaces can be filled with round and hexagon blocks.",
        detext: "Viereckige Blöcke können sich miteinander verbinden, "+
                "während die freien Plätze in diesen Blöcken von runden "+
                "und Hexagon-Blöcken gefüllt werden können.",
        nltext: "Rechthoekige blokken kunnen met elkaar verbinden, "+
                "en de lege ruimtes in deze blokken kunnen door " +
                "ronde en zeshoekige blokken opgevuld worden.",
        frtext: "Les blocs rectangulaires peuvent se connecter entre eux, " +
                "et leurs espaces libres peuvent être remplis avec des blocs ronds et hexagonaux.",
        next: true,
        width: 450,
        height: 260,
        action: function() {
            var guide = document.getElementById("guide");
            var path_rect = document.getElementsByClassName("blocklyToolboxDiv")[0].getBoundingClientRect();

            guide.style.left = path_rect.right + "px";
            guide.style.top = path_rect.bottom - path_rect.height/2 + "px";
            guide.style.margin = "auto";

            var workspace = Blockly.getMainWorkspace();
            workspace.clear();

            var block1 = workspace.newBlock("logic_ternary");
            block1.initSvg();
            block1.moveBy(20, 200);
            block1.render();
            var neg = workspace.newBlock("logic_boolean");
            neg.initSvg();
            neg.render();
            var null1 = workspace.newBlock("logic_null");
            null1.initSvg();
            null1.render();
            var null2 = workspace.newBlock("logic_null");
            null2.initSvg();
            null2.render();
            block1.getInput('IF').connection.connect(neg.outputConnection);
            block1.getInput('THEN').connection.connect(null1.outputConnection);
            block1.getInput('ELSE').connection.connect(null2.outputConnection);

            var bool = workspace.newBlock("logic_boolean");
            bool.initSvg();
            bool.render();
            var number = workspace.newBlock("math_number")
            number.initSvg();
            number.render();
            var block2 = workspace.newBlock("controls_repeat_ext");
            block2.initSvg()
            block2.moveBy(300, 150);
            block2.render();
            var block3 = workspace.newBlock("controls_whileUntil");
            block3.initSvg();
            block3.moveBy(300, 250);
            block3.render();
            block3.getInput('BOOL').connection.connect(bool.outputConnection);
            block2.getInput('TIMES').connection.connect(number.outputConnection);
        },
        finish: function() {
            var workspace = Blockly.getMainWorkspace();
            workspace.clear();
        }
    },
    {
        entext: "Connect the blocks.",
        detext: "Verbinde die Blöcke.",
        nltext: "Verbind de blokken.",
        frtext: "Connectez les blocs.",
        next: false,
        width: 200,
        height: 160,
        action: function() {
            var guide = document.getElementById("guide");
            var path_rect = document.getElementsByClassName("blocklyToolboxDiv")[0].getBoundingClientRect();

            guide.style.left = path_rect.left - path_rect.width + "px";
            guide.style.top = path_rect.bottom - path_rect.height + "px";
            guide.style.margin = "auto";

            var workspace = Blockly.getMainWorkspace();
            workspace.clear();

            var print = workspace.newBlock("text_print");
            print.initSvg();
            print.moveBy(100, 200);
            print.render();
            var line = workspace.newBlock("text_multiline");
            line.initSvg();
            line.moveBy(400, 200);
            line.render();
        },
        waitUntil: function() {
            return Blockly.getMainWorkspace().getTopBlocks().length === 1;
        },
    },
    {
        entext: "To remove a block, you can either drag it to the trash bin or to the toolbox menu",
        detext: "Um den Block zu entfernen, kannst du ihn entweder in den Mülleimer oder zurück in das Toolboxmenü ziehen.",
        nltext: "Om een blok te verwijderen, kunt u het naar vuilnisbak slepen of terug in de toolbox plaatsen.",
        frtext: "Pour supprimer un bloc, vous pouvez le déplacer vers la corbeille ou le replacer dans le menu de la boîte à outils.",
        next: true,
        width: 240,
        height: 260,
        action: function() {
            var workspace = Blockly.getMainWorkspace();
            workspace.clear();
            var block = workspace.newBlock("controls_forEach");
            block.initSvg();
            block.moveBy(30, 150);
            block.render();
            var guide = document.getElementById("guide");
            var path_rect = document.getElementsByClassName("blocklyToolboxDiv")[0].getBoundingClientRect();

            guide.style.margin = "5px";
            guide.style.left =  20 + "px";
            guide.style.top = path_rect.bottom - path_rect.height/2 + "px";
        }
    },
    {
        entext: "Remove the block from the working space.",
        detext: "Bitte entferne den Block von der Arbeitsfläche.",
        nltext: "Verwijder het blok van de werkruimte.",
        frtext: "Supprimez le bloc de l'espace de travail.",
        next: false,
        width: 240,
        height: 160,
        waitUntil: function() {
            return Blockly.getMainWorkspace().getTopBlocks().length === 0;
        },
    },
    {
        entext: "You can specify the renderer of the blocks, the complexity level, and the server here.",
        detext: "Du kannst den Renderer der Blöcke, den Komplexitätsgrad und den Server hier ändern.",
        nltext: "Hier kunt u de renderer van de blokken, het complexiteitsniveau en de server wijzigen.",
        frtext: "Vous pouvez changer le renderer des blocs, le niveau de complexité et le serveur ici.",
        next: true,
        width: 240,
        height: 260,
        action: function() {
            document.getElementById("renderer").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("beginner").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("intermediate").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("expert").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("token").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("ip").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            var guide = document.getElementById("guide");
            guide.style.left = document.getElementById("expert").getBoundingClientRect().right + 15 +"px";
            guide.style.top = document.getElementById("expert").getBoundingClientRect().top - 170 +"px";
        },
        finish: function(){
            document.getElementById("renderer").style.animation = "none";
            document.getElementById("beginner").style.animation = "none";
            document.getElementById("intermediate").style.animation = "none";
            document.getElementById("expert").style.animation = "none";
            document.getElementById("token").style.animation = "none";
            document.getElementById("ip").style.animation = "none";
        }
    },
    {
        entext: "To get the output of the script, you need to send the code first.",
        detext: "Um den Output vom Skript zu bekommen, musst du zuerst den Code abschicken.",
        nltext: "Om de uitvoer van de script te ontvangen, moet u eerst de code afzenden.",
        frtext: "Pour obtenir le résultat du script, vous devez d'abord envoyer le code.",
        next: true,
        width: 240,
        height: 260,
        action: function() {
            var guide = document.getElementById("guide");
            guide.style.left = document.getElementById("send_code_request").getBoundingClientRect().right + 50 +"px";
            guide.style.top = document.getElementById("send_code_request").getBoundingClientRect().top - 40 +"px";
            document.getElementById("send_code_request").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("output").style.animation = "guide_highlight_2 1s infinite ease-in-out";
            document.getElementById("outputText").style.animation = "guide_highlight_2 1s infinite ease-in-out";
        },
        finish: function(){
            document.getElementById("send_code_request").style.animation = "none";
            document.getElementById("output").style.animation = "none";
            document.getElementById("outputText").style.animation = "none";
        }
    },
    {
        entext: "Now you can start programming with blocks. Best of luck!",
        detext: "Nun kannst du mit dem Programmieren beginnen. Viel Erfolg!",
        nltext: "Nu kunt u beginnen met programmeren. Veel succes!",
        frtext: "Vous pouvez maintenant commencer à programmer avec des blocs. Bonne chance!",
        width: 240,
        height: 260,
        action: function () {
            var guide = document.getElementById("guide");
            guide.style.left = document.getElementById("send_code_request").getBoundingClientRect().right + 50 +"px";
            guide.style.top = document.getElementById("send_code_request").getBoundingClientRect().top - 40 +"px";
            document.getElementById("guideBack").style.display = "none";
            document.getElementById("guideFinish").style.display = "block";
        },
        finish: function() {
            document.getElementById("guide").style.display = "none";
        }
    }
];

// Enables the guide if the user clicked "Yes" in the guide intro
function setGuide(enabled) {
    document.getElementById("guide_intro").style.display = "none";
    if (enabled) {
        var lang = getLanguage();
        beginGuide(lang);
    }
}

// Starts the guide if it was enabled by the user
function beginGuide(lang) {
    document.getElementById("guide").style.display = "block";
    document.getElementById("guideBack").style.display = "none";
    document.getElementById("guideNext").style.display = "block";
    guide_index = 0;
    showGuideStep(lang);
}

// Shows the current guide step and the guideNext and guideBack buttons if applicable
function showGuideStep(lang) {
    var guide = document.getElementById("guide");
    var guide_back = document.getElementById("guideBack");
    var guide_next = document.getElementById("guideNext");
    var guide_text = document.getElementById("guideText");

    guide.style.display = (guide_index === GUIDE_STEPS.length) ? "none" : "block";
    guide.style.width = GUIDE_STEPS[guide_index].width+"px";
    guide.style.height = GUIDE_STEPS[guide_index].height+"px";
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

    var scrollX = window.scrollX;
    var scrollY = window.scrollY;

    if (guide.style.left.endsWith("px")) {
        guide.style.left = (parseInt(guide.style.left.substring(0, guide.style.left.length - 2)) + scrollX) + "px";
    }
    if (guide.style.top.endsWith("px")) {
        guide.style.top = (parseInt(guide.style.top.substring(0, guide.style.top.length - 2)) + scrollY) + "px";
    }

    if (guide.getBoundingClientRect().left < 0) {
        window.scrollTo(scrollX + guide.getBoundingClientRect().left - 10, scrollY);
    }

    if (guide.getBoundingClientRect().top < 0) {
        window.scrollTo(scrollX, scrollY + guide.getBoundingClientRect().top - 10);
    }

    if (guide.getBoundingClientRect().right > window.innerWidth) {
        window.scrollTo(scrollX + guide.getBoundingClientRect().right - window.innerWidth + 10, scrollY);
    }

    if (guide.getBoundingClientRect().bottom > window.innerHeight) {
        window.scrollTo(scrollX, scrollY + guide.getBoundingClientRect().bottom - window.innerHeight + 10);
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

// Goes back to the previous step in the guide
function guideBack(lang) {
    if (typeof GUIDE_STEPS[guide_index].finish === "function") {
        GUIDE_STEPS[guide_index].finish();
    }
    guide_index--;
    showGuideStep(lang);
}

// Goes to the next step in the guide
function guideNext(lang) {
    if (typeof GUIDE_STEPS[guide_index].finish === "function") {
        GUIDE_STEPS[guide_index].finish();
    }
    guide_index++;
    showGuideStep(lang);
}