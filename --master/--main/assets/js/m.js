// Elements
const addPostBtn = document.getElementById("addPostBtn");
const posts = document.getElementById("posts");
const cards = document.getElementById("cards");
const postTitle = document.getElementById("postTitle");
const postDes = document.getElementById("postDes");
const postKeyWords = document.getElementById("postKeyWords");
const postImage = document.getElementById("postImage");
const navLinks = document.querySelectorAll(".nav-link");
const searchInput = document.getElementById("searchInput");

const sections = ["home", "portfolio", "notifications", "message", "trips"];
const sectionElements = sections.map(id => document.getElementById(id));
let allPosts = JSON.parse(localStorage.getItem("posts")) || [];
allPosts.forEach(post => addPost(post));
// Navbar
window.addEventListener("DOMContentLoaded", () => {
    let saved = localStorage.getItem("activeSection");
    showSection(sections.includes(saved) ? saved : "home");
});
navLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        let target = link.dataset.target;
        showSection(target);
        localStorage.setItem("activeSection", target);
    });
});

function showSection(targetId) {
    sectionElements.forEach(el => el.classList.add("d-none"));
    navLinks.forEach(link => link.classList.remove("act"));
    document.getElementById(targetId).classList.remove("d-none");
    let activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    if (activeLink) activeLink.classList.add("act");
}

addPostBtn.addEventListener("click", () => {
    let file = postImage.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let newPost = {
                title: postTitle.value,
                description: postDes.value,
                keyWords: postKeyWords.value.split(",").map(tag => tag.trim()).filter(tag => tag),
                image: e.target.result
            };
            allPosts.push(newPost);
            localStorage.setItem("posts", JSON.stringify(allPosts));
            addPost(newPost);
            clearForm();
        };
        reader.readAsDataURL(file);
    } else {
        let newPost = {
            title: postTitle.value,
            description: postDes.value,
            keyWords: postKeyWords.value.split(",").map(tag => tag.trim()).filter(tag => tag),
            image: "public/imgs/img2.jfif"
        };
        allPosts.push(newPost);
        localStorage.setItem("posts", JSON.stringify(allPosts));
        addPost(newPost);
        clearForm();
    }
});
function addPost(post) {
    let cont = `
      <div class="card w-100 mb-4 rounded-4 shadow">
        <div class="card-header pe-4 border-0 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center gap-2">
            <img class="rounded-circle p-1" src="public/imgs/user.webp" alt="User Img">
            <div>
                <h4>يوسف</h4>
                <h6 class="opacity-75 ">منذ لحظات</h6>
            </div>
            </div>
            <div>
              <i class="fa-solid fs-4 fa-xmark"></i>
            </div>
        </div>
        <div class="hr"></div>
        <div class="card-body">
        <img class="w-100 mb-3" src="${post.image}" alt="Post img">
        <h5>${post.title}</h5>
        <p>${post.description}</p>
          <div class="d-none hashtagsWords">
            <ul class="words d-flex align-items-center list-unstyled gap-2">
              ${post.keyWords?.map(tag => `<li>${tag}</li>`).join("") || ""}
            </ul>
          </div>
          <div class="hr my-3"></div>
          <div class="d-flex align-items-center justify-content-between px-1">
            <div><i class="fa-solid fa-thumbs-up"></i><span>اعجاب(4)</span></div>
            <div><i class="fa-solid fa-comment"></i><span>تعليق(10)</span></div>
            <div><i class="fa-solid fa-link"></i><span>مشاركه(2)</span></div>
            <div>
              <h6 class="m-0 hashtags"><i class="fa-solid fa-hashtag"></i>قراءه الهاشتاج</h6>
            </div>
          </div>
        </div>
    </div>
  `
    posts.innerHTML += cont;
    cards.innerHTML += cont;
}
$(document).on("click", ".hashtags", function () {
    const $btn = $(this);
    const $hashtagsBox = $btn.closest(".card").find(".hashtagsWords");
    $hashtagsBox.slideToggle(300, function () {
        if ($hashtagsBox.is(":visible")) {
            $btn.html('<i class="fa-solid fa-hashtag"></i> إخفاء الهاشتاج');
        } else {
            $btn.html('<i class="fa-solid fa-hashtag"></i> قراءه الهاشتاج');
        }
    });
});


