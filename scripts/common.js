function printSnow() {
    var snowHtml = "";
    for (var i = 0; i < 120; i++) {
        snowHtml += "<div class='snow'></div>";
    }    
    $(".snowScreen").html(snowHtml);
}