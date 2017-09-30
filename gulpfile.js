var gulp = require('gulp'),
watch = require('gulp-watch');

gulp.task("default", function() {
	console.log("Hooray - you have created a new gulp task");
});

gulp.task("html", function() {
	console.log("Something usefull for HTML");
});

gulp.task('styles', function() {
	
});

gulp.task("watch", function() {
	watch('./app/index.html', function() {
		gulp.start('html');
	});

	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('styles');
	});
}); 