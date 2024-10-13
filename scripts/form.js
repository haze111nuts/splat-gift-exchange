
function setUpConfirmEvent() {
    $('#confirm').click(function () {
        $('.submit').prop("disabled", !$(".submit").prop("disabled"));
    });
}

function setUpNavClickEvents() {
    $('.navlist li:nth-child(1)').click(function () {
        $('.readme').toggleClass("hiddenContent");
        $('.guide').addClass("hiddenContent");
        // unhideCurrentNavItem('.readme')
        // hideOtherNavItem('.readme');
        $(this).siblings().removeClass("highlighted");
        $(this).toggleClass("highlighted");
    });

    $('.navlist li:nth-child(2)').click(function () {
        $('.guide').toggleClass("hiddenContent");
        $('.readme').addClass("hiddenContent");
        // unhideCurrentNavItem('.guide')
        // hideOtherNavItem('.guide');
        $(this).siblings().removeClass("highlighted");
        $(this).toggleClass("highlighted");
    });
}

//======================//
//                      //
//    Ready Function    //
//                      //
//======================//

$(document).ready(function () {
    setUpConfirmEvent();
    setUpNavClickEvents();
});