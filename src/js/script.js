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

function Contact_Select(number) {
  console.log(number + " has been selected");
  let Information = Find_Profile_By_Number(number);
  if (Information == "" || Information == undefined) {
    console.log("No Profile Found");
  }

  console.log(Information.name.first);
}

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

let Contacts_Search_Filter_Input_DOM =
  document.querySelector("#Contacts_Search");

let Current_Contacts = [];

function Find_Profile_By_Number(Phone_Number) {
  if (Current_Contacts == undefined || Current_Contacts == []) {
    console.log("Current Contacts are empty, can't find");
    return;
  }
  let Result = Current_Contacts.find(
    (Contact) => Contact.phone[0].number == Phone_Number,
  );
  return Result;
}

function Display_Contacts(Contacts) {
  localStorage.setItem("Contacts_Data", JSON.stringify(Contacts));
  Current_Contacts = Contacts;
  Load_All_Categories();
  Contacts.forEach((Contact) => {
    if (Contact.phone[0].number == undefined) {
      console.log("Error trying load an contact that does not have an number");
      return;
    }

    let Full_Name = `${Contact.name.first} ${Contact.name.last}`;
    let Initial_Letter = Contact.name.first[0];
    console.log(Initial_Letter);
    let Letter_Category = document.querySelector(
      `#Contacts_Holder_${Initial_Letter}`,
    );

    if (Letter_Category == undefined || Letter_Category == "") {
      console.log(
        "Error trying load an contact that don't belong to any category",
      );
      return;
    }

    if (
      Contacts_Search_Filter_Input_DOM.value != undefined ||
      Contacts_Search_Filter_Input_DOM.value != ""
    ) {
      //console.log(Contacts_Search_Filter_Input_DOM.value);

      let IsMatching = Full_Name.toLowerCase().includes(
        Contacts_Search_Filter_Input_DOM.value.toLowerCase(),
      );
      //console.log(IsMatching);
      if (!IsMatching) {
        return;
      }
    }

    let HTML = `<button class="Contacts" onClick="Contact_Select(${Contact.phone[0].number}); Switch_To_Mobile_Info()">${Contact.name.first} ${Contact.name.last}</button>`;
    Letter_Category.insertAdjacentHTML("beforeend", HTML);
  });
}

function Load_All_Contacts() {
  let Local_Contacts = JSON.parse(localStorage.getItem("Contacts_Data"));
  if (Local_Contacts == undefined || Local_Contacts == "") {
    let Contacts = Get_All_Contacts();
    Contacts.then((List) => {
      Display_Contacts(List.Contacts);
    });
  } else {
    Display_Contacts(Local_Contacts);
  }
}

Load_All_Contacts();
Contacts_Search_Filter_Input_DOM.addEventListener("input", () => {
  console.log("Filter Changed");
  Load_All_Contacts();
});

// Phones, Emails. Socials, Note

// let movies;
// if (Person_Data.movies) {
//   movies = `<p class="small">- Movies -</p><ul>${Person_Data.movies
//     .map((movie) => `<li>${movie}</li>`)
//     .join("")}</ul>`;
// }
