//导入所需组件
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
//创建并发布任务
gulp.task('sass',function(){
	//找取所有的scss文件，                  调用编译sass插件               重命名     压缩    放到目标目录中
	return gulp.src('src/scss/*.scss').pipe(sass()).pipe(rename({"suffix":".min"})).pipe(cssnano()).pipe(gulp.dest('css'));
})
//创建并发布压缩js
gulp.task('script',function(){
	return gulp.src('src/js/*.js').pipe(rename({"suffix":".min"})).pipe(uglify()).pipe(gulp.dest('js'));
})
//发布一个监听任务
gulp.task('watch',function(){
	//			监听的文件				执行任务
	gulp.watch(['src/scss/*.scss','src/js/*.js'],['sass','script']);
})
