#!/usr/bin/env node
"use strict";

var args, container, helpMessage, neodoc;

container = require("../lib/container")();
neodoc = require("neodoc");

helpMessage = `
    Usage:
        kaylee <configPath>

    Arguments:
        <configPath>    The path to the config file you wish to use when executing kaylee.
`;

args = neodoc.run(helpMessage);
container.register("configPath", args["<configPath>"]);

container.callAsync((config) => {
    console.log(config);
}).then(() => {
    console.log("success");
}, (err) => {
    console.log("bad");
    console.log(err);
});
