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
        'descripcion' : cursor.field('descripcion'),
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
      console.log(err);
      var rpta = {'tipo_mensaje' :  'error', 'mensaje' : ['Se ha producido un error en editar el evento', err]};
      res.send(JSON.stringify(rpta));
    }else {
      var rpta = {'tipo_mensaje' :  'success', 'mensaje' : ['Se ha editado el evento']};
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
    error = db.conn.update('eventos', {'_id' : eliminado, $dropall : true}, function(err, oids) {
      if (err) {
        console.log(err);
        return true;
      }
    });
  });
  if(error){
    rpta = {'tipo_mensaje' :  'error', 'mensaje' : ['Se ha producido un error en eliminar los eventos', 'ver logs']};
  }else{
    rpta = {'tipo_mensaje' :  'success', 'mensaje' : ['Se ha registrado los cambios en los eventos']};
  }
  res.send(JSON.stringify(rpta));
});

router.get('/nombre_url', function(req, res, next) {
  var nombre_url = req.query.nombre_url;
  db.conn.find('eventos', {'nombre_url': nombre_url}, function(err, cursor) {
    var rpta = null;
    while (cursor.next()) {
      var date_temp1 = new Date(cursor.field('dia_inicio'));
      var inicio = dateFormat(date_temp1, 'dd/mm/yyyy');
      var date_temp2 = new Date(cursor.field('dia_fin'));
      var fin = dateFormat(date_temp2, 'dd/mm/yyyy');
      rpta = {
        '_id' : cursor.field('_id'),
        'nombre' : cursor.field('nombre'),
        'nombre_url' : cursor.field('nombre_url'),
        'dia_inicio' : inicio,
        'dia_fin' : fin,
        'hora_inicio' : cursor.field('hora_inicio'),
        'hora_fin' : cursor.field('hora_fin'),
        'lugar' : cursor.field('lugar'),
        'direccion' : cursor.field('direccion'),
        'descripcion' : cursor.field('descripcion'),
      };
    }
    res.send(JSON.stringify(rpta));
  });
});

router.get('/_id', function(req, res, next) {
  var _id = req.query._id;
  db.conn.find('eventos', {'_id': _id}, function(err, cursor) {
    var rpta = null;
    while (cursor.next()) {
      var date_temp1 = new Date(cursor.field('dia_inicio'));
      var inicio = dateFormat(date_temp1, 'dd/mm/yyyy');
      var date_temp2 = new Date(cursor.field('dia_fin'));
      var fin = dateFormat(date_temp2, 'dd/mm/yyyy');
      rpta = {
        '_id' : cursor.field('_id'),
        'nombre' : cursor.field('nombre'),
        'nombre_url' : cursor.field('nombre_url'),
        'dia_inicio' : inicio,
        'dia_fin' : fin,
        'hora_inicio' : cursor.field('hora_inicio'),
        'hora_fin' : cursor.field('hora_fin'),
        'lugar' : cursor.field('lugar'),
        'direccion' : cursor.field('direccion'),
        'descripcion' : cursor.field('descripcion'),
      };
    }
    res.send(JSON.stringify(rpta));
  });
});

module.exports = router;
