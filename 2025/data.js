//==================//
//=== Guest Data ===//
//==================//

const ARTISTS = {
    "Bel": {
        link: "https://x.com/bel_by_the_sea",
        lang: "en",
        selfTrade: false
    },
    "牛牛": {
        link: "https://x.com/Darunio_",
        selfTrade: false
    },
    "33°": {
        link: "https://x.com/sano0033x",
        selfTrade: true
    },
    "B": {
        link: "",
        selfTrade: true
    },
    "Silver Hawkling": {
        link: "https://x.com/shawkling",
        lang: "en",
        selfTrade: true
    },
    "Hazy": {
        link: "https://x.com/haze1splashit",
        selfTrade: false
    },
    "月月": {
        link: "https://x.com/yueyue_ika",
        selfTrade: true
    },
    "Reinbel": {
        link: "https://bsky.app/profile/reinbel.bsky.social",
        lang: "en",
        selfTrade: true
    },
    "檸朦": {
        link: "https://x.com/lemonn_catt",
        selfTrade: true
    },
    "み": {
        link: "",
        selfTrade: true
    },
    "雪霜": {
        link: "https://www.facebook.com/xue.shuang.257786",
        selfTrade: true
    },
    "Excabluir": {
        link: "https://bsky.app/profile/excabluir.bsky.social",
        lang: "en",
        selfTrade: true
    },
    "Punkoz": {
        link: "https://punkozarts.tumblr.com/",
        lang: "en",
        selfTrade: true
    },
    "奈奈": {
        link: "https://x.com/LWY69805700",
        selfTrade: true
    },
    "IAP": {
        link: "",
        selfTrade: true
    }
};

