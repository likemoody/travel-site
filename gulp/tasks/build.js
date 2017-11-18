var gulp = require('gulp'),
imageMin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();


//testing the dist/docs folder with browsersync
gulp.task('previewDist', function() {
	browserSync.init ({
		notify: false,
		server: {
		baseDir: "docs"
		}
	});
});

//begin clean task deleting older dist/docs folder
gulp.task('deleteDistFolder', ['icons'], function() {
	return del("./docs");
});

//copying the all miscellaneous files other than ours
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
	var pathsToCopy = [
	'./app/**/*',
	'!./app/index.html',
	'!./app/assets/images/**',
	'!./app/assets/styles/**',	
	'!./app/assets/scripts/**',
	'!./app/temp',
	'!./app/temp/**'
	]
	return gulp.src(pathsToCopy)
	.pipe(gulp.dest('./docs'));
});

//optimizing images with gulp-imagemin package
gulp.task('optimizeImages', ['deleteDistFolder'], function() {
	return gulp.src(["./app/assets/images/**/*", "!./app/assets/images/icons", "!./app/assets/images/icons/**/*"])
	.pipe(imageMin({
		progressive: true,
		interlaced: true,
		multipass: true
	}))
	.pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start('usemin');
});

//revisionin, comressing and moving our css and js files to the dist folder
gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp.src("./app/index.html")
	.pipe(usemin({
		css: [function() {return rev()}, function() {return cssnano()}],
		js: [function() {return rev()}, function() {return uglify()}]
	}))
	.pipe(gulp.dest("./docs"));
});

//a task that launches all the tasks above
gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);