const express = require("express");
const { allowedOptionsConstants, allowedOptions } = require("./constants");
var helmet = require("helmet");
var cors = require("cors");
var compression = require("compression")

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




