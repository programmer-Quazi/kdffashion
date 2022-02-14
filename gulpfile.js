const { src, dest, series, watch, parallel } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const postCSS = require("gulp-postcss");

function sassTask() {
    return src("assets.src/styles/*theme.scss", { sourcemaps: true })
        .pipe(sass())
        .pipe(dest("assets",{ sourcemaps: true }));
}

function postCSSTask() {
    return src("assets/*.css", { sourcemaps: true })
        .pipe(postCSS())
        .pipe(dest("assets",{ sourcemaps: true }));
}

function watchTask() {
    watch("assets.src/styles/**/*.scss", series(sassTask, postCSSTask));
    watch("./**/*.liquid", series(sassTask, postCSSTask));
}

const overallStyleTasks = series(sassTask, postCSSTask);
module.exports.default = series(overallStyleTasks, watchTask);