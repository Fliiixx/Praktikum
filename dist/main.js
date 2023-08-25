/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************!*\
  !*** ./index.js ***!
  \******************/
let j = 0;

let links = document.getElementsByTagName("nav")[0].children;
document.getElementById("button1").onclick = function(){


    if(j % 2 == 0){
        for(let i = 0; i < links.length; i++){
            links[i].classList.add("hidden");
        }

        document.getElementById("h").style.marginTop = "0em";
    }

    else{
        for(let i = 0; i < links.length; i++){
            console.log(links[i]);
            links[i].classList.remove("hidden");
        }

        document.getElementById("h").style.marginTop = "";
    }
    j++;
    
}

//------------------------------------------------------------------------------------------------------

let main = document.getElementsByTagName("main")[0].children;

let a = document.getElementsByTagName("a");
    for(let i = 0; i<4; i++){
        a[i].onclick = function y(){
            for(let j = 0; j < main.length; j++){
                main[j].classList.add("hidden");
                links[j].classList.remove("bgr-color-pr1");
                links[j].classList.remove("color-pr3");
            }
        
            main[i].classList.remove("hidden");
            links[i].classList.add("bgr-color-pr1");
            links[i].classList.add("color-pr3");
        }

}

//------------------------------------------------------------------------------------------------------

let kompetenzen = document.getElementsByClassName("sumary-kompetenzen");

for(let i = 0; i < kompetenzen.length; i++){
    kompetenzen[i].onclick = dings;
}

function dings(){
    if(this.classList.contains("bgr-color-pr3", "color-pr1")){
        this.classList.remove("bgr-color-pr3", "color-pr1");
        this.classList.add("bgr-color-pr3l");
    }
    else{
        this.classList.add("bgr-color-pr3", "color-pr1");
        this.classList.remove("bgr-color-pr3l");
    }
}

//------------------------------------------------------------------------------------------------------


let inputs = Array.from(document.getElementsByClassName("inp"));
let mes = document.getElementById("warningMessage");
let icons = document.getElementsByClassName("inpIcon");
let submit = document.getElementById("submit");

for(i in inputs){
    inputs[i].addEventListener("keyup", checkinp);
    inputs[i].addEventListener("blur", checkinp);
}

function checkinp(){
    let i = inputs.indexOf(this);
    let rx;
    if(i == 0 || i == 1){
        rx = new RegExp(/^[A-ZÄ-Ü][a-zä-ü]{2,13}$/g)
        checkText(this.value, rx, i);
    }
    else if(i == 2){
        rx =  new RegExp(/^[A-ZÄ-Üa-zä-ü0-9\.]{5,25}@[a-z]{3,7}\.[a-z]{2,5}$/g);
        checkEmail(this.value, rx, i);
    }
    else if(i == 3){
        if(this.value == ""){
            setIcon(false, i);
            mes.innerHTML = "Nachricht darf nicht leer sein!";
        }
        else{
            setIcon(true, i);
        }
    }
}

function checkText(text, rx, i){
    let bez = "Vorname";
        if(i == 1)
            bez = "Nachname";

    if(text.match(rx)){
        setIcon(true, i);
    }
    else{
        setIcon(false, i);
        if(text == ""){
            mes.innerHTML = bez + " darf nicht leer sein"
        }
        else if(text.match(/[^A-ZÄ-Üa-zä-ü]{1,}/)){
            mes.innerHTML = bez + " darf nur aus Buchstaben bestehen"
        }
        else if(!text.match(/^[A-ZÄ-Ü]/g)){
            mes.innerHTML = bez + " muss mit Großbuchstaben beginnen!"
        }
        else{
            mes.innerHTML = bez +  " darf 3-15 Buchstaben enthalten!"
        }

    }
}

function checkEmail(email, rx, i){
    if(email.match(rx)){
        setIcon(true, i);
    }

    else{
        setIcon(false, i);
        mes.innerHTML = "Ungültige E-Mail";
    }
}

