const express = require('express');
const cors = require('cors');
const database = require('./database');
const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// app.use(cors);
// app.options('*', cors())
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, 'images')));
// app.use('/images', express.static('images'));

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.post('/contact/listall', async(req, res) => {
    console.log('listing all')
    let data = await database.fetchContact(req.body.userid);
    // console.log(data);
    res.json(data);
});

app.post('/contact/findcid', async(req, res) => {
    console.log('finding one', req.body.userid, req.body.cid)
    let data = await database.findContact(req.body.userid, req.body.cid);
    console.log(data);
    res.json(data);
});

app.listen(port, async() => {
    await database.init();
    console.log(`Listening on URL http://localhost:${port}`);
});