function setSendButton(entry, recipient, year) {
    $(".itemArt").click(function () {
        const lang = ARTISTS[recipient.artist].lang;
        let description = CURRENT_SUMMARY_LANG ? entry.giftDescriptionAlt : entry.giftDescription;
        description = description.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '[$1](<$2>)');

        const content = lang == "en" ? `<@${ARTISTS[recipient.artist].discordId}> Congratulation! ${recipient.ocName} got——\n\n${entry.giftName}\n${entry.giftNameAlt}\n${description}`:
        `<@${ARTISTS[recipient.artist].discordId}> 恭喜${recipient.ocName}抽到——\n\n${entry.giftName}\n${entry.giftNameAlt}\n${description}`;

        const giftIndex = ENTRIES.indexOf(entry);

        fetch(`http://localhost:8344/${year}/gift/${giftIndex}.png`)
        .then(res => res.blob())
        .then(blob => {
            const formData = new FormData();
            formData.append("content", content);
            formData.append("file", blob, `${giftIndex}.png`);

            $.ajax({
            url: "http://localhost:8344/send-message",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function() {
                console.log("Message sent!");
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log("Error:", textStatus, errorThrown, xhr.responseText);
            }
            });
        })
    });
}
