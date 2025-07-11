let shadow=document.getElementById("shadow")
let contentselect=document.getElementById("contentselect")
let nameselect=document.getElementById("nameselect")
let messages=document.getElementById("messages")
function showingsendingmsg(){
    shadow.classList.remove("hide")
}
function hidingsendingmsg(){
    shadow.classList.add("hide")
}
function sendmsg(){
    shadow.classList.add("hide")
    var namenewmsg=document.createElement("h1")
    namenewmsg.innerHTML=nameselect.options[nameselect.selectedIndex].text;
    var imgnewmsg=document.createElement("img")
    imgnewmsg.setAttribute("src","../imgs/personphoto.avif")
    imgnewmsg.classList.add("personphoto")
    var dotsnewmsg=document.createElement("img")
    dotsnewmsg.classList.add("downicon")
    dotsnewmsg.setAttribute("src" , "../imgs/dots.png")
    var message=document.createElement("div")
    message.classList.add("message")
    message.appendChild(imgnewmsg)
    message.appendChild(namenewmsg)
    message.appendChild(dotsnewmsg)
    console.log(message)
    messages.appendChild(message)
}