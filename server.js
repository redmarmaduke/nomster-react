require('dotenv').config();

const express = require('express');
const getListing = require('./util/getListing');

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/api/listing', (req,res) => {
    getListing(req.query).then((data) => {
        res.json(data);    
    }).catch((error) => {
        console.error("ERROR: ",error);
        res.status(400).json(error);
    });
});

app.listen(PORT,() => {
    console.log(`Listening at http://localhost:${PORT}`);
})