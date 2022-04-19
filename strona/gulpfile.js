const {src, dest} = require('gulp')
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')

const sass = require('gulp-sass')(require('sass'));

function sassCompiler(done) {
    src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(autoprefixer())
    .pipe(dest('./dist/css'))
    done()
}

exports.default = sassCompiler