module.exports = {
  context: __dirname + "/src",
  entry: {
    javascript: "./main.js",
    html: "./index.html",
  },

  output: {
    filename: "index.js",
    path: __dirname + "/dist",
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"],
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
    ],
  },
}
