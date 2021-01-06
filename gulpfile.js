const gulp = require("gulp");
const webserver = require("gulp-webserver");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

// 画像圧縮
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");

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

// 画像圧縮
gulp.task("img", function() {
  return gulp
    .src("./docs/oriImage/*.{png,jpg}")
    .pipe(changed("image"))
    .pipe(
      imagemin([
        pngquant({
          quality: [.7, .85],
          speed: 1
        }),
        mozjpeg({
          quality: 85,
          progressive: true
        })
      ])
    )
    .pipe(gulp.dest("./docs/image/"));
});

gulp.task('watch', gulp.task("sass:compile"), function(){
  gulp.watch("./docs/sass/*.scss", gulp.task("sass:compile"));
});

// npx gulp
// exports.default = gulp.series(
//   webserver
// )
gulp.task("default", gulp.task("webserver"));
