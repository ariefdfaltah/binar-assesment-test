var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var app = express();
app.set('mamboSecret', 'ayamGor3ngH4l4l');


/* GET home page. */
router.get('/', function(req, res, next) {
  var a = {};
  a.date = new Date;
  var url = 'http://' + req.get('host') + '/drivers?access=';
  var token = jwt.sign(a, app.get('mamboSecret'), {expiresIn: "15m"});
  res.json({
      Msg : 'Selamat Datang di Webservice Ojek Assesment Test',
      Token : token,
      URL : url + token
  })
});

module.exports = router;
