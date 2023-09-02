
let spj = 2023;
let sp = 2;
let nav = document.getElementById("nav");
let links = nav.children;


document.getElementById("button1").onclick = function(){
    
    if(nav.classList.contains("franz")){
      nav.classList.remove("franz");
      this.innerHTML = '<i class="material-symbols-outlined md-24">menu</i>';
    }

    else{
      nav.classList.add("franz");
      this.innerHTML = '<i class="material-symbols-outlined md-24">close</i>'; 
    }    
      
}

//------------------------------------------------------------------------------------------------------

let main = document.getElementsByTagName("main")[0].children;

let a = document.getElementsByTagName("a");
    for(let i = 0; i<4; i++){
        a[i].onclick = () => {
            for(let j = 0; j < main.length; j++){
                main[j].classList.add("hidden");
                links[j+1].classList.remove("bgr-color-pr1");
                links[j+1].classList.remove("color-pr3");
            }
        
            main[i].classList.remove("hidden");
            links[i+1].classList.add("bgr-color-pr1");
            links[i+1].classList.add("color-pr3");
        }
}



//------------------------------------------------------------------------------------------------------

let summarys = document.getElementsByClassName("sumary-kompetenzen");

for(let summary of summarys){
  summary.onclick = clickEffect;
}

function clickEffect(){
    if(this.classList.contains("bgr-color-pr3", "color-pr1")){
        this.classList.remove("bgr-color-pr3", "color-pr1");
        this.classList.add("bgr-color-pr3l", "shadow1");
    }
    else{
        this.classList.add("bgr-color-pr3", "color-pr1");
        this.classList.remove("bgr-color-pr3l", "shadow1");
    }
}

//------------------------------------------------------------------------------------------------------


let inputs = Array.from(document.getElementsByClassName("inp"));
let mes = document.getElementById("warningMessage");
let icons = document.getElementsByClassName("inpIcon");
let submit = document.getElementById("submit");

inputs.forEach(input => {
  input.addEventListener("keyup", checkinp);
  input.addEventListener("blur", checkinp);
})

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

let checkText = (text, rx, i) => {
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

let checkEmail = (email, rx, i) => {
    if(email.match(rx)){
        setIcon(true, i);
    }

    else{
        setIcon(false, i);
        mes.innerHTML = "Ungültige E-Mail";
    }
}

let setIcon = (toggle, i) => {
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

let check = () => {
    
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


submit.onclick = () => {
    
  
  inputs.forEach(inp => inp.value = "");

    for(let icon of icons){
        icon.classList.add("invisible");
    }
    check();
    mes.innerHTML = "Erfolgreich gesendet!";

}

//------------------------------------------------------------------------------------------------------


//=>improve with fetchAPI

let blogsections = ["blog/2023-4-17.json","blog/2023-4-18.json","blog/2023-4-19.json"];



let currentSection = 1;
loadBlog(blogsections[currentSection]);

/* AJAX:
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
*/

//Fetch:
function loadBlog(url){
    let warning = document.getElementById("blogerror");
    fetch(url)
    .then(res => res.json())
    .then(data => {
        warning.classList.add("hidden");
        setentry(data);
    })
    .catch(err => warning.classList.remove("hidden"))
}



let setentry = entry => {
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

document.getElementById("blogleft").onclick = ()=>{
    currentSection--;
    if(currentSection < 0){
        currentSection = blogsections.length - 1;
    }
    loadBlog(blogsections[currentSection]);
}

document.getElementById("blogright").onclick = ()=>{
    currentSection = (currentSection+1) % blogsections.length;
    loadBlog(blogsections[currentSection]);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


//------------------------------------------------------------------------------------------------
let link = "https://api.openligadb.de/getmatchdata/bl1/"

;
let sp2 = document.getElementById("spieltag2");
sp2.value = sp;
sp2.addEventListener("blur", loadsth);
sp2.addEventListener("click", loadsth);
sp2.addEventListener("keyup", loadsth);

function loadsth(){
  if(this.value == sp){

  }

  else{
  if(this.value < 1 && this.value != ""){
    this.value = 34;
  }
  else if(this.value > 34 && this.value != ""){
    this.value = 1
  }


  if(this.value == ""){
  }
  else{
    sp = this.value;
    loadBuli(link+spj+"/"+sp);
  }
  }
}




let loadBuli = url => {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    document.getElementById("spieltag").innerHTML = (data[0].group.groupName);
    let paste = document.getElementById("buliDaten");
    paste.innerHTML = "";
    for(let game of data){
      paste.innerHTML +=
      '<div class="games">'+
      '<span class="grid-2b2 gap-4"><p>' +
      '<img src="teams/'+game.team1.shortName+'.svg.png">' + 
       ' '+game.team1.teamName + '</p>' +
       '<p><span class="res1 res">'+game.matchResults[1].pointsTeam1+'</span></p></span>'+
      
      '<span class="grid-2b2 gap-4"><p><img src="teams/'+game.team2.shortName+'.svg.png">'+
      ' '+game.team2.teamName +
      '</p>' +
      '<p><span class="res2 res">'+ game.matchResults[1].pointsTeam2 +'</span></p></span>'+
      '</div><br>'
    }



  })
  .catch(err =>{
    fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById("spieltag").innerHTML = (data[0].group.groupName);
      let paste = document.getElementById("buliDaten");
      paste.innerHTML = "";
      for(game of data){
        paste.innerHTML +=
        '<div class="games">'+
        '<span class="grid-2b2 gap-4"><p>' +
        '<img src="teams/'+game.team1.shortName+'.svg.png">' + 
        ' '+game.team1.teamName + '</p>' +
        '<p><span class="res1 res">--'+'</span></p></span>'+
      
        '<span class="grid-2b2 gap-4"><p><img src="teams/'+game.team2.shortName+'.svg.png">'+
        ' '+game.team2.teamName +
        '</p>' +
        '<p><span class="res2 res">--' +'</span></p></span>'+
        '</div><br>'
      }



  })
  })




}

loadBuli(link+spj+"/"+sp)