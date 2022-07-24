// Calls middleware to server.js
const fs = require('fs');
const express = require('express');
const path = require('path');
// const api = require('/index.js');
const { randomUUID } = require('crypto');
const db = require('./db/db.json');

const app = express();

const PORT = 3001;

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true }));
// app.use('/api', api);

// middleware to point to the public directory
app.use(express.static('public'));

// POST route for notes to db to client

app.get('/notes', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(db);
})

app.post('/api/notes', (req, res) => {

    const { title, text } = req.body;

    if ( title && text ) {
        const newNote = {
            title: title,
            text: text,
            note_id: randomUUID(),
        };

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response)
        db.push(newNote)

        fs.writeToFile('./db/db.json', JSON.stringify(db), (err) => {
            if (err) {
                console.error(err)
            }
        })

        console.log(db);
        res.send(db);

    }else {
        res.send('error in posting note');
    }
})

app.get('*', (req, res) => {
    
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
});