let j = 0;

const $ = require( "jquery" );


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

let textInputs = Array.from(document.getElementsByClassName("text"));
let mail = document.getElementById("email");
let icons = document.getElementsByClassName("inpIcon");
let mes = document.getElementById("warningMessage");


for(let i = 0; i < textInputs.length; i++){
    textInputs[i].onkeyup = dangs;
    textInputs[i].onblur = dangs;
}


mail.onkeyup = dungs;
mail.onblur = dungs;

function dungs(){
    let rx =  new RegExp(/^[A-ZÄ-Üa-zä-ü0-9\.]{5,99}@[a-z]{3,7}\.[a-z]{2,5}$/g);
    if(this.value.match(rx)){
        setIcon(true, 2);
    }

    else{
        setIcon(false, 2);
        mes.innerHTML = "Ungültige E-Mail";
    }
    check();
}
let nachricht = document.getElementById("nachricht");
nachricht.onkeyup = dongs;
nachricht.onblur = dongs;


function dongs(){
    console.log(this.value);
    if(this.value == ""){
        setIcon(false, 3);
        mes.innerHTML = "Nachricht darf nicht leer sein!";
    }
    else{
        setIcon(true, 3);
    }
    check();

}

function dangs(){
    let bez;

    let rx = new RegExp(/^[A-ZÄ-Ü][a-zä-ü]{2,13}$/g);
    let i = textInputs.indexOf(this);
    if(i == 0)
        bez = "Vorname";
    else{
        bez = "Nachname"
    }

    if(this.value.match(rx)){
        setIcon(true, i);
    }
    else{
        setIcon(false, i);
        if(this.value == ""){
            mes.innerHTML = bez + " darf nicht leer sein"
        }
        else if(this.value.match(/[^A-ZÄ-Üa-zä-ü]{1,}/)){
            mes.innerHTML = bez + " darf nur aus Buchstaben bestehen"
        }
        else if(!this.value.match(/^[A-ZÄ-Ü]/g)){
            mes.innerHTML = bez + " muss mit Großbuchstaben beginnen!"
        }
        else{
            mes.innerHTML = bez +  " darf 3-15 Buchstaben enthalten!"
        }

    }
    check();
}

function setIcon(toggle, i){
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



}
let submit = document.getElementById("submit");
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
    //document.getElementById("form1").submit();
    for(let i = 0; i<textInputs.length; i++){
        textInputs[i].value = "";
    }
    for(let i = 0; i < icons.length; i++){
        icons[i].classList.add("invisible");
    }
    check();
    mail.value = "";
    nachricht.value = "";
    mes.innerHTML = "Erfolgreich gesendet!";
    
}

//------------------------------------------------------------------------------------------------------


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