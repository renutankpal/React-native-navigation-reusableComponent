module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'], 
  plugins: [["@babel/plugin-transform-private-methods", { "loose": true }]]
};
