var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

    res.render('index', {
      title: 'MPC Realtime Project - adrianalonso.es'
    });
});
