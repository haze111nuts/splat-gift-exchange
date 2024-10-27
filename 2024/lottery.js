//============================//
//    Functional Variables    //
//============================//

var FLIPPED_CARD = [];

var HOST_CURRENT_SIDE = 0;

var CURRENT_SUMMARY_LANG = 0;

var CURRENT_ALT_INDEX = 0;

var WAITING_SCREEN = false;

var AUDIO_ELEMENTS = {};

//========================//
//    Custom Variables    //
//========================//

const CONFIG = {
    ORDER: "order",
    RESULT: "result",
    RANDOM: "random"
}

var DISPLAY = "";

var NUMBER_OF_BG = 83;

var EMOTES = "WASDFX";

var HOST_CURRENT_LETTER = "W";

var HOST_QUOTES = [
    getQuoteOfRemainingGiftCountZH(GIFT_PILE.length),
    getQuoteOfRemainingGiftCountEN(GIFT_PILE.length),
    "卡片花色是<span>隨機</span>生成的，跟禮物沒有關係～",
    "The pattern on the card is <span>random</span>,<br>it has nothing to do with the gifts!",
    "輪到你家角色的時候，請給我一個號碼！",
    "Give me a number when its your OC's turn!"
]

//======================//
//    Getter & Utils    //
//======================//

function assetBaseUrl(fileName){
    return "../assets/lottery/" + fileName;
}

function getOcUrl(oc) {
    return "profile/" + ENTRIES.indexOf(oc) + ".png";
}

function getGiftUrl(gift) {
    if(CURRENT_ALT_INDEX > 0 ){
        return "gift/" + ENTRIES.indexOf(gift) +"-"+ CURRENT_ALT_INDEX + ".png";
    }
    return "gift/" + ENTRIES.indexOf(gift) + ".png";
}

function getHostEmoteUrl(char) {
    return assetBaseUrl("host/" + char + ".png");
}

function getQuoteOfRemainingGiftCountZH(count) {
    return "還有<span>" + count + "個禮物</span>還沒被打開～";
}

function getQuoteOfRemainingGiftCountEN(count) {
    if (count !== 1) 
        return "There are <span>" + count + " presents</span> left!";
    else
        return "There is <span>" + count + " present</span> left!";
}

function getCurrentOCPos() {
    var offset = $(".oc").width() / 2 * -1
    return offset + ((CURRENT_OC_INDEX) * -100);
}

//=======================//
//    HTML Generators    //
//=======================//

function printOCs() {
    let ocHtml = OC_ARRANGED.map(oc => `
        <div class='oc'>
            <img src='${getOcUrl(oc)}' alt='oc'>
        </div>
    `).join('');
    
    $(".turingBar").html(ocHtml);
    setSpotlightToNextOC();
}

function printGrid() {
    let gridHtml = ENTRIES.map((_, cardNumber) => `
    <div class='gridItem'>
        <div class='gridItem_inner'>
            <div class='gift_front no-select'>
                <div class='progress'></div>
                ${cardNumber + 1}
            </div>
            <div class='gift_back no-select'></div>
        </div>
    </div>
    `).join('');
    $(".grid").html(gridHtml);
}

function displayItemModal(entry) {

    $(".modal").removeClass("hide");
    let itemModalHtml = `
    <div class='itemPanel'>
        <div class='itemSummary'>
            <div class='langSwitch'>⇆</div>
            <div class='itemTitle'>
                <div class='itemTitle1'>${entry.giftName}</div>
                <div class='itemTitle2'>${entry.giftNameAlt}</div>
            </div>
            <div class='itemSummary_inner'>${entry.giftDescription}</div>
        </div>
        <div class='itemArtWrap'>
            <img class='itemArt' src='${getGiftUrl(entry)}' alt='item' draggable='false'>
            ${entry.numOfAlt > 0 ? `<div class='itemArtList'>${Array(entry.numOfAlt + 1).fill('<span>◆</span>').join('')}</div>` : ''}
        </div>
    </div>`;

    $(".modal_content").html(itemModalHtml);
    $(document.body).addClass("noscroll");
    setUpTraslateToggle(entry);
    setUpGiftAltArt(entry);
}

