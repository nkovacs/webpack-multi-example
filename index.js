function getVariant(variant, callback) {
    require('./loader!./multi.json')(variant, function(data) {
        callback(data);
    });
}
