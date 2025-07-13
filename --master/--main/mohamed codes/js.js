let shadowmax=document.getElementById("shadowmax")
let addingtravelpart=document.getElementById("addingtravelpart")
let nameofthetrip=document.getElementById("nameofthetrip")
let dateofthetrip=document.getElementById("dateofthetrip")
let traveladd=document.getElementById("traveladd")
let travels=document.getElementById("travels")
function showingaddingtravells(){
    shadow.classList.remove("hide")
    addingtravelpart.classList.remove("hide")
}
function hidingaddingtravells(){
    shadow.classList.add("hide")
    addingtravelpart.classList.add("hide")
}
function addingtravells(){
    var traveladdcopy=traveladd.cloneNode(true)
    traveladd.remove()
    shadow.classList.add("hide")
    addingtravelpart.classList.add("hide")
    var namesofthenewtrip=nameofthetrip.value
    var h1namesofthenewtrip=document.createElement("h1")
    h1namesofthenewtrip.innerHTML=namesofthenewtrip
    var datesofthenewtrip=dateofthetrip.value
    var pdatesofthenewtrip=document.createElement("p")
    pdatesofthenewtrip.innerHTML=" موعد الرحله("+datesofthenewtrip+")"
    var img=document.createElement("img")
    img.setAttribute("src" , "../imgs/pyamidsimg")
    img.classList.add("mainimg")
    var addingdiv=document.createElement("div")
    addingdiv.appendChild(img)
    addingdiv.appendChild(h1namesofthenewtrip)
    addingdiv.appendChild(pdatesofthenewtrip)
    addingdiv.classList.add("travel")
    travels.prepend(addingdiv)
    travels.prepend(traveladdcopy)
}
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
    i++
    var notficationinfopluscopy = notficationinfoplus.cloneNode(true)
    notficationinfopluscopy.classList.add("notficationinfopluscopy")
    notficationinfopluscopy.setAttribute("id", i)
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
    box.remove()
    notficationinfoplus.remove()
}
function block(message) {
    message.classList.toggle("blocked")
    document.getElementById('notficationinfopart').classList.toggle("hide")
}
function showingcontent(message) {
    if (message.style.height == "130px") {
        message.style.height = "60px"
    }
    else {
        message.style.height = "130px"
    }
}