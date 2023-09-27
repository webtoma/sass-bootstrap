const { src, dest, series, watch }  = require('gulp');
const babel                         = require('gulp-babel');
const uglify                        = require('gulp-uglify');
const rename                        = require('gulp-rename');
const sass                          = require('gulp-sass')(require('sass'));
const browserSync                   = require('browser-sync').create();

function cleanJS(){
  return src('src/js/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('public/js/'));
}
function cleanHTML(){
  return src('src/*.html')
        .pipe(dest('public/'));
}
function cleanCSS(){
  return src('src/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(dest('public/css/'))
        .pipe(browserSync.stream());
}
function build(cb) {
  cb();
}

exports.build = build;                    // export task so it can be used outside
exports.default = series(cleanJS, cleanCSS, cleanHTML, build);   // Run 2 tasks in series