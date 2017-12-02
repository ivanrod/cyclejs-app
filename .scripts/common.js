import path from "path"
console.log(path.resolve(__dirname, "../src/utils/"))
export const config = {
  entry: ["./src/"],
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "../src/utils/")
    }
  }
}