function setUpGiftAltArt(entry) {
    handleAltArtIndicator();
    $(".itemArt").click(function () {
        if(entry["numOfAlt"] != undefined){
            generatePageFlipAudio().play();
            CURRENT_ALT_INDEX = (CURRENT_ALT_INDEX < entry.numOfAlt )? CURRENT_ALT_INDEX+1 : 0;
            $(".itemArt")
                .fadeOut(130, function() {
                    $(".itemArt").attr('src', getGiftUrl(entry) );
                    handleAltArtIndicator();
                })
                .fadeIn(130);
        }
    })
}

function getGiftLogHtml(currentOC, entry) {
    var logHtml = "";
    logHtml += "<li>";
    logHtml += "<div class='label'>";
    logHtml += "<div>" + currentOC.ocName + "</div>"
    logHtml += "<div>" + entry.giftName + "</div>"
    logHtml += "</div>";
    logHtml += "<img class='chara no-select' src='" + getOcUrl(currentOC) + "' alt='chara' draggable='false'>";
    logHtml += "<img class='gift no-select' src='" + getGiftUrl(entry) + "' alt='gift' draggable='false'>";
    logHtml += "</li>";
    return logHtml;
}


// This is an extra modal for future use
// when ppl starts submitting detailed ref sheet for gift
function setUpRefImageModalClickEvents(entry) {
    $(".testLink").click(function () {
        var modalHtml = "";
        $(".modal2").removeClass("hide");

        modalHtml += "<div class='ref_wrap'>"
        modalHtml += "<img class='ref' src='" + "" + "'>"
        modalHtml += "</div>";
        $(".modal2_content").html(modalHtml);
    })

    //Events on modal close
    $(".modal2_bg").click(function () {
        $(".modal2").addClass("hide");
    })
}

//=================================//
//    Randomize and Set Card BG    //
//=================================//

function setGridBG() {
    var bgPattern;
    var bgPatternCookie = "";

    if (DISPLAY === CONFIG.RESULT || DISPLAY === CONFIG.ORDER) {
        bgPatternCookie = bgPatternData;
        setCookie(COOKIE.PATTERN, bgPatternData, COOKIE_EXPIRE_DEFAULT_DAYS);
    } else if (DISPLAY === CONFIG.RANDOM) {
        deleteCookies(COOKIE.PATTERN);
    } else {
        bgPatternCookie = getCookie(COOKIE.PATTERN);
    }

    if (bgPatternCookie === "") {
        bgPattern = [...Array(NUMBER_OF_BG).keys()];
        shuffleArray(bgPattern);
        setCookie(COOKIE.PATTERN, bgPattern.toString(), COOKIE_EXPIRE_DEFAULT_DAYS);
    }
    else {
        bgPattern = bgPatternCookie.split(",");
    }
    for (var i = 0; i < ENTRIES.length; i++) {
        $(".grid .gridItem:nth-of-type(" + (i + 1) + ") .gift_front").css("background-image", "url(" + assetBaseUrl("bg/" + bgPattern[i] + ".png)"));
    }
}

//=========================//
//    Handle Gift Pulls    //
//=========================//

function FindLargestFamilyNoSelfTrade(ocList) {
    var firstSelfTradeOC = ocList.find(oc => !ARTISTS[oc.artist].selfTrade);
    if(ocList.length === 0 || !firstSelfTradeOC)
        return undefined;

    var artistsOcCounts = {};
    var currentMax = firstSelfTradeOC.artist;
    var currentMaxCount = 1;
    for (const oc of ocList) {
        // exclude current oc artist, only count people that disable self trade
        if (oc.artist !== OC_ARRANGED[CURRENT_OC_INDEX].artist && !ARTISTS[oc.artist].selfTrade) {
            if (artistsOcCounts[oc.artist] === undefined) {
                artistsOcCounts[oc.artist] = 1;
            } else {
                artistsOcCounts[oc.artist]++;
            }
    
            if (artistsOcCounts[oc.artist] > currentMaxCount) {
                currentMax = oc.artist;
                currentMaxCount = artistsOcCounts[oc.artist];
            }
        }
    }
    return currentMax;
}

//=========================//
//    Handle Flip Click    //
//=========================//

