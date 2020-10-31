"use strict";
const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost/c04-typescript';
const DB_PROD = 'mongodb+srv://draconetics:draconetics@cluster0-74ml0.mongodb.net/test?retryWrites=true&w=majority';
const DB_TESTING = 'mongodb://localhost/c04-typescript-testing';
const connect = () => {
    return new Promise((resolve, reject) => {
        let uri = DB_URI;
        if (process.env.NODE_ENV === 'test')
            uri = DB_TESTING;
        if (process.env.NODE_ENV === 'production')
            uri = DB_PROD;
        //developer mode
        connectToDataBase(resolve, reject, uri);
    }); //end promise
};
const connectToDataBase = (resolve, reject, url) => {
    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => resolve())
        .catch((err) => reject(err));
};
const closeConnection = () => mongoose.disconnect();
module.exports = { connect, closeConnection };
