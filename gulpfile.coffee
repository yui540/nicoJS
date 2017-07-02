gulp    = require 'gulp'
plumber = require 'gulp-plumber'
coffee  = require 'gulp-coffee'
uglify  = require 'gulp-uglify'

gulp.task 'default', ->
	gulp.src './src/*.coffee'
		.pipe plumber()
		.pipe coffee { bare: true }
		.pipe uglify()
		.pipe gulp.dest './lib'

gulp.task 'watch', ->
	gulp.watch [
		'./src/*.coffee'
	], ['default']
