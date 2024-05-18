
var OCS = [
    { name: "成步堂龍一" }, { name: "王泥喜法介" }, { name: "希月心音" },
    { name: "御劍伶侍" }, { name: "綾里真宵" }, { name: "成步堂美貫" },
    { name: "寶月茜" }, { name: "綾里春美" }, { name: "靈花 帕多瑪" }];

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

var NUMBER_OF_BG = 75;

var ORIGINAL_OC_POS = -50;

var CURRENT_OC_INDEX = 0;

var YEAR = 2024;

function getOcUrl(id) {
    return "assets/lottery/" + YEAR + "profile/" + id + ".jpg";
}

function getGiftUrl(id) {
    return "assets/" + YEAR + "/item/" + id + ".png";
}

function printOCs() {
    var ocHtml = "";
    for (var i = 0; i < OCS.length; i++) {
        ocHtml += "<div class='oc'>";
        ocHtml += "<img src='" + getOcUrl(i) + "'>";
        ocHtml += "</div>";
    }
    $(".turingBar").html(ocHtml);

    setSpotlightToNextOC();
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
    $(".currentName").html(OCS[CURRENT_OC_INDEX].name);
}

function printGrid() {
    var gridHtml = "";
    for (var i = 0; i < GIFT_SLOTS.length; i++) {
        gridHtml += "<div class='gridItem'>";
        gridHtml += "<div class='gridItem_inner'>";

        gridHtml += "<div class='gift_front'>";
        gridHtml += i + 1;
        gridHtml += "</div>";

        gridHtml += "<div class='gift_back'>";
        gridHtml += "<img src='" + getGiftUrl(i) +"'>";
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

    var bgNum = [...Array(77).keys()];
    shuffleArray(bgNum);

    for (var i = 0; i < GIFT_SLOTS.length; i++) {
        $(".grid .gridItem:nth-of-type(" + (i + 1) + ") .gift_front").css("background-image", "url(assets/lottery/bg/" + bgNum[i] + ".png)");
    }
}

function setUpFlipEvent() {
    $(".gridItem_inner").each(function () {
        $(this).find(".gift_front").click(function () {
            $(this).parent(".gridItem_inner").css("transform", "rotateY(180deg)");
            $(this).parent(".gridItem_inner").css("border", "rgba(92, 83, 73, 0.308) 1px solid");
            $(".giftLogPanel ul").append(addGiftLog(CURRENT_OC_INDEX, 1));
            $(".giftLogPanel ul").animate({ scrollTop: $(document).height() }, 1000);
            setUpGiftLogStyle(CURRENT_OC_INDEX);

            COUNT++;
            REMAIN--;
            updateStats();

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

        })
    })
}


function addGiftLog(charaIndex, giftIndex) {
    var logHtml = "";
    logHtml += "<li>";
    logHtml += "<div class='label'>";
    logHtml += "<div>成步堂龍一</div>"
    logHtml += "<div>灰色飲料瓶</div>"
    logHtml += "</div>";
    logHtml += "<img class='chara' src='assets/lottery/" + YEAR + "profile/" + charaIndex + ".jpg'>";
    logHtml += "<img class='gift' src='assets/" + YEAR + "/item/" + giftIndex + ".png'>";
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

var COUNT = 0;
var REMAIN = GIFT_SLOTS.length;

function updateStats() {
    $(".count").html(COUNT);
    $(".remain").html(REMAIN);
}

function setupStuff() {
    printOCs();
    printGrid();
    setGridBG();
    setUpFlipEvent();
    updateStats();
}

//======================//
//===                ===//
//=== Ready Function ===//
//===                ===//
//======================//

$(document).ready(function () {
    setupStuff();
});