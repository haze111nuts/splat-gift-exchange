
var OCS = [{},{},{},{},{},{},{},{}];

var GIFT_SLOTS = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];


var NUMBER_OF_BG = 75

function getOcUrl(id) {
    return "assets/lottery/2024profile/" + id + ".jpg";
}

function printOCs() {
    var ocHtml = "";
    for (var i = 0; i < OCS.length; i++) {
        ocHtml += "<div>";
        ocHtml += "<img src='"+ getOcUrl(i) +"'>";
        ocHtml += "</div>";
    }
    $(".turingBar").html(ocHtml);

    //transform: translate(-50px, 0);
    $(".turingBar").css("transform", "translate(-650px, 0)");
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

function randomBGIndex(){
    return Math.floor(Math.random() * NUMBER_OF_BG) +1
}

function setupStuff() {
    printOCs();
    printGrid();
    setGridBG();
}

//======================//
//===                ===//
//=== Ready Function ===//
//===                ===//
//======================//

$(document).ready(function () {
    setupStuff();
});