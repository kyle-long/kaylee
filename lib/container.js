"use strict";

module.exports = () => {
    var container, Dizzy, moduleDefs;

    Dizzy = require("dizzy");
    require("dizzy-promisify-bluebird")(Dizzy);
    container = new Dizzy();
    container.register("container", container);
    container.register("fsAsync", "fs").fromModule().promisified().cached();

    // Global modules
    moduleDefs = {
        openpgp: "openpgp"
    };
    container.registerBulk(moduleDefs).fromModule();

    return container;
};
