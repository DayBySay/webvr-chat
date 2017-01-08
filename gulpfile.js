var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var uglify = require("gulp-uglify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

gulp.task("js-dev", function () {
    return browserify({
        entries: "./src/main.js",
        extensions: [".js"]
    })
        .transform(babelify)
        .bundle()
        .on("error", function (err) {
            console.log("error: " + err.message);
            this.emit("end");
        })
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("public_html/js"));
});

gulp.task("js", function () {
    return browserify({
        entries: "./src/main.js",
        extensions: [".js"]
    })
        .transform(babelify)
        .bundle()
        .on("error", function (err) {
            console.log("error: " + err.message);
            this.emit("end");
        })
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("public_html/js"));
});

gulp.task("watch", function () {
    gulp.watch(["./src/*.js"], ["js-dev"])
});