function clearForm() {
    postTitle.value = "";
    postDes.value = "";
    postImage.value = "";
    postKeyWords.value = "";
}

posts.addEventListener("click", function (e) {
    if (e.target.classList.contains("fa-xmark")) {
        if (confirm("هل تريد حذف هذا المنشور؟")) {
            let card = e.target.closest(".card");
            let index = Array.from(posts.children).indexOf(card);
            allPosts.splice(index, 1);
            localStorage.setItem("posts", JSON.stringify(allPosts));
            card.remove();
            cards.children[index]?.remove();
        }
    }
});

searchInput.addEventListener("input", function () {
    let keyword = this.value.trim().toLowerCase();
    posts.innerHTML = "";
    cards.innerHTML = "";

    let filteredPosts = allPosts.filter(post => {
        return post.keyWords.some(tag => tag.toLowerCase().includes(keyword));
    });

    filteredPosts.forEach(post => addPost(post));
});

let shadow = document.getElementById("shadow")
let addingtravelpart = document.getElementById("addingtravelpart")
let nameofthetrip = document.getElementById("nameofthetrip")
let dateofthetrip = document.getElementById("dateofthetrip")
let travels = document.getElementById("travels")
function showingaddingtravells() {
    shadow.classList.remove("hide")
    addingtravelpart.classList.remove("hide")
}
function hidingaddingtravells() {
    shadow.classList.add("hide")
    addingtravelpart.classList.add("hide")
}
function addingtravells() {
    shadow.classList.add("hide")
    addingtravelpart.classList.add("hide")
    var namesofthenewtrip = nameofthetrip.value
    var h1namesofthenewtrip = document.createElement("h1")
    h1namesofthenewtrip.innerHTML = namesofthenewtrip
    var datesofthenewtrip = dateofthetrip.value
    var pdatesofthenewtrip = document.createElement("p")
    pdatesofthenewtrip.innerHTML = " موعد الرحله(" + datesofthenewtrip + ")"
    var img = document.createElement("img")
    img.setAttribute("src", "public/imgs/pyamidsimg")
    var addingdiv = document.createElement("div")
    addingdiv.appendChild(img)
    addingdiv.appendChild(h1namesofthenewtrip)
    addingdiv.appendChild(pdatesofthenewtrip)
    addingdiv.classList.add("travel")
    travels.appendChild(addingdiv)
}

let overlay = document.getElementById("overlay")
let contentselect = document.getElementById("contentselect")
let nameselect = document.getElementById("nameselect")
let messages = document.getElementById("messages")
function showingsendingmsg() {
    shadow.classList.remove("hide")
}
function hidingsendingmsg() {
    shadow.classList.add("hide")
}
function sendmsg() {
    shadow.classList.add("hide")
    var namenewmsg = document.createElement("h1")
    namenewmsg.innerHTML = nameselect.options[nameselect.selectedIndex].text;
    var imgnewmsg = document.createElement("img")
    imgnewmsg.setAttribute("src", "../imgs/personphoto.avif")
    imgnewmsg.classList.add("personphoto")
    var dotsnewmsg = document.createElement("img")
    dotsnewmsg.classList.add("downicon")
    dotsnewmsg.setAttribute("src", "../imgs/dots.png")
    var message = document.createElement("div")
    message.classList.add("message")
    message.appendChild(imgnewmsg)
    message.appendChild(namenewmsg)
    message.appendChild(dotsnewmsg)
    console.log(message)
    messages.appendChild(message)
}
