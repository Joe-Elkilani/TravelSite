let sections = ["home", "portfolio", "notifications", "message", "trips"];
let navLinks = document.querySelectorAll(".nav-link");
let sectionElements = sections.map(id => document.getElementById(id));

function showSection(targetId) {

    sectionElements.forEach(el => el.classList.add("d-none"));

    navLinks.forEach(link => link.classList.remove("act"));


    document.getElementById(targetId).classList.remove("d-none");


    let activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    if (activeLink) activeLink.classList.add("act");
}
navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        let target = this.dataset.target;
        showSection(target);
        localStorage.setItem("activeSection", target);
    });
});


window.addEventListener("DOMContentLoaded", () => {
    let saved = localStorage.getItem("activeSection");
    if (saved && sections.includes(saved)) {
        showSection(saved);
    } else {
        showSection("home");
    }
});
