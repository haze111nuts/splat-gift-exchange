
//========================//
//=== Custom Variables ===//
//========================//

var YEAR = "0000";


function getArtUrl(id, group) {
    return "assets/" + YEAR + "/art_" + group + "/" + id + ".jpg";
}

function getGiftUrl(id) {
    return "assets/" + YEAR + "/item/" + id + ".png";
}

function generateGrid() {
    var gridHtml = "";
    for (var i = 0; i < ENTRIES.length; i++) {
        gridHtml += '<li class="grid-item">';

        gridHtml += '<div class="card">';
        gridHtml += '<div class="cardBG"></div>';
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
        gridHtml += '<div class="giftTitle">' + ENTRIES[i].giftName + '</div>';
        gridHtml += '<div class="giftAltTitle">' + ENTRIES[i].giftNameAlt + '</div>';
        gridHtml += '<div class="gift"><img src="' + getGiftUrl(i) + '"></div>';
        gridHtml += '</div>';
        gridHtml += '</li>';
    }
    $(".grid").html(gridHtml);

    for (var i = 0; i < ENTRIES.length; i++) {
        $(".grid-item:nth-child(" + (i + 1) + ") .cardFront .previewInner")
            .css("background-image", "url(" + getArtUrl(i, "sender") + ")");
        $(".grid-item:nth-child(" + (i + 1) + ") .cardBack .previewInner")
            .css("background-image", "url(" + getArtUrl(i, "getter") + ")");
        $(".grid-item:nth-child(" + (i + 1) + ") .cardInner")
        .css("transition-delay", i * 0.03 + "s");
        $(".grid-item:nth-child(" + (i + 1) + ") .cardBG")
        .css("transition-delay", i * 0.03 + "s");
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
            $(".cardBG").css("transform", "scale(1.05) rotate(-93deg)");
            $(".cardBG").css("background-color", "#94cbdb");
            
        } else {
            //set to sender
            $(".cardInner").css("transform", "rotateY(0deg)");
            displayGroup = "sender";
            $("body").addClass("day");
            $("body").removeClass("night");
            $(".flipButtonBG").css("width", "50%");
            $(".flipButtonBG2").css("width", "0");
            $(".cardBG").css("transform", "scale(1.05) rotate(3deg)");
            $(".cardBG").css("background-color", "#b37c3f");
            
        }
    });
}


function setUpItemModalClickEvents(){
    $(".label").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            $(".modal").removeClass("hide");
            var itemModalHtml = "";

            itemModalHtml += "<div class='itemPanel'>"
            itemModalHtml += "<div class='itemSummary'>"
            itemModalHtml += "<div class='itemSummary_inner'>" + ENTRIES[dataID].giftDescription + "</div>"
            itemModalHtml += "</div>"
            itemModalHtml += "<img class='itemArt' src='" + getGiftUrl(dataID) + "' alt='item' draggable='false' >"
            itemModalHtml += "</div>"

            $(".modal_content").html(itemModalHtml);
            $(document.body).addClass("noscroll");
        })
    })
}

function setupModalClickEvents() {
    $(".cardFront").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            $(".modal").removeClass("hide");
            $(".modal_content").html("<img class='art' src='" + getArtUrl(dataID, "sender") + "'>");
            $(document.body).addClass("noscroll");
        })
    })
    $(".cardBack").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            $(".modal").removeClass("hide");
            $(".modal_content").html("<img class='art' src='" + getArtUrl(dataID, "getter") + "'>");
            $(document.body).addClass("noscroll");
        })
    })
    $(".modal_bg").click(function () {
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