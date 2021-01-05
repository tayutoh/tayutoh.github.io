var gulp = require("gulp");
var webserver = require("gulp-webserver");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

// ローカルサーバ
gulp.task("webserver", function(){
  return gulp.src("docs")
    .pipe(webserver({
      port: 3030,
      livereload: true,
      open: true
    }));
});

// Sass自動コンパイル
gulp.task("sass:compile", function(){
  return gulp.src("./docs/sass/*.scss")
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./docs/css"))
})

// Sass自動監視
gulp.task("sass:watch", function(){
  gulp.watch("./docs/sass/*.scss", gulp.task("sass:compile"));
})

gulp.task('watch', gulp.task("sass:compile"), function(){
  gulp.watch("./docs/sass/*.scss", gulp.task("sass:compile"));
});

// npx gulp
// exports.default = gulp.series(
//   webserver
// )
gulp.task("default", gulp.task("webserver"));