function setUpFlipEvent() {
    var timeout;
    var gift;
    var currentGiftCard;

    $(".gridItem_inner").each(function () {
        var giftCard = $(this).find(".gift_front");
        
        //when long click stops
        giftCard.mouseup(function () {
            giftCard.find(".progress").removeClass("full_progress");
            clearTimeout(timeout);
            AUDIO_ELEMENTS["paperTear"].pause();
            AUDIO_ELEMENTS["paperTear"].currentTime = 0;
            return;
        })
        //when long click is pressed
        giftCard.mousedown(function () {
            AUDIO_ELEMENTS["paperTear"].play();
            giftCard.find(".progress").addClass("full_progress");
            //upon long click completed
            timeout = window.setTimeout(function () {
                //play sounds
                AUDIO_ELEMENTS["balloonPop"].play();
                AUDIO_ELEMENTS["itemObtain"].play();
                currentGiftCard = giftCard;
                giftCard.find(".progress").css("opacity", "0");

                //draw gift
                gift = drawGift();
                HOST_QUOTES[0] = getQuoteOfRemainingGiftCountZH(GIFT_PILE.length);
                HOST_QUOTES[1] = getQuoteOfRemainingGiftCountEN(GIFT_PILE.length);
                            
                giftCard.siblings().html("<img src='" + getGiftUrl(gift) + "' alt='gift' />");

                //display item
                displayItemModal(gift);

                //handle gift data
                FLIPPED_CARD.push(giftCard.parent().parent().index());
                setCookie(COOKIE.OBTAINED_GIFT, OBTAINED_GIFT_INDEX.toString(), COOKIE_EXPIRE_DEFAULT_DAYS);
                setCookie(COOKIE.CHOSEN_NUM, FLIPPED_CARD.toString(), COOKIE_EXPIRE_DEFAULT_DAYS);

                popConfetti();
            }, 1500);
            return;
        })
    })

    //Events on modal close
    $(".modal_bg").click(function () {
        $(".modal").addClass("hide");
        $(document.body).removeClass("noscroll");
        CURRENT_SUMMARY_LANG = 0;
        CURRENT_ALT_INDEX = 0;

        // only do the rest when this modal was a result of a lottery draw
        if (currentGiftCard) {
            // AUDIO_ELEMENTS["flipCard"].setAttribute('autoplay', 'autoplay');
            AUDIO_ELEMENTS["flipCard"].currentTime = 0.3;
            AUDIO_ELEMENTS["flipCard"].play();
            //flip card
            doCardFlip(currentGiftCard.parent(".gridItem_inner"))
            //add entry to gift log
            addEntryToGiftLog(gift);
            nextOC();
            setSpotlightToNextOC();
            fadeFinishedOCs();
            if (CURRENT_OC_INDEX == ENTRIES.length) {
                //trigger ending events for the last flip
                triggerEnding();
            }
            updateStats();
            currentGiftCard = undefined;
        }
    })
}

function addEntryToGiftLog(gift) {
    $(".logPanelContent ul").append(getGiftLogHtml(OC_ARRANGED[CURRENT_OC_INDEX], gift));
    $(".logPanelContent").animate({ scrollTop: $(".logPanelContent").prop("scrollHeight") }, 1000);
    setUpGiftLogStyle(CURRENT_OC_INDEX);
    $(".logPanelContent ul li:nth-child(" + (CURRENT_OC_INDEX + 1) + ") .gift").click(function () {
        displayItemModal(gift);
        AUDIO_ELEMENTS["flipPage"].play();
    });
}

function doCardFlip(element) {
    element.css("transform", "rotateY(180deg)");
    element.css("border", "rgba(92, 83, 73, 0.308) 1px solid");
    element.addClass("flipped");
}

function shuffleHostQuotes() {
    var count = 0;
    setInterval(function () {
        timeout = window.setTimeout(function () {
            $(".infoBubble").css("opacity", 1);
            $('.infoBubble_inner').html(HOST_QUOTES[count]);
            count += 1;
            if (count >= HOST_QUOTES.length) {
                count = 0;
            }
        }, 500);
        $(".infoBubble").css("opacity", 0);
    }, 4000);
}

//=============================//
//    Handle traslate Event    //
//=============================//

