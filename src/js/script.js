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
let Global_Contacts = [];
let Saved_Data_LocalStorage_Name = "Saved_Contacts";
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
};
let Formatted_Phone_Number = (number) => {
  let String_Ver = String(number);
  return `(${String_Ver.substring(0, 3)}) ${String_Ver.substring(3, 6)}-${String_Ver.substring(6)}`;
};

let Current_Selected_Contact_Index = 0;

let Edit_Temp_Contact = [];

let Phone_Number_Content = document.querySelector(".Phone_Number_Content");
let Email_Content = document.querySelector(".Email_Content");
let Social_Content = document.querySelector(".Social_Content");

function Display_Edit_Contact() {
  document.querySelector("#Edit_First_Name").value =
    Edit_Temp_Contact.name.first;
  document
    .querySelector("#Edit_First_Name")
    .setAttribute(
      "oninput",
      `Update_Information_Item('name', "N/A", 'first', this.value)`,
    );

  document.querySelector("#Edit_Last_Name").value = Edit_Temp_Contact.name.last;
  document
    .querySelector("#Edit_Last_Name")
    .setAttribute(
      "oninput",
      `Update_Information_Item('name', "N/A", 'last', this.value)`,
    );

  Phone_Number_Content.innerHTML = "";
  Edit_Temp_Contact.phone.forEach((Object, index) => {
    let HTML = `<div class="Phone_Number_Container Field_Container">
                <button class="Edit_Information_Contact_Field_BTN" onclick="Delete_Information_Item('phone',${index})"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg></button>
                <input name="phone_type_index_${index}" required type="text" class="Type_Input" list="Phone_Types" value="${Object.type}" oninput="Update_Information_Item('phone', ${index}, 'type', this.value)">
                <input name="phone_number_index_${index}" required type="number" class="Edit_Input" placeholder="Phone" value="${Object.number}" oninput="Update_Information_Item('phone', ${index}, 'number', Number(this.value))">
              </div>`;
    Phone_Number_Content.insertAdjacentHTML("beforeend", HTML);
  });

  Email_Content.innerHTML = "";
  Edit_Temp_Contact.email.forEach((Object, index) => {
    let HTML = `<div class="Email_Container Field_Container">
                <button class="Edit_Information_Contact_Field_BTN" onclick="Delete_Information_Item('email',${index})"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg></button>
                <input name="email_type_index_${index}" required type="text" class="Type_Input" list="Phone_Types" value="${Object.type}" oninput="Update_Information_Item('email', ${index}, 'type', this.value)">
                <input name="email_address_index_${index}" required type="text" class="Edit_Input" placeholder="Address" value="${Object.address}" oninput="Update_Information_Item('email', ${index}, 'address', this.value)">
              </div>`;
    Email_Content.insertAdjacentHTML("beforeend", HTML);
  });

  Social_Content.innerHTML = "";
  Edit_Temp_Contact.social.forEach((Object, index) => {
    let HTML = `<div class="Social_Container Field_Container">
                <button class="Edit_Information_Contact_Field_BTN" onclick="Delete_Information_Item('social',${index})"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg></button>
                <input name="social_type_index_${index}" required type="text" class="Type_Input" list="Phone_Types" value="${Object.type}" oninput="Update_Information_Item('social', ${index}, 'type', this.value)">
                <input name="social_name_index_${index}" required type="text" class="Edit_Input" placeholder="Social Platform" value="${Object.name}" oninput="Update_Information_Item('social', ${index}, 'name', this.value)">
              </div>`;
    Social_Content.insertAdjacentHTML("beforeend", HTML);
  });
}

function Load_Edit_Contact() {
  Edit_Temp_Contact = structuredClone(
    Global_Contacts[Current_Selected_Contact_Index],
  );
  console.log(Edit_Temp_Contact);
  Display_Edit_Contact();
}

function Cancel_Edit_Contact() {
  Edit_Temp_Contact = [];
  document.querySelector("#Edit_Add_Container").classList.add("Zoom_Out");
  setTimeout( () => {
    document.querySelector(".Edit_Add_Section").classList.add("Closed");
    document.querySelector("#Edit_Add_Container").classList.remove("Zoom_Out");
  }, 350)
  
}
function Open_Edit_Contact() {
  Edit_Temp_Contact = [];
  document.querySelector(".Edit_Add_Section").classList.remove("Closed");
  Load_Edit_Contact();
  document.querySelector("#Edit_Add_Container").classList.add("Zoom_In");
  setTimeout( () => {
    document.querySelector("#Edit_Add_Container").classList.remove("Zoom_In");
  }, 350)

}

function Update_Information_Item(Section, Index, Key, NewValue) {
  if (Index == "N/A") {
    Edit_Temp_Contact[Section][Key] = NewValue;
  } else {
    Edit_Temp_Contact[Section][Index][Key] = NewValue;
  }
}

const Information_Contact_Field_Templates = {
  phone: { type: "", number: 0 },
  email: { type: "", address: "" },
  social: { type: "", name: "" },
};

function Add_Edit_Information_Contact_Field(field_type) {
  let Template = Information_Contact_Field_Templates[field_type];
  console.log(Template);
  Edit_Temp_Contact[field_type].push(Template);
  Display_Edit_Contact();
}

function Delete_Information_Item(category, index) {
  console.log(Edit_Temp_Contact[category]);

  Edit_Temp_Contact[category].splice(index, 1);
  console.log(Edit_Temp_Contact);
  Display_Edit_Contact();
}

function Save_Edit_Information() {
  Global_Contacts[Current_Selected_Contact_Index] = Edit_Temp_Contact;
  Save_All_Contacts();
  Load_All_Contacts();
}

