
//========================//
//=== Custom Variables ===//
//========================//

var YEAR = "0000";

var CURRENT_SUMMARY_LANG = 0;

var CURRENT_ALT_INDEX = 0;

//============================//
//=== Functional Variables ===//
//============================//

var displayGroup = "sender";

//===================//
//=== URL Getters ===//
//===================//

function getArtUrl(id, group) {
    return "assets/" + YEAR + "/art_" + group + "/" + id + ".jpg";
}

function getGiftUrl(id) {
    if(CURRENT_ALT_INDEX > 0 ){
        return "assets/" + YEAR + "/item/" + id +"-"+ CURRENT_ALT_INDEX + ".png";
    }
    return "assets/" + YEAR + "/item/" + id + ".png";
}

//=======================//
//=== HTML Generators ===//
//=======================//

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
        gridHtml += "<div class='label_BG'></div>";
        gridHtml += '<div class="giftTitle">' + ENTRIES[i].giftName + '</div>';
        gridHtml += '<div class="giftAltTitle">' + ENTRIES[i].giftNameAlt + '</div>';
        gridHtml += '<div class="gift"><img src="' + getGiftUrl(i) + '"></div>';
        gridHtml += '</div>';
        gridHtml += '</li>';
    }
    $(".grid").html(gridHtml);
    setUpGridStyle();
}

function setUpGridStyle(){
    for (var i = 0; i < ENTRIES.length; i++) {
        //set image for each grid item
        $(".grid-item:nth-child(" + (i + 1) + ") .cardFront .previewInner")
            .css("background-image", "url(" + getArtUrl(i, "sender") + ")");
        $(".grid-item:nth-child(" + (i + 1) + ") .cardBack .previewInner")
            .css("background-image", "url(" + getArtUrl(i, "getter") + ")");
        // delay style for each grid tem
        $(".grid-item:nth-child(" + (i + 1) + ") .cardInner")
        .css("transition-delay", i * 0.03 + "s");

        // $(".grid-item:nth-child(" + (i + 1) + ") .cardBG")
        // .css("background-color",ART_COLOR[i]);
    }
}

function setUpFlipToggle() {
    $(".exchangeButton").click(function () {
        if (displayGroup === "sender") {
            //set to getter
            $(".cardInner").css("transform", "rotateY(180deg)");
            displayGroup = "getter";
            $("body").addClass("night");
            $("body").removeClass("day");

            $(".exchangeIcon").css("left", "200px");
            $(".exchangeBar_active").css("width", "284px");
            $(".exchangeIcon img").attr('src', "assets/changeIcon_open.png" );

            // $(".grid-item").css("background-color", "#fff");
            // $(".cardBG").css("transform", "scale(1.05) rotate(-93deg)");
            // $(".cardBG").css("background-color", "#94cbdb");
            
        } else {
            //set to sender
            $(".cardInner").css("transform", "rotateY(0deg)");
            displayGroup = "sender";
            $("body").addClass("day");
            $("body").removeClass("night");

            $(".exchangeIcon").css("left", "-80px");
            $(".exchangeBar_active").css("width", "0px");
            $(".exchangeIcon img").attr('src', "assets/changeIcon.png" );

            // $(".grid-item").css("background-color", "#b38242");
            // $(".cardBG").css("transform", "scale(1.05) rotate(3deg)");
            // $(".cardBG").css("background-color", "#b37c3f");
            
        }
    });
}


function setUpItemModalClickEvents(){
    $(".label").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            $(".modal").removeClass("hide");
            var itemModalHtml = "";

            itemModalHtml += "<div class='itemPanel'>";
            itemModalHtml += "<div class='itemArtWrap'>";
            itemModalHtml += "<img class='itemArt' src='" + getGiftUrl(dataID) + "' alt='item' draggable='false' >";
            if(ENTRIES[dataID].numOfAlt>0){
                itemModalHtml += "<div class='itemArtList'>";
                for (let i = 0; i < ENTRIES[dataID].numOfAlt+1 ; i++) {
                    itemModalHtml += "<span>◆</span>";
                }
                itemModalHtml += "</div>";
            }
            itemModalHtml += "</div>";
            itemModalHtml += "<div class='itemSummary'>";
            itemModalHtml += "<div class='itemTitle'>";
            itemModalHtml += "<div class='itemTitle1'>"+ENTRIES[dataID].giftName+"</div>";
            itemModalHtml += "<div class='itemTitle2'>"+ENTRIES[dataID].giftNameAlt+"</div>";
            itemModalHtml += "</div>";
            itemModalHtml += "<div class='itemSummary_inner'>" + ENTRIES[dataID].giftDescription + "</div>"
            itemModalHtml += "</div>";
            itemModalHtml += "</div>";

            $(".modal_content").html(itemModalHtml);
            // $(document.body).addClass("noscroll");

            hideScrollBar();
            setUpGiftAltArt(ENTRIES[dataID],dataID);
            setupCloseModalEvents();
        })
    })
}

function setUpGiftAltArt(entry,id) {
    handleAltArtIndicator();
    $(".itemArt").click(function () {
        if(entry["numOfAlt"] != undefined){
            CURRENT_ALT_INDEX = (CURRENT_ALT_INDEX < entry.numOfAlt )? CURRENT_ALT_INDEX+1 : 0;
            $(".itemArt")
                .fadeOut(130, function() {
                    $(".itemArt").attr('src', getGiftUrl(id) );
                    handleAltArtIndicator();
                })
                .fadeIn(130);
        }
    })
}

function handleAltArtIndicator(){
    $(".itemArtList span:eq(" + CURRENT_ALT_INDEX + ")").css('color', 'white' );
    $(".itemArtList span").not(':eq(' + CURRENT_ALT_INDEX + ')').css('color', "rgba(82, 68, 61, 0.4)" );
}


function setUpArtModalClickEvents() {
    $(".cardFront").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            var modalHtml = "";
            $(".modal").removeClass("hide");

            modalHtml += "<div class='art_wrap'>"
            modalHtml += "<img class='art' src='" + getArtUrl(dataID, "sender") + "'>"
            modalHtml += "<div class='author'>";
            modalHtml += ENTRIES[dataID].ocName+"<br>By <a aref='"+ ENTRIES[dataID].artist+" target='_blank'>"+ ENTRIES[dataID].artist +"</a>"
            modalHtml += "</div>";
            modalHtml += "</div>";
            $(".modal_content").html(modalHtml);
            // $(document.body).addClass("noscroll");
            hideScrollBar();
        })
    })
    $(".cardBack").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            $(".modal").removeClass("hide");
            $(".modal_content").html("<img class='art' src='" + getArtUrl(dataID, "getter") + "'>");
            // $(document.body).addClass("noscroll");
            hideScrollBar();
        })
    })
    setupCloseModalEvents();
}

function setupCloseModalEvents(){
    $(".modal_bg").click(function () {
        $(".modal").addClass("hide");
        //$(document.body).removeClass("noscroll");
        resetScrollBar();
        CURRENT_SUMMARY_LANG = 0;
        CURRENT_ALT_INDEX = 0;
    })
}

function setupStuff() {
    generateGrid();
    setUpFlipToggle();
    setUpArtModalClickEvents();
    setUpItemModalClickEvents();
}

function hideScrollBar(){
    $('body').width($('body').width());
    $('body').css('overflow', 'hidden');
    $('.modal').css('display', 'block');
    $('.decor_R').css('right','10px');
}
function resetScrollBar(){
    $('body, .modal').removeAttr('style')
    $('.decor_R').css('right','0px');
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