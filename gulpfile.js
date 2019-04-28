var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
const imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
let cleanCSS = require('gulp-clean-css');
var sqwish = require('gulp-sqwish');

gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('css', function(done) {
    gulp.src('./css/*.css')
    .pipe(uglifycss({
        "uglyComments": true
    }))
    .pipe(gulp.dest('./style/'));
    done();
});

//minify css

gulp.task('sqwish', function () {
    return gulp.src('./css/**/*.css')
      .pipe(sqwish())
      .pipe(gulp.dest('./css'));
  });


gulp.task('minify-css', () => {
    return gulp.src('style/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('./'));
  });

/*

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})
*/
gulp.task('browser-sync', function() {
    browserSync.init(['css/**.css'], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', () =>
    gulp.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./minified/images'))

        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
);

gulp.task('default', ['sass', 'browser-sync', 'minify-css','sqwish'], function () {
    gulp.watch("sass/*.scss", ['sass']);
});
