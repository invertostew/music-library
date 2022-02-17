const express = require('express');

const {
  getArtistsController,
  createArtistController,
  getArtistContoller,
} = require('../controllers/artist');

const artistRouter = express.Router();

artistRouter.get('/', getArtistsController);
artistRouter.post('/', createArtistController);

artistRouter.get('/:artistId', getArtistContoller);

module.exports = artistRouter;
