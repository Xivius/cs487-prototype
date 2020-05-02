window.onload = main;

function main() {
    var backBtn = document.getElementById("backButton");
    if (backBtn !== null) { // not all pages have back button
        backBtn.addEventListener("click", goBack);
    }

    /* Event handler for backButton */
    function goBack(e) {
        e.preventDefault();
        history.back();
    }

    var loginBtn = document.getElementById("login");
    if (loginBtn !== null) { // not all pages have login button
        /* Grab Database Data from Webservice */
        var request = new XMLHttpRequest();
        request.addEventListener("readystatechange", getCredentials);
        request.open("POST", "http://localhost:3000/");
        request.send();
    }

    /* Process Login Data from Database */
    function getCredentials(e) {
        if (this.readyState == 4 && this.status == 200) {
            request.removeEventListener(e.type, getCredentials);
            var loginData = JSON.parse(this.responseText);
            loginBtn.addEventListener("click", login);
        }

        /* Login button click Handler */
        function login(e) {
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
    function itemEntryHandler(e) {
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
                    photo.appendChild(document.createTextNode("Photo Link"));
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
    function itemClaimHandler(e) {
        if (this.readyState == 4 && this.status == 200) {
            var itemEntryData = JSON.parse(this.responseText);
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
                    photo.appendChild(document.createTextNode("Photo Link"));
                }
            }
        }
    }

    var itemClaimForm = document.getElementById("uploadClaim");
    if (itemClaimForm !== null) { // not all pages have item claim form
        /* Grab Database Data from Webservice */
        /*var request = new XMLHttpRequest();
        uploadClaim.addEventListener("click", itemClaimHandler);
        request.open("POST", "http://localhost:3000/itemClaim");
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();*/
        itemClaimForm.addEventListener("click", goBack);
    }

    /* Send user form data to server side script */
    /*function itemClaimHandler(e) {
        e.preventDefault();
        request.removeEventListener(e.type, itemClaimHandler);
        var itemName = document.getElementById("itemName").value;
        var row = document.querySelector("tr.active");
        var photoID = document.getElementById("photoID").files[0];
        history.back();
    }*/

    var itemEntryForm = document.getElementById("uploadEntry");
    if (itemEntryForm !== null) {
        itemEntryForm.addEventListener("click", goBack);
    }
}

/* Secondary Functions Used in main() */
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
