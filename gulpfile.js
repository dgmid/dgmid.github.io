//note(@duncanmid): node modules

const 	gulp 			= require('gulp'),
		sass 			= require('gulp-sass'),
		browsersync 	= require('browser-sync').create(),
		concat 			= require('gulp-concat'),
		rename 			= require('gulp-rename'),
		uglify 			= require('gulp-uglify'),
		autoprefixer 	= require('gulp-autoprefixer'),
		del 			= require('del'),
		sourcemaps 		= require('gulp-sourcemaps'),
		cssnano 		= require('gulp-cssnano');



//note(@duncanmid): paths / files

const 	jsFiles 		= 'app/scripts/**/*.js',
		jsDest 			= 'dist/js',
		sassFile 		= 'app/scss/styles.scss',
		cssDest 		= 'dist/css',
		htmlFiles 		= '*.html';



//note(@duncanmid): cleanup

gulp.task('cleanup', function() {
	
	del.sync(['js/scripts.js', 'css/styles.css']);
});



//note(@duncanmid): tasks

gulp.task('scripts', function() {
	
	return gulp.src(jsFiles)
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(rename('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(jsDest))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(jsDest));
});



gulp.task('sass', function() {

	return gulp.src(sassFile)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(rename('styles.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest(cssDest))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(cssDest))
		.pipe(browsersync.reload({
			stream: true
		}));
});



gulp.task('browsersync', function() {
	
	browsersync.init({
		port: 8181,
		proxy: 'http://dgmid.github.dev',
		reloadOnRestart: true,
	});
});



gulp.task('watch', ['browsersync', 'scripts', 'sass'], function() {

	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/scripts/**/*.js', ['scripts', browsersync.reload]);
	gulp.watch(htmlFiles, browsersync.reload);
});
