import fs from 'fs-extra'
import path from 'path'
import mkdirp from 'mkdirp'
import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import { config  } from './common.js'

const buildPath = path.join(process.cwd(), 'build')
const publicPath = path.join(process.cwd(), 'public')

mkdirp.sync(buildPath)

const compiler = webpack({
  entry: [
    ...config.entry
  ],
  output: {
    ...config.output,
    path: './build/'
  },
  module: {
    ...config.module
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
})

compiler.run((err, stats) => {
  if (err) {
    console.log(err)
  } else {
    fs.copySync(publicPath, buildPath)
  }
})
