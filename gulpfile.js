const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const acss = require('gulp-atomizer');

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

exports.live_server = live_server;