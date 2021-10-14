'use strict';
let proses = require('./lib/prosesExpress');

let app = proses({encryption: "vishal", logging: true})
let { successResponse, other } = proses.Response;


app.listen()
console.log(other("hi"), "this is other");
module.exports = require('./lib/prosesExpress');