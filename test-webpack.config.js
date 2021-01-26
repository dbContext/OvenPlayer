const path = require('path');

module.exports = {
    entry: ['./local/module_src.js'],
    output: {
        filename: 'module_dist.js',
        path: path.resolve(__dirname, 'local'),
    },
    devtool: "inline-source-map"
    // resolve: {
    //     modules: [
    //         path.resolve(__dirname, "dist/development/ovenplayer")
    //     ]
    // },

};