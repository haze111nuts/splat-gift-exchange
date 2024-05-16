
var OCS = [{},{},{},{},{},{},{},{}];

var GIFT_SLOTS = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];


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
        ocHtml += "<img src='"+ getOcUrl(i) +"'>";
        ocHtml += "</div>";
    }
    $(".turingBar").html(ocHtml);

    setSpotlightToOC();
}

function getCurrentOCPos() {
    return ORIGINAL_OC_POS + ((CURRENT_OC_INDEX) * -100);
}

function setSpotlightToOC(){
    console.log("moving to "+ CURRENT_OC_INDEX + "th OC");
    console.log("Pos is "+getCurrentOCPos())
    $(".turingBar").css("transform", "translate("+getCurrentOCPos()+"px, 0)");
}

function printGrid(){
    var gridHtml = "";
    for (var i = 0; i < GIFT_SLOTS.length; i++) {
        gridHtml += "<div class='gridItem'>";
        gridHtml += "<div class='gridItem_inner'>";

        gridHtml += "<div class='gift_front'>";
        gridHtml += i+1;
        gridHtml += "</div>";

        gridHtml += "<div class='gift_back'>";
        gridHtml += "";
        gridHtml += "</div>";

        gridHtml += "</div>";
        gridHtml += "</div>";
    }
    $(".grid").html(gridHtml);
}

function setGridBG(){
    for (var i = 0; i < GIFT_SLOTS.length; i++) {
        $(".grid .gridItem:nth-of-type("+ (i+1) +") .gift_front").css("background-image","url(assets/lottery/bg/"+ randomBGIndex() +".png)");
    }
}

function setUpFlipEvent(){
    $(".gridItem_inner").each(function () {
        $(this).find(".gift_front").click(function () {
            $(this).parent(".gridItem_inner").css("transform","rotateY(180deg)");
            $(this).parent(".gridItem_inner").css("border","rgba(92, 83, 73, 0.308) 1px solid");
            CURRENT_OC_INDEX++;
            setSpotlightToOC();
            // $(".oc:nth-child("+CURRENT_OC_INDEX+")").css("filter","grayscale(1)");
            $(".oc:nth-child("+CURRENT_OC_INDEX+")").css("opacity",0.3);
            $(".oc:nth-child("+(CURRENT_OC_INDEX-2)+")").css("opacity",0.2);
            $(".oc:nth-child("+(CURRENT_OC_INDEX-4)+")").css("opacity",0);
        })
    })
}

// function setUpOCStyle(){
//     $(".oc").each(function () {
//         $(this).css("filter","grayscale(1)");
//     })
// }

function randomBGIndex(){
    return Math.floor(Math.random() * NUMBER_OF_BG) +1
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