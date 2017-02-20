module.exports = (provider) => {
  return {
    getAllCars : function getAllCars() {
      return provider.getAllCars();
    },
    getCarsDetails : function getCarsDetails(ids) {
      return provider.getCarsDetails(ids);
    }
  };
};