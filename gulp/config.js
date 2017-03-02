/**
 * Created by Loki.Luo on 2017/3/2.
 */
var VERSION = require('../package.json').version;
var serve = require('browser-sync');
var path = require('path');
var root = 'src';

function resolveToApp(files) {
    return path.join(root, files);
}
module.exports = {
    banner: '',
    output: 'build',
    debug: 'debug',
    entry: '',
    root: 'src',
    paths: {
        js: resolveToApp('/**/*!(.spec.js).js'),
        html: [
            resolveToApp('/**/*.html')
        ],
        styl: resolveToApp('**/*.styl')
    },
    serve: serve
};