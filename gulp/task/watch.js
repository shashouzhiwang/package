/**
 * Created by Loki.Luo on 2017/3/2.
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sync = require('browser-sync');
    config = require('../config');

exports.task = function () {
    sync({
        server: {
            baseDir: "./"
        },
        open: false,
        port:8087
    });
    gulp.watch(config.root+'/**/*.*',['default',sync.reload])
};
