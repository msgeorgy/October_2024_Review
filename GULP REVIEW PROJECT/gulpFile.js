var gulp = require('gulp');

let livereload = require('gulp-livereload');

let BrowserSync = require('browser-sync').create();

let plugins = require('gulp-load-plugins')();

plugins.replace = require('gulp-replace');

plugins.corrector = require('gulp-line-ending-corrector')

var pug = require('gulp-pug');

var sass = require('gulp-sass')(require('sass'));

var concat = require('gulp-concat');

var cached = require('gulp-cached');

var jshint = require('gulp-jshint');

var sourcemaps = require('gulp-sourcemaps');

let uglify = require('gulp-uglify');

let plumber = require('gulp-plumber');

let cleanCSS = require('gulp-clean-css');

let rename = require('gulp-rename');

let corrector = require('gulp-line-ending-corrector');

let notify = require('gulp-notify');

//let zippit = require('gulp-zip');

gulp.task('html', function() {

    return  gulp.src(['./BASE-SIDE/*.pug', '!./BASE-SIDE/gallery.pug'])
            .pipe(plumber())
            .pipe(pug({pretty: true}))
            .pipe(gulp.dest('./DIST/HTML/'))
            .pipe(notify())
            .pipe(BrowserSync.stream())

})

gulp.task('sass', function() {

    return  gulp.src('./BASE-SIDE/*.scss')
            .pipe(plumber())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(gulp.dest('./BASE-TO-DIST/Compiled CSS/'))
            .pipe(notify())
            .pipe(BrowserSync.stream())

})

gulp.task('css', function() {

    return  gulp.src('./BASE-TO-DIST/Compiled CSS/*.css')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(concat('final.css'))
            .pipe(cleanCSS())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('./DIST/CSS/'))
            .pipe(notify())
            .pipe(BrowserSync.stream())

})

gulp.task('js', function() {

    return  gulp.src('./BASE-SIDE/*.js')
            .pipe(plumber())
            .pipe(concat('final.js'))
            .pipe(cached('linting'))
            .pipe(jshint())
            .pipe(jshint.reporter())
            .pipe(uglify())
            .pipe(gulp.dest('./DIST/JS/'))
            .pipe(notify())
            .pipe(BrowserSync.stream())

})

gulp.task('naming', function() {

    return  gulp.src('./BASE-SIDE/EXTRAS.txt')
            .pipe(rename((text)=> {
                text.dirname= '/MD/'
                text.basename = 'MD_EXTRAS',
                text.extname = '.md'
            }))
            .pipe(gulp.dest('./DIST/FOLDERS'))
            .pipe(notify())
            .pipe(BrowserSync.stream())

})

gulp.task('rename', function() {

    return  gulp.src('./BASE-SIDE/EXTRAS.txt')
            .pipe(rename({prefix: 'NEW_', basename: 'EXETENSE', suffix: '_CLIENT', extname: '.md'}))
            .pipe(gulp.dest('./DIST/FOLDERS'))
            .pipe(notify())
            .pipe(BrowserSync.stream())

})

gulp.task('replace', function() {

    return  gulp.src('./BASE-SIDE/EXTRAS.txt')
            .pipe(plugins.replace('MSG', 'Mena Saleeb Georgy Theophilous'))
            .pipe(plugins.corrector({verbose: true, eolc: 'CRLF'}))
            .pipe(gulp.dest('./DIST/FOLDERS'))
            .pipe(notify())

})

// gulp.task('zipper', function() {

//     return  gulp.src('./DIST/**/*.*')
//             .pipe(plumber())
//             .pipe(zippit('folded.zip'))
//             .pipe(gulp.dest('./DIST/ZIP/'))
//             .pipe(notify('Zipped Version is available'))

// })

gulp.task('browser', function() {

    BrowserSync.init({
        // server: {
        //     baseDir: './'
        // }
        proxy: '.',
        watch: true,
        open: false,
        browser: 'chrome',
        injectChanges: true,
    })

})

gulp.task('watch', function() {
    //require('./server.js')
    //livereload.listen()
    BrowserSync.reload
    gulp.watch(['./BASE-SIDE/*.pug', '!./BASE-SIDE/gallery.pug'], gulp.series(['html']))
    gulp.watch(['./BASE-SIDE/*.scss'], gulp.series(['sass']))
    gulp.watch(['./BASE-TO-DIST/Compiled CSS/*.css'], gulp.series(['css']))
    gulp.watch(['./BASE-SIDE/*.js'], gulp.series(['js']))
    gulp.watch(['./BASE-SIDE/EXTRAS.txt'], gulp.series(['naming']))
    gulp.watch(['./BASE-SIDE/EXTRAS.txt'], gulp.series(['rename']))

})

gulp.task('default', gulp.parallel(['html', 'css', 'js']))