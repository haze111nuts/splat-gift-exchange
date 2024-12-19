//========================//
//    Custom Variables    //
//========================//

var YEAR = "0000";

//============================//
//    Functional Variables    //
//============================//

var displayGroup = "sender";
var documentHeight = 0;
var scrollPos = 0;

//===================//
//    URL Getters    //
//===================//

function assetBaseUrl(fileName) {
    return `../assets/gallery/${fileName}`;
}

function getArtUrl(group, id) {
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
        setFlipDelay();
        if (displayGroup === "sender") {
            //set to getter
            $(".cardInner").css("transform", "rotateY(180deg)");
            displayGroup = "getter";
            $("body").addClass("night");
            $("body").removeClass("day");

            $(".exchangeIcon").css("left", "200px");
            $(".exchangeBar_active").css("width", "284px");
            $(".exchangeIcon img").attr('src', assetBaseUrl("changeIcon_open.png"));

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

    let gridHtml = obtainedGifts2024.map((ocIndex, i) => `
    <li class="grid-item">
        <div class="card">
            <div class="cardBG"></div>
            <div class="cardInner">
                ${['cardFront', 'cardBack'].map(side => `
                    <div class="${side}" data-id="${side == 'cardFront' ? ocIndex : ENTRIES.findIndex(entry => entry.received === Number(ocIndex))}">
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
    img.onload = function () {
        // Image is valid, set as background
        $(element).css('background-image', `url(${imageUrl})`);
    };
    img.onerror = function () {
        // Image failed to load, set placeholder
        $(element).css('background-image', `url(${placeholderUrl})`);
    };
    img.src = imageUrl; // Trigger the load
}


function setUpGridStyle(obtainedGifts2024) {
    var i = 0;
    for (var ocIndex of obtainedGifts2024) {
        //set image for each grid item
        setBackgroundImage(".grid-item:nth-child(" + (i + 1) + ") .cardFront .previewInner",
            getArtUrl("sender", ocIndex),
            getPlaceholderArt());

        setBackgroundImage(".grid-item:nth-child(" + (i + 1) + ") .cardBack .previewInner",
            getArtUrl("getter", ENTRIES.findIndex(entry => entry.received === Number(ocIndex))),
            getPlaceholderArt());
        i++;
    }
}

function setFlipDelay() {
    for (var i = 0; i < obtainedGiftData.split(",").length; i++) {
        // delay style for each grid tem
        $(".grid-item:nth-child(" + (i + 1) + ") .cardInner")
            .css("transition-delay", i * getFlipDelay() + "s");
    }
}

function getFlipDelay() {
    if (scrollPos / documentHeight > 0.45) {
        return 0.01;
    }
    return 0.03;
}

//============================//
//    Settingup Item Modal    //
//============================//

function setUpItemModalClickEvents() {
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
            <div class='close'></div>
            <div class='art_wrap'>
                <img class='art' src='${getArtUrl("sender", dataID)}' alt='art' onerror='this.onerror=null; this.src="${getPlaceholderArt()}";'>
                <div class='author'>
                    <div>${ENTRIES[dataID].giftName} from ${ENTRIES[dataID].ocName}</div>
                    <div>by ${getArtistLinkRef(ENTRIES[dataID].artist)}</div>
                </div>
            </div>`;
            $(".modal_content").html(modalHtml);
            hideScrollBar();
            applyExtraModalStyle(dataID);
            setupCloseModalEvents();
        })
    })
    $(".cardBack").each(function () {
        $(this).click(function () {
            var dataID = $(this).data().id;
            $(".modal").removeClass("hide");
            let modalHtml = `
            <div class='close'></div>
            <div class='art_wrap'>
                <img class='art' src='${getArtUrl("getter", dataID)}' alt='art' onerror='this.onerror=null; this.src="${getPlaceholderArt()}";'>
                <div class='author'>
                    <div>${ENTRIES[$(this).siblings().data().id].giftName} x ${ENTRIES[dataID].ocName}</div>
                    <div>by ${getArtistLinkRef(ENTRIES[dataID].artist)}</div>
                </div>
            </div>`;
            $(".modal_content").html(modalHtml);
            hideScrollBar();
            applyExtraModalStyle(dataID);
            setupCloseModalEvents();
        })
    })
}

function applyExtraModalStyle(dataID) {
    forceSetArtHeight();
    const img = new Image();
    img.onload = function () {
        $(".art_wrap").css("max-width", (this.width / this.height) * 750);
    }
    img.src = getArtUrl(displayGroup, dataID);
}

function getArtistLinkRef(artistName) {
    if (ARTISTS[artistName].link) {
        return `<a href='${ARTISTS[artistName].link}' target='_blank'>${artistName}</a>`
    } else
        return artistName
}

//===================================//
//    Settingup Modal Close Event    //
//===================================//

function setupCloseModalEvents() {
    $(".modal_bg, .close").click(function () {
        $(".modal").addClass("hide");
        //$(document.body).removeClass("noscroll");
        resetScrollBar();
        resetModalParems();
        $(".itemArt").css("cursor", "auto");
    })
}

//==================//
//    Other Stuff   //
//==================//

function hideScrollBar() {
    //prevent body content to shift right when scrollbar is gone
    $('body').width($('body').width());
    $('body').css('overflow', 'hidden');
    // $('.modal').css('display', 'block');
}

function resetScrollBar() {
    //fix slight position bump caused by scroll bar
    setTimeout(
        function () {
            $('body').removeAttr('style')
        }, 250);
}

function calculateLoadProgress() {
    let resourcesLoaded = 0;
    let totalResources = $('img, link[rel="stylesheet"], script').length;

    $('img, link[rel="stylesheet"], script').each(function () {
        $(this).on('load error', function () {
            resourcesLoaded++;
            // console.log(resourcesLoaded + "/" +totalResources)
            // 41/52??
            let percentage = (resourcesLoaded / (totalResources)) * 100;
            $('.progressbar div').width(percentage + '%');
        });
    });
}

function setupStuff() {
    generateGrid();
    setUpFlipToggle();
    setUpArtModalClickEvents();
    setUpItemModalClickEvents();
}

function forceSetArtHeight() {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width()
    if (windowHeight < 820 && windowWidth>windowHeight) {
        $(".author").css("font-size", '16px');            
        $(".art_wrap").css("width", "unset");
        $(".art").css("width", "auto");
        $(".art").css("height", (windowHeight - 60) + "px");
    }else {
        $(".art_wrap").css("width", "100%");
        $(".art").css("height", "unset");
        $(".author").css("font-size", '20px');
    }
}

function removeLoaderScreen() {
    $('#loadingScreen').fadeOut();
    setTimeout(
        function () {
            $(".streamLink img").addClass("animateOnce");
        }, 1000);
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

    //Scroll watcher
    documentHeight = $(document).height();
    $(window).scroll(function () {
        scrollPos = $(this).scrollTop();
    });

    //Handle window with tiny height
    $(window).resize(() =>
        forceSetArtHeight()
    ).resize();

    //Initial loader logic
    $(window).on('load', () => removeLoaderScreen())
    //In case the loader takes too long
    setTimeout(removeLoaderScreen, 12 * 1000);
    calculateLoadProgress();
});