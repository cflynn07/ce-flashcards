var gulp = require('gulp')
var sass = require('gulp-sass')

// Compile sass into CSS
gulp.task('sass', () => {
  return gulp.src([
    'sass/*.scss'
  ]).pipe(sass())
    .pipe(gulp.dest('assets/css'))
})

// configure which files to watch and what tasks to use on file changes
gulp.task('sass-watch', () => {
  return gulp.watch('scss/**/*.scss', gulp.series('sass'))
})

gulp.task('default', gulp.parallel(['sass']))
