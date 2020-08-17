var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer   = require('gulp-autoprefixer'),
    nunjucksRender = require('gulp-nunjucks-render'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    pipeline = require('readable-stream').pipeline;

gulp.task('default', ['browser-sync', 'scss', 'njk', 'imgmin', 'js', 'en'], function() {
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/templates/**/*.njk', ['njk']);
    gulp.watch('src/en/templates/**/*.njk', ['en']);
    gulp.watch('src/images/*', ['imgmin']);
    gulp.watch('dist/*.html', browserSync.reload);
    gulp.watch('dist/css/*.css', browserSync.reload);
    gulp.watch('dist/js/*.js', browserSync.reload);

});

gulp.task('browser-sync', function() { /*Автоматическое отражение изменений в браузере*/
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false
    });
});

gulp.task('scss', function() {               /*Компиляция SCSS файла в CSS с browserSync*/
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});
gulp.task('njk', function () {                      //Рендеринг .njk файлолв в html
    return gulp.src(['src/templates/*.njk'])
        .pipe(nunjucksRender({
            path: ['src/templates/']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('en', function () {                      //Рендеринг .njk файлолв EN версии в html
    return gulp.src(['src/en/templates/*.njk'])
        .pipe(nunjucksRender({
            path: ['src/en/templates/']
        }))
        .pipe(gulp.dest('dist/en'));
});

gulp.task('imgmin', function() {                    //Минификация картинок
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'))
});

gulp.task('build', ['imgmin', 'scss'], function() { //Рендеринг проекта для продакшена
    gulp.src([
        'src/css/main.css',
    ]).pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
    gulp.src([
        'node_modules/@fortawesome/fontawesome-free/webfonts/*',
    ]).pipe(gulp.dest('dist/fonts'));
});



