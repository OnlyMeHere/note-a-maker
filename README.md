# note-a-maker

Notes to self made here using this handy little application.


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description:

This application is intended to give the user a handy note taking tool. The note persist even when the application is closed allowing the user to access their reminders any time they choose.

## Technologies Used:

 * HTML
 * CSS
 * JavaScript
 * Node.js
 * Express.js
 * npm

 ## GIF of Site in Action:

 * (https://drive.google.com/file/d/18N5tqrYGk6ZOX9h8IJalQpShEozO9ah3/view)


 ## Screenshot of Site:

 ![](./public/assets/images/Note-a-Maker-image.png)


 ## Code Snippet:

 ```

 // when url /notes is received then app.get responds with sendFile 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
    return;
})
// when url api/notes is received this responds with existing notes
app.get('/api/notes', (req, res) => {
    res.json(db);
    return;
})

 ```

 ## Contact me:

 [LinkedIn](linkedin.com/in/jamesbennett1here)



