import { Configuration } from "webpack";
import TerserPlugin from "terser-webpack-plugin";

const config: Configuration = {
  mode: "production",
  devtool: "hidden-source-map",
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        terserOptions: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          compress: { drop_console: true },
        },
      }),
    ],
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
};

export default config;
