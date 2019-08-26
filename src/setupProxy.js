const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', {
        target: 'https://moment.douban.com',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }))
};