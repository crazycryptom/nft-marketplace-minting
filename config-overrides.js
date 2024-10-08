const { ProvidePlugin } = require('webpack');

module.exports = function (config, env) {
    return {
        ...config,
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.(m?js|ts)$/,
                    enforce: 'pre',
                    use: ['source-map-loader'],
                },
            ],
        },
        plugins: [
            ...config.plugins,
            new ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                process: 'process/browser',
            }),
        ],
        resolve: {
            ...config.resolve,
            fallback: {
                assert: require.resolve('assert'),
                buffer: require.resolve('buffer/'),
                stream: require.resolve('stream-browserify'),
                crypto: require.resolve("crypto-browserify"),
                http: require.resolve("stream-http"),
                https: require.resolve("https-browserify"),
                zlib: require.resolve("browserify-zlib"),
                url: require.resolve("url/")
            },
        },
        ignoreWarnings: [/Failed to parse source map/],
    };
};
