/**
 * Created by Loki.Luo on 2017/3/30.
 */
var gulp = require('gulp'),
    // rjs = require('gulp-requirejs'),
    rjs = require('gulp-requirejs-optimize'),
    config = require('../config');// gulp公共配置

exports.task = function () {
    return gulp.src([config.root+'/require.config.js'])
        .pipe(rjs({
            baseUrl: config.root,
            paths: {
                'asynLoad':'0-asyn-load/asyn-load',
                // 'format':'format-transfrom/format-transfrom'
                // common: '../common-script',
                // templates:'../../templates',
                // data:'../../data',
                // component:'../../component'
            },
            mainConfigFile: config.root+'/require.config.js',
            optimize: 'none',

            include: [
                'asynLoad',
                'format'
            ]

        }))
        .pipe(gulp.dest(config.output));

};