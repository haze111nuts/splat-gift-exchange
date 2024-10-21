//=== simple markdown parser
function simpleMarkdownToHTML(mdText) {

    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;

    var html = mdText
        .replace(reg, (match)=>(map[match]))
        .replace(/\*\*(.+?)\*\*(?!\*)/g,'<b>$1</b>')
        .replace(/\*([^*><]+)\*/g,'<i>$1</i>')
        .replace(/~~(.+?)~~/g,'<s>$1</s>')
        .replace(/\n/g, '<br>')
        .replace(/\[([^\[]+)\](\(([^)]*))\)/gim, '<a href="$3" target="_blank" rel="noopener noreferrer">$1</a>');

    var lines = html.split("<br>");
    var result = [];
    var ulFlag = false;
    var olFlag = false;
    for (var line of lines) {
        if (line.slice(0,2) === "- ") {
            if (ulFlag) {
                result.push(line.replace("- ", "<li>"));
                result.push("</li>");
            } else {
                result.push(line.replace("- ", "<ul><li>"));
                result.push("</li>");
                ulFlag = true;
            }
        } else {
            if (ulFlag) {
                result.push("</ul>");
                ulFlag = false;
            }
            var orderListMatch = line.match(/^\d+. /);
            if (orderListMatch) {
                if (olFlag) {
                    result.push(line.replace(orderListMatch, "<li>"));
                    result.push("</li>");
                } else {
                    result.push(line.replace(orderListMatch, "<ol start=\""+ orderListMatch[0].slice(0, -2) +"\"><li>"));
                    result.push("</li>");
                    olFlag = true;
                }
            } else {
                if (olFlag) {
                    result.push("</ol>");
                    olFlag = false;
                }
                result.push(line);
                result.push("<br>");
            }
        }
    }

    if (result.at(-1) === "<br>")
        result.pop();
    if (ulFlag) {
        result.push("</li></ul>");
    }
    if (olFlag) {
        result.push("</li></ol>");
    }
    return result.join("");
}