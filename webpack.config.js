const path = require("path");
const webpack = require("webpack");
var copyWebpackPlugin = require("copy-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const bundleOutputDir = "./dist";

module.exports = (env) => {
  return [
    {
      entry: "./src/main.js",
      output: {
        filename: "widget.js",
        path: path.resolve(bundleOutputDir),
      },
      devServer: {
        static: bundleOutputDir,
      },
      plugins: [
        new webpack.SourceMapDevToolPlugin(),
        new copyWebpackPlugin({ patterns: [{ from: "demo/" }] }),
      ],
      mode: "none",
      module: {
        rules: [
          {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/env",
                    {
                      targets: {
                        browsers: ["IE 11, last 2 versions"],
                      },
                    },
                  ],
                ],
              },
            },
          },
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [postcssPresetEnv()],
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ];
};
