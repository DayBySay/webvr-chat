var gulp = require("gulp");
var uglify = require("gulp-uglify");
var browserify = require("browserify");
var source = require("vinyl-source-stream");

gulp.task("js", function () {
    gulp.src(["src/**/*.js", "!public_html/js/min/**/*.js"]).pipe(uglify()).pipe(gulp.dest("public_html/js/min"));
});

gulp.task("browserify", function () {
    return browserify("./src/main.js")
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("public_html/js"));
});

gulp.task("watch", function () {
    gulp.watch(["./src/main.js"], ["browserify"])
});
