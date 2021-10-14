const express = require("express");
const { allowedOptionsConstants, allowedOptions } = require("./constants");
let helmet = require("helmet");
let cors = require("cors");
let compression = require("compression");
let CustomResponse = require("./customResponse");
const GlobalOptions = require("./options.js");

exports = module.exports = createApplication;


let { encryption } = allowedOptionsConstants;

/**
 * 
 * @param {object} options {Encryption :string, Logging: Boolean, socket: number}
 * @returns creates an express application
 */
function createApplication(options) {
  if (!validOptions(options)) {
    throw new Error("Invalid options, Please refer documentation");
  }

//expose options globally
GlobalOptions.main = options

let app = express();

app.use(cors())
.use(helmet())
.use(compression())
.use(express.json())
.use(express.urlencoded({ extended: true }));

  if(options && options[encryption]) {
     app.use(function (request, response, next) {    
        if (request.body && Object.keys(request.body).length) {
        let data1 = CryptoJS.AES.decrypt(request.body.data, options[encryption]);
        request.body = JSON.parse(data1.toString(CryptoJS.enc.Utf8));              
        }
        next();
        });
  }

  return app;
}

 exports.Response =  CustomResponse

/**
 * 
 * @param {object} options 
 * @returns 
 */
function validOptions(options) {
    if(!options) return true
  let valid = true;
  for (let i of Object.keys(options)) {
    if (!allowedOptions.includes(i)) {
      valid = false;
    }
  }

  return valid;
}




