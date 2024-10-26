//=================//
//    Constants    //
//=================//

var CURRENT_ALT_INDEX = 0;
var CURRENT_SUMMARY_LANG = 0;

function getAltIndex() {
    return CURRENT_ALT_INDEX;
}

//========================//
//    Reset Parameters    //
//========================//

function resetModalParems() {
    CURRENT_ALT_INDEX = 0;
    CURRENT_SUMMARY_LANG = 0;
}

//=========================//
//    Set up Item Panel    //
//=========================//

function setUpItemPanel(entry, imgUrl) {
    return `
        <div class='close'></div>
        <div class='itemPanel'>
            <div class='itemArtWrap'>
                <img class='itemArt' src='${imgUrl}' alt='item' draggable='false'>
                ${entry.numOfAlt > 0 ? `<div class='itemArtList'>${Array(entry.numOfAlt + 1).fill('<span>◆</span>').join('')}</div>` : ''}
            </div>
            <div class='itemSummary'>
                <div class='langSwitch'>⇆</div>
                <div class='itemTitle'>
                    <div class='itemTitle1'>${entry.giftName}</div>
                    <div class='itemTitle2'>${entry.giftNameAlt}</div>
                </div>
                <div class='itemSummary_inner'>${entry.giftDescription}</div>
            </div>
        </div>`;
}

//=======================================//
//    Set up Item alt Art Click Event    //
//=======================================//

function setUpGiftAltArt(entry, callback) {
    // set alt art indicators
    handleAltArtIndicator();
    // make item art clickable when there are item alt art available
    if (entry["numOfAlt"] != undefined) {
        $(".itemArt").css("cursor", "pointer");
    }
    $(".itemArt").click(function () {
        if (entry["numOfAlt"] != undefined) {
            // call the passed in function (for playing sound)
            if (typeof callback === 'function') {
                callback();
            }
            // update alt art index
            CURRENT_ALT_INDEX = (CURRENT_ALT_INDEX < entry.numOfAlt) ? CURRENT_ALT_INDEX + 1 : 0;
            // update item art
            $(".itemArt")
                .fadeOut(130, function () {
                    $(".itemArt").attr('src', getGiftUrl(entry));
                    handleAltArtIndicator();
                })
                .fadeIn(130);
        }
    })
    function handleAltArtIndicator() {
        $(".itemArtList span:eq(" + CURRENT_ALT_INDEX + ")").css('color', 'white');
        $(".itemArtList span").not(':eq(' + CURRENT_ALT_INDEX + ')').css('color', "rgba(0, 0, 0, 0.4)");
    }
}

//==================================//
//    Handle Item traslate Event    //
//==================================//

function setUpItemTranslateToggle(entry, callback) {
    if (!entry.giftDescriptionAlt) {
        $(".langSwitch").hide();
        return;
    }
    $(".langSwitch").click(function () {
        CURRENT_SUMMARY_LANG = 1 - CURRENT_SUMMARY_LANG;
        const newSummary = CURRENT_SUMMARY_LANG ? entry.giftDescriptionAlt : entry.giftDescription;
        // call the passed in function (for playing sound)
        if (typeof callback === 'function') {
            callback();
        }        
        $(".itemSummary_inner").html(newSummary);
    });
}

