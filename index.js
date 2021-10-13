const express = require('express');
const cors = require('cors');

const routerApi = require('./routes/index');

const {
   logErrors,
   boomErrorHandler,
   errorHandler,
} = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());

// Configuracion de cors para darle acceso a otras apps de conectarse
// a mi backend. si se deja sin las options cualquier app se podra conectar
const whitelist = ['http://localhost:8080', 'https://myapp.com'];
const options = {
   origin: (origin, callback) => {
      if (whitelist.includes(origin)) {
         callback(null, true);
      } else {
         callback(new Error('No permitido'));
      }
   },
};

app.use(cors(options));

/*
Metodos de un CRUD:
POST = Create(crear)
GET = Read(leer)
PUT = Update(modificar)
Delete = Delete(eliminar)
*/

// Todas las rutas especificas deben ir antes que la dinamicas
app.get('/', (req, resp) => {
   resp.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, resp) => {
   resp.send('Hola soy una nueva ruta');
});

routerApi(app);

//Se agregan los middleware despues de añadir el routerApi(router)
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
   console.log(`My port ${port}`);
});
