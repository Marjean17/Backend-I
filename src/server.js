import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
  res.render('home', { products: /* tu lista de productos */ });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: /* tu lista de productos */ });
});

// Configurar Socket.IO
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Manejar eventos de creación y eliminación de productos
  socket.on('newProduct', (product) => {
    // Lógica para agregar el producto
    io.emit('updateProducts', /* lista actualizada de productos */);
  });

  socket.on('deleteProduct', (productId) => {
    // Lógica para eliminar el producto
    io.emit('updateProducts', /* lista actualizada de productos */);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


