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
                <div class='langSwitch'>
                    <svg class='tranlateIcon' fill="#000000" width="800px" height="800px" viewBox="0 0 52 52">
                        <path d="M39,18.67H35.42l-4.2,11.12A29,29,0,0,1,20.6,24.91a28.76,28.76,0,0,0,7.11-14.49h5.21a2,2,0,0,0,0-4H19.67V2a2,2,0,1,0-4,0V6.42H2.41a2,2,0,0,0,0,4H7.63a28.73,28.73,0,0,0,7.1,14.49A29.51,29.51,0,0,1,3.27,30a2,2,0,0,0,.43,4,1.61,1.61,0,0,0,.44-.05,32.56,32.56,0,0,0,13.53-6.25,32,32,0,0,0,12.13,5.9L22.83,52H28l2.7-7.76H43.64L46.37,52h5.22Zm-15.3-8.25a23.76,23.76,0,0,1-6,11.86,23.71,23.71,0,0,1-6-11.86Zm8.68,29.15,4.83-13.83L42,39.57Z"/>
                    </svg>
                </div>
                <div class='publishButton'>
                    <svg class='discordIcon' fill="#000000" width="800px" height="800px" viewBox="0 0 23 23">
                        <path xmlns="http://www.w3.org/2000/svg" d="M18.942 5.556a16.299 16.299 0 0 0-4.126-1.297c-.178.321-.385.754-.529 1.097a15.175 15.175 0 0 0-4.573 0 11.583 11.583 0 0 0-.535-1.097 16.274 16.274 0 0 0-4.129 1.3c-2.611 3.946-3.319 7.794-2.965 11.587a16.494 16.494 0 0 0 5.061 2.593 12.65 12.65 0 0 0 1.084-1.785 10.689 10.689 0 0 1-1.707-.831c.143-.106.283-.217.418-.331 3.291 1.539 6.866 1.539 10.118 0 .137.114.277.225.418.331-.541.326-1.114.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595c.415-4.396-.709-8.209-2.973-11.589zM8.678 14.813c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c.001 1.123-.793 2.045-1.798 2.045zm6.644 0c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c0 1.123-.793 2.045-1.798 2.045z"/>
                    </svg>
                </div>                
                <div class='itemTitle'>
                    <div class='itemTitle1'>${entry.giftName}</div>
                    <div class='itemTitle2'>${entry.giftNameAlt}</div>
                </div>
                <div class='itemSummary_inner'>${simpleMarkdownToHTML(entry.giftDescription)}</div>
                <div class='moreText'></div>
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
        const newSummary = simpleMarkdownToHTML(CURRENT_SUMMARY_LANG ? entry.giftDescriptionAlt : entry.giftDescription);
        // call the passed in function (for playing sound)
        if (typeof callback === 'function') {
            callback();
        }
        $(".itemSummary_inner").html(newSummary);
        checkIfSummaryNeedsScrollBar();
    });
}

