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
const Information_Main_DOM = document.querySelector(".Information_Main");
const Information_Profile_DOM = document.querySelector(".Information_Profile");
const Information_Name_DOM = document.querySelector(".Information_Name");

const Default_Profile_IMG =
  "https://cdn-icons-png.flaticon.com/512/9187/9187604.png";

let Get_Instagram_Link = (user) => {
  return `https://instagram.com/${user}`;
}



function Contact_Select(number) {
  console.log(number + " has been selected");
  let Information = Find_Profile_By_Number(number);
  if (Information == "" || Information == undefined) {
    console.log("No Profile Found");
  }
  console.log(Information);
  let Profile = Default_Profile_IMG;
  if (Information.Profile != "" && Information.Profile != undefined) {
    Profile = Information.Profile;
  }
  Information_Profile_DOM.src = Profile;

  let Name = "";
  if (Information.name == undefined) {
    Name = number;
  } else {
    if (Information.name.first != undefined && Information.name.first != "") {
      Name += Information.name.first + " ";
    }
    if (Information.name.last != undefined && Information.name.last != "") {
      Name += Information.name.last;
    }
  }

  Information_Name_DOM.innerHTML = Name;

  let Phones = "";
  if (Information.phone) {
    Information.phone.forEach((phone) => {
      Phones += `<p class="Information_Contact_Content">${phone.number} (${phone.type})</p>`;
    });
  }

  let Emails = "";
  if (Information.email) {
    Information.email.forEach((email) => {
      Emails += `<p class="Information_Contact_Content" onClick="EmailTo('${email.address}')">${email.address} (${email.type})</p>`;
    });
  }

  let Socials = "";
  if (Information.social) {
    Information.social.forEach((social) => {
      Socials += `<p class="Information_Contact_Content"><a href="${Get_Instagram_Link(social.name)}">${social.name} (${social.type})</a></p>`;
    });
  }

  let Note = "";
  if (Information.note) {
    Note = `<p class="Information_Contact_Content">${Information.note}</p>`;
  }
  Information_Main_DOM.innerHTML = "";

  if (Phones != "") {
    let HTML = `
    <div class="Information_Contact_Items">
            <svg class="Information_Contact_Logo" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M160-40v-80h640v80H160Zm0-800v-80h640v80H160Zm320 400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm70-80h500q-45-56-109-88t-141-32q-77 0-141 32t-109 88Z"/></svg>
            <div class="Information_Contact_Info">
              <h5 class="Information_Contact_Header">Phone Number</h5>
              ${Phones}
            </div>
          </div>`;
    Information_Main_DOM.insertAdjacentHTML("beforeend", HTML);
  }
  if (Emails != "") {
    let HTML = `
    <div class="Information_Contact_Items">
            <svg class="Information_Contact_Logo" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"/></svg>
            <div class="Information_Contact_Info">
              <h5 class="Information_Contact_Header">Email</h5>
              ${Emails}
            </div>
          </div>`;
    Information_Main_DOM.insertAdjacentHTML("beforeend", HTML);
  }

  if (Socials != "") {
    let HTML = `
    <div class="Information_Contact_Items">
            <svg class="Information_Contact_Logo" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m300-180 160-100-160-100v200Zm220-470h160v-60H520v60ZM120-40q-33 0-56.5-23.5T40-120v-320q0-33 23.5-56.5T120-520h480q33 0 56.5 23.5T680-440v320q0 33-23.5 56.5T600-40H120Zm620-360v-40q0-38-18.5-70T672-560h8q50 0 85-35t35-85q0-50-35-85t-85-35h-50v60h50q25 0 42.5 17.5T740-680q0 25-17.5 42.5T680-620h-50v60q-8 0-15-10t-15-10h-30v-40h-50q-25 0-42.5-17.5T460-680q0-25 17.5-42.5T520-740h50v-60h-50q-50 0-85 35t-35 85q0 32 15 57.5t39 42.5H280v-260q0-33 23.5-56.5T360-920h480q33 0 56.5 23.5T920-840v360q0 33-23.5 56.5T840-400H740Z"/></svg>
            <div class="Information_Contact_Info">
              <h5 class="Information_Contact_Header">Socials</h5>
              ${Socials}
            </div>
          </div>`;
    Information_Main_DOM.insertAdjacentHTML("beforeend", HTML);
  }

  if (Note != "") {
    let HTML = `
    <div class="Information_Contact_Items">
            <svg class="Information_Contact_Logo" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-160v-441q0-33 24-56t57-23h439q33 0 56.5 23.5T880-600v320L680-80H360q-33 0-56.5-23.5T280-160ZM81-710q-6-33 13-59.5t52-32.5l434-77q33-6 59.5 13t32.5 52l10 54H360q-66 0-113 47t-47 113v382q-16-9-27.5-24T158-276L81-710Zm719 390H640v160l160-160Z"/></svg>
            <div class="Information_Contact_Info">
              <h5 class="Information_Contact_Header">Note</h5>
              ${Note}
            </div>
          </div>`;
    Information_Main_DOM.insertAdjacentHTML("beforeend", HTML);
  }
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

let First_Load = true;
function Load_All_Contacts() {
  let Local_Contacts = JSON.parse(localStorage.getItem("Contacts_Data"));
  let Loaded_Contacts;

  if (Local_Contacts == undefined || Local_Contacts == "") {
    let Contacts = Get_All_Contacts();
    Contacts.then((List) => {
      let Ordered_Contacts = List.Contacts.sort((a, b) =>
        a.name.first.localeCompare(b.name.first),
      );
      console.log(Ordered_Contacts);
      Display_Contacts(List.Contacts);
      Loaded_Contacts = List.Contact;
    });
  } else {
    let Ordered_Contacts = Local_Contacts.sort((a, b) =>
        a.name.first.localeCompare(b.name.first),
    );
    Display_Contacts(Ordered_Contacts);
    Loaded_Contacts = Local_Contacts;
  }
  if (First_Load) {
    Contact_Select(Loaded_Contacts[0].phone[0].number)
  }
}

Load_All_Contacts();
Contacts_Search_Filter_Input_DOM.addEventListener("input", () => {
  console.log("Filter Changed");
  Load_All_Contacts();
});

function EmailTo(address){
  console.log(address);
  window.open(`mailto:${address}`);
}









// Phones, Emails. Socials, Note

// let movies;
// if (Person_Data.movies) {
//   movies = `<p class="small">- Movies -</p><ul>${Person_Data.movies
//     .map((movie) => `<li>${movie}</li>`)
//     .join("")}</ul>`;
// }
