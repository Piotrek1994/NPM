const {src, dest} = require('gulp')

const sass = require('gulp-sass')(require('sass'));

function sassCompiler(done) {
    src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/css'))
    done()
}

exports.default = sassCompiler