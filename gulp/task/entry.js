/**
 * Created by Loki.Luo on 2017/3/31.
 */
var gulp = require('gulp'),
    // rjs = require('gulp-requirejs'),
    rjs = require('gulp-requirejs-optimize'),
    config = require('../config');// gulp公共配置

exports.task = function () {
    return gulp.src([config.root+'/**/test.js',config.root+'/require.config.js'])
        .pipe(gulp.dest(config.output));

};