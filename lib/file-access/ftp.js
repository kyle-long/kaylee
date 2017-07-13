"use strict";

module.exports = (ftp) => {
    class FtpAccess {
        /**
         * @param {Uri} uri
         */
        constructor(uri) {
            this.uri = uri;
        }
    }

    return FtpAccess;
};
