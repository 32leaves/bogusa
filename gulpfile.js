// Gulp itself
var gulp = require('gulp');

// Gulp plumber to prevent pipes from breaking due to errors
var plumber = require('gulp-plumber');

// The Gulp SASS integration for transpiling to CSS
var sass = require('gulp-sass');

// Concatenating files, used for javascript
var concat = require('gulp-concat');

// Renames the file in the pipeline (used in the javascript task to produce a non-minimized and a minimized version)
var rename = require('gulp-rename');

// Uglify integration for minimizing JS
var uglify = require('gulp-uglify');

// Nunjucks template engine used in the html task
var nunjucks = require('gulp-nunjucks');


/**
 * All SASS/CSS stuff
 */
gulp.task('style', function() {
    gulp.src('src/sass/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

/**
 * Javascript stuf including jquery and bootstrap
 */
gulp.task('script', function() {
    gulp.src([ 'bower_components/jquery/dist/jquery.js', 'src/js/*.js' ])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('dist/js'))

        .pipe(rename('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

/**
 * Compiles nunjuck files
 */
gulp.task('html', function() {
    gulp.src([ 'src/*.html' ])
        .pipe(nunjucks())
        .pipe(gulp.dest('dist'));
});

/**
 * Our watcher re-running tasks if needed
 */
gulp.task('watch', function() {
    gulp.watch('src/sass/*.scss', ['style']);
    gulp.watch('src/js/*.js', ['script']);
    gulp.watch('src/**/*.html', ['html']);
});

/**
 * Default task to get it all started
 */
gulp.task('default', ['style', 'script', 'html', 'watch']);
