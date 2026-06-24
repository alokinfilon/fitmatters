const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
transformer: {
    // Add this line to enable require.context
    unstable_allowRequireContext: true, 
  },

};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
