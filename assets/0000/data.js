//==================//
//=== Guest Data ===//
//==================//

const selfTrade = {
    "1": false,
    "2": true,
    "4": false,
    "5": true,
    "6": true
}

const ARTISTS = {
    "1": {
        link: "https://aceattorney.fandom.com/wiki/Phoenix_Wright:_Ace_Attorney",
        selfTrade: false
    },
    "2": {
        link: "https://aceattorney.fandom.com/wiki/Phoenix_Wright:_Ace_Attorney_-_Justice_for_All",
        selfTrade: true
    },
    "4": {
        link: "https://aceattorney.fandom.com/wiki/Apollo_Justice:_Ace_Attorney",
        selfTrade: false
    },
    "5": {
        link: "https://aceattorney.fandom.com/wiki/Phoenix_Wright:_Ace_Attorney_-_Dual_Destinies",
        selfTrade: true
    },
    "6": {
        link: "https://aceattorney.fandom.com/wiki/Phoenix_Wright:_Ace_Attorney_-_Spirit_of_Justice",
        selfTrade: true
    }
};

const ENTRIES = [
    {
        ocName: "成步堂龍一",
        giftName: "葡萄汁",
        giftNameAlt: "Grape Juice",
        giftDescription: "用特產巨峰葡萄做的100%無濃縮果汁﹐裝在漂亮的玻璃瓶裡面。當然不含酒精。",
        artist: "1"
    },
    {
        ocName: "王泥喜法介",
        giftName: "折疊式天文望遠鏡",
        giftNameAlt: "Portable Telescope",
        giftDescription: "口徑7公分、長為26公分的迷你形望遠鏡。有20mm和10mm的數位轉接目鏡和手機攝影轉接架﹐還附有簡易天文觀測指南。除了拿來觀星賞月以外﹐似乎也很適合拿來賞鳥或是湖中的不明生物。",
//        giftDescription: "A mini portable telescope with a 70 mm lens and a length of 26 cm. It comes with 20mm and 10mm digital adapter eyepieces and a smartphone photography adapter. It also includes a basic astronomy observation guide. In addition to stargazing and moon watching, it also seems very suitable for bird watching or observing unidentified creatures in the lake.",
        artist: "4"
    },
    {
        ocName: "希月心音",
        giftName: "碰可玩具機器人",
        giftNameAlt: "PONCO Toy Robot",
        giftDescription: "大河原宇宙中心的最新紀念品﹐1/8比例的多功能碰可玩具機器人﹐有著跟原物一樣的人工智能﹐可以透過聲控來做為日常的小幫手。有附一個機器人充電台。<br><b>功能：</b><ul><li>鬧鐘、備忘錄、上網查詢資料等通知等日常實用機能。</li><li>用專用的手機app跟這個機器人連動的話﹐可以跟它玩小遊戲。</li><li>帶去大河原宇宙中心的話，可以當作迷你導覽。</li><li>為了人類發展的未來，偶爾會推薦你捐錢給大河原宇宙中心。</li></ul>有一些跟<a href='https://www.amazon.com/b?node=18354642011' target='_blank'>ALEXA</a>類似的功能",
//        giftDescription: "The newest souvenir from Robo ROM-en, it is a multifunctional toy robot modeled after their service robot, scaled to 1/8 size. It is equipped with basic AI software and can function as a digital assistant through voice control. A charging station is also included.<br><b>Features:</b><ul><li>Alarm clock, task reminder, internet search, and other useful functions for daily use.</li><li>You can play mini-game with it if you link it to the PONCO app.</li><li>If you bring it to GAYXA Space Center, it can serve as your mini tour guide.</li><li>For the future of mankind, it periodically ask you for donation to GYAXA Space Center.</li></ul>It has some functions similar to <a href='https://www.amazon.com/b?node=18354642011' target='_blank'>ALEXA</a>",
        artist: "5"
    },
    {
        ocName: "御劍伶侍",
        giftName: "西洋棋組",
        giftNameAlt: "Chess Set",
        giftDescription: "特別訂做的紅白色西洋棋組。以桃花心木製成﹐並鑲有金邊。",
        artist: "1"
    },
    {
        ocName: "綾里真宵",
        giftName: "將軍超人&粉紅公主全套DVD影集",
        giftNameAlt: "Steel Samurai & Pink Princess Complete DVD Set",
        giftDescription: "包含第一季將軍超人和第二季粉紅公主的DVD影集全套。",
        artist: "1"
    },
    {
        ocName: "成步堂美貫",
        giftName: "帽子先生吊飾",
        giftNameAlt: "Mr. Hat Keychain",
        giftDescription: "手工做的帽子先生吊飾﹐還附有三張驚奇酒吧的免費入場券。",
        artist: "4"
    },
    {
        ocName: "寶月茜",
        giftName: "冬季限定花林糖",
        giftNameAlt: "Winter Edition Snackoo",
        giftDescription: "使用北海道小麥的麵粉製成的花林糖﹐是冬季限定的牛奶口味。拿來丟人一定很浪費。",
        artist: "4"
    },
    {
        ocName: "綾里春美",
        giftName: "倉院特產饅頭",
        giftNameAlt: "Kurain Buns",
        giftDescription: "倉院之里的特產栗子饅頭。每個饅頭都是勾玉形狀﹐有經過某位靈媒的祈禱加持﹐據說吃下去可以補充靈力。",
        artist: "2"
    },
    {
        ocName: "靈花 帕多瑪",
        giftName: "手工押花",
        giftNameAlt: "Handmade Pressed Flower",
        giftDescription: "蒼苑國特有的花製成的書籤﹐還有淡淡的花香。",
        artist: "6"
    }
];