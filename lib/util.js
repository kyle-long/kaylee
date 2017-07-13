"use strict";

module.exports = () => {
    /**
     * Corerces the thing provided into a list.
     *
     * @param {*} thing
     * @return {Array}
     */
    function toList(thing) {
        if (typeof thing === "undefined") {
            thing = [];
        } else if (!Array.isArray(thing)) {
            thing = [
                thing
            ];
        }

        return thing;
    }

    return {
        toList
    };
};
