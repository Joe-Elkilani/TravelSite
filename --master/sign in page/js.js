let username = document.getElementById("usernameinput");
let firstName = document.getElementById("firstnameinput");
let lastName = document.getElementById("lastnameinput");
let useremail = document.getElementById("emailinput");
let userpassword = document.getElementById("passwordinput");
let reuserpassword = document.getElementById("passwordconfirmationinput");

// Show alert function
function signup() {
    let uName = username.value.trim();
    let fName = firstName.value.trim();
    let lName = lastName.value.trim();
    let uEmail = useremail.value.trim();
    let uPassword = userpassword.value.trim();
    let reUPassword = reuserpassword.value.trim()
    if (!uName || !fName || !lName || !uEmail || !uPassword || !reUPassword ) {
        alert("رجاء ادخل جميع الحقول")
    }
    else{
        if (uPassword !== reUPassword) {
            alert("تاكد من كلمة المرور الخاصه بك")
            return;
        }
        else{
            window.location.href="../--main/index.html"
        }
    }

}