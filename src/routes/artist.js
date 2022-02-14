const express = require('express');

const {
  createArtistController,
} = require('../controllers/artist');

const artistRouter = express.Router();

artistRouter.post('/', createArtistController);

module.exports = artistRouter;
