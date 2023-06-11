module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      "module:react-native-dotenv",
      {
        envName: "development",
        moduleName: "@env",
        path: ".env"
      }
    ]
  ]
};
