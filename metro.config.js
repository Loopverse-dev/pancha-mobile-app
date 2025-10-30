const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure Firebase uses React Native builds
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
