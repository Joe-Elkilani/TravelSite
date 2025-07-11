let shadow=document.getElementById("shadow")
let addingtravelpart=document.getElementById("addingtravelpart")
let nameofthetrip=document.getElementById("nameofthetrip")
let dateofthetrip=document.getElementById("dateofthetrip")
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
    var addingdiv=document.createElement("div")
    addingdiv.appendChild(img)
    addingdiv.appendChild(h1namesofthenewtrip)
    addingdiv.appendChild(pdatesofthenewtrip)
    addingdiv.classList.add("travel")
    travels.appendChild(addingdiv)
}