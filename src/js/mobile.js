let Mobile_Width = 630;

let Contacts_Section = document.querySelector(".Contacts_Section");
let Information_Section = document.querySelector(".Information_Section");
let Return_To_Main_BTN = document.querySelector("#Return_To_Main_BTN");
let Edit_Add_Section = document.querySelector(".Edit_Add_Section");

let Current_Width = window.innerWidth;

let Current_Window = Contacts_Section;

function Move_To(Animation) {
  if (Animation) {
    Current_Window.scrollIntoView({ behavior: "smooth" });
  } else {
    Current_Window.scrollIntoView();
  }
}

function Switch_To_Edit() {
  Current_Window = Edit_Add_Section;
  Move_To();
}

function Switch_To_Contacts() {
  Current_Window = Contacts_Section;
  Move_To();
}

function Switch_To_Mobile_Info() {
  Current_Window = Information_Section;
  Move_To();
}

let resizerTimer;
function Update() {
  clearTimeout(resizerTimer);
  resizerTimer = setTimeout(() => {
    if (window.innerWidth != Current_Width) {
      Move_To(false);
    }
  }, 200);
}

window.addEventListener("resize", Update);
