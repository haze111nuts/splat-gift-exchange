
function setUpConfirmEvent() {
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
    $(".countdown_label span").html($(".deadlines ul li:nth-child("+index+") span:nth-child(1)").html());

    //highlight the current deadline
    var deadline = $(".deadlines ul li:nth-child("+index+")").addClass("currentDeadline");

    //grab deadline
    var deadline = $(".deadlines ul li:nth-child("+index+") span:nth-child(2)").html();
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

function setUpOtherValidateStyle() {
    $('input, textarea').on('focusout keyup', function () {

        //dont do the rest when input is for selftrade question or confirm
        //only do the rest when the wrapper of input is div 
        if($(this).parent().is('div') && $(this).parent().attr("class") != "confirm"){
            var index = $(this).parent().attr("class").split(" ")[1];
            if (
                ($(".question:nth-child("+index+")").children().length <= 3 || 
                $(this).siblings(".error").css("display") == "none") && 
                $(this).val().length > 0
            ){
                //set border to green
                $(".question:nth-child("+index+")").css("border-color","#5d6836");

            }else{
                //set border to red
                $(".question:nth-child("+index+")").css("border-color","#9e3038");
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
            contact: "required"
        },
        messages: {
            OCname: "有東西沒填！",
            gift: "有東西沒填！",
            giftSummary: "有東西沒填！",
            artist: "有東西沒填！",
            contact: "有東西沒填！"            
        },
        submitHandler: function (form) {
            alert("valid form submitted")
            return false
        },
    })
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
    setUpOtherValidateStyle();
});