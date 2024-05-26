
//========================//
//=== Custom Variables ===//
//========================//

var YEAR = "0000";


function getArtUrl(id, group) {
    return "assets/" + YEAR + "/art_" + group + "/" + id + ".jpg";
}

function getGiftUrl(oc) {
    return "assets/" + YEAR + "/item/" + oc.giftIcon;
}

function generateGrid() {
    var gridHtml = "";
    for (var i = 0; i < OCS.length; i++) {
        gridHtml += '<li class="grid-item">';

        gridHtml += '<div class="card">';
        gridHtml += '<div class="cardInner">';

        gridHtml += '<div class="cardFront" data-id="' + i + '">';
        gridHtml += '<div class="preview">';
        gridHtml += '<div class="previewInner"></div>';
        gridHtml += '</div>'
        gridHtml += '</div>'

        gridHtml += '<div class="cardBack" data-id="' + i + '">';
        gridHtml += '<div class="preview">';
        gridHtml += '<div class="previewInner"></div>';
        gridHtml += '</div>'
        gridHtml += '</div>'

        gridHtml += '</div>'
        gridHtml += '</div>'

        gridHtml += '<div class="label" data-id="'+i+'">';
        gridHtml += '<div class="giftTitle">' + OCS[i].giftName + '</div>';
        gridHtml += '<div class="giftAltTitle">' + OCS[i].giftAltName + '</div>';
        gridHtml += '</div>';
        gridHtml += '<div class="gift"><img src="' + getGiftUrl(OCS[i]) + '"></div>';
        gridHtml += '</li>';
    }
    $(".grid").html(gridHtml);

    for (var i = 0; i < OCS.length; i++) {
        $(".grid-item:nth-child(" + (i + 1) + ") .cardFront .previewInner")
            .css("background-image", "url(" + getArtUrl(i, "sender") + ")");
        $(".grid-item:nth-child(" + (i + 1) + ") .cardBack .previewInner")
            .css("background-image", "url(" + getArtUrl(i, "getter") + ")");
        $(".grid-item:nth-child(" + (i + 1) + ") .cardInner")
            .css("transition-delay", i * 0.08 + "s");
    }
}

var displayGroup = "sender";
function setupFlipToggle() {
    $(".flipButton").click(function () {
        if (displayGroup === "sender") {
            //set to getter
            $(".cardInner").css("transform", "rotateY(180deg)");
            displayGroup = "getter";
            $("body").addClass("night");
            $("body").removeClass("day");
            $(".flipButtonBG2").css("width", "50%");
            $(".flipButtonBG").css("width", "0");
        } else {
            //set to sender
            $(".cardInner").css("transform", "rotateY(0deg)");
            displayGroup = "sender";
            $("body").addClass("day");
            $("body").removeClass("night");
            $(".flipButtonBG").css("width", "50%");
            $(".flipButtonBG2").css("width", "0");
        }
    });
}


function setUpItemModalClickEvents(){
    $(".label").each(function () {
        $(this).click(function () {
            // var dataID = $(this).data().id;
            // $(".modal").removeClass("hide");
            // var itemModalHtml = "";

            // itemModalHtml += "<div class='itemPanel'>"
            // itemModalHtml += "<div class='itemSummary'> askajdlkajalkjdalksdjlk </div>"
            // itemModalHtml += "<img class='itemArt' src='" + getGiftUrl(OCS[dataID]) + "'>"
            // itemModalHtml += "</div>"

            // $(".modal").html(itemModalHtml);
            // $(document.body).addClass("noscroll");
        })
    })
}

function setupModalClickEvents() {
    $(".cardFront").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            $(".modal").removeClass("hide");
            $(".modal").html("<img class='art' src='" + getArtUrl(dataID, "sender") + "'>");
            $(document.body).addClass("noscroll");
        })
    })
    $(".cardBack").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            $(".modal").removeClass("hide");
            $(".modal").html("<img class='art' src='" + getArtUrl(dataID, "getter") + "'>");
            $(document.body).addClass("noscroll");
        })
    })
    $(".modal").click(function () {
        $(".modal").addClass("hide");
        $(document.body).removeClass("noscroll");
    })
}

function setupStuff() {
    generateGrid();
    setupFlipToggle();
    setupModalClickEvents();
    setUpItemModalClickEvents();
}

//======================//
//===                ===//
//=== Ready Function ===//
//===                ===//
//======================//

$(document).ready(function () {
    $("body").addClass("day");
    $(".flipButtonBG").css("width", "50%");
    $(".flipButtonBG2").css("width", "0");
    setupStuff();
    printSnow();
});