const ENTRIES = [
    {
        ocName: "Isa",
        giftName: "MudFoot-in-Mouth House Slippers + Shoe Charms",
        giftNameAlt: "泥鮭魚室內拖＋鞋飾",
        giftDescription: "A handmade pair of plush house slippers fashioned to look like Mudmouths! The green fabric glows softly in the dark, and the eyes light up if the red mohawk pieces are squeezed/pressed. Charms are included to decorate them as you please. The perfect shoes to wear if you're the type to get up in the middle of the night to go to the bathroom or to get a midnight snack.\n\n⚠️**WARNING**⚠️\nDo NOT wear these shoes in salmon territories with the lights activated. You WILL get rushed.",
        giftDescriptionAlt: "一雙看起來像泥鮭魚的手工製作室內拖！綠色的布料在黑暗裡會發出淡淡的螢光，擠壓一下紅紅的莫西干頭髮部位的話，鞋子上的眼鏡還會發光，禮物裡面還附加了幾個鞋飾讓你隨意裝飾這雙拖鞋。如果你是那種會半夜起來上廁所或是找宵夜的人的話，這雙鞋子非常的適合你！\n\n⚠️**警告**⚠️\n晚上的時候，請不要在鮭魚地盤附近穿這雙拖鞋並啟動燈，要不然你會被狂潮淹沒。",
        numOfAlt: 1,
        artist: "Bel",
        received: 5
    },
    {
        ocName: "Evie",
        giftName: "Horroborobeachball",
        giftNameAlt: "辰龍海灘球",
        giftDescription: "A huge beachball that resembles the bomb of a Horrorboros. Has multiple play settings! Whoever's unfortunate enough to receive it at the end of a countdown, or unlucky enough to let it hit the floor, will receive an explosive surprise. Play hot-potato style games with this questionably-made beachball. The creator says that the slap-dash look is intentional!!\n\n**Settings include:**\n- Countdowns - Number of hits or timer displayed on the screen. There's also a toggle for randomizing the display symbols.\n- Pressure sensitivity - How soft or hard one hits the ball\n- Surface detection - Types of contact, e.g. hands vs. ground\n\n⚠️**WARNING**⚠️\nBe sure to play with this device in an area with spawn points, or have spawners on hand.",
        giftDescriptionAlt: "一個看起來像辰龍炸彈的巨大海灘球，內建多種遊玩設定！看是哪個倒楣鬼在倒數時間歸零時拿到這顆球，或是不小心讓球掉到地上的話，就會得到一個爆炸性的驚喜。用這顆來源不明的海灘球玩燙手山芋型遊戲吧！ 製作者說這個看起來隨便亂黏的外貌是刻意設計的！！\n\n**內建設定包含：**\n- 倒數模式 - 螢幕上會顯示打擊次數倒數或是時間倒數。也可以調整讓螢幕顯示隨機符號。 \n- 壓力感應 - 可以調整球能接受的拍擊力道強弱。\n- 球面偵測 - 可以辨識並調整接觸類型，例如手拍或地面接觸。\n\n⚠️**警告**⚠️\n請務必在有重生點的區域內遊玩，或隨身攜帶重生裝置。",
        artist: "Bel",
        numOfAlt: 1,
        received: 3
    },
    {
        ocName: "萊姆",
        giftName: "可疑的桌上遊戲",
        giftNameAlt: "Suspicious Tabletop Game",
        giftDescription: "某個高人氣遊戲的周邊商品，是一款可多人遊玩，讓玩家們協力建設方塊世界的桌遊。\n\n本來應該是這樣的…\n不知道買到了什麼版本，裡面裝著的都是奇怪的軟泥。\n有螢光也很容易染色，遊玩請多注意。",
        giftDescriptionAlt: "A tabletop game based on a super popular game where players team up to build a world of blocks.\n\n…Or at least, that's what it's supposed to be. Somehow you've ended up with a version packed full of strange slime instead. It glows, stains easily, and can get everywhere, handle with care while playing!",
        artist: "牛牛",
        received: 8
    },
    {
        ocName: "托瑪",
        giftName: "軟膠捏捏鮭魚",
        giftNameAlt: "Salmonid Squishy",
        giftDescription: "軟膠製成的鮭魚玩具。\n特色在於捏魚肚子會發出啾啾聲還會吐出一顆金鮭魚卵。",
        giftDescriptionAlt: "A soft plastic Salmonid toy.\n\nWhen you squeeze its belly, it spits out a golden egg and makes a funny squeaky sound.",
        artist: "牛牛",
        numOfAlt: 1,
        received: 17
    },
    {
        ocName: "梧",
        giftName: "鰻有話講（橘色）",
        giftNameAlt: "\"How are you fEeling\" Plushie (Orange)",
        giftDescription: "娃娃以哈氏異康吉鰻作為靈感，讓生性膽小又害羞的牠們也能鼓起勇敢和其他魚群打招呼，使用比YEAH作為友善的象徵。請務必小心距離，以免引起紛爭。",
        giftDescriptionAlt: "A plush toy with a design inspired by spotted garden eel. The V sign it makes is a friendly gesture! It would surely help these shy little creature to work up the courage greeting others. Maybe it would inspire you to do the same?",
        artist: "33°",
        received: 14
    },
    {
        ocName: "B",
        giftName: "人類時期的照相機",
        giftNameAlt: "Camera From Ancient Humanity",
        giftDescription: "在人類時期照的相機意外的保存到了現在，經由古物老闆巧手完整修復，但檔案無法和現有系統相連接，拍照過後也只能留在此相機的遠古記憶卡裡。\n\n或許在遙遠的以後，你所拍的照片也會因此流轉到下個星球霸主上也說不定呢！",
        giftDescriptionAlt: "A digital camera from ancient humanity that somehow survived the test of time. It is fully restored by an antique shop owner, but the files inside cannot be read by any modern system, so any photo you took with it would only end up sealed inside its ancient memory card.\n\n Maybe in the far future, your photo would end up be in the hands of the next ruler of Earth!",
        artist: "B",
        received: 10
    },
    {
        ocName: "Leo",
        giftName: "Homebaked Gingerbread Jellyfish cookies",
        giftNameAlt: "手工薑餅水母",
        giftDescription: "About a dozen gingerbread cookies with the shapes of jellyfish, the outlines is made with cake batter making it look like they are wearing christmas sweaters.",
        giftDescriptionAlt: "一盒水母形狀的薑餅，大概有12塊左右。餅乾上的裝飾紋路是用蛋糕糊畫上去並烘烤出來的，看起來很像一群薑餅水母穿著聖誕毛衣。",
        artist: "Silver Hawkling",
        received: 11
    },
    {
        ocName: "Xiu",
        giftName: "墨色占卜球 限定版",
        giftNameAlt: "Magic Moon Shell Limited Edition",
        giftDescription: "「常常在排位賽遇到爛隊友？一出門就被海鷗大便打中？有了這個神奇的玉螺占卜球，再也不用擔心你的運勢毀了你的一天！」\n\n「只要稍微搖一下，就可以從玉螺的洞口中窺視到你今天的幸運訊息和幸運墨色組合！把自己的墨色改成它指示的顏色後就可以得到一整天的好運！註：本產品並無幫你改墨水顏色的機能，要改墨色的話請去離你最近的重生點。」\n\n「另外，將它放在附帶的充電台座上的話也可以當做裝飾品，讓你的房間充滿幸運的氛圍！」\n\n…盒子背面上是這麼寫的。\n\n上面還說了什麼「快閃店限定版！每日算出你的幸運百分比，以及1000種以上的獨特訊息！」比如「好事即將出現」「機會就在你的身邊」「照著你的直覺行動」等等模稜兩可的訊息，上面還寫著這顆占卜球會在接到Wi-Fi後自動更新，甚至有專屬的APP可以下載。\n\n這似乎是最近在短影片社交媒體上非常流行的物品，只要搜尋占卜兩個字就會跳出一整排這個東西相關的搜尋建議，有數不清的短影片在展示墨色選擇、還有墨色相關的穿搭教學﹑也用抽到的墨色出門挑戰各種瑣事的結果、你還滑到了少少幾個影片告誡大家不要買這種騙錢的東西，但它們都沒有什麼流量。然後你模糊的想起最近好像有則新聞說有人在X級比賽掉了500分而要將某個占卜玩具的公司告上法庭，該不會就是這個東西吧？但是這並不阻止你搖一下它，對吧？",
        giftDescriptionAlt: "“Tired of getting matched with noob teammates? Sick of random seagull splatting your fresh fit? Meet the Magic Moon Shell™—the mystical gadget that keeps your luck rolling and your game on point. Shake, ask, and let fortune do the splatting!”\n\n“Give it a shake and peek through the shell's crystal window to reveal a lucky message of the day and the perfect ink color combo to match. Splash yourself in the colors it reveals, and ride a wave of good fortune all day long! Disclaimer: the Magic Moon Shell™ cannot change your ink color for you. To change ink color, please visit the nearest respawn point.”\n\n“It also serves as a home decor when you set it on the included charging stand, basking your room with an aura of good fortune!”\n\n...is what's written on the back of the box.\n\nIt also mentions things like: “Pop-up store exclusive edition! Calculates your daily luck percentage, plus over 1,000 unique answers!” Examples included vague lines such as:\n- Something good is on the way\n- Opportunity is closer than you think\n- Trust your instincts\n\nThe package also says that the shell will automatically update itself when connected to Wi-Fi, it even has its own dedicated smartphone app.\n\nApparently this thing is huge on short-form video platforms right now. Just search the word “magic” will bring up tons of related suggestions, followed by countless videos of people showing off their *lucky* outcome, some posting outfit tutorials bases on the color given by the shell, some performing questionable luck challenges. You did came across a handful of videos trying to warn people not to buy this scummy product—but they barely get any views. You then vaguely recall a recent headline about someone suing a fortune-telling toy company after losing 500 points in X Battle...could it have something to do with *this* thing?\n\nStill, that wouldn't stop you from giving it a light shake, right?",
        artist: "Hazy",
        numOfAlt: 2,
        received: 0
    },
    {
        ocName: "Wade",
        giftName: "掌上型街機 手繪外殼",
        giftNameAlt: "Hand-painted Mini Arcade Machine",
        giftDescription: "一個復古風掌上型遊戲機，跟當年尚興市中心流行的街機相同造型，並且是同公司製作並推出的正版迷你街機，只要放入三個AA電池就可以玩。裡面包含「[小朋魷上樓梯](https://www.youtube.com/watch?v=FmuXfmLjiPg)」「[魷魚打排球](https://www.youtube.com/watch?v=0mnlQJ_lpuk)」「[魷魚賽車](https://www.youtube.com/watch?v=HpClGDbRMzU)」「[狂魷節拍](https://www.youtube.com/watch?v=DVcTdCdrzHo)」和其續作「[狂魷節拍2](https://youtu.be/GJx9G35SFq0?t=5)」。\n\n遊戲機外殼的塗鴉看起來是親手畫上去的，左右兩邊風格差異不小，想必是出自不同人之手。背面還有不少疑似是魚寵物沾到顏料留下的鰭印，機台的底部好像還有被咬過的痕跡。\n\n遊戲機上還附帶一個鑰匙扣，扣子是特別的貝殼形狀，似乎是有人特別挑選後換上去的。\n\n聽說以前大家會一邊玩這些街機遊戲一邊等待比賽開局，你也來體驗一下那時的潮流吧！",
        giftDescriptionAlt: "A retro-style handheld console that only requires three AA batteries to play, it's modeled after the arcade machine that was once all the rage in Inkopolis Plaza. Officially produced and published by the same company, this mini arcade comes preloaded with [Squid Jump](https://www.youtube.com/watch?v=FmuXfmLjiPg), [Squidball](https://www.youtube.com/watch?v=0mnlQJ_lpuk), [Squid Racer](https://www.youtube.com/watch?v=HpClGDbRMzU),  [Squid Beatz](https://www.youtube.com/watch?v=DVcTdCdrzHo), and its sequel [Squid Beatz 2](https://youtu.be/GJx9G35SFq0?t=5).\n\nThe mini arcade's shell is covered in hand-drawn mini graffiti. The art on the left side looked quite different compare to the one on the right, you wonder if they are from the hands of different individuals. On the back, there are some fin-prints with smudge, as if some fish (likely pet sized) attacked it after climbing out from a pool of paints, you can even spot what looked like bite marks on the bottom.\n\nAttached to the console is a special shell-shaped keychain, clearly swapped in by someone who went out of their way to pick it.\n\nBack in the days, players used to play these games while waiting for matches to start. Now it is your turn to try it out!",
        artist: "Hazy",
        numOfAlt: 3,
        received: 6
    },
    {
        ocName: "Owl",
        giftName: "水母玻璃彩灯",
        giftNameAlt: "Jellyfish Stained Glass Lamp",
        giftDescription: "一组彩色玻璃灯。\n玻璃块被摆成了水母的图样，发出暖暖的灯光。\n在一众玻璃灯中显得十分醒目。",
        giftDescriptionAlt: "A set of stained glass lamp.\nThe glass pieces are arranged in the shape of jellyfish, giving off a warm light when lit.\nIt would certainly stand out from other glass lamps.",
        artist: "月月",
        received: 12
    },
    {
        ocName: "Kanten",
        giftName: "Judd Lucky Cat Figure",
        giftNameAlt: "評審招財貓",
        giftDescription: "A handmade figurine of the judge cat Judd, holding a golden Salmon egg! It's made of ceramic, and is big enough to fit on your hand. If you push Judd's raised paw, it rocks back and forth in a beckoning motion! Maybe this lucky Judd will help bring fortune in battles, or promise you good rewards from your Salmon Run shift?",
        giftDescriptionAlt: "手工作的評審裁判貓公仔，他還拿著一顆金鮭魚蛋！這個公仔是用陶瓷作的，是可以放在手掌上的大小。推一下評審的貓掌，貓掌就會前後擺動，做出招財的姿勢。\n\n也許這個招財評審可以給你在對戰帶來好運，或是讓你在鮭魚跑打工得到比較好的報酬？",
        artist: "Reinbel",
        received: 16
    },
    {
        ocName: "玉粕",
        giftName: "懷舊風格數碼相機",
        giftNameAlt: "Retro Digital Camera",
        giftDescription: "小巧精緻的數碼相機，讓使用者在能直接從透明機身中看到拍攝內容。機體的圓形按鈕為快門鍵，拍出的照片自帶朦朧質感的Y2K風格，並支援錄影功能。",
        giftDescriptionAlt: "This digital camera lets you view your shots directly through its transparent body. The round button below the screen is the shutter, and it produces photos with a soft, nostalgic Y2K look. The camera also supports video recording.",
        artist: "檸朦",
        received: 15
    },
    {
        ocName: "み",
        giftName: "初雪時的紀念拍立得",
        giftNameAlt: "Photos of First Snow",
        giftDescription: "你打開了禮物，是一些漂亮的風景照，然後你發現裡面的照片竟然有你！\n隱約記得在今年冬天第一次降下初雪時你到戶外欣賞，那天好像有看到現場有人在四處拍照，難道⋯？\n\n看來是命中注定的緣分讓你收到這些照片了！\n\n（因為照片有複數張，所以不需按照範例的圖示繪製，請自行想像自己喜歡的初雪畫面即可！）",
        giftDescriptionAlt: "You opened the present to find a set of beautiful landscape photos, and for some reason you are in them! Thinking back, you vaguely remembered that day... you were taking a stroll during the first snowfall of winter, and someone was taking photos. Could it be...? \n\nIt must be fate that these photos found their way to you!\n\n(There are multiple photos, so you do not need to draw according to the item art, just picture whatever first-snow scene you like.)",
        artist: "み",
        received: 9
    },
    {
        ocName: "悠琉",
        giftName: "藍色琉璃珊瑚項鍊",
        giftNameAlt: "Cerulean Glass Coral Necklace",
        giftDescription: "蔚藍如海的琉璃寶石，在光線下折射出透徹的光芒，猶如波光粼粼般的海浪。以珊瑚支狀所設計的項鍊，以特殊工藝手法，將珊瑚煉入其中，形成了煥彩繽紛的模樣。",
        giftDescriptionAlt: "A cerulean glass gem shines under light, refracting a clear brilliance that reminds you of the shimmering ocean waves. The necklace is designed in the shape of a coral branch, it is crafted with a special technique that fuses real coral within, giving it a bright and colorful finish.",
        artist: "雪霜",
        received: 2
    },
    {
        ocName: "Meringue",
        giftName: "Elegant Ink Skates",
        giftNameAlt: "優雅墨水溜冰鞋",
        giftDescription: "A pair of pristine ice skates—designed to work in ink! The blade material has been tested (extensively) to glide effortlessly on any inky surface, and the shoes are made with an iridescent cloth that does not easily stain. The giver of this gift hopes that with this you can bring the elegance of skating anywhere, so long as there is ink.\n\nLikely not useable in official matches.",
        giftDescriptionAlt: "一雙設計成可以在墨水上使用的全新溜冰鞋！冰刀的材質經過大量的測試，可以在任何墨水面上順暢滑行，鞋身則是用不容易弄髒的鐳射材質布料做成。送禮者希望你可以透過這個禮物把溜冰的優雅帶到任何地方，只要那裡有墨水就行。\n\n大概不能在正式比賽使用。",
        artist: "Excabluir",
        received: 13
    },
    {
        ocName: "Gilly",
        giftName: "Favorite Band Friendship Bracelets",
        giftNameAlt: "樂團結拜繩",
        giftDescription: "Hand-strung bracelets made of colorful letter beads. Just wearing them makes you want to rock out at a concert and play your music loud! Maybe you should make some of your own to share?",
        giftDescriptionAlt: "用五彩繽紛的字母珠串成的手工手鍊。只是戴著這手環就會讓你想要在演唱會盡情搖滾或是大聲放音樂！也許你也可以自己做幾條來分享給朋友？",
        artist: "Punkoz",
        received: 1
    },
    {
        ocName: "凜",
        giftName: "捕夢網（可微DIY）",
        giftNameAlt: "Dream Catcher (Customizable)",
        giftDescription: "用絨繩+線+鳥羽毛做的自製捕夢網。中間跟左右的魷魚章魚小毛絨可以塗上你喜歡的顏色。\n\n「祝你有個好夢。」",
        giftDescriptionAlt: "A handmade dream catcher crafted from velvet cord, string, and bird feathers. The little squid and octopus plush charms in the center and on each side can be painted in any color you like.\n\n“Wishing you sweet dreams.”",
        artist: "奈奈",
        received: 4
    },
    {
        ocName: "ALT-RA",
        giftName: "GameBoy(破解版)",
        giftNameAlt: "GameBoy (Modded)",
        giftDescription: "經典的掌上型遊戲機，看似普通的外表下已經將本體改造成可以連上網及藍牙、甚至語音視訊等五花八門的未知功能？！上面還有特殊的螢光顏料繪製的圖案...或許是作者簽名吧？",
        giftDescriptionAlt: "A classic handheld console. It looked like a normal old GameBoy, but its insides have been completely reworked, giving it all sorts of new functions like online connectivity, Bluetooth, and even voice or video chat and more!?\n\nThe case is marked with glowing paint in a strange pattern. Maybe it's the creator's signature?",
        artist: "IAP",
        received: 7
    }
];

const ocArrangementData = "3,13,0,4,16,5,14,6,8,15,17,11,7,1,2,12,9,10";
const bgPatternData = "70,5,62,55,39,27,45,18,47,64,31,30,81,35,46,71,37,69,77,38,23,42,13,2,43,75,76,54,19,63,33,10,15,49,41,51,58,22,21,17,0,65,44,16,28,57,4,60,20,7,3,61,36,82,53,11,68,80,29,56,34,73,50,24,67,14,32,9,1,25,40,52,48,12,78,6,26,66,59,79,72,8,74";


const obtainedGiftData = "17,2,5,14,4,10,13,11,6,1,7,15,0,3,8,9,12,16";
const flippedCardData = "2,12,16,4,5,13,1,17,11,10,7,6,9,15,3,14,0,8";
