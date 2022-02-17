const express = require('express');

const {
  getArtistsController,
  createArtistController,
} = require('../controllers/artist');

const artistRouter = express.Router();

artistRouter.get('/', getArtistsController);
artistRouter.post('/', createArtistController);

module.exports = artistRouter;
