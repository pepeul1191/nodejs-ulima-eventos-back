## Eventos Ulima Back

Instalar dependencias:

		$ npm install & bower install

Arrancar aplicación JS especificando el puerto:

		$ PORT=8080 nodemon npm start

Arrancar aplicación JS con el puerto por default (3000) seteado en el código:

		$ nodemon npm start

Estructura de 'eventos':

```javascript
	{
	     _id: autogenrado,
	    nombre: String,
	    nombre_url: String,
	    dia_inicio: Date,
	    dia_fin: Date,
	    hora_inicio: String,
	    hora_fin: String,
	    lugar String,
	    direccion: String
  }
```

---

Fuentes:

+ https://github.com/Softmotions/ejdb-node
+ http://expressjs.com/es/starter/generator.html
+ https://github.com/pepeul1191/hapijs-ejdb
+ https://github.com/pepeul1191/expressjs-mongodb-boilerplate
+ http://fresno.ulima.edu.pe/go.nsf/EventosING?openform&origen=ulima&medio=web&evento=BIOPOLI-20170426
