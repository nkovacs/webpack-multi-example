var loaderUtils = require('loader-utils');

module.exports = function(source) {
    this.cacheable && this.cacheable();
    var query = loaderUtils.parseQuery(this.query);
    var variant = query.variant;

    return 'module.exports = "This is module " + ' + JSON.stringify(variant);
}
