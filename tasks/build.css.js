
var path = require('path')
var sourcemaps = require("gulp-sourcemaps")
var concat = require("gulp-concat")
var less = require("gulp-less")
var notify = require("osx-notifier")


module.exports = function(gulp, config) {
  return function(taskdone){

    const debug = (config.env !== 'production' && config.env !== 'stage')
    const lessroot = path.join(config.paths.src.root, '/less/')
    const mainFilePath = path.join(lessroot, 'index.less')
    const destPath = path.join(config.paths.dist.root)

    var assembly = [

      (debug ?
        (() => sourcemaps.init()): null),

      (() => less({
        paths: [lessroot]
      })),

      (debug ?
        (() => sourcemaps.write()): null),

      (() => concat('app.css'))

    ]

    const vent = gulp.src(mainFilePath)
    const sink = gulp.dest(destPath)

    const pipeline = assembly.reduce(function(stream, line) {
      if(line) {

        var linestream = line()

        linestream.on('error', (error) => {
          notify({
            type: 'fail',
            title: 'Gulp: build.css',
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
        title: 'Gulp: build.css',
        subtitle: 'Built',
        message: 'yaaay',
        group: 'gulp'
      })
    })

    return out
  }
}