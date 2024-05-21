//==================//
//=== Guest Data ===//
//==================//

const OCS = [
    {
        name: "成步堂龍一",
        profilePic: "0.jpg",
        giftName: "葡萄汁",
        giftPic: "0.png",
        artist: "1"
    },
    {
        name: "王泥喜法介",
        profilePic: "1.jpg",
        giftName: "折疊式天文望遠鏡",
        giftPic: "1.png",
        artist: "4"
    },
    {
        name: "希月心音",
        profilePic: "2.jpg",
        giftName: "碰可玩具機器人",
        giftPic: "2.png",
        artist: "5"
    },
    {
        name: "御劍伶侍",
        profilePic: "3.jpg",
        giftName: "西洋棋組",
        giftPic: "3.png",
        artist: "1"
    },
    {
        name: "綾里真宵",
        profilePic: "4.jpg",
        giftName: "將軍超人第一季DVD全套",
        giftPic: "4.png",
        artist: "1"
    },
    {
        name: "成步堂美貫",
        profilePic: "5.jpg",
        giftName: "帽子先生吊飾",
        giftPic: "5.png",
        artist: "4"
    },
    {
        name: "寶月茜",
        profilePic: "6.jpg",
        giftName: "冬季限定花林糖",
        giftPic: "6.png",
        artist: "4"
    },
    {
        name: "綾里春美",
        profilePic: "7.jpg",
        giftName: "倉院特產饅頭",
        giftPic: "7.png",
        artist: "2"
    },
    {
        name: "靈花 帕多瑪",
        profilePic: "8.jpg",
        giftName: "手工押花",
        giftPic: "8.png",
        artist: "6"
    }
];

//============================//
//=== Functional Variables ===//
//============================//

var OBTAINED_GIFT_INDEX = [];

var FLIPPED_CARD = [];

var OC_ARRANGED;

var GIFT_PILE = [].concat(OCS);

var CURRENT_OC_INDEX = 0;

//========================//
//=== Custom Variables ===//
//========================//

var EMOTES = "WASDF";

var YEAR = 2024;

var NUMBER_OF_BG = 83;

var HOST_QUOTES = [
    getQuoteOfRemainingGiftCountZH(GIFT_PILE.length),
    "卡片花色是隨機生成的，跟禮物沒有關係～",
    "123123212",
    "屋趴～～～"
]

//======================//
//=== Getter & Utils ===//
//======================//

function getOcUrl(oc) {
    return "assets/lottery/" + YEAR + "profile/" + oc.profilePic;
}

function getGiftUrl(oc) {
    return "assets/" + YEAR + "/item/" + oc.giftPic;
}

function getHostEmoteUrl(char) {
    return "assets/lottery/host/" + char + ".png";
}

function getQuoteOfRemainingGiftCountZH(count){
    return "還有" + count + "個禮物還沒被打開";
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
//=========================//
//=== HTML Manipulators ===//
//=========================//

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
    var cardNumber = 1;
    var gridHtml = "";
    for (const oc of OCS) {
        gridHtml += "<div class='gridItem'>";
        gridHtml += "<div class='gridItem_inner'>";

        gridHtml += "<div class='gift_front no-select'>";
        gridHtml += "<div class='progress'></div>";
        gridHtml += cardNumber++;
        gridHtml += "</div>";

        gridHtml += "<div class='gift_back no-select'>";
        gridHtml += "</div>";

        gridHtml += "</div>";
        gridHtml += "</div>";
    }
    $(".grid").html(gridHtml);
}

function displayItemModal(gift) {
    $(".modal").removeClass("hide");
    var itemModalHtml = "";

    itemModalHtml += "<div class='itemPanel'>"
    itemModalHtml += "<div class='itemSummary'> askajdlkajalkjdalksdjlk </div>"
    itemModalHtml += "<img class='itemArt' src='" + getGiftUrl(gift) + "' alt='item' >"
    itemModalHtml += "</div>"

    $(".modal").html(itemModalHtml);
    $(document.body).addClass("noscroll");
}

function getGiftLogHtml(currentOC, gift) {
    var logHtml = "";
    logHtml += "<li id='giftli'>";
    logHtml += "<div class='label'>";
    logHtml += "<div>" + currentOC.name + "</div>"
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
    for (var i = 0; i < OCS.length; i++) {
        $(".grid .gridItem:nth-of-type(" + (i + 1) + ") .gift_front").css("background-image", "url(assets/lottery/bg/" + bgPattern[i] + ".png)");
    }
}

//=========================//
//=== Handle Gift Pulls ===//
//=========================//
//                         //
//                         //
//=========================//

