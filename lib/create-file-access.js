"use strict";

module.exports = (logger, Uri, FtpAccess) => {
    /**
     * @param {kaylee~fileAccessConfig} fileAccessConfig
     * @return {Object} - The point is to return an object with the same interface.
     */
    function create(fileAccessConfig) {
        var access, uri;

        uri = new Uri(fileAccessConfig.path);

        if (uri.protocol === "ftp") {
            access = new FtpAccess(uri);
        } else if (uri.protocol === null) {
            // TODO: Local file accessor.
        } else {
            throw new Error(`Unknown protocol ${uri.protocol}.`);
        }

        return access;
    }

    return create;
};
