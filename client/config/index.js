'use strict';
const ip = require('ip');
const path = require('path');
module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    host: ip.address(),
    port: 7788,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    index: path.resolve(__dirname, '../../staticFile/admin.html'),
    assetsRoot: path.resolve(__dirname, '../../staticFile'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
