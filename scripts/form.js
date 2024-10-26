//=======================//
//    Variables/Data     //
//=======================//

var NEW_GIFT_NAME = "";
var NEW_GIFT_DESC = "";
var CURRENT_PHASE = 0;

var NUM_OF_EX_IMG = 0;
var EX_IMG_URLS = []

var PREVIEW_IS_EDITED = false;
var PLACEHOLDER_GIFT = {};

var CURRENT_ALT_INDEX = 0;
var CURRENT_SUMMARY_LANG = 0;

var SCRIPT_LOCALE_DATA;
var HTML_LOCALE_DATA;
var SAMPLE_GIFTS;

//=================//
//    Constant     //
//=================//

var IS_ENG_FORM = checkBrowserAndSwitchLang();
// var IS_ENG_FORM = false;

var OVERWRITE = {
    switch: true,
    phase: 3
}

var members = {
    confirmed: [
        "Hazy",
        "22"
    ],
    unconfirmed: [
        "???",
        "???"
    ]
}


//==================//
//    Time Data     //
//==================//

const phases = [
    1758988740000, // new Date('2025-09-27T11:59:00').valueOf(); (EST)
    1760184000000, // new Date('2025-10-11T08:00:00').valueOf(); (EST)
    1765472340000  // new Date('2025-12-11T11:59:00').valueOf(); (EST)
];

// var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
// var today = new Date();
// var tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
// var tomorroww = new Date(new Date().setDate(new Date().getDate() + 2));

// const phases = [
//      yesterday,
//      tomorrow,
//      tomorroww
// ];


//====================//
//    Url Getters     //
//====================//

var demoUrl = "../2024/";

function getGiftUrl(gift) {
    if (CURRENT_ALT_INDEX > 0) {
        return "../" + demoUrl + "gift/" + ENTRIES.indexOf(gift) + "-" + CURRENT_ALT_INDEX + ".png";
    }
    return "../" + demoUrl + "gift/" + ENTRIES.indexOf(gift) + ".png";
}

function getProfileUrl(ocName) {
    return "../" + demoUrl + "profile/" + ENTRIES.findIndex(e => e.ocName === ocName) + ".png";
}

function getSampleGiftUrl(gift, artIndex) {
    if (artIndex > 0) {
        return "../../assets/form/sample-gift/" + SAMPLE_GIFTS.indexOf(gift) + "-" + artIndex + ".png";
    }
    return "../../assets/form/sample-gift/" + SAMPLE_GIFTS.indexOf(gift) + ".png";
}

//=========================//
//    Misc Form Events     //
//=========================//

function decideLocalization() {
    HTML_LOCALE_DATA = IS_ENG_FORM ? htmlLocaleData_EN : htmlLocaleData_CH;
    SCRIPT_LOCALE_DATA = IS_ENG_FORM ? scriptLocaleData_EN : scriptLocaleData_CH;
    PLACEHOLDER_GIFT = IS_ENG_FORM ? placehoderGift_EN : placehoderGift_CH;
    SAMPLE_GIFTS = IS_ENG_FORM ? sampleGifts_EN : sampleGifts_CH;
    if (IS_ENG_FORM) {
        removeUploaderLocale();
        $(".nav .prologue .letterDeco").css("bottom", "340px");
    }
    applyLocaleData(HTML_LOCALE_DATA);
}

function removeUploaderLocale() {
    $(".uc-stuff uc-config").each((i, el) => {
        $(el).removeAttr("locale-name");
    });
}

function setUpConfirmEvent() {
    $("#confirm").prop("checked", false);
    $('#confirm').click(function () {
        $('.submit').prop("disabled", !$(".submit").prop("disabled"));
    });
}

function setUpNavClickEvents() {
    $(".navlist li").each(function () {
        $(this).on("click", function () {
            $('.' + $(this).attr("for")).toggleClass("hiddenContent");
            $('.' + $(this).attr("for")).siblings().addClass("hiddenContent");
            $(this).siblings().removeClass("highlighted");
            $(this).toggleClass("highlighted");

            if ($(this).attr("for") === "prologue") {
                setTimeout(function () {
                    $('.letterDeco').toggleClass("hide");
                }, 150);
                setTimeout(function () {
                    $('.stamp').toggleClass("hide");
                }, 350);
            } else {
                $('.letterDeco, .stamp').addClass("hide");
            }
        })
    });
}

