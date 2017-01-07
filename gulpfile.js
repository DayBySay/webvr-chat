var gulp = require("gulp");
var uglify = require("gulp-uglify");

gulp.task("js", function () {
    gulp.src(["src/**/*.js", "!public_html/js/min/**/*.js"]).pipe(uglify()).pipe(gulp.dest("public_html/js/min"));
});
