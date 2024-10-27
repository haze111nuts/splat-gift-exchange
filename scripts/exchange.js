//============================//
//    Functional Variables    //
//============================//

var OBTAINED_GIFT_INDEX = [];

var OC_ARRANGED = [];

var GIFT_PILE = [];

var CURRENT_OC_INDEX = 0;

//======================//
//         Utils        //
//======================//

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initExchangeData(ocArranged = [], giftPile = [], obtainedGifts = []) {
    if (ocArranged.length)
        OC_ARRANGED = ocArranged;
    else {
        OC_ARRANGED = [].concat(ENTRIES);
        shuffleArray(OC_ARRANGED);
    }
    GIFT_PILE = giftPile.length ? giftPile : [].concat(ENTRIES);
    OBTAINED_GIFT_INDEX = obtainedGifts.length ? obtainedGifts : [];
}

//=========================//
//    Handle Gift Pulls    //
//=========================//

// must be called after drawGift() or the the machine will broke
function nextOC() {
    CURRENT_OC_INDEX++;
}

function findLargestFamilyNoSelfTrade(ocList) {
    var firstSelfTradeOC = ocList.find(oc => !ARTISTS[oc.artist].selfTrade);
    if(ocList.length === 0 || !firstSelfTradeOC)
        return undefined;

    var artistsOcCounts = {};
    var currentMax = firstSelfTradeOC.artist;
    var currentMaxCount = 1;
    for (const oc of ocList) {
        // exclude current oc artist, only count people that disable self trade
        if (oc.artist !== OC_ARRANGED[CURRENT_OC_INDEX].artist && !ARTISTS[oc.artist].selfTrade) {
            if (artistsOcCounts[oc.artist] === undefined) {
                artistsOcCounts[oc.artist] = 1;
            } else {
                artistsOcCounts[oc.artist]++;
            }
    
            if (artistsOcCounts[oc.artist] > currentMaxCount) {
                currentMax = oc.artist;
                currentMaxCount = artistsOcCounts[oc.artist];
            }
        }
    }
    return currentMax;
}

function drawGift() {
    var randomGift;
    var currentOCArtist = OC_ARRANGED[CURRENT_OC_INDEX].artist;

    var waitingOC = OC_ARRANGED.slice(CURRENT_OC_INDEX+1);
    // check the artist that still has the biggest group of oc without gift
    var largestFamilyNoSelfTrade = findLargestFamilyNoSelfTrade(waitingOC);
    console.log("####################################");
    console.log("biggest family that disabled self trade: "+ largestFamilyNoSelfTrade);
    console.log("group member: ");
    console.log(waitingOC.filter(oc => oc.artist === largestFamilyNoSelfTrade) );
    // find all the available gift for this group of oc
    var giftPoolForFamily = GIFT_PILE.filter(entry => entry.artist !== largestFamilyNoSelfTrade);
    console.log("available gift for this group: ");
    console.log(giftPoolForFamily);

    // if there is still someone in pool that disable selfTrade and
    // if the amount of available gift for this group is equal or smaller than the size of this group, then there is danger of self trade
    if ( largestFamilyNoSelfTrade &&
         giftPoolForFamily.length <= waitingOC.filter(participants => participants.artist === largestFamilyNoSelfTrade).length) {
        // assign current gift from any of this artist's oc
        console.log("danger of self trade!");    

        var availableGifts = GIFT_PILE.filter(entry => entry.artist === largestFamilyNoSelfTrade);
        randomGift = availableGifts[Math.floor(Math.random() * availableGifts.length)];
        console.log("assign a random gift from the family to current OC: ");    
        console.log(availableGifts);
        console.log("the gift chosen is: ");
        console.log(randomGift);    

    } else {
        // if no danger of self trade, proceed as normal
        var giftPoolForCurrentOC;

        // if selfTrade is permitted by artist
        console.log("self trade: " + ARTISTS[currentOCArtist].selfTrade);
        if (ARTISTS[currentOCArtist].selfTrade) {
            // only exclude current OC
            giftPoolForCurrentOC = GIFT_PILE.filter(entry => entry !== OC_ARRANGED[CURRENT_OC_INDEX])        
        } else {
            // exclude all oc by this artist
            giftPoolForCurrentOC = GIFT_PILE.filter(entry => entry.artist !== currentOCArtist);
        }

        console.log("available gift for current oc: ");
        console.log(giftPoolForCurrentOC);

        randomGift = giftPoolForCurrentOC[Math.floor(Math.random() * giftPoolForCurrentOC.length)];
        // to handle lonely oc problem
        if (OC_ARRANGED.length - CURRENT_OC_INDEX === 2 && giftPoolForCurrentOC.some(r => waitingOC.includes(r)) && giftPoolForCurrentOC.length === 2) {
            console.log("detected lonely OC! OC that haven't get gift and still has their own gift in gift pool: ");
            var lonelyOCsGift = waitingOC.filter(value => giftPoolForCurrentOC.includes(value))[0];
            randomGift = lonelyOCsGift;
        }
    }
    GIFT_PILE = GIFT_PILE.filter(entry => entry != randomGift);
    OBTAINED_GIFT_INDEX.push(ENTRIES.indexOf(randomGift));
    return randomGift;
}

function printOCList() {
    let output = "";
    let rank = 1;
    for (var oc of OC_ARRANGED)
        output += rank++ + ". " + oc.ocName + "  ------  " + oc.artist + "\n";

    console.log(output);
}