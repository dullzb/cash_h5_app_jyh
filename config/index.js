// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 80,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
   /* proxyTable: {
      '/cas':{
        // target: "http://lj.chuangke51.com:5555", //
        // target: "http://47.96.167.201:80", //
        target: "http://hhsj.gzlixing233.com", //
        // target: "http://lj.chuangke51.com:5555", //
        // target: "http://192.168.6.3:5555", //
        changeOrigin:true,
        pathRewrite:{
          '^/cas':'/cas'
        }
      },
      '/pos':{
        // target: "http://lj.chuangke51.com:5555", //
        // target: "http://47.96.167.201:80", //
        target: "http://hhsj.gzlixing233.com", //
        // target: "http://lj.chuangke51.com:5555", //
        // target: "http://192.168.6.3:5555", //
        changeOrigin:true,
        pathRewrite:{
          '^/pos':'/pos'
        }
      },
      '/interfacePlatform':{
        // target: "http://lj.chuangke51.com:5555", // 测试地址
        // target: "http://47.96.167.201:80", // 测试地址
        target: "http://hhsj.gzlixing233.com", // 测试地址
        // target: "http://lj.chuangke51.com:5555", // 测试地址
        // target: "http://192.168.6.3:5555", // 测试地址
        changeOrigin:true,
        pathRewrite:{
          '^/interfacePlatform':'/interfacePlatform'
        }
      },
      '/moxie':{
        target: "http://hhsj.gzlixing233.com", // 测试地址
        // target: "http://47.96.167.201:80", // 测试地址
        // target: "https://api.finchsys.com/", // 测试地址
        // target: "http://lj.chuangke51.com:5555", // 测试地址
        // target: "http://192.168.6.3:5555", // 测试地址
        changeOrigin:true,
        pathRewrite:{
          '^/moxie':'/moxie'
        }
      }
    },*/
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
