var express = require('express');
var router = express.Router();
var db = require('../config/database');
var helpers = require('../config/helpers');
var dateFormat = require('dateformat');

router.get('/listar', function(req, res, next) {
  db.conn.find('eventos', function(err, cursor, count) {
    if (err) {
      res.send(err);
    }
    var rs = [];
    while (cursor.next()) {
      var date_temp1 = new Date(cursor.field('dia_inicio'));
      var inicio = dateFormat(date_temp1, 'dd/mm/yyyy');
      var date_temp2 = new Date(cursor.field('dia_fin'));
      var fin = dateFormat(date_temp2, 'dd/mm/yyyy');
      var data = {
        '_id' : cursor.field('_id'),
        'nombre' : cursor.field('nombre'),
        'nombre_url' : cursor.field('nombre_url'),
        'dia_inicio' : inicio,
        'dia_fin' : fin,
        'hora_inicio' : cursor.field('hora_inicio'),
        'hora_fin' : cursor.field('hora_fin'),
        'lugar' : cursor.field('lugar'),
        'direccion' : cursor.field('direccion'),
      };
      rs.push(data);
    }
    res.send(JSON.stringify(rs));
  });
});

router.post('/crear', function(req, res, next) {
  var document = JSON.parse(req.query.evento);
  document['dia_inicio'] = helpers.fechaViewToJS(document['dia_inicio']);
  document['dia_fin'] = helpers.fechaViewToJS(document['dia_fin']);
  db.conn.save('eventos', document, function(err, oids) {
    if (err) {
      var rpta = {'tipo_mensaje' :  'error', 'mensaje' : ['Se ha producido un error en guardar el nuevo evento', err]};
      res.send(JSON.stringify(rpta));
    }
    var rpta = {'tipo_mensaje' :  'success', 'mensaje' : ['Se ha registrado el evento', oids[0]]};
    res.send(JSON.stringify(rpta));
  });
});

router.post('/editar', function(req, res, next) {
  var document = JSON.parse(req.query.evento);
  document['dia_inicio'] = helpers.fechaViewToJS(document['dia_inicio']);
  document['dia_fin'] = helpers.fechaViewToJS(document['dia_fin']);
  db.conn.update('eventos', {'_id': document['_id'], $set : document}, function(err, oids) {
    if (err) {
      var rpta = {'tipo_mensaje' :  'error', 'mensaje' : ['Se ha producido un error en editar el evento', err]};
      res.send(JSON.stringify(rpta));
    }
    var rpta = {'tipo_mensaje' :  'success', 'mensaje' : ['Se ha editado el evento']};
    res.send(JSON.stringify(rpta));
  });
});

module.exports = router;
