var EJDB = require('ejdb');
var jb = EJDB.open('db/eventos', EJDB.DEFAULT_OPEN_MODE);

exports.conn = jb;
