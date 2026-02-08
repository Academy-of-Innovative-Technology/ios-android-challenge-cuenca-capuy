
let Mobile_Width = 630;

let Contacts_Section = document.querySelector(".Contacts_Section");
let Information_Section = document.querySelector(".Information_Section")
let Return_To_Main_BTN = document.querySelector("#Return_To_Main_BTN");

let Current_Width = window.innerWidth;

function Switch_To_Mobile_Info() {
    //console.log(Current_Width);
    if (Current_Width > Mobile_Width){
        console.log("Mobile Mode Not Allowed");
        return;
    }
    console.log("Switching to Mobile Info");
    Information_Section.scrollIntoView({behavior: "smooth"});
}

function Switch_To_Contacts() {
    //console.log(Current_Width);
    if (Current_Width > Mobile_Width){
        console.log("Mobile Mode Not Allowed");
        return;
    }
    console.log("Switching to Contacts");
    Contacts_Section.scrollIntoView({behavior: "smooth"});
}
Return_To_Main_BTN.addEventListener("click", Switch_To_Contacts);


function Update() {
    Current_Width = window.innerWidth;
    if (Current_Width <= Mobile_Width && Information_Section.classList.contains("Mobile") == false){
        Information_Section.classList.add("Mobile");
    } else {
        Information_Section.classList.remove("Mobile");
    }
    
}

window.addEventListener("resize", Update);