let Debug_Mode = true;
function print(msg) {
  if (Debug_Mode) {
    console.log("-----------------------");
    console.log("Caller:");
    console.log(print.caller);
    console.log("Msg:");
    console.log(msg);
    console.log("-----------------------");
  }
}

const Contact_Categories = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Contacts_Container_DOM = document.querySelector("#Contacts_Container");

function Load_All_Categories() {
  Contacts_Container_DOM.innerHTML = "";
  Contact_Categories.forEach((Section_Name) => {
    let HTML = `<section class="Contacts_Category">
                        <header class="Contacts_Header">${Section_Name}</header>
                        <div class="Contacts_Holder" id="Contacts_Holder_${Section_Name}">
                            
                        </div>
                    </section>`;

    Contacts_Container_DOM.insertAdjacentHTML("beforeend", HTML);
  });
}

const Contact_Selectors_DOM = document.querySelectorAll(".Contact_Selector");

const Default_Profile_IMG =
  "https://cdn-icons-png.flaticon.com/512/9187/9187604.png";

function Contact_Select() {}

async function Get_All_Contacts() {
  try {
    const response = await fetch("../src/data/api.json");
    if (!response.ok) {
      throw new Error(`Reponse status: ${response.status}`);
    }

    const result = await response.json();
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

function Load_All_Contacts() {
  let Promise_Contacts = Get_All_Contacts();
  //console.log(Contacts_List);
  Load_All_Categories();
  Promise_Contacts.then((List) => {
    let Contacts = List.Contacts;

    Contacts.forEach((Contact) => {
      let Profile_IMG = Contact.Profile;
      console.log(Profile_IMG);
      if (Profile_IMG == "" || Profile_IMG == undefined) {
        Profile_IMG = Default_Profile_IMG;
      }
      if (Contact.phone[0].number == undefined) {
        console.log(
          "Error trying load an contact that does not have an number",
        );
        return;
      }

      let Initial_Letter = Contact.name.first[0];
      let Letter_Category = document.querySelector(
        `#Contacts_Holder_${Initial_Letter}`,
      );

      if (Letter_Category == undefined || Letter_Category == "") {
        console.log(
          "Error trying load an contact that don't belong to any category",
        );
        return;
      }

      let HTML = `<button class="Contacts">${Contact.name.first} ${Contact.name.last}</button>`;;
      Letter_Category.insertAdjacentHTML("beforeend", HTML);
    });
  });
}


Load_All_Contacts();
