"use strict";

module.exports = (Log, logLevel) => {
    logLevel = logLevel || "info";

    return new Log(logLevel);
};
