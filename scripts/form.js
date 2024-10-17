
var placeholderGifts = [
    {
        ocName: "綾里春美",
        giftName: "倉院特產饅頭",
        giftNameAlt: "Kurain Buns",
        giftDescription: "倉院之里的特產栗子饅頭。每個饅頭都是勾玉形狀﹐有經過某位靈媒的祈禱加持﹐據說吃下去可以補充靈力。",
        giftDescriptionAlt: "Some chestnut manju. Each bun is in the shape of a magatama and is blessed by a certain spirital medium. It is said that eating it will replenish your spiritual energy.",
        numOfAlt: 2,
        artist: "2"
    },
    {
        ocName: "綾里春美",
        giftName: "倉院特產饅頭",
        giftNameAlt: "Kurain Buns",
        giftDescription: "倉院之里的特產栗子饅頭。每個饅頭都是勾玉形狀﹐有經過某位靈媒的祈禱加持﹐據說吃下去可以補充靈力。",
        giftDescriptionAlt: "Some chestnut manju. Each bun is in the shape of a magatama and is blessed by a certain spirital medium. It is said that eating it will replenish your spiritual energy.",
        numOfAlt: 2,
        artist: "2"
    },
    {
        ocName: "綾里春美",
        giftName: "倉院特產饅頭",
        giftNameAlt: "Kurain Buns",
        giftDescription: "倉院之里的特產栗子饅頭。每個饅頭都是勾玉形狀﹐有經過某位靈媒的祈禱加持﹐據說吃下去可以補充靈力。",
        giftDescriptionAlt: "Some chestnut manju. Each bun is in the shape of a magatama and is blessed by a certain spirital medium. It is said that eating it will replenish your spiritual energy.",
        numOfAlt: 2,
        artist: "2"
    },
    {
        ocName: "綾里春美",
        giftName: "倉院特產饅頭",
        giftNameAlt: "Kurain Buns",
        giftDescription: "倉院之里的特產栗子饅頭。每個饅頭都是勾玉形狀﹐有經過某位靈媒的祈禱加持﹐據說吃下去可以補充靈力。",
        giftDescriptionAlt: "Some chestnut manju. Each bun is in the shape of a magatama and is blessed by a certain spirital medium. It is said that eating it will replenish your spiritual energy.",
        numOfAlt: 2,
        artist: "2"
    }
]

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
        })
    });
}

function setUpExtraUploadToggle() {
    $('.extraLink').click(function () {
        $('.extraUploader').toggleClass('hiddenContent');
    });
}


//========================//
//    Settingup Timer     //
//========================//

const times = {
    giftDeadline: 1758988740000,       // new Date('2025-09-27T11:59:00').valueOf(); (EST)
    unboxingDay: 1760184000000,        // new Date('2025-10-11T08:00:00').valueOf(); (EST)
    receiveArtDeadline: 1765472340000  // new Date('2025-12-11T11:59:00').valueOf(); (EST)
};

// var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
// var today = new Date();
// var tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
// var tomorroww = new Date(new Date().setDate(new Date().getDate() + 2));

// const times = {
//     giftDeadline: yesterday,
//     unboxingDay: tomorrow,
//     receiveArtDeadline: tomorroww
// };

