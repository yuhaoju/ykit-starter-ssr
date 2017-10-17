module.exports = {
    plugins: ['ssr'],
    config: {
        export: ['./index.js'],
        modifyWebpackConfig: function(baseConfig) {
            return baseConfig;
        }
    }
};
