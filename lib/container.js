"use strict";

module.exports = (logLevel) => {
    var container, Dizzy, tv4;

    // Default the log level to info.
    Dizzy = require("dizzy");
    tv4 = require("tv4");
    require("dizzy-promisify-bluebird")(Dizzy);
    container = new Dizzy();
    container.register("container", container);
    container.register("fsAsync", "fs").fromModule().promisified().cached();
    container.register("logLevel", logLevel);

    // Global modules
    container.registerBulk({
        Log: "log",
        openpgp: "openpgp",
        yaml: "js-yaml"
    }).fromModule();

    // Local modules
    container.registerBulk({
        config: "./config",
        logger: "./logger",
        formatTv4Errors: "./format-tv4-errors"
    }).fromModule(__dirname).asFactory().cached();
    tv4 = require("tv4-file-loader")(tv4);
    container.register("tv4", tv4);

    return container;
};
