
function setUpconfirmEvent(){
    $('#confirm').click(function() {
        $('.submit').prop("disabled", !$(".submit").prop("disabled"));
    });
}

//======================//
//                      //
//    Ready Function    //
//                      //
//======================//

$(document).ready(function () {
    setUpconfirmEvent();
});