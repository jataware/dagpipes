const path = require('path');

module.exports = {
  mode: "development",
  entry: {
    main: './src/main.jsx',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    hot: true,
  },
  module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			},
      {
				test: /\.png$/,
				type: "asset"
			},
      {
        test: /\.js$/,
        type: 'jsx',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              // ...
            },
          },
        ],
        type: 'css',
      }
		]

  },
  builtins: {
    html: [
      {
        template: "./index.html",
      },
    ],
    define: {
      "process.env.NODE_ENV": "'development'",
    },
    react: {
      development: true,
      refresh: false
    },
  },
};
