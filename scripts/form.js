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
var LOCAL_DATA = {};
var PLACEHOLDER_GIFT = {};

var CURRENT_ALT_INDEX = 0;
var CURRENT_SUMMARY_LANG = 0;

var DATA_YEAR = 2024;

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
    editTip: "可以用Discord部分語法做裝飾",
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
    editTip: "You can use certain Discord Markdowns",
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
    giftDescription: "按這裡可以寫解釋，例如禮物詳細內容物、外觀材質或用途等，有助於抽到者理解禮物，字數不限，**越詳細越好**！\n\n也可以附上圖片或是URL，主持人會幫你整理內文跟排版。"
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
        ocName: "綾里春美",
        giftName: "倉院特產饅頭",
        giftNameAlt: "Kurain Buns",
        giftDescription: "倉院之里的特產栗子饅頭。每個饅頭都是勾玉形狀﹐有經過某位靈媒的祈禱加持﹐據說吃下去可以補充靈力。",
        numOfAlt: 2,
        artist: "2"
    },
    {
        ocName: "王泥喜法介",
        giftName: "折疊式天文望遠鏡",
        giftNameAlt: "Portable Telescope",
        giftDescription: "口徑7公分、長為26公分的迷你形望遠鏡。有20mm和10mm的數位轉接目鏡和手機攝影轉接架﹐還附有簡易天文觀測指南。除了拿來觀星賞月以外﹐似乎也很適合拿來賞鳥或是湖中的不明生物。",
        artist: "4"
    },
    {
        ocName: "希月心音",
        giftName: "碰可玩具機器人",
        giftNameAlt: "PONCO Toy Robot",
        giftDescription: "大河原宇宙中心的最新紀念品﹐1/8比例的多功能碰可玩具機器人﹐有著跟原物一樣的人工智能﹐可以透過聲控來做為日常的小幫手。有附一個機器人充電台。<br><b>功能：</b><ul><li>鬧鐘、備忘錄、上網查詢資料等通知等日常實用機能。</li><li>用專用的手機app跟這個機器人連動的話﹐可以跟它玩小遊戲。</li><li>帶去大河原宇宙中心的話，可以當作迷你導覽。</li><li>為了人類發展的未來，偶爾會推薦你捐錢給大河原宇宙中心。</li></ul>有一些跟<a href='https://www.amazon.com/b?node=18354642011' target='_blank'>ALEXA</a>類似的功能",
        artist: "5"
    }
]

//====================//
//    Misc Events     //
//====================//

