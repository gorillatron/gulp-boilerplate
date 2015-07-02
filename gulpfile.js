
var path = require('path')
var gulp = require('gulp')
var tasks = require('./tasks')

const srcroot = path.join(__dirname, './src')
const distroot = path.join(__dirname, './dist')

const config = {
  env: process.env.NODE_ENV,
  paths: {
    src: {
      root: srcroot,
      jsfiles: [
        path.join(srcroot, 'js/**/*.js'),
        path.join(srcroot, 'js/**/*.jsx')
      ],
      lessfiles: [
        path.join(srcroot, 'less/**/*.less')
      ]
    },
    dist: {
      root: distroot
    }
  }
}

tasks(gulp, config, [

  'build.js',
  'build.css',

  'watch.js',
  'watch.less'

])

gulp.task('build', ['build.js', 'build.css'])
gulp.task('watch', ['watch.js', 'watch.less'])

gulp.task('default', ['build', 'watch'])