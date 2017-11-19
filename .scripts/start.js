import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import { config  } from './common.js'

const host = 'http://localhost'
const port = 8000

const webpackConfig = {
  entry: [
    ...config.entry,
    `webpack-dev-server/client?${host}:${port.toString()}`,
    'webpack/hot/dev-server'
  ],
  output: {
    ...config.output,
    path: '/'
  },
  module: {
    ...config.module
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin()
  ]
}

const compiler = webpack(webpackConfig)
compiler.plugin('done', () => {
  console.log(`App is running at ${host}:${port}`)
})
const server = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  hot: true,
  contentBase: './public',
  stats: 'errors-only',
  setup: (app) => {
    app.post('/event', function (req, res) {
      res.send('200OK');
    })
  }
})
server.listen(port)