function setUpTraslateToggle(entry) {
    var newSummary;
    if(entry.giftDescriptionAlt.length==0){
        $(".langSwitch").css("display", "none");
    }
    $(".langSwitch").click(function () {
        if (CURRENT_SUMMARY_LANG === 0 && entry.giftDescriptionAlt.length>0) {
            newSummary = entry.giftDescriptionAlt;
            CURRENT_SUMMARY_LANG = 1
        } else {
            newSummary = entry.giftDescription;
            CURRENT_SUMMARY_LANG = 0;
        }
        AUDIO_ELEMENTS["flipPage"].play();
        $(".itemSummary_inner").html(newSummary);
    });
}

//====================//
//    Audio Events    //
//====================//

function createAudioElement(volume, src){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', src);
    audioElement.volume = volume;
    return audioElement;
}

function generateKidsCheerAudio(){
    return createAudioElement(0.25, assetBaseUrl('sound/kids_cheer.mp3') );
}

function generatePageFlipAudio(){
    return createAudioElement(0.25, assetBaseUrl('sound/flip_page.mp3') );
}

function setUpAudios() {
    AUDIO_ELEMENTS["balloonPop"] = createAudioElement(0.2, assetBaseUrl('sound/balloon_pop.mp3') );
    AUDIO_ELEMENTS["itemObtain"] = createAudioElement(0.2, assetBaseUrl('sound/item_obtain.mp3') );
    AUDIO_ELEMENTS["paperTear"] = createAudioElement(0.45, assetBaseUrl('sound/paper_tear.mp3') );
    AUDIO_ELEMENTS["flipCard"] = createAudioElement(0.2, assetBaseUrl('sound/flip_card.mp3') );
    AUDIO_ELEMENTS["flipPage"] = createAudioElement(0.3, assetBaseUrl('sound/flip_page.mp3') );
    AUDIO_ELEMENTS["bell"] = createAudioElement(0.6, assetBaseUrl('sound/bicycle_bell.mp3') );
    AUDIO_ELEMENTS["blop"] = createAudioElement(0.2, assetBaseUrl('sound/blop.mp3') );
    AUDIO_ELEMENTS["click"] = createAudioElement(0.2, assetBaseUrl('sound/click.mp3') );
    AUDIO_ELEMENTS["wow"] = createAudioElement(0.2, assetBaseUrl('sound/wow.mp3') );
}

//===================//
//    Host Events    //
//===================//

function setHostEmote(side, imgUrl) {
    var sideClass = (side === 0) ? "front" : "back";
    $(".host_inner ." + sideClass).html("<img src='" + imgUrl + "' alt='host' draggable='false'>");
}

function flipHost(imgUrl) {
    if (HOST_CURRENT_SIDE === 0) {
        setHostEmote(1, imgUrl);
        $(".host_inner").css("transform", "rotateY(180deg)");
        HOST_CURRENT_SIDE = 1;
    } else {
        setHostEmote(0, imgUrl);
        $(".host_inner").css("transform", "rotateY(0deg)");
        HOST_CURRENT_SIDE = 0;
    }
}

function handleKeyPress(keyPressed) {
    var letter = String.fromCharCode(keyPressed.keyCode).toUpperCase();
    // console.log("key pressed: "+ letter);
    if (EMOTES.includes(letter) && HOST_CURRENT_LETTER !== letter) {
        flipHost(getHostEmoteUrl(letter));
        HOST_CURRENT_LETTER = letter;
    }
    // for removing the waiting screen
    if(letter == "8"){
        if(WAITING_SCREEN){
            removeWaitingScreen();
            WAITING_SCREEN = false;
        }else{
            bringBackWaitingScreen();
            WAITING_SCREEN = true;
        }
    }
    //Kids Cheer
    if(letter == "Y" || letter == "P"){
        generateKidsCheerAudio().play();
        popConfetti();
    }
    //Wow
    if(letter == "O"){
        AUDIO_ELEMENTS["wow"].play();
        popConfetti();
    }
}

//====================//
//    Other Events    //
//====================//

function setSpotlightToNextOC() {
    $(".turingBar").css("transform", "translate(" + getCurrentOCPos() + "px, 0)");
    $(".currentName").html(OC_ARRANGED[CURRENT_OC_INDEX]?.ocName);
    $(".frame").click(function () {
        AUDIO_ELEMENTS["bell"].play();
    });

}

