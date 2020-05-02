window.onload = main;

function main() {
    var backBtn = document.getElementById("backButton");
    if (backBtn !== null) { // not all pages have back button
        backBtn.addEventListener("click", () => {
            history.back();
        });
    }

    var loginBtn = document.getElementById("login");
    if (loginBtn !== null) { // not all pages have login button
        /* Grab Database Data from Webservice */
        var request = new XMLHttpRequest();
        request.addEventListener("readystatechange", login);
        request.open("POST", "http://localhost:3000/");
        request.send();
    }

    /* Process Login Data from Database */
    function login() {
        if (this.readyState == 4 && this.status == 200) {
            var loginData = JSON.parse(this.responseText);
            loginBtn.addEventListener("click", (e) => {
                e.preventDefault();
                var email = document.getElementById("email").value.trim();
                var password = document.getElementById("password").value.trim();
                var error = document.getElementById("error");
                var incorrect = document.getElementById("incorrect");
                var userType = validateCredentials(email, password, loginData);
                if (userType !== null) {
                    error.classList.add("d-none");
                    incorrect.classList.add("d-none");
                    if (userType === "admin") {
                        window.location.href = "management.html";
                    } else { // userType === "student"
                        window.location.href = "itemSearch.html";
                    }
                } else if (!validateEmail(email)) {
                    incorrect.classList.add("d-none");
                    error.classList.remove("d-none");
                } else if (validateEmail(email)) {
                    incorrect.classList.remove("d-none");
                    error.classList.add("d-none");
                }
            });
        }
    }

    var itemEntryLog = document.getElementById("item-entry-log");
    if (itemEntryLog !== null) { // not all pages have item entry log
        /* Grab Database Data from Webservice */
        var request = new XMLHttpRequest();
        request.addEventListener("readystatechange", itemEntryHandler);
        request.open("POST", "http://localhost:3000/itemlog");
        request.send();
    }

    /* Process Item Entry Data from Database */
    function itemEntryHandler() {
        if (this.readyState == 4 && this.status == 200) {
            var itemEntryData = JSON.parse(this.responseText);
            var row, time, photo;
            for (var i = 0; i < itemEntryData.length; i++) {
                if (itemEntryData[i].timestamp_claimed === null) {
                    time = itemEntryData[i].timestamp.split(/T|\./);
                    row = itemEntryLog.appendChild(document.createElement("tr"));
                    row.appendChild(document.createElement("td"))
                      .appendChild(document.createTextNode(
                        time[0] + "\n" + militaryToStandardTime(time[1])));
                    row.appendChild(document.createElement("td"))
                      .appendChild(document.createTextNode(itemEntryData[i].itemname));
                    row.appendChild(document.createElement("td"))
                      .appendChild(document.createTextNode(itemEntryData[i].location));
                    row.appendChild(document.createElement("td"))
                      .appendChild(document.createTextNode(itemEntryData[i].description));
                    photo = row.appendChild(document.createElement("td"))
                      .appendChild(document.createElement("a"));
                    photo.href = itemEntryData[i].item_photo;
                    photo.appendChild(document.createTextNode(itemEntryData[i].item_photo));
                }
            }
        }
    }

    var itemClaimLog = document.getElementById("item-claim-log");
    if (itemClaimLog !== null) { // not all pages have item claim log
        /* Grab Database Data from Webservice */
        var request = new XMLHttpRequest();
        request.addEventListener("readystatechange", itemClaimHandler);
        request.open("POST", "http://localhost:3000/itemlog");
        request.send();
    }

    /* Process Item Claim Data from Database */
    function itemClaimHandler() {
        if (this.readyState == 4 && this.status == 200) {
            var itemEntryData = JSON.parse(this.responseText);
            console.log(itemEntryData);
            var row, time, claim, photo;
            for (var i = 0; i < itemEntryData.length; i++) {
                if (itemEntryData[i].timestamp_claimed !== null) {
                    time = itemEntryData[i].timestamp.split(/T|\./);
                    claim = itemEntryData[i].timestamp_claimed.split(/T|\./);
                    row = itemClaimLog.appendChild(document.createElement("tr"));
                    row.appendChild(document.createElement("td"))
                      .appendChild(document.createTextNode(
                        time[0] + "\n" + militaryToStandardTime(time[1])));
                    row.appendChild(document.createElement("td"))
                      .appendChild(document.createTextNode(
                        claim[0] + "\n" + militaryToStandardTime(claim[1])));
                    row.appendChild(document.createElement("td"))
                      .appendChild(document.createTextNode(itemEntryData[i].userIDNumber));
                    row.appendChild(document.createElement("td"))
                      .appendChild(document.createTextNode(itemEntryData[i].itemname));
                    row.appendChild(document.createElement("td"))
                      .appendChild(document.createTextNode(itemEntryData[i].location));
                    photo = row.appendChild(document.createElement("td"))
                      .appendChild(document.createElement("a"));
                    photo.href = itemEntryData[i].item_photo;
                    photo.appendChild(document.createTextNode(itemEntryData[i].item_photo));
                }
            }
        }
    }
}

function validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function validateCredentials(email, password, loginData) {
    for (var i = 0; i < loginData.length; i++) {
        if (loginData[i].username === email &&
            loginData[i].password === password) {
            return loginData[i].userType;
        }
    }

    return null;
}

function militaryToStandardTime(time) {
    time = time.split(':');

    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);

    var timeValue;
    if (hours > 0 && hours <= 12) {
        timeValue = String(hours);
    } else if (hours > 12) {
        timeValue = String(hours - 12);
    } else if (hours == 0) {
        timeValue = "12";
    }

    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
    timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM

    return timeValue;
}
