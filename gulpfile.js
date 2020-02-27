var gulp = require("gulp");
var bs = require("browser-sync").create();
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");

gulp.task("sass", function() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./public/css"))
    .pipe(bs.stream());
});

gulp.task("js", function() {
  return gulp
    .src("src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("public/js"))
    .pipe(bs.stream());
});

gulp.task("serve", function() {
  bs.init({
    server: {
      baseDir: "./public"
    }
  });

  gulp.watch("src/scss/*.scss", gulp.series("sass"));
  gulp.watch("src/js/*.js", gulp.series("js"));
  gulp.watch("public/*.html").on("change", bs.reload);
});

gulp.task("default", gulp.series("sass", "js", "serve"));