function setUpGiftLogStyle(index) {
    $(".logPanelContent ul li:nth-child(" + (index + 1) + ")").css("border", "1px solid black");
    $(".logPanelContent ul li:nth-child(" + (index + 1) + ")").css("opacity", "1");
}

function fadeFinishedOCs() {
    $(".oc:nth-child(" + CURRENT_OC_INDEX + ")").css("opacity", 0.20);
    $(".oc:nth-child(" + (CURRENT_OC_INDEX - 1) + ")").css("opacity", 0.10);
    $(".oc:nth-child(" + (CURRENT_OC_INDEX - 2) + ")").css("opacity", 0.05);
    $(".oc:nth-child(" + (CURRENT_OC_INDEX - 3) + ")").css("opacity", 0);
}

function updateStats() {
    $(".count").html(CURRENT_OC_INDEX);
    $(".remain").html(GIFT_PILE.length);
}

function triggerEnding() {
    $(".OCPanelContent").css("opacity", 0);
    $(".lotteryBoard_overlay").css("opacity", 1);
    $(".lotteryBoard_overlay").css("z-index", 83);
    $(".cross").css("width", "90%");
    $(".lotteryPanel").css("background-color", "rgb(203, 193, 177, 0.4)");
    $(".infoBubble").css("display", "none");
}

function extraStyle() {
    $('.oc img').attr('draggable', false);
}

function handleAltArtIndicator(){
    $(".itemArtList span:eq(" + CURRENT_ALT_INDEX + ")").css('color', 'white' );
    $(".itemArtList span").not(':eq(' + CURRENT_ALT_INDEX + ')').css('color', "rgba(82, 68, 61, 0.4)" );
}

function removeWaitingScreen(){
    $(".waiting").css("top", "-1800px");
    AUDIO_ELEMENTS["blop"].play();
    setTimeout(
        function() {
            $(".waiting").css("display", "none");
        }, 300);
}

function bringBackWaitingScreen(){
    $(".waiting").css("display", "block");    
    setTimeout(
        function() {
            $(".waiting").css("top", "0");
        }, 1);
}

function setUpCursor(){
	var cursor = $(".cursor");
	$(window).mousemove(function(e) {
		cursor.css({
			top: e.clientY,
			left: e.clientX
		});
	});
    $(".gift_front").mouseenter(function() {
        cursor.css(
            "background-image", "url(" + assetBaseUrl("cursor/pointer_gift.png") + ")"
        );
    }).mouseleave(function() {
        cursor.css(
            "background-image", "url(" + assetBaseUrl("cursor/pointer.png") + ")"
        );
    });
}

//======================//
//                      //
//    Handle Coockie    //
//                      //
//======================//