function decideLocalization(){
    if($('head title').text().includes("Gift")){
        IS_ENG_FORM = true;
    }
    LOCAL_DATA = IS_ENG_FORM?localData_EN:localData_CH;
    PLACEHOLDER_GIFT = IS_ENG_FORM?placehoderGift_EN:placehoderGift_CH;
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

            if($(this).attr("for") === "prologue"){
                setTimeout(function () {
                    $('.letterDeco').toggleClass("hide");
                }, 150);    
                setTimeout(function () {
                    $('.stamp').toggleClass("hide");
                }, 350);
            }else{
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

function getGiftUrl(gift) {
    if(CURRENT_ALT_INDEX > 0 ){
        return "../assets/" + DATA_YEAR + "/item/" + ENTRIES.indexOf(gift) +"-"+ CURRENT_ALT_INDEX + ".png";
    }
    return "../assets/" + DATA_YEAR + "/item/" + ENTRIES.indexOf(gift) + ".png";
}

//==================================//
//    Settingup Timer/CountDown     //
//==================================//

function checkPhase(){
    //check which deadline is the closest one and decide the index
    CURRENT_PHASE = 1;
    for (var phase of phases) {
        if (phase > new Date().valueOf()) {
            break;
        }
        CURRENT_PHASE++;
    }
    // CURRENT_PHASE = 3;
}

function setUpTimer() {
    checkPhase();
    swapToSecondForm();

    // $(".giftDeadlineShort").text(new Date(phases[0]).toLocaleString("zh").split(" ")[0]);
    $(".giftDeadline").text(new Date(phases[0]).toLocaleString("zh").replaceAll("/", "-").replaceAll(" ", ", ").slice(0, -3));
    $(".unboxingDay").text(new Date(phases[1]).toLocaleString("zh").replaceAll("/", "-").replaceAll(" ", ", ").slice(0, -3));
    $(".receiveArtDeadline").text(new Date(phases[2]).toLocaleString("zh").replaceAll("/", "-").replaceAll(" ", ", ").slice(0, -3));
    //set deadline name
    $(".countdown_label span").html($(".deadlines ul li:nth-child(" + CURRENT_PHASE + ") span:nth-child(1)").html());

    //highlight the current deadline
    $(".deadlines ul li:nth-child(" + CURRENT_PHASE + ")").addClass("currentDeadline");

    //grab deadline
    var compareDate = new Date(phases[CURRENT_PHASE-1]);
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

function swapToSecondForm(){
    //swap to 2nd form if it's the last phase
    if(CURRENT_PHASE>2){
        $('.wrapper').css("margin-bottom",100);
        $('#giftForm').remove();
        $('.phase1').remove();
        $('.modal_content').children().remove();
        setUpArtistSelect();
        validateExchangeForm();
    }else{
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
    var artistListHtml = "";
    for (var artistName in ARTISTS) {
        artistListHtml += "<option value='" + artistName + "'>" + artistName + "</option>";
    }
    $('#artist_select option').after(artistListHtml)

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
    if( $(this).val().length !== 0 ){
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
            if( $("#oc_select").val().length !== 0 )
                printProfileAndGiftRecievedByOC($(this).text());
        });
    })

}

//setup action for when user select an OC
function printProfileAndGiftRecievedByOC(ocName) {
    var OCEntry = ENTRIES.find(e => e.ocName === ocName);
    var receivedGift = ENTRIES[OCEntry.received];
    var receivedGiftPNG = getGiftUrl(receivedGift);
    var OCprofilePNG = "../assets/" + DATA_YEAR + "/profile/" + ENTRIES.findIndex(e => e.ocName === ocName) + ".png";

    //remove other OC profile pic and insert
    $('.ocIconWrapper').children('img').remove();
    $('.2').after("<img src='" + OCprofilePNG + "' alt='selected oc'>");

    //remove other gift pic and insert
    $('.giftInfo').children('img').remove();
    $('.giftInfo').html("<div class='giftTip'>" + LOCAL_DATA.yourGiftIs + " " + receivedGift.giftName + "</div>")
    $('.giftTip').after("<img class='recievedGift' src='" + receivedGiftPNG + "' alt='recieved gift'>");

    $('.recievedGift').click(function () {
        setUpRegularItemPanel(receivedGift, receivedGiftPNG);
    })
}

//border color change helper
function secondFormBorderChange(fieldName, borderColor){
    if( fieldName == "artist_select"){
        $(".question:eq(0)").css("border-color", borderColor);
    }
    if( fieldName == "oc_select"){
        $(".question:eq(1)").css("border-color", borderColor);
        $(".question:eq(2)").css("border-color", borderColor);
    }                
    if( fieldName == "final_art_url"){
        $(".question:eq(3)").css("border-color", borderColor);
    }
}

//setup standard item panel
function setUpRegularItemPanel(entry, imgUrl){
    var itemModalHtml = "";
    itemModalHtml += "<div class='standardItemPanel'>";
    itemModalHtml += "<div class='close'>"+"</div>";
    itemModalHtml += "<div class='itemPanel'>";
    itemModalHtml += "<div class='itemArtWrap'>";
    itemModalHtml += "<img class='itemArt' src='" + imgUrl + "' alt='item' draggable='false' >";
    if(entry.numOfAlt>0){
        itemModalHtml += "<div class='itemArtList'>";
        for (let i = 0; i < entry.numOfAlt+1 ; i++) {
            itemModalHtml += "<span>◆</span>";
        }
        itemModalHtml += "</div>";
    }
    itemModalHtml += "</div>";
    itemModalHtml += "<div class='itemSummary'>";
    itemModalHtml += "<div class='langSwitch'>"+"⇆"+"</div>";
    itemModalHtml += "<div class='itemTitle'>";
    itemModalHtml += "<div class='itemTitle1'>"+entry.giftName+"</div>";
    itemModalHtml += "<div class='itemTitle2'>"+entry.giftNameAlt+"</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "<div class='itemSummary_inner'>" + entry.giftDescription + "</div>";
    itemModalHtml += "</div>";    
    itemModalHtml += "</div>";
    itemModalHtml += "</div>";
    $(".modal_content").html(itemModalHtml);

    unhideModel();
    setUpTraslateToggle(entry);
    setUpGiftAltArt(entry);
    setupExtraCloseButton(".close");

    //===========================//
    //    Simple Unhide Event    //
    //===========================//
    function unhideModel() {
        $(".modal").removeClass("hide");
        $('body').width($('body').width());
        $('body').css('overflow', 'hidden');
    }

    //=============================//
    //    Handle traslate Event    //
    //=============================//
    function setUpTraslateToggle(entry) {

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
    function setUpGiftAltArt(entry) {
        handleAltArtIndicator();
        $(".itemArt").click(function () {
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
    //================================//
    //    Handle alt art indicator    //
    //================================//
    function handleAltArtIndicator(){
        $(".itemArtList span:eq(" + CURRENT_ALT_INDEX + ")").css('color', 'white' );
        $(".itemArtList span").not(':eq(' + CURRENT_ALT_INDEX + ')').css('color', "rgba(0, 0, 0, 0.4)" );
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
            OCname: LOCAL_DATA.inputError,
            gift: LOCAL_DATA.inputError,
            gift_summary: LOCAL_DATA.inputError,
            artist: LOCAL_DATA.inputError,
            contact: LOCAL_DATA.inputError,
            ocprofile_url: LOCAL_DATA.imageError,
            gift_url: LOCAL_DATA.imageError,
            art_url: LOCAL_DATA.imageError
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
            artist_select: LOCAL_DATA.selectError,
            oc_select: LOCAL_DATA.selectError,
            final_art_url: LOCAL_DATA.imageError
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
        LOCAL_DATA.uploadSuccess + '<img src="' + e.detail.cdnUrl + '">';
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
    var succHtml = LOCAL_DATA.mutiUploadSuccess[0] + NUM_OF_EX_IMG + LOCAL_DATA.mutiUploadSuccess[1];
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
        if(PREVIEW_IS_EDITED){
            $(".modal2").removeClass("hide");
        }else{
            closeModals();
        }
    })
}

function setupCloseModalEvents() {
    //for regular modal close
    $(".modal_bg").click(function () {
        if(PREVIEW_IS_EDITED){
            $(".modal2").removeClass("hide");
        }else{
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
        applyDataToForm(NEW_GIFT_NAME,NEW_GIFT_DESC);
    });

}

function closeModals(){
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
    itemModalHtml += "<div class='close'>"+"</div>";
    itemModalHtml += "<div class='itemPanel'>";

    // ====== item art ======
    itemModalHtml += "<div class='itemArtWrap'>";
    itemModalHtml += "<div class='noImage itemArt'>";
    itemModalHtml += "<div>"+LOCAL_DATA.noImage+"</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "<input class='hiddenSelectButton' type='file' accept='.png' style='display: none;' >";
    itemModalHtml += "<div class='selectImageButton'>"+ LOCAL_DATA.chooseImage +"</div>";
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

function setPreviewDataFromForm(){
    var previewData = {
        giftName: "",
        giftNameAlt: "",
        giftDescription: ""
    };
    previewData.giftName = $('.3 input').val()? $('.3 input').val(): PLACEHOLDER_GIFT.giftName;
    previewData.giftDescription = $('.5 textarea').val() ? $('.5 textarea').val(): PLACEHOLDER_GIFT.giftDescription;
    return previewData;
}

function applyDataToForm(giftName,giftDesc){
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
            if (input.val() !== text){
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
        $("<div class='tip'>"+LOCAL_DATA.editTip+"</div>").insertAfter(span);
        var ta = $(this).siblings("textarea");

        ta.val(NEW_GIFT_DESC);
        ta.attr("row", "15");
        ta.attr("col", "100");
        ta.focus();
        ta.blur(function () {
            if (ta.val() !== "")
                NEW_GIFT_DESC = ta.val();
            if (NEW_GIFT_DESC !== previewData.giftDescription){
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
function setUpFakeUpload(){
    $('.selectImageButton').click(function () {
        $('.hiddenSelectButton').click();
    });

    $(".hiddenSelectButton").change(function(e) {
        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
            var file = e.originalEvent.srcElement.files[i];
            var img = document.createElement("img");
            var reader = new FileReader();
            reader.onloadend = function() {
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

//========================================//
//    Settingup Sample Gift Modal HTML    //
//========================================//

function setupSampleGiftModalHtml(entries) {
    var sampleGiftModalHtml = "";
    sampleGiftModalHtml += '<div>'+LOCAL_DATA.sampleGiftTitle+'<div class="miniClose">[x]</div></div>';
    sampleGiftModalHtml += '<ul>';
    for (let entry of entries) {
        sampleGiftModalHtml += '<li>';
        sampleGiftModalHtml += '<img src="' + '" alt="gift">';
        sampleGiftModalHtml += '<div class="sampleContent">';
        sampleGiftModalHtml += '<div class="giftName">';
        sampleGiftModalHtml += entry.giftName;
        sampleGiftModalHtml += '</div>';
        sampleGiftModalHtml += '<div class="giftDesc">';
        sampleGiftModalHtml += entry.giftDescription;
        sampleGiftModalHtml += '</div>';
        sampleGiftModalHtml += '</div>';
        sampleGiftModalHtml += '</li>';
    }
    sampleGiftModalHtml += '</ul>';
    $(".sampleGiftPanel").html(sampleGiftModalHtml);

    for (var i = 0; i < entries.length; i++) {
        $(".sampleGiftPanel ul li:nth-child(" + (i + 1) + ")")
            .css("transition-delay", i * 0.12 + "s");
    }

    setupExtraCloseButton(".miniClose");
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