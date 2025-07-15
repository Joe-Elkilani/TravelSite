var passwordinput = document.getElementById("passwordinput");
var emailinput = document.getElementById("emailinput");
var nameinput = document.getElementById("nameinput");

function loggingin() {
    var password = passwordinput.value.trim();
    var email = emailinput.value.trim();
    var name = nameinput.value.trim();

    if (password === "" || email === "" || name === "") {
        console.log("empty");
        alert("Please enter your credentials");
    } else {
        console.log("full");
        if (password === "0123456" && email === "admin@gmail.com" && name === "Admin") {
            window.location.href = "../--main/index.html";
        } else {
            alert("Wrong credentials");
        }
    }
}
