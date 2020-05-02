window.onload = main;

function main() {
    document.getElementById("backButton").addEventListener("click", () => {
        history.back();
    })

    document.getElementById("login").addEventListener("click", (e) => {
        e.preventDefault();
        var email = document.getElementById("email").value.trim();
        var password = document.getElementById("password").value.trim();
        var error = document.getElementById("error");

        if (validateEmail(email) && password !== "") {
            error.classList.add("d-none");
            if(email.includes("admin")) {
                window.location.href = "management.html"
            }
        } else {
            error.classList.remove("d-none");
        }
        
    })

    function validateEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
}
