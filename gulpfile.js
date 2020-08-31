'use strict'

let gulp = require('gulp'); 
let sass = require('gulp-sass');
let browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');    

gulp.task('sass', async function(){
    gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});
gulp.task('sass:watch', function(){
    gulp.watch('./css/*.scss', gulp.series('sass'));
});
gulp.task('browser-sync', function(){
    let files = ['./*.html','./css/*.css', './images/*.{png, jpg, gif}', './js/*.js'];
    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});
gulp.task('default', gulp.parallel('browser-sync','sass:watch'));

gulp.task('clean', function(){
    return del(['dist']);
});

gulp.task('copyfonts', function(){
    return gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*')
        .pipe(gulp.dest('dist/fonts'));
})

gulp.task('imagemin', function() {
    return gulp.src('./images/*.{png,jpg, jpeg, gif}')
                .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
                .pipe(gulp.dest('dist/images'));
});

gulp.task('usemin', function(){
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream.pipe(usemin({
            css: [rev()],
            html: [function() { return htmlmin({collapseWhitespace: true})}],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), 'concat']
        }));
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build',gulp.series(['clean'], gulp.parallel('copyfonts','imagemin','usemin')));



    //github
// var gulp        = require('gulp');
// var browserSync = require('browser-sync').create();
// var sass        = require('gulp-sass');

// // Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//     return gulp.src(['./node_modules/bootstrap/scss/bootstrap.scss', './css/*.scss'])
//         .pipe(sass())
//         .pipe(gulp.dest("./css"))
//         .pipe(browserSync.stream());
// });

// // Move the javascript files into our /src/js folder
// gulp.task('js', function() {
//     return gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.min.js', './node_modules/jquery/dist/jquery.min.js', './node_modules/popper.js/dist/umd/popper.min.js'])
//         .pipe(gulp.dest("./js"))
//         .pipe(browserSync.stream());
// });

// // Static Server + watching scss/html files
// gulp.task('serve', gulp.series('sass', function() {

//     browserSync.init({
//         server: "./"  
//     });

//     gulp.watch(['./node_modules/bootstrap/scss/bootstrap.scss', './css/*.scss'], gulp.series('sass'));
//     gulp.watch("./*.html").on('change', browserSync.reload);
// }));

// gulp.task('default', gulp.parallel('js','serve'));
