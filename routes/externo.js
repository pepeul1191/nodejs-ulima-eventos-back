var express = require('express');
var router = express.Router();
var db = require('../config/database');

router.get('/listar', function(req, res, next) {
  db.conn.find('externos', function(err, cursor, count) {
    if (err) {
      res.send(err);
    }
    var rs = [];
    while (cursor.next()) {
      var data = {
        '_id' : cursor.field('_id'),
        'dni' : cursor.field('dni'),
        'nombres' : cursor.field('nombres'),
        'paterno' : cursor.field('paterno'),
        'materno' : cursor.field('materno'),
        'correo' : cursor.field('correo'),
        'telefono' : cursor.field('telefono'),
      };
      rs.push(data);
    }
    res.send(JSON.stringify(rs));
  });
});

router.post('/crear', function(req, res, next) {
  var document = JSON.parse(req.query.externo);
  db.conn.save('externos', document, function(err, oids) {
    if (err) {
      var rpta = {'tipo_mensaje' :  'error', 'mensaje' : ['Se ha producido un error en registrar al participante externo', err]};
      res.send(JSON.stringify(rpta));
    }
    var rpta = {'tipo_mensaje' :  'success', 'mensaje' : ['Se ha registrado al participante externo', oids[0]]};
    res.send(JSON.stringify(rpta));
  });
});

router.get('/dni', function(req, res, next) {
  var dni = req.query.dni;
  db.conn.find('externos', {'dni': dni}, function(err, cursor) {
    var rpta = null;
    while (cursor.next()) {
      rpta = {
        '_id' : cursor.field('_id'),
        'dni' : cursor.field('dni'),
        'nombres' : cursor.field('nombres'),
        'paterno' : cursor.field('paterno'),
        'materno' : cursor.field('materno'),
        'correo' : cursor.field('correo'),
        'telefono' : cursor.field('telefono'),
      };
    }
    res.send(JSON.stringify(rpta));
  });
});

module.exports = router;
