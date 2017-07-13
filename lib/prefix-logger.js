"use strict";

module.exports = (logger) => {
    /**
     * The reason this class exists is so that I can differentiate
     * logs based on which source/destination they are on. For example
     * a log like.
     *
     * "Failed to copy blah.txt to /hello". This almost gives me what
     * I want, except the names could be duplicates and I might not
     * have all that information within a certain context.
     *
     * This is ALMOST not worth it but since I started I am going to
     * finish it.
     */
    class PrefixLogger {
        /**
         * The prefix you want added to the normal log.
         *
         * @param {string} prefix
         */
        constructor(prefix) {
            this.prefix = prefix || "";
        }

        /**
         * Creates a new logger which adds the
         * prefix to the prefix we already had.
         *
         * @param {string} prefix
         * @return {PrefixLogger}
         */
        add(prefix) {
            prefix = this.prefix + prefix;

            return new PrefixLogger(prefix);
        }

        /**
         * @private
         * @return {Array.<Object>}
         */
        createArgs() {
            var args;

            args = Array.prototype.slice.call(arguments);
            args.unshift(this.prefix);

            return args;
        }

        /**
         * Callthrough to the log module.
         */
        debug() {
            var args;

            args = this.createArgs.apply(this, arguments);
            logger.debug.apply(logger, args);
        }

        /**
         * Callthrough to the log module.
         */
        info() {
            var args;

            args = this.createArgs.apply(this, arguments);
            logger.info.apply(logger, args);
        }

        /**
         * Callthrough to the log module.
         */
        warning() {
            var args;

            args = this.createArgs.apply(this, arguments);
            logger.warning.apply(logger, args);
        }

        /**
         * Callthrough to the log module.
         */
        error() {
            var args;

            args = this.createArgs.apply(this, arguments);
            logger.warning.apply(logger, args);
        }
    }

    return PrefixLogger;
};
