var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var data = require('gulp-data');
var fs = require('fs');
var gutil = require('gulp-util');
var handlebars = require('gulp-compile-handlebars');
var minify = require('gulp-clean-css');
var path = require('path');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var extend = require('extend');
var clean = require('gulp-clean');
var merge = require('gulp-merge');

module.exports = function (gulp, config) {

    config = extend(true, {
        language: "en",
        languages: [],
        dirs: {
            dist: "./dist",
            src: "./src",
            scss: "./scss",
        },
        handlebars: {
            helpers: {}
        },
    }, config);

    gutil.log("Config", gutil.colors.magenta(JSON.stringify(config)))

    gulp.task('default', ['serve']);

    gulp.task('serve', ['build'], function () {

        browserSync.init({
            server: config.dirs.dist,
            notify: false,
            reloadOnRestart: true,
            open: false,
            online: false,
            logLevel: 'info',
            ui: false,
        });

        gulp.watch([path.join(config.dirs.scss, '**/*.scss')], ['scss']);
        gulp.watch([
                path.join(config.dirs.src, 'data/**/*.json'),
                path.join(config.dirs.src, '**/*.hbs')
            ], ['handlebars'])
            .on('change', browserSync.reload);

    });

    gulp.task('build', ['handlebars', 'scss', 'static']);

    gulp.task('clean', function () {
        return gulp.src(config.dirs.dist, {
                read: false
            })
            .pipe(clean());
    });

    gulp.task('handlebars', function (cb) {

        if (config.languages) {
            config.languages.forEach(function (lang, index) {
                _buildPages(lang, lang);
            });
        } else {
            _buildPages(config.language, config.language);
        }

        _buildPages(config.language, "");

        cb();
    });

    gulp.task('scss', function () {
        return gulp
            .src(path.join(config.dirs.scss, '**/*.scss'))
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(path.join(config.dirs.dist, 'css')))
            .pipe(concat('style.css'))
            .pipe(minify())
            .pipe(rename('style.min.css'))
            .pipe(gulp.dest(path.join(config.dirs.dist, 'css')))
            .pipe(browserSync.stream());
    });

    gulp.task('static', function () {

        if (!config.statics) {
            return;
        }

        // merge.streams = [];
        config.statics.forEach(function (pack) {
            merge()
                .add(gulp
                    .src(pack.files)
                    .pipe(gulp.dest(pack.destination)));
        });

    });

    function _buildPages(lang, dest) {

        var _base = _loadDataFile("_base", lang);

        return gulp
            .src([path.join(config.dirs.src, 'pages/**/*.hbs')])
            .pipe(data(function (file) {
                var _page = path.relative(file.base, file.path).replace('.hbs', '');
                gutil.log('Building:', gutil.colors.magenta(lang + "-" + _page));
                var _content = _loadDataFile(_page, lang);
                _content._page = _page;
                _content.language = lang;
                // console.log(_content);
                return _content;
            }))
            .pipe(handlebars({
                _global: config,
                _base: _base,
            }, {
                batch: path.join(config.dirs.src, 'partials'),
                helpers: config.handlebars.helpers,
            }).on('error', gutil.log))
            .pipe(rename({
                extname: '.html'
            }))
            .pipe(gulp.dest(path.join(config.dirs.dist, dest)));

    }

    function _loadDataFile(file, lang) {

        var _file = file + ".json";
        var _file_lang = file + "." + lang + ".json";

        if (!fs.existsSync(path.join(config.dirs.src, 'data', _file))) return {};

        var _f = fs.readFileSync(path.join(config.dirs.src, 'data', file + ".json"));
        var _fileData = JSON.parse(_f, {
            encoding: "UTF-8"
        });

        if (lang && fs.existsSync(path.join(config.dirs.src, 'data', file + "." + lang + ".json"))) {
            var _f = fs.readFileSync(path.join(config.dirs.src, 'data', file + "." + lang + ".json"));
            _fileData = extend(
                true,
                _fileData,
                JSON.parse(_f, {
                    encoding: "UTF-8"
                })
            );
        }
        return _fileData;
    }

}