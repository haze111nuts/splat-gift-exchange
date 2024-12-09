//========================//
//    Custom Variables    //
//========================//

var YEAR = "0000";

//============================//
//    Functional Variables    //
//============================//

var displayGroup = "sender";

//===================//
//    URL Getters    //
//===================//

function assetBaseUrl(fileName){
    return `../assets/gallery/${fileName}`;
}

function getArtUrl(group,id) {
    return `art_${group}/${id}.png`;
}

function getGiftUrl(gift) {
    const index = ENTRIES.indexOf(gift);
    const altIndex = getAltIndex();
    return `gift/${index}${altIndex > 0 ? `-${altIndex}` : ''}.png`;
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


    let arrangement2024 = ocArrangementData.split(",");
    let gridHtml = arrangement2024.map((ocIndex, i) => `
    <li class="grid-item">
        <div class="card">
            <div class="cardBG"></div>
            <div class="cardInner">
                ${['cardFront', 'cardBack'].map(side => `
                    <div class="${side}" data-id="${ocIndex}">
                        <div class="preview"><div class="previewInner"></div></div>
                    </div>`).join('')}
            </div>
        </div>
        <div class="label" data-id="${ocIndex}">
            <div class="label_BG"></div>
            <div class="giftTitle">${ENTRIES[ocIndex].giftName}</div>
            <div class="giftAltTitle">${ENTRIES[ocIndex].giftNameAlt}</div>
            <div class="gift"><img src="${getGiftUrl(ENTRIES[ocIndex])}"></div>
        </div>
    </li>`).join('');
    $(".grid").html(gridHtml);
    setUpGridStyle(arrangement2024);
}

function setUpGridStyle(arrangement2024) {
    var i = 0 ;
    for (var ocIndex of arrangement2024) {
        //set image for each grid item
        $(".grid-item:nth-child(" + (i + 1) + ") .cardFront .previewInner")
            .css("background-image", "url(" + getArtUrl("sender", ocIndex) + ")");
        $(".grid-item:nth-child(" + (i + 1) + ") .cardBack .previewInner")
            .css("background-image", "url(" + getArtUrl("getter", ocIndex) + ")");
        // delay style for each grid tem
        $(".grid-item:nth-child(" + (i + 1) + ") .cardInner")
        .css("transition-delay", i * 0.03 + "s");
        i++;
    }
}

//============================//
//    Settingup Item Modal    //
//============================//

function setUpItemModalClickEvents(){
    $(".label").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            let entry = ENTRIES[dataID];
            $(".modal_content").html(
                setUpItemPanel(entry, getGiftUrl(entry))
            );

            $(".modal").removeClass("hide");
            hideScrollBar();
            setUpGiftAltArt(entry, null);
            setUpItemTranslateToggle(entry, null);
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
                <img class='art' src='${getArtUrl("sender", dataID)}' alt='art'>
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
            $(".modal_content").html("<img class='art' src='" + getArtUrl("getter", dataID) + "'>");
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
        resetModalParems();
        $(".itemArt").css("cursor","auto");
    })
}

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