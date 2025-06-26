const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, 'cjs'];
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
