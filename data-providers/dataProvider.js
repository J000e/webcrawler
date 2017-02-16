//var exports = module.exports = {};

module.exports = (provider) => {
    return {
        getAllCars : function() {
            return provider.getAllCars();
        },
        getCar : function(id) {
            return provider.getCar(id);
        }
    };
}