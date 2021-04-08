const jsonModule = require('../modules/jsonModule');
const productModule = jsonModule('productsDataBase');

const { url } = require('inspector');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {	
		let products = productModule.readJson();
		return res.render('products', {products, toThousand});	
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let products = productModule.readJson();
		let product = products.find(function(product){
			return product.id == req.params.productId;
		});

		return res.render('detail', {product, toThousand});
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let productAdded = {
			id: parseInt(products.length + 1),
			name: req.body.name,
			description: req.body.description,
			price: parseInt(req.body.price),
			discount: parseInt(req.body.discount),
			image: 'default-image.jpg',
			category: req.body.category
		};

		productModule.save(productAdded);
		return res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let products = productModule.readJson();
		let product = products.find(function(product){
			return product.id == req.params.productId;
		});

		return res.render('product-edit-form', {product});
	},

	// Update - Method to update
	update: (req, res) => {
		let products = productModule.readJson();
		let productsUpdate = products.map(function(product){
			if (product.id != req.params.productId){
				return product;
			}		
			return product = {
				id: parseInt(product.id),
				name: req.body.name,
				description: req.body.description,
				price: parseInt(req.body.price),
				discount: parseInt(req.body.discount),
				image: product.image,
				category: req.body.category				
			}
		})

		productModule.writeJson(productsUpdate);
		return res.redirect('/');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let products = productModule.readJson();
		for (let i = 0; i < products.length; i++){
			if (products[i].id == req.params.productId){
				products.splice(i, 1);
				totalProducts = products;
			}
		}
		
		productModule.writeJson(totalProducts);

		return res.redirect('/');
	}
};

module.exports = controller;