function drawGift() {
    var giftPoolForCurrentOC = GIFT_PILE.filter(gift => gift !== OC_ARRANGED[CURRENT_OC_INDEX]);
    var randomGift = giftPoolForCurrentOC[Math.floor(Math.random() * giftPoolForCurrentOC.length)];
    var participantsWithoutGift = OC_ARRANGED.slice(CURRENT_OC_INDEX);
    // to handle lonely last person problem
    if (OC_ARRANGED.length - CURRENT_OC_INDEX === 2 && giftPoolForCurrentOC.some(r => participantsWithoutGift.includes(r)) && giftPoolForCurrentOC.length === 2) {
        console.log("detected lonely OC! OC that haven't get gift and still in pool: ");
        var lonelyOCsGift = participantsWithoutGift.filter(value => giftPoolForCurrentOC.includes(value))[0];
        randomGift = lonelyOCsGift;
    }
    GIFT_PILE = GIFT_PILE.filter(gift => gift != randomGift);
    HOST_QUOTES[0] = getQuoteOfRemainingGiftCountZH(GIFT_PILE.length);
    return randomGift;
}

//=========================//
//=== Handle Flip Click ===//
//=========================//
//                         //
//                         //
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
                OBTAINED_GIFT_INDEX.push(OCS.indexOf(gift));
                FLIPPED_CARD.push(giftCard.parent().parent().index());
                setCookie(COOKIE.OBTAINED_GIFT, OBTAINED_GIFT_INDEX.toString(), COOKIE_EXPIRE_DEFAULT_DAYS);
                setCookie(COOKIE.FLIPPED_CARD, FLIPPED_CARD.toString(), COOKIE_EXPIRE_DEFAULT_DAYS);
            }, 1500);
            return;
        })
    })

    //Events on modal close
    $(".modal").click(function () {
        $(this).addClass("hide");
        $(document.body).removeClass("noscroll");

        //only do the rest when the click is on a card (otherwise)
        if (currentGiftCard) {
            //flip card
            doCardFlip(currentGiftCard.parent(".gridItem_inner"))
            //add entry to gift log
            addEntryToGoftLog(gift);

            CURRENT_OC_INDEX++;
            setSpotlightToNextOC();
            fadeFinishedOCs();
            if (CURRENT_OC_INDEX == OCS.length) {
                //trigger ending events for the last flip
                triggerEnding();
            }
            updateStats();
            currentGiftCard = undefined;
        }
    })
}

function addEntryToGoftLog(gift){
    $(".logPanelContent ul").append(getGiftLogHtml(OC_ARRANGED[CURRENT_OC_INDEX], gift));
    $(".logPanelContent").animate({ scrollTop: $(".logPanelContent").prop("scrollHeight") }, 1000);
    setUpGiftLogStyle(CURRENT_OC_INDEX);
}

function doCardFlip(element){
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

var HOST_CURRENT_SIDE = 0;
var HOST_CURRENT_LETTER = "S";

function setHostEmote(side, imgUrl){
    var sideClass= (side === 0) ? "front" : "back";
    $(".host_inner ."+sideClass).html("<img src='"+imgUrl+"' alt='host'>");
}

function flipHost(imgUrl){
    if(HOST_CURRENT_SIDE === 0){
        setHostEmote(1,imgUrl);
        $(".host_inner").css("transform","rotateY(180deg)");
        HOST_CURRENT_SIDE = 1;
    }else{
        setHostEmote(0,imgUrl);
        $(".host_inner").css("transform","rotateY(0deg)");
        HOST_CURRENT_SIDE = 0;
    }
}

function handleKeyPress(keyPressed){
    var letter = String.fromCharCode(keyPressed.keyCode).toUpperCase();
    if(EMOTES.includes(letter) && HOST_CURRENT_LETTER !== letter){
        flipHost(getHostEmoteUrl(letter));
        HOST_CURRENT_LETTER = letter;
    }

}

//====================//
//=== Other Events ===//
//====================//

function setSpotlightToNextOC() {
    $(".turingBar").css("transform", "translate(" + getCurrentOCPos() + "px, 0)");
    $(".currentName").html(OC_ARRANGED[CURRENT_OC_INDEX]?.name);
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
    $(".lotteryPanel").css("background-color", "rgb(203, 193, 177, 0.2)");
}

function extraStyle(){
    $('.oc img').attr('draggable', false);
    $('.host img').attr('draggable', false);
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
        OC_ARRANGED = [].concat(OCS);
        shuffleArray(OC_ARRANGED); // TODO: need to reshuffle and group by artist
        var arrangedIndexs = OC_ARRANGED.map(oc => OCS.indexOf(oc));
        setCookie(COOKIE.OC_ARRANGEMENT, arrangedIndexs.toString(), COOKIE_EXPIRE_DEFAULT_DAYS);
    } else {
        OC_ARRANGED = ocArrangementCookie.split(",").map(index => OCS[index]);
    }

    if (obtainedGIftCookie !== "" && flippedCardCookie !== "") {
        OBTAINED_GIFT_INDEX = obtainedGIftCookie.split(",");
        FLIPPED_CARD = flippedCardCookie.split(",");

        var obtainedGifts = OBTAINED_GIFT_INDEX.map(index => OCS[index]);
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
        fadeFinishedOCs();
    }
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
    printOCs();
    setUpFlipEvent();
    updateStats();
    shuffleHostQuotes();
    setHostEmote(HOST_CURRENT_SIDE, getHostEmoteUrl(HOST_CURRENT_LETTER));
    extraStyle();
});

$(document).keydown(function(keyPressed) {
    handleKeyPress(keyPressed);
});