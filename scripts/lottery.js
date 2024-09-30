//============================//
//=== Functional Variables ===//
//============================//

var OBTAINED_GIFT_INDEX = [];

var FLIPPED_CARD = [];

var OC_ARRANGED;

var GIFT_PILE = [].concat(ENTRIES);

var CURRENT_OC_INDEX = 0;

var HOST_CURRENT_SIDE = 0;

//========================//
//=== Custom Variables ===//
//========================//

var YEAR = "2024";

var dataMasking = true;

var NUMBER_OF_BG = 83;

var EMOTES = "WASDFX";

var HOST_CURRENT_LETTER = "W";

var HOST_QUOTES = [
    getQuoteOfRemainingGiftCountZH(GIFT_PILE.length),
    "卡片花色是<span>隨機</span>生成的，跟禮物沒有關係～",
    "123123212",
    "屋趴～～～"
]

var placeholderGift = {
    ocName: "綾里春美",
    giftName: "造型磁鐵香料罐",
    giftNameAlt: "Fresh Magnetic Spice Jars",
    giftDescription: "倉院之里的特產栗子饅頭。每個饅頭都是勾玉形狀﹐有經過某位靈媒的祈禱加持﹐據說吃下去可以補充靈力。",
    artist: "2"
}

//======================//
//=== Getter & Utils ===//
//======================//

function fileFormat() {
    return YEAR === "0000" ? ".jpg" : ".png";
}

function getOcUrl(oc) {
    return "assets/" + YEAR + "/profile/" + ENTRIES.indexOf(oc) + fileFormat();
}

function getGiftUrl(gift) {
    if (YEAR != '0000' && dataMasking) { // set placeholder gift
        return "assets/placeholder.png";
    }
    return "assets/" + YEAR + "/item/" + ENTRIES.indexOf(gift) + ".png";
}

function getHostEmoteUrl(char) {
    return "assets/lottery/host/" + char + ".png";
}

function getQuoteOfRemainingGiftCountZH(count) {
    return "還有<span>" + count + "個禮物</span>還沒被打開～";
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
//=== HTML Generators ===//
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

function displayItemModal(gift) {
    if (YEAR != '0000' && dataMasking) { // set placeholder gift
        gift = placeholderGift;
    }

    $(".modal").removeClass("hide");
    var itemModalHtml = "";

    itemModalHtml += "<div class='itemPanel'>";
    itemModalHtml += "<div class='itemSummary'>";
    itemModalHtml += "<div class='itemTitle'>";
    itemModalHtml += "<div class='itemTitle1'>"+gift.giftName+"</div>";
    itemModalHtml += "<div class='itemTitle2'>"+gift.giftNameAlt+"</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "<div class='itemSummary_inner'>" + gift.giftDescription + "</div>";
    itemModalHtml += "</div>";

    itemModalHtml += "<img class='itemArt' src='" + getGiftUrl(gift) + "' alt='item' draggable='false' >";

    itemModalHtml += "</div>";

    $(".modal_content").html(itemModalHtml);
    $(document.body).addClass("noscroll");
}

function getGiftLogHtml(currentOC, gift) {
    if (YEAR != '0000' && dataMasking) { // set placeholder gift
        gift = placeholderGift;
    }
    var logHtml = "";
    logHtml += "<li>";
    logHtml += "<div class='label'>";
    logHtml += "<div>" + currentOC.ocName + "</div>"
    logHtml += "<div>" + gift.giftName + "</div>"
    logHtml += "</div>";
    logHtml += "<img class='chara no-select' src='" + getOcUrl(currentOC) + "' alt='chara' draggable='false'>";
    logHtml += "<img class='gift no-select' src='" + getGiftUrl(gift) + "' alt='gift' draggable='false'>";
    logHtml += "</li>";
    return logHtml;
}

//=================================//
//=== Randomize and Set Grid BG ===//
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
//=== Handle Gift Pulls ===//
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
    var giftPoolForFamily = GIFT_PILE.filter(gift => gift.artist !== largestFamilyNoSelfTrade);
    console.log("available gift for this group: ");
    console.log(giftPoolForFamily);

    // if there is still someone in pool that disable selfTrade and
    // if the amount of available gift for this group is equal or smaller than the size of this group, then there is danger of self trade
    if ( largestFamilyNoSelfTrade &&
         giftPoolForFamily.length <= waitingOC.filter(participants => participants.artist === largestFamilyNoSelfTrade).length) {
        // assign current gift from any of this artist's oc
        console.log("danger of self trade!");    

        var availableGifts = GIFT_PILE.filter(gift => gift.artist === largestFamilyNoSelfTrade);
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
            giftPoolForCurrentOC = GIFT_PILE.filter(gift => gift !== OC_ARRANGED[CURRENT_OC_INDEX])        
        } else {
            // exclude all oc by this artist
            giftPoolForCurrentOC = GIFT_PILE.filter(gift => gift.artist !== currentOCArtist);
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
    GIFT_PILE = GIFT_PILE.filter(gift => gift != randomGift);
    HOST_QUOTES[0] = getQuoteOfRemainingGiftCountZH(GIFT_PILE.length);
    return randomGift;
}

//=========================//
//=== Handle Flip Click ===//
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
            return;
        })
        //when long click is pressed
        giftCard.mousedown(function () {
            giftCard.find(".progress").addClass("full_progress");
            //upon long click completed
            timeout = window.setTimeout(function () {
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
            }, 1500);
            return;
        })
    })

    //Events on modal close
    $(".modal_bg").click(function () {
        $(".modal").addClass("hide");
        $(document.body).removeClass("noscroll");
        //only do the rest when the long click is on a card
        if (currentGiftCard) {
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

//===================//
//=== Host Events ===//
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
    if (EMOTES.includes(letter) && HOST_CURRENT_LETTER !== letter) {
        flipHost(getHostEmoteUrl(letter));
        HOST_CURRENT_LETTER = letter;
    }

}

//====================//
//=== Other Events ===//
//====================//

function setSpotlightToNextOC() {
    $(".turingBar").css("transform", "translate(" + getCurrentOCPos() + "px, 0)");
    $(".currentName").html(OC_ARRANGED[CURRENT_OC_INDEX]?.ocName);
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

function setUpCursor(){
	var cursor = $(".cursor");
	$(window).mousemove(function(e) {
        // cursor.css({
		// 	top: e.clientY - cursor.height() / 2,
		// 	left: e.clientX - cursor.width() / 2
		// });
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
//===                ===//
//=== Handle Coockie ===//
//===                ===//
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


//======================//
//===                ===//
//=== Ready Function ===//
//===                ===//
//======================//

$(document).ready(function () {
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
});

$(document).keydown(function (keyPressed) {
    handleKeyPress(keyPressed);
});