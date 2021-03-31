const { src, dest, watch, series, parallel } = require("gulp");
const fileInclude = require("gulp-file-include");
const sourcemaps = require("gulp-sourcemaps");
const csso = require("gulp-csso");
const prefix = require("gulp-autoprefixer");
const jsmin = require("gulp-jsmin");
const babel = require("gulp-babel");
const newer = require("gulp-newer");
const imgmin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

const html = function () {
    return src("src/**/*.html")
        .pipe(fileInclude({ prefix: "@@" }))
        .pipe(dest("dist/"))
        .pipe(browserSync.stream());
}

const styles = function () {
    return src("src/css/*")
        .pipe(sourcemaps.init())
        .pipe(csso())
        .pipe(prefix())
        .pipe(sourcemaps.write("."))
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream());
}

const scripts = function () {
    return src("src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(jsmin())
        .pipe(sourcemaps.write("."))
        .pipe(dest("dist/js/"))
        .pipe(browserSync.stream());
}

const img = function () {
    return src("src/images/**/*")
        .pipe(newer("dist/images/"))
        .pipe(imgmin())
        .pipe(dest("dist/images/"))
        .pipe(browserSync.stream());
}

const server = function (cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        open: true,
    });
    cb();
}

const observe = function (cb) {
    watch("src/**/*.html", { usePolling: true }, html)
    watch("src/css/*", { usePolling: true }, styles);
    watch("src/js/*.js", { usePolling: true }, scripts);
    cb();
}

exports.default = series(html, styles, scripts, img);
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.img = img;
exports.watch = parallel(server, observe);