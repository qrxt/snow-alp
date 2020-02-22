"use strict";

const gulp = require("gulp");

const serverCreator = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");

const babel = require("gulp-babel");
// const terser = require("gulp-terser");
const concat = require("gulp-concat");

const scss = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");

const rename = require("gulp-rename");
const del = require("del");

const cheerio = require("gulp-cheerio");
const svgstore = require("gulp-svgstore");

const imagemin = require("gulp-imagemin");

const server = serverCreator.create();

gulp.task("server", () => {
  server.init({
    server: "dist/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(
    "src/scss/**/*.{scss,sass}",
    gulp.series("scss")
  );

  gulp.watch(
    "src/js/*.js",
    gulp.series(
      "js",
      "copy",
      "refresh"
    )
  );

  gulp.watch(
    "src/*.html",
    gulp.series(
      "html",
      "refresh"
    )
  );

  gulp.watch(
    ["src/img/icon-*.svg", "src/img/logo-*.svg"],
    gulp.series(
      "sprite",
      "html",
      "refresh"
    )
  );

  gulp.watch(
    "src/img/*.{png,jpg}",
    gulp.series(
      "images",
      "refresh"
    )
  );

  gulp.watch(
    "src/fonts/*.{woff,woff2}",
    gulp.series(
      "copy",
      "refresh"
    )
  );
});

gulp.task("images", () =>
  gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("dist/img"))
);

gulp.task("js", () =>
  gulp.src("src/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel()
    )
    //.pipe(terser())
    .pipe(concat("index.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"))
);

gulp.task("html", () =>
  gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
);

gulp.task("scss", () =>
  gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(scss())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(server.stream())
);

gulp.task("sprite", () =>
  gulp.src([
    "source/img/icon-*.svg",
    "source/img/logo-*.svg"
  ])
    .pipe(cheerio({
      run: $ => {
        $("[fill]").removeAttr("fill");
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("dist/img"))
);

gulp.task("copy", () =>
  gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
    "source/js/**",
    "source//*.ico"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("dist"))
);

gulp.task("refresh", done => {
  server.reload();
  done();
});

gulp.task("clean", () => del("dist"))

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "scss",
  "sprite",
  "images",
  "html",
  "js"
));
gulp.task("start", gulp.series("build", "server"));
