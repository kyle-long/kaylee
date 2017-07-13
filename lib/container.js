"use strict";

module.exports = () => {
    var container, Dizzy, tv4;

    Dizzy = require("dizzy");
    tv4 = require("tv4");
    require("dizzy-promisify-bluebird")(Dizzy);
    container = new Dizzy();
    container.register("container", container);
    container.register("fsAsync", "fs").fromModule().promisified().cached();

    // Global modules
    container.registerBulk({
        openpgp: "openpgp",
        yaml: "js-yaml"
    }).fromModule();

    // Local modules
    container.registerBulk({
        config: "./config",
        formatTv4Errors: "./format-tv4-errors"
    }).fromModule(__dirname).asFactory().cached();
    tv4 = require("tv4-file-loader")(tv4);
    container.register("tv4", tv4);

    return container;
};
