
var path = require('path')
var babelify = require("babelify")
var browserify = require("gulp-browserify")
var concat = require("gulp-concat")
var notify = require("osx-notifier")

module.exports = function(gulp, config) {
  return function(taskdone){

    const debug = (config.env !== 'production' && config.env !== 'stage')

    const mainFilePath = path.join(config.paths.src.root, 'js/index.js')
    const destPath = path.join(config.paths.dist.root)

    var assembly = [

      (() => browserify({
        debug: debug,
        transform: [
          babelify.configure({
            stage: 1,
            nonStandard: true
          })
        ]
      })),

      (() => concat('app.js'))

    ]

    const vent = gulp.src(mainFilePath)
    const sink = gulp.dest(destPath)

    const pipeline = assembly.reduce(function(stream, line) {
      if(line) {

        var linestream = line()

        linestream.on('error', (error) => {
          notify({
            type: 'fail',
            title: 'Gulp: build.js',
            subtitle: 'Error',
            message: error.message,
            group: 'gulp'
          })
          taskdone(error)
        })

        return stream.pipe(linestream)
      }
      else {
        return stream
      }
    }, vent)

    const out = pipeline.pipe(sink)

    out.on('end', () => {
      notify({
        type: 'pass',
        title: 'Gulp: build.js',
        subtitle: 'Built',
        message: 'yaaay',
        group: 'gulp'
      })
    })

    return out
  }
}