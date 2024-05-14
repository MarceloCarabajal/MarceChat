import express from 'express';
import { __dirname } from './utils.js'
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import { errorHandler } from './middlewares/errorHandler.js'
import morgan from 'morgan';
import viewsRouter from './routes/views.router.js'
import { configureSocket } from './socketConfig.js';
//express server
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`🌎 Server listening on port ${PORT}`)
});

//Configurar Socket.io
configureSocket(httpServer);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/public'));

//morgan
app.use(morgan('dev'));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//routes
app.use('/chat', viewsRouter);

//siempre va despues del enrutador
app.use(errorHandler);