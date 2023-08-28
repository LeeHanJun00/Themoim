const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const target = 'http://localhost:4000';

module.exports = {
  devServer: {
    port: 8001,
    proxy: {
      '^/auth': {
        target,
        changeOrigin: true
      }
    }
  }
};