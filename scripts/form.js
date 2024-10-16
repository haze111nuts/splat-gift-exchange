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

function setUpTimer() {
    //check which deadline is the closest one
    //and decide the index
    var index = 1;

    //set deadline name
    $(".countdown_label span").html($(".deadlines ul li:nth-child(" + index + ") span:nth-child(1)").html());

    //highlight the current deadline
    var deadline = $(".deadlines ul li:nth-child(" + index + ")").addClass("currentDeadline");

    //grab deadline
    var deadline = $(".deadlines ul li:nth-child(" + index + ") span:nth-child(2)").html();
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

function setUpExtraUploadToggle() {
    $('.extraLink').click(function () {
        $('.extraUploader').toggleClass('hiddenContent');
    });
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
});