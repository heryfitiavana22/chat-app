const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config")
const { makeMetroConfig } = require("@rnx-kit/metro-config")
const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks")

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const config = {
    resolver: {
        resolveRequest: MetroSymlinksResolver(),
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
}

module.exports = mergeConfig(
    getDefaultConfig(__dirname),
    makeMetroConfig(config),
)
