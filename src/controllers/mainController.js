const jsonModule = require('../modules/jsonModule');
const productModule = jsonModule('productsDataBase');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		let products = productModule.readJson();

		let visited = products.filter(function(product){
			return product.category == "visited";						// Array de visited products
		});

		let inSale = products.filter(function(product){
			return product.category == "in-sale";						// Array de in-sale products
		});

		return res.render('index', {visited, inSale, toThousand});
		
	},
	search: (req, res) => {
		let products = productModule.readJson();
		let busqueda = req.query.keywords;
		res.render('results', {products, busqueda, toThousand});
	},
}

module.exports = controller;
