const sections = ["home", "portfolio", "notifications", "message", "trips"];
const navLinks = document.querySelectorAll(".nav-link");
const sectionElements = sections.map(id => document.getElementById(id));

const addPostBtn = document.getElementById("addPostBtn");
const posts = document.getElementById("posts");
const cards = document.getElementById("cards");
const postTitle = document.getElementById("postTitle");
const postDes = document.getElementById("postDes");
const postImage = document.getElementById("postImage");
let allPosts = JSON.parse(localStorage.getItem("posts")) || [];
posts.innerHTML = "";
cards.innerHTML = "";
allPosts.forEach(post => addPost(post));
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
        <ul class="words d-flex align-items-center">
          <li>لبلابلا</li>
          <li>لبلابلا</li>
          <li>لبلابلا</li>
          <li>لبلابلا</li>
          <li>لبلابلا</li>
        </ul>
        <div class="hr my-3"></div>
        <div class="d-flex gap-2 justify-content-between px-3">
          <div class="d-flex gap-2">
            <div><i class="fa-solid mx-2 fa-pen-clip"></i><span>تعليقات(4)</span></div>
            <div><i class="fa-solid mx-2 fa-link"></i><span>مشاركه(4)</span></div>
          </div>
          <div><span>اعجاب(4) 👍</span></div>
        </div>
        <div class="hr my-3"></div>
        <div class="d-flex align-items-center justify-content-between px-3">
          <div><i class="fa-solid fa-thumbs-up"></i><span>اعجاب</span></div>
          <div><i class="fa-solid fa-comment"></i><span>تعليق</span></div>
          <div><i class="fa-solid fa-link"></i><span>مشاركه</span></div>
        </div>
      </div>
    </div>
    `;
  posts.innerHTML += cont
  cards.innerHTML += cont
}
function clearForm() {
  postTitle.value = "";
  postDes.value = "";
  postImage.value = "";
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

