const gulp = require('gulp');
const path = require('path');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const merge2 = require('merge2');
const { compilerOptions } = require('./tsconfig.json');

const tsConfig = {
  noUnusedParameters: true,
  noUnusedLocals: true,
  strictNullChecks: true,
  target: 'es6',
  jsx: 'preserve',
  moduleResolution: 'node',
  declaration: true,
  allowSyntheticDefaultImports: true,
  ...compilerOptions,
};
const babelConfig = require('./babel.config');
// glob 文件匹配模版 类似于正则
const source = [
  'components/**/*.{js,ts,jsx,tsx}',
  '!components/**/*.stories.{js,ts,jsx,tsx}',
  '!components/**/e2e/*',
  '!components/**/unit/*',
];
// /Users/yangtianbao/learn/javascript/zhufeng/trainCamp/antd/my-antd/antdn/components
const base = path.join(process.cwd(), 'components');
console.log(base, 'base....');
function getProjectPath(filePath) {
  return path.join(process.cwd(), filePath);
}

const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

gulp.task('compile-to-es', (done) => {
  console.log('compiler to es...');
  compile(false).on('finish', done);
});

gulp.task('compile-to-lib', (done) => {
  console.log('compiler to js...');
  compile().on('finish', done);
});

gulp.task('compile', gulp.parallel('compile-to-es', 'compile-to-lib'));

/**
 * 执行编译
 * @param {*} modules 是否需要转换模块
 * @returns
 */
function compile(modules) {
  const targetDir = modules === false ? esDir : libDir;
  rimraf.sync(targetDir); // 删除老的内容
  // 把文件匹配模式传给gulp， gulp会按这个模式把文件匹配出来
  const { js, dts } = gulp.src(source, { base }).pipe(ts(tsConfig));
  // console.log(js, 'js....');
  // console.log(dts, 'dts.....');
  const dtsFilesStream = dts.pipe(gulp.dest(targetDir));
  let jsFilesStream = js;
  if (modules) {
    jsFilesStream = js.pipe(babel(babelConfig));
  }

  jsFilesStream = jsFilesStream.pipe(gulp.dest(targetDir));
  return merge2([jsFilesStream, dtsFilesStream]);
}
