[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22504276&assignment_repo_type=AssignmentRepo)
# INTRODUCTION

Create a contact app.

## INSTRUCTIONS

    The app already has contacts prepopulated from your data source. (At least 5 people). The app on load will be able to show all your contacts (Picture and First and Last Name). The user will able able to select one person to display their details. User is able to add a new contact, search for a user by typing in their name and/or by alphabetical list

    As always, be creative and use common UI / UX design principles. KIS ( KEEP IT SIMPLE) !!!

## REQUIREMENTS (make assumptions if needed)

- Create the data model below in the src/data/api.json file

    Data Model (Example)
    ```
    [ 
        {
            name : { first, last },
            profile: "",
            phone: [ { type, number }, { type, number } ],
            email: [ { type, name }, { type, name } ],
            social: [ { type, name }, { type, name } ],
            note: ""
        },
        {  ... }
    ]
    ```

- load the data model using `fetch` and display the prefilled data (hardcoded)

## JavaScript

- object
- loop
- functions
- array
- data-id

## HTML

- Minimum of 3 HTML pages or SPA (Single Page Application) that hides and shows the sections

## ADVANCED

- use a storage engine: LocalStorage / IndexedDB / *WebSQL*
- able to Create, Retrieve, Update and Delete (CRUD Methods)
- single page application
  