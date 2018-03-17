var express = require('express');
var router = express.Router();
var db = require('../config/database');

router.get('/conexion', function(req, res, next) {
  res.send('ok');
});

router.get('/evento/crear', function(req, res, next) {
  var document = {
    'nombre' : 'UbuntuConLA',
    'lugar' : 'Auditorio Edificio S',
    'direccion' : 'Avenida Javier Prado Este N.° 4600, Santiago de Surco, Lima, Perú ',
  };
  db.conn.save('eventos', document, function(err, oids) {
    if (err) {
      res.send(err);
    }
    res.send(oids[0]);
  });
});

module.exports = router;
