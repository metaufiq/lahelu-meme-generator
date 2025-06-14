const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

const defaultConfig = getDefaultConfig(__dirname);

// Merge your custom config with the default one
const mergedConfig = mergeConfig(defaultConfig, config);

// Wrap the merged config with Reanimated's Metro config
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
