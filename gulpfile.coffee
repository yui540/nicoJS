gulp    = require 'gulp'
plumber = require 'gulp-plumber'
coffee  = require 'gulp-coffee'
uglify  = require 'gulp-uglify'

gulp.task 'default', ->
	gulp.src './src/nico.coffee'
		.pipe plumber()
		.pipe coffee { bare: true }
		.pipe uglify()
		.pipe gulp.dest './lib'
		.pipe gulp.dest './debug'

gulp.task 'watch', ->
	gulp.watch [
		'./src/*.coffee'
	], ['default']
