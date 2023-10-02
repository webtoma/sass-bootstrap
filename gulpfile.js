const { src, dest, series, watch }  = require('gulp');
const babel                         = require('gulp-babel');
const uglify                        = require('gulp-uglify');
const rename                        = require('gulp-rename');
const sass                          = require('gulp-sass')(require('sass'));
const browserSync                   = require('browser-sync').create();
const clean                         = require('gulp-clean');

function process_JS(){
  return src('src/js/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('backup/js/'))
        .pipe(dest('public/js/'))
        .pipe(browserSync.stream());
}
function process_HTML(){
  return src('src/*.html')
        .pipe(dest('public/'))
        .pipe(dest('backup/'))
        .pipe(browserSync.stream());;
}
function process_CSS(){
  return src('src/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('backup/css/'))
        .pipe(dest('public/css/'))
        .pipe(browserSync.stream());
}
function clean_All(){
  return src('public/*')
          .pipe(clean());
}
function clean_JS(){
  return src('public/js/*')
          .pipe(clean());
}
function clean_CSS(){
  return src('public/css/*')
          .pipe(clean());
}
function clean_HTML(){
  return src('public/*.html')
          .pipe(clean());
}

function watchFiles(){
  browserSync.init({
    server: "./public/"
  });
  watch('src/js/*.js', series(clean_JS, process_JS)).on('change', browserSync.reload);
  watch('src/scss/*.scss', series(clean_CSS, process_CSS)).on('change', browserSync.reload);
  watch('src/*.html', series(clean_HTML, process_HTML)).on('change', browserSync.reload);
}

// export task so it can be used outside
exports.default = series(clean_All, process_JS, process_CSS, process_HTML);   // Run 2 tasks in series
exports.watch = watchFiles;               // Run watchFiles task