//==================//
//=== Guest Data ===//
//==================//

const ARTISTS = {
    "月月": {
        link: "https://x.com/yueyue_ika",
        selfTrade: false
    },
    "Huko": {
        link: "https://x.com/Tsubai_momoka",
        selfTrade: true
    },
    "Kay": {
        link: "https://x.com/kaydavault",
        selfTrade: true
    },
    "33°": {
        link: "https://x.com/sano0033x",
        selfTrade: true
    },
    "牛牛": {
        link: "https://x.com/Darunio_",
        selfTrade: true
    },
    "Tobey": {
        link: "https://x.com/Tobey____",
        selfTrade: true
    },
    "Bel": {
        link: "https://x.com/bel_by_the_sea",
        selfTrade: false
    },
    "Hazy": {
        link: "https://x.com/haze1splashit",
        selfTrade: false
    },
    "Bagaju": {
        link: "https://x.com/BaGaJu_Tw",
        selfTrade: true
    },
    "瑞拉": {
        link: "https://x.com/0121relladesuwa",
        selfTrade: false
    },
    "Silver Hawkling": {
        link: "https://x.com/shawkling",
        selfTrade: true
    },
    "七月": {
        link: "https://x.com/nanagatsu_07",
        selfTrade: true
    },
    "ヤキ": {
        link: "https://x.com/YAKIyoRi_0001",
        selfTrade: true
    },
    "缺缺": {
        link: "https://x.com/bakori514",
        selfTrade: true
    },
    "嘆子": {
        link: "https://www.plurk.com/tanzzzz",
        selfTrade: true
    },
    "般般般點": {
        link: "https://x.com/BanBanBanDian",
        selfTrade: false
    },
    "高湯": {
        link: "https://x.com/dashijiru_",
        selfTrade: true
    },
    "み": {
        link: "https://x.com/dashijiru_",
        selfTrade: true
    },
    "ㄈㄉ": {
        link: "https://www.instagram.com/vanto_chien/",
        selfTrade: true
    },
    "奈奈": {
        link: "https://x.com/LWY69805700",
        selfTrade: false
    },
    "IAP": {
        link: "",
        selfTrade: true
    }
};

