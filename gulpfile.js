var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    minify = require('gulp-minify');

gulp.task('pack-js', function () {
    return gulp.src(['assets/js/vendor/*.js', 'assets/js/main.js', 'assets/js/module*.js'])
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('public/build/js'));
});

gulp.task('style', function () {
    return gulp.src('view/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./view/build/css'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    gulp.watch('view/**/*.scss', gulp.series('style'));

    livereload.listen(35729, function (err) {
        if (err) return console.log(err);
    });
});