function setIcon(toggle, i){
    let icons = document.getElementsByClassName("inpIcon");
    if(toggle){
        icons[i].classList.remove("invisible", "color-warning");
        icons[i].classList.add("color-bg2");
        icons[i].innerHTML = "check";
        mes.innerHTML = "&nbsp";
    }
    else{
        icons[i].innerHTML = "warning";
        icons[i].classList.remove("invisible", "color-bg2");
        icons[i].classList.add("color-warning");
    }
    check();
}

function check(){
    
    let c = true;
    for(let i = 0; i < icons.length; i++){
        if(icons[i].classList.contains("invisible") || icons[i].innerHTML == "warning"){
            c = false;
            break;
        }
    }
    
    if(c){
        submit.classList.remove("disabled");
        submit.removeAttribute("disabled");
    }
    else{
        submit.classList.add("disabled");
        let disabled = document.createAttribute("disabled");
        disabled.value = "disabled";
        submit.setAttributeNode(disabled);
    }
}


submit.onclick = function(){
    
    for(let i = 0; i<inputs.length; i++){
        inputs[i].value = "";
    }
    for(let i = 0; i < icons.length; i++){
        icons[i].classList.add("invisible");
    }
    check();
    mes.innerHTML = "Erfolgreich gesendet!";

}

//------------------------------------------------------------------------------------------------------


//=>improve with fetchAPI

let blogsections = ["blog/2023-4-17.json","blog/2023-4-18.json","blog/2023-4-19.json"];



let currentSection = 1;
loadBlog(blogsections[currentSection]);

function loadBlog(url){
    document.getElementById("blogerror").classList.remove("hidden");
    let xml = new XMLHttpRequest();
    xml.open("GET", url, true);

    xml.onload = function(){
        if(this.status == 200){
            document.getElementById("blogerror").classList.add("hidden");
            let entry = JSON.parse(xml.responseText);
            setentry(entry);
            
        }
    }


    xml.send();
}

function setentry(entry){
    document.getElementById("blog").classList.remove("hidden");

    document.getElementById("blogdate").innerHTML =
    "<span class='font-size-20'>"+entry.day+"</span><br>"+entry.month;

    let text = entry.text;

    if(text.length > 0){
        document.getElementById("blogtext").innerHTML =
        "<p>"+text[0]+"</p>" +
        "<p class='bold font-size-20 text-align-center' id='blogtmp'>...</p>";
    }

    for(let i = 1; i < text.length; i++){
        document.getElementById("blogtext").innerHTML += 
        "<br><br><p class='hidden bloghidden'>"+text[i]+"</p>";
    }

    document.getElementById("blogtitle").innerHTML = entry.title;

    let unfoldButton = document.getElementById("blogunfold");
    unfoldButton.removeAttribute("disabled");
    unfoldButton.classList.remove("disabled")
    let attr = document.createAttribute("title");
    attr.value = "ganzen Blog anzeigen";
    unfoldButton.setAttributeNode(attr);
}

document.getElementById("blogunfold").onclick = function(){
    document.getElementById("blogtmp").remove();
    let hiddenText = document.getElementsByClassName("bloghidden");

    for(let i = 0; i < hiddenText.length; i++){
        hiddenText[i].classList.remove("hidden", "bloghidden");
    }
    let attr = document.createAttribute("disabled");
    attr.value = "disabled";
    this.setAttributeNode(attr);
    this.classList.add("disabled");
    this.removeAttribute("title");
}

document.getElementById("blogleft").onclick = function(){
    currentSection--;
    if(currentSection < 0){
        currentSection = blogsections.length - 1;
    }
    loadBlog(blogsections[currentSection]);
}

document.getElementById("blogright").onclick = function(){
    currentSection = (currentSection+1) % blogsections.length;
    loadBlog(blogsections[currentSection]);
}
/******/ })()
;
//# sourceMappingURL=main.js.map