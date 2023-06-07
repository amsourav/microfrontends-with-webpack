const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const pkg = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    allowedHosts: "all",
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared: pkg.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
