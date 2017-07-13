#!/usr/bin/env node
"use strict";

var args, container, helpMessage, logger, logLevel, neodoc;

neodoc = require("neodoc");

helpMessage = `
    Usage:
        kaylee <configPath>

    Arguments:
        <configPath>    The path to the config file you wish to use when executing kaylee.

    Options:
        -v, --verbose   Turns on debug logging for troubleshooting.
`;

args = neodoc.run(helpMessage);
logLevel = "info";

if (args["--verbose"] === true) {
    logLevel = "debug";
}

container = require("../lib/container")(logLevel);
container.register("configPath", args["<configPath>"]);
logger = container.resolve("logger");

container.callAsync((manager) => {
    return manager.run();
}).then(() => {
    logger.info("success");
}, (err) => {
    logger.error(err);
});
