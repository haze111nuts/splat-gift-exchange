//=======================//
//    Variables/Data     //
//=======================//

var NEW_GIFT_NAME = "";
var NEW_GIFT_DESC = "";
var CURRENT_PHASE = 0;

var NUM_OF_EX_IMG = 0;
var EX_IMG_URLS = []

var PREVIEW_IS_EDITED = false;
var IS_ENG_FORM = false;
var SCRIPT_LOCAL_DATA = {};
var PLACEHOLDER_GIFT = {};

var CURRENT_ALT_INDEX = 0;
var CURRENT_SUMMARY_LANG = 0;


//=================//
//    CONSTANT     //
//=================//

var LOCAL_DATA = htmlLocalData_EN;

var OVERWRITE = {
    switch: true,
    phase: 1
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

//=======================//
//    Localizer Data     //
//=======================//

var localData_CH = {
    sampleGiftTitle: "禮物範本",
    editTip: "點框外任意一處結束修改",
    chooseImage: "選張圖片",
    noImage: "尚無圖片<br>可以按下方按鈕選圖<br>※此圖並不會被上傳",
    uploadSuccess: "成功上傳了1張圖",
    mutiUploadSuccess: ["成功上傳了", "張圖"],
    inputError: "有東西沒填！",
    selectError: "有東西沒選！",
    imageError: "請提供圖片！",
    yourGiftIs: "這個OC抽到的禮物是："
}

var localData_EN = {
    sampleGiftTitle: "Sample Gifts",
    editTip: "Click anywhere outside to end edit",
    chooseImage: "Choose Image",
    noImage: "Select Image from the button below<br>*This image will not get uploaded",
    uploadSuccess: "Successfully upload 1 image!",
    mutiUploadSuccess: ["Successfully upload ", " image!"],
    inputError: "This field is required!",
    selectError: "A selection is required!",
    imageError: "An image is required!",
    yourGiftIs: "The gift this OC recieved is:"
}

//=========================//
//    Placeholder Data     //
//=========================//

var placehoderGift_CH = {
    giftName: "按我改禮物名",
    giftNameAlt: "Gift Name",
    giftDescription: "按這裡可以寫解釋，*字數不限*。\n可以用的語法：\n1. **粗體**\n2. *斜體*\n3. ~~刪除線~~\n4. [URL](#)\n也可以用普通清單\n- 請大家發揮創意\n- 也可以寫小卡片喔"
}
var placehoderGift_EN = {
    giftName: "Click to Edit Gift Name",
    giftNameAlt: "禮物名",
    giftDescription: "Click here to write gift summary.\n\nyou can write about things like what's included in the gift, what kind of texture this object has, what are the material used, or how it can be used..etc."
}

//=========================//
//    Sample Gift Data     //
//=========================//

var sampleGifts = [
    {
        giftName: "神秘的招財生物",
        giftNameAlt: "Mysterious Lucky Creature",
        giftDescription: "一個神秘生物的小雕像。只要有光，他的一隻手掌就會開始不斷擺動，而且還會發出難以解釋的奇怪叫聲。除了招財以外，也許還會招來什麼其他生物也說不定。"
    },
    {
        giftName: "可疑的零錢包",
        giftNameAlt: "Suspicious Wallet",
        giftDescription: "一個形狀非常特別，像太空人一樣的錢包。把錢包的拉鍊拉開後可以看到內有尖牙和血盆大口，真不知道做這個錢包的廠商是抱著什麼心態去設計的。\n據說把錢放在裡面就會拿不出來…真是太可疑了！",
        numOfAlt: 1
    },
    {
        giftName: "奇怪的平底鍋",
        giftNameAlt: "Seal Frying Pan",
        giftDescription: "一個看似普通的平底鍋，中間有隻倒過來的海豹公仔，也不知道是用來做什麼的，似乎拿不起來的樣子，看來只能直接這樣使用了。\n另外，這平底鍋似乎有些奇怪的功能：\n- 當這個平底鍋預熱完成時，海豹的眼睛會發出紅光。\n- 甩動這個平底鍋時，海豹似乎會發出一些「揪揪！」或是「吃肉！」的怪聲。\n\n當你把這平底鍋洗好拿去倒扣晾乾時，看起來就像海豹頂著一個巨大的平底鍋。",
        numOfAlt: 1
    }
]

//====================//
//    URL GETTERS     //
//====================//

function getGiftUrl(gift) {
    if (CURRENT_ALT_INDEX > 0) {
        return "../gift/" + ENTRIES.indexOf(gift) + "-" + CURRENT_ALT_INDEX + ".png";
    }
    return "../gift" + ENTRIES.indexOf(gift) + ".png";
}

function getProfileUrl(ocName) {
    return "../profile/" + ENTRIES.findIndex(e => e.ocName === ocName) + ".png";
}

function getSampleGiftUrl(gift, artIndex) {
    if (artIndex > 0){
        return "../../assets/form/sample-gift/" + sampleGifts.indexOf(gift) + "-" + artIndex + ".png";
    }
    return "../../assets/form/sample-gift/" + sampleGifts.indexOf(gift) + ".png";
}

//=========================//
//    Misc Form Events     //
//=========================//

function decideLocalization() {
    if ($('head title').text().includes("Gift")) {
        IS_ENG_FORM = true;
    }
    SCRIPT_LOCAL_DATA = IS_ENG_FORM ? localData_EN : localData_CH;
    PLACEHOLDER_GIFT = IS_ENG_FORM ? placehoderGift_EN : placehoderGift_CH;
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
    if(OVERWRITE.switch){
        CURRENT_PHASE = OVERWRITE.phase;
    }
}

function setUpTimer() {
    checkPhase();
    swapToSecondForm();
    applyLocalData(LOCAL_DATA);

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
    $('.giftInfo').html("<div class='giftTip'>" + SCRIPT_LOCAL_DATA.yourGiftIs + " " + receivedGift.giftName + "</div>")
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
    var itemModalHtml = "";
    itemModalHtml += "<div class='standardItemPanel'>";
    itemModalHtml += "<div class='close'>" + "</div>";
    itemModalHtml += "<div class='itemPanel'>";
    itemModalHtml += "<div class='itemArtWrap'>";
    itemModalHtml += "<img class='itemArt' src='" + imgUrl + "' alt='item' draggable='false' >";
    if (entry.numOfAlt > 0) {
        itemModalHtml += "<div class='itemArtList'>";
        for (let i = 0; i < entry.numOfAlt + 1; i++) {
            itemModalHtml += "<span>◆</span>";
        }
        itemModalHtml += "</div>";
    }
    itemModalHtml += "</div>";
    itemModalHtml += "<div class='itemSummary'>";
    itemModalHtml += "<div class='langSwitch'>" + "⇆" + "</div>";
    itemModalHtml += "<div class='itemTitle'>";
    itemModalHtml += "<div class='itemTitle1'>" + entry.giftName + "</div>";
    itemModalHtml += "<div class='itemTitle2'>" + entry.giftNameAlt + "</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "<div class='itemSummary_inner'>" + entry.giftDescription + "</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "</div>";
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
            OCname: SCRIPT_LOCAL_DATA.inputError,
            gift: SCRIPT_LOCAL_DATA.inputError,
            gift_summary: SCRIPT_LOCAL_DATA.inputError,
            artist: SCRIPT_LOCAL_DATA.inputError,
            contact: SCRIPT_LOCAL_DATA.inputError,
            ocprofile_url: SCRIPT_LOCAL_DATA.imageError,
            gift_url: SCRIPT_LOCAL_DATA.imageError,
            art_url: SCRIPT_LOCAL_DATA.imageError
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
            artist_select: SCRIPT_LOCAL_DATA.selectError,
            oc_select: SCRIPT_LOCAL_DATA.selectError,
            final_art_url: SCRIPT_LOCAL_DATA.imageError
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
        SCRIPT_LOCAL_DATA.uploadSuccess + '<img src="' + e.detail.cdnUrl + '">';
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
    var succHtml = SCRIPT_LOCAL_DATA.mutiUploadSuccess[0] + NUM_OF_EX_IMG + SCRIPT_LOCAL_DATA.mutiUploadSuccess[1];
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
                setupSampleGiftModalHtml(sampleGifts);
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
                for (var i = 0; i < sampleGifts.length; i++) {
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
    console.log("close");
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

    var itemModalHtml = "";
    itemModalHtml += "<div class='close'>" + "</div>";
    itemModalHtml += "<div class='itemPanel'>";

    // ====== item art ======
    itemModalHtml += "<div class='itemArtWrap'>";
    itemModalHtml += "<div class='noImage itemArt'>";
    itemModalHtml += "<div>" + SCRIPT_LOCAL_DATA.noImage + "</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "<input class='hiddenSelectButton' type='file' accept='.png' style='display: none;' >";
    itemModalHtml += "<div class='selectImageButton'>" + SCRIPT_LOCAL_DATA.chooseImage + "</div>";
    itemModalHtml += "</div>";
    // ====== item summary ======
    itemModalHtml += "<div class='itemSummary'>";
    itemModalHtml += "<div class='itemTitle'>";
    itemModalHtml += "<div class='itemTitle1'>";
    itemModalHtml += "<div class='editable'><span>" + previewData.giftName + "</span></div>";
    itemModalHtml += "</div>";
    itemModalHtml += "<div class='itemTitle2'>";
    itemModalHtml += "<div class='editable'><span>" + PLACEHOLDER_GIFT.giftNameAlt + "</span></div>";
    itemModalHtml += "</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "<div class='itemSummary_inner'>";
    itemModalHtml += "<div class='editableTextArea'><span>" + simpleMarkdownToHTML(previewData.giftDescription) + "</span></div>";
    itemModalHtml += "</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "</div>";
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
        $("<div class='tip'>" + SCRIPT_LOCAL_DATA.editTip + "</div>").insertAfter(span);
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

var SAMPLE_ART_INDEX = [0,0,0];

//========================================//
//    Settingup Sample Gift Modal HTML    //
//========================================//

function setupSampleGiftModalHtml(entries) {
    var sampleGiftModalHtml = "";
    sampleGiftModalHtml += '<div>' + SCRIPT_LOCAL_DATA.sampleGiftTitle + '<div class="miniClose no-select">[x]</div></div>';
    sampleGiftModalHtml += '<ul>';
    for (let entry of entries) {
        sampleGiftModalHtml += '<li>';
        sampleGiftModalHtml += '<div class="itemArtList">';
        if (entry.numOfAlt > 0) {
            sampleGiftModalHtml += "<div class='itemArtList'>";
            for (let i = 0; i < entry.numOfAlt + 1; i++) {
                sampleGiftModalHtml += "<span>◆</span><br>";
            }
            sampleGiftModalHtml += "</div>";
        }
        sampleGiftModalHtml += '</div>';
        sampleGiftModalHtml += '<img class="sampleItemArt" src="' + getSampleGiftUrl(entry, 0) + '" alt="gift">';
        sampleGiftModalHtml += '<div class="sampleContent">';
        sampleGiftModalHtml += '<div class="giftName">';
        sampleGiftModalHtml += entry.giftName;
        sampleGiftModalHtml += '</div>';
        sampleGiftModalHtml += '<div class="giftDesc">';
        sampleGiftModalHtml += simpleMarkdownToHTML(entry.giftDescription);
        sampleGiftModalHtml += '</div>';
        sampleGiftModalHtml += '</div>';
        sampleGiftModalHtml += '</li>';
    }
    sampleGiftModalHtml += '</ul>';
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
                        element.attr('src', getSampleGiftUrl(entry,SAMPLE_ART_INDEX[sampleIndex]));
                        handleMiniAltArtIndicator(element, sampleIndex);
                    })
                    .fadeIn(130);
            }
        })
    }
    function handleMiniAltArtIndicator(e, i) {
        e.siblings(".itemArtList").children().children("span:eq("+SAMPLE_ART_INDEX[i]+")").css('color', 'white');
        e.siblings(".itemArtList").children().children("span:not(:eq("+SAMPLE_ART_INDEX[i]+"))").css('color', 'rgba(0, 0, 0, 0.4)');
    }
}

//======================//
//                      //
//    Ready Function    //
//                      //
//======================//

$(document).ready(function () {
    decideLocalization();
    setUpTimer();
    setUpConfirmEvent();
    setUpNavClickEvents();
    setUpOtherValidationStyle();
    setUpExtraUploadToggle();
    setUpClickModalEvents("giftRulePanel");
    setUpClickModalEvents("previewItemPanel");
    setUpClickModalEvents("sampleGiftPanel");
    setupCloseModalEvents();
});