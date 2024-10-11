//============================//
//    Functional Variables    //
//============================//

var OBTAINED_GIFT_INDEX = [];

var FLIPPED_CARD = [];

var OC_ARRANGED;

var GIFT_PILE = [].concat(ENTRIES);

var CURRENT_OC_INDEX = 0;

var HOST_CURRENT_SIDE = 0;

var CURRENT_SUMMARY_LANG = 0;

var CURRENT_ALT_INDEX = 0;

var WAITING_SCREEN = false;

var AUDIO_ELEMENTS = {};

//========================//
//    Custom Variables    //
//========================//

var YEAR = "2024";

var dataMasking = true;

var NUMBER_OF_BG = 83;

var EMOTES = "WASDFX";

var HOST_CURRENT_LETTER = "W";

var HOST_QUOTES = [
    getQuoteOfRemainingGiftCountZH(GIFT_PILE.length),
    getQuoteOfRemainingGiftCountEN(GIFT_PILE.length),
    "卡片花色是<span>隨機</span>生成的，跟禮物沒有關係～",
    "The pattern on the card is <span>random</span>,<br>it has nothing to do with the gifts!",
    "屋趴～～～",
    "Woop woop!"
]

var placeholderGift = {
    ocName: "綾里春美",
    giftName: "倉院特產饅頭",
    giftNameAlt: "Kurain Buns",
    giftDescription: "倉院之里的特產栗子饅頭。每個饅頭都是勾玉形狀﹐有經過某位靈媒的祈禱加持﹐據說吃下去可以補充靈力。",
    giftDescriptionAlt: "Some chestnut manju. Each bun is in the shape of a magatama and is blessed by a certain spirital medium. It is said that eating it will replenish your spiritual energy.",
    numOfAlt: 2,
    artist: "2"
}

//======================//
//    Getter & Utils    //
//======================//

function fileFormat() {
    return YEAR === "0000" ? ".jpg" : ".png";
}

function getOcUrl(oc) {
    return "assets/" + YEAR + "/profile/" + ENTRIES.indexOf(oc) + fileFormat();
}

function getGiftUrl(gift) {

    //======= for placeholder gift =======
    if (YEAR != '0000' && dataMasking) { 
        if(CURRENT_ALT_INDEX > 0 ){
            return "assets/placeholder-"+ CURRENT_ALT_INDEX + ".png";
        }
        return "assets/placeholder.png";
    }
    //====================================

    if(CURRENT_ALT_INDEX > 0 ){
        return "assets/" + YEAR + "/item/" + ENTRIES.indexOf(gift) +"-"+ CURRENT_ALT_INDEX + ".png";
    }
    return "assets/" + YEAR + "/item/" + ENTRIES.indexOf(gift) + ".png";
}