function setUpTimer() {
    //check which deadline is the closest one
    //and decide the index
    var index = 1;
    var deadline = 0;
    for (var x in times) {
        if (times[x] > new Date().valueOf()) {
            deadline = times[x];
            break;
        }
        index++;
    }

    $(".giftDeadlineShort").text(new Date(times.giftDeadline).toLocaleString("zh").split(" ")[0]);
    $(".giftDeadline").text(new Date(times.giftDeadline).toLocaleString("zh").replaceAll("/", "-").replaceAll(" ", ", ").slice(0, -3));
    $(".unboxingDay").text(new Date(times.unboxingDay).toLocaleString("zh").replaceAll("/", "-").replaceAll(" ", ", ").slice(0, -3));
    $(".receiveArtDeadline").text(new Date(times.receiveArtDeadline).toLocaleString("zh").replaceAll("/", "-").replaceAll(" ", ", ").slice(0, -3));
    //set deadline name
    $(".countdown_label span").html($(".deadlines ul li:nth-child(" + index + ") span:nth-child(1)").html());

    //highlight the current deadline
    $(".deadlines ul li:nth-child(" + index + ")").addClass("currentDeadline");

    //grab deadline
    var compareDate = new Date(deadline);
    compareDate.setDate(compareDate.getDate());

    setInterval(function () {
        setTimeBetweenDates(compareDate);
    }, 500);
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

function validateForm() {
    $("#giftForm").validate({
        rules: {
            OCname: "required",
            gift: "required",
            giftSummary: "required",
            artist: "required",
            contact: "required",
            ocprofile_check: "required",
            gift_check: "required",
            art_check: "required"
        },
        messages: {
            OCname: "有東西沒填！",
            gift: "有東西沒填！",
            giftSummary: "有東西沒填！",
            artist: "有東西沒填！",
            contact: "有東西沒填！",
            ocprofile_check: "有圖片沒有提供！",
            gift_check: "有圖片沒有提供！",
            art_check: "有圖片沒有提供！"
        },
        submitHandler: function (form) {
            alert("valid form submitted")
            return false
        },
        invalidHandler: function (event, validator) {
            // loop thru all invalid error
            for (let x in validator.invalid) {
                var index = "0";
                // find the owner(index) of the invalid question
                // summary is a textarea not input therefore need manual setter
                if (x == "giftSummary") {
                    index = 5;
                } else {
                    index = $("input[name='" + x + "']").parent().attr("class").split(" ")[1];
                    console.log(index);
                }
                $(".question:nth-child(" + index + ")").css("border-color", "#9e3038");
            }
        }
    })
}



function displayImageUploadSuccessMsg(e, parentDiv) {
    console.log("IMAGE UPLOAD SUCCESS");
    var succHtml =
        '成功上傳了1張圖<img src="' + e.detail.cdnUrl + '">';
    $('.' + parentDiv + ' .uploadResult').html(succHtml);

    //check the hidden check input
    $('.' + parentDiv + ' input').prop("checked", true);

    //clean up upload error
    $('.' + parentDiv + ' .error').html('');
    $("." + parentDiv).css("border-color", "rgb(223, 177, 92)");
}

var NUM_OF_EX_IMG = 0;
var EX_IMG = []

function displayMultiImageUploadSuccessMsg(e) {
    console.log("MULTI-IMAGE UPLOAD SUCCESS");
    NUM_OF_EX_IMG++;
    EX_IMG.push(e.detail.cdnUrl);
    var succHtml = "成功上傳了" + NUM_OF_EX_IMG + "張圖";
    for (let url of EX_IMG) {
        succHtml += '<img src="' + url + '">';
    }
    $('.multiUploadResult').html(succHtml);
}


//========================//
//    Settingup Modal     //
//========================//

function setUpClickModalEvents(panelName) {
    $('span[for="' + panelName + '"]').each(function () {
        $(this).click(function () {

            //set item html if it's item panel
            if (panelName.includes("Item")) {
                setupItemModalHtml(placeholderGifts[0]);
            } else if (panelName.includes("Gift")) {
                setupSampleGiftModalHtml(placeholderGifts);
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


            setTimeout(function () {
                for (var i = 0; i < placeholderGifts.length; i++) {
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

function setupCloseModalEvents() {
    $(".modal_bg, .close").click(function () {
        $(".modal").addClass("hide");
        $(".modal_content >div").addClass("fadeDown");
        // $(document.body).removeClass("noscroll");
        setTimeout(function () {
            $(".modal_content").children().css("display", "none")
            $('body').removeAttr('style')
        }, 250);

    })
}

//=================================//
//    Settingup Item Modal HTML    //
//=================================//
var CURRENT_ALT_INDEX = 0;
function setupItemModalHtml(entry) {
    var itemModalHtml = "";

    itemModalHtml += "<div class='itemPanel'>";
    itemModalHtml += "<div class='itemSummary'>";
    itemModalHtml += "<div class='itemTitle'>";
    itemModalHtml += "<div class='itemTitle1'>" + entry.giftName + "</div>";
    itemModalHtml += "<div class='itemTitle2'>" + entry.giftNameAlt + "</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "<div class='itemSummary_inner'>" + entry.giftDescription + "</div>";
    itemModalHtml += "</div>";
    itemModalHtml += "<div class='itemArtWrap'>";
    itemModalHtml += "<img class='itemArt' src='" + getGiftUrl(entry) + "' alt='item' draggable='false' >";
    if (entry.numOfAlt > 0) {
        itemModalHtml += "<div class='itemArtList'>";
        for (let i = 0; i < entry.numOfAlt + 1; i++) {
            itemModalHtml += "<span>◆</span>";
        }
        itemModalHtml += "</div>";
    }
    itemModalHtml += "</div>";
    itemModalHtml += "</div>";
    $(".previewItemPanel").html(itemModalHtml);
}

function getGiftUrl(gift) {
    if (CURRENT_ALT_INDEX > 0) {
        return "../assets/placeholder-" + CURRENT_ALT_INDEX + ".png";
    }
    return "../assets/placeholder.png";
}

//========================================//
//    Settingup Sample Gift Modal HTML    //
//========================================//

function setupSampleGiftModalHtml(entries) {
    var sampleGiftModalHtml = "";
    sampleGiftModalHtml += '<h2>禮物範例</h2>';
    sampleGiftModalHtml += '<ul>';
    for (let entry of entries) {
        sampleGiftModalHtml += '<li>';
        sampleGiftModalHtml += '<img src="'+ getGiftUrl(entry) +'" alt="gift">';
        sampleGiftModalHtml += '<div class="sampleContent">';
        sampleGiftModalHtml += entry.giftName;
        sampleGiftModalHtml += '</div>';
        sampleGiftModalHtml += '</li>';
    }
    sampleGiftModalHtml += '</ul>';
    $(".sampleGiftPanel").html(sampleGiftModalHtml);

    for (var i = 0; i < entries.length; i++) {
        $(".sampleGiftPanel ul li:nth-child(" + (i + 1) + ")")
        .css("transition-delay", i * 0.12 + "s");
    }
}

//======================//
//                      //
//    Ready Function    //
//                      //
//======================//

$(document).ready(function () {
    setUpConfirmEvent();
    setUpNavClickEvents();
    setUpTimer();
    validateForm();
    setUpOtherValidationStyle();
    setUpExtraUploadToggle();
    setUpClickModalEvents("giftRulePanel");
    setUpClickModalEvents("previewItemPanel");
    setUpClickModalEvents("sampleGiftPanel");
    setupCloseModalEvents();
});