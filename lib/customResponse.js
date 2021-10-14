const express = require("express");
const { allowedOptionsConstants } = require("./constants");
const loggerInstance = require("./logger");
const GlobalOptions = require("./options.js");
const res = express.response;
let { encryption, logging } = allowedOptionsConstants;
let options = GlobalOptions.main;
let logger = null;
if (options[logging]) {
  logger = loggerInstance();
}
module.exports = {
    successRensponse : async (data, msg) => {
      if (options[logging]) {
        logger.info(`[${msg}`);
      }
      let finalData = data;
      if (options[encryption]) {
        //Send encrypted response (needs to be decrypted on the client side)
        finalData = await encryptData(data);
      }
      res.status(200).send({ status: 1, data: finalData, msg });
    },

    serverError :async (err) => {
      if (options[logging]) {
        logger.error(`${err}`);
      }
      console.log(err, "server err");
      res.status(500).send({ status: 0, msg: "Server error" });
    },

    //404 Not Found
    notFound :async (msg) => {
      if (options[logging]) {
        logger.warn(`${msg}`);
      }
      res.status(404).send({ status: 0, msg });
    },

    //401 Unauthorized
    unauthorized :(msg) => {
      if (options[logging]) {
        logger.warn(`${msg}`);
      }
      res.status(401).send({ status: 0, msg });
    },

    //400 Bad Request
    other :(msg) => {
      if (options[logging]) {
        logger.warn(`${msg}`);
      }
      res.status(400).send({ status: 0, msg });
    },

    //409 conflict (Used for duplicate values mainly)
    alreadyExist :(msg) => {
      if (options[logging]) {
        logger.warn(` ${msg}`);
      }
    
      res.status(409).send({ status: 0, msg });
    },

    //requires fields
    requiredFieldsEmpty :(arr) => {
      if (options[logging]) {
        logger.warn(` "Required fields empty"`);
      }
      res.status(422).send({ status: 0, msg: arr[0].msg });
    }

};
