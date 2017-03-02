/**
 * Created by Loki.Luo on 2017/3/1.
 */
var gulp = require('gulp'),
    //browserify = require('gulp-browserify');
    browserify = require('browserify');
    source = require('vinyl-source-stream');
    buffer = require('vinyl-buffer');
    uglify = require('gulp-uglify');
    sourcemaps = require('gulp-sourcemaps');
    gutil = require('gulp-util');
var destPath = './build';
//gulp.task('packer', function() {
//    // Single entry point to browserify
//    gulp.src('src/**/index.js')
//        .pipe(browserify({
//            insertGlobals : true
//        }))
//        .pipe(gulp.dest('./build/js'))
//});


gulp.task("packer",function(){
    return gulp.src([
        "src/asyn-load/**/*.js",
        "src/model/**/*.js"
    ])
        //.pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(concat("main.js"))
        //.pipe(gulp.dest(temPath))
        //
        //.pipe(uglify({mangle   : true}))
        //.pipe(rename({suffix:'.min'}))
        //.pipe(rev())
        //.pipe(sourcemaps.write('./'))
        //.pipe(gulp.dest(destPath+'/main'))
        //
        //.pipe(rev.manifest(destPath+'/rev-manifest.json',{base: process.cwd()+destPath,merge: true}))
        .pipe(gulp.dest(destPath+'/js'))

});


//gulp.task('packer', function () {
//    // 在一个基础的 task 中创建一个 browserify 实例
//    var b = browserify({
//        entries: 'src/**/index.js',
//        debug: true
//    });
//
//    return b.bundle()
//        .pipe(source('index.js'))
//        .pipe(buffer())
//        .pipe(sourcemaps.init({loadMaps: true}))
//        // 在这里将转换任务加入管道
//        .pipe(uglify())
//        .on('error', gutil.log)
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('./build/js/'));
//});