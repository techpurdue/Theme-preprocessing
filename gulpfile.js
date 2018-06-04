'use strict';

// required modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var kss = require('gulp-kss');
var shell = require('gulp-shell')
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
//var styleguide = require('sc5-styleguide');
//var sassdoc = require('sassdoc');


// ... variables
var input = 'src/sass/**/*.scss';
var output = 'css';
var styleGuidePath = 'style-guide';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

//make the styleguide
gulp.task('kss', shell.task(['./node_modules/.bin/kss --config kss-config.json']));


// sass > css conversion
gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('./'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./css'));
});


// Watch the input folder for change, and run `sass`,  styleguide, and logging
//gulp.task('watch', function() {
//   gulp.watch([ input ], function() {
//    gulp.run('sass');
//    gulp.run('kss');
//    reload();
//  });
//});

//watch input, run kss, sass when something changes
gulp.task('stream', function () {
    // Endless stream mode
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/sass/**/*.scss', ['kss']);
});


// default task is watch
gulp.task('default', ['stream']);

// generate sass documentation
/*
gulp.task('sassdoc', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(sassdoc({
      dest: 'sassdoc'
    }));
});
*/
