// Calls middleware to server.js
const fs = require('fs');
const express = require('express');
const path = require('path');
const { randomUUID } = require('crypto');
const db = require('./db/db.json');
const http = require('http');

const app = express();

let noteId = [];
let deleteNote = [];

const PORT = process.env.PORT || 3001;


// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true }));

// middleware to point to the public directory
app.use(express.static('public'));

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
// POST route for notes to db from client
app.post('/api/notes', (req, res) => {
    // constructs message body
    const { title, text, } = req.body;
    // checks to see if both title and text are present. if so creates new note
    if ( title && text ) {
        const newNote = {
            title: title,
            text: text,
            note_id: randomUUID(),
        };
        // creates response of success and sets body equal to newNote
        const response = {
            status: 'success',
            body: newNote,
        };
         // adds newNote to all other notes
        db.push(newNote)
         // sends back response to client confirming newNote
        res.json(response)
        // writes new db that includes the new note with the old notes
        fs.writeFile('./db/db.json', JSON.stringify(db, null, 4), (err) => {
            if (err) {
                console.error(err)
            }
        })
        // sends the note file back to db modified or not
        console.log(db);



    }else {
        res.send(db);
    }
    return;
})
// delete note logic here
app.delete('/api/notes:id', (req, res) => {
    
    let deleteNote = db.find(c => c.id === parseInt(req.params.id));

    const newDb = db.filter( JSON.parse.body.id !== c.id );

    fs.writeFile('./db/db.json', JSON.stringify(newDb, null, 4), (err) => {
        if (err) {
            console.error(err)
        }
    
    });

    // res.status(404).send('Note not found');
    res.json(db);

});
// catch all * send the response to notes.html
app.get('*', (req, res) => {
    
    res.sendFile(path.join(__dirname, '/public/notes.html'))

    return;
})
// PORT listener enable the server.js to reveive all incoming url requests
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
});