const express = require('express');

const artistsRouter = require('./routes/artists');
const albumsRouter = require('./routes/albums');

const app = express();

app.use(express.json());

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);

module.exports = app;
