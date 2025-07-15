let shadowpro = document.getElementById("shadowpro")
let contentselect = document.getElementById("contentselect")
let contentmessage=document.getElementById("contentmessage")
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
    var shadowmsg=document.createElement("div")
    var contentnewmsg=document.createElement("h3")
    var arrownewimg = document.createElement("img")
    arrownewimg.setAttribute("src", "../imgs/greenarrow-removebg-preview.png")
    arrownewimg.classList.add("outcomearrow")
    namenewmsg.innerHTML = nameselect.options[nameselect.selectedIndex].text;
    contentnewmsg.innerHTML =contentselect.value;
    contentnewmsg.classList.add("contentmessage")
    contentnewmsg.classList.add("hide")
    contentnewmsg.setAttribute("id" , "contentmessageplus")
    shadowmsg.classList.add("shadowmsg")
    shadowmsg.setAttribute("onclick" , "showingcontent(messagewholeplus , contentmessageplus)")
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
    message.appendChild(shadowmsg)
    message.appendChild(contentnewmsg)
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
function showingcontent(messagewhole , contentmessageplus) {
    if (messagewhole.style.height == "130px") {
        messagewhole.style.height = "60px"
        contentmessage.classList.add("hide")
        contentmessageplus.classList.add("hide")
    }
    else {
        messagewhole.style.height = "130px"
        contentmessage.classList.remove("hide")
        contentmessageplus.classList.remove("hide")
    }
}
function Signout(){
    var Signoutoption=confirm("Are you sure to sign out?")
    if(Signoutoption){
        window.location.href="../login/index.html"
    }
}