import "core-js/modules/es.object.from-entries";
import { Configuration, EnvironmentPlugin } from "webpack";
import { resolve } from "path";
import { sync } from "glob";
import { smart } from "webpack-merge";
import developmentConfig from "./webpack.development.config";
import productionConfig from "./webpack.production.config";

const entryPointSources: string[] = sync("src/main/entrypoints/**/*.ts");

const isDevelopment = process.env.NODE_ENV === "development";

const config = isDevelopment ? developmentConfig : productionConfig;

const base: Configuration = {
  entry: Object.fromEntries(
    entryPointSources.map((srcFile) => {
      const destFile = srcFile
        .replace(/^src\/main\/entrypoints/, ".")
        .replace(/\.ts$/, ".js");

      return [destFile, `./${srcFile}`];
    })
  ),
  output: {
    filename: "[name]-[hash].js",
    path: resolve(__dirname, "../public/assets"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  plugins: [new EnvironmentPlugin(["NODE_ENV"])],
};

export default smart(base, config);
