"use strict";

module.exports = () => {
    /**
     * Formats an error list for tv4 into something a tiny bit more
     * readable in the log.
     *
     * @param {Array.<Error>} errorList
     * @param {string} indent
     * @return {string}
     */
    function formatList(errorList, indent) {
        var messageList;

        indent = indent || "";
        messageList = [];

        errorList.forEach((error) => {
            messageList.push(`${indent}${error.message} AT ${error.dataPath} FOR RULE ${error.schemaPath}`);

            if (error.subErrors) {
                messageList.push(formatList(error.subErrors, `${indent}  `));
            }
        });

        return messageList.join("\n");
    }

    return formatList;
};
