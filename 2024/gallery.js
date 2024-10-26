//========================//
//    Custom Variables    //
//========================//

var YEAR = "0000";

//============================//
//    Functional Variables    //
//============================//

var displayGroup = "sender";

var CURRENT_SUMMARY_LANG = 0;

var CURRENT_ALT_INDEX = 0;

//===================//
//    URL Getters    //
//===================//

function assetBaseUrl(fileName){
    return "../assets/gallery/" + fileName;
}

function getArtUrl(group,id) {
    return "/art_" + group + "/" + id + ".jpg";
}

function getGiftUrl(gift) {
    if(CURRENT_ALT_INDEX > 0 ){
        return "gift/" + ENTRIES.indexOf(gift)  +"-"+ CURRENT_ALT_INDEX + ".png";
    }
    return "gift/" + ENTRIES.indexOf(gift)  + ".png";
}

//=============================//
//    Handle Exchange Click    //
//=============================//

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
            $(".exchangeIcon img").attr('src', assetBaseUrl("changeIcon_open.png") );
            
        } else {
            //set to sender
            $(".cardInner").css("transform", "rotateY(0deg)");
            displayGroup = "sender";
            $("body").addClass("day");
            $("body").removeClass("night");

            $(".exchangeIcon").css("left", "-80px");
            $(".exchangeBar_active").css("width", "0px");
            $(".exchangeIcon img").attr('src', assetBaseUrl("changeIcon.png"));
        }
    });
}

//======================//
//    Settingup Grid    //
//======================//

function generateGrid() {
    let gridHtml = ENTRIES.map((entry, i) => `
    <li class="grid-item">
        <div class="card">
            <div class="cardBG"></div>
            <div class="cardInner">
                ${['cardFront', 'cardBack'].map(side => `
                    <div class="${side}" data-id="${i}">
                        <div class="preview"><div class="previewInner"></div></div>
                    </div>`).join('')}
            </div>
        </div>
        <div class="label" data-id="${i}">
            <div class="label_BG"></div>
            <div class="giftTitle">${entry.giftName}</div>
            <div class="giftAltTitle">${entry.giftNameAlt}</div>
            <div class="gift"><img src="${getGiftUrl(entry)}"></div>
        </div>
    </li>`).join('');
    $(".grid").html(gridHtml);
    setUpGridStyle();
}

function setUpGridStyle() {
    for (var i = 0; i < ENTRIES.length; i++) {
        //set image for each grid item
        $(".grid-item:nth-child(" + (i + 1) + ") .cardFront .previewInner")
            .css("background-image", "url(" + getArtUrl(i, "sender") + ")");
        $(".grid-item:nth-child(" + (i + 1) + ") .cardBack .previewInner")
            .css("background-image", "url(" + getArtUrl(i, "getter") + ")");
        // delay style for each grid tem
        $(".grid-item:nth-child(" + (i + 1) + ") .cardInner")
        .css("transition-delay", i * 0.03 + "s");
    }
}

//============================//
//    Settingup Item Modal    //
//============================//

function setUpItemModalClickEvents(){
    $(".label").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            let item = ENTRIES[dataID];
            $(".modal_content").html(
                setUpItemPanel(item, getGiftUrl(item))
            );

            $(".modal").removeClass("hide");
            hideScrollBar();
            setUpGiftAltArt(item, null);
            setupCloseModalEvents();
        })
    })
}

//===========================//
//    Settingup Art Modal    //
//===========================//

function setUpArtModalClickEvents() {
    $(".cardFront").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            $(".modal").removeClass("hide");
            let modalHtml = `
            <div class='art_wrap'>
                <img class='art' src='${getArtUrl(dataID, "sender")}' alt='art'>
                <div class='author'>
                    By <a href='${ENTRIES[dataID].artist}' target='_blank'>${ENTRIES[dataID].artist}</a>
                </div>
            </div>`;
            $(".modal_content").html(modalHtml);
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

//===================================//
//    Settingup Modal Close Event    //
//===================================//

function setupCloseModalEvents(){
    $(".modal_bg, .close").click(function () {
        $(".modal").addClass("hide");
        //$(document.body).removeClass("noscroll");
        resetScrollBar();
        $(".itemArt").css("cursor","auto");
        CURRENT_SUMMARY_LANG = 0;
        CURRENT_ALT_INDEX = 0;
    })
}

//=============================//
//    Handle traslate Event    //
//=============================//

// function setUpTraslateToggle(entry) {
//     var newSummary;
//     if(entry.giftDescriptionAlt.length==0){
//         $(".langSwitch").css("display", "none");
//     }
//     $(".langSwitch").click(function () {
//         if (CURRENT_SUMMARY_LANG === 0 && entry.giftDescriptionAlt.length>0) {
//             newSummary = entry.giftDescriptionAlt;
//             CURRENT_SUMMARY_LANG = 1
//         } else {
//             newSummary = entry.giftDescription;
//             CURRENT_SUMMARY_LANG = 0;
//         }
//         $(".itemSummary_inner").html(newSummary);
//     });
// }

//==================//
//    Other Stuff   //
//==================//

function hideScrollBar(){
    //prevent body content to shift right when scrollbar is gone
    $('body').width($('body').width());
    $('body').css('overflow', 'hidden');
    // $('.modal').css('display', 'block');
    
}

function resetScrollBar(){
    //fix slight position bump caused by scroll bar
    setTimeout(
    function() {
        $('body').removeAttr('style')
    }, 250);
}

function setupStuff() {
    generateGrid();
    setUpFlipToggle();
    setUpArtModalClickEvents();
    setUpItemModalClickEvents();
}

//======================//
//                      //
//    Ready Function    //
//                      //
//======================//

$(document).ready(function () {
    $("body").addClass("day");
    $(".flipButtonBG").css("width", "50%");
    $(".flipButtonBG2").css("width", "0");
    setupStuff();
    printSnow();
});