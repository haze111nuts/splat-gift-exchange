
var OCS = [
    {name:"成步堂龍一"}, {name:"王泥喜法介"}, {name:"希月心音"}, 
    {name:"御劍伶侍"}, {name:"綾里真宵"}, {name:"成步堂美貫"}, 
    {name:"寶月茜"}, {name:"綾里春美"}];

var GIFT_SLOTS = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];


var NUMBER_OF_BG = 75;

var ORIGINAL_OC_POS = -50;

var CURRENT_OC_INDEX = 0;

function getOcUrl(id) {
    return "assets/lottery/2024profile/" + id + ".jpg";
}

function printOCs() {
    var ocHtml = "";
    for (var i = 0; i < OCS.length; i++) {
        ocHtml += "<div class='oc'>";
        ocHtml += "<img src='" + getOcUrl(i) + "'>";
        ocHtml += "</div>";
    }
    $(".turingBar").html(ocHtml);

    setSpotlightToOC();
    //animateArrow();
    animateFrame();
}

function animateArrow() {
    const $arrow = document.querySelector('.arrow');
    $arrow.animate([
        { left: '10px' },
        { left: '0' },
        { left: '10px' }
    ], {
        duration: 500,
        iterations: Infinity
    });
}

function animateFrame() {
    const $arrow = document.querySelector('.frame');
    $arrow.animate([
        { transform: 'translate(-50%, 0) scale(1)' },
        { transform: 'translate(-50%, 0) scale(1.2)' },
        { transform: 'translate(-50%, 0) scale(1)' }
    ], {
        duration: 500,
        iterations: Infinity
    });
}

function getCurrentOCPos() {
    return ORIGINAL_OC_POS + ((CURRENT_OC_INDEX) * -100);
}

function setSpotlightToOC() {
    console.log("moving to " + CURRENT_OC_INDEX + "th OC");
    console.log("Pos is " + getCurrentOCPos())
    $(".turingBar").css("transform", "translate(" + getCurrentOCPos() + "px, 0)");
    $(".currentName").html(OCS[CURRENT_OC_INDEX].name);
}

function printGrid() {
    var gridHtml = "";
    for (var i = 0; i < GIFT_SLOTS.length; i++) {
        gridHtml += "<div class='gridItem'>";
        gridHtml += "<div class='gridItem_inner'>";

        gridHtml += "<div class='gift_front'>";
        gridHtml += i + 1;
        gridHtml += "</div>";

        gridHtml += "<div class='gift_back'>";
        gridHtml += "";
        gridHtml += "</div>";

        gridHtml += "</div>";
        gridHtml += "</div>";
    }
    $(".grid").html(gridHtml);
}

function setGridBG() {
    for (var i = 0; i < GIFT_SLOTS.length; i++) {
        $(".grid .gridItem:nth-of-type(" + (i + 1) + ") .gift_front").css("background-image", "url(assets/lottery/bg/" + randomBGIndex() + ".png)");
    }
}

function setUpFlipEvent() {
    $(".gridItem_inner").each(function () {
        $(this).find(".gift_front").click(function () {
            $(this).parent(".gridItem_inner").css("transform", "rotateY(180deg)");
            $(this).parent(".gridItem_inner").css("border", "rgba(92, 83, 73, 0.308) 1px solid");
            CURRENT_OC_INDEX++;
            setSpotlightToOC();
            // $(".oc:nth-child("+CURRENT_OC_INDEX+")").css("filter","grayscale(1)");
            setUpOCStyle();
        })
    })
}

function setUpOCStyle() {
    $(".oc:nth-child(" + (CURRENT_OC_INDEX + 1) + ")").css("opacity", 1);
    $(".oc:nth-child(" + CURRENT_OC_INDEX + ")").css("opacity", 0.20);
    $(".oc:nth-child(" + (CURRENT_OC_INDEX - 1) + ")").css("opacity", 0.10);
    $(".oc:nth-child(" + (CURRENT_OC_INDEX - 2) + ")").css("opacity", 0.05);
    $(".oc:nth-child(" + (CURRENT_OC_INDEX - 3) + ")").css("opacity", 0);
}

function randomBGIndex() {
    return Math.floor(Math.random() * NUMBER_OF_BG) + 1
}

function setupStuff() {
    printOCs();
    printGrid();
    setGridBG();
    setUpFlipEvent();
}

//======================//
//===                ===//
//=== Ready Function ===//
//===                ===//
//======================//

$(document).ready(function () {
    setupStuff();
});