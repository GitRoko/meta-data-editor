const { defineConfig } = require('@vue/cli-service');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: [
    'vuetify'
  ],
  css: {
      extract: false,
  },
  configureWebpack: {
    optimization: {
      splitChunks: false // makes there only be 1 js file - leftover from earlier attempts but doesn't hurt
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'meta-editor.html', // the output file name that will be created
        template: 'src/output-template.html', // this is important - a template file to use for insertion
        inlineSource: '.(js|css)$', // embed all javascript and css inline
        inject: 'body', // add js inside body, not head
      }),
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
    ]
  }
})
