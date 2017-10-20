module.exports = {
    plugins: ['ssr'],
    config: {
        modifyWebpackConfig: function(baseConfig) {
            baseConfig.resolve.alias = {
                SSR: '/ssr/share'
            }
            return baseConfig;
        }
    }
};
