let externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'axios': 'axios',
  'vue-i18n': 'VueI18n',
  'nprogress': 'NProgress',
  'screenfull': 'screenfull',
  'element-ui': 'ELEMENT',
  '@antv/g2': 'G2'
}
const cdn = {
  css: [],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/element-ui@2/lib/index.min.js',
    'https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
    'https://cdn.jsdelivr.net/npm/vue-i18n@8/dist/vue-i18n.min.js',
    'https://cdn.jsdelivr.net/npm/screenfull@4/dist/screenfull.min.js',
    'https://cdn.jsdelivr.net/npm/@antv/g2@3/dist/g2.min.js'
  ]
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: './docs',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  lintOnSave: false,
  devServer: {
    port: 8081,
    proxy: {
      '/': {
        target: 'http://192.168.1.184:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals(externals)//忽略打包
      config.plugin('html').tap(args => {
        args[0].cdn = cdn;
        return args
      })
    }
  }
}