function setUpExtraUploadToggle() {
    $('.extraLink').click(function () {
        $('.extraUploader').toggleClass('hiddenContent');
    });
}

function setUpMembers() {
    $('.memberWrap div:nth-child(1) ul').html(members.confirmed.map(name => `<li>${name}</li>`));
    $('.memberWrap div:nth-child(2) ul').html(members.unconfirmed.map(name => `<li>${name}</li>`));
}

//==================================//
//    Settingup Timer/CountDown     //
//==================================//

function checkPhase() {
    //check which deadline is the closest one and decide the index
    CURRENT_PHASE = 1;
    for (var phase of phases) {
        if (phase > new Date().valueOf()) {
            break;
        }
        CURRENT_PHASE++;
    }
    if (OVERWRITE.switch) {
        CURRENT_PHASE = OVERWRITE.phase;
    }
}

function setUpTimer() {
    checkPhase();
    decideLocalization();
    swapToSecondForm();


    $(".giftDeadline").text(new Date(phases[0]).toLocaleString("zh").replaceAll("/", "-").replaceAll(" ", ", ").slice(0, -3));
    $(".unboxingDay").text(new Date(phases[1]).toLocaleString("zh").replaceAll("/", "-").replaceAll(" ", ", ").slice(0, -3));
    $(".receiveArtDeadline").text(new Date(phases[2]).toLocaleString("zh").replaceAll("/", "-").replaceAll(" ", ", ").slice(0, -3));
    //set deadline name
    $(".countdown_label span").html($(".deadlines ul li:nth-child(" + CURRENT_PHASE + ") span:nth-child(1)").html());

    //highlight the current deadline
    $(".deadlines ul li:nth-child(" + CURRENT_PHASE + ")").addClass("currentDeadline");

    //grab deadline
    var compareDate = new Date(phases[CURRENT_PHASE - 1]);
    if (!isNaN(compareDate)) {
        compareDate.setDate(compareDate.getDate());

        setInterval(function () {
            setTimeBetweenDates(compareDate);
        }, 500);
    }
}

