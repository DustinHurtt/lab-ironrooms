var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/selector', function(req, res, next) {
  res.render('selector.hbs', { title: 'Express' });
});

module.exports = router;
