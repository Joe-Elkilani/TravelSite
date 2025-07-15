const nameinput = document.getElementById("nameinput");
const emailinput = document.getElementById("emailinput");
const passwordinput = document.getElementById("passwordinput");

function showAlert(message, type = "success") {
    const alertBox = document.getElementById("alertBox");
    alertBox.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${message}
        </div>
    `;

    setTimeout(() => {
        alertBox.innerHTML = "";
    }, 3000);
}

function loggingin() {
    const name = nameinput.value.trim();
    const email = emailinput.value.trim();
    const password = passwordinput.value.trim();

    if (!name || !email || !password) {
        showAlert("من فضلك ادخل جميع البيانات", "danger");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
        user =>
            user.username.toLowerCase() === name.toLowerCase() &&
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
    );

    if (foundUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        showAlert("تم تسجيل الدخول بنجاح", "success");
        setTimeout(() => {
            window.location.href = "../../index.html";
        }, 3000);
    } else {
        showAlert("بيانات غير صحيحة", "danger");
    }
}
