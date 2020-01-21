const { src, dest } = require('gulp');
const filter = require('gulp-filter');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revDel = require('gulp-rev-delete-original');
const paths = require('../paths');

const revision =() => {
  const assetFilter = filter(['**', '!**/*.html'], { restore: true });

  return src(`**/*.{js,css,html}`, { cwd: paths.build.html })
    .pipe(assetFilter)
    .pipe(rev()) // Rename all files except html files
    .pipe(assetFilter.restore)
    .pipe(revRewrite())
    .pipe(dest(paths.build.html))
    .pipe(revDel())
    .pipe(rev.manifest())
    .pipe(dest(paths.build.html));
}

module.exports = revision;
