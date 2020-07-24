const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const acss = require('gulp-atomizer');
const image = require('gulp-image');

//compile scss into css
function compileSass() {
    console.log("compiling sass");
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
}

//compile atomic css
function compileAtomicCSS() {
    console.log("compiling atomic css");
    return gulp.src("./src/templates/*.html")
        .pipe(acss({
            outfile: 'atomic.css',
            acssConfig: {
                'breakPoints': {
                    'sm': '@media screen and (min-width: 576px)',
                    'md': '@media screen and (min-width: 768px)',
                    'lg': '@media screen and (min-width: 992px)',
                    'xl': '@media screen and (min-width: 1200px)'
                }
            }
        }))
        .pipe(gulp.dest("./src/css"));
}

function live_server() {
    browserSync.init({
        server: {
            index: "./src/templates/index.html"
        },
        notify: false
    });
    gulp.watch('./src/scss/**/*.scss').on('change', () => {
        compileSass();
        browserSync.reload();
    });
    gulp.watch('./src/templates/**/*.html').on('change', () => {
        compileAtomicCSS();
        browserSync.reload();
    });
    gulp.watch('./src/js/**/*.js').on('change', () => {
        browserSync.reload();
    });
}

function copy_images () {
    return gulp.src('./src/img/*').
    pipe(image()).
    pipe(gulp.dest('./dist/src/img'));
}

function copy_css () {
    return gulp.src('./src/css/*').pipe(gulp.dest('./dist/src/css'));
}

function copy_html () {
    return gulp.src('./src/templates/*').pipe(gulp.dest('./dist/src/templates'));
}

exports.live_server = live_server;
exports.build = gulp.series(
    gulp.parallel(compileSass, compileAtomicCSS),
    gulp.parallel(copy_images, copy_css, copy_html)
);