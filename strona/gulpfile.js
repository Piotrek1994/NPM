const { src, dest, series } = require('gulp')
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const ugligy = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')

const paths = {
	sass: './src/sass/**/*.scss',
	js: './src/js/**/*.js',
	img: './src/img/*',
	sassDest: './dist/css',
	jsDest: './dist/js',
	imgDest: './dist/img',
}

function sassCompiler(done) {
	src(paths.sass)
    .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({suffix: '.min',}))
        .pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest))
	done()
}

function javaScript(done) {
	src(paths.js)
    .pipe(sourcemaps.init())
		.pipe(babel({presets: ['@babel/env'],}))
		.pipe(ugligy())
		.pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest))

	done()
}

function convertImages(done) {
	src(paths.img)
    .pipe(imagemin())
    .pipe(dest(paths.imgDest))
	done()
}

exports.default = series(sassCompiler, javaScript, convertImages)
