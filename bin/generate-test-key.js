#!/usr/bin/env node
"use strict";

var container;

container = require("../lib/container")();
container.call((fsAsync, openpgp) => {
    var options;

    options = {
        userIds: [{
            name: "Kaylee Test",
            email: "kaylee@test.com"
        }],

        // Because it's just for testing.
        numBits: 1024,
        passphrase: "test"
    };

    /**
     * Writes to a file and logs the error if one happens.
     *
     * @param {string} fileName
     * @param {string} keyContent
     */
    function handleWrite(fileName, keyContent) {
        fsAsync.writeFileAsync(fileName, keyContent).then(() => {
            console.log(`Successfully wrote ${fileName}`);
        }, (err) => {
            console.log(err);
        });
    }

    openpgp.generateKey(options).then((key) => {
        handleWrite("test-pgp-public", key.publicKeyArmored);
        handleWrite("test-pgp-private", key.privateKeyArmored);
    });
});
