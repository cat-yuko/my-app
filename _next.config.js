const path = require('path');

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(gltf|glb)$/,
      type: 'asset/resource', // Webpack 5では 'file-loader' は非推奨なので、代わりにこれを使います。
      generator: {
        filename: 'static/media/[name].[hash][ext]', // 出力先の設定
      },
    });
    return config;
  },
};
