require('dotenv').config();
const env = process.env.NODE_ENV;

const isProduction = env === 'prod';

module.exports = {
  isProduction,
  paths: {
    src: './src/site/',
    dest: './dist/',
    assetsSrc: './src/assets/',
    assetsDest: './dist/assets/'
  },
  styles: {
    src: ['styles/**/*.scss'],
    dest: 'css/'
  },
  scripts: {
    src: ['scripts/**/*.js'],
    dest: 'js/',
    bundle: {
      main: './src/assets/scripts/main.js'
    }
  },
  eleventy: {
    watch: ['./src/**/*.{njk,html,md}']
  }
};
