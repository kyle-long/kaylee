"use strict";

module.exports = (config, PrefixLogger, util) => {
    /**
     * Kicks off the entire process.
     *
     * @return {Promise.<*>}
     */
    function run() {
        var promiseList, sourceList;

        sourceList = util.toList(config.source);
        promiseList = [];

        sourceList.forEach((source) => {
            var logger;

            logger = new PrefixLogger(source.path);

            // TODO: Create source manager.
        });

        return Promise.all(promiseList);
    }

    return {
        run
    };
};
