
const OCS = [
    {
        name:"成步堂龍一",
        profilePic: "0.jpg",
        giftName: "葡萄汁",
        giftPic: "0.png",
        artist: "1"
    }, 
    {
        name:"王泥喜法介",
        profilePic: "1.jpg",
        giftName: "折疊式天文望遠鏡",
        giftPic: "1.png",
        artist: "4"
    },
    {
        name:"希月心音",
        profilePic: "2.jpg",
        giftName: "碰可玩具機器人",
        giftPic: "2.png",
        artist: "5"
    }, 
    {
        name:"御劍伶侍",
        profilePic: "3.jpg",
        giftName: "西洋棋組",
        giftPic: "3.png",
        artist: "1"
    }, 
    {
        name:"綾里真宵",
        profilePic: "4.jpg",
        giftName: "將軍超人第一季DVD全套",
        giftPic: "4.png",
        artist: "1"
    }, 
    {
        name:"成步堂美貫",
        profilePic: "5.jpg",
        giftName: "帽子先生吊飾",
        giftPic: "5.png",
        artist: "4"
    }, 
    {
        name:"寶月茜",
        profilePic: "6.jpg",
        giftName: "冬季限定花林糖",
        giftPic: "6.png",
        artist: "4"
    }, 
    {
        name:"綾里春美",
        profilePic: "7.jpg",
        giftName: "倉院特產饅頭",
        giftPic: "6.png",
        artist: "2"
    }, 
    {
        name:"靈花 帕多瑪",
        profilePic: "8.jpg",
        giftName: "手工押花",
        giftPic: "6.png",
        artist: "6"
    }
];

var ocList = [].concat(OCS);

var giftPile = [].concat(OCS);


var GIFT_SLOTS = [
    {}, {}, {}, {}, {},
    {}, {}, {}, {}, {},
    {}, {}, {}, {}, {},
    {}, {}, {}, {}, {},
    {}, {}, {}, {}, {},
    {}, {}, {}, {}, {},
    {}, {}, {}, {}, {}
];

var results = []

var NUMBER_OF_BG = 76;

var ORIGINAL_OC_POS = -50;

var CURRENT_OC_INDEX = 0;

var YEAR = 2024;

function getOcUrl(oc) {
    return "assets/lottery/" + YEAR + "profile/" + oc.profilePic;
}

function getGiftUrl(oc) {
    console.log("assets/" + YEAR + "/item/" + oc.giftPic);
    return "assets/" + YEAR + "/item/" + oc.giftPic;
}

function printOCs() {
    var ocHtml = "";
    for (const oc of ocList) {
        ocHtml += "<div class='oc'>";
        ocHtml += "<img src='" + getOcUrl(oc) + "'>";
        ocHtml += "</div>";
    }
    $(".turingBar").html(ocHtml);

    setSpotlightToNextOC(ocList);
    //animateArrow();
    animateFrame();
}

function animateArrow() {
    const $arrow = document.querySelector('.arrow');
    $arrow.animate([
        { left: '10px' },
        { left: '0' },
        { left: '10px' }
    ], {
        duration: 500,
        iterations: Infinity
    });
}

function animateFrame() {
    const $arrow = document.querySelector('.frame');
    $arrow.animate([
        { transform: 'translate(-50%, 0) scale(1)' },
        { transform: 'translate(-50%, 0) scale(1.2)' },
        { transform: 'translate(-50%, 0) scale(1)' }
    ], {
        duration: 500,
        iterations: Infinity
    });
}

function getCurrentOCPos() {
    return ORIGINAL_OC_POS + ((CURRENT_OC_INDEX) * -100);
}

function setSpotlightToNextOC() {
    console.log("moving to " + CURRENT_OC_INDEX + "th OC");
    $(".turingBar").css("transform", "translate(" + getCurrentOCPos() + "px, 0)");
    $(".currentName").html(ocList[CURRENT_OC_INDEX].name);
}

