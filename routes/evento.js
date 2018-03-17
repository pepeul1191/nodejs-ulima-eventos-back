var express = require('express');
var router = express.Router();
var db = require('../config/database');

router.get('/listar', function(req, res, next) {
  db.conn.find('eventos', function(err, cursor, count) {
    if (err) {
      res.send(err);
    }
    var rs = [];
    while (cursor.next()) {
      var data = {
        'id' : cursor.field('_id'),
        'nombre' : cursor.field('nombre'),
        'lugar' : cursor.field('lugar'),
        'direccion' : cursor.field('direccion'),
      };
      rs.push(data);
    }
    res.send(JSON.stringify(rs));
  });
});

module.exports = router;
