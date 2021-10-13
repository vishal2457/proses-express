let log4js = require("log4js")
module.exports = () => {
    let today = new Date();
    let name =
      "custom_" +
      today.getDate() +
      "-" +
      parseInt(today.getMonth() + 1) +
      "-" +
      today.getFullYear() +
      ".log";
    const file = `${__dirname}/logs/${name}`;
    log4js.configure({
      appenders: {
        console: { type: "console" },
        file: { type: "file", filename: file },
      },
      categories: {
        Paperbird: { appenders: ["file"], level: "info" },
        default: { appenders: ["console"], level: "info" },
      },
    });
    var logger = log4js.getLogger("custom");
    return logger

}