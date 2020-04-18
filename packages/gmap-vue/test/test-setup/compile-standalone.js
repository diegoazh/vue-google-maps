import webpack from 'webpack'
import * as shell from 'shelljs'
import path from 'path'

export default new Promise((resolve, reject) => {
  const webpackConfig = require('../../webpack.config.js')[0]

  webpack(
    {
      ...webpackConfig,
      mode: 'development'
    },
    (err, status) => {
      if (!err) {
        shell.cp(
          path.resolve(__dirname, '../../dist/gmap-vue.js'),
          path.resolve(__dirname, '../../examples/gmap-vue.js')
        )
        resolve()
      } else {
        reject(err)
      }
    }
  )
})
