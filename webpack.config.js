module.exports = {
  mode: "development", //doesnt minify
  entry: "./index.js",
  output: {
    filename: "main.js"
  },
  devtool: "source-map"

};

//    .\node_modules\.bin\webpack