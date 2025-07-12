// =========================
// Elements
// =========================
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

let editingIndex = null; // to track if editing a post

// =========================
// Initial Rendering
// =========================
allPosts.forEach((post, i) => addPost(post, i));

// =========================
// Navbar Logic
// =========================
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
// =========================
// Show Selected Section
// =========================
function showSection(targetId) {
  sectionElements.forEach(el => el.classList.add("d-none"));
  navLinks.forEach(link => link.classList.remove("act"));
  document.getElementById(targetId).classList.remove("d-none");
  let activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
  if (activeLink) activeLink.classList.add("act");
}

// =========================
// Add or Edit Post Handler
// =========================
addPostBtn.addEventListener("click", () => {
  let file = postImage.files[0];

  const processPost = (image) => {
    const newPost = {
      title: postTitle.value,
      description: postDes.value,
      keyWords: postKeyWords.value.split(",").map(tag => tag.trim()).filter(tag => tag),
      image: image || "public/imgs/img2.jfif"
    };

    if (editingIndex !== null) {
      allPosts[editingIndex] = newPost;
      editingIndex = null;
    } else {
      allPosts.push(newPost);
    }
    localStorage.setItem("posts", JSON.stringify(allPosts));
    renderAllPosts();
    clearForm();
  };

  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      processPost(e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    let image = editingIndex !== null ? allPosts[editingIndex].image : undefined;
    processPost(image);
  }
});

// =========================
// Create and Render Post
// =========================
function addPost(post, index) {
  let cont = `
    <div class="card w-100 mb-4 rounded-4 shadow" data-index="${index}">
      <div class="card-header pe-4 border-0 d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-2">
          <img class="rounded-circle p-1" src="public/imgs/user.webp" alt="User Img">
          <div>
              <h4>يوسف</h4>
              <h6 class="opacity-75">منذ لحظات</h6>
          </div>
          </div>
          <div class="dropdown">
            <i class="fa-solid more rounded-circle fa-ellipsis-vertical" data-bs-toggle="dropdown"></i>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item edit-post d-flex align-items-center justify-content-between" data-bs-toggle="modal" data-bs-target="#editpost" data-bs-whatever="@mdo"><span>تعديل</span><span><i class="fa-solid fa-pen"></i></span></a></li>
              <li><a class="dropdown-item edit-profile d-flex align-items-center justify-content-between" href="#"><span>الملف الشخصي</span><span><i class="fa-solid fa-user"></i></span></a></li>
              <li><a class="dropdown-item text-danger delete-post d-flex align-items-center justify-content-between" href="#"><span>حذف</span><span><i class="fa-solid fa-trash"></i></span></a></li>
            </ul>
          </div>
      </div>
      <div class="hr"></div>
      <div class="card-body">
        <img class="w-100 mb-3" src="${post.image}" alt="Post img">
        <h5>${post.title}</h5>
        <p>
        ${post.description}
          <div class="d-none hashtagsWords">
            <ul class="words d-flex align-items-center list-unstyled gap-2">
              ${post.keyWords?.map(tag => `<li>${tag}</li>`).join("") || ""}
            </ul>
          </div>
        </p>
        <div class="hr my-3"></div>
        <div class="d-flex align-items-center justify-content-between px-1">
          <div><i class="fa-solid fa-thumbs-up"></i><span>اعجاب(4)</span></div>
          <div><i class="fa-solid fa-comment"></i><span>تعليق(10)</span></div>
          <div><i class="fa-solid fa-link"></i><span>مشاركه(2)</span></div>
          <div>
            <h6 class="m-0 hashtags" onclick="showHashtages()"><i class="fa-solid fa-hashtag"></i>قراءه الهاشتاج</h6>
          </div>
        </div>
      </div>
    </div>`;

  posts.innerHTML += cont;
  cards.innerHTML += cont;
}

function showHashtages() {
  document.querySelectorAll(".hashtagsWords").forEach(el => {
    el.classList.remove("d-none");
  })
}

// =========================
// Render All Posts
// =========================
function renderAllPosts() {
  posts.innerHTML = "";
  cards.innerHTML = "";
  allPosts.forEach((p, i) => addPost(p, i));
}

// =========================
// Search Logic
// =========================
searchInput.addEventListener("input", function () {
  const searchTerm = this.value.trim().toLowerCase();

  const filteredPosts = allPosts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = post.description.toLowerCase().includes(searchTerm);
    const keywordsMatch = post.keyWords.join(", ").toLowerCase().includes(searchTerm);
    return titleMatch || descriptionMatch || keywordsMatch;
  });

  posts.innerHTML = "";
  cards.innerHTML = "";
  filteredPosts.forEach((p, i) => addPost(p, i));
});


// =========================
// jQuery Event: Toggle Hashtags
// =========================
$(document).on("click", ".hashtags", function () {
  $(this).closest(".card").find(".hashtagsWords").slideToggle(300);
});

// =========================
// Clear Form Inputs
// =========================
function clearForm() {
  postTitle.value = "";
  postDes.value = "";
  postImage.value = "";
  postKeyWords.value = "";
}

