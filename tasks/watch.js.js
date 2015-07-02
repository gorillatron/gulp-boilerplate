

module.exports = function(gulp, config) {
  return function(){

    gulp.watch(config.paths.src.jsfiles, ['build.js'])

  }
}