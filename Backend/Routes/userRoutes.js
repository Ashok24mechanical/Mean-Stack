const db = require('../DataBase/dbWithClient');
const crypto = require('crypto-js')
const express = require('express');
const routes = express.Router();
const ObjectID = db.ObjectID;

routes.get('/GetData', async (req, res) => {
    let database = await db.getdatabase();
    let collection = database.collection('users');
    let cursor = collection.find();
    let data = await cursor.toArray();
    // console.log(data);
    let encode = { user: data }
    let encrypted = crypto.AES.encrypt(JSON.stringify(encode), 'keyword').toString();
    // console.log(encrypted);
    return res.json(encrypted);
});


routes.post('/PostData', async (req, res) => {
    let database = await db.getdatabase();
    let collection = database.collection('users');
    // console.log(req.body);
    let data = req.body.user
    // console.log(data);
    let decrypted = crypto.AES.decrypt(data, 'keyword');
    let decryp = decrypted.toString(crypto.enc.Utf8);
    // console.log(decryp);
    let decrypt = JSON.parse(decryp);
    await collection.insertOne({
        firstname: decrypt.firstname,
        lastname: decrypt.lastname,
        email: decrypt.email,
        // Password: req.body.password,
        // ConfirmPassword: req.body.confirmpassword,
        gender: decrypt.gender,
        nationality: decrypt.nationality
    });
    return res.json({ 'Data Recieved': decrypt });
});
routes.put('/UpdateData/:_id', async (req, res) => {
    let database = await db.getdatabase();
    let collection = database.collection('users');
    let data = req.body.user;
    // console.log(data);
    let decry = crypto.AES.decrypt(data, 'keyword');
    let parse = decry.toString(crypto.enc.Utf8)
    let dec = JSON.parse(parse);
    // console.log(dec);
    _id = req.params._id;
    await collection.updateOne({ _id: ObjectID(_id) }, {
        $set: {
            firstname: dec.firstname,
            lastname: dec.lastname,
            email: dec.email,
            // Password: req.body.password,
            // ConfirmPassword: req.body.confirmpassword,
            gender: dec.gender,
            nationality: dec.nationality
        }
    });
    return res.json({ 'Data Updated': dec });
});
routes.delete('/DeleteData/:_id', async (req, res) => {
    let database = await db.getdatabase();
    let collection = database.collection('users');
    _id = req.params._id;
    await collection.deleteOne({ _id: ObjectID(_id) });
    return res.json({ 'Data Deleted': req.body });
});

module.exports = routes;
