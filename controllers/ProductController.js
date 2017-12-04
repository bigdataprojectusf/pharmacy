var mongoose = require("mongoose");
var multer = require('multer');

var Product = require('../models/product');
var productController = {};

productController.list = function(req, res) {
	Product.find({}).exec(function(err, products) {
		if (err) {
			console.log("Error:", err);
		} else {
			res.render("../views/index", {
				products : products
			});
		}
	});
};

productController.category = function(req, res) {
	console.log(req.params.category);
	Product.find({
		category: req.params.category
	}).exec(function(err, products) {
		if (err) {
			console.log("Error:", err);
		} else {
			console.log(products);
			res.render("../views/product-list", {
				products : products
			});
		}
	});
};

productController.search = function(req, res) {
	
	var regex = new RegExp(req.params.name, "i");
	
	Product.find({
		product_name: regex
	}).exec(function(err, products) {
		if (err) {
			console.log("Error:", err);
		} else {
			res.send(products);
		}
	});
};

productController.show = function(req, res) {
	Product.findOne({
		_id : req.params.id
	}).exec(function(err, product) {
		if (err) {
			console.log("Error:", err);
		} else {
			res.render("../views/product", {
				product : product
			});
		}
	});
};

productController.save = function(req, res) {
  var product = new Product(req.body);
  product.product_image = productController.filename1;

  product.save(function(err, prod) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully created an product: " + prod);
      res.send(prod);
    }
  });
};
	
productController.delete = function(req, res) {
	Product.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Product deleted!");
    }
  });
};
		
module.exports = productController;