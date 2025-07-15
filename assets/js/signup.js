let username = document.getElementById("username");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let useremail = document.getElementById("useremail");
let userpassword = document.getElementById("userpassword");
let reuserpassword = document.getElementById("reuserpassword");

// Show alert function
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
function signup() {
    let uName = username.value.trim();
    let fName = firstName.value.trim();
    let lName = lastName.value.trim();
    let uEmail = useremail.value.trim();
    let uPassword = userpassword.value.trim();
    let reUPassword = reuserpassword.value.trim();

    if (!uName || !fName || !lName || !uEmail || !uPassword || !reUPassword) {
        showAlert("جميع الحقول مطلوبة", "danger");
        return;
    }

    if (uPassword !== reUPassword) {
        showAlert("كلمة المرور غير متطابقة", "danger");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === uEmail)) {
        showAlert("البريد الإلكتروني مستخدم بالفعل", "danger");
        return;
    }

    let newUser = {
        username: uName,
        firstName: fName,
        lastName: lName,
        email: uEmail,
        password: uPassword
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    showAlert("تم إنشاء الحساب بنجاح", "success");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 3000);
}