"use strict";

/**
 * This is a bit of an odd module. A couple important things to keep in mind.
 *
 * 1. The container caches this. This thing only needs to run once. Running multiple
 * times wont hurt anything, but it will be inefficient.
 * 2. This returns a promise. The promise will either be rejected or resolve with
 * an object with IS the config file. Make sure to use Dizzy's `callAsync` otherwise
 * you will get a promise injected instead of the resolve value.
 *
 * @param {string} configPath
 * @param {fsAsync} fsAsync
 * @param {tv4} tv4
 * @param {yaml} yaml
 * @return {Promise.<Object>}
 */
module.exports = (configPath, fsAsync, tv4, yaml) => {
    return tv4.loadSchemaFolderAsync(`${__dirname}/../schema`).then(() => {
        return fsAsync.readFileAsync(configPath).then((content) => {
            var config;

            config = yaml.safeLoad(content);

            // Will throw an exception if it fails and that will reject the promise.
            tv4.validate("config.json", config);

            return config;
        });
    });
};
