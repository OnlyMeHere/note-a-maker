// Calls middleware to server.js
const fs = require('fs');
const express = require('express');
const path = require('path');
const { randomUUID } = require('crypto');
const db = require('./db/db.json');

const app = express();

const PORT = 3001;

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true }));

// middleware to point to the public directory
app.use(express.static('public'));

// when url /notes is received then app.get responds with sendFile 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})
// ahen url api/notes is received this responds with existin notes
app.get('/api/notes', (req, res) => {
    res.json(db);
})
// POST route for notes to db from client
app.post('/api/notes', (req, res) => {
    // constructs message body
    const { title, text } = req.body;
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
        // sends back response to client confirming newNote
        res.json(response)
        // adds newNote to all other notes
        db.push(newNote)
        // writes new db that includes the new note with the old notes
        fs.writeToFile('./db/db.json', JSON.stringify(db), (err) => {
            if (err) {
                console.error(err)
            }
        })
        // sends the note file back to db modified or not
        console.log(db);
        res.send(db);

    }else {
        res.send('error in posting note');
    }
})
// catch all * send the response to notes.html
app.get('*', (req, res) => {
    
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})
// PORT listener enable the server.js to reveive incoming url requests
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
});