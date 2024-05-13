
var ocs = [{},{},{},{},{},{}];

function getOcUrl(id) {
    return "assets/lottery/2024profile/" + id + ".jpg";
}

function printOCs() {
    var ocHtml = "";
    for (var i = 0; i < ocs.length; i++) {
        ocHtml += "<div>";
        ocHtml += "<img src='"+ getOcUrl(i) +"'>";
        ocHtml += "</div>";
    }
    $(".turingBar").html(ocHtml);
    console.log(ocHtml);
}

function setupStuff() {
    printOCs();
}

//======================//
//===                ===//
//=== Ready Function ===//
//===                ===//
//======================//

$(document).ready(function () {
    setupStuff();
});