module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {

          hack: `true; @import "/src/style/vant-ui.less";`,
        }
      }
    }
  }
}
