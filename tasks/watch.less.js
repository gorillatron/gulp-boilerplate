

module.exports = function(gulp, config) {
  return function(){

    gulp.watch(config.paths.src.lessfiles, ['build.css'])

  }
}