function printGrid() {
    var gridHtml = "";
    var gridNumber = 1;
    for (const oc of OCS) {
        gridHtml += "<div class='gridItem'>";
        gridHtml += "<div class='gridItem_inner'>";

        gridHtml += "<div class='gift_front'>";
        gridHtml +=  gridNumber++;
        gridHtml += "</div>";

        gridHtml += "<div class='gift_back'>";
        gridHtml += "</div>";

        gridHtml += "</div>";
        gridHtml += "</div>";
    }
    $(".grid").html(gridHtml);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setGridBG() {

    var bgNum = [...Array(NUMBER_OF_BG+1).keys()];
    shuffleArray(bgNum);

    for (var i = 0; i < GIFT_SLOTS.length; i++) {
        $(".grid .gridItem:nth-of-type(" + (i + 1) + ") .gift_front").css("background-image", "url(assets/lottery/bg/" + bgNum[i] + ".png)");
    }
}

function draw() {
    var giftPoolForCurrentOC = giftPile.filter(gift => gift !== ocList[CURRENT_OC_INDEX]);
    //  var senderInGiftPool = Object.keys(giftPoolForCurrentOC);
    var randomDraw = giftPoolForCurrentOC[Math.floor(Math.random() * giftPoolForCurrentOC.length)];
    var participantsWithoutGift = ocList.slice(CURRENT_OC_INDEX);
    // to handle lonely last person problem
    if ( ocList.length - CURRENT_OC_INDEX === 2 && giftPoolForCurrentOC.some(r => participantsWithoutGift.includes(r)) && giftPoolForCurrentOC.length === 2) {
            console.log("detected lonely OC! OC that haven't get gift and still in pool: ");
        console.log(participantsWithoutGift.filter(value => giftPoolForCurrentOC.includes(value)));
            var lonelyOC = participantsWithoutGift.filter(value => giftPoolForCurrentOC.includes(value))[0];
        randomDraw = lonelyOC;
    }
    giftPile = giftPile.filter(gift => gift != randomDraw);
    return randomDraw;
}

function setUpFlipEvent() {
    $(".gridItem_inner").each(function () {
        $(this).find(".gift_front").click(function () {
            var gift = draw();
            $(this).siblings().html("<img src='" + getGiftUrl(gift) + "'/>");
            console.log(gift);
            $(this).parent(".gridItem_inner").css("transform", "rotateY(180deg)");
            $(this).parent(".gridItem_inner").css("border", "rgba(92, 83, 73, 0.308) 1px solid");
            $(".giftLogPanel ul").append(addGiftLog(ocList[CURRENT_OC_INDEX], gift));
            $(".giftLogPanel ul").animate({ scrollTop: $(document).height() }, 1000);
            setUpGiftLogStyle(CURRENT_OC_INDEX);


            if (CURRENT_OC_INDEX !== OCS.length - 1) {
                CURRENT_OC_INDEX++;
                setSpotlightToNextOC();
                setUpOCOpacity();
            } else {
                //case of last click
                CURRENT_OC_INDEX++;
                $(".turingBar").css("transform", "translate(" + getCurrentOCPos() + "px, 0)");
                $(".currentName").html("");
                setUpOCOpacity();
            }
            updateStats();

        })
    })
}


function addGiftLog(currentOC, gift) {
    var logHtml = "";
    logHtml += "<li>";
    logHtml += "<div class='label'>";
    logHtml += "<div>" + currentOC.name + "</div>"
    logHtml += "<div>" + gift.giftName + "</div>"
    logHtml += "</div>";
    logHtml += "<img class='chara' src='" + getOcUrl(currentOC) + "'>";
    logHtml += "<img class='gift' src='" + getGiftUrl(gift) + "'>";
    logHtml += "</li>";
    return logHtml;
}

function setUpGiftLogStyle(index) {
    console.log(index + 1);
    $(".giftLogPanel ul li:nth-child(" + (index + 1) + ")").css("border", "1px solid black");
    $(".giftLogPanel ul li:nth-child(" + (index + 1) + ")").css("opacity", "1");
}

function setUpOCOpacity() {
    $(".oc:nth-child(" + CURRENT_OC_INDEX + ")").css("opacity", 0.20);
    $(".oc:nth-child(" + (CURRENT_OC_INDEX - 1) + ")").css("opacity", 0.10);
    $(".oc:nth-child(" + (CURRENT_OC_INDEX - 2) + ")").css("opacity", 0.05);
    $(".oc:nth-child(" + (CURRENT_OC_INDEX - 3) + ")").css("opacity", 0);
}

function randomBGIndex() {
    return Math.floor(Math.random() * NUMBER_OF_BG) + 1
}

function updateStats() {
    $(".count").html(CURRENT_OC_INDEX);
    $(".remain").html(giftPile.length);
}

function setupStuff() {

}

//======================//
//===                ===//
//=== Ready Function ===//
//===                ===//
//======================//

$(document).ready(function () {
    shuffleArray(ocList);
    printOCs();
    printGrid();
    setGridBG();
    setUpFlipEvent();
    updateStats();


});