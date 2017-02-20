
let currencies = {
  AED : {
  	HUF : 80
  }	
}

module.exports.getExchange = function .getExchange(from, to) {
	return this.currencies[from][to];
}