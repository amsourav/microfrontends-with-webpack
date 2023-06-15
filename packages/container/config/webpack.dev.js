const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const pkg = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    allowedHosts: "all",
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: pkg.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
