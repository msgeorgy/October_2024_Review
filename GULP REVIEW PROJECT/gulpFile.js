let GULP = require('gulp');

let CONC = require('gulp-concat');

let SASS = require('gulp-sass')(require('sass'));

let LIVE = require('gulp-livereload');

let SOURCE = require('gulp-sourcemaps');

let PUG = require('gulp-pug');

GULP.task('unite-js', function() {

    return  GULP.src('BASE-SIDE/*.js')
            .pipe(SOURCE.init())
            .pipe(CONC('final.js'))
            .pipe(SOURCE.write('.'))
            .pipe(GULP.dest('DIST/JS/'))
            .pipe(LIVE())

})

GULP.task('sass', function() {
    
    return  GULP.src('BASE-SIDE/*.scss')
            .pipe(SOURCE.init())
            .pipe(SASS())
            .pipe(SOURCE.write('.'))
            .pipe(GULP.dest('BASE-TO-DIST/COMPILED CSS/'))
            .pipe(LIVE())

})

GULP.task('unite-css', function() {
    
    return  GULP.src('BASE-TO-DIST/COMPILED CSS/*.css')
            .pipe(SOURCE.init())    
            .pipe(CONC('final.css'))
            .pipe(SOURCE.write('.'))
            .pipe(GULP.dest('DIST/CSS/'))
            .pipe(LIVE())

})

GULP.task('pugify', function() {
    return  GULP.src('BASE-SIDE/*.pug')
            .pipe(SOURCE.init())
            .pipe(PUG({pretty: true}))
            .pipe(SOURCE.write('.'))
            .pipe(GULP.dest('DIST/HTML/'))
            .pipe(LIVE())

})

GULP.task('watch', function() {
    //require('./server.js');
    LIVE.listen()
    GULP.watch('BASE-SIDE/*.pug', GULP.series('pugify'))
    GULP.watch('BASE-SIDE/*.js', GULP.series('unite-js'))
    GULP.watch('BASE-SIDE/*.scss', GULP.series('sass'))
    GULP.watch('BASE-TO-DIST/COMPILED CSS/*.css', GULP.series('unite-css'))
})