// =========================
// Post Options: Delete / Edit / Profile Edit
// =========================
$(document).on("click", ".delete-post", function () {
  if (confirm("هل تريد حذف هذا المنشور؟")) {
    let card = $(this).closest(".card")[0];
    let index = +card.dataset.index;
    allPosts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(allPosts));
    renderAllPosts();
  }
});

$(document).on("click", ".edit-post", function () {
  let card = $(this).closest(".card")[0];
  editingIndex = +card.dataset.index;
  let post = allPosts[editingIndex];
  postTitle.value = post.title;
  postDes.value = post.description;
  postKeyWords.value = post.keyWords.join(", ");
});

$(document).on("click", ".edit-profile", function () {
  showSection("portfolio");
});


// messages
let overlaymessage = document.getElementById("overlaymessage")
let contentselect = document.getElementById("contentselect")
let nameselect = document.getElementById("nameselect")
let messages = document.getElementById("messages")
let notficationinfoplus = document.getElementById("1")
let i = 0;
function showingsendingmsg() {
  overlaymessage.classList.remove("hide")
}
function hidingsendingmsg() {
  overlaymessage.classList.add("hide")
}
function notficationinfo(notficationinfopart) {
  notficationinfopart.classList.toggle("hide")
}
function notficationinfoplusmore() {
  notficationinfoplus.classList.toggle("hide")
}
function sendmsg() {
  i++
  var notficationinfopluscopy = notficationinfoplus.cloneNode(true)
  notficationinfopluscopy.classList.add("notficationinfopluscopy")
  notficationinfopluscopy.setAttribute("id", i)
  overlaymessage.classList.add("hide")
  var namenewmsg = document.createElement("h1")
  var arrownewimg = document.createElement("img")
  arrownewimg.setAttribute("src", "../imgs/greenarrow-removebg-preview.png")
  arrownewimg.classList.add("outcomearrow")
  namenewmsg.innerHTML = nameselect.options[nameselect.selectedIndex].text;
  var imgnewmsg = document.createElement("img")
  imgnewmsg.setAttribute("src", "../../public/imgs/pyamidsimg")
  imgnewmsg.classList.add("personphoto")
  var dotsnewmsg = document.createElement("img")
  dotsnewmsg.classList.add("downicon")
  dotsnewmsg.setAttribute("src", "../imgs/dots.png")
  dotsnewmsg.setAttribute("onclick", "notficationinfoplusmore()")
  var message = document.createElement("div")
  message.classList.add("message")
  namenewmsg.classList.add("h1newmsg")
  message.setAttribute("id", "hidingspecialdiv" + i)
  message.appendChild(imgnewmsg)
  message.appendChild(arrownewimg)
  message.appendChild(namenewmsg)
  message.appendChild(dotsnewmsg)
  message.appendChild(notficationinfopluscopy)
  messages.appendChild(message)
}
function read(Context) {
  Context.innerHTML = "تمت قرائتها"
  Context.style.color = "rgb(20,255,20)"
  document.getElementById('notficationinfo').classList.toggle("hide")
}
function deletemsg(message) {
  message.classList.add("hide")
  document.getElementById('notficationinfo').classList.toggle("hide")
}
function deletemsgplus(box) {
  for (var box = 0; box > 10; box++) {
    console.log(box)
    let m = document.getElementById("hidingspecialdiv" + box)
    m.remove()
  }
}
function block(message) {
  message.classList.toggle("blocked")
  document.getElementById('notficationinfo').classList.toggle("hide")
}
function showingcontent(message) {
  if (message.style.height == "130px") {
    message.style.height = "60px"
  }
  else {
    message.style.height = "130px"
  }
}

// travels
let over = document.getElementById("over")
let addingtravelpart = document.getElementById("addingtravelpart")
let nameofthetrip = document.getElementById("nameofthetrip")
let dateofthetrip = document.getElementById("dateofthetrip")
let traveladd = document.getElementById("traveladd")
let travels = document.getElementById("travels")
function showingaddingtravells() {
  over.classList.remove("hide")
  addingtravelpart.classList.remove("hide")
}
function hidingaddingtravells() {
  over.classList.add("hide")
  addingtravelpart.classList.add("hide")
}
function addingtravells() {
  var traveladdcopy = traveladd.cloneNode(true)
  traveladd.remove()
  over.classList.add("hide")
  addingtravelpart.classList.add("hide")
  var namesofthenewtrip = nameofthetrip.value
  var h1namesofthenewtrip = document.createElement("h1")
  h1namesofthenewtrip.innerHTML = namesofthenewtrip
  var datesofthenewtrip = dateofthetrip.value
  var pdatesofthenewtrip = document.createElement("p")
  pdatesofthenewtrip.innerHTML = " موعد الرحله(" + datesofthenewtrip + ")"
  var img = document.createElement("img")
  img.setAttribute("src", "../imgs/pyamidsimg")
  var addingdiv = document.createElement("div")
  addingdiv.appendChild(img)
  addingdiv.appendChild(h1namesofthenewtrip)
  addingdiv.appendChild(pdatesofthenewtrip)
  addingdiv.classList.add("travel")
  travels.prepend(addingdiv)
  travels.prepend(traveladdcopy)
}