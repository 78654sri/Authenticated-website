const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRouter = require('./routers/userRouter');
const staticRouter = require('./routers/staticRouter');
const postRouter = require('./routers/postRouter');

const { checkForToken } = require('./middlewares/auth');

const app = express();

mongoose.connect('mongodb://localhost/problem-solver')
  .then(() => console.log('db connected'))
  .catch((err) => console.log('not connected', err));

// configurations
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// middlewares
app.use(express.static(path.resolve('./public')));
app.use(express.json());  // Replacing body-parser with express's built-in parser
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForToken);

// Routes
app.use('/', staticRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

// Listener
const server = app.listen(8000, () => {
  console.log('Server started on port 8000');
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error('Port 8000 is already in use. Trying another port...');
    server.listen(0); // Let the system assign an available port
  } else {
    console.error('Server error:', error);
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`Server started on port ${address.port}`);
});