const ENTRIES = [
    {
        ocName: "Owl",
        giftName: "助眠香薰套装",
        giftNameAlt: "Sleep Aid Scented Candle Set",
        giftDescription: "某小众品牌的天然植物油制成的香薰，套装里有两种香味分别是薰衣草和木质香。是大部分海产可以接受的香味。现代年轻人压力大，很适合用它来让自己好好休息一下。<br><br>用完的香薰可以作为花盆或者摆件使用。",
        giftDescriptionAlt: "An aromatherapy scented candle set made with natural essential oil by a small brand. It includes two scents: Lavender and Wood. It is very suitable for modern stress relief.<br><br>Once the candle is used up, the container can be repurposed as a flower pot or decorative piece.",
        artist: "月月",
        received: 30
    },
    {
        ocName: "Nami",
        giftName: "黑色蓝牙耳机",
        giftNameAlt: "Black Wireless Earbuds",
        giftDescription: "一副便携式黑色蓝牙耳机！虽然不是最新的款式但不管是大小还是音质都很好，似乎是某人比较了很多平台选出来的耳机。不知道收到的人喜欢什么颜色所以选择了最百搭的黑色款式。",
        giftDescriptionAlt: "A set of black wireless earbuds, It's not the newest model, but the size and sound quality is top notch. The preparer did a lot of research to pick this one up. They chose the black one as it is the most versatile color to go with any style.",
        artist: "月月",
        received: 31
    },
    {
        ocName: "小实",
        giftName: "香薰蜡烛",
        giftNameAlt: "Scented Candle",
        giftDescription: "柑橘味的香薰蜡烛，看似平平无奇但点燃后会呈现出一座小城市，无论是从气味还是外观都有着治愈的效果！<br><br>消耗完后还可以根据自己的喜好填入新的蜡液等待凝固便可再次使用。",
        giftDescriptionAlt: "A citrus-scented candle. It may appear ordinary at first, but once lit a small city emerges from the candle. Both the scent and the visual effect can light up your day!<br><br>It can be refilled with liquid wax of your liking, and it will be as good as new once the wax solidifies.",
      "numOfAlt": 1,
        artist: "Huko",
        received: 7
    },
    {
        ocName: "Shina",
        giftName: "面部刺绣缝反了的小熊玩偶",
        giftNameAlt: "Upside-down Face Teddy Bear",
        giftDescription: "一只工厂失误的错版的毛绒小熊玩具，因为脸倒转过来了所以很有趣。或许把倒转的小熊嘴看成眉毛也会很有趣。<br><br>很少见所以很具有收藏价值。",
        giftDescriptionAlt: "A factory defect Teddy Bear. Its face is curiously upside-down, maybe it will be amusing to see its mouth as eyebrow.<br><br>It's quite rare so it has great collectible value.",
        artist: "月月",
        received: 15
    },
    {
        ocName: "Kay's Octoling",
        giftName: "Jelleton Outfit Set",
        giftNameAlt: "骷髏魚套裝",
        giftDescription: "A handmade outfit based on Jelletons! Includes hat, scarf and jacket. Feel free to simplify design.",
        giftDescriptionAlt: "手工製作的套裝，是用骷髏魚的印象來設計的。內含帽子、圍巾和夾克。（繪者備註：可以隨意簡化這套衣服）",
        artist: "Kay",
        received: 5
    },
    {
        ocName: "Kay's Inkling",
        giftName: "Salmonid Outfit Set",
        giftNameAlt: "鮭魚套裝",
        giftDescription: "Outfit based on salmonids! Comes with hat, scarf and jacket. Feel free to simplify design.",
        giftDescriptionAlt: "用鮭魚的印象設計出來的套裝，內含帽子、圍巾和夾克。（繪者備註：可以隨意簡化這套衣服）",
        artist: "Kay",
        received: 36
    },
    {
        ocName: "參浩",
        giftName: "蝦子燒包",
        giftNameAlt: "Ebiyaki Shoulder Bag",
        giftDescription: "包包以可愛的蝦子燒外型設計為靈感，每一個細節都是精心設計，講究的形體，獨特的竹籤裝飾，都是對蝦子燒美食文化的完美致敬，雖然完全沒有蝦子。<br><br><b>產品特色：</b><ul><li><b>很圓的造型：</b>模仿蝦子燒外觀，充滿趣味，讓你無法抗拒。</li><li><b>很讚的肩帶：</b>黑色肩帶可調整長度，滿足各種長短需求，變成標記線也不是夢。</li><li><b>很棒的材質：</b>使用耐用材料製作，具備耐磨耐水又能保持形狀，心情不好最棒的夥伴。</li></ul>",
        giftDescriptionAlt: "A cute shoulder bag with a design inspired by Ebiyaki. Every detail is carefully crafted—the intricate shape and the unique bamboo stick decoration are a perfect tribute to Ebiyaki culinary culture, although there is no shrimp anywhere on this bag at all.<br><br><b>Product Highlights: </b><ul><li><b>The spherical shape:</b> Resembling a jumbo ball of Ebiyaki, it's hard to take your eyes off it.</li><li><b>Great Shoulder Strap:</b> The black shoulder strap can be adjusted to any length for comfort.</li><li><b>Top quality material:</b> Made from durable material, it is wear-resistant and water-resistant, it also hold its shape well, it is the perfect companion for lifting your spirits.</li></ul>",
        artist: "33°",
        received: 20
    },
    {
        ocName: "托瑪",
        giftName: "小鮭魚玩偶",
        giftNameAlt: "Smallfry Plush",
        giftDescription: "在熊商會附近買到的小鮭魚外型玩偶，材質是聚酯纖維、填充物是棉花，玩偶底部加了點塑膠粒不會亂倒。玩偶也有錄音功能，他會錄下周遭聲音然後復讀出來，覺得很吵的話把手上的麥克風拔掉就好。",
        giftDescriptionAlt: "A Smallfry plush bought from a shop near Grizzco. It is made of polyester fiber, filled with cotton, and contains small plastic pellets at the bottom to help it stand upright.<br><br>The plush also features a recording function, it would capture surrounding sounds and playing them back. If you find it noisy, just remove the little mic from its hand.",
        artist: "牛牛",
        received: 24
    },
    {
        ocName: "Isol",
        giftName: "黑膠唱片－魚子醬混亂",
        giftNameAlt: "Vinyl Record: Caviar Chaos",
        giftDescription: "神秘的黑膠唱片，發行作者不詳，歌曲內容為龐克音樂+各種鮭魚聲音，意外的好聽。",
        giftDescriptionAlt: "A mysterious vinyl record from unknown author. The tracks featured in the record are punk rock styled music mixed with Salmonid cries, the music is surprisingly well-crafted.",
        artist: "Tobey",
        received: 33
    },
    {
        ocName: "Isa",
        giftName: "The \"Egg\"ly Sweater",
        giftNameAlt: "聖\"蛋\"醜毛衣",
        giftDescription: " A handmade Salmon Run salmon egg-themed ugly holiday sweater. It's the worst thing you've ever seen. <br><br><ul><li>Power egg glass beads</li><li>Googly-eyed golden egg</li><li>Comfy-cosy-soft-and-fluffy material</li><li>Lights up. 3 flashing light pattern settings</li></ul><br>Go on and win that ugly sweater contest at your workplace/school.<br><br><span>⚠️</span><b>WARNING</b><span>⚠️</span><br>DO NOT wear this sweater near salmon territory at night with the lights activated. You WILL get rushed.",
        giftDescriptionAlt: "手工製作的鮭魚跑魚蛋主題節日醜毛衣，這是你看過最糟糕的東西。<br><br><ul><li>鮭魚卵玻璃珠</li><li>可動眼睛金鮭魚卵</li><li>舒服又暖和又軟又膨鬆的材質</li><li>內建燈所以可以發光，有三種閃燈模式</li></ul><br>用它來在你公司或學校辦的醜毛衣比賽中獲得勝利吧！<br><br><b><span>⚠️</span>警告<span>⚠️</span></b><br>晚上的時候，請不要在鮭魚地盤附近穿這件毛衣並啟動燈，要不然你會被狂潮淹沒。",
        artist: "Bel",
        received: 23
    },
    {
        ocName: "Evie",
        giftName: "Extra Special SPECIAL Stickers",
        giftNameAlt: "超級特殊<b>特殊</b>武器貼紙",
        giftDescription: "A weapon accessory to make your kit - and you - look extra flashy!! Stickers that take on the appearance of the gift recipient. Apparently there's something else… \"special\" about them…<br><br><b>Step 1:</b><br>Apply sticker to your favourite weapon<br><b>Step 2:</b><br>Charge and activate your special weapon…<br><br>…to add an extra \"oomph!\" To your special! Fireworks and the like will erupt and flurry around you when you wield and use your special weapon! You're gonna look so cool!!!<br><br><b><span>⚠️</span>WARNING<span>⚠️</span></b><br>USE ONLY in private matches, testing grounds or hero adventures.<br>DO NOT equip this sticker when participating in any official matches. Activating its effects in official battles WILL incur participation bans and/or penalties.<br><br>...I SUPPOSE you could apply them to books and stuff if you want?!",
        giftDescriptionAlt: "讓你的武器和你看起來非常華麗的武器配件！多虧了墨水科技，貼紙上面的圖案會變成使用者的樣子。這個貼紙似乎還有什麼特殊功能…<br><br><b>步驟一：</b>將貼紙貼到你喜歡的武器上<br><b>步驟二：</b>集滿並啟動你的特殊武器…<br><br>…就可以給你特殊武器增添華麗的效果！在你使用特殊武器的時候，煙火之類的效果會在你旁邊噴發亂舞。你會看起來超級酷炫！<br><br><b><span>⚠️</span>警告<span>⚠️</span></b><br>請只在私人比賽﹑試射場或英雄冒險中使用。<br>請勿在官方比賽中裝備這個貼紙，在官方戰鬥中使用這貼紙將會讓你被禁賽或是被取消比賽資格。<br><br>…想的話也是可以把貼紙貼在書或是其他的東西上！？",
        artist: "Bel",
        received: 32
    },
    {
        ocName: "Blade",
        giftName: "造型磁鐵香料罐",
        giftNameAlt: "Fresh Magnetic Spice Jars",
        giftDescription: "一套章魚魷魚造型的不鏽鋼磁鐵香料罐，總共九個，每一個大約有8公分長，另包含一個磁板。可將磁板釘在牆上來收納香料罐，也可以直接香料罐吸附在冰箱上。不僅能作為裝飾，也是居家料理的好伙伴。<br><br>送禮者事先填裝了各種常用的香料並寫上了標籤，內含香料有：辣椒粉，乾蒔蘿，胡椒粉，海鹽，乾香芹，大蒜粉，乾九層塔，孜然粉，薑黃粉。<br><br>禮物箱中還附有一隻白墨筆，可以在罐子上自行寫字，也可以用熱水擦除白墨。",
        giftDescriptionAlt: "A set of Squid and Octopus shaped stainless-steel magnetic spice jars. Each of them is approximately 8 cm x 8 cm. It comes with a metal plate. You can install the metal plate on the wall to organize these spice jars, or you can directly stick the jars on a refrigerator. It's both a cute decoration and a great tool for home cooking.<br><br>The preparer has already pre-filled the jars with commonly used spice, they are also properly labeled. The whole set contains the following spices: chili pepper powder, dried dill, grounded black pepper, grounded sea salt, dried parsley, garlic powder, dried basil, cumin powder, turmeric powder.<br><br>A white ink pen is included in the gift box, you can use it to write on the black label on the jar. Wipe the ink with hot water if you want to remove the writing. ",
        artist: "Hazy",
        received: 4
    },
    {
        ocName: "Axel",
        giftName: "熱帶水果籃",
        giftNameAlt: "Basket of Tropical Fruit",
        giftDescription: "一籃剛摘下來的溫室產新鮮熱帶水果，籃子裡面有鳳梨﹑木瓜、芒果、百香果、橘子、雪梨、香蕉、葡萄、番石榴。<br>跟一般超市裡賣的那些人工催熟的水果不同，這些是樹上成熟後才採下來的，所以跟超市買的比起來還甜了許多。<br><br>裡面還包有一個假花花圈，能給人帶來充滿獨特南島風情的聖誕節體驗。",
        giftDescriptionAlt: "A basket of freshly picked tropical fruit grown from a greenhouse. Fruit included in the basket are: pineapple, papaya, mango, passion fruit, orange, pear, banana, grape and pomegranate. Compared to the artificially ripened fruits found in supermarket, these fruit are tree ripened so they are much sweeter than usual.<br><br>There is also a flower Lei in the basket, giving you a unique tropical holiday experience.",
        artist: "Hazy",
        received: 26
    },
    {
        ocName: "Edd",
        giftName: "多功能軍刀",
        giftNameAlt: "Multi-purpose Army Knife",
        giftDescription: "有16種工具的木製手柄多功能軍刀，很適合野外露營時用。<br>內含工具有：可鎖定大刀、可鎖定小刀、開罐器、開瓶器、木塞鑽、螺絲起子﹑剪刀、木鋸、鑷子﹑鉗子、尺、電線剪、多用途鉤子、原子筆、放大鏡。<br>末端附有LED燈，可在使用上述工具時當作照明。<br><br>總之就是方便拿來解決各種生活上的『疑難雜症』的工具。",
        giftDescriptionAlt: "A multi-purpose army knife with wooden handle, there are 16 tools included in the knife, suitable for camping.<br><br>Included tools: large locking blade, small locking blade, can opener, bottle opener, corkscrew, screwdriver, scissors, tweezers, pliers, ruler, wire stripper, multi-purpose hook, ballpoint pen, magnifying glass.<br>There is a LED flashlight as well, giving you more light while using the tool listed above.<br><br>Let's just say it's a tool that's great for solving all kinds of \"issue\" you have in life. ",
      "numOfAlt": 1,
        artist: "Hazy",
        received: 6
    },
    {
        ocName: "Angelica",
        giftName: "手工魚骨樹脂標本",
        giftNameAlt: "Handmade Fish Skeleton in Resin",
        giftDescription: "把貨真價實的魚骨封在樹脂裡做成的魚骨標本，橫長大概100公分，重量似乎高達150公斤。據說全程都是親手製作，包括處理魚肉。<br><br>裡面的骨頭被非常細心的清理過，一點肉的殘渣都沒有，不過可以稍微在白骨上看見一些深藍色液體的痕跡。<br><br>能隱約聞到一絲雙氧水的味道。",
        giftDescriptionAlt: "A fish skeleton model (made with real fish) that is sealed in resin, it has a whooping 100 cm width, it weighs about 150 kilograms. The whole thing is handcrafted from scratch, even including the part where the fish is processed.<br><br>The skeleton is meticulously cleaned, there is not a single trace of flesh left, but there are smears of dark blue liquid on some of the bones.<br><br>You can slightly detect a hint of peroxide. ",
        artist: "Hazy",
        received: 27
    },
    {
        ocName: "B",
        giftName: "手做木質吊飾",
        giftNameAlt: "Handmade Wooden Charm",
        giftDescription: "親手雕刻的木質吊飾，由於沒有製作過雕刻類作品而失敗了很多次，最後終於做出了滿意的作品。<br>禮物盒內還有一張紙條，字跡不太工整的寫著<br>「希望你會喜歡這件禮物！<br>p.s. 由於受傷都是傷口所以字跡不好看，不好意思」<br>訊息尾端還畫了一個死亡章魚小塗鴉。",
        giftDescriptionAlt: "A hand-carved wooden charm. crafted by someone who had no prior experience in wood carving. After numerous attempts, they finally achieved a result they were satisfied with.<br><br>There's a note in the gift box, the handwriting is a bit shaky.<br>\"I hope you like it!<br>P.S. I accidentally cut myself while making it so my handwriting became really messy. Sorry!\"<br>They doodled a splatted octopus at the end of the message.",
        artist: "Bagaju",
        received: 18
    },
    {
        ocName: "卡可",
        giftName: "鍋蓋魚造型空拍機",
        giftNameAlt: "Slammin' Lid Photo Drone",
        giftDescription: "以武器子空拍機為原型來進行改造的特殊款式空拍機。<br><br>上頭的鍋蓋魚是某兩個老打工魷傾盡心力還原的微縮版本，使用時可以暫時的體驗到被鍋蓋支配的恐懼感，雖然有點惡趣味但也是送禮人絞盡腦汁的得意之作！",
        giftDescriptionAlt: "A special photo drone modified from the original Sheldon Photo Drone.<br><br>Two dedicated Salmon Run regulars poured their heart into making the miniature Slammin' Lid on top of the drone, allowing the users to temporarily experience the terror of being reigned by Slammin' Lid.<br><br>It's a masterpiece of quirky humor that the preparers has put some serious thought into!",
        artist: "瑞拉",
        received: 39
    },
    {
        ocName: "Leo",
        giftName: "Handmade Horrorboros Scarf",
        giftNameAlt: "手工辰龍圍巾",
        giftDescription: "The gift is a soft yarn scarf in the shape of the king salmonid Horrorboros. <br><br>The head is round filled with cotton, with bright yellow buttons as eyes…<br>The body itself is the scarf part where is flat but has a pattern that represents the scales, little hanging decorations every space and ends with small tuffs that looks like his tail.",
        giftDescriptionAlt: "一個辰龍造型的毛線圍巾。<br><br>圓圓的頭裡塞滿了棉花，眼睛則是用亮黃色的鈕釦做的，辰龍的身體就是圍巾本體，圍巾本身是平的但上面有像鱗片般的圖案。<br>圍巾上掛著許多小裝飾來展現辰龍身上的各個部位，尾巴也是用毛毛的擺飾做的。",
        artist: "Silver Hawkling",
        received: 38
    },
    {
        ocName: "姆姆",
        giftName: "魷空塔造型薑餅屋",
        giftNameAlt: "Inkopolis Tower Gingerbread House",
        giftDescription: "將近半隻魷高的對戰塔等比縮小薑餅屋！因為是製作了冬日造型的版本所以灑上了致死量的糖霜，尺寸和複雜度都超過送禮者的負荷範圍而不得不請外援一起製作！(但很顯然外援才是主要製作者）<br>甜膩程度和美味程度都是一流的！如果吃不完的話就邀請親朋好魷一起分享吧！",
        giftDescriptionAlt: "A gigantic gingerbread house modeled after the Inkopolis Tower, it is as tall as half of an Inkling! It's winter themed so the pastry is covered with unholy amount of icing.<br><br>The size and the complexity of this pastry is absolutely out of the preparer's ability to make, so they had some assistence from a helping hand. (It is very apparent that the helping hand was the one who made the majority of the gingerbread house)<br><br>The sweetness and taste is top tier! If you can't finish it alone, you should share it with your family and friends!",
        artist: "瑞拉",
        received: 9
    },
    {
        ocName: "久人",
        giftName: "占地鬥士套組",
        giftNameAlt: "Tableturf Battle Bundle",
        giftDescription: "最新彈占地鬥士卡牌補充包一盒、入門用基礎套組一盒、卡盒一個、透明卡套兩包。<br><br>不管是新手或是老手都能夠用到的套組！一起來玩占地鬥士吧！",
        giftDescriptionAlt: "A bundle that comes with a latest Tableturf Battle booster pack, a basic starter deck, a deck box and two packs of clear card sleeve.<br><br>It's a set both newbie and veteran Tableturf Battler would enjoy! Let's play Tableturf Battle together!",
        artist: "七月",
        received: 0
    },
    {
        ocName: "焚",
        giftName: "三個毛絨手作",
        giftNameAlt: "3 Pieces Handmade Soft Accessories",
        giftDescription: "<ol><li><b>純棉毛絨手套</b>：材質摸上去有點硬邦邦，手套中間的聯結處可以拆下來。雖然考慮到了連結處很累贅，但為了聖誕氛圍又沒摘下來，最後變成了可拆卸的樣子。</li><li><b>針織圍巾</b>：參考了某個儲物櫃玩偶，但是設計做的很不盡人意，所幸保暖程度很好，不過真的會有人帶著麼奇怪的圍脖嗎？</li><li><b>電池鯰魚掛件</b>：也是針織。但是由於丟三落四的老毛病在製作的時候忘記加上掛件使用的扣環，只能用來當擺件</li></ol>每個做的都差點意思，最後只好把它們都塞在一起試圖彌補失誤。",
        giftDescriptionAlt: "<ol><li><b>100% Pure Cotton Mitten</b>:<br>The texture is a bit stiff, the string between the mitten is detachable. The maker thought the string might not be necessary, but they wanted to maintain the holiday vibe, so they made it detachable.</li><li><b>Knitted Scarf</b>:<br>The design is inspired by a certain locker doll. It has a quirky look, but it offers plenty of warmth. Would anyone actually wear this scarf on street though?</li><li><b>Zapfish Accessory</b>:<br>Another knitted item, it was originally intended to be a keychain, but the maker is a bit scatterbrained and they forgot to attach the keyring hook, so it can only serve as a decoration.</li></ol>Each of these item has its own flaw, so the maker bundled them together into one gift, hoping it would make up for the individual imperfections.",
      "numOfAlt": 1,
        artist: "ヤキ",
        received: 13
    },
    {
        ocName: "莉莉",
        giftName: "未來風單邊護肩　鐳射",
        giftNameAlt: "Iridescent Shoulder Brace Top",
        giftDescription: "某運動品牌未公開的設計之一、在經過上層的同意後以半官方形式進行加工並打算以私人禮物的形式贈送出去。設計中加入了魷章友好和鐳射材質的拼接，無論種族或性別都可以穿著！",
        giftDescriptionAlt: "An unpublished cloth design from a certain sportswear brand. After receiving permission from their superiors, the preparer add their own personal touch to the design, turning it into a private gift in the form of semi-official gear.<br><br>The cloth features a shoulder brace made from iridescent material, it is a stylish unisex clothing that's perfect for both Inkling and Octoling!",
        artist: "瑞拉",
        received: 34
    },
    {
        ocName: "薄荷",
        giftName: "水母与冬日摄影集",
        giftNameAlt: "Photography Series: Jellyfish & Winter",
        giftDescription: "学生个人摄影作品集 | A5尺寸 | 6张<br><br>本摄影集收录了6张精心拍摄的冬日限定水母主题作品，采用A5尺寸设计，每张都可以单独拆出珍藏。通过瞬间的镜头捕捉与简洁的文字介绍，这些作品带你走进水母在寒冷冬季中的温馨日常，感受它们的可爱。<br><br>如果您对这些作品感兴趣，或想支持摄影师的创作，请联系附赠的学生名片。期待您的欣赏与支持！",
        giftDescriptionAlt: "This photo collection include 6 carefully shot photo themed around winter and jellyfish. It's A5 sized, each photo can be taken out individually for display. Through the captured moments and concise descriptions, This collection invites you into a cozy world of Jellyfish's daily life in winter.<br><br>If you're interested in the photographer's other work or wish to offer support, please reach out using the student business card included in the box. Thank you in advance for your support and appreciation!",
        artist: "缺缺",
        received: 11
    },
    {
        ocName: "白桃",
        giftName: "玩具槍造型拍立得相機",
        giftNameAlt: "Toy Gun Style Instant Camera",
        giftDescription: "利用潛水魚為靈感所設計的玩具槍造型拍立得相機，隨機附贈一盒６入空白底片。<br>有著特殊準星對焦系統，利用墨水進行充電，槍身的顏色會隨著墨水的顏色改變。<br>底片排出槽位於槍的尾端，拍攝後需要3~5分鐘顯影。<br>似乎很適合和朋友一起拍攝有趣的照片！",
        giftDescriptionAlt: "A toy gun style instant camera with design inspired by Flipper-Flopper, comes with 6 pack of film. It has a unique crosshair len focus system, it is charged up by ink, the color of the gun changes to your color just like ink weapons.<br><br>After taking a picture, the film would come out from the buttom of the gun, It takes 3-5 minutes for the photos to develop.<br><br>Use this to capture fun moments with your friends!",
        artist: "嘆子",
        received: 35
    },
    {
        ocName: "馬提歐拉",
        giftName: "一盒手工餅乾",
        giftNameAlt: "A Box of Homemade Cookie",
        giftDescription: "一份用保鮮盒裝的手工餅乾，約十幾片，<br>開蓋便能聞到撲鼻而來的香味，餅乾的質地很酥鬆，盒底積攢了不少餅乾屑。<br>口味有巧克力、焦糖和奶酥，造型則有水母、魷魚跟愛心。<br><br>旁邊附有一張便條，寫著｢請於三天內食用完畢｣。",
        giftDescriptionAlt: "A Box of homemade cookies in a food storage container, there are 10+ pieces of cookie inside. You can smell the buttery goodness the instant you open the box! The texture of the cookies is crispy and crumbly, there are some cookie crumbles in the bottom of the box.<br><br>The flavors of the cookies are chocolate, caramel and butter cream, in the shape of Jellyfish, Squid and heart.<br><br>There is also a note, it reads \"Please finish it in three days.\"",
        artist: "般般般點",
        received: 22
    },
    {
        ocName: "格庫拉",
        giftName: "噴漆畫",
        giftNameAlt: "Spray Paint Art",
        giftDescription: "一幅畫在木板上的噴漆畫，尺寸約20×20公分。<br>內容是用跳躍的色彩描繪的尚興廣場的地標，物件間沒有固定的透視關係，似乎是隨意編排在畫面上的。<br>木板背面後面釘著掛勾跟支架，可以直接掛在牆面或立在桌上。<br><br>隨附一張放在信封中的素色卡片，上面寫著:<br>｢致未曾謀面的鮮活靈魂:<br>年末將至，尚興廣場瀰漫著濃厚的節慶氛圍，<br>街道的空氣像是糖漿一般，浸泡其中便有股不由自主的喜悅；<br>城市的景緻變得色彩斑斕，光看就讓人感到微醺。<br>一時興起想把所感描繪出來，便有了此隨興之作。<br>無論你是否同在這座城市，希望你能一起感受這份寒冬無法止息的活力。<br>希望彼此今年有個愉快的末尾 :)｣",
        giftDescriptionAlt: "A piece of art created on a wooden board,  approximately 20 cm x 20 cm.<br>The artwork depicts various location in Inkopolis Square in vibrant colors. The perspective between objects is not fixated, seemed like the artist casually arranged the element in the art.<br><br>The back of the board has both a hook and a stand, allowing you to display it on a wall or place it on furniture.<br><br>There is a envelope in the box as well, it contains a simple greeting card that reads:<br>\"To the fresh soul I've never met:<br>The end of the year is near, and Inkopolis Square is filled with a rich holiday atmosphere.<br>The air in the streets is like sweet syrup, bringing me endless joy as I immerse myself in it.<br>The cityscape dazzles with color, it captivated me deeply.<br>It inspired me to create this piece.<br>Whether you live in this city or not, I hope you can also feel this boundless energy that even the coldest night cannot extinguish.<br>Wishing you a pleasant end of the year. :)\"",
        artist: "般般般點",
        received: 8
    },
    {
        ocName: "瑪尤嘉",
        giftName: "武器吊飾(麻辣魷物2024年冬款)",
        giftNameAlt: "Weapon Charms (Squid Sister 2024 Winter Ver.)",
        giftDescription: "一種可以合法加裝在武器上的吊飾，用經過認證的，輕量且不易損壞爆裂的材質製成。<br>(加裝位置，槍類武器可以參考有這類物品的FPS遊戲，其他武器隨意發揮，建議加裝在手把。)<br>當然也可以當成普通的吊飾。<br><br>2024年由麻辣魷物官方發售的冬季祭典限定款。<br>因為限量的關係，網路二手價被炒得很高，<br>不過明年似乎有望復刻。",
        giftDescriptionAlt: "Two weapon charms for decorating your weapon. It is made from a lightweight yet durable material that is approved for use during official matches.<br>(For attaching it to shooter-type weapon, you can refer to other FPS game that has similar item, for other weapons, feel free to hang it however you like, It is recommended to attach it on handles.)<br>Of course, it can also be used as a regular keychain.<br><br>This is a limited-edition, winter Splatfest-themed charm, sold by Squid Sisters' Productions in 2024. Since it's a limited item, the price has gone way up in the market.<br>However, there is a chance it might get a reprint next year.",
        artist: "般般般點",
        received: 10
    },
    {
        ocName: "阿斯特",
        giftName: "熟成魚肉",
        giftNameAlt: "Fillet of Fish",
        giftDescription: "一塊熟成得恰到好處的魚肉，約兩人份，<br>可以生食也可以煮熟。",
        giftDescriptionAlt: "A fillet of fresh fish meat, approximately two serving. It's sashimi graded, you can have it raw, or cook it in anyway you like.",
        artist: "般般般點",
        received: 12
    },
    {
        ocName: "鳩",
        giftName: "懷爐跟燃油",
        giftNameAlt: "Refillable Hand Warmer with Fuel",
        giftDescription: "可以在冬天暖手的產品，功能類似暖暖包。<br><br>隨禮物贈送的信裡，靠上方寫著:<br>｢這是我冬天愛用的小物，<br>很適合怕冷跟手容易冰冷的人，<br>希望它可以伴你度過寒冷的冬季(♡˙︶˙♡)｣<br><br>中下的篇幅則夾雜簡單的塗鴉寫著使用說明和注意事項。<br><br><b>使用說明:</b><ol><li>將火口蓋子打開，把漏斗蓋上去。</li><li>倒入燃油(一刻度能燃燒約六小時，最多能裝三刻度)後，</li><li>將漏斗轉90度，讓燃油流入。</li><li>蓋上火口後，用打火機燒火口6~7秒。</li><li>開始發熱後就可以放入保護套中。</li></ol><b><span>⚠️</span>注意事項<span>⚠️</span></b><ul><li>請務必用保護套，以免燙傷。</li><li>盡量不要和其他東西放在同一個口袋。</li></ul>",
        giftDescriptionAlt: "A product that can warm up your hand in winter. A letter is included in the gift, the top part reads:<br><br>\"This is something I use a lot in the winter,<br>it's great for freezing weather or cold hands, <br> I hope it can warm you up through the chilly winter season(♡˙︶˙♡)\"<br><br>The middle section has some simple doodle of handling instruction and important notes.<br><br><b>Instruction for use:</b><ol><li>Remove the burner unit and cover the opening with funnel.</li><li>Pour fuel into the funnel (1 unit of fuel can provide 6 hours heat, the warmer holds maximum 3 unit of fuel)</li><li>Turn the funnel 90 degree, the fuel will flow into the warmer.</li><li>Remove the funnel and slot the burner unit back to the opening, apply flame to the burner unit with a ligher for 6-7 seconds.</li><li>After it started heating, put the device into the protective fabric bag.</li></ol><b><span>⚠️</span>Caution<span>⚠️</span></b><ul><li>Please keep the device in the protective fabric bag at all time during use to prevent burning.</li><li>Do not put anything else in the same pocket with the warmer while it's on.</li></ul>",
        artist: "般般般點",
        received: 37
    },
    {
        ocName: "奧斯",
        giftName: "星空投影燈",
        giftNameAlt: "Starry Sky Projector Light",
        giftDescription: "是個尺寸比一般床邊小夜燈還大一些的球形投射燈，平時看上去像顆月亮，一旦在黑暗的房間打開它，四面八方的牆面頓時將充滿著星空與星群，投射的燈光也是溫和的橘黃色。<br><br>球燈旁附贈的小卡上寫著：<br><br>｢你好～聖誕禮物的交換者，不曉得這個禮物你是否喜歡。<br>會挑選這樣禮物是因為它與我家鄉能看到的星空十分相似，畢竟尚興即使到了夜晚也仍舊亮著夜燈十分歡騰，而這樣的夜空似乎不一定每天都能看到，所以也想分享給你這份驚喜。<br>如果你能喜歡它的話那真是太好了，祝你有個美麗的聖誕夜。｣",
        giftDescriptionAlt: "A spherical projector light, it is slightly larger than the typical bedside table lamp. The lamp itself resembles a moon, and when you turn it on in a dark room, the walls will be filled with starry night. The projector has a warm, amber colored light.<br><br>It comes with a small card that reads: <br><br>\"Hello! To whoever received this gift, did you like it?<br>I picked this gift because it reminds me of the starry night sky from my hometown. Since Inkopolis is a city that is bustling with lights even after dark, it's much harder to see the stars in the night sky, so I wanted to share the joy of stargazing with you, I hope you enjoy this gift.<br>Wish you a wonderful holiday night.\"",
        artist: "高湯",
        received: 3
    },
    {
        ocName: "咪家的海產",
        giftName: "小雞群",
        giftNameAlt: "A brood of baby chicks",
        giftDescription: "｢生蛋節快樂！ 不知道從哪裡的蛋剛孵出了一群黃色小雞，一不小心就把路過的海產當成雙親了！一個人出門太危險了，帶上這些吧...｣<br>領著蹦蹦跳跳小雞群的白色魷魚留下這句話之後就使用超跳飛走了。 (小雞的數量可以超過3隻)",
        giftDescriptionAlt: "\"Merry Chickmas! A brood of baby chicks hatched from eggs out of nowhere, they seemed to have imprinted on you! It's dangerous to go alone, Take them...\"<br>a white squid said this to you and super jumped away, leaving a bunch of energetic chicks behind. (You can draw more than 3 baby chicks)",
        artist: "み",
        received: 25
    },
    {
        ocName: "黛黛",
        giftName: "章魚香氛沐浴球",
        giftNameAlt: "Octopus-shaped Scented Bath Bombs",
        giftDescription: "不知道為什麼只有章魚款式的香氛沐浴球，一組有五顆，七彩繽紛的章魚用小小的檜木泡澡造型桶裝起來，丟入水裡便能隨即產生大量香氛泡泡！<br><br>即使不當作沐浴用品也是非常紓壓的香氛玩具，能假想將敵人丟入水裡欣賞海產消失殆盡帶來的療癒感，非常適合作為結束高壓訓練或對戰後的放鬆選擇，建議避免一次投入兩顆以上。",
        giftDescriptionAlt: "A set of octopus-shaped bath bombs, there are 5 colorful octopus bath bombs in a tiny cypress bathtub container.<br><br>Simply drop a bath bomb into water, and it will start producing endless fizzing fragrance foam! Even if you don't use it as a bath product, it still serves as a great stress-relief scented toy, just imagine tossing your opponent into the water and watching them disintegrate, what a refreshing feeling!<br><br>Either way, this product is a great choice for relieving stress after an intense training session or ink battle. It is recommended not to use more than two at once.",
        artist: "ㄈㄉ",
        received: 2
    },
    {
        ocName: "小莓",
        giftName: "手工水母娃",
        giftNameAlt: "Handmade Jellyfish Plush",
        giftDescription: "手工做的水母娃，雖然看上去正常但其實線比較歪歪扭扭，是送禮者花了很多時間去做的。",
        giftDescriptionAlt: "A hand-sewn jellyfish plush, it has a natural curly shape just like a real jellyfish. On a closer look, the stitching looked a bit crooked. The preparer spent many nights making it.",
        artist: "奈奈",
        received: 21
    },
    {
        ocName: "春花",
        giftName: "粉紅色Otamatone",
        giftNameAlt: "Pink Otamatone",
        giftDescription: "一種會發出特殊音調的電子樂器。<br>將一手放在桿上的感壓帶狀控制器來調節音調，另一手擠壓樂器的頭部來發出音色，頭的後面有開關可以調節八度。<br>（推薦直接google或者在yt上找它的音色）<br><br>用這個樂器來演奏出有趣的歌曲吧！",
        giftDescriptionAlt: "An electronic instrument that makes a peculiar sound. It requires two hands to play, one hand controls the pitch of the tune by adjusting the ribbon controller on the stem, the other hand holds and squeezes the head to produce sound, switch on the back of the head allows users to change octave. (You can google the sound it makes.)<br><br>Have fun playing songs with this instrument!",
        artist: "奈奈",
        received: 28
    },
    {
        ocName: "哲",
        giftName: "古代地球儀",
        giftNameAlt: "Globe from Ancient Humanity",
        giftDescription: "直徑20cm，高30cm的銅黃色地球儀。記錄著人類在滅絕前地球的狀態（12k年前）。本來是又老舊又破損地被廢棄在地底下，被送禮者發現後經過一番修復跟保養，恢復成像新的一樣。有一些小瑕疵就是在轉動的時候會發出一點點老舊的吱呀聲，這個聲音送禮者怎麽修都沒修好。但這是一個非常浪漫的裝飾品。",
        giftDescriptionAlt: "A brass-colored terrestrial globe with a sphere measuring 20 cm in diameter and a stand that is 30 cm tall. This globe is a model of Earth as it appeared 12,000 years ago, back when humans still roamed the planet.<br><br>It was originally an old, broken junk found somewhere underground, but the preparer has restored it to its former glory. While it makes a slight squeaking sound when rotated, which is a defect the preparer couldn't fix, it remains a charming and romantic decoration.",
        artist: "奈奈",
        received: 19
    },
    {
        ocName: "小莫",
        giftName: "求生背包",
        giftNameAlt: "Survival Backpack",
        giftDescription: "每個家庭都該擁有一個的生存套組。裡面包含了乾淨的水與口糧、照明用具及保暖物品以及各種必要的醫療藥品。<br><br>背包本體似乎是送禮者本人親手縫製的。",
        giftDescriptionAlt: "An emergency survival kit that every household should have. It includes clean water, food rations, warmth product, lighting equipments, and essential medical supplies.<br><br>The backpack is hand-sewn by the preparer themselves.",
        artist: "IAP",
        received: 17
    },
    {
        ocName: "諾亞",
        giftName: "一夜干",
        giftNameAlt: "Overnight-Dried Fish",
        giftDescription: "把魚風乾、樸實的鹽味、好吃！",
        giftDescriptionAlt: "Fish dried in breeze, plain salt flavor, yum!",
        artist: "IAP",
        received: 16
    },
    {
        ocName: "阿了",
        giftName: "拍立得相機",
        giftNameAlt: "Instant Camera",
        giftDescription: "方便攜帶、操作簡單，最特別的即時沖洗特性，能夠隨時保存實體回憶的好幫手，盡管去拍吧！",
        giftDescriptionAlt: "Convenient and easy to use, this instant camera develops film in a flash.<br><br>It is a great tool for preserving memories in physical form. Capture moments to your heart's content!",
        artist: "IAP",
        received: 29
    },
    {
        ocName: "小知",
        giftName: "水母造型玻璃筆",
        giftNameAlt: "Jellyfish Style Glass Dip Pen",
        giftDescription: "筆內繽紛的線纏繞旋轉，像是在湛藍色的海洋裡漂浮著，玻璃筆不需施力就能滑順書寫。<br><br>筆尖脆弱，請勿壓筆避免碎裂。",
        giftDescriptionAlt: "The delicate marking gently swirl within the glass pen, like a jellyfish drifting in cerulean ocean. Dip it in pen ink, this pen writes smoothly without needing any pressure.<br><br>The tip of the pen is fragile, please avoid pressing too hard to prevent chipping.",
        artist: "IAP",
        received: 14
    },
    {
        ocName: "潮騷",
        giftName: "溜溜球(海浪Z型)",
        giftNameAlt: "Yo-Yo (Wave-Z style)",
        giftDescription: "這不只是小朋友的玩具，更是一項帥氣的專門運動！這個溜溜球上有夜光效果，還有由送禮者親手畫上海浪的圖案。<br><br>帶著這顆獨一無二的小球練習技巧去跟你朋友炫耀吧！",
        giftDescriptionAlt: "A Yo-Yo isn't just any kid's toy, it is a cool professional sport! This Yo-Yo glows in the dark, the preparer hand-painted the wave marking on it.<br><br>Practice your skills with this unique Yo-Yo and show it off to your friends!",
        artist: "IAP",
        received: 1
    }
];