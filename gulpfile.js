var gulp = require('gulp');
var browserify = require('gulp-browserify');

// Scripts
gulp.task('scripts', function() {
    gulp.src('src/js/app.js')
        .pipe(browserify({
          insertGlobals: false,
          transform: ['reactify']
        }))
        .pipe(gulp.dest('./public'))
});

gulp.watch('src/**/*.js', ['scripts']);