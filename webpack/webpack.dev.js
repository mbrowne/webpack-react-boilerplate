const webpack = require('webpack')
const chalk = require('chalk')
const commonPaths = require('./paths')

module.exports = {
    mode: 'development',
    output: {
        filename: '[name].js',
        path: commonPaths.outputPath,
        chunkFilename: '[name].js',
    },
    devServer: {
        contentBase: commonPaths.outputPath,
        compress: true,
        hot: true,
        onListening: server => {
            const { port } = server.listeningApp.address()
            server.compiler.hooks.done.tap('done', () => {
                setImmediate(() => {
                    console.log()
                    console.log(
                        chalk.cyan.bold(`Running at http://localhost:${port}`)
                    )
                })
            })
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
}
