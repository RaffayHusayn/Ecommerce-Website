var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function (req, res, next) {
  //var successMsg = req.flash('success')[0];
  Product.find(function (err, docs) {
      var productChunks = [];
      var chunkSize = 3;
      for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
      }
      res.render('shop/index', {title: 'Shopping Cart', products: productChunks});
  });
});

router.get('user/signup', function(req, res, next) {
  res.render('user/signup', {csrfToken: req.csrfToken()});
});


module.exports = router;
