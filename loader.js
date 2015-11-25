var loaderUtils = require('loader-utils');
var path = require('path');
var fs = require('fs');

module.exports = function(source) {
    this.cacheable && this.cacheable();
    var query = loaderUtils.parseQuery(this.query);
    var varName = query.var || 'variant';

    var config = JSON.parse(source);

    config.subModules.forEach(function(submodule) {
        fs.writeFileSync(submodule + '.build.js', 'module.exports = "This is module " + ' + JSON.stringify(submodule) + ';');
    });

    return "require('bundle!./' + " + varName + " + '.build.js');"
}