function setTimeBetweenDates(toDate) {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();

    if (difference <= 0) {
        // Timer done
        clearInterval(timer);
    } else {
        var seconds = Math.floor(difference / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        hours %= 24;
        minutes %= 60;
        seconds %= 60;
        $(".days").text(days);
        $(".hours").text(hours);
        $(".minutes").text(minutes);
        $(".seconds").text(seconds);
    }
}

//===============================//
//    Setup First/Second Form    //
//===============================//

function swapToSecondForm() {
    //swap to 2nd form if it's the last phase
    if (CURRENT_PHASE > 2) {
        $('.wrapper').css("margin-bottom", 100);
        $('#giftForm').remove();
        $('.phase1').remove();
        $('.modal_content').children().remove();
        setUpArtistSelect();
        validateExchangeForm();
    } else {
        $('#exchangeForm').remove();
        $('.phase2').remove();
        validateGiftForm();
    }
}

//==========================//
//       SECOND FORM        //
//    ARTIST & OC SELECT    //
//==========================//

//setup artist drop-down
function setUpArtistSelect() {
    const artistListHtml = Object.keys(ARTISTS).map(artistName => `<option value='${artistName}'>${artistName}</option>`).join('');
    $('#artist_select option').after(artistListHtml);

    //upon selecting an artist
    $("#artist_select").on("change", function () {
        $("#artist_select option:selected").each(function () {
            $('#oc_select option:nth-child(1)').nextAll().remove();
            $('.ocIconWrapper').children('img').remove();
            $('.giftInfo').html('');
            setUpOCSelectForArtist($(this).text());
        });
    })

    $('select').on('change', function () {
        if ($(this).val().length !== 0) {
            var selectName = $(this).attr("name");;
            secondFormBorderChange(selectName, "rgb(223, 177, 92)");
        }
    });
}

//setup OC drop-down
function setUpOCSelectForArtist(artistName) {
    var artistEntries = ENTRIES.filter(e => e.artist === artistName);
    var OCListHtml = "";

    for (var artistEntry of artistEntries) {
        var ocName = artistEntry.ocName;
        OCListHtml += "<option value='" + ocName + "'>" + ocName + "</option>";
    }
    $('#oc_select option:nth-child(1)').after(OCListHtml)
    $('#oc_select').prop("disabled", false);

    $("#oc_select").on("change", function () {
        $("#oc_select option:selected").each(function () {
            if ($("#oc_select").val().length !== 0)
                printProfileAndGiftRecievedByOC($(this).text());
        });
    })

}

//setup action for when user select an OC
function printProfileAndGiftRecievedByOC(ocName) {
    var OCEntry = ENTRIES.find(e => e.ocName === ocName);
    var receivedGift = ENTRIES[OCEntry.received];
    var receivedGiftPNG = getGiftUrl(receivedGift);
    var OCprofilePNG = getProfileUrl(ocName);

    //remove other OC profile pic and insert
    $('.ocIconWrapper').children('img').remove();
    $('.2').after("<img src='" + OCprofilePNG + "' alt='selected oc'>");

    //remove other gift pic and insert
    $('.giftInfo').children('img').remove();
    $('.giftInfo').html("<div class='giftTip'>" + SCRIPT_LOCALE_DATA.yourGiftIs + " " + receivedGift.giftName + "</div>")
    $('.giftTip').after("<img class='recievedGift' src='" + receivedGiftPNG + "' alt='recieved gift'>");

    $('.recievedGift').click(function () {
        setUpRegularItemPanel(receivedGift, receivedGiftPNG);
    })
}

//border color change helper
function secondFormBorderChange(fieldName, borderColor) {
    if (fieldName == "artist_select") {
        $(".question:eq(0)").css("border-color", borderColor);
    }
    if (fieldName == "oc_select") {
        $(".question:eq(1)").css("border-color", borderColor);
        $(".question:eq(2)").css("border-color", borderColor);
    }
    if (fieldName == "final_art_url") {
        $(".question:eq(3)").css("border-color", borderColor);
    }
}

//setup standard item panel
function setUpRegularItemPanel(entry, imgUrl) {
    let itemModalHtml = `
    <div class='standardItemPanel'>
        <div class='close'></div>
        <div class='itemPanel'>
            <div class='itemArtWrap'>
                <img class='itemArt' src='${imgUrl}' alt='item' draggable='false'>
                ${entry.numOfAlt > 0 ? `<div class='itemArtList'>${Array(entry.numOfAlt + 1).fill('<span>◆</span>').join('')}</div>` : ''}
            </div>
            <div class='itemSummary'>
                <div class='langSwitch'>⇆</div>
                <div class='itemTitle'>
                    <div class='itemTitle1'>${entry.giftName}</div>
                    <div class='itemTitle2'>${entry.giftNameAlt}</div>
                </div>
                <div class='itemSummary_inner'>${entry.giftDescription}</div>
            </div>
        </div>
    </div>`;
    $(".modal_content").html(itemModalHtml);

    unhideModel();
    setUpItemTraslateToggle(entry);
    setUpGiftAltArt(entry, $(".itemArt"));
    setupExtraCloseButton(".close");

    //===========================//
    //    Simple Unhide Event    //
    //===========================//
    function unhideModel() {
        $(".modal").removeClass("hide");
        $('body').width($('body').width());
        $('body').css('overflow', 'hidden');
    }

    //==================================//
    //    Handle Item traslate Event    //
    //==================================//
    function setUpItemTraslateToggle(entry) {
        var newSummary;
        if (entry.giftDescriptionAlt.length == 0) {
            $(".langSwitch").css("display", "none");
        }
        $(".langSwitch").click(function () {
            if (CURRENT_SUMMARY_LANG === 0 && entry.giftDescriptionAlt.length > 0) {
                newSummary = entry.giftDescriptionAlt;
                CURRENT_SUMMARY_LANG = 1
            } else {
                newSummary = entry.giftDescription;
                CURRENT_SUMMARY_LANG = 0;
            }
            $(".itemSummary_inner").html(newSummary);
        });
    }

    //=============================//
    //    Handle alt art clicks    //
    //=============================//
    function setUpGiftAltArt(entry, element) {
        handleAltArtIndicator();
        element.click(function () {
            if (entry["numOfAlt"] != undefined) {
                CURRENT_ALT_INDEX = (CURRENT_ALT_INDEX < entry.numOfAlt) ? CURRENT_ALT_INDEX + 1 : 0;
                element
                    .fadeOut(130, function () {
                        element.attr('src', getGiftUrl(entry));
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
}

//==================================//
//    Settingup Form Validation     //
//==================================//

function setUpOtherValidationStyle() {
    $('input, textarea').on('focusout keyup', function () {
        //dont do the rest when input is for selftrade question or confirm
        //only do the rest when the wrapper of input is div 
        if ($(this).parent().is('div') && $(this).parent().attr("class") != "confirm") {
            var index = $(this).parent().attr("class").split(" ")[1];
            if (
                ($(".question:nth-child(" + index + ")").children().length <= 3 ||
                    $(this).siblings(".error").css("display") == "none") &&
                $(this).val().length > 0
            ) {
                //set border to normal
                //green #5d6836
                $(".question:nth-child(" + index + ")").css("border-color", "rgb(223, 177, 92)");

            } else {
                //set border to red
                if (index != 9)
                    $(".question:nth-child(" + index + ")").css("border-color", "#9e3038");
            }
        }
    });
}

function validateGiftForm() {
    $("#giftForm").validate({
        rules: {
            OCname: "required",
            gift: "required",
            gift_summary: "required",
            artist: "required",
            contact: "required",
            ocprofile_url: "required",
            gift_url: "required",
            art_url: "required"
        },
        messages: {
            OCname: SCRIPT_LOCALE_DATA.inputError,
            gift: SCRIPT_LOCALE_DATA.inputError,
            gift_summary: SCRIPT_LOCALE_DATA.inputError,
            artist: SCRIPT_LOCALE_DATA.inputError,
            contact: SCRIPT_LOCALE_DATA.inputError,
            ocprofile_url: SCRIPT_LOCALE_DATA.imageError,
            gift_url: SCRIPT_LOCALE_DATA.imageError,
            art_url: SCRIPT_LOCALE_DATA.imageError
        },
        // submitHandler: function (form) {
        //     alert("valid form submitted")
        //     return false
        // },
        invalidHandler: function (event, validator) {
            // loop thru all invalid error
            for (let name in validator.invalid) {
                var index = "0";
                // find the owner(index) of the invalid question
                // summary is a textarea not input therefore need manual setter
                if (name == "gift_summary") {
                    index = 5;
                } else {
                    index = $("input[name='" + name + "']").parent().attr("class").split(" ")[1];
                }
                $(".question:nth-child(" + index + ")").css("border-color", "#9e3038");
            }
        }
    })
}

function validateExchangeForm() {
    $("#exchangeForm").validate({
        rules: {
            artist_select: "required",
            oc_select: "required",
            final_art_url: "required"
        },
        messages: {
            artist_select: SCRIPT_LOCALE_DATA.selectError,
            oc_select: SCRIPT_LOCALE_DATA.selectError,
            final_art_url: SCRIPT_LOCALE_DATA.imageError
        },
        // submitHandler: function (form) {
        //     alert("valid form submitted")
        //     return false
        // },
        invalidHandler: function (event, validator) {
            // loop thru all invalid error
            for (let name in validator.invalid) {
                //since there's only 3 question, manually setting red border this time
                secondFormBorderChange(name, "#9e3038");
            }
        }
    })
}

//====================================//
//    Image Upload Event Handling     //
//====================================//

function displayImageUploadSuccessMsg(e, parentDiv) {
    console.log("IMAGE UPLOAD SUCCESS");

    //set success message
    var succHtml =
        SCRIPT_LOCALE_DATA.uploadSuccess + '<img src="' + e.detail.cdnUrl + '">';
    $('.' + parentDiv + ' .uploadResult').html(succHtml);

    //fill the hidden text input
    $('.' + parentDiv + ' input').val(e.detail.cdnUrl);

    //clean up upload error
    $('.' + parentDiv + ' .error').html('');
    $("." + parentDiv).css("border-color", "rgb(223, 177, 92)");
}

function displayMultiImageUploadSuccessMsg(e) {
    console.log("MULTI-IMAGE UPLOAD SUCCESS");
    NUM_OF_EX_IMG++;
    EX_IMG_URLS.push(e.detail.cdnUrl);
    var urlsToSend = "";
    var succHtml = SCRIPT_LOCALE_DATA.mutiUploadSuccess[0] + NUM_OF_EX_IMG + SCRIPT_LOCALE_DATA.mutiUploadSuccess[1];
    for (let url of EX_IMG_URLS) {
        succHtml += '<img src="' + url + '">';
        urlsToSend += url + ", ";
    }
    $('.multiUploadResult').html(succHtml);

    //check the hidden check input
    $('.multiUploadResult').siblings("input").val(urlsToSend);
}

//========================//
//    Settingup Modal     //
//========================//
function setUpClickModalEvents(panelName) {
    $('span[for="' + panelName + '"]').each(function () {
        $(this).click(function () {
            //set item html if it's item panel
            if (panelName.includes("Item")) {
                setupItemModalHtml();
            } else if (panelName.includes("Gift")) {
                setupSampleGiftModalHtml(SAMPLE_GIFTS);
            }

            //unhide modal
            $(".modal").removeClass("hide");

            //unhide panel
            setTimeout(function () {
                $("." + panelName).removeClass("fadeDown");
            }, 10);

            //hide other panel
            $("." + panelName).siblings().addClass("fadeDown");

            //delay display adjustment
            $("." + panelName).removeAttr('style')
            setTimeout(function () {
                $("." + panelName).siblings().css("display", "none")
            }, 250);

            //unhide sample gifts
            setTimeout(function () {
                for (var i = 0; i < SAMPLE_GIFTS.length; i++) {
                    $(".sampleGiftPanel ul li:nth-child(" + (i + 1) + ")")
                        .css("opacity", "1");
                }
            }, 10);

            // $(document.body).addClass("noscroll");
            $('body').width($('body').width());
            $('body').css('overflow', 'hidden');
        });
    });
}

function setupExtraCloseButton(className) {
    $(className).click(function () {
        if (PREVIEW_IS_EDITED) {
            $(".modal2").removeClass("hide");
        } else {
            closeModals();
        }
    })
}

function setupCloseModalEvents() {
    //for regular modal close
    $(".modal_bg").click(function () {
        if (PREVIEW_IS_EDITED) {
            $(".modal2").removeClass("hide");
        } else {
            closeModals();
            CURRENT_ALT_INDEX = 0;
            CURRENT_SUMMARY_LANG = 0;
        }
    })
    //IF USER CLICKS NO ON PREVIEW CONFIRM
    $('.confirmEdit div span:nth-child(1)').click(function () {
        $(".modal2").addClass("hide");
        PREVIEW_IS_EDITED = false;
        closeModals();
    });
    //IF USER CLICKS YES ON PREVIEW CONFIRM
    $('.confirmEdit div span:nth-child(2)').click(function () {
        $(".modal2").addClass("hide");
        PREVIEW_IS_EDITED = false;
        closeModals();
        applyDataToForm(NEW_GIFT_NAME, NEW_GIFT_DESC);
    });

}

function closeModals() {
    $(".modal").addClass("hide");
    $(".modal_content >div").addClass("fadeDown");
    // $(document.body).removeClass("noscroll");
    setTimeout(function () {
        $(".modal_content").children().css("display", "none")
        $('body').removeAttr('style')
    }, 250);
}

//====================================//
//    Settingup Preview Modal HTML    //
//====================================//
function setupItemModalHtml() {

    var previewData = setPreviewDataFromForm();

    let itemModalHtml = `
        <div class='close'></div>
        <div class='itemPanel'>
            <!-- ====== item art ====== -->
            <div class='itemArtWrap'>
                <div class='noImage itemArt'>
                    <div>${SCRIPT_LOCALE_DATA.noImage}</div>
                </div>
                <input class='hiddenSelectButton' type='file' accept='.png' style='display: none;'>
                <div class='selectImageButton'>${SCRIPT_LOCALE_DATA.chooseImage}</div>
            </div>
            <!-- ====== item summary ====== -->
            <div class='itemSummary'>
                <div class='itemTitle'>
                    <div class='itemTitle1'>
                        <div class='editable'><span>${previewData.giftName}</span></div>
                    </div>
                    <div class='itemTitle2'>
                        <div class='editable'><span>${PLACEHOLDER_GIFT.giftNameAlt}</span></div>
                    </div>
                </div>
                <div class='itemSummary_inner'>
                    <div class='editableTextArea'><span>${simpleMarkdownToHTML(previewData.giftDescription)}</span></div>
                </div>
            </div>
        </div>
    `;

    $(".previewItemPanel").html(itemModalHtml);

    setUpPreviwInputs(previewData);
    setUpPreviwTextArea(previewData);
    setUpFakeUpload();
    setupExtraCloseButton(".close");
}

function setPreviewDataFromForm() {
    var previewData = {
        giftName: "",
        giftNameAlt: "",
        giftDescription: ""
    };
    previewData.giftName = $('.3 input').val() ? $('.3 input').val() : PLACEHOLDER_GIFT.giftName;
    previewData.giftDescription = $('.5 textarea').val() ? $('.5 textarea').val() : PLACEHOLDER_GIFT.giftDescription;
    return previewData;
}

function applyDataToForm(giftName, giftDesc) {
    $('.3 input').val(giftName);
    $('.5 textarea').val(giftDesc);
}

//==========================//
//    For Preview Inputs    //
//==========================//
function setUpPreviwInputs(previewData) {
    $(".editable span").click(function (event) {
        var span = $(this);
        var text = span.text();
        span.css("display", "none");

        $("<input></input>").insertBefore(span);
        var input = $(this).siblings("input");
        input.val(span.text());
        input.attr("type", "text");
        input.attr("size", span.text().length + 5);
        input.keypress(function (e) {
            if (e.which == 13) {
                input.blur();
            }
        });
        input.focus();
        input.blur(function () {
            if (input.val() !== text) {
                NEW_GIFT_NAME = input.val();
                PREVIEW_IS_EDITED = true;
            }
            input.remove();
            span.css("display", "inline");
            span.html(input.val() == "" ? "?" : input.val())
        });
    });
}

function setUpPreviwTextArea(previewData) {
    NEW_GIFT_DESC = previewData.giftDescription;
    $(".editableTextArea").click(function (event) {
        var span = $(this);
        span.css("display", "none");

        $("<textarea></textarea>").insertBefore(span);
        $("<div class='tip'>" + SCRIPT_LOCALE_DATA.editTip + "</div>").insertAfter(span);
        var ta = $(this).siblings("textarea");

        ta.val(NEW_GIFT_DESC);
        ta.attr("row", "15");
        ta.attr("col", "100");
        ta.focus();
        ta.blur(function () {
            if (ta.val() !== "")
                NEW_GIFT_DESC = ta.val();
            if (NEW_GIFT_DESC !== previewData.giftDescription) {
                PREVIEW_IS_EDITED = true;
            }
            $(".itemSummary_inner .tip").remove();
            ta.remove();
            span.css("display", "inline");
            span.html(simpleMarkdownToHTML(NEW_GIFT_DESC))
        });
    });
}

//REF: https://jsfiddle.net/ugPDx/
function setUpFakeUpload() {
    $('.selectImageButton').click(function () {
        $('.hiddenSelectButton').click();
    });

    $(".hiddenSelectButton").change(function (e) {
        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
            var file = e.originalEvent.srcElement.files[i];
            var img = document.createElement("img");
            var reader = new FileReader();
            reader.onloadend = function () {
                img.src = reader.result;
                img.className = "itemArt";
            }
            reader.readAsDataURL(file);
            $(".itemArtWrap img").remove();
            $(".noImage").remove();
            $(".selectImageButton").before(img);
        }
    });
}

var SAMPLE_ART_INDEX = [0, 0, 0];

//========================================//
//    Settingup Sample Gift Modal HTML    //
//========================================//

function setupSampleGiftModalHtml(entries) {

    let sampleGiftModalHtml = `
    <div>
        ${SCRIPT_LOCALE_DATA.sampleGiftTitle}
        <div class="miniClose no-select">[x]</div>
    </div>
    <ul>
        ${entries.map(entry => `
            <li>
                <div class="itemArtIndicatorList">
                    ${entry.numOfAlt > 0 ? `<div>${Array(entry.numOfAlt + 1).fill("<span>◆</span><br>").join('')}</div>` : ''}
                </div>
                <img class="sampleItemArt" src="${getSampleGiftUrl(entry, 0)}" alt="gift">
                <div class="sampleContent">
                    <div class="giftName">${entry.giftName}</div>
                    <div class="giftDesc">${simpleMarkdownToHTML(entry.giftDescription)}</div>
                </div>
            </li>
        `).join('')}
    </ul>`;


    $(".sampleGiftPanel").html(sampleGiftModalHtml);
    $(".sampleItemArt").each(function (index) {
        setUpMiniAltArt(entries[index], $(this), index);
    });

    for (var i = 0; i < entries.length; i++) {
        $(".sampleGiftPanel ul li:nth-child(" + (i + 1) + ")")
            .css("transition-delay", i * 0.12 + "s");
    }
    setupExtraCloseButton(".miniClose");

    //==================================//
    //    Handle mini alt art clicks    //
    //==================================//
    function setUpMiniAltArt(entry, element, sampleIndex) {
        handleMiniAltArtIndicator(element, sampleIndex);

        element.click(function () {
            if (entry["numOfAlt"] != undefined) {
                SAMPLE_ART_INDEX[sampleIndex] = (SAMPLE_ART_INDEX[sampleIndex] < entry.numOfAlt) ? SAMPLE_ART_INDEX[sampleIndex] + 1 : 0;
                element
                    .fadeOut(130, function () {
                        element.attr('src', getSampleGiftUrl(entry, SAMPLE_ART_INDEX[sampleIndex]));
                        handleMiniAltArtIndicator(element, sampleIndex);
                    })
                    .fadeIn(130);
            }
        })
    }
    function handleMiniAltArtIndicator(e, i) {
        e.siblings(".itemArtIndicatorList").children().children("span:eq(" + SAMPLE_ART_INDEX[i] + ")").css('color', 'white');
        e.siblings(".itemArtIndicatorList").children().children("span:not(:eq(" + SAMPLE_ART_INDEX[i] + "))").css('color', 'rgba(0, 0, 0, 0.4)');
    }
}

//==============================//
//     Browser Lang Function    //
//==============================//

function checkBrowserAndSwitchLang() {
    var language = window.navigator.userLanguage || window.navigator.language;
    switch (language) {
        case "zh":
        case "zh-CN":
        case "zh-HK":
        case "zh-TW":
            return false;
        default:
            return true;
    }
}


//======================//
//                      //
//    Ready Function    //
//                      //
//======================//

$(document).ready(function () {
    setUpTimer();
    setUpConfirmEvent();
    setUpMembers();
    setUpNavClickEvents();
    setUpOtherValidationStyle();
    setUpExtraUploadToggle();
    setUpClickModalEvents("giftRulePanel");
    setUpClickModalEvents("previewItemPanel");
    setUpClickModalEvents("sampleGiftPanel");
    setupCloseModalEvents();
});