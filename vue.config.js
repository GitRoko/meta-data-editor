const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/meta-data-editor/',
  transpileDependencies: [
    'vuetify'
  ]
})
