module.exports = {
    plugins: ['ssr'],
    config: {
        exports: ['./style.css'],
        modifyWebpackConfig: function(baseConfig) {
            baseConfig.resolve.alias = {
                SSR: '/ssr/share'
            }
            return baseConfig;
        }
    }
};