function Contact_Select(index) {
  Current_Selected_Contact_Index = index;

  const url = new URL(window.location);
  url.searchParams.set("Contact_Selected", Current_Selected_Contact_Index);
  window.history.replaceState({}, "", url);

  //console.log(index + " has been selected");
  let Information = Global_Contacts.contacts[index];
  if (Information == "" || Information == undefined) {
    console.log("No Profile Found");
  }
  //console.log(Information);
  let Profile = Default_Profile_IMG;
  if (Information.profile != "" && Information.profile != undefined) {
    Profile = Information.profile;
    //console.log("Profile Pic Found");
  } else {
    console.log("Profile Pic Not Found");
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
      Phones += `<p class="Information_Contact_Content">${Formatted_Phone_Number(phone.number)} (${phone.type})</p>`;
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
      Socials += `<p class="Information_Contact_Content"><a target="_blank" href="${Get_Instagram_Link(social.name)}">${social.name} (${social.type})</a></p>`;
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

// function Find_Profile_By_Number(Phone_Number) {
//   if (Current_Contacts == undefined || Current_Contacts == []) {
//     console.log("Current Contacts are empty, can't find");
//     return;
//   }
//   let Result = Current_Contacts.find(
//     (Contact) => Contact.phone[0].number == Phone_Number,
//   );
//   return Result;
// }

function Display_Contacts() {
  Load_All_Categories();
  Global_Contacts.contacts.forEach((Contact, index) => {
    let Full_Name = `${Contact.name.first} ${Contact.name.last}`;
    let Initial_Letter = Contact.name.first[0];
    //console.log(Initial_Letter);
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

    let HTML = `<button class="Contacts" onClick="Contact_Select(${index}); Switch_To_Mobile_Info()">${Contact.name.first} ${Contact.name.last}</button>`;
    Letter_Category.insertAdjacentHTML("beforeend", HTML);
  });
}

// let First_Load = true;
// function Load_All_Contacts() {
//   let Local_Contacts = JSON.parse(localStorage.getItem("Contacts_Data"));
//   let Loaded_Contacts;

//   if (Local_Contacts == undefined || Local_Contacts == "") {
//     let Contacts = Get_All_Contacts();
//     Contacts.then((List) => {
//       let Ordered_Contacts = List.Contacts.sort((a, b) =>
//         a.name.first.localeCompare(b.name.first),
//       );
//       console.log(Ordered_Contacts);
//       Display_Contacts(List.Contacts);
//       Loaded_Contacts = List.Contact;
//     });
//   } else {
//     let Ordered_Contacts = Local_Contacts.sort((a, b) =>
//       a.name.first.localeCompare(b.name.first),
//     );
//     Display_Contacts(Ordered_Contacts);
//     Loaded_Contacts = Local_Contacts;
//   }
//   if (First_Load) {
//     Contact_Select(Loaded_Contacts[0].phone[0].number);
//   }
// }

function Save_All_Contacts() {
  if (
    Global_Contacts == [] ||
    Global_Contacts == "" ||
    Global_Contacts == undefined
  ) {
    console.log("Cannot save because Global_Contacts is empty or invalid");
    return;
  }

  let Proper_Format = { contacts: Global_Contacts };
  localStorage.setItem(
    Saved_Data_LocalStorage_Name,
    JSON.stringify(Proper_Format),
  );
}

function Load_All_Contacts() {
  let Local_Contacts = JSON.parse(
    localStorage.getItem(Saved_Data_LocalStorage_Name),
  );

  if (
    Local_Contacts != undefined &&
    Local_Contacts != "" &&
    Local_Contacts != []
  ) {
    let Sorted = Local_Contacts.contacts.sort((a, b) =>
      a.name.first.localeCompare(b.name.first),
    );
    let Contacts_Ordered = Sorted;
    Contacts_Ordered.contacts = Sorted;

    Global_Contacts = Contacts_Ordered;
    //onsole.log(Contacts_Ordered);

    Display_Contacts();
    Contact_Select(Current_Selected_Contact_Index);
  } else {
    let Promise = Get_All_Contacts();
    Promise.then((Contacts) => {
      let Sorted = Contacts.contacts.sort((a, b) =>
        a.name.first.localeCompare(b.name.first),
      );
      let Contacts_Ordered = Contacts;
      Contacts_Ordered.contacts = Sorted;

      Global_Contacts = Contacts_Ordered;
      localStorage.setItem(
        Saved_Data_LocalStorage_Name,
        JSON.stringify(Global_Contacts),
      );
      console.log(Contacts_Ordered);

      Display_Contacts();
      Contact_Select(Current_Selected_Contact_Index);
    });
  }
}

let urlParams = new URLSearchParams(window.location.search);
Current_Selected_Contact_Index = urlParams.get("Contact_Selected") || 0;

Load_All_Contacts();

Contacts_Search_Filter_Input_DOM.addEventListener("input", () => {
  console.log("Filter Changed");
  Load_All_Contacts();
});

function EmailTo(address) {
  console.log(address);
  window.open(`mailto:${address}`);
}

let Edit_Add_Container = document.querySelector("#Edit_Add_Container");

Edit_Add_Container.addEventListener("submit", (e) => {
  e.preventDefault();
  if (Edit_Add_Container.checkValidity()) {
    Save_Edit_Information();
    Cancel_Edit_Contact();
  }
});

// Phones, Emails. Socials, Note

// let movies;
// if (Person_Data.movies) {
//   movies = `<p class="small">- Movies -</p><ul>${Person_Data.movies
//     .map((movie) => `<li>${movie}</li>`)
//     .join("")}</ul>`;
// }
