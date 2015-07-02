
var path = require('path')

module.exports = function(gulp, config, tasks) {
  var tasks = tasks.map(function(taskname) {

    var modulePath = path.join(__dirname, './' + taskname)
    var module = require(modulePath)

    gulp.task(taskname, module(gulp, config))

    return {name: taskname, module:module}
  })

  return gulp
}