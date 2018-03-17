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

router.post('/editar', function(req, res, next) {
  var document = JSON.parse(req.query.evento);
  db.conn.update('externos', {'_id': document['_id'], $set : document}, function(err, oids) {
    if (err) {
      console.log(err);
      var rpta = {'tipo_mensaje' :  'error', 'mensaje' : ['Se ha producido un error en editar el participante externo', err]};
      res.send(JSON.stringify(rpta));
    }else {
      var rpta = {'tipo_mensaje' :  'success', 'mensaje' : ['Se ha editado el participante externo']};
      res.send(JSON.stringify(rpta));
    }
  });
});

router.post('/guardar', function(req, res, next) {
  var data = JSON.parse(req.query.data);
  var eliminados = data['eliminados'];
  var rpta = null;
  var error = false;
  eliminados.forEach(function(eliminado) {
    console.log(eliminado);
    error = db.conn.update('externos', {'_id' : eliminado, $dropall : true}, function(err, oids) {
      if (err) {
        console.log(err);
        return true;
      }
    });
  });
  if(error){
    rpta = {'tipo_mensaje' :  'error', 'mensaje' : ['Se ha producido un error en eliminar los participantes externos', 'ver logs']};
  }else{
    rpta = {'tipo_mensaje' :  'success', 'mensaje' : ['Se ha registrado los cambios en los participantes externos']};
  }
  res.send(JSON.stringify(rpta));
});

module.exports = router;
