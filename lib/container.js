"use strict";

/**
 * @typedef {Object} fileAccessConfig
 * @property {string} [username]
 * @property {string} [password] - Required if username is provided.
 * @property {string} path - Path to the file. This should include the protocol of required.
 */

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
        ftp: "jsftp",
        Log: "log",
        openpgp: "openpgp",
        yaml: "js-yaml",
        Uri: "urijs"
    }).fromModule();

    // Local modules
    container.registerBulk({
        createFileAccess: "create-file-access",
        config: "./config",
        logger: "./logger",
        formatTv4Errors: "./format-tv4-errors",
        FtpAccess: "./file-access/ftp"
    }).fromModule(__dirname).asFactory().cached();
    tv4 = require("tv4-file-loader")(tv4);
    container.register("tv4", tv4);

    return container;
};
