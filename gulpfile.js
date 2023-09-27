const { src, dest, series } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

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
function sass2css(){
  
}
function build(cb) {
  cb();
}

exports.build = build;                    // export task so it can be used outside
exports.default = series(cleanJS, cleanHTML, build);   // Run 2 tasks in series