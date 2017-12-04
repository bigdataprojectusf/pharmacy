var express = require('express');
var router = express.Router();
var multer = require('multer');

var product = require("../controllers/productController.js");


product.filename1 = '';
var storage = multer.diskStorage({
	destination : function(req, file, callback) {
		callback(null, 'public/images');
	},
	filename : function(req, file, callback) {
		product.filename1 = file.originalname;
		callback(null, product.filename1);
	}
});
var upload = multer({
	storage : storage
});

//Get all products
router.get('/', product.list);

router.get('/search/:name', product.search);

// Get single product by id
router.get('/show/:id', product.show);

router.get('/:category', product.category);

router.post('/save', upload.single('productImage'), product.save);

//Edit update
router.post('/delete/:id', product.delete);

module.exports = router;