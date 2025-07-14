let shadowpro = document.getElementById("shadowpro")
let contentselect = document.getElementById("contentselect")
let nameselect = document.getElementById("nameselect")
let messages = document.getElementById("messages")
let notficationinfoplus = document.getElementById("1")
let i = 0;
function showingsendingmsg() {
    shadowpro.classList.remove("hide")
}
function hidingsendingmsg() {
    shadowpro.classList.add("hide")
}
function notficationinfo(notficationinfopart) {
    notficationinfopart.classList.toggle("hide")
}
function notficationinfoplusmore() {
    notficationinfoplus.classList.toggle("hide")
}
function sendmsg() {
    shadowpro.classList.add("hide")
    var namenewmsg = document.createElement("h1")
    var arrownewimg = document.createElement("img")
    arrownewimg.setAttribute("src", "../imgs/greenarrow-removebg-preview.png")
    arrownewimg.classList.add("outcomearrow")
    namenewmsg.innerHTML = nameselect.options[nameselect.selectedIndex].text;
    var imgnewmsg = document.createElement("img")
    imgnewmsg.setAttribute("src", "../imgs/personphoto.avif")
    imgnewmsg.classList.add("personphoto")
    var dotsnewmsg = document.createElement("img")
    dotsnewmsg.classList.add("downicon")
    dotsnewmsg.setAttribute("src", "../imgs/dots.png")
    dotsnewmsg.setAttribute("onclick", "notficationinfoplusmore()")
    var message = document.createElement("div")
    message.classList.add("message")
    namenewmsg.classList.add("h1newmsg")
    message.setAttribute("id", "messagewholeplus")
    message.appendChild(imgnewmsg)
    message.appendChild(arrownewimg)
    message.appendChild(namenewmsg)
    message.appendChild(dotsnewmsg)
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
function deletemsgplus(messagewholeplus) {
    messagewholeplus.remove()
    notficationinfoplus.remove()
}
function block(messagewhole) {
    messagewhole.classList.toggle("blocked")
    document.getElementById('notficationinfopart').classList.toggle("hide")
}
function showingcontent(messagewhole) {
    if (messagewhole.style.height == "130px") {
        messagewhole.style.height = "60px"
    }
    else {
        messagewhole.style.height = "130px"
    }
}
function Signout(){
    var Signoutoption=confirm("Are you sure to sign out?")
    if(Signoutoption){
        window.location.href="../login/index.html"
    }
}
//travel
document.addEventListener("DOMContentLoaded", function () {
  const tripsRow = document.querySelector("#trips .row");
  const addBtn = document.getElementById("confirmAddTrip");
  const nameInput = document.getElementById("nameofthetrip");
  const descInput = document.getElementById("desofthetrip");
  const dateInput = document.getElementById("dateofthetrip");
  const imgInput = document.getElementById("imgofthetrip");

  const newTravelTitle = document.getElementById("newTravelTitle");
  const newTravelDes = document.getElementById("newTravelDes");
  const newTravelImage = document.getElementById("newTravelImage");
  const confirmEditTravelBtn = document.getElementById("confirmEditTravelBtn");

  let trips = JSON.parse(localStorage.getItem("trips")) || [];
  let tripEditingIndex = null;

  function renderAllTrips() {
    tripsRow.innerHTML = "";
    trips.forEach((trip, index) => {
      const tripCard = document.createElement("div");
      tripCard.className = "col-lg-3";
      tripCard.innerHTML = `
        <div class="inner rounded-4 p-4 travel">
          <div class="image rounded-4 overflow-hidden">
            <img src="${trip.img}" class="h-100 w-100" alt="">
          </div>
          <div class="mt-3 d-flex justify-content-between">
            <div class="text">
              <h3 class="fs-4">${trip.name}</h3>
              <p class="fs-6">وصف الرحله : ${trip.desc}</p>
              <p class="fs-6">ميعاد الرحله : ${trip.date}</p>
            </div>
            <div class="dropdown">
              <i class="fa-solid more rounded-circle fa-ellipsis-vertical" data-bs-toggle="dropdown"></i>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item edit-trip" data-index="${index}" data-bs-toggle="modal" data-bs-target="#edittravel">تعديل</a></li>
                <li><a class="dropdown-item text-danger delete-trip" data-index="${index}" href="#">حذف</a></li>
              </ul>
            </div>
          </div>
        </div>
      `;
      tripsRow.appendChild(tripCard);
    });
  }

  renderAllTrips();

  addBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const desc = descInput.value.trim();
    const date = dateInput.value.trim();
    const file = imgInput.files[0];

    if (!name || !desc || !date || !file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const newTrip = {
        name,
        desc,
        date,
        img: e.target.result
      };

      trips.unshift(newTrip);
      localStorage.setItem("trips", JSON.stringify(trips));
      renderAllTrips();

      nameInput.value = "";
      descInput.value = "";
      dateInput.value = "";
      imgInput.value = "";

      bootstrap.Modal.getInstance(document.getElementById("addtravel")).hide();
    };
    reader.readAsDataURL(file);
  });

  tripsRow.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-trip")) {
      e.preventDefault();
      const index = e.target.dataset.index;
      if (confirm("هل تريد حذف هذه الرحلة؟")) {
        trips.splice(index, 1);
        localStorage.setItem("trips", JSON.stringify(trips));
        renderAllTrips();
      }
    }

    if (e.target.classList.contains("edit-trip")) {
      e.preventDefault();
      tripEditingIndex = +e.target.dataset.index;
      const trip = trips[tripEditingIndex];

      newTravelTitle.value = trip.name;
      newTravelDes.value = trip.desc;
      newTravelImage.value = "";
    }
  });

  confirmEditTravelBtn.addEventListener("click", function () {
    if (tripEditingIndex === null) return;

    trips[tripEditingIndex].name = newTravelTitle.value.trim();
    trips[tripEditingIndex].desc = newTravelDes.value.trim();

    const file = newTravelImage.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        trips[tripEditingIndex].img = e.target.result;
        saveTrips();
      };
      reader.readAsDataURL(file);
    } else {
      saveTrips();
    }

    bootstrap.Modal.getInstance(document.getElementById("edittravel")).hide();
  });

  function saveTrips() {
    localStorage.setItem("trips", JSON.stringify(trips));
    renderAllTrips();
    tripEditingIndex = null;
  }
});