function loadCookie() {
    var ocArrangementCookie = "";
    var obtainedGIftCookie = "";
    var flippedCardCookie = "";

    if (DISPLAY === CONFIG.RESULT) {
        ocArrangementCookie = ocArrangementData;
        obtainedGIftCookie = obtainedGiftData;
        flippedCardCookie = flippedCardData;
        setCookie(COOKIE.OC_ARRANGEMENT, ocArrangementCookie, COOKIE_EXPIRE_DEFAULT_DAYS);
        setCookie(COOKIE.OBTAINED_GIFT, obtainedGiftData, COOKIE_EXPIRE_DEFAULT_DAYS);
        setCookie(COOKIE.CHOSEN_NUM, flippedCardData, COOKIE_EXPIRE_DEFAULT_DAYS);
    } else if (DISPLAY === CONFIG.ORDER) {
        ocArrangementCookie = ocArrangementData;
        deleteCookies(COOKIE.OBTAINED_GIFT);
        deleteCookies(COOKIE.CHOSEN_NUM);
        setCookie(COOKIE.OC_ARRANGEMENT, ocArrangementCookie, COOKIE_EXPIRE_DEFAULT_DAYS);
    } else if (DISPLAY === CONFIG.RANDOM) {
        deleteAllCookies();
    } else {
        ocArrangementCookie = getCookie(COOKIE.OC_ARRANGEMENT);
        obtainedGIftCookie = getCookie(COOKIE.OBTAINED_GIFT);
        flippedCardCookie = getCookie(COOKIE.CHOSEN_NUM);
    }

    var oc_arranged = [];

    if (ocArrangementCookie !== "") {
        oc_arranged = ocArrangementCookie.split(",").map(index => ENTRIES[index]);
    }

    if (obtainedGIftCookie !== "" && flippedCardCookie !== "") {
        var obtained_gift_index = obtainedGIftCookie.split(",");
        FLIPPED_CARD = flippedCardCookie.split(",");

        var obtainedGifts = obtained_gift_index.map(index => ENTRIES[index]);
        var gift_pile = ENTRIES.filter(gift => !obtainedGifts.includes(gift));
        initExchangeData(oc_arranged, gift_pile, obtained_gift_index);
        var arrangedIndexs = OC_ARRANGED.map(oc => ENTRIES.indexOf(oc));
        setCookie(COOKIE.OC_ARRANGEMENT, arrangedIndexs.toString(), COOKIE_EXPIRE_DEFAULT_DAYS);
        var index = 0;
        for (var gift of obtainedGifts) {
            $(".logPanelContent ul").append(getGiftLogHtml(OC_ARRANGED[index], gift));
            $(".logPanelContent ul").animate({ scrollTop: $(document).height() }, 1000);
            setUpGiftLogStyle(index);

            $(".gridItem:nth-child(" + (parseInt(FLIPPED_CARD[index]) + 1) + ") .gridItem_inner .gift_back").html("<img src='" + getGiftUrl(gift) + "' alt='gift' />");
            doCardFlip($(".gridItem:nth-child(" + (parseInt(FLIPPED_CARD[index]) + 1) + ") .gridItem_inner"));

            addLogClick(index, gift);
            index++;
        }
        CURRENT_OC_INDEX = index;
        GIFT_PILE = GIFT_PILE.filter(gift => !obtainedGifts.includes(gift));
        HOST_QUOTES[0] = getQuoteOfRemainingGiftCountZH(GIFT_PILE.length);
        HOST_QUOTES[1] = getQuoteOfRemainingGiftCountEN(GIFT_PILE.length);
        if (GIFT_PILE.length == 0) {
            triggerEnding();
        }
        printOCs();
        fadeFinishedOCs();
        if (CURRENT_OC_INDEX >= 4)
            $(".oc:nth-child(n+1):nth-child(-n+"+(CURRENT_OC_INDEX-4)+")").css("opacity", 0);
        return;
    }
    initExchangeData(oc_arranged);
    HOST_QUOTES[0] = getQuoteOfRemainingGiftCountZH(GIFT_PILE.length);
    HOST_QUOTES[1] = getQuoteOfRemainingGiftCountEN(GIFT_PILE.length);
    var arrangedIndexs = OC_ARRANGED.map(oc => ENTRIES.indexOf(oc));
    setCookie(COOKIE.OC_ARRANGEMENT, arrangedIndexs.toString(), COOKIE_EXPIRE_DEFAULT_DAYS);
    printOCs();
}

function addLogClick(index, gift) { // has to seperate this out due rules of closure capture in javascript
    $(".logPanelContent ul li:nth-child(" + (index + 1) + ") .gift").click(function () {
        displayItemModal(gift);
        AUDIO_ELEMENTS["flipPage"].play();
    });
}

function setParams() {
    const searchParams = new URLSearchParams(window.location.search);
    const result = searchParams.get("config");
    if (Object.values(CONFIG).includes(result)) {
        DISPLAY = result;
    }
}

//======================//
//                      //
//    Ready Function    //
//                      //
//======================//

$(document).ready(function () {
    setParams()
    setUpAudios();
    printGrid();
    setGridBG();
    loadCookie();
    setUpFlipEvent();
    updateStats();
    shuffleHostQuotes();
    setHostEmote(HOST_CURRENT_SIDE, getHostEmoteUrl(HOST_CURRENT_LETTER));
    extraStyle();
    printSnow();
    setUpCursor();
    printOCList();
});

$(document).keydown(function (keyPressed) {
    handleKeyPress(keyPressed);
});