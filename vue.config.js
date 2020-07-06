const webpack = require('webpack');
module.exports = {
  publicPath: './',
  outputDir: './dist',
  configureWebpack: {
    resolve: {
      alias: {
        '@view': './views'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false
}
