const { series } = require('gulp');

function clean(cb){
  return src('src/js/*.js')
        .pipe(dest('public/js/'));
}
function build(cb) {
  cb();
}

exports.build = build;                    // export task so it can be used outside
exports.default = series(clean, build);   // Run 2 tasks in series