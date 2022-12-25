const path = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const { NODE_ENV, BUILD_ZIP } = process.env
const isProd = NODE_ENV === 'production'

dotenvExpand.expand(dotenv.config({ path: `./.env.${NODE_ENV}` }))
dotenvExpand.expand(dotenv.config())

module.exports = () => {
  const babelLoader = {
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-react'
      ],
      plugins: [
        '@babel/plugin-transform-runtime'
      ]
    }
  }
  
  const cssLoader = (importLoaders = 1) => ({
    loader: 'css-loader',
    options: {
      importLoaders,
      modules: {
        auto: (resourcePath) => {
          return ['.module.less', '.module.css'].some(item => resourcePath.endsWith(item))
        },
        localIdentName: '[local]_[hash:base64:8]'
      }
    }
  })
  
  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          'autoprefixer'
        ]
      }
    }
  }

  const config = {
    entry: './src/main.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash].js',
      assetModuleFilename: 'assets/[name].[contenthash][ext][query]',
      clean: true
    },
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css', '.json']
    },
    optimization: {
      usedExports: true,
      splitChunks: {
        chunks: 'all'
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            babelLoader
          ]
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            'ts-loader',
            babelLoader
          ]
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            'ts-loader'
          ]
        },
        {
          test: /\.less$/,
          sideEffects: true,
          use: [
            MiniCssExtractPlugin.loader,
            cssLoader(2),
            postCssLoader,
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  modifyVars: {
                    hack: `true; @import "${path.resolve(__dirname, 'src/style/variable.less')}";`,
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.css$/,
          sideEffects: true,
          use: [
            MiniCssExtractPlugin.loader,
            cssLoader(),
            postCssLoader
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp|mp3|mp4)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8192
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './public/index.html',
        inject: 'body',
        title: 'React-Ts-Template',
        minify: false,
        externals: [],
        buildTime: new Date().toLocaleString()
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css'
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            filter: (resourcePath) => !resourcePath.endsWith('/index.html')
          }
        ]
      }),
    ]
  }

  if (BUILD_ZIP) {
    config.plugins.push(
      new FileManagerPlugin({
        events: {
          onEnd: {
            archive: [
              {
                source: './dist',
                destination: './dist.zip',
                format: 'zip'
              }
            ]
          }
        }
      })
    )
  }
  
  return config
}