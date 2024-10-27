const ENABLE_COOKIE = true;

const COOKIE_EXPIRE_DEFAULT_DAYS = 7;
// const MINUTE = (1/1440);

const COOKIE = {
    OC_ARRANGEMENT: "ocArrangement",
    PATTERN: "pattern",
    OBTAINED_GIFT: "obtainedGift",
    CHOSEN_NUM: "chosenNum"
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    if (ENABLE_COOKIE) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
    }
    return "";
}

function deleteCookies(cname) {
    document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

function deleteAllCookies() {
    console.log(document.cookie);
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;Path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        console.log(document.cookie);
    });
}

//   function checkCookie() {
//     let username = getCookie("username");
//     if (username != "") {
//      alert("Welcome again " + username);
//     } else {
//       username = prompt("Please enter your name:", "");
//       if (username != "" && username != null) {
//         setCookie("username", username, 365);
//       }
//     }
//   }