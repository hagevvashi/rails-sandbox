import { Configuration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import StylelintPlugin from "stylelint-webpack-plugin";

const config: Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    devtoolModuleFilenameTemplate: "webpack:///src/[resource-path]",
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "eslint-loader",
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new StylelintPlugin({
      files: "**/*.{ts,tsx}",
    }),
  ],
  devServer: {
    proxy: [
      {
        context: ["**"],
        target: process.env.PROXY_PATH ?? `http://localhost:3000`,
      },
    ],
    publicPath: "/assets/",
    compress: true,
    inline: true,
    hot: true,
    host: "0.0.0.0",
    port: 8080,
    open: true,
  },
};

export default config;
