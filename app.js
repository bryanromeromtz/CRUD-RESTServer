require('dotenv').config();
const Server = require('./models/server');
const server = new Server();

server.listen();

// const express = require('express');
// const app = express();

// const PORT = process.env.PORT;

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });

// app.listen(PORT, () => {
//   console.log(`server listening on port: ${PORT}`)
// });