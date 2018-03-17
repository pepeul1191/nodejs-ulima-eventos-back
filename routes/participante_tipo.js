var express = require('express');
var router = express.Router();
var db = require('../config/database');
var helpers = require('../config/helpers');

router.get('/listar', function(req, res, next) {
  db.conn.find('participante_tipos', function(err, cursor, count) {
    if (err) {
      res.send(err);
    }
    var rs = [];
    while (cursor.next()) {
      var data = {
        '_id' : cursor.field('_id'),
        'nombre' : cursor.field('nombre'),
      }
      rs.push(data);
    }
    res.send(JSON.stringify(rs));
  });
});

router.get('/crear', function(req, res, next) {
  db.conn.find('participante_tipos', {'nombre': 'trabajador'}, function(err, cursor, count) {
    if(count == 0){
      db.conn.save('participante_tipos', {'nombre': 'trabajador'}, function(err, oids) {
        return 1;
      });
    }else{
      return 0;
    }
  });
  db.conn.find('participante_tipos', {'nombre': 'alumno'}, function(err, cursor, count) {
    if(count == 0){
      db.conn.save('participante_tipos', {'nombre': 'alumno'}, function(err, oids) {
        return 1;
      });
    }else{
      return 0;
    }
  });
  db.conn.find('participante_tipos', {'nombre': 'externo'}, function(err, cursor, count) {
    if(count == 0){
      db.conn.save('participante_tipos', {'nombre': 'externo'}, function(err, oids) {
        return 1;
      });
    }else{
      return 0;
    }
  });
  res.send('Verificar si se han creado los tipos de particpantes');
});

module.exports = router;
