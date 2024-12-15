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

function getPlaceholderArt() {
    return "../assets/gallery/noart.png"
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
    var obtainedGifts2024 = obtainedGiftData.split(",");
    var arrangement2024 = ocArrangementData.split(",");

    let gridHtml = obtainedGifts2024.map((ocIndex, i) => `
    <li class="grid-item">
        <div class="card">
            <div class="cardBG"></div>
            <div class="cardInner">
                ${['cardFront', 'cardBack'].map(side => `
                    <div class="${side}" data-id="${side=='cardFront'?ocIndex:arrangement2024[obtainedGifts2024.indexOf(ocIndex)]}">
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
    setUpGridStyle(obtainedGifts2024);
}


function setBackgroundImage(element, imageUrl, placeholderUrl) {
    const img = new Image();
    img.onload = function() {
        // Image is valid, set as background
        $(element).css('background-image', `url(${imageUrl})`);
    };
    img.onerror = function() {
        // Image failed to load, set placeholder
        $(element).css('background-image', `url(${placeholderUrl})`);
    };
    img.src = imageUrl; // Trigger the load
}


function setUpGridStyle(obtainedGifts2024) {
    var i = 0 ;
    var arrangement2024 = ocArrangementData.split(",");
    for (var ocIndex of obtainedGifts2024) {
        //set image for each grid item
        setBackgroundImage( ".grid-item:nth-child(" + (i + 1) + ") .cardFront .previewInner",
                            getArtUrl("sender", ocIndex), 
                            getPlaceholderArt() );

        setBackgroundImage( ".grid-item:nth-child(" + (i + 1) + ") .cardBack .previewInner",
                            getArtUrl("getter", arrangement2024[obtainedGifts2024.indexOf(ocIndex)]), 
                            getPlaceholderArt() );

        // delay style for each grid tem
        $(".grid-item:nth-child(" + (i + 1) + ") .cardInner")
        .css("transition-delay", i * 0.02 + "s");
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
                <img class='art' src='${getArtUrl("sender", dataID)}' alt='art' onerror='this.onerror=null; this.src="${getPlaceholderArt()}";'>
                <div class='author'>
                    ${ENTRIES[dataID].giftName} from ${ENTRIES[dataID].ocName}<br>
                    <span>By ${getArtistLinkRef(ENTRIES[dataID].artist)}</span>
                </div>
            </div>`;
            $(".modal_content").html(modalHtml);
            hideScrollBar();
            applyExtraModalStyle(dataID);
        })
    })
    $(".cardBack").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            $(".modal").removeClass("hide");
            let modalHtml = `
            <div class='art_wrap'>
                <img class='art' src='${getArtUrl("getter", dataID)}' alt='art' onerror='this.onerror=null; this.src="${getPlaceholderArt()}";'>
                <div class='author'>
                    ${ENTRIES[$(this).siblings().data().id].giftName} x ${ENTRIES[dataID].ocName}<br>
                    <span>By ${getArtistLinkRef(ENTRIES[dataID].artist)}</span>
                </div>
            </div>`;
            $(".modal_content").html(modalHtml);
            hideScrollBar();
            applyExtraModalStyle(dataID);
        })
    })
    setupCloseModalEvents();
}

function applyExtraModalStyle(dataID) {
    const img = new Image();
    img.onload = function () {
        console.log(this.width + 'x' + this.height);
        $(".art_wrap").css("max-width" , (this.width/this.height)*750 );
    }
    img.src = getArtUrl(displayGroup,dataID);
}

function getArtistLinkRef(artistName){
    if(ARTISTS[artistName].link){
        return `<a href='${ARTISTS[artistName].link}' target='_blank'>${artistName}</a>`
    }else
        return artistName
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