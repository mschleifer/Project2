var gulp = require('gulp');
var sass = require('gulp-sass');
var panini = require('panini');
var browser = require('browser-sync');

gulp.task('styles', function () {
    return gulp.src('src/styles/app.scss')
        .pipe(sass({includePaths: './node_modules/'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/assets/'));
});

gulp.task('scripts', function () {
    return gulp.src('src/scripts/app.js')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('scripts-vendor', function () {
    return gulp.src('node_modules/material-components-web/dist/material-components-web.js')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('images', function () {
    return gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('build', gulp.parallel(
    pages,
    'styles',
    'scripts',
    'scripts-vendor',
    'images'
));

gulp.task('default', gulp.series('build', server));

function pages() {
    return gulp.src('src/pages/**/*.html')
        .pipe(panini({
            root: 'src/pages/',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            helpers: 'src/helpers/',
            data: 'src/data/'
        }))
        .pipe(gulp.dest('dist'));
    done();
}

function resetPages(done) {
    panini.refresh();
    done();
}

function reloadBrowser(done) {
    browser.reload();
    done();
}

function server(done) {
    browser.init({
        server: 'dist', port: 8080, browser: 'chrome'
    });
    done();
}

gulp.watch('./src/{pages,layouts,partials,helpers,data}/**/*').on('all', gulp.series(resetPages, pages, reloadBrowser));
gulp.watch('./src/styles').on('all', gulp.series('styles', reloadBrowser));