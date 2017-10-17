module.exports = {
    plugins: ['ssr'],
    config: {
        modifyWebpackConfig: function(baseConfig) {
            return baseConfig;
        }
    }
};
