const { application } = require('express');
const express = require('express');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use('api', api);

// middleware to point to the public directory
app.use(express.static('public'));


