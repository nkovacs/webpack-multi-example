var loaderUtils = require('loader-utils');
var path = require('path');
var fs = require('fs');

module.exports = function(source) {
    this.cacheable && this.cacheable();
    var query = loaderUtils.parseQuery(this.query);
    var sync = query.sync || false;

    var config = JSON.parse(source);

    var remainingRequest = loaderUtils.getRemainingRequest(this);

    var options = [];
    config.subModules.forEach(function(submodule) {
        options.push({
            submodule: submodule,
            loader: loaderUtils.stringifyRequest(this, '!!' + require.resolve('./compiler') + '?variant=' + submodule + '!' + remainingRequest)
        });
    });

    var result = [
        'module.exports = function(variant, cb) {',
        '    switch (variant) {',
        options.map(function(value) {
            return [
                '        case ' + JSON.stringify(value.submodule) + ':',
                sync
              ? '            cb(require(' + value.loader + '));'
              : '            require.ensure([' + value.loader + '], cb);',
                '            break;'
            ].join('\n');
        }).join('\n'),
        '    default:',
        '        throw new Error("Cannot find module " + variant + ".");',
        '    }',
        '}'
    ];

    return result.join('\n');
}