function getHostEmoteUrl(char) {
    return "assets/lottery/host/" + char + ".png";
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//=======================//
//    HTML Generators    //
//=======================//

function printOCs() {
    var ocHtml = "";
    for (const oc of OC_ARRANGED) {
        ocHtml += "<div class='oc'>";
        ocHtml += "<img src='" + getOcUrl(oc) + "' alt='oc'>";
        ocHtml += "</div>";
    }
    $(".turingBar").html(ocHtml);

    setSpotlightToNextOC();
}

function printGrid() {
    var gridHtml = "";
    for (var cardNumber = 1; cardNumber <= ENTRIES.length; cardNumber++) {
        gridHtml += "<div class='gridItem'>";
        gridHtml += "<div class='gridItem_inner'>";

        gridHtml += "<div class='gift_front no-select'>";
        gridHtml += "<div class='progress'></div>";
        gridHtml += cardNumber;
        gridHtml += "</div>";

        gridHtml += "<div class='gift_back no-select'>";
        gridHtml += "</div>";

        gridHtml += "</div>";
        gridHtml += "</div>";
    }
    $(".grid").html(gridHtml);
}

function displayItemModal(entry) {
    //======= for placeholder gift =======
    if (YEAR != '0000' && dataMasking) {
        entry = placeholderGift;
    }
    //====================================
    $(".modal").removeClass("hide");
    var itemModalHtml = "";

    itemModalHtml += "<div class='itemPanel'>";
    itemModalHtml += "<div class='itemSummary'>";
    itemModalHtml += "<div class='langSwitch'>"+"⇆"+"</div>";
    itemModalHtml += "<div class='itemTitle'>";
    itemModalHtml += "<div class='itemTitle1'>"+entry.giftName+"</div>";
    itemModalHtml += "<div class='itemTitle2'>"+entry.giftNameAlt+"</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "<div class='itemSummary_inner'>" + entry.giftDescription + "</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "<div class='itemArtWrap'>";
    itemModalHtml += "<img class='itemArt' src='" + getGiftUrl(entry) + "' alt='item' draggable='false' >";
    if(entry.numOfAlt>0){
        itemModalHtml += "<div class='itemArtList'>";
        for (let i = 0; i < entry.numOfAlt+1 ; i++) {
            itemModalHtml += "<span>◆</span>";
        }
        itemModalHtml += "</div>";
    }
    itemModalHtml += "</div>";
    itemModalHtml += "</div>";
    $(".modal_content").html(itemModalHtml);
    $(document.body).addClass("noscroll");
    setUpTraslateToggle(entry);
    setUpGiftAltArt(entry);
    //setUpRefImageModalClickEvents(entry);
}

function setUpGiftAltArt(entry) {
    handleAltArtIndicator();
    $(".itemArt").click(function () {
        generatePageFlipAudio().play();
        if(entry["numOfAlt"] != undefined){
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
    //======= for placeholder gift =======
        if (YEAR != '0000' && dataMasking) {
            entry = placeholderGift;
        }
    //====================================
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
    const bgPatternCookie = getCookie(COOKIE.BG_PATTEREN);
    if (bgPatternCookie === "") {
        bgPattern = [...Array(NUMBER_OF_BG).keys()];
        shuffleArray(bgPattern);
        setCookie(COOKIE.BG_PATTEREN, bgPattern.toString(), COOKIE_EXPIRE_DEFAULT_DAYS);
    }
    else {
        bgPattern = bgPatternCookie.split(",");
    }
    for (var i = 0; i < ENTRIES.length; i++) {
        $(".grid .gridItem:nth-of-type(" + (i + 1) + ") .gift_front").css("background-image", "url(assets/lottery/bg/" + bgPattern[i] + ".png)");
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

function drawGift() {
    var randomGift;
    var currentOCArtist = OC_ARRANGED[CURRENT_OC_INDEX].artist;

    var waitingOC = OC_ARRANGED.slice(CURRENT_OC_INDEX+1);
    // check the artist that still has the biggest group of oc without gift
    var largestFamilyNoSelfTrade = FindLargestFamilyNoSelfTrade(waitingOC);
    console.log("####################################");
    console.log("biggest family that disabled self trade: "+ largestFamilyNoSelfTrade);
    console.log("group member: ");
    console.log(waitingOC.filter(oc => oc.artist === largestFamilyNoSelfTrade) );
    // find all the available gift for this group of oc
    var giftPoolForFamily = GIFT_PILE.filter(entry => entry.artist !== largestFamilyNoSelfTrade);
    console.log("available gift for this group: ");
    console.log(giftPoolForFamily);

    // if there is still someone in pool that disable selfTrade and
    // if the amount of available gift for this group is equal or smaller than the size of this group, then there is danger of self trade
    if ( largestFamilyNoSelfTrade &&
         giftPoolForFamily.length <= waitingOC.filter(participants => participants.artist === largestFamilyNoSelfTrade).length) {
        // assign current gift from any of this artist's oc
        console.log("danger of self trade!");    

        var availableGifts = GIFT_PILE.filter(entry => entry.artist === largestFamilyNoSelfTrade);
        randomGift = availableGifts[Math.floor(Math.random() * availableGifts.length)];
        console.log("assign a random gift from the family to current OC: ");    
        console.log(availableGifts);
        console.log("the gift chosen is: ");
        console.log(randomGift);    

    } else {
        // if no danger of self trade, proceed as normal
        var giftPoolForCurrentOC;

        // if selfTrade is permitted by artist
        console.log("self trade: " + ARTISTS[currentOCArtist].selfTrade);
        if (ARTISTS[currentOCArtist].selfTrade) {
            // only exclude current OC
            giftPoolForCurrentOC = GIFT_PILE.filter(entry => entry !== OC_ARRANGED[CURRENT_OC_INDEX])        
        } else {
            // exclude all oc by this artist
            giftPoolForCurrentOC = GIFT_PILE.filter(entry => entry.artist !== currentOCArtist);
        }

        console.log("available gift for current oc: ");
        console.log(giftPoolForCurrentOC);

        randomGift = giftPoolForCurrentOC[Math.floor(Math.random() * giftPoolForCurrentOC.length)];
        // to handle lonely oc problem
        if (OC_ARRANGED.length - CURRENT_OC_INDEX === 2 && giftPoolForCurrentOC.some(r => waitingOC.includes(r)) && giftPoolForCurrentOC.length === 2) {
            console.log("detected lonely OC! OC that haven't get gift and still has their own gift in gift pool: ");
            var lonelyOCsGift = waitingOC.filter(value => giftPoolForCurrentOC.includes(value))[0];
            randomGift = lonelyOCsGift;
        }
    }
    GIFT_PILE = GIFT_PILE.filter(entry => entry != randomGift);
    HOST_QUOTES[0] = getQuoteOfRemainingGiftCountZH(GIFT_PILE.length);
    HOST_QUOTES[1] = getQuoteOfRemainingGiftCountEN(GIFT_PILE.length);
    return randomGift;
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
                giftCard.siblings().html("<img src='" + getGiftUrl(gift) + "' alt='gift' />");

                //display item
                displayItemModal(gift);

                //handle gift data
                OBTAINED_GIFT_INDEX.push(ENTRIES.indexOf(gift));
                FLIPPED_CARD.push(giftCard.parent().parent().index());
                setCookie(COOKIE.OBTAINED_GIFT, OBTAINED_GIFT_INDEX.toString(), COOKIE_EXPIRE_DEFAULT_DAYS);
                setCookie(COOKIE.FLIPPED_CARD, FLIPPED_CARD.toString(), COOKIE_EXPIRE_DEFAULT_DAYS);

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

            CURRENT_OC_INDEX++;
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
    return createAudioElement(0.2, 'assets/sound/kids_cheer.mp3');
}

function generatePageFlipAudio(){
    return createAudioElement(0.25, 'assets/sound/flip_page.mp3');
}

function setUpAudios() {
    AUDIO_ELEMENTS["balloonPop"] = createAudioElement(0.1, 'assets/sound/balloon_pop.mp3');
    AUDIO_ELEMENTS["itemObtain"] = createAudioElement(0.1, 'assets/sound/item_obtain.mp3');
    AUDIO_ELEMENTS["paperTear"] = createAudioElement(0.4, 'assets/sound/paper_tear.mp3');
    AUDIO_ELEMENTS["flipCard"] = createAudioElement(0.1, 'assets/sound/flip_card.mp3');
    AUDIO_ELEMENTS["flipPage"] = createAudioElement(0.25, 'assets/sound/flip_page.mp3');
    AUDIO_ELEMENTS["bell"] = createAudioElement(0.35, 'assets/sound/bicycle_bell.mp3');
    AUDIO_ELEMENTS["blop"] = createAudioElement(0.1, 'assets/sound/blop.mp3');
    AUDIO_ELEMENTS["click"] = createAudioElement(0.2, 'assets/sound/click.mp3');
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
            "background-image", "url(assets/lottery/cursor/pointer_gift.png)"
        );
    }).mouseleave(function() {
        cursor.css(
            "background-image", "url(assets/lottery/cursor/pointer.png)"
        );
    });
}

//======================//
//                      //
//    Handle Coockie    //
//                      //
//======================//

function loadCookie() {
    const ocArrangementCookie = getCookie(COOKIE.OC_ARRANGEMENT);
    const obtainedGIftCookie = getCookie(COOKIE.OBTAINED_GIFT);
    const flippedCardCookie = getCookie(COOKIE.FLIPPED_CARD);

    if (ocArrangementCookie === "") {
        OC_ARRANGED = [].concat(ENTRIES);
        shuffleArray(OC_ARRANGED);
        var arrangedIndexs = OC_ARRANGED.map(oc => ENTRIES.indexOf(oc));
        setCookie(COOKIE.OC_ARRANGEMENT, arrangedIndexs.toString(), COOKIE_EXPIRE_DEFAULT_DAYS);
    } else {
        OC_ARRANGED = ocArrangementCookie.split(",").map(index => ENTRIES[index]);
    }

    if (obtainedGIftCookie !== "" && flippedCardCookie !== "") {
        OBTAINED_GIFT_INDEX = obtainedGIftCookie.split(",");
        FLIPPED_CARD = flippedCardCookie.split(",");

        var obtainedGifts = OBTAINED_GIFT_INDEX.map(index => ENTRIES[index]);
        var index = 0;
        for (var gift of obtainedGifts) {
            $(".logPanelContent ul").append(getGiftLogHtml(OC_ARRANGED[index], gift));
            $(".logPanelContent ul").animate({ scrollTop: $(document).height() }, 1000);
            setUpGiftLogStyle(index);

            $(".gridItem:nth-child(" + (parseInt(FLIPPED_CARD[index]) + 1) + ") .gridItem_inner .gift_back").html("<img src='" + getGiftUrl(gift) + "' alt='gift' />");
            $(".gridItem:nth-child(" + (parseInt(FLIPPED_CARD[index]) + 1) + ") .gridItem_inner").css("transform", "rotateY(180deg)");

            $(".logPanelContent ul li:nth-child(" + (index + 1) + ") .gift").click(function () {
                displayItemModal(gift);
                AUDIO_ELEMENTS["flipPage"].play();
            });
            index++;
        }
        CURRENT_OC_INDEX = index;
        GIFT_PILE = GIFT_PILE.filter(gift => !obtainedGifts.includes(gift));
        printOCs();
        fadeFinishedOCs();
        return;
    }
    printOCs();
}

function printOCList() {
    let output = "";
    let rank = 1;
    for (var oc of OC_ARRANGED)
        output += rank++ + ". " + oc.ocName + "  ------  " + oc.artist + "\n";

    console.log(output);
}

//======================//
//                      //
//    Ready Function    //
//                      //
//======================//

$(document).ready(function () {
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