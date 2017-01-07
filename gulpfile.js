var gulp = require("gulp");
var uglify = require("gulp-uglify");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

gulp.task("browserify", function () {
    return browserify("./src/main.js")
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("public_html/js"));
});

gulp.task("watch", function () {
    gulp.watch(["./src/main.js"], ["browserify"])
});
