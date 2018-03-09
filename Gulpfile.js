var gulp = require('gulp'),
    watch = require('gulp-watch')
    pegjs = require('gulp-pegjs');
 
var pegjsParams = {
	format: "globals", 
	exportVar: "window.parser"
};

gulp.task('default', function () {
    return gulp.src('*.pegjs')
    	.pipe(pegjs(pegjsParams))
        .pipe(gulp.dest('dist/js'));
});

 
gulp.task('watch', function () {
    return watch('*.pegjs')
    	.pipe(pegjs(pegjsParams))
        .pipe(gulp.dest('dist/js'));
});
