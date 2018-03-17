const constants = require('./constants');

var loadCss = function(csss) {
  var rpta = "";
  if (typeof csss != 'undefined'){
    for(var i = 0; i < csss.length; i++){
      rpta = rpta + '<link rel="stylesheet" type="text/css" href="'+ constants.data.static_url + csss[i] + '.css" />'
    }
  }
  return rpta;
}

var loadJs = function(jss) {
  var rpta = "";
  if (typeof jss != 'undefined'){
    for(var i = 0; i < jss.length; i++){
      rpta = rpta + '<script src="' + constants.data.static_url + jss[i] + '.js"></script>'
    }
  }
  return rpta;
}

var fechaViewToJS = function(fecha_view){ //formato dd/mm/aaaa
  var fecha_array = fecha_view.split('/');
  var anio = fecha_array[2];
  var mes = fecha_array[1] - 1;
  var dia = fecha_array[0];
  return Date.parse(new Date(anio, mes, dia));
}

exports.loadCss = loadCss;
exports.loadJs = loadJs;
exports.fechaViewToJS = fechaViewToJS;
